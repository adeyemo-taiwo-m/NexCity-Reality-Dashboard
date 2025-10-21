import React from "react";

function Heading({ children, type }) {
  const styles = {
    h1: " text-3xl lap:text-4xl font-semibold text-normal",
    h2: " text-2xl  font-semibold text-normal",
  };
  return <p className={styles[type] || styles.h1}>{children}</p>;
}

export default Heading;
