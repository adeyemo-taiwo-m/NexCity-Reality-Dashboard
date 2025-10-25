import supabase from "./supabase";

export default async function getProperties() {
  let { data, error } = await supabase.from("properties").select("*");
  if (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to lead properties");
  }

  return data;
}
