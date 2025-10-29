import React from "react";

function Heading({ children, type, className }) {
  const styles = {
    h1: " tab:text-3xl text-2xl lap:text-4xl font-semibold text-normal",
    h2: " tab:text-2xl text-xl  font-semibold text-normal",
    h3: " tab:text-1xl text-lg  font-semibold text-normal",
  };
  return (
    <div className={`${styles[type] || styles.h1} ${className}`}>
      {children}
    </div>
  );
}

export default Heading;
