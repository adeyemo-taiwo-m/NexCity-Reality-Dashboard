import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signUp } from "../services/apiAuth";

export default function useSignup() {
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: () => {
      toast.success("Account created successfully!");
      navigate("/login"); // Redirect to login after signup
    },
    onError: (err) => {
      console.error("Signup failed:", err.message);
      toast.error("Error creating your account. Please try again.");
    },
  });

  return { signup, isPending, isError, error, isSuccess };
}
