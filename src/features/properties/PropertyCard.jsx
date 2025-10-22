import React from "react";
import { HiCalendar } from "react-icons/hi";

function PropertyCard() {
  return (
    <div className="flex items-center bg-[var(--color-white)] rounded-xl shadow-sm overflow-hidden w-full max-w-4xl mx-auto p-4">
      {/* Image */}
      <img
        src="/house.png"
        alt="Cedar Ridge Residences"
        className="w-40 h-28 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex justify-between items-center flex-1 ml-4">
        {/* Left Section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-[var(--color-neutral-900)]">
            Cedar Ridge Residences
          </h2>
          <p className="text-sm text-[var(--color-neutral-500)]">
            3-Bedroom Duplex, Lekki Phase 1, Lagos
          </p>

          <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-500)] mt-1">
            <span>
              Listed by{" "}
              <span className="font-semibold text-[var(--color-neutral-700)]">
                Adeyemo Taiwo M
              </span>
            </span>
            <HiCalendar className="text-[var(--color-neutral-500)] text-base" />
            <span>24 Feb</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-2">
          <span className="bg-[var(--color-green-light)] text-[var(--color-dark)] text-sm font-medium px-4 py-1 rounded-full">
            Available
          </span>
          <span className="text-[var(--color-normal)] font-semibold text-lg">
            $100,000
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
