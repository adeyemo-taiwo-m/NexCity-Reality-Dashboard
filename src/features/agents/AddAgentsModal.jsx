import React, { useState } from "react";
import Option from "../../ui/Option";
import Button from "../../ui/Button";
import AgentInput from "../../ui/AgentInput";
import Heading from "../../ui/Heading";
import { useForm } from "react-hook-form";
import useUpdateAgents from "./useUpdateAgents";

function AddAgentModal({ onCloseModal }) {
  const { updateAgents, isPending } = useUpdateAgents();
  const [avatarFile, setAvatarFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(rowData) {
    const formData = {
      ...rowData,
      propertiesListed: Number(rowData.propertiesListed) || 0,
      closedDeals: Number(rowData.closedDeals) || 0,
    };

    // Attach file if uploaded
    if (avatarFile) formData.avatarFile = avatarFile;

    await updateAgents(formData);
    onCloseModal();
  }

  return (
    <div className="flex flex-col gap-3">
      <Heading type="h2">Add New Agent</Heading>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
        {/* Full Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Properties Listed */}
        <AgentInput
          name="propertiesListed"
          type="number"
          label="Properties Listed"
          placeholder="Enter number of properties"
          register={register}
          validation={{
            required: "This field is required",
            min: { value: 0, message: "Cannot be negative" },
          }}
          error={errors.propertiesListed}
          disabled={isPending}
        />

        {/* Closed Deals */}
        <AgentInput
          name="closedDeals"
          type="number"
          label="Closed Deals"
          placeholder="Enter number of closed deals"
          register={register}
          validation={{
            required: "This field is required",
            min: { value: 0, message: "Cannot be negative" },
          }}
          error={errors.closedDeals}
          disabled={isPending}
        />

        {/* Avatar Upload */}
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Agent Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            disabled={isPending}
            className="w-full text-sm border rounded-lg px-3 py-2 border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)]"
          />
        </div>

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
            <Option value="Active" label="Active" />
            <Option value="Inactive" label="Inactive" />
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="light"
            type="button"
            onClick={onCloseModal}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Agent"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddAgentModal;
