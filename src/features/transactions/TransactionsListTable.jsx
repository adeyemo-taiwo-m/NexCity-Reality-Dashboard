import { useState } from "react";
import TransactionRow from "./TransactionRow";
import Pagination from "../../ui/Pagination";
import TransactionCards from "./TransactionCards";
import useTransactions from "./useTransactions";
import LoadingState from "../../ui/LoadingState";
import EmptyState from "../../ui/EmptyState";

function TransactionsListTable() {
  const [page, setPage] = useState(1);
  const { transactions, isPending } = useTransactions();

  // --- Loading State ---
  if (isPending) {
    return <LoadingState entityName="properties" />;
  }

  // --- Empty State ---
  if (!transactions || transactions.length === 0) {
    return <EmptyState entityName="properties" />;
  }

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      {/* TABLE VIEW (for laptop and desktop) */}
      <div className="hidden lap:block overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-light">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              <th className="px-6 py-3 text-left whitespace-nowrap">
                Property
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">Type</th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Customer
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Amount
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-3 text-left whitespace-nowrap">Date</th>
              <th className="px-6 py-3 text-right whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200">
            {transactions.map((txn, i) => (
              <TransactionRow key={i} {...txn} />
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW (for tablet and mobile) */}
      <TransactionCards />

      <div className="border-t border-neutral-100">
        <Pagination
          currentPage={page}
          totalPages={3}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}

export default TransactionsListTable;
