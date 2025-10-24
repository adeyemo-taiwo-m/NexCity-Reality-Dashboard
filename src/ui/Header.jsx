import React from "react";
import Logo from "./Logo";
import Profile from "./Profile";
import { HiOutlineBars3 } from "react-icons/hi2";

function Header({ onToggleSidebar }) {
  return (
    <header
      className="
        h-16
        bg-white/80 
        backdrop-blur-md backdrop-saturate-150
        border-b border-neutral-200
        flex items-center justify-between
        p-6 py-8  lap:p-8 lap:py-10
        flex-shrink-0
        fixed top-0 left-0 w-full z-50
        tab:static
      "
    >
      <div className="flex items-center gap-4">
        {/* Mobile/tablet menu button */}
        <button
          className="p-2 cursor-pointer rounded-md lap:hidden hover:text-normal-hover text-normal bg-light hover:bg-light-hover"
          aria-label="Open menu"
          onClick={onToggleSidebar}
          type="button"
        >
          <HiOutlineBars3 className="w-6 h-6" />
        </button>

        <Logo />
      </div>

      <div className="flex items-center space-x-4">
        <Profile />
      </div>
    </header>
  );
}

export default Header;
