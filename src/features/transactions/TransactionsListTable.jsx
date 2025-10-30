import { useState } from "react";
import TransactionRow from "./TransactionRow";
import Pagination from "../../ui/Pagination";
import TransactionCards from "./TransactionCards";
import useTransactions from "./useTransactions";
import LoadingState from "../../ui/LoadingState";
import EmptyState from "../../ui/EmptyState";
import Button from "../../ui/Button";
import { HiOutlineDownload } from "react-icons/hi";
import { saveAs } from "file-saver";

function TransactionsListTable() {
  const [page, setPage] = useState(1);
  const { transactions, isPending } = useTransactions();

  // --- Loading State ---
  if (isPending) {
    return <LoadingState entityName="transactions" />;
  }

  // --- Empty State ---
  if (!transactions || transactions.length === 0) {
    return <EmptyState entityName="transactions" />;
  }

  // --- Export transactions as CSV ---
  const handleExport = (transactions) => {
    if (!transactions || transactions.length === 0) return;

    const headers = [
      "Property",
      "Type",
      "Customer",
      "Amount",
      "Status",
      "Date",
    ];
    const rows = transactions.map((t) => [
      t.property,
      t.type,
      t.customer,
      t.amount,
      t.status,
      t.date,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(",")) // join columns
      .join("\n"); // join rows

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "transactions.csv");
  };

  return (
    <>
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-black)] shadow-md rounded-2xl overflow-hidden">
        {/* ---- TABLE VIEW (Laptop & Desktop) ---- */}
        <div className="hidden lap:block overflow-x-auto">
          <table className="min-w-full   dark:divide-[var(--color-neutral-700)]">
            <thead className="bg-[var(--color-light)] text-neutral-700 dark:bg-[var(--color-dark)]">
              <tr className="text-xs text-neutral-700 font-semibold uppercase tracking-wide  dark:text-[var(--color-neutral-300)]">
                <th className="px-6 py-3 text-neutral-700 text-left whitespace-nowrap">
                  Property
                </th>
                <th className="px-6 py-3 text-neutral-700 text-center whitespace-nowrap">
                  Type
                </th>
                <th className="px-6 py-3 text-neutral-700 text-center whitespace-nowrap">
                  Customer
                </th>
                <th className="px-6 py-3 text-neutral-700 text-center whitespace-nowrap">
                  Amount
                </th>
                <th className="px-6 py-3 text-neutral-700 text-center whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-neutral-700 text-left whitespace-nowrap">
                  Date
                </th>
                <th className="px-6 py-3 text-neutral-700 text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--color-neutral-200)] dark:divide-[var(--color-neutral-700)]">
              {transactions.map((txn, i) => (
                <TransactionRow key={i} {...txn} />
              ))}
            </tbody>
          </table>
        </div>

        {/* ---- CARD VIEW (Tablet & Mobile) ---- */}
        <TransactionCards />

        {/* ---- Pagination ---- */}
        <div className="border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-700)] px-6 py-4">
          <Pagination
            currentPage={page}
            totalPages={3}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>

      {/* ---- Export Button ---- */}
      <div className="mt-4">
        <Button
          onClick={() => handleExport(transactions)}
          variant="tertiary"
          Icon={HiOutlineDownload}
        >
          Export
        </Button>
      </div>
    </>
  );
}

export default TransactionsListTable;
