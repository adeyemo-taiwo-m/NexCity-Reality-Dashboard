import React from "react";
import AgentStatusBadge from "./AgentStatusBagde";
import ActionModal from "../../ui/ActionModal";
import useDeleteAgent from "./useDeleteAgent";
import {
  HiOutlineEllipsisVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";

function AgentGridCard({
  agent,
  setSelectedAgent,
  setIsViewOpen,
  setIsEditOpen,
}) {
  const { deleteAgent, isPending: isDeleting } = useDeleteAgent();

  const openEditModal = (agent) => {
    setSelectedAgent(agent);
    setIsEditOpen(true);
  };

  const openViewModal = (agent) => {
    setSelectedAgent(agent);
    setIsViewOpen(true);
  };

  return (
    <div
      className="bg-[var(--color-white)] 
                 border border-[var(--color-neutral-200)] 
                 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              agent?.avatarUrl ||
              "https://placehold.co/50x50/94A3B8/FFFFFF?text=A"
            }
            alt={agent?.name}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) =>
              (e.currentTarget.src =
                "https://placehold.co/50x50/94A3B8/FFFFFF?text=A")
            }
          />
          <div>
            <h3 className="font-semibold text-[var(--color-neutral-800)] text-sm tab:text-base">
              {agent?.name}
            </h3>
            <p className="text-xs text-[var(--color-neutral-500)]">
              {agent?.email}
            </p>
          </div>
        </div>

        {/* Action Menu */}
        <ActionModal
          disabled={isDeleting}
          triggerIcon={HiOutlineEllipsisVertical}
          items={[
            {
              label: "Edit",
              icon: HiOutlinePencil,
              onClick: () => openEditModal(agent),
            },
            {
              label: "View Details",
              icon: HiOutlineEye,
              onClick: () => openViewModal(agent),
            },
            {
              label: "Delete",
              icon: HiOutlineTrash,
              onClick: () => deleteAgent(agent?.id),
            },
          ]}
        />
      </div>

      {/* Body */}
      <div className="mt-4 space-y-2 text-sm text-[var(--color-neutral-700)]">
        <p>
          <span className="font-medium text-[var(--color-neutral-600)]">
            Phone:
          </span>{" "}
          {agent?.phone}
        </p>
        <div className="flex justify-between">
          <p>
            <span className="font-medium text-[var(--color-neutral-600)]">
              Listed:
            </span>{" "}
            {agent?.listed}
          </p>
          <p>
            <span className="font-medium text-[var(--color-neutral-600)]">
              Clients:
            </span>{" "}
            {agent?.clients}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <AgentStatusBadge status={agent?.status} />
        <button
          onClick={() => openViewModal(agent)}
          className="text-sm font-medium text-[var(--color-normal)] 
                     px-2 py-1 rounded-md 
                     hover:bg-[var(--color-light-hover)] 
                     transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default AgentGridCard;
