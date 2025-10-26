import supabase from "./supabase";

export default async function getAgents({ filter, sortBy, searchQuery }) {
  let query = supabase.from("agents").select("*");

  // Filter
  if (filter !== null) query = query.eq(filter.field, filter.value);

  // Sort By
  if (sortBy)
    query = query.order(sortBy.sortField, {
      ascending: sortBy.direction === "asc",
    });

  // SearchField
  if (searchQuery && searchQuery.trim() !== "") {
    query = query.ilike("name", `%${searchQuery.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching agents:", error);
    throw new Error("Failed to load agents");
  }

  return data;
}

// Add a row
export async function updateAgents(rowData) {
  const { data, error } = await supabase
    .from("agents")
    .insert([rowData]) // insert the submitted row data
    .select();

  if (error) {
    console.error("Error adding agent:", error);
    throw new Error("Failed to add agent");
  }

  return data;
}

// Delete a row
export async function deleteAgent(agentId) {
  const { data, error } = await supabase
    .from("agents")
    .delete()
    .eq("id", agentId) // delete where id matches
    .select();

  if (error) {
    console.error("Error deleting agent:", error);
    throw new Error("Failed to delete agent");
  }

  return data;
}

// Update a row
export async function editAgent(agentId, updatedData) {
  const { data, error } = await supabase
    .from("agents")
    .update(updatedData) // update with new data
    .eq("id", agentId) // match the specific agent by id
    .select();

  if (error) {
    console.error("Error updating agent:", error);
    throw new Error("Failed to update agent");
  }

  return data;
}
