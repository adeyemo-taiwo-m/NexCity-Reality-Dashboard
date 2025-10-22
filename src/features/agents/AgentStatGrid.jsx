import React from "react";
import { stats } from "../../assets/data";
import StatCard from "./AgentsStatCard";

const AgentStatsGrid = () => {
  return (
    <div className="flex flex-wrap gap-5 ">
      {stats.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
};

export default AgentStatsGrid;
