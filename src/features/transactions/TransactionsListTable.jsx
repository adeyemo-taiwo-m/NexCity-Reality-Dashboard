import { useState } from "react";
import TransactionRow from "./TransactionRow";
import Pagination from "../../ui/Pagination";
import { transactionDetails } from "../../assets/data";

function TransactionsListTable() {
  const [page, setPage] = useState(1);

  return (
    <div className="bg-white min-w-[40rem] shadow-md rounded-2xl overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-gray-50">
          <tr className="text-xs font-semibold uppercase tracking-wide text-gray-600">
            <th className="px-6 py-3 text-left whitespace-nowrap">Property</th>
            <th className="px-6 py-3 text-center whitespace-nowrap">Type</th>
            <th className="px-6 py-3 text-center whitespace-nowrap">
              Customer
            </th>
            <th className="px-6 py-3 text-center whitespace-nowrap">Amount</th>
            <th className="px-6 py-3 text-center whitespace-nowrap">Status</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Date</th>
            <th className="px-6 py-3 text-right whitespace-nowrap">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-200">
          {transactionDetails.map((transaction, i) => (
            <TransactionRow key={i} {...transaction} />
          ))}
        </tbody>
      </table>

      <div className=" border-t border-neutral-100">
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
