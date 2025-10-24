import React from "react";
import Heading from "../ui/Heading";
import PropertySnapShot from "../features/dashboard/PropertySnapShot";
import { PropertyPerformanceOverviewSection } from "../features/dashboard/PropertyPerformance";
import StatSection from "../features/dashboard/StatSection";
import Header from "../features/dashboard/Header";
import ClientCount from "../features/dashboard/ClientCount";
import RecentHouseMap from "../features/dashboard/RecentHouseMap";
import { statsData } from "../assets/data";
import StatCards from "../ui/StatCards";

function Dashboard() {
  return (
    <section className="w-full min-h-screen bg-gray-50 overflow-hidden">
      {" "}
      {/* Added overflow-hidden */}
      <div className="mx-auto flex flex-col gap-8 w-full ">
        {" "}
        {/* Added max-w-full */}
        {/* Header */}
        <Header />
        <StatCards statData={statsData} />
        <div className="flex flex-col gap-6 lap:flex-row  w-full max-w-full">
          {" "}
          {/* Added width constraints */}
          <div className="flex flex-col gap-6  overflow-hidden">
            {" "}
            {/* Critical fix here */}
            <ClientCount />
            <PropertySnapShot />
          </div>
          <div className="lap:flex-1 w-full max-w-full overflow-hidden">
            {" "}
            {/* Added overflow-hidden */}
            <RecentHouseMap />
          </div>
        </div>
        <PropertyPerformanceOverviewSection />
      </div>
    </section>
  );
}
export default Dashboard;
