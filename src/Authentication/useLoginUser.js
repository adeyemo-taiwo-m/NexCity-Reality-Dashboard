import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLoginUser() {
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: () => {
      toast.success("You are logged in successfully");
      navigate("/");
    },
    onError: (err) => {
      console.error("Login failed:", err.message);
      toast.error("Oops, there is an error loggin you in");
    },
  });

  return { login, isPending, isError, error, isSuccess };
}
