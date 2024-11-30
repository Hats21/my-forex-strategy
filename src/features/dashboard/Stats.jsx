/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { GoBriefcase } from "react-icons/go";
import { FaSackDollar } from "react-icons/fa6";
import { BsBuildingFillCheck } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
function Stats({ bookings, confirmedStays }) {
  const [searchParams] = useSearchParams();

  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => cur.totalPrice + acc, 0);
  const checkIns = confirmedStays.length;
  const occupations = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0,
  );

  const numDays = Number(searchParams.get("last")) || 7;

  const computedRate = Math.round((occupations / (numDays * 8)) * 100);

  console.log(numBookings);
  console.log(confirmedStays);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<GoBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<FaSackDollar />}
        value={formatCurrency(sales)}
      />{" "}
      <Stat
        title="Check ins"
        color="indigo"
        icon={<BsBuildingFillCheck />}
        value={checkIns}
      />{" "}
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<IoStatsChart />}
        value={`${computedRate} %`}
      />
    </>
  );
}

export default Stats;
