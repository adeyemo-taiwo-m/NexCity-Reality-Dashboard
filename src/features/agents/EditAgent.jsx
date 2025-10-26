import React from "react";
import { useForm } from "react-hook-form";
import AgentInput from "../../ui/AgentInput";
import Button from "../../ui/Button";
import useEditAgent from "./useEditAgent";
import Heading from "../../ui/Heading";

function EditAgent({ agent, onCloseModal }) {
  const { editAgent, isPending } = useEditAgent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: agent?.name || "",
      email: agent?.email || "",
      phone: agent?.phone || "",
      status: agent?.status || "Active",
    },
  });

  // ✅ Submit handler
  const onSubmit = (data) => {
    editAgent(
      { agentId: agent.id, updatedData: data },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
      <Heading type={"h2"}>Edit Agent</Heading>

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

      {/* Phone */}
      <AgentInput
        name="phone"
        type="text"
        label="Phone Number"
        placeholder="Enter phone number"
        register={register}
        validation={{
          required: "Phone number is required",
          minLength: {
            value: 10,
            message: "Must be at least 10 digits",
          },
        }}
        error={errors.phone}
      />
      <AgentInput
        name="listed"
        type="number"
        label="Properties Listed"
        placeholder="Enter number of properties"
        register={register}
        validation={{
          required: "This field is required",
          min: { value: 0, message: "Cannot be negative" },
        }}
        error={errors.propertiesListed}
      />

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
      />

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-gray-600">Status</label>
        <select
          {...register("status")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default EditAgent;
