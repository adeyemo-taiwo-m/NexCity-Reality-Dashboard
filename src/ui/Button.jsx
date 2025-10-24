import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";

const Button = ({
  children,
  Icon,
  variant = "primary",
  fullWidth,
  loading,
  className = "",
  ...props
}) => {
  const base = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg
    px-4 py-2 text-sm transition-all duration-200 cursor-pointer
    focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
  `;

  const styles = {
    primary:
      "h-12 px-4 inline-flex items-center justify-center gap-2 bg-[#054484] text-white rounded-md transition-opacity hover:opacity-90 active:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#054484] focus:ring-offset-2",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-gray-200/50 shadow-sm",
    tertiary:
      "h-12 px-4 inline-flex items-center justify-center gap-2 bg-gold text-neutral-700 rounded-md transition-opacity hover:opacity-90 active:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#054484] focus:ring-offset-2",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/40 shadow-sm hover:shadow-md",
    ghost:
      "mt-6 sm:mt-0 flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-sm",
    light:
      "inline-flex items-center ml-4 justify-center p-2 bg-light text-[#054484] font-medium text-sm rounded-lg shadow hover:bg-light-hover transition-all duration-200",
  };

  return (
    <button
      type="button"
      disabled={loading}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        Icon && <Icon className="w-5 h-5" aria-hidden="true" />
      )}
      <span className={loading ? "opacity-75" : ""}>{children}</span>
    </button>
  );
};

export default Button;
