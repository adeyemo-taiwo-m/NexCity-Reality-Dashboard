import { useQuery } from "@tanstack/react-query";
import getCustomers from "../../services/apiCustomers";

function useCustomers() {
  const {
    data: customers,
    isPending,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return {
    customers,
    isPending,
    error,
  };
}

export default useCustomers;
