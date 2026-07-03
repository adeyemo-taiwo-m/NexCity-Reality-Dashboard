import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import AgentInput from "../../ui/AgentInput";
import Option from "../../ui/Option";
import Button from "../../ui/Button";
import useAddProperty from "./useAddProperty";
import { useGeocode } from "../../hooks/useGeocode";
import LoaderMini from "../../ui/LoaderMini";

function AddPropertiesModal({ onCloseModal }) {
  const { addProperty, isPending } = useAddProperty();
  const { search, suggestions, loading: geocodingLoading } = useGeocode();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function onSubmit(propertyData) {
    addProperty(propertyData, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

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
    <div className="flex flex-col gap-3">
      {/* Title */}
      <Heading type="h2">Add New Property</Heading>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-2"
        encType="multipart/form-data"
      >
        {/* Hidden inputs for geocoding coordinates */}
        <input type="hidden" {...register("latitude")} />
        <input type="hidden" {...register("longitude")} />

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

        {/* Location Address with Autocomplete Suggestions */}
        <div className="space-y-2 relative">
          <label htmlFor="location" className="block text-sm font-medium text-neutral-700">
            Location (Search Address)
          </label>
          <div className="relative">
            <input
              id="location"
              disabled={isPending}
              type="text"
              placeholder="e.g. Lekki Phase 1, Lagos"
              className={`w-full px-4 py-2.5 text-neutral-700 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.location
                  ? "border-red-500 focus:ring-red-400"
                  : "border-neutral-200 focus:ring-[var(--color-normal)]"
              } ${isPending ? "bg-neutral-100 cursor-not-allowed" : "bg-white"}`}
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
