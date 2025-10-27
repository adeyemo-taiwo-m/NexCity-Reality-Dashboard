import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCustomer as editCustomerApi } from "../../services/apiCustomers";
import toast from "react-hot-toast";

function useEditCustomer() {
  const queryClient = useQueryClient();

  const {
    data: editedCustomer,
    mutate: editCustomer,
    isPending: isPendingCustomer,
  } = useMutation({
    mutationKey: ["customers"],
    mutationFn: ({ customerId, updatedData }) =>
      editCustomerApi(customerId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer updated successfully");
    },
    onError: () => {
      toast.error("Failed to update customer");
    },
  });

  return { editedCustomer, editCustomer, isPendingCustomer };
}

export default useEditCustomer;
