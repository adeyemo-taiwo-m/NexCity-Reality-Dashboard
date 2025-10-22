import React from "react";

const AgentStatusBadge = ({ status }) => {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
        isActive
          ? "bg-[#d1fae5] text-[#065f46]" // light-green background + dark green text
          : "bg-[#fef9c3] text-[#92400e]" // light-yellow background + brown-yellow text
      }`}
    >
      {status}
    </span>
  );
};

export default AgentStatusBadge;
