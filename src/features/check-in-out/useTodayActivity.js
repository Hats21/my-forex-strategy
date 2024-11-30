import { useQuery } from "@tanstack/react-query";
// import { getStaysTodayActivity } from "../../services/apiBookings";
import { getSettings } from "../../services/apiSettings";

export default function useTodayActivity() {
  const {
    isLoading,
    data: todayActivities,
    error,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["today-activities"],
  });

  return { isLoading, todayActivities, error };
}
