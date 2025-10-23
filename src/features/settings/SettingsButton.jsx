function SettingsButton({ label, color = "bg-color-normal" }) {
  return (
    <button
      className={`${color} hover:brightness-90 text-white font-medium py-2 rounded-md w-full transition`}
    >
      {label}
    </button>
  );
}

export default SettingsButton;
