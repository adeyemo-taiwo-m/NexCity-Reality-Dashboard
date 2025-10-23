import { useState } from "react";
import {
  HiOutlineLockClosed,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import Heading from "../../ui/Heading";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      {/* Page Header */}
      <Heading
        title="Settings"
        subtitle="Manage your account, notifications, and preferences"
      />

      {/* SETTINGS CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineUserCircle className="text-xl text-blue-600" />
            <h3 className="text-lg font-semibold">Profile Information</h3>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              defaultValue="Adeyemo Taiwo M"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              defaultValue="taiwo@example.com"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              defaultValue="+234 812 345 6789"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </div>

        {/* Account & Security */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineLockClosed className="text-xl text-purple-600" />
            <h3 className="text-lg font-semibold">Account & Security</h3>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md">
              Update Password
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineCog6Tooth className="text-xl text-green-600" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>

          <div className="flex items-center justify-between py-2 border-b">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={(e) => setEmailNotif(e.target.checked)}
              className="w-5 h-5 accent-green-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b">
            <span>Push Notifications</span>
            <input
              type="checkbox"
              checked={pushNotif}
              onChange={(e) => setPushNotif(e.target.checked)}
              className="w-5 h-5 accent-green-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <span>Transaction Alerts</span>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-green-600 cursor-pointer"
            />
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineCog6Tooth className="text-xl text-orange-600" />
            <h3 className="text-lg font-semibold">App Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="w-5 h-5 accent-orange-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Currency</span>
              <select className="border rounded-md px-3 py-2 text-sm focus:outline-none">
                <option>₦ NGN</option>
                <option>$ USD</option>
                <option>£ GBP</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span>Date Format</span>
              <select className="border rounded-md px-3 py-2 text-sm focus:outline-none">
                <option>Oct 18, 2025</option>
                <option>18/10/2025</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
