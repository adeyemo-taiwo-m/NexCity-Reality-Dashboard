import { useQuery } from "@tanstack/react-query";
import getTransactions from "../../services/apiTransactions";

function useTransactions() {
  const {
    data: transactions,
    isPending,
    error,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: getTransactions,
  });

  return {
    transactions,
    isPending,
    error,
  };
}

export default useTransactions;
