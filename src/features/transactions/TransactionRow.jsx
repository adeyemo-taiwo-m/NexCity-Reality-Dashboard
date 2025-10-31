import React, { useState } from "react";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import TransactionsStatusBadge from "./TransactionsStatusBadge";
import { formatCurrency } from "../../utils/helpers";
import ActionModal from "../../ui/ActionModal";
import EditTransaction from "./EditTransaction";
import ViewTransactionProfile from "./ViewTransactionProfile";
import CancelX from "../../ui/CancelX";
import useDeleteTransaction from "./useDeleteTransaction";

const TransactionRow = ({
  id,
  property,
  type,
  customer,
  amount,
  status,
  date,
  propertyImage,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { deleteTransaction, isPending } = useDeleteTransaction();

  const fallbackImage = "https://placehold.co/40x40/94A3B8/FFFFFF?text=P";

  const transaction = {
    id,
    property,
    type,
    customer,
    amount,
    status,
    date,
    propertyImage,
  };

  return (
    <>
      <tr
        className="border-b bg-white hover:bg-[var(--color-light)] dark:hover:bg-[var(--color-dark)] transition-colors"
        style={{ borderColor: "var(--color-neutral-200)" }}
      >
        {/* Property Info */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={propertyImage || "/house.png"}
              onError={(e) => (e.currentTarget.src = fallbackImage)}
              alt={property}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-normal)" }}
            >
              {property}
            </span>
          </div>
        </td>

        {/* Type */}
        <td
          className="px-6 py-4 text-sm text-center"
          style={{ color: "var(--color-neutral-800)" }}
        >
          {type}
        </td>

        {/* Customer */}
        <td
          className="px-6 py-4 text-sm text-center"
          style={{ color: "var(--color-neutral-800)" }}
        >
          {customer}
        </td>

        {/* Amount */}
        <td
          className="px-6 py-4 text-sm text-center"
          style={{ color: "var(--color-neutral-800)" }}
        >
          {formatCurrency(amount)}
        </td>

        {/* Status */}
        <td className="px-6 py-4 text-center">
          <TransactionsStatusBadge status={status} />
        </td>

        {/* Date */}
        <td
          className="px-6 py-4 text-sm"
          style={{ color: "var(--color-neutral-800)" }}
        >
          {date}
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
                onClick: () => deleteTransaction(id),
              },
            ]}
          />
        </td>
      </tr>

      {/* Edit Modal */}
      {isEditOpen && (
        <div
          className="fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="relative bg-white backdrop-blur-md rounded-2xl shadow-xl w-[90%] max-w-2/3 lap:w-3/7 p-6 border border-[var(--color-neutral-200)] "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-10 top-10">
              <CancelX onClick={() => setIsEditOpen(false)} />
            </div>

            <EditTransaction
              transaction={transaction}
              onCloseModal={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewOpen && (
        <ViewTransactionProfile
          setIsViewOpen={setIsViewOpen}
          selectedTransaction={transaction}
        />
      )}
    </>
  );
};

export default TransactionRow;
