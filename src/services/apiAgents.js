import supabase from "./supabase";

export default async function getAgents({ filter, sortBy, searchQuery }) {
  console.log(searchQuery);
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
  try {
    let imageUrl = null;

    //  1. Upload image if file exists
    if (rowData.avatarFile) {
      const file = rowData.avatarFile;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("agents")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("agents")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    //  3. Insert into database
    const { data, error } = await supabase
      .from("agents")
      .insert([
        {
          name: rowData.name,
          email: rowData.email,
          phone: rowData.phone,
          status: rowData.status,
          listed: rowData.propertiesListed || 0,
          closedDeals: rowData.closedDeals || 0,
          image: imageUrl || null, //  store uploaded image URL
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error adding agent:", error);
    throw new Error("Failed to add agent");
  }
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
  console.log(updatedData);
  try {
    let imageUrl = updatedData.image || null;

    //  1. Check if a new image file was uploaded
    if (updatedData.avatarFile) {
      const file = updatedData.avatarFile;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      // Upload new file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("agents")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      //  2. Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from("agents")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    //  3. Update the agent record
    const { data, error } = await supabase
      .from("agents")
      .update({
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        listed: updatedData.propertiesListed || 0,
        closedDeals: updatedData.closedDeals || 0,
        status: updatedData.status,
        image: imageUrl,
      })
      .eq("id", agentId)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error updating agent:", error);
    throw new Error("Failed to update agent");
  }
}
