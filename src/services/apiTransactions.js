import supabase, { supabaseUrl } from "./supabase";

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
  try {
    let imagePath = "";

    // 1. Check if an image file was provided
    if (rowData.propertyImage && rowData.propertyImage[0] instanceof File) {
      const imageFile = rowData.propertyImage[0];
      const imageName = `${Date.now()}-${imageFile.name}`;
      const filePath = `transactions/${imageName}`; // optional folder name

      // Upload image to Supabase Storage
      const { data: imageData, error: imageError } = await supabase.storage
        .from("user") // ⚠️ Replace 'user' with your actual bucket name
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) throw imageError;

      // Construct public URL for uploaded image
      imagePath = `${supabaseUrl}/storage/v1/object/public/user/${imageData.path}`;
      console.log(" Image uploaded successfully:", imagePath);
    }

    //  2. Prepare transaction data (attach image URL)
    const newData = {
      ...rowData,
      propertyImage: imagePath || "", // keep empty string if no image
    };

    // 3. Insert new transaction into database
    const { data, error } = await supabase
      .from("transactionDetails")
      .insert([newData])
      .select();

    if (error) {
      console.error(" Error adding transaction:", error);
      throw new Error("Failed to add transaction");
    }

    console.log(" Transaction added successfully:", data);
    return data;
  } catch (err) {
    console.error("addTransaction error:", err.message);
    throw new Error("Failed to add transaction: " + err.message);
  }
}

export async function editTransaction(transactionId, updatedData) {
  try {
    let imagePath = updatedData.propertyImage || ""; // keep existing one if no new file

    // 1. Check if a new image file was selected
    if (
      updatedData.propertyImage &&
      updatedData.propertyImage[0] instanceof File
    ) {
      const imageFile = updatedData.propertyImage[0];
      const imageName = `${Date.now()}-${imageFile.name}`;
      const filePath = `transactions/${imageName}`; // folder in bucket

      //  Upload new image to Supabase Storage
      const { data: imageData, error: imageError } = await supabase.storage
        .from("user") // ⚠️ Replace "user" with your actual bucket name
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) throw imageError;

      //  Construct public URL for uploaded image
      imagePath = `${supabaseUrl}/storage/v1/object/public/user/${imageData.path}`;
      console.log(" New image uploaded:", imagePath);
    }

    //  2. Update transaction record in DB
    const newData = {
      ...updatedData,
      propertyImage: imagePath || "",
    };

    const { data, error } = await supabase
      .from("transactionDetails")
      .update(newData)
      .eq("id", transactionId)
      .select();

    if (error) {
      console.error(" Error updating transaction:", error);
      throw new Error("Failed to update transaction");
    }

    console.log(" Transaction updated successfully:", data);
    return data;
  } catch (err) {
    console.error(" editTransaction error:", err.message);
    throw new Error("Failed to update transaction: " + err.message);
  }
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
