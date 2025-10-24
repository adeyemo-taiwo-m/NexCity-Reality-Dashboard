import React from "react";
import { HiSearch } from "react-icons/hi";

function SearchInput({ field }) {
  return (
    <div className="flex items-center w-full max-w-sm relative">
      <HiSearch className="absolute left-3 text-[var(--color-neutral-500)] " />
      <input
        type="text"
        placeholder={`Search ${field}...`}
        className="w-full h-10 pl-8 pr-4 text-sm border border-[var(--color-neutral-200)] rounded-md 
                         text-[var(--color-neutral-800)] placeholder:text-[var(--color-neutral-500)] placeholder:font-normal
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)] focus:border-[var(--color-normal)] 
                         bg-[var(--color-white)]"
      />
    </div>
  );
}

export default SearchInput;
