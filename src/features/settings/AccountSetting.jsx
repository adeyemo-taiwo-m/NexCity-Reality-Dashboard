import React from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";

function AccountSetting() {
  return (
    <div className="space-y-4">
      <InputField type="password" placeholder="Current Password" />
      <InputField type="password" placeholder="New Password" />
      <InputField type="password" placeholder="Confirm New Password" />
      <div className="flex justify-end">
        <Button Icon={HiOutlineLockClosed}>Update Password</Button>
      </div>
    </div>
  );
}

export default AccountSetting;
