import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success(`Booking #{data.id} deleted successfully`);
      // navigate(-1);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("Booking couldn't be deleted."),
  });

  return { deleteBooking, isDeleting };
}
