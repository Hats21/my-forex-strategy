import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login");
      queryClient.removeQueries();
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Error while logging out! please try again");
    },
  });

  return { logout, isLoading };
}
