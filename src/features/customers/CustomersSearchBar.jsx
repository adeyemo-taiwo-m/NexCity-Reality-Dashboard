import React from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import DropdownBtn from "../../ui/DropdownBtn";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";
import { customerSortOptions, customerStatusOptions } from "../../assets/data";
import SearchBarSection from "../../ui/SearchBarSection";

function AgentsSearchBar() {
  return (
    <SearchBarSection
      item1={<SearchInput field="agent by name or email" />}
      item2={
        <div className="flex items-center gap-3">
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
      }
    />
  );
}

export default AgentsSearchBar;
