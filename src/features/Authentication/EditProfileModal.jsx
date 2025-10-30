import { HiOutlineCamera, HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useOutsideClickModal from "../../hooks/useOutsideClickModal";
import AgentInput from "../../ui/AgentInput";
import { useState } from "react";
import useUpdateUser from "./useUpdateUser";
import LoaderMini from "../../ui/LoaderMini";

function EditProfileModal({ profileData, onClose, onSave }) {
  const ref = useOutsideClickModal(onClose);
  const { updateUser, isPending } = useUpdateUser();

  // 🖼️ Image preview
  const [previewImage, setPreviewImage] = useState(profileData.profileImage);

  // 🧾 Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: profileData.name,
      role: profileData.role,
      profileImage: profileData.profileImage,
    },
  });

  // 🖼️ Handle new image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // 💾 Submit form
  const onSubmit = async (data) => {
    const finalData = {
      fullName: data.name,
      assignedRole: data.role,
      profileImage: previewImage,
    };

    try {
      updateUser(finalData);
      onSave({ name: data.name, role: data.role, profileImage: previewImage });
      reset(finalData);
      onClose();
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
      <div
        ref={ref}
        className="bg-white rounded-2xl w-[90%] max-w-md p-6 relative shadow-lg"
      >
        {/*  Close button */}
        <button
          onClick={!isPending ? onClose : undefined}
          className="absolute cursor-pointer top-4 right-4 h-8 w-8 flex justify-center items-center rounded-md bg-light hover:bg-light-hover text-normal hover:text-normal-hover"
          aria-label="Close menu"
        >
          <HiX />
        </button>

        <h2 className="text-xl mt-4 font-semibold text-gray-800 mb-4 text-center">
          Edit Profile
        </h2>

        {/* 🖼️ Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28">
            <img
              src={previewImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-sm"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-normal text-white p-2 rounded-full cursor-pointer"
            >
              <HiOutlineCamera size={18} />
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* 🧾 Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AgentInput
            name="name"
            type="text"
            label="Name"
            placeholder="Enter full name"
            register={register}
            validation={{ required: "Name is required" }}
            error={errors.name}
            disabled={isPending}
          />

          <AgentInput
            name="role"
            type="text"
            label="Role"
            placeholder="Enter your role"
            register={register}
            validation={{ required: "Role is required" }}
            error={errors.role}
            disabled={isPending}
          />

          {/* 🟢 Buttons */}
          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              type="button"
              onClick={!isPending ? onClose : undefined}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <LoaderMini /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
