import supabase from "./supabase";

// Get all customers
export default async function getCustomers({ filter, sortBy, searchQuery }) {
  let query = supabase.from("customersDetails").select("*");

  // Filter
  if (filter !== null) query = query.eq(filter.field, filter.value);

  // Sort By
  if (sortBy)
    query = query.order(sortBy.sortField, {
      ascending: sortBy.direction === "asc",
    });

  // Search Field
  if (searchQuery && searchQuery.trim() !== "") {
    query = query.ilike("name", `%${searchQuery.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to load customers");
  }

  return data;
}

// Add a new customer
export async function updateCustomer(rowData) {
  const { data, error } = await supabase
    .from("customersDetails")
    .insert([rowData])
    .select();

  if (error) {
    console.error("Error adding customer:", error);
    throw new Error("Failed to add customer");
  }

  return data;
}

// Delete a customer
export async function deleteCustomer(customerId) {
  const { data, error } = await supabase
    .from("customersDetails")
    .delete()
    .eq("id", customerId)
    .select();

  if (error) {
    console.error("Error deleting customer:", error);
    throw new Error("Failed to delete customer");
  }

  return data;
}

// Update a customer
export async function editCustomer(customerId, updatedData) {
  const { data, error } = await supabase
    .from("customersDetails")
    .update(updatedData)
    .eq("id", customerId)
    .select();

  if (error) {
    console.error("Error updating customer:", error);
    throw new Error("Failed to update customer");
  }

  return data;
}
