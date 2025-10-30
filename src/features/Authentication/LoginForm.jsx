import React from "react";
import { Form, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useLoginUser from "./useLoginUser";
import LoaderMini from "../../ui/LoaderMini";
import InputErrorP from "../../ui/InputErrorP";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isPending } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    login(data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
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
          className={`w-full px-4 text-neutral-50 py-2 border border-neutral-400 ${
            errors.email
              ? "border-red-400 focus:ring-red-500"
              : "border-[var(--color-neutral-200)] focus:ring-[var(--color-normal)]"
          } rounded-xl focus:ring-2 focus:outline-none`}
        />
        {errors.email && <InputErrorP error={errors.email} />}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm text-left  font-medium text-[var(--color-neutral-700)] mb-1">
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
          className={`w-full px-4 py-2 text-neutral-50 border-neutral-400  border ${
            errors.password
              ? "border-red-400 focus:ring-red-500"
              : "border-[var(--color-neutral-200)] focus:ring-[var(--color-normal)]"
          } rounded-xl focus:ring-2 focus:outline-none`}
        />
        {errors.password && <InputErrorP error={errors.message} />}
      </div>

      {/* Sign In Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-[var(--color-dark)] text-white py-2.5 rounded-xl hover:bg-[var(--color-dark-hover)] transition disabled:opacity-70"
      >
        {isPending ? <LoaderMini className={"border-white/60"} /> : "Sign In"}
      </Button>

      {/* Signup Link */}
      <p className="text-center text-sm text-[var(--color-neutral-600)]">
        Don’t have an account?{" "}
        <Button
          onClick={() => navigate("/signup")}
          type="button"
          variant="signUp"
          className="text-[var(--color-normal)] hover:text-[var(--color-normal-hover)] font-medium"
        >
          Sign Up
        </Button>
      </p>
    </form>
  );
}
