import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import EditProperty from "./EditProperty";
import ViewPropertyProfile from "./ViewPropertyProfile";
import CancelX from "../../ui/CancelX";
import Pagination from "../../ui/Pagination";
import useProperties from "./useProperties";
import useDeleteProperty from "./useDeleteProperty";
import LoadingState from "../../ui/LoadingState";
import EmptyState from "../../ui/EmptyState";

function PropertyList() {
  const { properties, isPending } = useProperties();
  const { deleteProperty } = useDeleteProperty();
  const [page, setPage] = useState(1);

  // --- Modal States ---
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // --- Loading State ---
  if (isPending) return <LoadingState entityName="properties" />;

  // --- Empty State ---
  if (!properties || properties.length === 0)
    return <EmptyState entityName="properties" />;

  // --- Card Action Handler ---
  const handleActionSelect = (action, property) => {
    setSelectedProperty(property);
    if (action === "edit") setIsEditOpen(true);
    else if (action === "view") setIsViewOpen(true);
    else if (action === "delete") deleteProperty(property.id);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* --- Property Grid --- */}
      <div className="property-grid grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onActionSelect={handleActionSelect}
          />
        ))}
      </div>

      {/* --- Pagination --- */}
      <Pagination
        currentPage={page}
        totalPages={3} // Replace with your total pages logic
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* --- Edit Modal --- */}
      {isEditOpen && selectedProperty && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl w-[90%] max-w-2/3 lap:w-3/7 p-6 border border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-10 top-10">
              <CancelX onClick={() => setIsEditOpen(false)} />
            </div>

            <EditProperty
              property={selectedProperty}
              onCloseModal={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}

      {/* --- View Modal --- */}
      {isViewOpen && selectedProperty && (
        <ViewPropertyProfile
          selectedProperty={selectedProperty}
          setIsViewOpen={setIsViewOpen}
        />
      )}
    </div>
  );
}

export default PropertyList;
