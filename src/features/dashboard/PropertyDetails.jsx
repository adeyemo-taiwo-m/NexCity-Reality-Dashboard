import React from "react";
import Heading from "../../ui/Heading";
import { formatCurrency } from "../../utils/helpers";
import PropertyStatusBadge from "../properties/PropertyStatusBadge";

function PropertyDetails({ property }) {
  return (
    <div
      key={property.id}
      className="bg-white-hover rounded-lg overflow-hidden shadow-sm"
    >
      <img
        src={property.image || "/house.png"}
        alt={property.title}
        className="w-full  object-cover"
      />
      <div className="p-3 flex flex-col gap-2">
        <Heading type="h3">{property.title}</Heading>
        <p className="text-sm text-neutral-500 truncate">{property.location}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-neutral-800">
            {formatCurrency(property.price)}
          </span>
          <PropertyStatusBadge status={property.status} />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
