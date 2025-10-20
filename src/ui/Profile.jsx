import React from "react";
// Import Heroicons for clean dashboard aesthetics
import { HiOutlineUser, HiChevronDown, HiOutlineMoon } from "react-icons/hi2";
import NotificationBtn from "./NotificationBtn";

// Only the profile image is kept as an import, assuming it's dynamic

function Profile() {
  // Utility classes for standard, clickable icons/buttons
  const iconButtonClass =
    "relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150";
  const iconSize = "w-6 h-6 text-gray-500";
  // Simplified styles for the profile dropdown button
  const profileButtonClass =
    "flex items-center gap-3 p-1 pl-3 relative bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200";

  return (
    <div
      className="flex items-center justify-end w-full h-16 px-0 lg:px-4 bg-transparent"
      role="banner"
    >
      <nav
        className="flex items-center gap-3 relative"
        aria-label="Utility navigation"
      >
        {/* Notifications Button */}
        <div className="flex items-center gap-2">
          <NotificationBtn />
          <NotificationBtn
            icon={<HiOutlineMoon className={`${iconSize} text-normal`} />}
          />

          {/* Small profile icon on sm+ screens */}
          <button
            className={`${iconButtonClass} hidden lg:inline-flex`}
            aria-label="Agent Profile Shortcut"
            type="button"
          >
            <HiOutlineUser className={iconSize} />
          </button>
        </div>

        {/* Separator (Line) - show only on lg+ */}
        <div
          className="hidden lg:block h-8 border-r border-neutral-300 mx-2"
          aria-hidden="true"
        />

        {/* Main User Menu Dropdown Button */}
        <div className="relative">
          <button
            className={profileButtonClass}
            aria-label="User menu"
            aria-haspopup="true"
            type="button"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                alt="Adeyemo Taiwo M profile picture"
                src="/profile.png"
              />

              <div className="hidden lap:flex flex-col items-start pr-4 text-left">
                <div className="font-semibold text-sm text-neutral-800">
                  Adeyemo Taiwo M
                </div>
                <div className="text-xs text-neutral-500">Senior Agent</div>
              </div>
            </div>

            <HiChevronDown
              className="w-5 h-5 text-gray-00 mr-2"
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Profile;
