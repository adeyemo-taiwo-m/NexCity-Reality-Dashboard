import React from "react";
import { useForm } from "react-hook-form";
import AgentInput from "../../ui/AgentInput";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import LoaderMini from "../../ui/LoaderMini";
import useEditAgent from "./useEditAgent";

function EditAgent({ agent, onCloseModal }) {
  const { editAgent, isPending } = useEditAgent();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: agent?.name || "",
      email: agent?.email || "",
      phone: agent?.phone || "",
      propertiesListed: agent?.propertiesListed || 0,
      closedDeals: agent?.closedDeals || 0,
      status: agent?.status || "Active",
    },
  });

  const avatarFile = watch("avatarFile");

  // ✅ Submit handler
  const onSubmit = (data) => {
    console.log(data);
    const updatedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      propertiesListed: Number(data.propertiesListed),
      closedDeals: Number(data.closedDeals),
      status: data.status,
      avatarFile: data.avatarFile?.[0] || null, // pass file if selected
    };

    editAgent(
      { agentId: agent.id, updatedData },
      { onSuccess: () => onCloseModal() }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
      <Heading type="h2">Edit Agent</Heading>

      {/* Full Name */}
      <AgentInput
        name="name"
        type="text"
        label="Full Name"
        placeholder="Enter full name"
        register={register}
        validation={{ required: "Name is required" }}
        error={errors.name}
        disabled={isPending}
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
          pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
        }}
        error={errors.email}
        disabled={isPending}
      />

      {/* Phone */}
      <AgentInput
        name="phone"
        type="text"
        label="Phone Number"
        placeholder="Enter phone number"
        register={register}
        validation={{
          required: "Phone number is required",
          minLength: { value: 10, message: "Must be at least 10 digits" },
        }}
        error={errors.phone}
        disabled={isPending}
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
        <label className="block text-sm font-medium text-neutral-600 mb-1">
          Agent Avatar
        </label>
        <input
          type="file"
          {...register("avatarFile")}
          accept="image/*"
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-normal)]"
          disabled={isPending}
        />
        {avatarFile && avatarFile[0] && (
          <img
            src={URL.createObjectURL(avatarFile[0])}
            alt="Avatar Preview"
            className="mt-3 w-20 h-20 rounded-full object-cover border"
          />
        )}
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-neutral-600">Status</label>
        <select
          {...register("status", { required: "Status is required" })}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-normal)] focus:ring-[var(--color-normal)]"
          disabled={isPending}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCloseModal}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoaderMini /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default EditAgent;
