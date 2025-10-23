import { useState } from "react";
import SelectInput from "../../ui/SelectInput";
import ToggleSwitch from "../../ui/ToggleSwitch";

function SettingsPreference() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Dark Mode</span>
        <ToggleSwitch
          checked={darkMode}
          onChange={setDarkMode}
          color="bg-gold"
        />
      </div>

      <div className="flex justify-between items-center">
        <span>Currency</span>
        <SelectInput options={["₦ NGN", "$ USD", "£ GBP"]} />
      </div>

      <div className="flex justify-between items-center">
        <span>Date Format</span>
        <SelectInput options={["Oct 18, 2025", "18/10/2025"]} />
      </div>
    </div>
  );
}

export default SettingsPreference;
