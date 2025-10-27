import React from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import DropdownBtn from "../../ui/DropdownBtn";
import SearchInput from "../../ui/SearchInput";
import SearchBarSection from "../../ui/SearchBarSection";
import DropdownFilter from "../../ui/DropdownFilter";

function AgentsSearchBar() {
  const transactionAmount = [
    { label: "High to Low", value: "amount-asc" },
    { label: "Low to High", value: "amount-desc" },
  ];
  const transactionDate = [
    { label: "Newest First", value: "date-asc" },
    { label: "Oldest First", value: "date-desc" },
    // { label: "This Month" },
  ];

  const transactionType = [
    { label: "All", value: "all" },
    { label: "Sale", value: "sale" },
    { label: "Rent", value: "rent" },
    { label: "Lease", value: "lease" },
    { label: "Buy", value: "buy" },
  ];

  return (
    <SearchBarSection
      item1={<SearchInput field={" by property name"} />}
      item2={
        <div className="flex items-center gap-2 tab:gap-3">
          {/* Assigned Agent */}

          <DropdownBtn
            items={transactionDate}
            icon={
              <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
            }
          >
            Date
          </DropdownBtn>
          <DropdownBtn
            items={transactionAmount}
            icon={
              <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
            }
          >
            Price
          </DropdownBtn>
          <DropdownFilter items={transactionType} field={"type"}>
            Type
          </DropdownFilter>
        </div>
      }
    />
  );
}

export default AgentsSearchBar;
