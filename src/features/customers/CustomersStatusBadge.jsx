import React from "react";

const CustomersStatusBadge = ({ status }) => {
  let styles = "";

  switch (status) {
    case "Closed":
    case "Completed":
      styles = "bg-[#fef9c3] text-[#92400e]"; // green
      break;
    case "Active":
    case "Pending":
      styles = "bg-[#d1fae5] text-[#065f46]"; // yellow
      break;
    case "Cancelled":
      styles = "bg-[#fee2e2] text-[#991b1b]"; // red
      break;
    default:
      styles = "bg-[#e0f2fe] text-[#075985]"; // blue fallback
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${styles}`}
    >
      {status}
    </span>
  );
};

export default CustomersStatusBadge;
