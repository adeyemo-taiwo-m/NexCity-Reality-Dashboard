import React from "react";
import { useForm } from "react-hook-form";
import AgentInput from "../../ui/AgentInput";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import useEditTransaction from "./useEditTransaction";
import LoaderMini from "../../ui/LoaderMini";

function EditTransaction({ transaction, onCloseModal }) {
  const { editTransaction, isPending } = useEditTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      property: transaction?.property || "",
      type: transaction?.type || "buy",
      customer: transaction?.customer || "",
      amount: transaction?.amount || 0,
      status: transaction?.status || "pending",
      date: transaction?.date || "",
    },
  });

  const onSubmit = (data) => {
    editTransaction(
      { transactionId: transaction.id, updatedData: data },
      { onSuccess: () => onCloseModal() }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
      <Heading type="h2">Edit Transaction</Heading>

      <AgentInput
        name="property"
        type="text"
        label="Property"
        placeholder="Enter property name"
        register={register}
        validation={{ required: "Property is required" }}
        error={errors.property}
        disabled={isPending}
      />

      <div>
        <label className="text-sm font-medium text-neutral-600">
          Transaction Type
        </label>
        <select
          {...register("type", { required: "Type is required" })}
          className="w-full text-neutral-600 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isPending}
        >
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
          <option value="lease">Lease</option>
        </select>
      </div>

      <AgentInput
        name="customer"
        type="text"
        label="Customer Name"
        placeholder="Enter customer name"
        register={register}
        validation={{ required: "Customer is required" }}
        error={errors.customer}
        disabled={isPending}
      />

      <AgentInput
        name="amount"
        type="number"
        label="Amount (₦)"
        placeholder="Enter amount"
        register={register}
        validation={{
          required: "Amount is required",
          min: { value: 0, message: "Amount cannot be negative" },
        }}
        error={errors.amount}
        disabled={isPending}
      />

      <div>
        <label className="text-sm font-medium text-neutral-600">Status</label>
        <select
          {...register("status", { required: "Status is required" })}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isPending}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <AgentInput
        name="date"
        type="date"
        label="Transaction Date"
        register={register}
        validation={{ required: "Date is required" }}
        error={errors.date}
        disabled={isPending}
      />

      {/* Property Image File Input */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-1">
          Property Image
        </label>
        <input
          type="file"
          {...register("propertyImage")}
          accept="image/*"
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-normal"
          disabled={isPending}
        />
      </div>

      <div className="flex justify-end gap-2 pt-3">
        <Button type="button" variant="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoaderMini /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default EditTransaction;
