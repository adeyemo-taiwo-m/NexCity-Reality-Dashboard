import React from "react";
import { customersDetails } from "../../assets/data";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function CustomerCards() {
  return (
    <div className="block lap:hidden p-4">
      <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-3 gap-4">
        {customersDetails.map((customer, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    customer.avatarUrl ||
                    "https://placehold.co/50x50/94A3B8/FFFFFF?text=C"
                  }
                  alt={customer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-800 text-sm tab:text-base">
                    {customer.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{customer.email}</p>
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
                <span className="font-medium text-neutral-600">Property:</span>{" "}
                {customer.interestedProperty}
              </p>
              <div className="flex justify-between">
                <p>
                  <span className="font-medium text-neutral-600">Deal:</span>{" "}
                  {customer.dealType}
                </p>
                <p>
                  <span className="font-medium text-neutral-600">Amount:</span>{" "}
                  {formatCurrency(customer.amount)}
                </p>
              </div>
              <p>
                <span className="font-medium text-neutral-600">Activity:</span>{" "}
                {customer.activity}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md ${
                  customer.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : customer.status === "Closed"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {customer.status}
              </span>

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

export default CustomerCards;
