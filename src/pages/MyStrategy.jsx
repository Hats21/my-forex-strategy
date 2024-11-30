import styled from "styled-components";
import StrategyRow from "../features/strategy/StrategyRow";
import Heading from "../ui/Heading";
import Table from "../ui/Table";

const plan_A = [
  { name: "Total maximum risk per trade", value: "3%" },
  { name: "Total maximum risk on account at any given time", value: "15%" },
  { name: "Maximum daily allowable lose", value: "15%" },
  { name: "Maximum weekly allowable lose", value: "20%" },
  { name: "Minimum quality level of entry level signal", value: "8/10" },
];

const trading_session = [
  { name: "Sydney Session", value: "7:00 PM - 4:00 PM" },
  { name: "Tokyo Session", value: "12:00 AM - 9:00 AM" },
  { name: "London Session", value: "7:00 AM - 4:00 PM" },
  { name: "New York Session", value: "1:00 PM - 10:00 PM" },
];

const StyledHeader = styled.h1`
  font-size: 2.4rem;
  color: var(--color-grey-700);
  text-align: center;
  padding: 1.2rem;
  border-radius: 1.2rem;
  /* background: #029be34c; */
`;

// const StyledTable_1 = styled.div`
//   padding: 1rem;
//   border-radius: 8px;
//   background: var(--color-gray-300);

//   &:nth-child(even) {
//     background: var(--color-gray-200);
//   }
// `;

function MyStrategy() {
  return (
    <div>
      <Heading as="h4">Trading Plan</Heading>
      <StyledHeader>Risk management rules</StyledHeader>

      <Table columns="3fr 1fr">
        <Table.Body
          data={plan_A}
          render={(cur) => <StrategyRow strategy={cur} />}
        />
      </Table>

      <StyledHeader>Trading Sessions</StyledHeader>
      <Table columns="3fr 1fr">
        <Table.Body
          data={trading_session}
          render={(cur) => <StrategyRow strategy={cur} />}
        />
      </Table>
      <StyledHeader>Currency Pairs</StyledHeader>
      <h2>All major currency pairs only</h2>
      <StyledHeader>WithDrawal Plan</StyledHeader>
      <div>
        <h2>
          Withdrawals will be made once in every 2 weeks of profitable trading.
        </h2>
        <h2>
          50% of profits made within every two weeks of profitable trading must
          be withdrawn.
        </h2>
      </div>
    </div>
  );
}

export default MyStrategy;
