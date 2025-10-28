import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProperty as addPropertyApi } from "../../services/apiProperties";
import toast from "react-hot-toast";

function useAddProperty() {
  const queryClient = useQueryClient();

  const {
    data: newProperty,
    mutate: addProperty,
    isPending,
  } = useMutation({
    mutationKey: ["properties"],
    mutationFn: (propertyData) => addPropertyApi(propertyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("A new property has been added successfully");
    },
    onError: () => {
      toast.error("Failed to add property");
    },
  });

  return { newProperty, addProperty, isPending };
}

export default useAddProperty;
