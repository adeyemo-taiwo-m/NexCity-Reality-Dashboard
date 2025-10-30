import React, { useEffect } from "react";
import { HiOutlineSave } from "react-icons/hi";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import AgentInput from "../../ui/AgentInput";
import LoadingState from "../../ui/LoadingState";
import useUser from "../Authentication/useUser";
import useUpdateUser from "../Authentication/useUpdateUser";

function ProfileSetting() {
  const { userData, isPending } = useUser();
  const { updateUser, isPending: isUpdatingUser } = useUpdateUser();
  console.log(userData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data) => {
    updateUser(data);
  };

  if (isPending) return <LoadingState />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div className="space-y-4">
        <AgentInput
          label="Full Name"
          name="fullName"
          register={register}
          validation={{
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          }}
          error={errors.fullName}
        />

        <AgentInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          error={errors.email}
        />

        <AgentInput
          label="Phone Number"
          name="phone"
          placeholder="Enter your phone number"
          register={register}
          validation={{
            required: "Phone number is required",
            minLength: { value: 10, message: "Must be at least 10 digits" },
          }}
          error={errors.phone}
        />

        <div className="flex justify-end">
          <Button
            Icon={HiOutlineSave}
            type="submit"
            disabled={isPending || isUpdatingUser}
          >
            {isUpdatingUser ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProfileSetting;
