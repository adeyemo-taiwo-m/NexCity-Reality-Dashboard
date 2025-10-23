import React from "react";
import { statsData } from "../../assets/data";

function StatSection() {
  const colorClasses = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    red: "text-amber-500 bg-amber-50",
    indigo: "text-indigo-500 bg-indigo-50",
  };
  return (
    <div className="grid lap:grid-cols-4 tab:grid-cols-2 grid-cols-1 gap-6">
      {statsData.map((stat) => (
        <div
          key={stat.id}
          className="bg-white text-normal rounded-lg p-4 flex items-center gap-4 shadow-sm"
        >
          <span className={`p-2 rounded-full ${colorClasses[stat.color]} `}>
            {stat.icon}
          </span>
          <div>
            <p className="text-sm text-neutral-500">{stat.label}</p>
            <h3 className="text-2xl font-semibold ">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatSection;
