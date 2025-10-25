import supabase from "./supabase";

export default async function getCustomers() {
  let { data, error } = await supabase.from("customersDetails").select("*");
  if (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to lead customers");
  }

  return data;
}
