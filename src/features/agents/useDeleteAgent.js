import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAgent as deleteAgentApi } from "../../services/apiAgents";
import toast from "react-hot-toast";

function useDeleteAgent() {
  const queryClient = useQueryClient();

  const {
    data: deletedAgent,
    mutate: deleteAgent,
    isPending,
  } = useMutation({
    mutationKey: ["agents"],
    mutationFn: (agentId) => deleteAgentApi(agentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      toast.success("Agent deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete agent");
    },
  });

  return { deletedAgent, deleteAgent, isPending };
}

export default useDeleteAgent;
