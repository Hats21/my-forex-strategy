import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
// import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    isLoading: isLoading1,
    bookings,
    error: error1,
  } = useRecentBookings();
  const {
    isLoading: isLoading2,
    confirmedStays,
    numDays,
    error: error2,
  } = useRecentStays();

  // const { isLoading: isLoading3, cabins } = useCabins();

  if (isLoading1 || isLoading2) return <Spinner />;
  if (error1) return <p>Something went wrong! {error1.message}</p>;
  if (error2) return <p>Something went wrong! {error2.message}</p>;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
      />
      {/* <div>Today{" '"}s activities</div> */}
      <TodayActivity />
      {/* <div>Chart Stay duration </div> */}
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
