import supabase, { supabaseUrl } from "./supabase";
import { parse } from "date-fns";

// Helper to format created_at date into "dd MMM" format (e.g., "12 Jun")
const formatDateToDM = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];
  return `${day} ${month}`;
};

export default async function getProperties({
  filter,
  sortBy,
  searchQuery,
  typeFilterData,
} = {}) {
  // Fetch properties and join the agents table to retrieve agent names
  let query = supabase.from("properties").select("*, agents(name)");

  // Filter with method support
  if (filter && filter.field && filter.value && filter.method) {
    let { field, value, method } = filter;
    if (field === "location") field = "address";
    if (field === "lat") field = "latitude";
    if (field === "lng") field = "longitude";
    if (field === "date") field = "created_at";

    if (method === "eq") query = query.eq(field, value);
    else if (method === "gte") query = query.gte(field, value);
    else if (method === "lte") query = query.lte(field, value);
    else if (method === "ilike") query = query.ilike(field, value);
  }

  // Filter by listedBy (Agent Name lookup to get UUID)
  if (typeFilterData && typeFilterData.field === "listedBy") {
    const { data: agentData } = await supabase
      .from("agents")
      .select("id")
      .eq("name", typeFilterData.value)
      .limit(1);
    if (agentData && agentData.length > 0) {
      query = query.eq("agent_id", agentData[0].id);
    } else {
      // Force empty if agent not found
      query = query.eq("agent_id", "00000000-0000-0000-0000-000000000000");
    }
  } else if (typeFilterData !== null && typeFilterData !== undefined) {
    let field = typeFilterData.field;
    if (field === "location") field = "address";
    if (field === "lat") field = "latitude";
    if (field === "lng") field = "longitude";
    if (field === "date") field = "created_at";
    query = query.eq(field, typeFilterData.value);
  }

  // Sort By
  if (sortBy && sortBy.sortField) {
    let sortField = sortBy.sortField;
    if (sortField === "location") sortField = "address";
    if (sortField === "lat") sortField = "latitude";
    if (sortField === "lng") sortField = "longitude";
    if (sortField === "date") sortField = "created_at";
    if (sortField === "listedBy") sortField = "agent_id";
    query = query.order(sortField, {
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

  // Map to flat object structure required by React components
  return data.map((prop) => ({
    ...prop,
    location: prop.address,
    lat: prop.latitude,
    lng: prop.longitude,
    listedBy: prop.agents?.name || "Unknown Agent",
    date: formatDateToDM(prop.created_at),
    status: prop.status && (prop.status.toLowerCase() === "sold" || prop.status.toLowerCase() === "sold out") ? "Sold Out" : "Available",
  }));
}

// Add a new property
export async function addProperty(propertyData) {
  let imagePath = "";
  const imageFileList = propertyData?.image;

  try {
    // 1. Upload image if it exists and is a File
    if (imageFileList && imageFileList[0] instanceof File) {
      const imageFile = imageFileList[0];
      const imageName = `${Date.now()}-${imageFile.name}`;
      const filePath = `properties/${imageName}`;

      const { data: imageData, error: imageError } = await supabase.storage
        .from("properties")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) throw imageError;
      imagePath = `${supabaseUrl}/storage/v1/object/public/properties/${imageData.path}`;
    }

    // 2. Resolve Agent UUID by matching agent name
    let agentId = null;
    if (propertyData.listedBy) {
      const { data: agentData } = await supabase
        .from("agents")
        .select("id")
        .eq("name", propertyData.listedBy)
        .limit(1);
      if (agentData && agentData.length > 0) agentId = agentData[0].id;
    }

    // 3. Construct payload matching the guide schema
    const dbPayload = {
      title: propertyData.title,
      price: Number(propertyData.price),
      address: propertyData.location,
      status: propertyData.status && (propertyData.status.toLowerCase() === "sold out" || propertyData.status.toLowerCase() === "sold") ? "sold" : "available",
      image: imagePath,
      agent_id: agentId,
      latitude: propertyData.latitude ? Number(propertyData.latitude) : null,
      longitude: propertyData.longitude ? Number(propertyData.longitude) : null,
    };

    if (propertyData.date) {
      try {
        const parsedDate = parse(propertyData.date, "dd MMM", new Date());
        if (isFinite(parsedDate.getTime())) {
          dbPayload.created_at = parsedDate.toISOString();
        }
      } catch {}
    }

    const { data, error } = await supabase
      .from("properties")
      .insert([dbPayload])
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error adding property:", err.message);
    throw new Error("Failed to add property: " + err.message);
  }
}

// Update a property
export async function editProperty(propertyId, updatedData) {
  let imagePath = updatedData.image || "";

  try {
    // 1. Upload new image if file is replaced
    if (updatedData.image && updatedData.image[0] instanceof File) {
      const imageFile = updatedData.image[0];
      const imageName = `${Date.now()}-${imageFile.name}`;
      const filePath = `properties/${imageName}`;

      const { data: imageData, error: imageError } = await supabase.storage
        .from("properties")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) throw imageError;
      imagePath = `${supabaseUrl}/storage/v1/object/public/properties/${imageData.path}`;
    }

    // 2. Resolve Agent UUID by matching agent name
    let agentId = null;
    if (updatedData.listedBy) {
      const { data: agentData } = await supabase
        .from("agents")
        .select("id")
        .eq("name", updatedData.listedBy)
        .limit(1);
      if (agentData && agentData.length > 0) agentId = agentData[0].id;
    }

    // 3. Construct update payload
    const dbPayload = {
      title: updatedData.title,
      price: Number(updatedData.price),
      address: updatedData.location,
      status: updatedData.status && (updatedData.status.toLowerCase() === "sold out" || updatedData.status.toLowerCase() === "sold") ? "sold" : "available",
      image: imagePath,
      agent_id: agentId,
      latitude: updatedData.latitude ? Number(updatedData.latitude) : null,
      longitude: updatedData.longitude ? Number(updatedData.longitude) : null,
    };

    if (updatedData.date) {
      try {
        const parsedDate = parse(updatedData.date, "dd MMM", new Date());
        if (isFinite(parsedDate.getTime())) {
          dbPayload.created_at = parsedDate.toISOString();
        }
      } catch {}
    }

    const { data, error } = await supabase
      .from("properties")
      .update(dbPayload)
      .eq("id", propertyId)
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error editing property:", err.message);
    throw new Error("Failed to update property: " + err.message);
  }
}

export async function deleteProperty(propertyId) {
  if (!propertyId) throw new Error("Property ID is required");

  const { data, error } = await supabase
    .from("properties")
    .delete()
    .eq("id", propertyId)
    .select();

  if (error) throw error;
  return data;
}

export async function markPropertyAsSold(propertyId) {
  if (!propertyId) throw new Error("Property ID is required");

  const { data, error } = await supabase
    .from("properties")
    .update({ status: "sold" })
    .eq("id", propertyId)
    .select();

  if (error) throw error;
  return data;
}
