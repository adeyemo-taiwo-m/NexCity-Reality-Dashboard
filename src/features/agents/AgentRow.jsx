import React, { useState } from "react";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import AgentStatusBadge from "./AgentStatusBagde";
import ActionModal from "../../ui/ActionModal";
import useDeleteAgent from "./useDeleteAgent";
import EditAgent from "./EditAgent";
import CancelX from "../../ui/CancelX";
import Button from "../../ui/Button";
import ViewAgentProfile from "./ViewAgentProfile";

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

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const agent = {
    id: agentId,
    name,
    email,
    phone,
    status,
    propertiesListed,
    closedDeals,
    avatarUrl,
  };

  return (
    <>
      <tr
        className="border-b hover:bg-gray-50 transition-colors"
        style={{ borderColor: "var(--color-neutral-200)" }}
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

        <td className="px-6 py-4 text-sm text-gray-600">{email}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{phone}</td>
        <td className="px-6 py-4 text-sm text-center text-gray-600">
          {propertiesListed}
        </td>
        <td className="px-6 py-4 text-sm text-center text-gray-600">
          {closedDeals}
        </td>
        <td className="px-6 py-4">
          <AgentStatusBadge status={status} />
        </td>

        {/* Actions */}
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
                label: "View Details",
                icon: HiOutlineEye,
                onClick: () => setIsViewOpen(true),
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

      {/* ✅ Edit Modal */}
      {isEditOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl
              w-[90%] max-w-2/3 lap:w-3/7 p-6 border border-white"
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

      {/* ✅ View Details Modal */}
      {isViewOpen && (
        <ViewAgentProfile setIsViewOpen={setIsViewOpen} selectedAgent={agent} />
      )}
    </>
  );
};

export default AgentRow;
