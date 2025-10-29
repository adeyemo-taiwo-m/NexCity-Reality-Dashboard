import { parse } from "date-fns";

export const titleFont = "font-sans font-semibold";
export const formatCurrency = (amount) => {
  if (!amount) return "₦0";
  // Remove ₦ and commas if amount is already formatted
  const num = Number(String(amount).replace(/[₦,]/g, ""));
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(num);
};

export function getLastNDays(days) {
  const today = new Date();

  // Calculate the date N days ago
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  // Convert to ISO string for Supabase
  const pastDateISO = pastDate.toISOString();

  return pastDateISO;
}

export const parsePropertyDate = (dateString) => {
  try {
    return parse(dateString, "dd MMM", new Date());
  } catch {
    return new Date(); // fallback
  }
};
