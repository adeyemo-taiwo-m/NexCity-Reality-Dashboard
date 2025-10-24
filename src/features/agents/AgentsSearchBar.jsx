import React from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import DropdownBtn from "../../ui/DropdownBtn";
import { statusRangeOptions } from "../../assets/data";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";

function AgentsSearchBar() {
  return (
    <div className="flex items-center justify-between w-full bg-[var(--color-white)] rounded-lg p-3 gap-4 shadow-sm">
      {/* Search Input */}
      <SearchInput field="agent by name or email" />

      {/* Dropdowns */}
      <div className="flex items-center gap-3">
        {/* Assigned Agent */}

        <DropdownBtn>Sort</DropdownBtn>
        <Filter field={statusRangeOptions} defaultValue="all" />

        {/* Status */}
      </div>
    </div>
  );
}

export default AgentsSearchBar;
