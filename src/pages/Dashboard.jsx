import React from "react";
import Heading from "../ui/Heading";
import PropertySnapShot from "../features/dashboard/PropertySnapShot";
import { PropertyPerformanceOverviewSection } from "../features/dashboard/PropertyPerformance";
import StatSection from "../features/dashboard/StatSection";
import Header from "../features/dashboard/Header";
import ClientCount from "../features/dashboard/ClientCount";
import RecentHouseMap from "../features/dashboard/RecentHouseMap";

function Dashboard() {
  return (
    <section className="w-full min-h-screen bg-gray-50 ">
      <div className="mx-auto flex flex-col gap-8 w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Header />

        <StatSection />

        <div className="flex flex-col gap-6 lap:flex-row lap:items-stretch">
          <div className="flex flex-col gap-6 lap:w-1/2">
            <ClientCount />
            <PropertySnapShot />
          </div>

          <div className="lap:flex-1 w-full">
            <RecentHouseMap />
          </div>
        </div>

        <PropertyPerformanceOverviewSection />
      </div>
    </section>
  );
}

export default Dashboard;
