import React from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import DropdownBtn from "../../ui/DropdownBtn";
import { statusRangeOptions } from "../../assets/data";
import Filter from "../../ui/Filter";

function AgentsSearchBar() {
  return (
    <div className="flex items-center justify-between w-full bg-[var(--color-white)] rounded-lg p-3 gap-4 shadow-sm">
      {/* Search Input */}
      <div className="flex items-center w-full max-w-sm relative">
        <HiSearch className="absolute left-3 text-[var(--color-neutral-500)] " />
        <input
          type="text"
          placeholder="Search agent by name or email..."
          className="w-full h-10 pl-10 pr-4 text-sm border border-[var(--color-neutral-200)] rounded-md 
                     text-[var(--color-neutral-800)] placeholder:text-[var(--color-neutral-500)]
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)] focus:border-[var(--color-normal)] 
                     bg-[var(--color-white)]"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex items-center gap-3">
        {/* Assigned Agent */}

        <DropdownBtn>Sort by</DropdownBtn>
        <Filter field={statusRangeOptions} defaultValue="all" />

        {/* Status */}
      </div>
    </div>
  );
}

export default AgentsSearchBar;
