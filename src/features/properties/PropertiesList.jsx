import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import Pagination from "../../ui/Pagination";
import useProperties from "./useProperties";
import LoadingState from "../../ui/LoadingState";
import EmptyState from "../../ui/EmptyState";

function PropertyList() {
  const { properties, isPending } = useProperties(); // add isLoading from your hook
  const [page, setPage] = useState(1);

  // --- Loading State ---
  if (isPending) {
    return <LoadingState entityName="properties" />;
  }

  // --- Empty State ---
  if (!properties || properties.length === 0) {
    return <EmptyState entityName="properties" />;
  }

  // --- Render Properties ---
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
