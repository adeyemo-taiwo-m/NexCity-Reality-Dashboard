import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addTransaction as addTransactionApi } from "../../services/apiTransactions";

function useUpdateCustomer() {
  const queryClient = useQueryClient();

  const {
    data: addedTransaction,
    mutate: addTransaction,
    isLoading: isPending,
  } = useMutation({
    mutationKey: ["transaction"],
    mutationFn: (transactionData) => addTransactionApi(transactionData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      toast.success("Transaction added successfully");
    },
    onError: () => {
      toast.error("Failed to add transaction");
    },
  });

  return { addedTransaction, addTransaction, isPending };
}

export default useUpdateCustomer;
