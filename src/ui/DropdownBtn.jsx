import { HiChevronDown } from "react-icons/hi2";

function DropdownBtn({ type, children }) {
  const styles = {
    lightBg:
      "flex items-center gap-1 bg-neutral-100 text-neutral-600 px-2 tab:px-3 py-1 rounded-md  text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)] focus:border-[var(--color-normal)] cursor-pointer ",
    darkBg:
      "flex items-center gap-1 bg-normal  text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)] focus:border-[var(--color-normal)] cursor-pointer",
  };
  return (
    <button className={styles[type] || styles.lightBg}>
      {children}{" "}
      <span>
        {" "}
        <HiChevronDown className="text-[var(--color-neutral-600)] text-lg" />
      </span>
    </button>
  );
}

export default DropdownBtn;
