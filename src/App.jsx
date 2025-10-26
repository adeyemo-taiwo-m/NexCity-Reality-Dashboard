import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/Applayout";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Agents from "./pages/Agents";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="agents" element={<Agents />} />
              <Route path="customers" element={<Customers />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#ffffff",
                color: "var(--color-neutral-600)",
                border: "1px solid #f1f1f1",
                padding: "10px 14px",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: 500,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              },
              success: {
                icon: <HiCheckCircle size={20} color="#22c55e" />,
              },
              error: {
                icon: <HiXCircle size={20} color="#ef4444" />,
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
