import { useQuery } from "@tanstack/react-query";
import getTransactions from "../../services/apiTransactions";
import { useSearchParams } from "react-router-dom";

function useTransactions() {
  const [searchParams] = useSearchParams();

  // Optional search filter (e.g., by customer name or property)
  const searchQuery = searchParams.get("search") || "";

  // Optional filter (e.g., by status)
  const statusFilter = searchParams.get("status");
  const filter =
    !statusFilter || statusFilter === "all"
      ? null
      : { field: "status", value: statusFilter };

  // Optional sorting (default by amount descending)
  const sortByRaw = searchParams.get("sortBy") || "amount-desc";
  const [sortField, direction] = sortByRaw.split("-");
  const sortBy = { sortField, direction };

  const typeFilter = searchParams.get("type");
  const typeFilterData =
    !typeFilter || typeFilter === "all"
      ? null
      : { field: "type", value: typeFilter };
  const {
    data: transactions,
    isLoading: isPending, // consistent naming
    error,
  } = useQuery({
    queryKey: ["transactions", filter, sortBy, searchQuery, typeFilterData],
    queryFn: () =>
      getTransactions({ filter, sortBy, searchQuery, typeFilterData }),
  });

  return {
    transactions,
    isPending,
    error,
  };
}

export default useTransactions;
