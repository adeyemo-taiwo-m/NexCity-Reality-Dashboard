import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomer as updateCustomerApi } from "../../services/apiCustomers";
import toast from "react-hot-toast";

function useUpdateCustomer() {
  const queryClient = useQueryClient();

  const {
    data: updatedCustomer,
    mutate: updateCustomer,
    isPending,
  } = useMutation({
    mutationKey: ["customers"],
    mutationFn: (rowData) => updateCustomerApi(rowData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("A new customer is added successfully");
    },
    onError: () => {
      toast.error("Failed to add customer");
    },
  });

  return { updatedCustomer, updateCustomer, isPending };
}

export default useUpdateCustomer;
