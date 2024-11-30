/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { hashQueryKey, useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useBooking from "./useBooking";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";

import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { isLoading, error, booking } = useBooking();
  const { isCheckingOut, checkout } = useCheckout();

  if (isLoading) return <Spinner />;
  if (error) return <p>Something went wrong. {error.message}</p>;
  const { status, id: bookingId } = booking;

  function handleCheckout(id) {
    checkout(id);
  }

  function handleDeleteBooking(id) {
    deleteBooking(id, {
      onSuccess: () => navigate(-1),
    });
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            check in
          </Button>
        )}
        <Button
          variation="danger"
          onClick={() => handleDeleteBooking(bookingId)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete booking"}
        </Button>
        {status == "checked-in" && (
          <Button onClick={() => handleCheckout(bookingId)}>
            {isCheckingOut ? "Checking out..." : "Check out"}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
