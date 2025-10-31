import React, { useState } from "react";
import AgentStatusBadge from "./AgentStatusBagde";
import ActionModal from "../../ui/ActionModal";
import CancelX from "../../ui/CancelX";
import EditAgent from "./EditAgent";
import ViewAgentProfile from "./ViewAgentProfile";
import useDeleteAgent from "./useDeleteAgent";
import {
  HiOutlineEllipsisVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";

function AgentGridCard({ agent }) {
  const { deleteAgent, isPending: isDeleting } = useDeleteAgent();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <>
      <div
        className="bg-[var(--color-white)] 
                   border border-[var(--color-neutral-200)] 
                   rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={agent?.image || "/default-user.jpg"}
              alt={agent?.name}
              className="w-12 h-12 rounded-full object-cover"
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
                onClick: () => setIsEditOpen(true),
              },
              {
                label: "View Details",
                icon: HiOutlineEye,
                onClick: () => setIsViewOpen(true),
              },
              {
                label: "Delete",
                icon: HiOutlineTrash,
                onClick: () => deleteAgent(agent.id),
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
              {agent?.propertiesListed}
            </p>
            <p>
              <span className="font-medium text-[var(--color-neutral-600)]">
                Deals:
              </span>{" "}
              {agent?.closedDeals}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <AgentStatusBadge status={agent?.status} />
          <button
            onClick={() => setIsViewOpen(true)}
            className="text-sm font-medium text-[var(--color-normal)] 
                       px-2 py-1 rounded-md 
                       hover:bg-[var(--color-light-hover)] 
                       transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl
              w-[90%] max-w-2/3 lap:w-3/7 p-6 border border-white font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-10 top-10">
              <CancelX onClick={() => setIsEditOpen(false)} />
            </div>

            <EditAgent
              agent={agent}
              onCloseModal={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewOpen && (
        <ViewAgentProfile setIsViewOpen={setIsViewOpen} selectedAgent={agent} />
      )}
    </>
  );
}

export default AgentGridCard;
