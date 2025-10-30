import React from "react";
import { useForm } from "react-hook-form";
import AgentInput from "../../ui/AgentInput";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import useEditProperty from "./useEditProperty"; // Custom hook similar to useEditCustomer

function EditProperty({ property, onCloseModal }) {
  const { editProperty, isPendingProperty } = useEditProperty();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: property?.title || "",
      location: property?.location || "",
      price: property?.price || 0,
      status: property?.status || "Available",
      listedBy: property?.listedBy || "",
      image: property?.image || "",
    },
  });

  const onSubmit = (data) => {
    editProperty(
      { propertyId: property.id, updatedData: data },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
      <Heading type="h2">Edit Property</Heading>

      {/* Title */}
      <AgentInput
        name="title"
        type="text"
        label="Property Title"
        placeholder="Enter property title"
        register={register}
        validation={{ required: "Title is required" }}
        error={errors.title}
      />

      {/* Location */}
      <AgentInput
        name="location"
        type="text"
        label="Location"
        placeholder="Enter property location"
        register={register}
        validation={{ required: "Location is required" }}
        error={errors.location}
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
          min: { value: 0, message: "Price cannot be negative" },
        }}
        error={errors.price}
      />

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-neutral-600">Status</label>
        <select
          {...register("status")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-normal focus:ring-normal"
        >
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Listed By */}
      <AgentInput
        name="listedBy"
        type="text"
        label="Listed By"
        placeholder="Enter agent name"
        register={register}
        validation={{ required: "Listed By is required" }}
        error={errors.listedBy}
      />

      {/* Image URL */}
      {/* Image Upload */}
      <div>
        <label className="text-sm font-medium text-neutral-600">
          Property Image
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.image && (
          <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCloseModal}
          disabled={isPendingProperty}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPendingProperty}>
          {isPendingProperty ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default EditProperty;
