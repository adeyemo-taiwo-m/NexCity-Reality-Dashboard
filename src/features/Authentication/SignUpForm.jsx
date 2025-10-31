import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import LoaderMini from "../../ui/LoaderMini";
import InputErrorP from "../../ui/InputErrorP";
import useSignUp from "./useSignUp";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const { signup, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Password value for confirming password
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm text-left font-medium text-[var(--color-neutral-700)] mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Adeyemo Taiwo M"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters",
            },
          })}
          className={`w-full px-4 text-neutral-700 py-2 border ${
            errors.fullName
              ? "border-red-400 focus:ring-red-500"
              : "border-[var(--color-neutral-200)] focus:ring-[var(--color-normal)]"
          } rounded-xl focus:ring-2 focus:outline-none`}
        />
        {errors.fullName && <InputErrorP error={errors.fullName} />}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-left font-medium text-[var(--color-neutral-700)] mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          className={`w-full px-4 py-2 border ${
            errors.email
              ? "border-red-400 focus:ring-red-500"
              : "border-[var(--color-neutral-200)] focus:ring-[var(--color-normal)]"
          } rounded-xl focus:ring-2 focus:outline-none`}
        />
        {errors.email && <InputErrorP error={errors.email} />}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-left font-medium text-[var(--color-neutral-700)] mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className={`w-full px-4 py-2 border ${
            errors.password
              ? "border-red-400 focus:ring-red-500"
              : "border-[var(--color-neutral-200)] focus:ring-[var(--color-normal)]"
          } rounded-xl focus:ring-2 focus:outline-none`}
        />
        {errors.password && <InputErrorP error={errors.password} />}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm text-left font-medium text-[var(--color-neutral-700)] mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className={`w-full px-4 py-2 border ${
            errors.confirmPassword
              ? "border-red-400 focus:ring-red-500"
              : "border-[var(--color-neutral-200)] focus:ring-[var(--color-normal)]"
          } rounded-xl focus:ring-2 focus:outline-none`}
        />
        {errors.confirmPassword && (
          <InputErrorP error={errors.confirmPassword} />
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-[var(--color-dark)] text-white py-2.5 rounded-xl hover:bg-[var(--color-dark-hover)] transition disabled:opacity-70"
      >
        {isPending ? (
          <LoaderMini className={"border-white/60"} />
        ) : (
          "Create Account"
        )}
      </Button>

      {/* Already have an account link */}
      <p className="text-center text-sm text-[var(--color-neutral-600)]">
        Already have an account?{" "}
        <Button
          onClick={() => navigate("/login")}
          type="button"
          variant="signUp"
          className="text-[var(--color-normal)] hover:text-[var(--color-normal-hover)] font-medium"
        >
          Log in
        </Button>
      </p>
    </form>
  );
}
