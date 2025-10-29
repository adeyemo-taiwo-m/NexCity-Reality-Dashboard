import React from "react";

function InputErrorP({ error }) {
  return (
    <p className="text-sm text-left text-red-500 mt-1">{error?.message}</p>
  );
}

export default InputErrorP;
