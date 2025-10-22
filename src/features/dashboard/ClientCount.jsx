import React from "react";
import { FaHome } from "react-icons/fa"; // optional icon for better visuals

export default function ClientCount() {
  return (
    <aside
      className="flex  md:flex-row items-center justify-between w-full  mx-auto bg-[#054484] text-white rounded-xl px-5 py-3 shadow-md"
      role="complementary"
      aria-label="Property booking notification"
    >
      {/* Left section */}
      <div className="flex items-center  gap-4 text-sm md:text-base text-gray-100">
        {/* Icon or Image */}
        <div className="flex items-center justify-center w-10 h-10 bg-light/10 rounded-full">
          <FaHome className="text-light text-xl" aria-hidden="true" />
        </div>

        {/* Message */}
        <p className="leading-snug">
          <span className="font-semibold">23 customers</span> just booked some
          properties — check them out now!
        </p>
      </div>

      {/* Button */}
      <button
        type="button"
        className=" inline-flex items-center justify-center px-4 py-2 bg-light text-[#054484] font-medium text-sm rounded-lg shadow hover:bg-light-hover transition-all duration-200"
        aria-label="View recently booked properties"
      >
        View Properties
      </button>
    </aside>
  );
}
