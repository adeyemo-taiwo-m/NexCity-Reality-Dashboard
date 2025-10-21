import React, { useState } from "react";
import { timeRangeOptions } from "../../assets/data";
import Heading from "../../ui/Heading";

function Header() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("last7");

  return (
    <header className="flex justify-between items-center">
      <Heading>Dashboard</Heading>

      <div className="bg-white p-1 rounded-lg shadow-sm flex gap-1">
        {timeRangeOptions.map((option) => (
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
    </header>
  );
}

export default Header;
