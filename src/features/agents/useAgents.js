import { useQuery } from "@tanstack/react-query";
import getAgents from "../../services/apiAgents";
import { useSearchParams } from "react-router-dom";

function useAgents() {
  const [searchParams] = useSearchParams();
  const field = searchParams.get("status");

  // Filter
  const filter =
    !field || field === "all" ? null : { field: "status", value: field };

  // Search Filter
  const searchQuery = searchParams.get("name") || "";
  console.log(searchQuery);
  // Sort
  const sortByRaw = searchParams.get("sortBy") || "closedDeals-asc";
  const [sortField, direction] = sortByRaw && sortByRaw.split("-");
  const sortBy = { sortField, direction };
  const {
    data: agents,
    isPending,
    error,
  } = useQuery({
    queryKey: ["agents", filter, sortBy, searchQuery],
    queryFn: () => getAgents({ filter, sortBy, searchQuery }),
  });

  return {
    agents,
    isPending,
    error,
  };
}

export default useAgents;
