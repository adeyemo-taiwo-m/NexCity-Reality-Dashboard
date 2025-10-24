import React from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import DropdownBtn from "../../ui/DropdownBtn";
import SearchInput from "../../ui/SearchInput";

function SearchBar() {
  return (
    <div className="flex items-center justify-between w-full bg-[var(--color-white)] rounded-lg p-3 gap-4 shadow-sm">
      {/* Search Input */}
      <SearchInput field="properties" />
      {/* Dropdowns */}
      <div className="flex items-center gap-3">
        {/* Assigned Agent */}

        <DropdownBtn
          icon={
            <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
          }
        >
          Agent
        </DropdownBtn>
        <DropdownBtn
          icon={
            <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
          }
        >
          Status
        </DropdownBtn>

        {/* Status */}
      </div>
    </div>
  );
}

export default SearchBar;
