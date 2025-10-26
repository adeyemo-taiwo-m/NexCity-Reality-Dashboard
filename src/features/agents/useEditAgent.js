import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAgent as editAgentApi } from "../../services/apiAgents";
import toast from "react-hot-toast";

function useEditAgent() {
  const queryClient = useQueryClient();

  const {
    data: editedAgent,
    mutate: editAgent,
    isPending: isPendingAgent,
  } = useMutation({
    mutationKey: ["agents"],
    mutationFn: ({ agentId, updatedData }) =>
      editAgentApi(agentId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      toast.success("Agent updated successfully");
    },
    onError: () => {
      toast.error("Failed to update agent");
    },
  });

  return { editedAgent, editAgent, isPendingAgent };
}

export default useEditAgent;
