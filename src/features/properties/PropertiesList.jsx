import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import Pagination from "../../ui/Pagination";
import { properties } from "../../assets/data";

function PropertyList() {
  const [page, setPage] = useState(1);

  // 🏡 Sample property data

  return (
    <div className="flex flex-col gap-6">
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={3}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default PropertyList;
