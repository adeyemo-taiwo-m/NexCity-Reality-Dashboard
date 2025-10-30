import { useState } from "react";
import SelectInput from "../../ui/SelectInput";
import ToggleSwitch from "../../ui/ToggleSwitch";
import SettingsP from "../../ui/SettingsP";

function SettingsPreference() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SettingsP>Dark Mode</SettingsP>
        <ToggleSwitch
          checked={darkMode}
          onChange={setDarkMode}
          color="bg-gold"
        />
      </div>

      <div className="flex justify-between items-center">
        <SettingsP>Currency</SettingsP>
        <SelectInput options={["₦ NGN", "$ USD", "£ GBP"]} />
      </div>
    </div>
  );
}

export default SettingsPreference;
