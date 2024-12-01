/* eslint-disable no-unused-vars */
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import TableBookingOperations from "../features/bookings/BookingTableOperations";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
// import { getBooking } from "../services/apiBookings";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Trades</Heading>
        <TableBookingOperations />
      </Row>
      <BookingTable />
      <Modal>
        <Modal.Open opens="registration-form">
          <Button>+ add new trade</Button>
        </Modal.Open>
        <Modal.Window name="registration-form">
          {/* <p>Some content</p> */}
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default Bookings;
