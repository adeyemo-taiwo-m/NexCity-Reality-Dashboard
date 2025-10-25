import supabase from "./supabase";

export default async function getTransaction() {
  let { data, error } = await supabase.from("transactionDetails").select("*");
  if (error) {
    console.error("Error fetching transaction:", error);
    throw new Error("Failed to lead transaction");
  }

  return data;
}
