import React from "react";
import { HiOutlineBell } from "react-icons/hi2";

function NotificationBtn({ icon }) {
  const iconButtonClass =
    "relative p-2 rounded-full bg-light cursor-pointer  hover:bg-light-hover transition duration-150";
  const iconSize = "w-6 h-6 text-normal";

  return (
    <button
      className={`${iconButtonClass} `}
      aria-label="Notifications"
      type="button"
    >
      {icon || <HiOutlineBell className={iconSize} />}
      {/* Notification Badge implementation */}
      {!icon && (
        <div className="absolute -top-0.5 -right-0.5 lg:top-1 lg:right-1 w-4 h-4 bg-normal rounded-full flex items-center justify-center">
          <span
            className="text-white text-xs font-medium"
            aria-label="6 notifications"
          >
            6
          </span>
        </div>
      )}
    </button>
  );
}

export default NotificationBtn;
