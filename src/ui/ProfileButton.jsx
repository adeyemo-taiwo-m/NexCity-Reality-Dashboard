import React from "react";
import { HiChevronDown } from "react-icons/hi2";

function ProfileButton({ profileButtonClass }) {
  return (
    <div className="relative">
      <button
        className={profileButtonClass}
        aria-label="User menu"
        aria-haspopup="true"
        type="button"
      >
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover"
            alt="Adeyemo Taiwo M profile picture"
            src="/profile.png"
          />

          <div className="hidden lap:flex flex-col items-start pr-4 text-left">
            <div className="font-semibold text-sm text-neutral-800">
              Adeyemo Taiwo M
            </div>
            <div className="text-xs text-neutral-600">Senior Agent</div>
          </div>
        </div>

        <HiChevronDown
          className="w-5 h-5 text-neutral-800 mr-2"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

export default ProfileButton;
