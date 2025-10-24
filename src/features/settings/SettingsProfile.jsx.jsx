import React from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import Button from "../../ui/Button";
import SocialMediaLink from "../../ui/SocialMediaLink";
import { profileData } from "../../assets/data";

// Example data (you can import or fetch this later)

function SettingsProfile() {
  const { name, role, bannerImage, profileImage, socials } = profileData;

  return (
    <section className="w-full bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 relative">
      {/* Banner Image */}
      <div className="relative h-40 tab:h-48 w-full">
        <img
          src={bannerImage}
          alt="Agent banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Image */}
      <div
        className="
        absolute 
        left-1/2 -translate-x-1/2 top-28
        tab:left-8 tab:translate-x-0 tab:top-40
      "
      >
        <img
          src={profileImage}
          alt={`${name} profile`}
          className="w-32 h-32 tab:w-48 tab:h-48 rounded-full border-4 border-white shadow-md object-cover"
        />
      </div>

      {/* Content Section */}
      <div
        className="
          flex flex-col tab:flex-row 
          tab:items-center tab:justify-between 
          px-4 tab:px-8 
          pt-20 tab:pt-16 pb-8 
          text-center tab:text-left 
          tab:ml-60
        "
      >
        {/* Agent Info */}
        <div className="flex flex-col items-center tab:items-start mt-4 tab:mt-0 space-y-2">
          <h2 className="text-lg tab:text-xl font-semibold text-gray-900">
            {name}
          </h2>
          <p className="text-sm text-gray-500 font-normal">{role}</p>

          {/* Social Links */}
          <div className="flex space-x-3 mt-3">
            {socials.map((iconName) => (
              <SocialMediaLink key={iconName} iconName={iconName} />
            ))}
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-4 tab:mt-0">
          <Button variant="ghost" Icon={HiOutlinePencil}>
            <span className="font-medium text-sm">Edit</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SettingsProfile;
