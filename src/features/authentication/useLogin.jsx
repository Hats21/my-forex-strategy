import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isLoading: isLoggingIn,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(["user", user.user]);
      toast.success("Logged in successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);

      toast.error("The provided email or password are incorrect!");
    },
  });

  console.log(error);

  return { login, isLoggingIn };
}

export default useLogin;
