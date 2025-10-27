import { useQuery } from "@tanstack/react-query";
import getCustomers from "../../services/apiCustomers";
import { useSearchParams } from "react-router-dom";

function useCustomers() {
  const [searchParams] = useSearchParams();
  const field = searchParams.get("status");

  // Filter
  const filter =
    !field || field === "all" ? null : { field: "status", value: field };

  // Search Filter
  const searchQuery = searchParams.get("name") || "";

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "name-asc"; // default sorting by name
  const [sortField, direction] = sortByRaw.split("-");
  const sortBy = { sortField, direction };

  const {
    data: customers,
    isPending,
    error,
  } = useQuery({
    queryKey: ["customers", filter, sortBy, searchQuery],
    queryFn: () => getCustomers({ filter, sortBy, searchQuery }),
  });

  return {
    customers,
    isPending,
    error,
  };
}

export default useCustomers;
