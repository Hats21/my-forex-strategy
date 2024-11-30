import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateCurrentUser({ fullName, password, avatar }),
    onSuccess: (data) => {
      // we can set the user query again
      // queryClient.setQueryData("user", data.user)
      queryClient.invalidateQueries(["user"]);
      console.log(data);
      toast.success("data updated successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { updateUser, isLoading };
}
