import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import AgentInput from "../../ui/AgentInput";
import Option from "../../ui/Option";
import Button from "../../ui/Button";
import useUpdateCustomer from "./useUpdateCustomers";
import LoaderMini from "../../ui/LoaderMini";

function AddCustomerModal({ onCloseModal }) {
  const { updateCustomer, isPending } = useUpdateCustomer();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(rowData) {
    updateCustomer(rowData);
    onCloseModal();
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Title */}
      <Heading type="h2">Add New Customer</Heading>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
        {/* Full Name */}
        <AgentInput
          name="name"
          type="text"
          label="Full Name"
          placeholder="Enter full name"
          register={register}
          validation={{ required: "Full name is required" }}
          error={errors.name}
          disabled={isPending}
        />

        {/* Email */}
        <AgentInput
          name="email"
          type="email"
          label="Email"
          placeholder="example@email.com"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Invalid email format",
            },
          }}
          error={errors.email}
          disabled={isPending}
        />

        {/* Interested Property */}
        <AgentInput
          name="interestedProperty"
          type="text"
          label="Interested Property"
          placeholder="e.g. The Maple Haven"
          register={register}
          validation={{ required: "Property name is required" }}
          error={errors.interestedProperty}
          disabled={isPending}
        />

        {/* Deal Type */}
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Deal Type
          </label>
          <select
            disabled={isPending}
            {...register("dealType", { required: "Deal type is required" })}
            className={`w-full px-4 text-neutral-700 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              errors.dealType
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-200 focus:ring-[var(--color-normal)]"
            }`}
          >
            <Option value="buy" label="Buy" />
            <Option value="rent" label="Rent" />
            <Option value="lease" label="Lease" />
          </select>
          {errors.dealType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dealType.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <AgentInput
          name="amount"
          type="number"
          label="Amount (₦)"
          placeholder="Enter deal amount"
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
            disabled={isPending}
            {...register("status", { required: "Status is required" })}
            className={`w-full px-4 text-neutral-700 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              errors.status
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-200 focus:ring-[var(--color-normal)]"
            }`}
          >
            <Option value="active" label="Active" />
            <Option value="closed" label="Closed" />
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Activity */}
        <AgentInput
          name="activity"
          type="text"
          label="Recent Activity"
          placeholder="e.g. Booked a property tour"
          register={register}
          validation={{ required: "Activity is required" }}
          error={errors.activity}
          disabled={isPending}
        />

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
            {isPending ? <LoaderMini /> : "Add Customer"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomerModal;
