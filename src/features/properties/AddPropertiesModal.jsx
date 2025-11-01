import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import AgentInput from "../../ui/AgentInput";
import Option from "../../ui/Option";
import Button from "../../ui/Button";
import useAddProperty from "./useAddProperty";

function AddPropertiesModal({ onCloseModal }) {
  const { addProperty, isPending } = useAddProperty();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(propertyData) {
    addProperty(propertyData, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Title */}
      <Heading type="h2">Add New Property</Heading>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-2"
        encType="multipart/form-data"
      >
        {/* Property Title */}
        <AgentInput
          name="title"
          type="text"
          label="Property Title"
          placeholder="e.g. Maple Grove Estate"
          register={register}
          validation={{ required: "Property title is required" }}
          error={errors.title}
          disabled={isPending}
        />

        {/* Location */}
        <AgentInput
          name="location"
          type="text"
          label="Location"
          placeholder="e.g. Lekki Phase 1, Lagos"
          register={register}
          validation={{ required: "Location is required" }}
          error={errors.location}
          disabled={isPending}
        />

        {/* Price */}
        <AgentInput
          name="price"
          type="number"
          label="Price (₦)"
          placeholder="Enter property price"
          register={register}
          validation={{
            required: "Price is required",
            min: { value: 1, message: "Price must be greater than 0" },
          }}
          error={errors.price}
          disabled={isPending}
        />

        {/* Status */}
        <div>
          <label className="block text-sm text-neutral-700 mb-1">Status</label>
          <select
            disabled={isPending}
            {...register("status", { required: "Status is required" })}
            className={`w-full text-neutral-700 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              errors.status
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-200 focus:ring-[var(--color-normal)]"
            }`}
          >
            <Option value="Available" label="Available" />
            <Option value="Sold Out" label="Sold Out" />
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Listed By */}
        <AgentInput
          name="listedBy"
          type="text"
          label="Listed By"
          placeholder="e.g. Adeyemo Taiwo M"
          register={register}
          validation={{ required: "Listed By field is required" }}
          error={errors.listedBy}
          disabled={isPending}
        />

        {/* Date */}
        <AgentInput
          name="date"
          type="text"
          label="Date Listed"
          placeholder="e.g. 24 Feb"
          register={register}
          validation={{ required: "Date is required" }}
          error={errors.date}
          disabled={isPending}
        />

        {/* Image File Upload */}
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Property Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image file is required" })}
            disabled={isPending}
            className={`w-full px-4 text-neutral-700 py-2 rounded-lg border file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--color-normal)] file:text-white focus:outline-none transition-all ${
              errors.image
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-200 focus:ring-[var(--color-normal)]"
            }`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="light" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            Add Property
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddPropertiesModal;
