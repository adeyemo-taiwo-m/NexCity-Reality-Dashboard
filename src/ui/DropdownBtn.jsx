import { HiChevronDown } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRef } from "react";

function DropdownBtn({ type, children, items = [] }) {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useOutsideClick(dropdownRef);

  const styles = {
    lightBg:
      "flex items-center  px-8 py-2 gap-1 bg-neutral-100 text-neutral-600 px-2 tab:px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)] cursor-pointer",
    darkBg:
      "flex items-center px-4 py-2 gap-1 bg-normal text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)] cursor-pointer",
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={styles[type] || styles.lightBg}
      >
        {children}
        <HiChevronDown
          className={`text-lg transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          } ${
            type === "darkBg" ? "text-white" : "text-[var(--color-neutral-600)]"
          }`}
        />
      </button>

      {open && (
        <div
          className={`
            absolute right-0 mt-2 w-50 font-normal rounded-md border 
            border-[var(--color-normal)]/50  
            bg-white/90 
            backdrop-blur-sm 
            shadow-sm 
            overflow-hidden 
            z-20
          `}
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-neutral-700 hover:bg-light transition-colors"
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
