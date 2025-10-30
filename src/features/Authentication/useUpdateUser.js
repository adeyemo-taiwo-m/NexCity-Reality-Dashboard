import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => updateCurrentUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User details updated successfully!");
    },
    onError: (err) => {
      console.error("Signup failed:", err.message);
      toast.error("Unable to update user details.");
    },
  });

  return { updateUser, isPending, isError, error, isSuccess };
}
