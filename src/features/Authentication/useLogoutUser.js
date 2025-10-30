import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogoutUser() {
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      toast.success("You are logged out successfully");
      navigate("/login");
    },
    onError: (err) => {
      console.error("Login failed:", err.message);
      toast.error("Oops, there is an error loggin you out");
    },
  });

  return { logout, isPending, isError, error, isSuccess };
}
