import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import useTransactions from "./useTransactions";
import EmptyState from "../../ui/EmptyState";
import LoadingState from "../../ui/LoadingState";

function TransactionCards() {
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
    <div className="block lap:hidden p-4">
      <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-3 gap-4">
        {transactions.map((txn, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={txn.propertyImage || "/house.png"}
                  alt={txn.property}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-800 text-sm tab:text-base">
                    {txn.property}
                  </h3>
                  <p className="text-xs text-neutral-500">{txn.type}</p>
                </div>
              </div>

              <button
                className="text-neutral-400 hover:text-[--color-dark]"
                aria-label="More actions"
              >
                <HiOutlineEllipsisVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p>
                <span className="font-medium text-neutral-600">Customer:</span>{" "}
                {txn.customer}
              </p>
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-medium text-neutral-600">Amount:</span>{" "}
                  {txn.amount}
                </p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-md ${
                    txn.status === "Completed"
                      ? "bg-green-50 text-green-600"
                      : txn.status === "Pending"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {txn.status}
                </span>
              </div>
              <p>
                <span className="font-medium text-neutral-600">Date:</span>{" "}
                {txn.date}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-end">
              <button className="text-sm font-medium text-normal px-2 py-1 rounded-md hover:bg-[#e6f4fa] transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionCards;
