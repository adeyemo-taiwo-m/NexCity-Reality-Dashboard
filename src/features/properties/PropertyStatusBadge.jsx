import React from "react";

const PropertyStatusBadge = ({ status }) => {
  let styles = "";

  switch (status.toLowerCase()) {
    case "available":
      styles = "bg-[#d1fae5] text-[#065f46]"; // green
      break;
    case "sold":
      styles = "bg-[#fee2e2] text-[#991b1b]"; // red
      break;
    default:
      styles = "bg-[#e0f2fe] text-[#075985]"; // blue fallback
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${styles}`}
    >
      {status}
    </span>
  );
};

export default PropertyStatusBadge;
