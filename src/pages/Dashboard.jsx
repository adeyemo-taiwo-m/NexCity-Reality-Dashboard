import React from "react";
import Heading from "../ui/Heading";
import PropertySnapShot from "../features/dashboard/PropertySnapShot";
import { PropertyPerformanceOverviewSection } from "../features/dashboard/PropertyPerformance";
import StatSection from "../features/dashboard/StatSection";
import Header from "../features/dashboard/Header";

function Dashboard() {
  return (
    <section>
      <div className="max-w-6xl mx-auto p-6 flex flex-col gap-8 bg-gray-50 min-h-screen">
        <section className="flex flex-col gap-8 w-full">
          <Header />
          {/* Stats Section */}
          <StatSection />
          {/* Property Snapshot Section */}
          <PropertySnapShot />
        </section>
        <PropertyPerformanceOverviewSection />
      </div>
    </section>
  );
}

export default Dashboard;
