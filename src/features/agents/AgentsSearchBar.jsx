import React from "react";
import DropdownBtn from "../../ui/DropdownBtn";
import { dealsSortOptions } from "../../assets/data";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";
import useAgents from "./useAgents";

function AgentsSearchBar() {
  const statusRangeOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  const { agents } = useAgents();
  return (
    <div className="flex items-center justify-between w-full bg-[var(--color-white)] rounded-lg p-3 gap-4 shadow-sm">
      <SearchInput agents={agents} field="agent by name or email" />

      <div className="flex items-center gap-3">
        <DropdownBtn items={dealsSortOptions}>Sort</DropdownBtn>
        <Filter options={statusRangeOptions} field="status" />
      </div>
    </div>
  );
}

export default AgentsSearchBar;
