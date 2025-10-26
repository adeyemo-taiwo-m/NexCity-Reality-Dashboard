import React, { useState } from "react";
import AgentStatusBadge from "./AgentStatusBagde";
import {
  HiOutlineEllipsisVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import useAgents from "./useAgents";
import useDeleteAgent from "./useDeleteAgent";
import LoadingState from "../../ui/LoadingState";
import EmptyState from "../../ui/EmptyState";
import ActionModal from "../../ui/ActionModal";
import EditAgent from "./EditAgent";
import CancelX from "../../ui/CancelX";
import Button from "../../ui/Button";
import ViewAgentProfile from "./ViewAgentProfile";

function AgentCards() {
  const { agents, isPending } = useAgents();
  const { deleteAgent, isPending: isDeleting } = useDeleteAgent();

  // Modal states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // --- Loading State ---
  if (isPending) return <LoadingState entityName="agents" />;

  // --- Empty State ---
  if (!agents || agents.length === 0) return <EmptyState entityName="agents" />;

  const openEditModal = (agent) => {
    setSelectedAgent(agent);
    setIsEditOpen(true);
  };

  const openViewModal = (agent) => {
    setSelectedAgent(agent);
    setIsViewOpen(true);
  };

  return (
    <div className="block lap:hidden p-4">
      <div className="grid grid-cols-1 tab:grid-cols-2 gap-4">
        {agents.map((agent, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    agent.avatarUrl ||
                    "https://placehold.co/50x50/94A3B8/FFFFFF?text=A"
                  }
                  alt={agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/50x50/94A3B8/FFFFFF?text=A")
                  }
                />
                <div>
                  <h3 className="font-semibold text-neutral-800 text-sm tab:text-base">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{agent.email}</p>
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
                    onClick: () => deleteAgent(agent.id),
                  },
                ]}
              />
            </div>

            {/* Body */}
            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p>
                <span className="font-medium text-neutral-600">Phone:</span>{" "}
                {agent.phone}
              </p>
              <div className="flex justify-between">
                <p>
                  <span className="font-medium text-neutral-600">Listed:</span>{" "}
                  {agent.listed}
                </p>
                <p>
                  <span className="font-medium text-neutral-600">Clients:</span>{" "}
                  {agent.clients}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <AgentStatusBadge status={agent.status} />
              <button
                onClick={() => openViewModal(agent)}
                className="text-sm font-medium text-normal px-2 py-1 rounded-md hover:bg-[#e6f4fa] transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {isEditOpen && selectedAgent && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl
              w-[80%]  lap:w-3/7 p-6 border border-white transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-10 top-10">
              <CancelX onClick={() => setIsEditOpen(false)} />
            </div>

            <EditAgent
              agent={selectedAgent}
              onCloseModal={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ✅ View Details Modal */}
      {isViewOpen && selectedAgent && (
        <ViewAgentProfile
          selectedAgent={selectedAgent}
          setIsViewOpen={setIsViewOpen}
        />
      )}
    </div>
  );
}

export default AgentCards;
