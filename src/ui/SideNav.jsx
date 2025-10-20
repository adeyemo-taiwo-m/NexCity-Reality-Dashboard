import React from "react";
// Import NavLink instead of Link to handle active state automatically
import { NavLink } from "react-router-dom";
import {
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineBanknotes,
  HiOutlineCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { BsHouses } from "react-icons/bs";
import LogoutBtn from "./LogoutBtn";
import NavLinkItem from "./NavLinkItem";
import MainSIdeNav from "./MainSIdeNav";

function SideNav({ isOpen = false, onClose = () => {} }) {
  return (
    /*
      Desktop/Tablet: static sidebar (w-64).
      Mobile: hidden by default; when isOpen, show a fixed overlay drawer.
    */
    <>
      {/* Overlay drawer for tablet and mobile (below lg) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />

          <aside className="relative w-64 bg-white h-full shadow-xl border-r border-gray-200">
            <div className="p-4 flex items-center justify-between">
              <div className="font-semibold">Menu</div>
              <button
                onClick={onClose}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <MainSIdeNav />
          </aside>
        </div>
      )}
    </>
  );
}

export default SideNav;
