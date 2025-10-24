import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineSave } from "react-icons/hi";

import Button from "../../ui/Button";
import InputField from "../../ui/InputField";
import SettingsSection from "./SettingsSection";

function ProfileSetting() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Profile Info */}
      <SettingsSection
        icon={<HiOutlineUserCircle />}
        title="Profile Information"
        color="text-color-normal"
      >
        <div className="space-y-4">
          <InputField placeholder="Full Name" defaultValue="Adeyemo Taiwo M" />
          <InputField
            type="email"
            placeholder="Email Address"
            defaultValue="taiwo@example.com"
          />
          <InputField
            placeholder="Phone Number"
            defaultValue="+234 812 345 6789"
          />
          <div className="flex justify-end">
            <Button Icon={HiOutlineSave}>Save Changes</Button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

export default ProfileSetting;
