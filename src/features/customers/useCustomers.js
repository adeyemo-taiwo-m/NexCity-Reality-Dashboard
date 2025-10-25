import { useQuery } from "@tanstack/react-query";
import getCustomers from "../../services/apiCustomers";

function useCustomers() {
  const {
    data: customers,
    isPending: isPendingCustomers,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return {
    customers,
    isPendingCustomers,
    error,
  };
}

export default useCustomers;
