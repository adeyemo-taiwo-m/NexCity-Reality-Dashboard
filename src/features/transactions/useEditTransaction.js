import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTransaction as editTransactionApi } from "../../services/apiTransactions";
import toast from "react-hot-toast";

function useEditTransaction() {
  const queryClient = useQueryClient();

  const {
    data: editedTransaction,
    mutate: editTransaction,
    isPending: isPendingTransaction,
  } = useMutation({
    mutationKey: ["transactions"],
    mutationFn: ({ transactionId, updatedData }) =>
      editTransactionApi(transactionId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction updated successfully");
    },
    onError: () => {
      toast.error("Failed to update transaction");
    },
  });

  return { editedTransaction, editTransaction, isPendingTransaction };
}

export default useEditTransaction;
