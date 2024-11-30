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

  // if (bookings.length > 0) return <p>It worked correctly</p>;

  const [field, direction] = sortString.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  // filteredBookings = filteredBookings.sort(
  //   (a, b) => (a[field] - b[field]) * modifier,
  // );

  console.log(sortString);

  console.log(bookings);

  return (
    <Menus>
      <Table columns="2fr 1fr 2fr 2fr 1fr 1fr 4.8rem">
        <Table.Header>
          <div>Symbol</div>
          <div>Type</div>
          <div>Lot Size</div>
          <div>Risk Ratio</div>
          <div>Status</div>
          <div>P/L</div>
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
