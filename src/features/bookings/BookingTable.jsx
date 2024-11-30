/* eslint-disable no-unused-vars */
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import useBookings from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  // const bookings = [];
  const { isLoading, error, bookings, count } = useBookings();

  const [searchParams] = useSearchParams();
  const filterString = searchParams.get("status") || "all";
  const sortString = searchParams.get("sortBy") || "totalPrice-asc";
  let filteredBookings = bookings;
  console.log(filterString);

  if (isLoading) return <Spinner />;

  if (error) return <p>{error.message}</p>;
  if (bookings.length === 0) return <Empty resourceName="bookings" />;

  // if (filterString === "all") filteredBookings = bookings;

  // if (filterString === "unconfirmed")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "unconfirmed",
  //   );

  // if (filterString === "checked-out")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-out",
  //   );
  // if (filterString === "checked-in")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-in",
  //   );

  const [field, direction] = sortString.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  // filteredBookings = filteredBookings.sort(
  //   (a, b) => (a[field] - b[field]) * modifier,
  // );

  console.log(sortString);

  console.log(bookings);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
