import React from "react";
import AgentStatusBadge from "./AgentStatusBagde";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import useAgents from "./useAgents";
import LoadingState from "../../ui/LoadingState";
import EmptyState from "../../ui/EmptyState";

function AgentCards() {
  const { agents, isPending } = useAgents();

  // --- Loading State ---
  if (isPending) {
    return <LoadingState entityName="properties" />;
  }

  // --- Empty State ---
  if (!agents || agents.length === 0) {
    return <EmptyState entityName="properties" />;
  }

  return (
    <div className="block lap:hidden p-4">
      <div className="grid grid-cols-1 tab:grid-cols-2 gap-4">
        {agents.map((agent, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://placehold.co/50x50/94A3B8/FFFFFF?text=A"
                  alt={agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-800 text-sm tab:text-base">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{agent.email}</p>
                </div>
              </div>
              <button
                className="text-neutral-400 hover:text-[--color-dark]"
                aria-label="More actions"
              >
                <HiOutlineEllipsisVertical className="w-5 h-5" />
              </button>
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
              <button className="text-sm font-medium text-normal px-2 py-1 rounded-md hover:bg-[#e6f4fa] transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentCards;
