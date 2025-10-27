import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import AgentInput from "../../ui/AgentInput"; // reuse for inputs
import Option from "../../ui/Option";
import Button from "../../ui/Button";
import useUpdateTransaction from "./useUpdateTransactions";

function AddTransactionModal({ onCloseModal }) {
  const { addTransaction, isPending } = useUpdateTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addTransaction(data, { onSuccess: () => onCloseModal() });
  };

  return (
    <div className="flex flex-col gap-3">
      <Heading type="h2">Add New Transaction</Heading>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
        {/* Property Name */}
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

        {/* Transaction Type */}
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Transaction Type
          </label>
          <select
            {...register("type", { required: "Transaction type is required" })}
            disabled={isPending}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              errors.type
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-200 focus:ring-[var(--color-normal)]"
            }`}
          >
            <Option value="buy" label="Buy" />
            <Option value="rent" label="Rent" />
            <Option value="lease" label="Lease" />
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Customer */}
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

        {/* Amount */}
        <AgentInput
          name="amount"
          type="number"
          label="Amount (₦)"
          placeholder="Enter amount"
          register={register}
          validation={{
            required: "Amount is required",
            min: { value: 1, message: "Amount must be greater than 0" },
          }}
          error={errors.amount}
          disabled={isPending}
        />

        {/* Status */}
        <div>
          <label className="block text-sm text-neutral-700 mb-1">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            disabled={isPending}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              errors.status
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-200 focus:ring-[var(--color-normal)]"
            }`}
          >
            <Option value="pending" label="Pending" />
            <Option value="completed" label="Completed" />
            <Option value="cancelled" label="Cancelled" />
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Date */}
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
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Property Image
          </label>
          <input
            type="file"
            {...register("propertyImage")}
            accept="image/*"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isPending}
          />
          {errors.propertyImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.propertyImage.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCloseModal}
            className="px-5 py-2 rounded-lg text-sm font-medium border border-neutral-300 hover:bg-neutral-100 transition-all"
          >
            Cancel
          </button>
          <Button type="submit" disabled={isPending}>
            Add Transaction
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactionModal;
