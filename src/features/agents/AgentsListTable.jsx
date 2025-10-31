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
  console.log(agents);
  // --- Loading State ---
  if (isPending) {
    return <LoadingState entityName="properties" />;
  }

  // --- Empty State ---
  if (!agents || agents.length === 0) {
    return <EmptyState entityName="properties" />;
  }

  return (
    <div
      className="bg-white shadow-md rounded-2xl font-sans"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Desktop/Laptop Table */}
      <div className="hidden lap:block w-full overflow-x-auto rounded-2xl">
        <table
          className="min-w-[800px] w-full text-sm text-left border-collapse"
          style={{ color: "var(--color-neutral-700)" }}
        >
          <thead
            className="bg-light text-xs  font-semibold uppercase tracking-wide"
            style={{
              color: "var(--color-neutral-600)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <tr>
              <th className="px-6 text-neutral-700 py-3 whitespace-nowrap">
                Agent
              </th>
              <th className="px-6 py-3 text-neutral-700 whitespace-nowrap">
                Email
              </th>
              <th className="px-6 py-3 text-neutral-700 whitespace-nowrap">
                Phone
              </th>
              <th className="px-6 py-3 text-neutral-700 text-center whitespace-nowrap">
                Listed
              </th>
              <th className="px-6 py-3 text-neutral-700 text-center whitespace-nowrap">
                Closed Deals
              </th>
              <th className="px-6 py-3 text-neutral-700 whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-3  text-neutral-700 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody
            className="divide-y"
            style={{ borderColor: "var(--color-neutral-200)" }}
          >
            {agents.map((agent, i) => (
              <AgentRow
                key={i}
                agentId={agent.id}
                name={agent.name}
                email={agent.email}
                phone={agent.phone}
                propertiesListed={agent.listed}
                closedDeals={agent.closedDeals}
                status={agent.status}
                image={agent.image}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/*  Mobile/Tablet Cards */}
      <AgentCards />
      {/* Pagination */}
      <div
        className="border-t px-6 py-4"
        style={{ borderColor: "var(--color-neutral-200)" }}
      >
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
