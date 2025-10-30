import React from "react";
import CancelX from "../../ui/CancelX";
import AgentStatusBadge from "./AgentStatusBagde";
import Button from "../../ui/Button";

function ViewAgentProfile({ setIsViewOpen, selectedAgent }) {
  return (
    <div
      className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
      onClick={() => setIsViewOpen(false)}
    >
      <div
        className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl
              w-[90%] max-w-md p-6 border border-white transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-8 top-8">
          <CancelX onClick={() => setIsViewOpen(false)} />
        </div>

        {/* Agent Details */}
        <div className="flex flex-col items-center text-center mt-4">
          <img
            src={selectedAgent?.avatarUrl || "/default-png.jpg"}
            alt={selectedAgent?.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
          />
          <h2 className="mt-4 text-lg font-semibold text-neutral-800">
            {selectedAgent?.name}
          </h2>
          <p className="text-neutral-500 text-sm mb-3">
            {selectedAgent?.email}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-neutral-600 mt-4">
            <p>
              <span className="font-medium text-neutral-800">Phone:</span>{" "}
              {selectedAgent?.phone}
            </p>
            <p>
              <span className="font-medium text-neutral-800">Status:</span>{" "}
              <AgentStatusBadge status={selectedAgent?.status} />
            </p>
            <p>
              <span className="font-medium text-neutral-800">
                Properties Listed:
              </span>{" "}
              {selectedAgent?.listed}
            </p>
            <p>
              <span className="font-medium text-neutral-800">Clients:</span>{" "}
              {selectedAgent?.clients}
            </p>
          </div>

          <div className="mt-6 ">
            <Button variant="primary" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAgentProfile;
