import React from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import AgentStatusBadge from "./AgentStatusBagde";

const AgentRow = ({
  name,
  email,
  phone,
  propertiesListed,
  clientsManaged,
  status,
  avatarUrl = "https://placehold.co/40x40/94A3B8/FFFFFF?text=AT",
}) => {
  const fallbackImage = "https://placehold.co/40x40/94A3B8/FFFFFF?text=AT";

  return (
    <tr
      className="border-b"
      style={{
        borderColor: "var(--color-neutral-200)",
        transition: "background-color 0.15s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-white-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {/* Name & Avatar */}
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

      <td
        className="px-6 py-4 text-sm"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {email}
      </td>

      <td
        className="px-6 py-4 text-sm"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {phone}
      </td>

      <td
        className="px-6 py-4 text-sm text-center"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {propertiesListed}
      </td>

      <td
        className="px-6 py-4 text-sm text-center"
        style={{ color: "var(--color-neutral-600)" }}
      >
        {clientsManaged}
      </td>

      <td className="px-6 py-4">
        <AgentStatusBadge status={status} />
      </td>

      <td className="px-6 py-4 text-right">
        <button
          className="p-1 rounded-full transition-colors"
          style={{
            color: "var(--color-neutral-500)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-dark-hover)";
            e.currentTarget.style.backgroundColor = "var(--color-white-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-neutral-500)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label={`More actions for ${name}`}
        >
          <HiOutlineEllipsisVertical className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default AgentRow;
