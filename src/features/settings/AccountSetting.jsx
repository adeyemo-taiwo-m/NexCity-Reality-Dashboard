import React from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import AgentInput from "../../ui/AgentInput";
import Button from "../../ui/Button";
import useUpdateUser from "../Authentication/useUpdateUser";

export default function AccountSetting() {
  const { updateUser, isPending } = useUpdateUser();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({ newPassword }) => {
    console.log("Form Data Submitted:", newPassword);
    updateUser(
      { newPassword },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto space-y-5 p-6  rounded-lg shadow-sm bg-white"
    >
      <AgentInput
        name="currentPassword"
        label="Current Password"
        type="password"
        placeholder="Enter your current password"
        register={register}
        validation={{
          required: "Current password is required",
        }}
        error={errors.currentPassword}
      />

      <AgentInput
        name="newPassword"
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        register={register}
        validation={{
          required: "New password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        error={errors.newPassword}
      />

      <AgentInput
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your new password"
        register={register}
        validation={{
          required: "Please confirm your new password",
          validate: (value) =>
            value === watch("newPassword") || "Passwords do not match",
        }}
        error={errors.confirmPassword}
      />

      <div className="flex justify-end">
        <Button Icon={HiOutlineLockClosed} loading={isPending} type="submit">
          Update Password
        </Button>
      </div>
    </form>
  );
}
