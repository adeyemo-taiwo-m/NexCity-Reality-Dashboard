function ToggleSwitch({ checked, onChange, color = "bg-color-normal" }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 
        ${checked ? `${color}` : "bg-light-active"}`}
    >
      <div
        className={`w-4 h-4 bg-light rounded-full shadow-md transform transition-all 
          ${checked ? "translate-x-6" : "translate-x-0"}`}
      />
    </button>
  );
}

export default ToggleSwitch;
