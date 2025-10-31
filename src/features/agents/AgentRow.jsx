import React, { useState } from "react";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import AgentStatusBadge from "./AgentStatusBagde";
import ActionModal from "../../ui/ActionModal";
import useDeleteAgent from "./useDeleteAgent";
import EditAgent from "./EditAgent";
import CancelX from "../../ui/CancelX";
import ViewAgentProfile from "./ViewAgentProfile";

const AgentRow = ({
  name,
  email,
  agentId,
  phone,
  propertiesListed,
  closedDeals,
  status,
  image,
}) => {
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
    image,
  };
  return (
    <>
      <tr
        className="border-b hover:bg-dark transition-colors font-sans"
        style={{ borderColor: "var(--color-neutral-200)" }}
      >
        {/* Name & Avatar */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={image || "/default-user.jpg"}
              alt={`${name}'s avatar`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span
              className="text-sm font-medium cursor-pointer hover:underline"
              style={{
                color: "var(--color-normal)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {name}
            </span>
          </div>
        </td>

        <td
          className="px-6 py-4 text-sm"
          style={{
            color: "var(--color-neutral-700)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {email}
        </td>

        <td
          className="px-6 py-4 text-sm"
          style={{
            color: "var(--color-neutral-700)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {phone}
        </td>

        <td
          className="px-6 py-4 text-sm text-center"
          style={{
            color: "var(--color-neutral-700)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {propertiesListed}
        </td>

        <td
          className="px-6 py-4 text-sm text-center"
          style={{
            color: "var(--color-neutral-700)",
            fontFamily: "var(--font-sans)",
          }}
        >
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
};

export default AgentRow;
