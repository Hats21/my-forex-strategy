import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully!`),
        queryClient.invalidateQueries({ active: true });
    },
    onError: () =>
      toast.error(`Booking  couldn't be checked out. Please try again!`),
  });

  return { checkout, isCheckingOut };
}
