import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useBooking() {
  const { bookingId: checkinId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryFn: () => getBooking(checkinId),
    queryKey: ["booking", checkinId],
    retry: false, // react-query will run 3x in case it fails
  });
  return { isLoading, error, booking };
}

export default useBooking;
