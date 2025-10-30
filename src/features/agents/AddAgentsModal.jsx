import React from "react";
import { HiX } from "react-icons/hi";
import Option from "../../ui/Option";
import Button from "../../ui/Button";
import AgentInput from "../../ui/AgentInput";
import Heading from "../../ui/Heading";
import { useForm } from "react-hook-form";
import useUpdateAgents from "./useUpdateAgents";

function AddAgentModal({ onCloseModal }) {
  const { updateAgents, isPending } = useUpdateAgents();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(rowData) {
    updateAgents(rowData);
    onCloseModal();
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Title */}
      <Heading type="h2">Add New Agent</Heading>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
        <AgentInput
          name="name"
          type="text"
          label="Full Name"
          placeholder="Enter agent name"
          register={register}
          validation={{ required: "Full name is required" }}
          error={errors.name}
          disabled={isPending}
        />

        <AgentInput
          disabled={isPending}
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
        />

        <AgentInput
          disabled={isPending}
          name="phone"
          type="tel"
          label="Phone"
          placeholder="+234 800 000 0000"
          register={register}
          validation={{
            required: "Phone number is required",
            pattern: {
              value: /^\+?\d{10,15}$/,
              message: "Invalid phone number format",
            },
          }}
          error={errors.phone}
        />

        {/* Status */}
        <div>
          <label className="block text-sm text-neutral-700 mb-1">Status</label>
          <select
            disabled={isPending}
            {...register("status", { required: "Status is required" })}
            className={`w-full px-4 py-2 rounded-lg border text-neutral-800 focus:outline-none focus:ring-2 transition-all ${
              errors.status
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-200 focus:ring-[var(--color-normal)]"
            }`}
          >
            <Option value="active" label="Active" />
            <Option value="inactive" label="Inactive" />
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="light">Cancel</Button>
          <Button type="submit">Add Agent</Button>
        </div>
      </form>
    </div>
  );
}

export default AddAgentModal;
