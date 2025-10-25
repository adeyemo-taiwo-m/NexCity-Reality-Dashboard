import supabase from "./supabase";

export default async function getAgents() {
  let { data, error } = await supabase.from("agents").select("*");
  if (error) {
    console.error("Error fetching agents:", error);
    throw new Error("Failed to lead agents");
  }

  return data;
}
