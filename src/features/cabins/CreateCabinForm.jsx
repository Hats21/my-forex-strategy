/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, setIsOpenModal }) {
  const { id: editId, ...otherValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? otherValues : {},
  });

  const { errors } = formState;

  const { createTrade, isCreating } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // if (isEditSession)
    //   editCabin(
    //     {
    //       newCabinData: { ...data, image },
    //       id: editId,
    //     },
    //     {
    //       onSuccess: (returnedData) => {
    //         console.log(returnedData);
    //         reset();
    //         setIsOpenModal?.(false);
    //       },
    //     },
    //   );
    // else
    createTrade(
      { ...data, image },
      {
        onSuccess: (returnedData) => {
          console.log(returnedData);
          reset();
          setIsOpenModal?.(false);
        },
      },
    );
  }

  function onError(errors) {
    console.error(errors);
  }

  const isWorking = isCreating || isEditing;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={setIsOpenModal ? "modal" : "regular"}
    >
      <FormRow label="Trade Number" error={errors.trade_no?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="trade_no"
          {...register("trade_no", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow label="Currency Pair" error={errors.symbol?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="symbol"
          {...register("symbol", {
            required: "This field is reqiured",
          })}
        />
      </FormRow>

      <FormRow label="Type" error={errors?.type?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="type"
          {...register("type", {
            required: "This field is reqiured",
          })}
        />
      </FormRow>

      <FormRow label="Lot size" error={errors?.lot_size?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="regularPrice"
          {...register("lot_size", {
            required: "This field is reqiured",
          })}
        />
      </FormRow>

      <FormRow label="Risk Ratio" error={errors?.risk_ratio?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="risk"
          defaultValue={3}
          {...register("risk_ratio", {
            required: "This field is reqiured",
          })}
        />
      </FormRow>
      <FormRow label="Status" error={errors?.status?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="status"
          {...register("status", {
            required: "This field is reqiured",
          })}
        />
      </FormRow>

      <FormRow
        label="Profit/lose amount"
        error={errors?.profit_lose_amount?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="profit_lose_amount"
          {...register("profit_lose_amount", {
            required: "This field is reqiured",
          })}
        />
      </FormRow>

      <FormRow
        label="Reason why you traded it "
        error={errors?.reason?.message}
      >
        <Textarea
          disabled={isWorking}
          type="text"
          id="reason"
          defaultValue=""
          {...register("reason", {
            required: "This field is reqiured",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is reqiured",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            setIsOpenModal?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} variation="primary">
          {" "}
          {isWorking ? (
            <SpinnerMini />
          ) : isEditSession ? (
            "Edit Cabin"
          ) : (
            "Create new cabin"
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
