import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer as deleteCustomerApi } from "../../services/apiCustomers";
import toast from "react-hot-toast";

function useDeleteCustomer() {
  const queryClient = useQueryClient();

  const {
    data: deletedCustomer,
    mutate: deleteCustomer,
    isPending,
  } = useMutation({
    mutationKey: ["customers"],
    mutationFn: (customerId) => deleteCustomerApi(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete customer");
    },
  });

  return { deletedCustomer, deleteCustomer, isPending };
}

export default useDeleteCustomer;
