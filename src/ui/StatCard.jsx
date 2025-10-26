import React from "react";
import Heading from "./Heading";

function StatCard({ statData }) {
  const colorClasses = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    red: "text-amber-500 bg-amber-50",
    indigo: "text-indigo-500 bg-indigo-50",
  };
  return (
    <div className="bg-white text-normal  rounded-lg p-4 flex items-center gap-4 shadow-sm">
      <span className={`p-2 rounded-full ${colorClasses[statData.color]} `}>
        {statData.icon}
      </span>
      <div>
        <p className="text-sm font-normal text-neutral-500">{statData.label}</p>
        <Heading type="h2">{statData.value}</Heading>
      </div>
    </div>
  );
}

export default StatCard;
