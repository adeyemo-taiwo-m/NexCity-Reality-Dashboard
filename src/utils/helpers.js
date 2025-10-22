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
