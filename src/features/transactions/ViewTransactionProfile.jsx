import React from "react";
import CancelX from "../../ui/CancelX";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import TransactionsStatusBadge from "./TransactionsStatusBadge";

function ViewTransactionProfile({ setIsViewOpen, selectedTransaction }) {
  const fallbackImage = "https://placehold.co/100x100/94A3B8/FFFFFF?text=P";

  return (
    <div
      className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
      onClick={() => setIsViewOpen(false)}
    >
      <div
        className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl w-[90%] max-w-md p-6 border border-white transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute right-6 top-6">
          <CancelX onClick={() => setIsViewOpen(false)} />
        </div>

        {/* Transaction Info */}
        <div className="flex flex-col items-center text-center mt-4">
          <img
            src={selectedTransaction?.propertyImage || fallbackImage}
            alt={selectedTransaction?.property || "Property"}
            className="w-28 h-28 rounded-lg object-cover border-4 border-white shadow"
          />
          <h2 className="mt-4 text-lg font-semibold text-gray-800">
            {selectedTransaction?.property || "—"}
          </h2>
          <p className="text-gray-500 text-sm mb-3 capitalize">
            {selectedTransaction?.type || "—"}
          </p>

          {/* Transaction Details Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-600 mt-4 w-full">
            <p>
              <span className="font-medium text-gray-800">Customer:</span>{" "}
              {selectedTransaction?.customer || "—"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Amount:</span>{" "}
              {selectedTransaction?.amount
                ? formatCurrency(selectedTransaction.amount)
                : "—"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Status:</span>{" "}
              <TransactionsStatusBadge
                status={selectedTransaction?.status || "pending"}
              />
            </p>
            <p>
              <span className="font-medium text-gray-800">Date:</span>{" "}
              {selectedTransaction?.date || "—"}
            </p>
          </div>

          {/* Close Button */}
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

export default ViewTransactionProfile;
