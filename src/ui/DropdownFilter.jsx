import { HiChevronDown } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

function DropdownBtn({ field, children, items = [] }) {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useOutsideClick(dropdownRef);
  const [searchParams, setSearchParams] = useSearchParams();

  const styles = {
    lightBg:
      "flex items-center px-6 tab:px-8 py-2 gap-1 bg-light  text-light-hover rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)] cursor-pointer",
  };

  function handleClick(item, onClick) {
    searchParams.set(field, item.value);
    setSearchParams(searchParams);
    onClick?.();
    setOpen(false);
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={styles.lightBg}
      >
        {children}
        <HiChevronDown
          className={`text-lg transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-45 font-normal rounded-md border
            border-gray-100 bg-white/95 backdrop-blur-sm
            shadow-md overflow-hidden z-20
          "
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleClick(item, item.onClick)}
                className="
                  block cursor-pointer w-full text-left px-4 py-2 text-sm text-neutral-700
                  hover:bg-neutral-100 transition-colors
                "
              >
                {item.label}
              </button>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-neutral-500">No items</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownBtn;
