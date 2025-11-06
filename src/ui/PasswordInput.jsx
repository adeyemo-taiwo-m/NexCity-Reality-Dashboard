import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";
import InputErrorP from "./InputErrorP";

function PasswordInput({ errors, register }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm text-left font-medium text-[var(--color-neutral-700)] mb-1">
        Password
      </label>

      <div
        className={`w-full flex items-center justify-between px-4 py-2 rounded-xl border transition-all duration-200
      ${
        errors.password
          ? "border-red-400 focus-within:ring-2 focus-within:ring-red-500"
          : "border-[var(--color-neutral-200)] focus-within:border-[var(--color-normal)] focus-within:ring-2 focus-within:ring-[var(--color-normal)]"
      }`}
      >
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 cursor-pointer hover:text-[var(--color-normal)] transition-colors"
        >
          {showPassword ? <HiEyeOff size={20} /> : <BsEye size={20} />}
        </button>
      </div>

      {errors.password && <InputErrorP error={errors.password.message} />}
    </div>
  );
}

export default PasswordInput;
