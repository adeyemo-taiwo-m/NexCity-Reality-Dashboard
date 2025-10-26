import React from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import DropdownBtn from "../../ui/DropdownBtn";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";
import {
  transactionAmount,
  transactionDate,
  transactionType,
} from "../../assets/data";
import SearchBarSection from "../../ui/SearchBarSection";

function AgentsSearchBar() {
  return (
    <SearchBarSection
      item1={<SearchInput field={"by name"} />}
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
            items={transactionType}
            icon={
              <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
            }
          >
            Type
          </DropdownBtn>
          <DropdownBtn
            items={transactionAmount}
            icon={
              <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
            }
          >
            Price
          </DropdownBtn>

          {/* <DropdownBtn
          icon={
            <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
          }
        >
          Status
        </DropdownBtn> */}
        </div>
      }
    />
  );
}

export default AgentsSearchBar;
