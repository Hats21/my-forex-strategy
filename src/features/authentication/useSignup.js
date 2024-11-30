import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "user signed up successfully. Please verify the new account from user's email address",
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
}
