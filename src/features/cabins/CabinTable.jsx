import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  // const {
  //   isLoading,
  //   data: cabins,
  //   error,
  // } = useQuery({
  //   queryKey: ["cabins"],
  //   queryFn: getCabins,
  // });

  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();
  const filterString = searchParams.get("discount") || "all";
  const sortString = searchParams.get("sortBy") || "created_at-asc";
  let filteredCabins;
  let sortedCabins;

  if (isLoading) return <Spinner />;
  if (error) return <p>Something went wrong! {error.message}</p>;

  // 1. FILTERING

  if (filterString === "all") filteredCabins = cabins;

  if (filterString === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterString === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // filteredCabins = [{price, discount, maxCapacity}]

  // 2. SORTING SENIOUR WAY
  const [field, direction] = sortString.split("-");
  const midifier = direction === "asc" ? 1 : -1;
  sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * midifier,
  );

  if (sortedCabins.length === 0) return <Empty resourceName="cabins" />;

  // 3. JUNIOUR WAY

  // if (sortString === "regularPrice-asc") {
  //   filteredCabins = filteredCabins.sort(
  //     (a, b) => a.regularPrice - b.regularPrice, // if it returns negative it will stay the same
  //   );
  // } else if (sortString === "regularPrice-desc") {
  //   filteredCabins = filteredCabins.sort(
  //     (a, b) => b.regularPrice - a.regularPrice, // if it returns positive a and b will be flipped
  //   );
  // } else if (sortString === "name-asc") {
  //   console.log(sortString === "name-asc");
  //   filteredCabins = filteredCabins.sort((a, b) => {
  //     if (a.name - b.name) return -1;
  //     if (!(a.name - b.name)) return 1;
  //     return 0;
  //   });
  // } else if (sortString === "name-desc") {
  //   filteredCabins = filteredCabins.sort((a, b) => {
  //     if (a.name - b.name) return 1;
  //     if (!(a.name - b.name)) return -1;
  //     return 0;
  //   });
  //   console.log(filteredCabins);
  // } else if (sortString === "maxCapacity-asc") {
  //   filteredCabins = filteredCabins.sort(
  //     (a, b) => a.maxCapacity - b.maxCapacity,
  //   );
  // } else if (sortString === "maxCapacity-desc") {
  //   filteredCabins = filteredCabins.sort(
  //     (a, b) => b.maxCapacity - a.maxCapacity,
  //   );
  // } else if (sortString === "discount-asc") {
  //   filteredCabins = filteredCabins.sort((a, b) => a.discount - b.discount);
  // } else if (sortString === "discount-desc") {
  //   filteredCabins = filteredCabins.sort((a, b) => b.discount - a.discount);
  // }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          data={sortedCabins || filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
