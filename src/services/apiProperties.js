import supabase from "./supabase";

// Get all properties
// export default async function getProperties({
//   filter,
//   sortBy,
//   searchQuery,
//   typeFilterData,
// } = {}) {
//   let query = supabase.from("properties").select("*");

//   // Filter
//   if (filter !== null && filter?.field && filter?.value) {
//     query = query[filter.method](filter.field, filter.value);
//   }
//   // agent Filter
//   if (typeFilterData !== null && typeFilterData !== undefined)
//     query = query.eq(typeFilterData.field, typeFilterData.value);
//   // Sort By
//   if (sortBy && sortBy?.sortField) {
//     query = query.order(sortBy.sortField, {
//       ascending: sortBy.direction === "asc",
//     });
//   }

//   // Search Field
//   if (searchQuery && searchQuery.trim() !== "") {
//     query = query.ilike("title", `%${searchQuery.trim()}%`);
//   }

//   const { data, error } = await query;

//   if (error) {
//     console.error("Error fetching properties:", error);
//     throw new Error("Failed to load properties");
//   }

//   return data;
// }

export default async function getProperties({
  filter,
  sortBy,
  searchQuery,
  typeFilterData,
} = {}) {
  let query = supabase.from("properties").select("*");

  // Filter with method support
  if (filter && filter.field && filter.value && filter.method) {
    const { field, value, method } = filter;
    if (method === "eq") query = query.eq(field, value);
    else if (method === "gte") query = query.gte(field, value);
    else if (method === "lte") query = query.lte(field, value);
    else if (method === "ilike") query = query.ilike(field, value);
    // add more filters as needed
  }

  // Filter
  if (typeFilterData !== null && typeFilterData !== undefined)
    query = query.eq(typeFilterData.field, typeFilterData.value);
  // Sort By
  if (sortBy && sortBy.sortField) {
    query = query.order(sortBy.sortField, {
      ascending: sortBy.direction === "asc",
    });
  }

  // Search Query
  if (searchQuery && searchQuery.trim() !== "") {
    query = query.ilike("title", `%${searchQuery.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to load properties");
  }

  return data;
}

// Add a new property
export async function addProperty(propertyData) {
  const newData = { ...propertyData, image: "" };
  const { data, error } = await supabase
    .from("properties")
    .insert([newData])
    .select();

  if (error) {
    console.error("Error adding property:", error);
    throw new Error("Failed to add property");
  }

  return data;
}

// Delete a property
export async function deleteProperty(propertyId) {
  const { data, error } = await supabase
    .from("properties")
    .delete()
    .eq("id", propertyId)
    .select();

  if (error) {
    console.error("Error deleting property:", error);
    throw new Error("Failed to delete property");
  }

  return data;
}

// Update a property
export async function editProperty(propertyId, updatedData) {
  const { data, error } = await supabase
    .from("properties")
    .update(updatedData)
    .eq("id", propertyId)
    .select();

  if (error) {
    console.error("Error updating property:", error);
    throw new Error("Failed to update property");
  }

  return data;
}
