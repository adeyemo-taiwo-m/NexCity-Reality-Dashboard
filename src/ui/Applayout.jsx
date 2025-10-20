// AppLayout.jsx
import React, { useState } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";
import SideNavLap from "./SideNavLap";

const AppLayout = () => {
  // Manage sidebar open state for small screens
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-content-bg text-neutral-700">
      <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} />

      <div className="flex flex-1 h-full overflow-hidden">
        {/* SideNav receives open state; it will be hidden on small screens unless open */}

        <SideNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <SideNavLap />

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
};

export default AppLayout;
