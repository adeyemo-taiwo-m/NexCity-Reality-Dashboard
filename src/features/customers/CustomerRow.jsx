import React, { useState } from "react";
import {
  HiOutlineEllipsisVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import CustomerStatusBadge from "./CustomersStatusBadge";
import ActionModal from "../../ui/ActionModal";
import useDeleteCustomer from "./useDeleteCustomer";
import EditCustomer from "./EditCustomer";
import ViewCustomerProfile from "./ViewCustomerProfile";
import CancelX from "../../ui/CancelX";

const CustomerRow = ({
  customerId,
  name,
  email,
  interestedProperty,
  dealType,
  amount,
  status,
  activity,
  avatarUrl,
}) => {
  const { deleteCustomer, isPending } = useDeleteCustomer();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const customer = {
    id: customerId,
    name,
    email,
    interestedProperty,
    dealType,
    amount,
    status,
    activity,
    avatarUrl,
  };

  return (
    <>
      <tr
        className="border-b hover:bg-gray-50 transition-colors"
        style={{ borderColor: "var(--color-neutral-200)" }}
      >
        {/* Customer Info */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={
                avatarUrl || "https://placehold.co/40x40/94A3B8/FFFFFF?text=CU"
              }
              alt={`${name}'s avatar`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span
              className="text-sm font-medium cursor-pointer hover:underline"
              style={{ color: "var(--color-normal)" }}
            >
              {name}
            </span>
          </div>
        </td>

        <td className="px-6 py-4 text-sm text-gray-600">{email}</td>
        <td className="px-6 py-4 text-sm text-center text-gray-600">
          {interestedProperty}
        </td>
        <td className="px-6 py-4 text-sm text-center text-gray-600 capitalize">
          {dealType}
        </td>
        <td className="px-6 py-4 text-sm text-center text-gray-600">
          {amount ? `₦${amount.toLocaleString()}` : "—"}
        </td>
        <td className="px-6 py-4 text-center">
          <CustomerStatusBadge status={status} />
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">{activity}</td>

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
                onClick: () => deleteCustomer(customerId),
              },
            ]}
          />
        </td>
      </tr>

      {/* ✅ Edit Modal */}
      {isEditOpen && (
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

            <EditCustomer
              customer={customer}
              onCloseModal={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ✅ View Modal */}
      {isViewOpen && (
        <ViewCustomerProfile
          setIsViewOpen={setIsViewOpen}
          selectedCustomer={customer}
        />
      )}
    </>
  );
};

export default CustomerRow;
