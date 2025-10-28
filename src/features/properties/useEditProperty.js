import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProperty as editPropertyApi } from "../../services/apiProperties";
import toast from "react-hot-toast";

function useEditProperty() {
  const queryClient = useQueryClient();

  const {
    data: editedProperty,
    mutate: editProperty,
    isPending: isPendingProperty,
  } = useMutation({
    mutationKey: ["properties"],
    mutationFn: ({ propertyId, updatedData }) =>
      editPropertyApi(propertyId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property updated successfully");
    },
    onError: () => {
      toast.error("Failed to update property");
    },
  });

  return { editedProperty, editProperty, isPendingProperty };
}

export default useEditProperty;
