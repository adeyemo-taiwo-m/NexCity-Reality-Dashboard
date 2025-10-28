import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty as deletePropertyApi } from "../../services/apiProperties";
import toast from "react-hot-toast";

function useDeleteProperty() {
  const queryClient = useQueryClient();

  const {
    data: deletedProperty,
    mutate: deleteProperty,
    isPending,
  } = useMutation({
    mutationKey: ["properties"],
    mutationFn: (propertyId) => deletePropertyApi(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete property");
    },
  });

  return { deletedProperty, deleteProperty, isPending };
}

export default useDeleteProperty;
