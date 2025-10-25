import { useQuery } from "@tanstack/react-query";
import React from "react";
import getAgents from "../../services/apiAgents";

function useAgents() {
  const {
    data: agents,
    isPending,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  return {
    agents,
    isPending,
    error,
  };
}

export default useAgents;
