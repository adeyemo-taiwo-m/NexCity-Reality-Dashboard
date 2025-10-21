import React from "react";
import { NavLink } from "react-router-dom";

function NavLinkItem({ icon, children, to }) {
  const baseClasses =
    "flex items-center cursor-pointer space-x-3 px-3 py-2 rounded-md transition-colors duration-150 text-neutral-700";
  const activeHoverClasses = "bg-light text-neutral-800";

  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <div
          className={`${baseClasses} ${
            isActive ? activeHoverClasses : "hover:bg-light"
          }`}
        >
          <span
            className={`text-lg transition-colors duration-150 ${
              isActive ? "text-normal" : "text-gray-500"
            }`}
          >
            {icon}
          </span>
          <span>{children}</span>
        </div>
      )}
    </NavLink>
  );
}

export default NavLinkItem;
