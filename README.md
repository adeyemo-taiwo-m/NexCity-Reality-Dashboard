# NexCity Realty Dashboard (Frontend)

NexCity Realty is a modern real-time CRM and property management dashboard built for real estate agents and administrators. It features an interactive UI, real-time sync with database events, and address geocoding.

## 🏗️ Architecture & Data Flow

Data is managed using two primary mechanisms based on intent:
1. **Request-Response Cache (TanStack React Query)**: Handles CRUD operations, search queries, pagination, and API requests to Supabase (e.g. agents, properties, transactions).
2. **Real-time Event Stream (Redux Toolkit + Socket.io)**: Receives unprompted, live event broadcasts from our server and holds client UI states (e.g., live notifications, unread counts, and live stat counters).

```
Supabase (PostgreSQL + Realtime)
        │
        ▼ (on INSERT row in database)
NexCity Realtime Server (Express + Socket.io)
        │
        ▼ io.emit('notification:new', data)
Local Client Browser (Socket.io client) ──► Redux Store ──► React UI (Toast / Bell)
```

## 🗺️ Repository Map
* `src/features/` — Feature-based modules (agents, properties, customers, dashboard, transactions).
* `src/features/notifications/` — Redux slice and UI for real-time notification alerts.
* `src/app/store.js` — Redux store configuration.
* `src/hooks/useSocket.js` — Socket.io event listeners bridge to Redux.
* `src/hooks/useGeocode.js` — Geocoding autocomplete hook using Axios and OpenStreetMap.

## 🌟 Key Features
* **Real-time Notifications**: Instantly alerts users via a toast and badge notification bell when properties, customers, or transactions are added to the DB.
* **Live Dashboard Statistics**: Active statistics (Total Properties, Available Properties, Customers Count) update dynamically as events are received.
* **Axios Geocoding**: In the property forms, users search addresses which auto-fill GPS coordinates using OpenStreetMap's Nominatim with request cancellation (`AbortController`) to prevent race conditions.
* **Responsive Dark/Light Mode**: Full theme customization powered by Tailwind CSS v4 variables.

## 🚀 Local Setup & Testing
1. Configure environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_SOCKET_SERVER_URL=https://nexcity-server.onrender.com
   ```
2. Install dependencies: `npm install`
3. Run the development build: `npm run dev`
4. Test real-time features: Open two browser tabs side-by-side. Insert a row in the Supabase Table Editor (or via the "Add Property" modal) and observe the notification toast, badge, and dashboard counters update in real-time.
