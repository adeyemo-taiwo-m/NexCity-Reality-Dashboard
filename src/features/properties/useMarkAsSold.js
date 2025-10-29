import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { markPropertyAsSold } from "../../services/apiProperties";
import toast from "react-hot-toast";

function useMarkAsSold() {
  const queryClient = useQueryClient();
  const {
    data: soldProperty,
    mutate: sellProperty,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["properties"],
    mutationFn: (id) => markPropertyAsSold(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property marked as sold");
    },
    onError: () => {
      toast.error("Unable to mark Property marked as sold");
    },
  });

  return { sellProperty, soldProperty, isPending, error };
}

export default useMarkAsSold;
