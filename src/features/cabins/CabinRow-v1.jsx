/* eslint-disable react/prop-types */
import styled from "styled-components";

// icons
import { IoTrashOutline } from "react-icons/io5";
import { HiDuplicate } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";

import { formatCurrency } from "../../utils/helpers";
// import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  // const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice: price,
    discount,
  } = cabin;

  const { isCreating: isDuplicating, createCabin: duplicateCabin } =
    useCreateCabin();

  function handleDuplicate() {
    const newCabin = {
      image: cabin.image,
      name: `Copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      description: cabin.description,
    };
    duplicateCabin(newCabin);
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={handleDuplicate} disabled={isDuplicating}>
          <HiDuplicate />
        </button>
        {/* <button onClick={() => setShowForm(!showForm)}>
            <FiEdit />
          </button> */}
        <Modal>
          <Modal.Open opens="edit-cabin">
            <button>
              <FiEdit />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-cabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete-cabin">
            <button>
              <IoTrashOutline />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
              resourceName={name}
            />
          </Modal.Window>
        </Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiDuplicate />} onClick={handleDuplicate}>
              duplicate
            </Menus.Button>

            <Menus.Button icon={<FiEdit />}>edit</Menus.Button>
            <Menus.Button icon={<IoTrashOutline />}>delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
