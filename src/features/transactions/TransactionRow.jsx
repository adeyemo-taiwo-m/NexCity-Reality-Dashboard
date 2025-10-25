import React from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import TransactionsStatusBadge from "./TransactionsStatusBadge";
import { formatCurrency } from "../../utils/helpers";

const TransactionRow = ({
  property,
  type,
  customer,
  amount,
  status,
  date,
  propertyImage,
}) => {
  const fallbackImage = "https://placehold.co/40x40/94A3B8/FFFFFF?text=P";

  return (
    <tr className=" hover:bg-[#f9fafb] transition-colors">
      {/* Property Info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={propertyImage || "/house.png"}
            onError={(e) => (e.currentTarget.src = fallbackImage)}
            alt={property}
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="text-sm font-medium text-gray-700">{property}</span>
        </div>
      </td>

      {/* Transaction Type */}
      <td className="px-6 py-4 text-sm text-center text-gray-600">{type}</td>

      {/* Customer Name */}
      <td className="px-6 py-4 text-sm text-center text-gray-600">
        {customer}
      </td>

      {/* Amount */}
      <td className="px-6 py-4 text-sm text-center text-gray-600">
        {formatCurrency(amount)}
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <TransactionsStatusBadge status={status} />
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-gray-600">{date}</td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <button className="p-1 rounded-full hover:bg-gray-100">
          <HiOutlineEllipsisVertical className="w-5 h-5 text-gray-500" />
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
