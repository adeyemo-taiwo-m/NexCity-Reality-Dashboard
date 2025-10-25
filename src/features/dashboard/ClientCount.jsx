import React from "react";
import { FaHome } from "react-icons/fa"; // optional icon for better visuals
import Button from "../../ui/Button";

export default function ClientCount() {
  return (
    <aside
      className="flex  md:flex-row items-center justify-between w-full  mx-auto bg-[#054484] text-white rounded-xl px-5 py-3 shadow-md"
      role="complementary"
      aria-label="Property booking notification"
    >
      {/* Left section */}
      <div className="flex items-center w-2/3 gap-4 text-sm md:text-base text-gray-100">
        {/* Icon or Image */}
        <div className="flex items-center justify-center w-10 h-10 bg-light/10 rounded-full">
          <FaHome className="text-light text-xl" aria-hidden="true" />
        </div>

        {/* Message */}
        <p className="leading-snug font-normal text-sm">
          <span className="font-semibold">23 customers</span> just booked some
          properties
        </p>
      </div>

      {/* Button */}
      <Button variant="light">View more</Button>
    </aside>
  );
}
