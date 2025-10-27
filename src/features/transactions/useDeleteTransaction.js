import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction as deleteTransactionApi } from "../../services/apiTransactions";
import toast from "react-hot-toast";

function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const {
    data: deletedTransaction,
    mutate: deleteTransaction,
    isPending,
  } = useMutation({
    mutationKey: ["transactions"],
    mutationFn: (transactionId) => deleteTransactionApi(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  return { deletedTransaction, deleteTransaction, isPending };
}

export default useDeleteTransaction;
