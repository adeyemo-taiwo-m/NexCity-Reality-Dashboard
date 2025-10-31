import React from "react";
import { HiOutlineUser, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import NotificationBtn from "./NotificationBtn";
import ProfileButton from "./ProfileButton";
import useDarkMode from "../hooks/useDarkMode";
import { useNavigate } from "react-router-dom";

// Only the profile image is kept as an import, assuming it's dynamic

function Profile() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const iconButtonClass =
    "relative p-2 rounded-full bg-neutral-200 hover:bg-neutral-300 transition duration-150";
  const iconSize = "w-6 h-6 text-neutral-500";
  // Simplified styles for the profile dropdown button
  const profileButtonClass =
    "flex items-center cursor-pointer gap-3 p-1 pl-3 relative bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200";

  return (
    <div
      className=" flex  items-center justify-end w-full h-16 px-0 lg:px-4 bg-transparent"
      role="banner"
    >
      <nav
        className="flex items-center gap-3 relative"
        aria-label="Utility navigation"
      >
        {/* Notifications Button */}
        <div className="flex items-center gap-2">
          <NotificationBtn onClick={() => navigate("/login")} />
          <NotificationBtn
            onClick={toggleDarkMode}
            icon={
              isDarkMode ? (
                <HiOutlineSun className={`${iconSize} text-normal`} />
              ) : (
                <HiOutlineMoon className={`${iconSize} text-normal`} />
              )
            }
          />

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
        <ProfileButton profileButtonClass={profileButtonClass} />
      </nav>
    </div>
  );
}

export default Profile;
