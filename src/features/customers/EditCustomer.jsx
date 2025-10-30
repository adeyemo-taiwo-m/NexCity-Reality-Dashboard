import React from "react";
import { useForm } from "react-hook-form";
import AgentInput from "../../ui/AgentInput";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import useEditCustomer from "./useEditCustomer";

function EditCustomer({ customer, onCloseModal }) {
  const { editCustomer, isPendingCustomer } = useEditCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: customer?.name || "",
      email: customer?.email || "",
      interestedProperty: customer?.interestedProperty || "",
      dealType: customer?.dealType || "buy",
      amount: customer?.amount || 0,
      status: customer?.status || "Active",
      activity: customer?.activity || "",
    },
  });

  // ✅ Submit handler
  const onSubmit = (data) => {
    editCustomer(
      { customerId: customer.id, updatedData: data },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
      <Heading type={"h2"}>Edit Customer</Heading>

      {/* Full Name */}
      <AgentInput
        name="name"
        type="text"
        label="Full Name"
        placeholder="Enter full name"
        register={register}
        validation={{ required: "Name is required" }}
        error={errors.name}
      />

      {/* Email */}
      <AgentInput
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter email address"
        register={register}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Enter a valid email",
          },
        }}
        error={errors.email}
      />

      {/* Interested Property */}
      <AgentInput
        name="interestedProperty"
        type="text"
        label="Interested Property"
        placeholder="Enter property name"
        register={register}
        validation={{ required: "Property is required" }}
        error={errors.interestedProperty}
      />

      {/* Deal Type */}
      <div>
        <label className="text-sm font-medium text-neutral-600">
          Deal Type
        </label>
        <select
          {...register("dealType")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
          <option value="lease">Lease</option>
        </select>
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
          min: { value: 0, message: "Amount cannot be negative" },
        }}
        error={errors.amount}
      />

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-neutral-600">Status</label>
        <select
          {...register("status")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Activity */}
      <AgentInput
        name="activity"
        type="text"
        label="Recent Activity"
        placeholder="Enter recent activity"
        register={register}
        validation={{ required: "Activity is required" }}
        error={errors.activity}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCloseModal}
          disabled={isPendingCustomer}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPendingCustomer}>
          {isPendingCustomer ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default EditCustomer;
