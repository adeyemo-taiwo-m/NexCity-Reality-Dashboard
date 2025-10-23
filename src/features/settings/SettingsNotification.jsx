import React, { useState } from "react";
import SettingsP from "../../ui/SettingsP.jsx";
import ToggleSwitch from "../../ui/ToggleSwitch.jsx";

function SettingsNotification() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center py-2 border-b border-neutral-200">
        <SettingsP>Email Notifications</SettingsP>
        <ToggleSwitch
          checked={emailNotif}
          onChange={setEmailNotif}
          color="bg-normal"
        />
      </div>

      <div className="flex justify-between items-center py-2 border-b border-neutral-200">
        <SettingsP>Push Notifications</SettingsP>
        <ToggleSwitch
          checked={pushNotif}
          onChange={setPushNotif}
          color="bg-normal"
        />
      </div>

      <div className="flex justify-between items-center py-2">
        <SettingsP>Transaction Alerts</SettingsP>
        <ToggleSwitch checked={true} onChange={() => {}} color="bg-normal" />
      </div>
    </div>
  );
}

export default SettingsNotification;
