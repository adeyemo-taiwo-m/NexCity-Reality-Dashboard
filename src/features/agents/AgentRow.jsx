import React, { useState } from "react";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import AgentStatusBadge from "./AgentStatusBagde";
import ActionModal from "../../ui/ActionModal";
import useDeleteAgent from "./useDeleteAgent";
import EditAgent from "./EditAgent";
import CancelX from "../../ui/CancelX";

const AgentRow = ({
  name,
  email,
  agentId,
  phone,
  propertiesListed,
  closedDeals,
  status,
  avatarUrl = "https://placehold.co/40x40/94A3B8/FFFFFF?text=AT",
}) => {
  const fallbackImage = "https://placehold.co/40x40/94A3B8/FFFFFF?text=AT";
  const { deleteAgent, isPending } = useDeleteAgent();

  // Local state for controlling the edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);

  const agent = { id: agentId, name, email, phone, status };

  return (
    <>
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
          {closedDeals}
        </td>

        <td className="px-6 py-4">
          <AgentStatusBadge status={status} />
        </td>

        <td className="px-6 py-4 text-right">
          <ActionModal
            disabled={isPending}
            items={[
              {
                label: "Edit",
                icon: HiOutlinePencil,
                onClick: () => setIsEditOpen(true),
              },
              {
                label: "View",
                icon: HiOutlineEye,
                onClick: () => console.log("View:", agentId),
              },
              {
                label: "Delete",
                icon: HiOutlineTrash,
                onClick: () => deleteAgent(agentId),
              },
            ]}
          />
        </td>
      </tr>

      {/* ✅ Inline lightweight modal */}
      {isEditOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="
        relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl
        w-[90%] max-w-2/3 lap:w-3/7 p-6
        border border-white
        transition-all duration-300
      "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-10 top-10 mb-3">
              <CancelX onClick={() => setIsEditOpen(false)} />
            </div>

            <EditAgent
              agent={agent}
              onCloseModal={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AgentRow;
