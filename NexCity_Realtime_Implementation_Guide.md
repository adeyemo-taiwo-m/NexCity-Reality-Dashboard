# NexCity Realty — Implementation Guide
### Adding Axios, Redux, and Socket.io (Lancer Frontend Assessment)

> **How to use this guide:** This is a teaching guide, not a copy-paste solution. Each section explains
> *what* you're building and *why*, gives you boilerplate where it's genuinely boilerplate (server scaffolding,
> config files), and leaves the core logic for you to write and understand — because you'll be tested on this
> afterward. Read the "why" before the "how" in every section. If you get stuck, come back and ask for help
> on that *specific* piece rather than the whole thing — that's also a more honest and more useful way to
> use AI assistance, and it mirrors exactly what the assessment guidelines asked for.

---

## 0. The Big Picture (read this first)

Your NexCity dashboard currently uses **TanStack React Query** to fetch and cache data from Supabase.
That's the right tool for "data I requested." We are **not** replacing it.

We're adding three things, each solving a different problem:

| Tool | Problem it solves | Where it lives |
|---|---|---|
| **Axios** | Talking to a *third-party* REST API (not Supabase) | A geocoding lookup when adding/editing a property |
| **Redux (Redux Toolkit)** | Holding state that arrives *unprompted*, pushed from the server, not from a request | Live notifications, unread counts, socket connection status |
| **Socket.io** | The actual real-time pipe between server and browser | A small Node/Express server you'll build, that listens to Supabase and re-broadcasts events |

**The full data flow you're building:**

```
Supabase (Postgres + Realtime)
        │  (postgres_changes event: someone added a property/transaction)
        ▼
Your Node/Express + Socket.io server   ← you build this, it's small (~150 lines)
        │  (io.emit('notification:new', {...}))
        ▼
Browser: Socket.io client
        │  (socket.on('notification:new', ...))
        ▼
Redux store (notificationsSlice)
        │
        ▼
React components (toast, notification bell, live stat cards)
```

Write this diagram (or your own version of it) into your README's Architecture section — it's the single
most important thing a reviewer will look at to understand your system in 10 seconds.

---

## 1. Supabase: New Project Setup

Since your old project has been paused for 2+ years, we're starting clean rather than fighting a manual
`.backup` restore. Clean is faster and you'll understand every table in it.

### 1.1 Create the project
1. Go to [database.new](https://database.new) (or supabase.com → New Project).
2. Name it something like `nexcity-realty-v2`.
3. Choose a region close to you, set a strong DB password, **save that password somewhere** (you'll need it later for direct DB connections).
4. Wait ~2 minutes for provisioning.

### 1.2 Recreate the schema

Go to the **SQL Editor** in your Supabase dashboard and run this. It matches the tables from your project
overview doc, plus one new column set we need for the live features.

```sql
-- Agents
create table agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  status text default 'active',       -- active | inactive
  listed integer default 0,
  closed_deals integer default 0,
  image text,
  is_online boolean default false,    -- NEW: powers the live presence dot
  created_at timestamptz default now()
);

-- Properties
create table properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price numeric not null,
  address text,                       -- NEW: human-readable address, feeds the geocoder
  longitude double precision,
  latitude double precision,
  status text default 'available',    -- available | pending | sold
  image text,
  agent_id uuid references agents(id),
  created_at timestamptz default now()
);

-- Customers
create table "customersDetails" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  lead_status text default 'new',     -- new | contacted | closed
  created_at timestamptz default now()
);

-- Transactions
create table "transactionDetails" (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references "customersDetails"(id),
  property_id uuid references properties(id),
  amount numeric not null,
  payment_status text default 'pending', -- pending | paid | failed
  created_at timestamptz default now()
);
```

**Why the `is_online` and `address` columns are new:** they didn't exist in your old schema — they exist
specifically to support the two new features you're adding. Point this out explicitly in your README's
"New Functionality" section — it shows you understood you needed to extend the data model, not just the UI.

### 1.3 Enable Row Level Security (RLS)

This matters a lot for the "security considerations" part of their review. At minimum, for now:

```sql
alter table agents enable row level security;
alter table properties enable row level security;
alter table "customersDetails" enable row level security;
alter table "transactionDetails" enable row level security;

-- Simple starting policy: authenticated users can read/write.
-- (Tighten this later per-role if you have time — mention this as a "future improvement" in your README if not.)
create policy "Authenticated full access" on agents
  for all using (auth.role() = 'authenticated');
create policy "Authenticated full access" on properties
  for all using (auth.role() = 'authenticated');
create policy "Authenticated full access" on "customersDetails"
  for all using (auth.role() = 'authenticated');
create policy "Authenticated full access" on "transactionDetails"
  for all using (auth.role() = 'authenticated');
```

### 1.4 Enable Realtime on the tables you'll broadcast

In the Supabase dashboard: **Database → Replication → supabase_realtime** → toggle ON for `properties`,
`"customersDetails"`, and `"transactionDetails"`. This is what lets your Socket.io server "hear" database changes.

### 1.5 Seed some dummy data

Write 10–15 rows into `properties` and a handful into `agents`/`customersDetails` so your demo doesn't look
empty. Use [Unsplash](https://unsplash.com) image URLs for property photos — free, real-looking, no upload needed.

### 1.6 Environment variables

In your NexCity project root, create `.env.local` (make sure it's in `.gitignore`):

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SOCKET_SERVER_URL=http://localhost:4000
```

Never commit real keys. This alone is worth a sentence in your README's security notes.

---

## 2. The Socket.io Server — Explained From Scratch

You said this part is new to you, so let's slow down here. This section explains the concepts *before*
the code.

### 2.1 What is Express, actually?

Express is a minimal web server framework for Node.js. On its own it just lets you say "when a request
comes to this URL, run this function." We're barely going to use Express's own routing here — we mainly
need it because Socket.io needs an underlying HTTP server to attach itself to.

### 2.2 What is Socket.io, actually?

Normal HTTP (what Axios/fetch/React Query use) works like a phone call where *you* always dial: the browser
asks a question, the server answers, and the connection ends. It cannot work the other way — a normal server
can't "call you back" whenever it feels like it.

Socket.io keeps a connection open in both directions. Once a browser connects, the server can push a
message to it *at any time*, with no request needed. That's what "real-time" means here: the server decides
when to speak, not just the client.

Two core things to understand:
- **`io.emit('eventName', data)`** — server broadcasts `data` to every connected client under a name you choose (`eventName` is arbitrary, like a channel name).
- **`socket.on('eventName', callback)`** — a client listens for that name and runs `callback` when it arrives.

That's genuinely most of the API surface you need.

### 2.3 Why do we need our *own* server, instead of just using Supabase Realtime directly in the browser?

Supabase does have a built-in Realtime client you could subscribe to directly from React, no separate server
needed. We're deliberately **not** doing that here, and you should say so explicitly in your README, because:

1. The job description asked specifically for **Socket.io** experience — using Supabase's built-in realtime instead would sidestep the actual skill being assessed.
2. A relay server is genuinely how many production systems work: it lets you filter, transform, or combine events from multiple sources before deciding what to tell the browser, rather than exposing your raw database changes directly to the client.

### 2.4 Building the server

Create a **separate folder**, outside your React project (e.g. a sibling folder `nexcity-realtime-server/`).
It's a separate deployable service, not part of your Vite app.

```bash
mkdir nexcity-realtime-server
cd nexcity-realtime-server
npm init -y
npm install express socket.io @supabase/supabase-js dotenv cors
```

Create `.env`:
```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # from Supabase Settings → API. Keep this secret, never in frontend code.
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

> **Why the service role key here, and not the anon key?** This server runs on your machine/host, never in
> a browser, so it's safe to hold a more privileged key. This is a good sentence to include in your
> README's security notes — it shows you understand the difference between anon and service role keys,
> which is a very real, very common Supabase security mistake to get wrong.

Create `index.js`. Read every comment — this is the boilerplate part, but understand each block before moving on:

```js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

// Socket.io needs a raw http server to attach to — this is why Express alone isn't enough.
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, methods: ['GET', 'POST'] }
});

// A privileged Supabase client, safe here because this code never reaches the browser.
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Track connected clients (basic — good enough for a demo, mention scaling considerations in README)
let onlineCount = 0;

io.on('connection', (socket) => {
  onlineCount++;
  console.log(`Client connected. Total online: ${onlineCount}`);

  socket.on('disconnect', () => {
    onlineCount--;
    console.log(`Client disconnected. Total online: ${onlineCount}`);
  });
});

// --- The core relay logic ---
// Subscribe to Postgres changes via Supabase Realtime, and re-broadcast a clean,
// frontend-friendly event over Socket.io.

supabase
  .channel('db-changes')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'properties' }, (payload) => {
    io.emit('notification:new', {
      type: 'property',
      message: `New property listed: ${payload.new.title}`,
      data: payload.new,
      timestamp: new Date().toISOString(),
    });
  })
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactionDetails' }, (payload) => {
    io.emit('notification:new', {
      type: 'transaction',
      message: `New transaction recorded: ₦${payload.new.amount}`,
      data: payload.new,
      timestamp: new Date().toISOString(),
    });
    io.emit('stat:update', { key: 'transactions', delta: 1 });
  })
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'customersDetails' }, (payload) => {
    io.emit('notification:new', {
      type: 'customer',
      message: `New customer lead: ${payload.new.name}`,
      data: payload.new,
      timestamp: new Date().toISOString(),
    });
  })
  .subscribe();

app.get('/health', (req, res) => res.json({ status: 'ok', onlineClients: onlineCount }));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Realtime server running on port ${PORT}`));
```

**Test it locally** before touching the frontend:
```bash
node index.js
```
Then in Supabase's Table Editor, manually insert a row into `properties`. Watch your terminal — you should
see the subscription fire. This is a good moment to genuinely understand what just happened before moving on.

### 2.5 Deploying the server

Once it works locally:
1. Push this folder to its own small GitHub repo.
2. Deploy on [Render](https://render.com) (free tier is fine): New → Web Service → connect the repo → set the same env vars in Render's dashboard → deploy.
3. Update `VITE_SOCKET_SERVER_URL` in your frontend `.env` to the deployed Render URL, and `CLIENT_ORIGIN` in the server's env to your deployed frontend URL (e.g. your Vercel/Netlify URL).

---

## 3. Frontend: Redux Toolkit Setup

### 3.1 Why Redux Toolkit, specifically, and not "plain" Redux

Plain Redux requires a lot of hand-written boilerplate (action types, action creators, switch-statement
reducers). Redux Toolkit is the officially recommended way to write Redux today — it removes almost all of
that boilerplate. Mentioning this distinction in your README shows you know the modern convention, not just
the 2015-era pattern.

### 3.2 Install

```bash
npm install @reduxjs/toolkit react-redux socket.io-client
```

That's genuinely everything you need — no extra middleware packages. Redux Toolkit includes `redux-thunk`
already built in for anything async.

### 3.3 Create the notifications slice

`src/features/notifications/notificationsSlice.js`:

```js
import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],           // list of { type, message, data, timestamp }
    unreadCount: 0,
    isConnected: false,  // socket connection status
  },
  reducers: {
    notificationReceived: (state, action) => {
      state.items.unshift(action.payload);   // newest first
      state.unreadCount += 1;
      if (state.items.length > 50) state.items.pop(); // cap memory use
    },
    markAllRead: (state) => {
      state.unreadCount = 0;
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { notificationReceived, markAllRead, setConnectionStatus } = notificationsSlice.actions;
export default notificationsSlice.reducer;
```

Try writing the `statsSlice` yourself for the live stat-card counters — it follows the exact same shape
(an object of counters, an action to increment/set them). This is a good one to build solo since it's a
near-copy of the pattern above; being able to do that is exactly what "learn and apply new concepts
quickly" means in their assessment criteria.

### 3.4 Create the store

`src/app/store.js`:
```js
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../features/notifications/notificationsSlice';
// import statsReducer from '../features/dashboard/statsSlice'; // once you've built it

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    // stats: statsReducer,
  },
});
```

### 3.5 Wire it into `App.jsx`

You already have a `QueryClientProvider` wrapping your app — add `Provider` from `react-redux` **around**
it (order between these two doesn't functionally matter, but wrapping Redux on the outside is the common
convention):

```jsx
import { Provider } from 'react-redux';
import { store } from './app/store';
// ...your existing imports (QueryClientProvider, etc.)

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* ...your existing routes/providers */}
      </QueryClientProvider>
    </Provider>
  );
}
```

### 3.6 The socket connection hook

`src/hooks/useSocket.js` — this is the bridge between the Socket.io server and Redux:

```js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { notificationReceived, setConnectionStatus } from '../features/notifications/notificationsSlice';

let socket; // module-level so we don't reconnect on every re-render

export function useSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

    socket.on('connect', () => dispatch(setConnectionStatus(true)));
    socket.on('disconnect', () => dispatch(setConnectionStatus(false)));

    socket.on('notification:new', (payload) => {
      dispatch(notificationReceived(payload));
    });

    // socket.on('stat:update', (payload) => { ... dispatch to your stats slice ... });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
}
```

Call `useSocket()` once, high up — e.g. inside your main dashboard layout component — so it connects once
per session.

### 3.7 Build the UI pieces yourself

Using `useSelector` from `react-redux`, build:
- A notification bell icon with a badge showing `unreadCount`
- A dropdown listing `items`
- A `react-hot-toast` call inside `useSocket`'s `notification:new` handler, so new events also pop a toast

This part is genuinely just consuming Redux state in JSX you already know how to write — a good place to
build it solo and only ask for help if a specific piece breaks.

---

## 4. Frontend: Axios Geocoding Feature

### 4.1 Why this feature, and why Axios specifically here

Your Supabase SDK already handles all your database reads/writes — that's not what Axios is for. Axios is
for calling a completely separate third-party API: a geocoding service that turns a typed address into
coordinates. This is the honest, correct division of responsibility to describe in your README.

We'll use **OpenStreetMap's Nominatim** — free, no API key required, which matters for the "lightweight,
justify your dependencies" guideline (no paid key management to explain).

### 4.2 Install

```bash
npm install axios
```

### 4.3 Build the geocoding hook

`src/hooks/useGeocode.js`:

```js
import { useState, useRef } from 'react';
import axios from 'axios';

export function useGeocode() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const search = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    // Cancel any in-flight request before starting a new one — important for a type-ahead field,
    // otherwise slow older requests can resolve after newer ones and show stale results.
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: query, format: 'json', limit: 5 },
        signal: abortControllerRef.current.signal,
      });
      setSuggestions(response.data);
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') return; // expected, ignore
      console.error('Geocoding failed:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return { search, suggestions, loading };
}
```

### 4.4 Wire it into your property form

In whichever component handles adding/editing a property (`features/properties/...`), add an address input
that calls `search(value)` on change (debounce it — a simple `setTimeout`/`clearTimeout` pattern is enough,
no need for a debounce library), shows the `suggestions` list, and on selecting one, fills in `latitude`/
`longitude` from the chosen result (`lat`, `lon` fields in Nominatim's response) before saving to Supabase
as usual through your existing React Query mutation.

This is a good one to build fully yourself — it's mostly a form + a list you already know how to build, with
the hook above doing the new part.

---

## 5. Live Stat Cards

In `features/dashboard`, find your existing stat card components. Use `useSelector` to read from your new
`stats` slice, and in `useSocket.js`, dispatch into it on `stat:update` events. Compare the "before" (data
only updates on refetch/page load) vs "after" (updates instantly) — this contrast is exactly what you'll
demo live for reviewers.

---

## 6. Testing Guide (for your README)

Write this as literal numbered steps a reviewer can follow with zero context:

```md
## Testing Guide

1. Visit the live app: <your deployed URL>
2. Log in with test credentials: <email> / <password>
3. Open the dashboard in two browser tabs side by side.
4. In Tab A, add a new property (Properties → Add New).
5. In Tab B, watch the notification bell — a new notification and toast should appear within ~1 second,
   with no page refresh.
6. Also observe the "Active Listings" stat card update live in Tab B.
7. To test the geocoding feature: in the Add Property form, type a partial address (e.g. "Eiffel Tower")
   and confirm suggestions appear; select one and confirm latitude/longitude auto-fill.
8. To test connection resilience: turn off your wifi briefly while on the dashboard, then reconnect —
   the notification bell should show a disconnected state and recover automatically (Socket.io reconnects
   by default).
```

Adjust based on what actually works once you've built it — don't publish untested steps.

---

## 7. README Structure Template

```md
# NexCity Realty

## Architecture & Domain Overview
[Your system diagram + 2-3 paragraphs: what NexCity does, the CRM/dashboard domain,
and the data flow diagram from Section 0 above]

## Repository Map
- src/features/ — feature-based modules (agents, properties, dashboard, notifications, etc.)
- src/services/ — Supabase client + query functions
- src/app/store.js — Redux store config
- src/hooks/useSocket.js, useGeocode.js — new integration hooks
- [link to the separate realtime-server repo]

## Original Functionality
[What existed before: CRM dashboard, property/agent/customer/transaction management,
React Query-based data fetching, Leaflet maps, charts]

## New Functionality
- Real-time notifications via a custom Socket.io relay server listening to Supabase Realtime
- Redux Toolkit for real-time client state (separate from React Query's request-based state, and why)
- Live-updating dashboard stat cards
- Axios-based address geocoding with request cancellation

## Live Application URL
[your deployed frontend URL]

## Testing Guide
[from Section 6]
```

---

## 8. Explaining This To Yourself (so you can explain it to them)

Since Lancer plans to test you further on this, walk through this Q&A out loud, in your own words, until
you can answer without looking:

- **"Why two different state tools (React Query and Redux)?"** → React Query handles data *you asked for*
  (fetch, cache, refetch). Redux Toolkit handles data that *arrives on its own*, pushed by the socket
  server, with no request involved.
- **"Why a separate Socket.io server instead of Supabase's built-in Realtime client?"** → The role asked
  specifically for Socket.io experience; a relay server also lets you transform/filter events before they
  reach the browser, rather than exposing raw DB changes directly.
- **"Why Axios instead of fetch, or instead of Supabase, for geocoding?"** → Supabase's SDK is for your
  own database. Axios is for calling an external third-party REST API — a genuinely different job.
- **"What happens if the socket server goes down?"** → Socket.io's client auto-reconnects; the UI shows a
  disconnected indicator via `isConnected` in Redux in the meantime, so the rest of the app still works using
  React Query's normal fetch/cache.
- **"What would you improve with more time?"** → Per-role RLS policies instead of the blanket authenticated
  policy, retry/backoff tuning on the socket client, moving the relay server's health check into a monitored
  endpoint.

If you can answer all five of those comfortably in your own words, you're in good shape — that's a much
stronger position than having a polished repo you can't speak to.
