import React from "react";

function Heading({ children }) {
  return (
    <p className=" text-3xl lap:text-4xl font-semibold text-normal">
      {children}
    </p>
  );
}

export default Heading;
