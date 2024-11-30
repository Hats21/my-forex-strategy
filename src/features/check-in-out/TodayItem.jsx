/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";

import { Flag } from "../../ui/Flag";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const navigate = useNavigate();
  const { status, id, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "cheched-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" ? (
        // <Button size="small" onClick={() => navigate(`/checkin/${id}`)}>
        //   Check in
        // </Button>
        <Button size="small" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      ) : (
        <Button size="small"> Check out</Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
