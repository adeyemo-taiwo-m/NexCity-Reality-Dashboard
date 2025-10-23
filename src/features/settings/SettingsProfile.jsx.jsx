import React from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import Button from "../../ui/Button";
import SocialMediaLink from "../../ui/SocialMediaLink";

function SettingsProfile() {
  return (
    <section className="w-full bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 relative">
      {/* Banner Image */}
      <div className="relative h-48 w-full">
        <img
          src="house.png"
          alt="Agent banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Image Overlapping the Banner */}
      <div className="absolute left-8 top-32">
        <img
          src="profile.png"
          alt="agent image"
          className="w-56 h-56 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="pt-20 pb-8 px-8 flex justify-between  ml-60  sm:flex-row sm:items-center sm:justify-between">
        {/* Agent Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Adeyemo Taiwo M
          </h2>
          <p className="text-sm text-gray-500">Senior Agent</p>

          {/* Social Links */}
          <div className="flex space-x-3 mt-4">
            <SocialMediaLink iconName="facebook" />
            <SocialMediaLink iconName="linkedIn" />
            <SocialMediaLink iconName="pinterest" />
            <SocialMediaLink iconName="twitter" />
          </div>
        </div>

        {/* Edit Button */}
        <Button variant="ghost" Icon={HiOutlinePencil}>
          <span className="font-medium text-sm">Edit</span>
        </Button>
      </div>
    </section>
  );
}

export default SettingsProfile;
