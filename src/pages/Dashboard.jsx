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
    <section className="w-full min-h-screen  overflow-hidden">
      {" "}
      {/* Added overflow-hidden */}
      <div className="mx-auto flex flex-col gap-8 w-full ">
        {" "}
        {/* Added max-w-full */}
        {/* Header */}
        <Header />
        <StatCards statData={statsData} />
        <div className="flex flex-col gap-6 lap:flex-row  ">
          {" "}
          {/* Added width constraints */}
          <div className="flex  flex-col gap-6  overflow-hidden">
            {" "}
            <ClientCount />
            <PropertySnapShot />
          </div>
          <div className="  overflow-hidden">
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
