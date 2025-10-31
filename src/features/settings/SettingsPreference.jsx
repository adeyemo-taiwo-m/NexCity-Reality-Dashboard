import SelectInput from "../../ui/SelectInput";
import ToggleSwitch from "../../ui/ToggleSwitch";
import SettingsP from "../../ui/SettingsP";
import useDarkMode from "../../hooks/useDarkMode";

function SettingsPreference() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SettingsP>Dark Mode</SettingsP>
        <ToggleSwitch checked={isDarkMode} onChange={toggleDarkMode} />
      </div>

      <div className="flex justify-between items-center">
        <SettingsP>Currency</SettingsP>
        <SelectInput options={["₦ NGN", "$ USD", "£ GBP"]} />
      </div>
    </div>
  );
}

export default SettingsPreference;
