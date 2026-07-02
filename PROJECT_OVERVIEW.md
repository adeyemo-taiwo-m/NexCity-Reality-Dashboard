# NexCity Dashboard - Project Overview & Architecture

This document provides a complete breakdown of the tech stack, file structure, database schema, and design patterns utilized in the **NexCity Dashboard** project.

---

## 1. Tech Stack & Key Libraries

The application is built as a React Single-Page Application (SPA) compiled using Vite:

* **Core & Build**:
  * **React 19** (`react` and `react-dom` version `^19.1.0`)
  * **Vite 7** (`vite` version `^7.0.4`) with React support (`@vitejs/plugin-react`)
* **Routing**:
  * **React Router Dom v7** (`react-router-dom` `^7.9.4`) for nested routing and layouts.
* **State Management**:
  * **TanStack React Query v5** (`@tanstack/react-query` `^5.90.5`): Handles server state caching, background syncing, mutations, and optimistic updates.
  * **React Context**: Used for application-wide UI states (like light/dark mode).
  * **React Hook Form** (`react-hook-form` `^7.65.0`): Efficient client-side form state and validation.
* **Backend & Database**:
  * **Supabase JS SDK** (`@supabase/supabase-js` `^2.76.1`): Used for user authentication, remote PostgreSQL database queries, and storage bucket uploads.
* **Data Visualization & Interactive Maps**:
  * **Recharts** (`recharts` `^3.3.0`): Provides SVG-based interactive analytics and performance graphs.
  * **React Leaflet** (`react-leaflet` `^5.0.0` & `leaflet` `^1.9.4`): Renders map coordinates showing property listings.
* **Aesthetics & Feedback**:
  * **Tailwind CSS v4** (`tailwindcss` and `@tailwindcss/vite` `^4.1.14`): Modern CSS utilities and compiler configurations.
  * **Framer Motion** (`framer-motion` `^12.23.24`): Dynamic page transitions and micro-animations.
  * **React Hot Toast** (`react-hot-toast` `^2.6.0`): Emits toaster alerts for system operations.
  * **Swiper** (`swiper` `^12.0.3`): Powers responsive visual carousels.

---

## 2. Directory Structure & Organization

The codebase follows a feature-centric structure:

```text
nexCity/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons, and logos
│   ├── features/           # Feature-specific components and business logic
│   │   ├── Authentication/ # Sign-in, sign-up, session validation, and profiles
│   │   ├── agents/         # Agent cards, grids, search bar, and custom hooks
│   │   ├── contexts/       # React contexts (e.g. DarkModeContext)
│   │   ├── customers/      # Customers table view, card views, and CRUD hooks
│   │   ├── dashboard/      # Stat cards, Leaflet map, and analytics charts
│   │   ├── properties/     # Properties grids, details profile, and listing state hooks
│   │   ├── settings/       # Notifications, account forms, and preferences
│   │   └── transactions/   # Transaction list tables, badges, and delete/edit hooks
│   ├── hooks/              # Global reusable hooks (e.g. dark mode, outside clicks)
│   ├── pages/              # Routing page entry elements (Dashboard, Settings, etc.)
│   ├── services/           # Supabase client setup and database query functions
│   ├── ui/                 # 40+ shared design-system UI components
│   ├── utils/              # Helper functions (currency formatting, date formatters)
│   ├── App.jsx             # Main routing, Context Provider, and QueryClient setup
│   ├── index.css           # Tailwind custom `@theme` variables and styles
│   └── main.jsx            # React root mount file
├── package.json            # Project dependencies and run scripts
└── vite.config.js          # Vite plugins and bundler options
```

---

## 3. Core Database Schema & Storage

The database layer runs on **Supabase** (PostgreSQL) and exposes these primary tables:

1. **`agents`**: Tracks agent profiles (`name`, `email`, `phone`, `status`, `listed`, `closedDeals`, `image`).
2. **`properties`**: Manages listings (`title`, `price`, `longitude`, `latitude`, `status`, `image`).
3. **`customersDetails`**: Tracks customer information, lead status, and details.
4. **`transactionDetails`**: Records financial transactions, connecting customers, properties, and payment statuses.

### Storage Buckets (Supabase Storage)
* `agents`: Used for storing uploaded agent avatars.
* `properties`: Used for storing real estate photos.
* `user`: Stores user/admin profile photos and transaction media.

---

## 4. Styling & Theme System

All design elements are powered by **Tailwind CSS v4** combined with custom CSS variables:
* Custom breakpoints (`tab: 40rem`, `lap: 64rem`, `desk: 80rem`) are configured.
* Light mode uses soft, clean backgrounds (`#f8f8f8`) and dark blue accent tones (`#0f1e33`).
* Dark mode selectors (mapped to the `.dark` class) override variables to paint the dashboard in deep space blue (`#0a1526`) with golden accent pops (`#d4a017`).
