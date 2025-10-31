import React, { useState } from "react";

import useAgents from "./useAgents";
import LoadingState from "../../ui/LoadingState";
import EmptyState from "../../ui/EmptyState";
import EditAgent from "./EditAgent";
import CancelX from "../../ui/CancelX";
import ViewAgentProfile from "./ViewAgentProfile";
import AgentGridCard from "./AgentGridCard";

function AgentCards() {
  const { agents, isPending } = useAgents();

  // Modal states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // --- Loading State ---
  if (isPending) return <LoadingState entityName="agents" />;

  // --- Empty State ---
  if (!agents || agents.length === 0) return <EmptyState entityName="agents" />;

  return (
    <div className="block lap:hidden p-4">
      <div className="grid grid-cols-1 tab:grid-cols-2 gap-4">
        {agents.map((agent, i) => (
          <AgentGridCard
            key={i}
            agent={agent}
            setSelectedAgent={setSelectedAgent}
            setIsViewOpen={setIsViewOpen}
            setIsEditOpen={setIsEditOpen}
          />
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {isEditOpen && selectedAgent && (
        <div
          className="fixed inset-0 bg-white/30  backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="relative bg-[var(--color-white)]  
                       rounded-2xl shadow-xl w-[80%] lap:w-3/7 p-6 
                       border border-[var(--color-neutral-100)] 
                       transition-all duration-300"
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
