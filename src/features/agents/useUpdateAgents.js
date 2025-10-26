import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAgents as updateAgentsApi } from "../../services/apiAgents";
import toast from "react-hot-toast";

function useUpdateAgents() {
  const queryClient = useQueryClient();
  const {
    data: updatedAgents,
    mutate: updateAgents,
    isPending,
  } = useMutation({
    mutationKey: ["agents"],
    mutationFn: (rowData) => updateAgentsApi(rowData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      toast.success("A new agent is added successfully");
    },
    onError: () => {
      toast.error("Failed to add agent");
    },
  });
  return { updatedAgents, updateAgents, isPending };
}

export default useUpdateAgents;
