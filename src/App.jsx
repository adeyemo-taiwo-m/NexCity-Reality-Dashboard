import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/Applayout";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Agents from "./pages/Agents";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
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
      </BrowserRouter>
    </div>
  );
}

export default App;
