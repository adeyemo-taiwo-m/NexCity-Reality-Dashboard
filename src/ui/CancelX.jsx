import React from "react";
import { HiX } from "react-icons/hi";

function CancelX({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer h-8 w-8 flex justify-center items-center rounded-md 
                 hover:text-normal-hover text-normal bg-light hover:bg-light-hover"
      aria-label="Close modal"
    >
      <HiX />
    </button>
  );
}

export default CancelX;
