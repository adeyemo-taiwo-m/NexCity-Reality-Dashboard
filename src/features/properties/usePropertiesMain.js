import { useQuery } from "@tanstack/react-query";
import React from "react";
import getProperties from "../../services/apiProperties";

function usePropertiesMain() {
  const {
    data: properties,
    isPending,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });

  return {
    properties,
    isPending,
    error,
  };
}

export default usePropertiesMain;
