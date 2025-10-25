import React from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import DropdownBtn from "../../ui/DropdownBtn";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";
import { customerSortOptions, customerStatusOptions } from "../../assets/data";

function AgentsSearchBar() {
  return (
    <div className="flex items-center justify-between w-full bg-[var(--color-white)] rounded-lg p-3 gap-4 shadow-sm">
      <SearchInput field="agent by name or email" />

      {/* Dropdowns */}
      <div className="flex items-center gap-3">
        {/* Assigned Agent */}

        {/* <DropdownBtn
          icon={
            <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
          }
        >
          Price Range
        </DropdownBtn> */}

        <DropdownBtn
          items={customerSortOptions}
          icon={
            <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
          }
        >
          Sort
        </DropdownBtn>

        <DropdownBtn
          items={customerStatusOptions}
          icon={
            <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
          }
        >
          Status
        </DropdownBtn>
      </div>
    </div>
  );
}

export default AgentsSearchBar;
