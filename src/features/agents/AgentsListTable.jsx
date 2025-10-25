import React, { useState } from "react";
import Pagination from "../../ui/Pagination";
import AgentRow from "./AgentRow";

import AgentCards from "./AgentCards";
import useAgents from "./useAgents";
import LoadingState from "../../ui/LoadingState";
import EmptyState from "../../ui/EmptyState";

function AgentListTable() {
  const [page, setPage] = useState(1);
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
    <div className="bg-white shadow-md rounded-2xl">
      {/* ✅ Desktop/Laptop Table */}
      <div className="hidden lap:block w-full overflow-x-auto rounded-2xl">
        <table className="min-w-[800px] w-full text-sm text-left text-neutral-700 border-collapse">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-neutral-600">
            <tr>
              <th className="px-6 py-3 whitespace-nowrap">Agent</th>
              <th className="px-6 py-3 whitespace-nowrap">Email</th>
              <th className="px-6 py-3 whitespace-nowrap">Phone</th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Listed
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Clients
              </th>
              <th className="px-6 py-3 whitespace-nowrap">Status</th>
              <th className="px-6 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200">
            {agents.map((agent, i) => (
              <AgentRow
                key={i}
                name={agent.name}
                email={agent.email}
                phone={agent.phone}
                propertiesListed={agent.listed}
                clientsManaged={agent.clients}
                status={agent.status}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile/Tablet Cards */}
      <AgentCards />
      {/* ✅ Pagination (shared) */}
      <div className="border-t border-neutral-200 px-6 py-4">
        <Pagination
          currentPage={page}
          totalPages={3}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}

export default AgentListTable;
