import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });
  console.log(error);

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
