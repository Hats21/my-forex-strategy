/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";
import { format, isToday } from "date-fns";

import { IoEyeOutline, IoTrash } from "react-icons/io5";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Profit = styled.p`
  font-size: 1.8rem;
  font-family: "Sono";
  font-weight: 500;

  ${(props) =>
    props.type === "profit" &&
    css`
      color: #019be3;
    `}
  ${(props) =>
    props.type === "lose" &&
    css`
      color: #e30101;
    `}
`;

const Type = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  & span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    ${(props) =>
      props.type === "sell" &&
      css`
        background: red;
      `}
    ${(props) =>
      props.type === "buy" &&
      css`
        background: #019be3;
      `}
  }
`;

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();

  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    loss: "red",
    profit: "green",
  };

  // function handleClickDetail(id) {
  //   navigate(`/bookings/${id}`);
  // }

  // function handleCheckout(id) {
  //   checkout(id);
  // }

  return (
    <Table.Row>
      <Cabin>{booking.symbol}</Cabin>
      <Type type={booking.type.toLowerCase()}>
        <span></span>
        <p
          style={{
            textTransform: "capitalize",
          }}
        >
          {booking.type}
        </p>
      </Type>
      <p>{booking.lot_size}</p>

      <p>1:3</p>

      {/* <Stacked>
        <span>
          {isToday(new Date(startDate)) ? "Today" : "Tommorow"}
          {/* //   formatDistanceFromNow(startDate)}
          // &rarr; {numNights} night stay //////
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked> */}

      <Tag type="green" status={booking.status}>
        {booking.status}
      </Tag>

      <Profit type={booking.status}>
        {booking.status === "profit"
          ? `+${booking.profit_lose_amount}`
          : `-${booking.profit_lose_amount}`}
      </Profit>
      {/* <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<IoEyeOutline />}
              onClick={() => handleClickDetail(bookingId)}
            >
              See detail
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status == "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => handleCheckout(bookingId)}
              >
                {isCheckingOut ? "Checking out..." : "Check out"}
              </Menus.Button>
            )}
            <Modal.Open opens="delete-booking">
              <Menus.Button icon={<IoTrash />}>delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete-booking">
          <ConfirmDelete
            disabled={isDeleting}
            onConfirm={() =>
              deleteBooking(bookingId, {
                onSuccess: () => navigate(-1),
              })
            }
            resourceName={bookingId}
          />
        </Modal.Window>
      </Modal> */}
    </Table.Row>
  );
}

// <div>
//   {/* modal window */}
//   <Modal>
//     {/* menu */}
//     <Menus.Menu>

//         <Modal.Open opens="edit-cabin">
//           <Menus.Button icon={<FiEdit />}>edit</Menus.Button>
//         </Modal.Open>
//         <Modal.Open opens="delete-cabin">
//           <Menus.Button icon={<IoTrashOutline />}>delete</Menus.Button>
//         </Modal.Open>
//       </Menus.List>
//     </Menus.Menu>

//     <Modal.Window name="edit-cabin">
//       <CreateCabinForm cabinToEdit={cabin} />
//     </Modal.Window>

//     <Modal.Window name="delete-cabin">
//       <ConfirmDelete
//         disabled={isDeleting}
//         onConfirm={() => deleteCabin(cabinId)}
//         resourceName={name}
//       />
//     </Modal.Window>
//   </Modal>
// </div>;
export default BookingRow;
