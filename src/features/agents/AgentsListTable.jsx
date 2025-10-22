import React from "react";
import AgentRow from "./AgentRow";
import Pagination from "../../ui/Pagination";

const mockAgents = [
  {
    name: "Adeyemo",
    email: "ade@gmail.com",
    phone: "070123456789",
    listed: 14,
    clients: 15,
    status: "Active",
  },
  {
    name: "Sarah John",
    email: "sarah@gmail.com",
    phone: "080112233445",
    listed: 14,
    clients: 15,
    status: "Active",
  },
  {
    name: "Michael Obi",
    email: "mike@gmail.com",
    phone: "09012349876",
    listed: 14,
    clients: 15,
    status: "Inactive",
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    phone: "070111122233",
    listed: 14,
    clients: 15,
    status: "Active",
  },
  {
    name: "Peter King",
    email: "peter@gmail.com",
    phone: "081234567890",
    listed: 14,
    clients: 15,
    status: "Inactive",
  },
  {
    name: "Taiwo A.",
    email: "taiwo@gmail.com",
    phone: "070555666777",
    listed: 14,
    clients: 15,
    status: "Active",
  },
];

function AgentListTable() {
  const [page, setPage] = React.useState(1);

  return (
    <div className="bg-white min-w-[40rem] lap:overflow-hidden shadow-md rounded-2xl overflow-x-auto">
      {/* ✅ Make table scrollable on smaller screens */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y p-4 divide-neutral-200">
          <thead className="bg-light p-4 text-neutral-700">
            <tr className="text-xs font-semibold p-4 uppercase tracking-wide text-neutral-700">
              <th className="px-6 py-3 text-left whitespace-nowrap">Agent</th>
              <th className="px-6 py-3 text-left whitespace-nowrap">Email</th>
              <th className="px-6 py-3 text-left whitespace-nowrap">Phone</th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Listed
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Clients
              </th>
              <th className="px-6 py-3 text-left whitespace-nowrap">Status</th>
              <th className="px-6 py-3 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200">
            {mockAgents.map((agent, i) => (
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

      <div>
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
