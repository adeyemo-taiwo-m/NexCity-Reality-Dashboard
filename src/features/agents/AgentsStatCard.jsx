import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";

const StatCard = ({ title, value, icon, color = "blue", className = "" }) => {
  const colorClasses = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    red: "text-amber-500 bg-amber-50",
    indigo: "text-indigo-500 bg-indigo-50",
  };
  return (
    <div
      className={`flex flex-1 items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div
        className={`flex-shrink-0 w-14 h-14 rounded-full bg-${color}-50 flex items-center justify-center`}
      >
        <span className={`${colorClasses[color]}`}> {icon}</span>
      </div>

      <div>
        <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
        <p className="text-2xl font-bold text-normal mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
