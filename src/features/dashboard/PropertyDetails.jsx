import React from "react";
import Heading from "../../ui/Heading";
import { formatCurrency } from "../../utils/helpers";

function PropertyDetails({ property }) {
  return (
    <div
      key={property.id}
      className="bg-blue-50 rounded-lg overflow-hidden shadow-sm"
    >
      <img
        src={property.image || "/house.png"}
        alt={property.title}
        className="w-full  object-cover"
      />
      <div className="p-3 flex flex-col gap-2">
        <Heading type="h3">{property.title}</Heading>
        <p className="text-xs text-neutral-500 truncate">{property.location}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-neutral-800">
            {formatCurrency(property.price)}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              property.status === "Available"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {property.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
