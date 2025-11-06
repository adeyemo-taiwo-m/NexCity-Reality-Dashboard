import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";
import InputErrorP from "./InputErrorP";

function PasswordSignUp({ errors, register }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    upper: false,
    number: false,
  });

  const checkPassword = (value) => {
    setValidations({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPassword(value);
  };

  // Calculate password strength
  const score = Object.values(validations).filter(Boolean).length;
  let strength = score <= 1 ? "Weak" : score === 2 ? "Medium" : "Strong";

  const strengthColor =
    strength === "Strong"
      ? "text-green-600"
      : strength === "Medium"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="space-y-2 text-left">
      <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
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
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          onChange={handleChange}
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

      {/* Password strength label */}
      {password && (
        <p className={`text-sm font-medium ${strengthColor}`}>
          Strength: {strength}
        </p>
      )}

      {/* Password rules */}
      {password && (
        <ul className="text-sm flex gap-2 space-y-0.5 mt-1 text-left">
          <li
            className={validations.length ? "text-green-600" : "text-red-500"}
          >
            • At least 8 characters
          </li>
          <li className={validations.upper ? "text-green-600" : "text-red-500"}>
            • One uppercase letter
          </li>
          <li
            className={validations.number ? "text-green-600" : "text-red-500"}
          >
            • One number
          </li>
        </ul>
      )}
    </div>
  );
}

export default PasswordSignUp;
