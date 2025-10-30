import React from "react";

function AgentInput({
  name,
  type,
  placeholder,
  label,
  register,
  validation,
  disabled,
  error,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>

      <input
        id={name}
        disabled={disabled}
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 text-neutral-800   rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-neutral-200 focus:ring-[var(--color-normal)]"
        } ${disabled ? "bg-neutral-100 cursor-not-allowed" : "bg-white"}`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

export default AgentInput;
