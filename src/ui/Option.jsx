import React from "react";

function Option({ value }) {
  return (
    <option
      className="
        block w-full text-left px-4 py-2 text-sm text-neutral-700
        hover:bg-neutral-100 transition-colors
      "
      value={value}
    >
      {value}
    </option>
  );
}

export default Option;
