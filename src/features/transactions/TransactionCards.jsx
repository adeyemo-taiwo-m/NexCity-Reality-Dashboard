import React, { useState } from "react";
import {
  HiOutlineEllipsisVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import useTransactions from "./useTransactions";
import useDeleteTransaction from "./useDeleteTransaction";
import EditTransaction from "./EditTransaction";
import ViewTransactionProfile from "./ViewTransactionProfile";
import ActionModal from "../../ui/ActionModal";
import EmptyState from "../../ui/EmptyState";
import LoadingState from "../../ui/LoadingState";
import CancelX from "../../ui/CancelX";
import { formatCurrency } from "../../utils/helpers";
import TransactionsStatusBadge from "./TransactionsStatusBadge";

function TransactionCards() {
  const { transactions, isPending } = useTransactions();
  const { deleteTransaction, isPending: isDeleting } = useDeleteTransaction();

  // --- Local modal states ---
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // --- Loading State ---
  if (isPending) {
    return <LoadingState entityName="transactions" />;
  }

  // --- Empty State ---
  if (!transactions || transactions.length === 0) {
    return <EmptyState entityName="transactions" />;
  }

  return (
    <div className="block lap:hidden p-4">
      <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-3 gap-4">
        {transactions.map((txn, i) => (
          <div
            key={txn.id || i}
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
                  <p className="text-xs text-neutral-500 capitalize">
                    {txn.type}
                  </p>
                </div>
              </div>

              <ActionModal
                disabled={isDeleting}
                items={[
                  {
                    label: "Edit",
                    icon: HiOutlinePencil,
                    onClick: () => {
                      setSelectedTransaction(txn);
                      setIsEditOpen(true);
                    },
                  },
                  {
                    label: "View Details",
                    icon: HiOutlineEye,
                    onClick: () => {
                      setSelectedTransaction(txn);
                      setIsViewOpen(true);
                    },
                  },
                  {
                    label: "Delete",
                    icon: HiOutlineTrash,
                    onClick: () => deleteTransaction(txn.id),
                  },
                ]}
              >
                <HiOutlineEllipsisVertical className="w-5 h-5 text-neutral-500" />
              </ActionModal>
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
                  {formatCurrency(txn.amount)}
                </p>

                {/* ✅ Status Badge */}
                <TransactionsStatusBadge
                  status={
                    txn.status.charAt(0).toUpperCase() + txn.status.slice(1)
                  }
                />
              </div>
              <p>
                <span className="font-medium text-neutral-600">Date:</span>{" "}
                {txn.date}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedTransaction(txn);
                  setIsViewOpen(true);
                }}
                className="text-sm font-medium text-normal px-2 py-1 rounded-md hover:bg-[#e6f4fa] transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {isEditOpen && selectedTransaction && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl w-[90%] max-w-2/3 lap:w-3/7 p-6 border border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-10 top-10">
              <CancelX onClick={() => setIsEditOpen(false)} />
            </div>

            <EditTransaction
              transaction={selectedTransaction}
              onCloseModal={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ✅ View Modal */}
      {isViewOpen && selectedTransaction && (
        <ViewTransactionProfile
          setIsViewOpen={setIsViewOpen}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}

export default TransactionCards;
