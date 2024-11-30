// /* eslint-disable no-unused-vars */
// import styled from "styled-components";

import styled from "styled-components";
import { getStaysTodayActivity } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
// import Tag from "../../ui/Tag";
import TodayItem from "./TodayItem";

// import { useQuery } from "@tanstack/react-query";
// // import { getSettings } from "../../services/apiSettings";
// import Spinner from "../../ui/Spinner";
// import { getStaysTodayActivity } from "../../services/apiBookings";

// import Heading from "../../ui/Heading";
// import Row from "../../ui/Row";
// import styled from "styled-components";
// // import useTodayActivity from "./useTodayActivity";
// import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// const NoActivity = styled.p`
//   text-align: center;
//   font-size: 1.8rem;
//   font-weight: 500;
//   margin-top: 0.8rem;
// `;

// function TodayActivity() {
//   const { data, isLoading, error } = useQuery({
//     queryFn: getStaysTodayActivity,
//     queryKey: ["today-activities"],
//   });

//   if (isLoading) return <Spinner />;
//   if (error) return <p>Something went wrong</p>;

//   // return <NoActivity>There is no todays activity</NoActivity>;
//   return (
//     <StyledToday>
//       <Row type="horizontal">
//         <Heading as="h2">Today</Heading>
//       </Row>
//       {isLoading && <Spinner />}
//       {error && <p>Something went wrong. {error.message}</p>}
//       {!isLoading && !error && data.length > 0 && (
//         <TodayActivity>
//           {data.map((activity) => (
//             <TodayItem activity={activity} key={activity.id} />
//           ))}
//         </TodayActivity>
//       )}
//       {!isLoading && !error && data.length === 0 && (
//         <NoActivity>To activity for today... </NoActivity>
//       )}
//     </StyledToday>
//   );
// }

// export default TodayActivity;

function TodayActivity() {
  const { isLoading, data } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["test-data"],
  });

  if (isLoading) return <Spinner />;
  console.log(data);

  return (
    <StyledToday>
      {" "}
      <TodayList>
        {data.map((cur) => (
          <TodayItem key={cur.id} activity={cur} />
        ))}
      </TodayList>
    </StyledToday>
  );
}

export default TodayActivity;
