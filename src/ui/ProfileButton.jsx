import React, { useRef } from "react";
import { HiChevronDown, HiOutlineCog6Tooth, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useUser from "../features/Authentication/useUser";
import useLogoutUser from "../features/Authentication/useLogoutUser";
import useOutsideClick from "../hooks/useOutsideClick";
import LoaderMini from "./LoaderMini";

function ProfileButton({ profileButtonClass }) {
  const { userData, isPending } = useUser();
  const { fullName, assignedRole, profileImage } = userData ? userData : [];
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useOutsideClick(dropdownRef);
  const { logout, isPending: isLoggingOut } = useLogoutUser();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    setIsOpen(false);
  };

  const handleSettings = (e) => {
    e.stopPropagation();
    navigate("/settings");
    setIsOpen(false);
  };

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={profileButtonClass}
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
      >
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover"
            alt={`${fullName || "User"} profile picture`}
            src={profileImage || "/default-user.jpg"}
          />

          <div className="hidden lap:flex flex-col items-start pr-4 text-left">
            <div className="font-semibold text-sm text-neutral-800">
              {isPending ? <LoaderMini /> : fullName}
            </div>
            <div className="text-xs text-neutral-600">
              {isPending ? <LoaderMini /> : assignedRole}
            </div>
          </div>
        </div>

        <HiChevronDown
          className={`w-5 h-5 text-neutral-600 mr-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl z-[9999] overflow-hidden animate-fadeIn">
          <div className="py-1">
            {/* Profile settings */}
            <button
              onClick={handleSettings}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
            >
              <HiOutlineCog6Tooth className="w-5 h-5 text-neutral-500" />
              <span>Settings</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left border-t border-neutral-100"
            >
              <HiOutlineArrowRightOnRectangle className="w-5 h-5 text-red-500" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;

