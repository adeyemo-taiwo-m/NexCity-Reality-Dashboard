import React from "react";
import DropdownBtn from "../../ui/DropdownBtn";
import { dealsSortOptions } from "../../assets/data";
import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInput";
import useAgents from "./useAgents";
import SearchBarSection from "../../ui/SearchBarSection";

function AgentsSearchBar() {
  const statusRangeOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  const { agents } = useAgents();
  return (
    <SearchBarSection
      item1={<SearchInput agents={agents} field="agent by name or email" />}
      item2={
        <>
          {" "}
          <DropdownBtn items={dealsSortOptions}>Sort</DropdownBtn>
          <Filter options={statusRangeOptions} field="status" />
        </>
      }
    />
  );
}

export default AgentsSearchBar;
