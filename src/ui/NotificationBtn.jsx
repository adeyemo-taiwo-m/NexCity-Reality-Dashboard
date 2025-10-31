import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi2";

function NotificationBtn({ icon, onClick }) {
  const iconButtonClass =
    "relative p-2 rounded-full bg-light cursor-pointer  hover:bg-light-hover transition duration-150";
  const iconSize = "w-6 h-6 text-normal";

  return (
    <button
      onClick={onClick}
      className={`${iconButtonClass} `}
      aria-label="Notifications"
      type="button"
    >
      {icon || <HiOutlineLogout className={iconSize} />}
      {/* Notification Badge implementation */}
    </button>
  );
}

export default NotificationBtn;
