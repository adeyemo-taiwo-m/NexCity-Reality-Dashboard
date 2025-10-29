import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuth";

export default function useGetUser() {
  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  return { user, isPending, error };
}
