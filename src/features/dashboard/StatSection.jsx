import React from "react";
import { statsData } from "../../assets/data";

function StatSection() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm"
        >
          {stat.icon}
          <div>
            <p className="text-sm text-neutral-500">{stat.label}</p>
            <h3 className="text-xl font-semibold text-normal">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatSection;
