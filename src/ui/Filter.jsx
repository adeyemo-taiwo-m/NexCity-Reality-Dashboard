import React, { useState } from "react";

function Filter({ field, defaultValue = "last7" }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(defaultValue);

  return (
    <div className="bg-white p-1 rounded-lg shadow-sm flex ">
      {field.map((option) => (
        <button
          key={option.id}
          onClick={() => setSelectedTimeRange(option.id)}
          className={` cursor-pointer py-1  rounded-md text-[8px] tab:text-base px-2 font-normal transition ${
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
