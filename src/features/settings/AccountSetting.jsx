import React from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";

function AccountSetting() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      // ✅ 1. Get current user’s email
      const { data: sessionData } = await supabase.auth.getSession();
      const userEmail = sessionData?.session?.user?.email;
      if (!userEmail) throw new Error("User session not found");

      // ✅ 2. Reauthenticate the user
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: data.currentPassword,
      });

      if (reauthError) {
        toast.error("Current password is incorrect.");
        return;
      }

      // ✅ 3. Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (updateError) throw updateError;

      toast.success("Password updated successfully!");
      reset();
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        type="password"
        placeholder="Current Password"
        {...register("currentPassword", {
          required: "Current password is required",
        })}
        error={errors.currentPassword}
      />

      <InputField
        type="password"
        placeholder="New Password"
        {...register("newPassword", {
          required: "New password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        error={errors.newPassword}
      />

      <InputField
        type="password"
        placeholder="Confirm New Password"
        {...register("confirmPassword", {
          required: "Please confirm your new password",
          validate: (value) =>
            value === watch("newPassword") || "Passwords do not match",
        })}
        error={errors.confirmPassword}
      />

      <div className="flex justify-end">
        <Button Icon={HiOutlineLockClosed} type="submit">
          Update Password
        </Button>
      </div>
    </form>
  );
}

export default AccountSetting;
