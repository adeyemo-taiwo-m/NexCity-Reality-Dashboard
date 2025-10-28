import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import getProperties from "../../services/apiProperties";

function useProperties() {
  const [searchParams] = useSearchParams();

  // Optional search filter (e.g., by title or location)
  const searchQuery = searchParams.get("search") || "";

  // Optional filter (e.g., by status)
  const statusFilter = searchParams.get("status");
  const filter =
    !statusFilter || statusFilter === "all"
      ? null
      : { field: "status", value: statusFilter };

  // Optional sorting (default by price descending)
  const sortByRaw = searchParams.get("sortBy") || "price-desc";
  const [sortField, direction] = sortByRaw.split("-");
  const sortBy = { sortField, direction };

  const typeFilter = searchParams.get("agent");
  const typeFilterData =
    !typeFilter || typeFilter === "all"
      ? null
      : { field: "listedBy", value: typeFilter };
  const {
    data: properties,
    isPending,
    error,
  } = useQuery({
    queryKey: ["properties", filter, sortBy, searchQuery, typeFilterData],
    queryFn: () =>
      getProperties({ filter, sortBy, searchQuery, typeFilterData }),
  });

  return {
    properties,
    isPending,
    error,
  };
}

export default useProperties;
