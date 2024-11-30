/* eslint-disable no-unused-vars */
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import TableBookingOperations from "../features/bookings/BookingTableOperations";
// import { getBooking } from "../services/apiBookings";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Trades</Heading>
        <TableBookingOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
