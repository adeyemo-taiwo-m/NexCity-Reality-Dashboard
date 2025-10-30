import React from "react";
import { FaHome } from "react-icons/fa";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function ClientCount({ count }) {
  const navigate = useNavigate();

  return (
    <aside
      className="flex md:flex-row items-center justify-between w-full mx-auto 
      bg-[var(--color-normal)] text-[var(--color-white)] 
      rounded-xl px-5 py-3 shadow-md"
      role="complementary"
      aria-label="Property booking notification"
    >
      {/* Left section */}
      <div className="flex items-center w-2/3 gap-4 text-sm md:text-base text-[var(--color-white-hover)]">
        {/* Icon or Image */}
        <div
          className="flex items-center justify-center w-10 h-10 
        bg-[var(--color-light)] rounded-full"
        >
          <FaHome
            className="text-[var(--color-normal)] text-xl"
            aria-hidden="true"
          />
        </div>

        {/* Message */}
        <p className="leading-snug font-normal text-sm">
          <span className="font-semibold">{count} customers</span> just booked
          some properties
        </p>
      </div>

      {/* Button */}
      <Button variant="light" onClick={() => navigate("/customers")}>
        View more
      </Button>
    </aside>
  );
}
