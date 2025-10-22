import React from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import CustomerStatusBadge from "./CustomersStatusBadge";
import { formatCurrency } from "../../utils/helpers";

const CustomerRow = ({
  name,
  email,
  interestedProperty,
  dealType,
  amount,
  status,
  activity,
  avatarUrl = "https://placehold.co/40x40/94A3B8/FFFFFF?text=CU",
}) => {
  const fallbackImage = "https://placehold.co/40x40/94A3B8/FFFFFF?text=CU";

  return (
    <tr
      className="border-b hover:bg-[#f9fafb] transition-colors"
      style={{ borderColor: "var(--color-neutral-200)" }}
    >
      {/* Customer Info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="h-10 w-10 rounded-full object-cover"
            onError={(e) => (e.currentTarget.src = fallbackImage)}
          />
          <span
            className="text-sm font-medium cursor-pointer hover:underline"
            style={{ color: "var(--color-normal)" }}
          >
            {name}
          </span>
        </div>
      </td>

      {/* Email */}
      <td
        className="px-6 py-4 text-sm"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {email}
      </td>

      {/* Property */}
      <td
        className="px-6 py-4 text-sm text-center"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {interestedProperty}
      </td>

      {/* Deal Type */}
      <td
        className="px-6 py-4 text-sm text-center capitalize"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {dealType}
      </td>

      {/* Amount (if available) */}
      <td
        className="px-6 py-4 text-sm text-center"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {amount ? formatCurrency(amount) : "—"}
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <CustomerStatusBadge status={status} />
      </td>

      {/* Activity */}
      <td
        className="px-6 py-4 text-sm"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {activity}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <button
          className="p-1 rounded-full transition-colors hover:bg-[#f3f4f6]"
          style={{ color: "var(--color-neutral-500)" }}
          aria-label={`More actions for ${name}`}
        >
          <HiOutlineEllipsisVertical className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default CustomerRow;
