import { useState } from "react";
import { HiOutlineCamera, HiX } from "react-icons/hi";
import Button from "../../ui/Button";
import useOutsideClickModal from "../../hooks/useOutsideClickModal";

function EditProfileModal({ profileData, onClose, onSave }) {
  const ref = useOutsideClickModal(onClose);

  const [formData, setFormData] = useState({
    name: profileData.name,
    role: profileData.role,
    profileImage: profileData.profileImage,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
      {/* 👇 Attach ref here */}
      <div
        ref={ref}
        className="bg-white rounded-2xl w-[90%] max-w-md p-6 relative shadow-lg"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 h-8 w-8 flex justify-center items-center rounded-md bg-light hover:bg-light-hover text-normal hover:text-normal-hover"
          aria-label="Close menu"
        >
          <HiX />
        </button>

        <h2 className="text-xl mt-4 font-semibold text-gray-800 mb-4 text-center">
          Edit Profile
        </h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28">
            <img
              src={formData.profileImage}
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

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2 font-normal">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Field */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-1 font-normal">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-normal"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
