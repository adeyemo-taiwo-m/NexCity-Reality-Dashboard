import React from "react";
import CancelX from "../../ui/CancelX";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import PropertyStatusBadge from "./PropertyStatusBadge";

function ViewPropertyProfile({ setIsViewOpen, selectedProperty }) {
  return (
    <div
      className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
      onClick={() => setIsViewOpen(false)}
    >
      <div
        className="relative bg-white/95  backdrop-blur-md rounded-2xl shadow-xl
              w-[90%] max-w-md p-10 border border-white transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-4 top-4">
          <CancelX onClick={() => setIsViewOpen(false)} />
        </div>

        {/* Property Details */}
        <div className="flex flex-col items-center text-center mt-4">
          <img
            src={selectedProperty?.image || "/house.png"}
            alt={selectedProperty?.title}
            className="w-full bg-cover h-36 rounded-lg object-cover border-4 border-white shadow"
          />
          <h2 className="mt-4 text-lg font-semibold text-neutral-800">
            {selectedProperty?.title}
          </h2>
          <p className="text-neutral-500 text-sm mb-3">
            {selectedProperty?.location}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-neutral-600 mt-4">
            <p>
              <span className="font-medium text-neutral-800">Listed By:</span>{" "}
              {selectedProperty?.listedBy || "—"}
            </p>
            <p>
              <span className="font-medium text-neutral-800">Price:</span>{" "}
              {selectedProperty?.price
                ? formatCurrency(selectedProperty.price)
                : "—"}
            </p>
            <p>
              <span className="font-medium text-neutral-800">Status:</span>{" "}
              <PropertyStatusBadge status={selectedProperty?.status} />
            </p>
            <p>
              <span className="font-medium text-neutral-800">Listed Date:</span>{" "}
              {selectedProperty?.date
                ? new Date(selectedProperty.date).toLocaleDateString()
                : "—"}
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

export default ViewPropertyProfile;
