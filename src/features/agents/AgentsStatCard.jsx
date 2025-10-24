import React from "react";
import Heading from "../../ui/Heading";

const StatCard = ({ title, value, icon, color = "blue", className = "" }) => {
  const colorClasses = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    red: "text-amber-500 bg-amber-50",
    indigo: "text-indigo-500 bg-indigo-50",
  };

  return (
    <div
      className={`flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-200 w-full 
       ${className}`}
    >
      <div
        className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
          colorClasses[color].split(" ")[1]
        }`}
      >
        <span className={`${colorClasses[color]}`}>{icon}</span>
      </div>

      <div>
        <Heading type="h2">{title}</Heading>
        <p className="text-2xl font-bold text-normal mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
