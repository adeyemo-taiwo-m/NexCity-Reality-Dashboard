import supabase, { supabaseUrl } from "./supabase";

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

// const imageFile = profileImage.file;
//       const imageName = `${Date.now()}-${imageFile.name}`; // simpler & safer unique name
//       const filePath = `avatars/${imageName}`; // folder in bucket (optional but clean)

// Add a new property

export async function addProperty(propertyData) {
  let imagePath = "";
  const imageFileList = propertyData?.image;

  try {
    // ✅ 1. Upload image if it exists and is a File
    if (imageFileList && imageFileList[0] instanceof File) {
      const imageFile = imageFileList[0];
      const imageName = `${Date.now()}-${imageFile.name}`; // unique file name
      const filePath = `properties/${imageName}`; // folder inside your bucket (optional but cleaner)

      const { data: imageData, error: imageError } = await supabase.storage
        .from("properties") //  make sure this matches your actual bucket name
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) throw imageError;

      //  Construct the full public URL of the image
      imagePath = `${supabaseUrl}/storage/v1/object/public/properties/${imageData.path}`;
      console.log(" Uploaded image URL:", imagePath);
    } else {
      console.log("ℹ No image file selected or invalid file type");
    }

    // 2. Insert property data into table
    const newData = { ...propertyData, image: imagePath };

    const { data, error } = await supabase
      .from("properties")
      .insert([newData])
      .select();

    if (error) {
      console.error(" Error adding property:", error);
      throw new Error("Failed to add property");
    }

    console.log(" Property added successfully:", data);
    return data;
  } catch (err) {
    console.error("Error uploading or adding property:", err.message);
    throw new Error(
      "There was an error uploading or saving property: " + err.message
    );
  }
}

// Update a property

export async function editProperty(propertyId, updatedData) {
  let imagePath = updatedData.image || ""; // keep existing image if not replaced

  try {
    // 1. Check if a new image was uploaded (a File)
    if (updatedData.image && updatedData.image[0] instanceof File) {
      const imageFile = updatedData.image[0];
      const imageName = `${Date.now()}-${imageFile.name}`;
      const filePath = `properties/${imageName}`; // optional folder in your bucket

      //  Upload to Supabase Storage
      const { data: imageData, error: imageError } = await supabase.storage
        .from("user") //  change to your actual bucket name (e.g. 'properties')
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) throw imageError;

      //  Construct public image URL
      imagePath = `${supabaseUrl}/storage/v1/object/public/user/${imageData.path}`;
      console.log("Uploaded new property image:", imagePath);
    }

    // 2. Prepare the final data to update (replace image field with path)
    const finalData = { ...updatedData, image: imagePath };

    //  3. Update the property record in Supabase
    const { data, error } = await supabase
      .from("properties")
      .update(finalData)
      .eq("id", propertyId)
      .select();

    if (error) {
      console.error(" Error updating property:", error);
      throw new Error("Failed to update property");
    }

    console.log(" Property updated successfully:", data);
    return data;
  } catch (err) {
    console.error(" Error editing property:", err.message);
    throw new Error("There was an error updating property: " + err.message);
  }
}

export async function deleteProperty(propertyId) {
  if (!propertyId) throw new Error("Property ID is required");

  const { data, error } = await supabase
    .from("properties") // your table name
    .delete()
    .eq("id", propertyId)
    .select();

  if (error) {
    console.error("Error deleting property:", error);
    throw error;
  }

  return data;
}

export async function markPropertyAsSold(propertyId) {
  if (!propertyId) throw new Error("Property ID is required");

  const { data, error } = await supabase
    .from("properties") // replace with your actual table name if different
    .update({ status: "sold" })
    .eq("id", propertyId)
    .select();

  if (error) {
    console.error("Error updating property status:", error);
    throw error;
  }
  return data;
}
