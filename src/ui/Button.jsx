import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";

/**
 * Reusable Button component for dashboards.
 * Supports variants, icons, and full responsiveness.
 *
 * @param {object} props
 * @param {string} props.children - Button label text.
 * @param {React.ElementType} [props.Icon=HiOutlinePlus] - Icon component (from react-icons).
 * @param {"primary" | "secondary" | "danger" | "ghost"} [props.variant='primary'] - Button style type.
 * @param {boolean} [props.fullWidth=false] - If true, makes the button full width.
 * @param {boolean} [props.loading=false] - Displays a loading spinner.
 * @param {string} [props.className] - Extra Tailwind classes.
 * @param {function} [props.onClick] - Click handler.
 */
function Button({
  children,
  Icon = HiOutlinePlus,
  variant = "primary",
  fullWidth = false,
  loading = false,
  className = "",
  ...props
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg
    px-4 py-2 text-sm transition-all duration-200
    focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
  `;

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500/40 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-gray-200/50 shadow-sm",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/40 shadow-sm hover:shadow-md",

    ghost:
      "bg-transparent text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-100/50",
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {/* Show spinner if loading */}
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

      {/* Button Text */}
      <span className={loading ? "opacity-75" : ""}>{children}</span>
    </button>
  );
}

export default Button;
