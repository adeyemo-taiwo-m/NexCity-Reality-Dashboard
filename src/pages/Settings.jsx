import {
  HiOutlineLockClosed,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import Header from "../features/settings/Header";
import SettingsSection from "../features/settings/SettingsSection";
import SettingsProfile from "../features/settings/SettingsProfile.jsx";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { HiOutlineSave } from "react-icons/hi";
import SettingsNotification from "../features/settings/SettingsNotification.jsx";
import SettingsPreference from "../features/settings/SettingsPreference.jsx";

function Settings() {
  return (
    <section className="flex flex-col gap-6">
      <Header />
      <SettingsProfile />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <SettingsSection
          icon={<HiOutlineUserCircle />}
          title="Profile Information"
          color="text-color-normal"
        >
          <div className="space-y-4">
            <InputField
              placeholder="Full Name"
              defaultValue="Adeyemo Taiwo M"
            />
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

        {/* Account & Security */}
        <SettingsSection
          icon={<HiOutlineLockClosed />}
          title="Account & Security"
          color="text-purple-600"
        >
          <div className="space-y-4">
            <InputField type="password" placeholder="Current Password" />
            <InputField type="password" placeholder="New Password" />
            <InputField type="password" placeholder="Confirm New Password" />
            <div className="flex justify-end">
              <Button Icon={HiOutlineLockClosed}>Update Password</Button>
            </div>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          icon={<HiOutlineCog6Tooth />}
          title="Notifications"
          color="text-green-600"
        >
          <SettingsNotification />
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection
          icon={<HiOutlineCog6Tooth />}
          title="App Preferences"
          color="text-orange-600"
        >
          <SettingsPreference />
        </SettingsSection>
      </div>
    </section>
  );
}

export default Settings;
