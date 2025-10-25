import React from "react";
import CustomerRow from "./CustomerRow";
import Pagination from "../../ui/Pagination";
import CustomerCards from "./CustomerCard";
import useCustomers from "./useCustomers";
import EmptyState from "../../ui/EmptyState";
import LoadingState from "../../ui/LoadingState";

function CustomersListTable() {
  const [page, setPage] = React.useState(1);
  const { customers, isPendingCustomers } = useCustomers();
  console.log(customers);
  // --- Loading State ---
  if (isPendingCustomers) {
    return <LoadingState entityName="customers" />;
  }

  // --- Empty State ---
  if (!customers || customers.length === 0) {
    return <EmptyState entityName="customers" />;
  }

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      {/* ---- TABLE VIEW (laptop and up) ---- */}
      <div className="hidden lap:block overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-light text-neutral-700">
            <tr className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
              <th className="px-6 py-3 text-left whitespace-nowrap">
                Customer
              </th>
              <th className="px-6 py-3 text-left whitespace-nowrap">Email</th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Property
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Deal Type
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Amount
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-3 text-left whitespace-nowrap">
                Activity
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200">
            {customers.map((customer, i) => (
              <CustomerRow key={i} {...customer} />
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- CARD VIEW (tablet & mobile) ---- */}
      <CustomerCards />

      <div className="border-t border-neutral-200">
        <Pagination
          currentPage={page}
          totalPages={3}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}

export default CustomersListTable;
