function DropdownBtn({ type, children, icon }) {
  const styles = {
    lightBg:
      "flex items-center gap-1 bg-neutral-100 text-neutral-600 px-3 py-1 rounded-md text-sm",
    darkBg:
      "flex items-center gap-1 bg-normal text-white px-3 py-1 rounded-md text-sm",
  };
  return (
    <button className={styles[type] || styles.lightBg}>
      {children} <span>{icon}</span>
    </button>
  );
}

export default DropdownBtn;
