import {
  HiOutlineLockClosed,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import Header from "../features/settings/Header";
import SettingsSection from "../features/settings/SettingsSection";
import SettingsProfile from "../features/settings/SettingsProfile.jsx";
import SettingsNotification from "../features/settings/SettingsNotification.jsx";
import SettingsPreference from "../features/settings/SettingsPreference.jsx";
import AccountSetting from "../features/settings/AccountSetting.jsx";
import ProfileSetting from "../features/settings/PrefileSetting.jsx";

function Settings() {
  return (
    <section className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <Header />

      {/* Profile Summary */}
      <SettingsProfile />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <SettingsSection
          icon={<HiOutlineUserCircle />}
          title="Profile Information"
          color="text-color-normal"
        >
          <ProfileSetting />
        </SettingsSection>

        {/* Account & Security */}
        <SettingsSection
          icon={<HiOutlineLockClosed />}
          title="Account & Security"
          color="text-purple-600"
        >
          <AccountSetting />
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
