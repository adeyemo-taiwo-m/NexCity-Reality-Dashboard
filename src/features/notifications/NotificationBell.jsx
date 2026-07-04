import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineBell } from "react-icons/hi2";
import { markAllRead } from "./notificationsSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import { formatDistanceToNow } from "date-fns";

function NotificationBell() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useOutsideClick(dropdownRef);

  const { items, unreadCount, isConnected } = useSelector(
    (state) => state.notifications
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    dispatch(markAllRead());
  };

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={handleToggle}
        className="relative p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-150 cursor-pointer"
        aria-label="Notifications"
        type="button"
      >
        <HiOutlineBell className="w-6 h-6 text-neutral-600" />
        
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}

        {/* Connection Status Dot */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
          title={isConnected ? "Realtime Connected" : "Realtime Disconnected"}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-80 bg-white border border-neutral-200 rounded-xl shadow-xl z-[9999] overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-100">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-neutral-800">Notifications</span>
              <span className="text-xs text-neutral-400 font-normal">
                ({isConnected ? "live" : "offline"})
              </span>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-[var(--color-normal)] hover:text-opacity-80 transition-colors cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="p-6 text-center text-neutral-500 text-sm">
                No notifications yet.
              </div>
            ) : (
              items.map((item, idx) => {
                let icon = "🔔";
                let iconBg = "bg-blue-50 text-blue-600";
                if (item.type === "property") {
                  icon = "🏠";
                  iconBg = "bg-indigo-50 text-indigo-600";
                } else if (item.type === "transaction") {
                  icon = "₦";
                  iconBg = "bg-green-50 text-green-600 font-bold";
                } else if (item.type === "customer") {
                  icon = "👥";
                  iconBg = "bg-amber-50 text-amber-600";
                }

                return (
                  <div
                    key={idx}
                    className="flex gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg} text-sm`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-700 font-medium break-words leading-tight">
                        {item.message}
                      </p>
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
