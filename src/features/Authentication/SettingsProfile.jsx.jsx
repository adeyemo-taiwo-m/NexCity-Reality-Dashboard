import React, { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import Button from "../../ui/Button";
import SocialMediaLink from "../../ui/SocialMediaLink";
import EditProfileModal from "./EditProfileModal";
import useUser from "./useUser";
import LoaderMini from "../../ui/LoaderMini";

function SettingsProfile() {
  const { userData, isPending } = useUser();

  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    profileImage: userData?.profileImage,
    bannerImage: "house.png",
    socials: ["facebook", "linkedin", "pinterest", "x"],
  });

  const [showModal, setShowModal] = useState(false);

  //  Populate the profile when userData is available
  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData?.fullName || "",
        role: userData?.assignedRole || "Input your role",
        profileImage: userData?.profileImage || "default-user.jpg",
        bannerImage: "house.png",
        socials: ["facebook", "linkedin", "pinterest", "x"],
        socialLinks: userData?.socialLinks,
      });
    }
  }, [userData]);

  //  Handle saving of updated data
  const handleSave = (updatedData) => {
    setProfileData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <section className="w-full bg-white rounded-3xl shadow-md overflow-hidden border border-neutral-100 relative">
      {/* Banner Image */}
      <div className="relative h-40 tab:h-48 w-full">
        <img
          src={profileData.bannerImage}
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
          src={profileData?.profileImage}
          alt={`${profileData.name} profile`}
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
        <div className="flex flex-col items-center tab:items-start mt-4 tab:mt-0 space-y-2">
          <h2 className="text-[1.2rem] font-medium text-neutral-900">
            {isPending ? <LoaderMini /> : profileData.name}
          </h2>
          <p className="text-base text-neutral-500 font-normal">
            {isPending ? <LoaderMini /> : profileData.role}
          </p>

          {/* Social Links */}
          <div className="flex space-x-3 mt-3">
            {profileData.socials.map((iconName) => (
              <SocialMediaLink
                to={profileData?.socialLinks?.[iconName]}
                key={iconName}
                iconName={iconName}
              />
            ))}
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-4 tab:mt-0">
          <Button
            variant="ghost"
            Icon={HiOutlinePencil}
            onClick={() => setShowModal(true)}
          >
            <span className="font-medium text-sm">Edit</span>
          </Button>
        </div>
      </div>

      {/* 🟢 Modal */}
      {showModal && (
        <EditProfileModal
          profileData={profileData}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}

export default SettingsProfile;
