import React from "react";
import SearchInput from "../../ui/SearchInput";
import DropdownBtn from "../../ui/DropdownFilter";
import usePropertiesMain from "./usePropertiesMain";

function SearchBar() {
  const { properties } = usePropertiesMain();
  console.log(properties);
  const status = [
    { label: "All", value: "all" },
    { label: "Available", value: "available" },
    { label: "Sold", value: "sold" },
  ];
  const agentNames = [
    { label: "All", value: "all" },
    ...[
      ...new Set(
        properties?.map((property) => property.listedBy).filter((name) => name) // remove null, undefined, empty string
      ),
    ].map((name) => ({
      label: name,
      value: name,
    })),
  ];

  return (
    <div className="flex items-center justify-between w-full bg-[var(--color-white)] rounded-lg p-3 gap-4 shadow-sm">
      {/* Search Input */}
      <SearchInput field="properties" />
      {/* Dropdowns */}
      <div className="flex items-center gap-3">
        {/* Assigned Agent */}

        <DropdownBtn field={"agent"} items={agentNames}>
          Agent
        </DropdownBtn>
        <DropdownBtn field={"status"} items={status}>
          Status
        </DropdownBtn>

        {/* Status */}
      </div>
    </div>
  );
}

export default SearchBar;
