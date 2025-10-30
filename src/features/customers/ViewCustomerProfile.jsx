import React from "react";
import CancelX from "../../ui/CancelX";
import CustomerStatusBadge from "./CustomersStatusBadge";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function ViewCustomerProfile({ setIsViewOpen, selectedCustomer }) {
  return (
    <div
      className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
      onClick={() => setIsViewOpen(false)}
    >
      <div
        className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl
              w-[90%] max-w-md p-6 border border-white transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-8 top-8">
          <CancelX onClick={() => setIsViewOpen(false)} />
        </div>

        {/* Customer Details */}
        <div className="flex flex-col items-center text-center mt-4">
          <img
            src={
              selectedCustomer?.avatarUrl ||
              "https://placehold.co/100x100/94A3B8/FFFFFF?text=CU"
            }
            alt={selectedCustomer?.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
          />
          <h2 className="mt-4 text-lg font-semibold text-neutral-800">
            {selectedCustomer?.name}
          </h2>
          <p className="text-neutral-500 text-sm mb-3">
            {selectedCustomer?.email}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-neutral-600 mt-4">
            <p>
              <span className="font-medium text-neutral-800">
                Interested Property:
              </span>{" "}
              {selectedCustomer?.interestedProperty || "—"}
            </p>
            <p>
              <span className="font-medium text-neutral-800">Deal Type:</span>{" "}
              {selectedCustomer?.dealType || "—"}
            </p>
            <p>
              <span className="font-medium text-neutral-800">Amount:</span>{" "}
              {selectedCustomer?.amount
                ? formatCurrency(selectedCustomer.amount)
                : "—"}
            </p>
            <p>
              <span className="font-medium text-neutral-800">Status:</span>{" "}
              <CustomerStatusBadge status={selectedCustomer?.status} />
            </p>
            <p className="col-span-2">
              <span className="font-medium text-neutral-800">
                Recent Activity:
              </span>{" "}
              {selectedCustomer?.activity || "—"}
            </p>
          </div>

          <div className="mt-6">
            <Button variant="primary" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCustomerProfile;
