import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AgentInput from "../../ui/AgentInput";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import useEditProperty from "./useEditProperty";
import LoaderMini from "../../ui/LoaderMini";
import { useGeocode } from "../../hooks/useGeocode";

function EditProperty({ property, onCloseModal }) {
  const { editProperty, isPendingProperty } = useEditProperty();
  const { search, suggestions, loading: geocodingLoading } = useGeocode();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: property?.title || "",
      location: property?.location || "",
      latitude: property?.lat || "",
      longitude: property?.lng || "",
      price: property?.price || 0,
      status: property?.status || "Available",
      listedBy: property?.listedBy || "",
      date: property?.date || "", // ✅ Added date default value
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

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setValue("location", value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      search(value);
      setShowSuggestions(true);
    }, 500);
  };

  const locationRegister = register("location", { required: "Location is required" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
      <Heading type="h2">Edit Property</Heading>

      {/* Hidden inputs for geocoding coordinates */}
      <input type="hidden" {...register("latitude")} />
      <input type="hidden" {...register("longitude")} />

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

      {/* Location Address with Autocomplete Suggestions */}
      <div className="space-y-2 relative">
        <label htmlFor="location" className="block text-sm font-medium text-neutral-700">
          Location (Search Address)
        </label>
        <div className="relative">
          <input
            id="location"
            disabled={isPendingProperty}
            type="text"
            placeholder="Enter property location"
            className={`w-full px-4 py-2.5 text-neutral-700 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.location
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-200 focus:ring-[var(--color-normal)]"
            } ${isPendingProperty ? "bg-neutral-100 cursor-not-allowed" : "bg-white"}`}
            {...locationRegister}
            onChange={(e) => {
              locationRegister.onChange(e);
              handleLocationChange(e);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {geocodingLoading && (
            <div className="absolute right-3 top-3">
              <LoaderMini />
            </div>
          )}
        </div>

        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
        )}

        {/* Autocomplete suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-neutral-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="px-4 py-2.5 hover:bg-neutral-100 cursor-pointer text-sm text-neutral-700 transition-colors border-b border-neutral-100 last:border-0"
                onClick={() => {
                  setValue("location", suggestion.display_name);
                  setValue("latitude", suggestion.lat);
                  setValue("longitude", suggestion.lon);
                  setShowSuggestions(false);
                }}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

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
          {...register("status", { required: "Status is required" })}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-normal)] focus:ring-[var(--color-normal)]"
          disabled={isPendingProperty}
        >
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Pending">Pending</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
        )}
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

      {/* ✅ Date Listed */}
      <AgentInput
        name="date"
        type="text"
        label="Date Listed"
        placeholder="e.g. 24 Feb"
        register={register}
        validation={{ required: "Date is required" }}
        error={errors.date}
      />

      {/* Image Upload */}
      <div>
        <label className="text-sm font-medium text-neutral-600">
          Property Image
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-normal)] focus:ring-[var(--color-normal)]"
          disabled={isPendingProperty}
        />
        {errors.image && (
          <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-3">
        <Button
          type="button"
          variant="light"
          onClick={onCloseModal}
          disabled={isPendingProperty}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPendingProperty}>
          {isPendingProperty ? <LoaderMini /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default EditProperty;
