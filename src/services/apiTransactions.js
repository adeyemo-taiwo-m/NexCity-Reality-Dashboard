import supabase from "./supabase";

export default async function getTransactions({
  filter,
  sortBy,
  searchQuery,
  typeFilterData,
} = {}) {
  console.log(searchQuery);
  let query = supabase.from("transactionDetails").select("*");

  // Filter
  if (filter !== null && filter !== undefined)
    query = query.eq(filter.field, filter.value);

  if (typeFilterData !== null && typeFilterData !== undefined)
    query = query.eq(typeFilterData.field, typeFilterData.value);

  // Sort By
  if (sortBy)
    query = query.order(sortBy.sortField, {
      ascending: sortBy.direction === "asc",
    });

  // Search (if applicable — adjust field name as needed)
  if (searchQuery && searchQuery.trim() !== "") {
    query = query.ilike("customer", `%${searchQuery.trim()}%`);
  }
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to load transactions");
  }

  return data;
}

export async function addTransaction(rowData) {
  const newData = { ...rowData, propertyImage: "" };
  const { data, error } = await supabase
    .from("transactionDetails")
    .insert([newData])
    .select();

  if (error) {
    console.error("Error adding transaction:", error);
    throw new Error("Failed to add transaction");
  }

  return data;
}

export async function editTransaction(transactionId, updatedData) {
  const newData = { ...updatedData, propertyImage: "" };
  const { data, error } = await supabase
    .from("transactionDetails")
    .update(newData)
    .eq("id", transactionId)
    .select();

  if (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction");
  }

  return data;
}

export async function deleteTransaction(transactionId) {
  const { data, error } = await supabase
    .from("transactionDetails")
    .delete()
    .eq("id", transactionId)
    .select();

  if (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Failed to delete transaction");
  }

  return data;
}
