import supabase from "./supabase";

export default async function getSettings() {
  let { data, error } = await supabase.from("user_settings").select("*");
  if (error) {
    console.error("Error fetching settings:", error);
    throw new Error("Failed to lead settings");
  }

  return data;
}
