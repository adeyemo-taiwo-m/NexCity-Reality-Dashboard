import React from "react";
import { statsData } from "../../assets/data";
import Heading from "../../ui/Heading";
import useProperties from "./useProperties";

function StatSection() {
  const { properties, isPending } = useProperties();
  if (isPending) return null;
  console.log(properties);
  // const totalProperties = properties ? proprties.length : 0;

  const colorClasses = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    red: "text-amber-500 bg-amber-50",
    indigo: "text-indigo-500 bg-indigo-50",
  };
  return (
    <div className="grid lap:grid-cols-4 tab:grid-cols-2 grid-cols-1 gap-2 tab:gap-4 lap:gap-6">
      {statsData.map((stat) => (
        <div
          key={stat?.id}
          className="bg-white text-normal rounded-lg p-4 flex items-center gap-4 shadow-sm"
        >
          <span className={`p-2 rounded-full ${colorClasses[stat.color]} `}>
            {stat.icon}
          </span>
          <div>
            <p className="text-sm font-normal text-neutral-500">{stat.label}</p>
            <Heading type="h2">{stat.value}</Heading>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatSection;
