import supabase from "./supabase";

// Get all customers with relational joins to fetch transaction details and property names
export default async function getCustomers({ filter, sortBy, searchQuery }) {
  // Join transactionDetails and properties tables
  let query = supabase.from("customersDetails").select("*, transactionDetails(*, properties(*))");

  // Filter
  if (filter !== null && filter !== undefined) {
    let field = filter.field;
    if (field === "status") field = "lead_status";
    query = query.eq(field, filter.value);
  }

  // Sort By (if sorting by database columns)
  if (sortBy && sortBy.sortField) {
    let sortField = sortBy.sortField;
    if (sortField !== "amount") {
      if (sortField === "status") sortField = "lead_status";
      query = query.order(sortField, {
        ascending: sortBy.direction === "asc",
      });
    }
  }

  // Search Field
  if (searchQuery && searchQuery.trim() !== "") {
    query = query.ilike("name", `%${searchQuery.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to load customers");
  }

  // Map to flat object structure required by the UI table components
  let mappedData = data.map((customer) => {
    const txns = customer.transactionDetails || [];
    const latestTxn = txns[txns.length - 1]; // latest transaction
    const propertyTitle = latestTxn?.properties?.title || "—";

    let uiStatus = "Active";
    if (customer.lead_status === "closed") uiStatus = "Closed";
    else if (customer.lead_status === "contacted") uiStatus = "Active";
    else if (customer.lead_status === "new") uiStatus = "Pending";
    else if (customer.lead_status === "Cancelled") uiStatus = "Cancelled";

    let activityText = "Registered account.";
    if (customer.lead_status === "contacted") activityText = "Contacted client.";
    else if (customer.lead_status === "closed") activityText = "Deal finalized.";

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      interestedProperty: propertyTitle,
      dealType: latestTxn ? (Number(latestTxn.amount) > 10000000 ? "Purchase" : "Rent") : "Inquiry",
      amount: latestTxn?.amount ? Number(latestTxn.amount) : 0,
      status: uiStatus,
      activity: activityText,
    };
  });

  // Sort in-memory if sorting by amount (relational field)
  if (sortBy && sortBy.sortField === "amount") {
    mappedData.sort((a, b) => {
      return sortBy.direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
    });
  }

  return mappedData;
}

// Add a new customer
export async function updateCustomer(rowData) {
  const dbPayload = {
    name: rowData.name,
    email: rowData.email,
    phone: rowData.phone,
    lead_status: rowData.status && rowData.status.toLowerCase() === "closed" ? "closed" : (rowData.status && rowData.status.toLowerCase() === "cancelled" ? "Cancelled" : "contacted"),
  };

  const { data, error } = await supabase
    .from("customersDetails")
    .insert([dbPayload])
    .select();

  if (error) {
    console.error("Error adding customer:", error);
    throw new Error("Failed to add customer");
  }

  return data;
}

// Delete a customer
export async function deleteCustomer(customerId) {
  const { data, error } = await supabase
    .from("customersDetails")
    .delete()
    .eq("id", customerId)
    .select();

  if (error) {
    console.error("Error deleting customer:", error);
    throw new Error("Failed to delete customer");
  }

  return data;
}

// Update a customer
export async function editCustomer(customerId, updatedData) {
  const dbPayload = {
    name: updatedData.name,
    email: updatedData.email,
    phone: updatedData.phone,
    lead_status: updatedData.status && updatedData.status.toLowerCase() === "closed" ? "closed" : (updatedData.status && updatedData.status.toLowerCase() === "cancelled" ? "Cancelled" : "contacted"),
  };

  const { data, error } = await supabase
    .from("customersDetails")
    .update(dbPayload)
    .eq("id", customerId)
    .select();

  if (error) {
    console.error("Error updating customer:", error);
    throw new Error("Failed to update customer");
  }

  return data;
}
