/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEditCabin,
  createTrade as createTradeApi,
} from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // creating cabin
  const { mutate: createTrade, isLoading: isCreating } = useMutation({
    mutationFn: createTradeApi,
    onSuccess: () => {
      toast.success("Cabin successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["trades"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createTrade, isCreating };
}
