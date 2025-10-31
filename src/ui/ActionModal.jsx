import React, { useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";

function ActionModal({ items = [], disabled }) {
  const modalRef = useRef(null);
  const [open, setOpen] = useOutsideClick(modalRef);

  function handleClick(item) {
    item.onClick?.();
    setOpen(false);
  }

  return (
    <div className="relative  inline-block text-left" ref={modalRef}>
      {/* Dots button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-md bg-light  m-2 cursor-pointer hover:bg-light-hover transition-colors"
      >
        <HiOutlineDotsVertical className="text-neutral-600 cursor-pointer text-lg" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40 bg-white border border-neutral-400 
            rounded-lg shadow-md z-20 overflow-hidden
          "
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <button
                disabled={disabled}
                key={index}
                onClick={() => handleClick(item)}
                className="
                  flex cursor-pointer items-center gap-2 w-full text-left px-4 py-2 text-sm 
                  text-neutral-700 hover:bg-light transition-colors
                "
              >
                {item.icon && (
                  <item.icon className="text-base text-neutral-600" />
                )}
                {item.label}
              </button>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-neutral-500">No actions</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ActionModal;
