import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import Pagination from "../../ui/Pagination";

function PropertyList() {
  const [page, setPage] = useState(1);

  const properties = Array(10).fill({});

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 tab:grid-cols-2 gap-4 w-full">
        {properties.map((_, index) => (
          <PropertyCard key={index} />
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
