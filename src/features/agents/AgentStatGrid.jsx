import React from "react";
import { stats } from "../../assets/data";
import StatCard from "./AgentsStatCard";
import StatCards from "../../ui/StatCards";

const AgentStatsGrid = () => {
  return (
    <div
      className="grid gap-6
      grid-cols-1 tab:grid-cols-3 lap:grid-cols-4
      justify-items-center"
    >
      {stats.map((item, i) => (
        <StatCards key={i} {...item} />
      ))}
    </div>
  );
};

export default AgentStatsGrid;
