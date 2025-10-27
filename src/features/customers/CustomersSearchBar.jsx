import React from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import DropdownBtn from "../../ui/DropdownBtn";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";
import SearchBarSection from "../../ui/SearchBarSection";

function AgentsSearchBar() {
  const statusRangeOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "closed", label: "Clossed" },
  ];

  const customerSortOptions = [
    { label: "Amount (High to Low)", value: "amount-asc" },
    { label: "Amount (Low to High)", value: "amount-desc" },
  ];

  return (
    <SearchBarSection
      item1={<SearchInput field="customer by name" />}
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
          <Filter options={statusRangeOptions} field="status" />
        </div>
      }
    />
  );
}

export default AgentsSearchBar;
