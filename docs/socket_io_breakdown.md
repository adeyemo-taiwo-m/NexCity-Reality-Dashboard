# Socket.io Real-Time Notifications: Deep Dive Breakdown

This document provides a step-by-step breakdown of how **Socket.io** is used to drive the real-time notifications and statistics in the NexCity Dashboard.

---

## 1. The Real-Time Architecture Data Flow

When a change occurs in your database, it triggers a chain reaction across four distinct layers of the application:

```
┌──────────────────────────────────────┐
│  1. Supabase (PostgreSQL Database)   │ 
└──────────────────┬───────────────────┘
                   │  (postgres_changes INSERT event)
                   ▼
┌──────────────────────────────────────┐
│ 2. Realtime server (Node.js + Express)│
└──────────────────┬───────────────────┘
                   │  (io.emit('notification:new', payload))
                   ▼
┌──────────────────────────────────────┐
│ 3. Client Socket Hook (useSocket.js)  │
└──────────────────┬───────────────────┘
                   │  (dispatch Redux actions & React Query invalidation)
                   ▼
┌──────────────────────────────────────┐
│   4. React UI (Toaster, Bell, Map)   │
└──────────────────────────────────────┘
```

---

## 2. Step-by-Step Code Walkthrough

Let's trace exactly what happens when you run this query in your Supabase SQL Editor:
```sql
INSERT INTO properties (title, price, status, address, latitude, longitude)
VALUES ('Taiwo Penthouse', 210000000, 'Available', 'Victoria Island, Lagos', 6.44806, 3.42494);
```

### Step 2.1: The Database Broadcasts the Change (Supabase)
Because we enabled **Replication** on the `properties` table, Supabase automatically broadcasts a PostgreSQL change event to any client listening with the privileged `service_role` credentials.

---

### Step 2.2: The Server Captures and Relays the Event (Realtime Server)
Our Node/Express server (`nexcity-realtime-server/index.js`) maintains a live connection to Supabase and listens specifically for `INSERT` events:

```javascript
// 1. Establish subscription channel in index.js
const channel = supabase.channel('db-changes');

channel
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'properties' }, // Listening to properties insertions
    (payload) => {
      // Print debug log to Render logs
      console.log(`[supabase] INSERT event on "properties":`, JSON.stringify(payload.new));

      // 2. Broadcast a frontend-friendly message to all connected browsers
      io.emit('notification:new', {
        type: 'property',
        message: `New property listed: ${payload.new.title}`,
        data: payload.new,
        timestamp: new Date().toISOString(),
      });

      // 3. Broadcast a stat update event to increment counters
      io.emit('stat:update', { key: 'properties', delta: 1 });
    }
  )
  .subscribe();
```

* **`io.emit('notification:new', ...)`**: Socket.io sends this event to **every** browser tab currently connected to our server URL.

---

### Step 2.3: The Browser Receives the Event (Client React Hook)
Inside the frontend, the custom React hook `useSocket.js` maintains the open socket connection. When `notification:new` or `stat:update` arrives, it intercepts those events:

```javascript
// src/hooks/useSocket.js
socket.on('notification:new', (payload) => {
  // 1. Add notification to the Redux Store
  dispatch(notificationReceived(payload));

  // 2. Refresh React Query cache so the Map and Tables update live!
  if (payload.type === 'property') {
    queryClient.invalidateQueries({ queryKey: ['properties'] });
  } else if (payload.type === 'customer') {
    queryClient.invalidateQueries({ queryKey: ['customers'] });
  } else if (payload.type === 'transaction') {
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
  }
  
  // 3. Select appropriate emoji icon
  let toastIcon = '🔔';
  if (payload.type === 'property') toastIcon = '🏠';
  if (payload.type === 'transaction') toastIcon = '₦';
  if (payload.type === 'customer') toastIcon = '👥';

  // 4. Pop up a dark notification toast
  toast(payload.message, {
    icon: toastIcon,
    style: { background: '#1f2937', color: '#ffffff', borderRadius: '8px' },
  });
});

socket.on('stat:update', (payload) => {
  // 5. Update local dashboard counters in Redux
  dispatch(incrementStat(payload));
});
```

---

### Step 2.4: Writing to Local State (Redux Toolkit Slices)
Redux acts as the central local database inside the browser memory. It handles the events that arrive "unprompted" from the socket server.

#### A. Notifications Slice (`notificationsSlice.js`):
```javascript
notificationReceived: (state, action) => {
  state.items.unshift(action.payload); // Add new notification to the top of list
  state.unreadCount += 1;              // Increment unread count badge
  if (state.items.length > 50) state.items.pop(); // Cap memory to latest 50
}
```

#### B. Dashboard Stats Slice (`statsSlice.js`):
```javascript
incrementStat: (state, action) => {
  const { key, delta } = action.payload;
  if (key === 'properties') {
    state.propertiesDelta += delta;    // Increments local properties count (+1)
  }
}
```

---

### Step 2.5: The UI Reacts in Real-Time (React Components)

The React components listen to changes in the Redux store (`useSelector`) and re-render instantly:

#### A. The Notification Bell (`NotificationBell.jsx`):
Reads the notifications feed items and the unread count badge:
```javascript
const { items, unreadCount } = useSelector((state) => state.notifications);

return (
  <button>
    <HiOutlineBell />
    {unreadCount > 0 && <span>{unreadCount}</span>} {/* Red badge */}
  </button>
)
```

#### B. The Dashboard Stat Cards (`StatSection.jsx`):
Takes the base count from the database and appends the real-time delta from Redux, ensuring the number increases instantly without waiting for a server reload:
```javascript
const { propertiesDelta } = useSelector((state) => state.stats);

// Instant count = (DB properties list size) + (New socket updates)
const totalProperties = properties.length + propertiesDelta;
```

---

## 3. Real-Time Map Synchronization (React Query Invalidation)

### The Challenge:
When a new property is inserted, Socket.io broadcasts the change to the frontend. However:
1. The Interactive Leaflet Map (`RecentHouseMap.jsx`) fetches and displays markers based on the **React Query** properties cache (`useProperties()`).
2. Receiving a Socket event updates Redux but does **not** update React Query.
3. Without cache invalidation, the new property marker would **not** appear on the map until you manually refreshed the browser tab.

### The Solution:
We bridged **Socket.io** and **React Query** directly inside the socket listener hook [useSocket.js](file:///c:/Users/HP/Desktop/react/NexCity%20Dashboard/nexCity/src/hooks/useSocket.js):

1. **Import the Query Client**:
   We import the React Query hook to get access to the global query client instance:
   ```javascript
   import { useQueryClient } from '@tanstack/react-query';
   ```
2. **Access the Client inside the Hook**:
   ```javascript
   const queryClient = useQueryClient();
   ```
3. **Invalidate the Query on Real-time Socket Event**:
   When the socket catches a `notification:new` event of type `'property'`, we call `invalidateQueries`:
   ```javascript
   if (payload.type === 'property') {
     queryClient.invalidateQueries({ queryKey: ['properties'] });
   }
   ```

### How it behaves in the Browser:
* As soon as the browser receives the socket event, React Query marks the `['properties']` cache as "stale" and silently refetches the database in the background.
* Once the database returns the updated list, the Map component automatically receives the new coordinate data.
* Leaflet recalculates the map boundaries and draws the new property pin marker **instantly on your screen without a page refresh!**

---

## 4. Why did we choose this design? (Key Concepts for Reviewers)

1. **Why use both React Query and Redux?**
   * **React Query** handles data *you asked for* (request-response caching). It fetches and caches data from API endpoints.
   * **Redux** handles data *you didn't ask for* (push-event stream). It holds transient updates received spontaneously over the Socket channel.
2. **Why not connect Supabase Realtime directly to the frontend?**
   * Exposing raw database events directly to a client's browser is a security risk. A **Relay Server** (our Node.js app) acts as a security firewall—it intercepts the database changes, filters/reshapes the payload, and sends only safe, formatted notifications to the frontend.
3. **What happens if the Socket Server crashes?**
   * Socket.io client has built-in auto-reconnection. The Rest of the application (navigation, details forms, tables) will still function normally using React Query's cached database data.
