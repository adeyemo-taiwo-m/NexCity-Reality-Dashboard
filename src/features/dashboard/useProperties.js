import { useQuery } from "@tanstack/react-query";
import React from "react";
import getProperties from "../../services/apiProperties";
import { useSearchParams } from "react-router-dom";

// function useProperties() {
//   const [searchParams] = useSearchParams();
//   const filterField = searchParams.get("last");
//   const filter =
//     !filterField || filterField === "all"
//       ? null
//       : { field: "date", value: filterField, method: "gte" };
//   console.log(filter);
//   const {
//     data: properties,
//     isPending,
//     error,
//   } = useQuery({
//     queryKey: ["properties", filter],
//     queryFn: () => getProperties(filter),
//   });

//   return {
//     properties,
//     isPending,
//     error,
//   };
// }

function useProperties() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("last");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "date", value: filterValue, method: "gte" };

  const {
    data: properties,
    isPending,
    error,
  } = useQuery({
    queryKey: ["properties", filter],
    queryFn: () => getProperties({ filter }), // pass as object
  });

  return { properties, isPending, error };
}
export default useProperties;
