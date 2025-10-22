import React, { useState } from "react";

function Filter({ field, defaultValue = "last7" }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(defaultValue);

  return (
    <div className="bg-white p-1 rounded-lg shadow-sm flex gap-1">
      {field.map((option) => (
        <button
          key={option.id}
          onClick={() => setSelectedTimeRange(option.id)}
          className={`px-3 cursor-pointer py-1 rounded-md text-sm font-medium transition ${
            selectedTimeRange === option.id
              ? "bg-normal text-white"
              : "text-neutral-600 hover:bg-light"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
