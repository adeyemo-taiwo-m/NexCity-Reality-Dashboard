import supabase from "./supabase";

// Get all transactions with relational joins to fetch property titles, images, and customer names
export default async function getTransactions({
  filter,
  sortBy,
  searchQuery,
  typeFilterData,
} = {}) {
  let query = supabase
    .from("transactionDetails")
    .select("*, customersDetails(name), properties(title, image)");

  // Filter by payment_status if UI filters by status
  if (filter !== null && filter !== undefined) {
    let field = filter.field;
    let value = filter.value;
    if (field === "status") {
      field = "payment_status";
      value = value === "Completed" ? "paid" : (value === "Cancelled" ? "failed" : "pending");
    }
    query = query.eq(field, value);
  }

  if (typeFilterData !== null && typeFilterData !== undefined) {
    let field = typeFilterData.field;
    let value = typeFilterData.value;
    if (field === "status") {
      field = "payment_status";
      value = value === "Completed" ? "paid" : (value === "Cancelled" ? "failed" : "pending");
    }
    query = query.eq(field, value);
  }

  // Sort By (if sorting by database columns)
  if (sortBy && sortBy.sortField) {
    let sortField = sortBy.sortField;
    if (sortField !== "customer" && sortField !== "property") {
      if (sortField === "status") sortField = "payment_status";
      if (sortField === "date") sortField = "created_at";
      query = query.order(sortField, {
        ascending: sortBy.direction === "asc",
      });
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to load transactions");
  }

  // Map to flat object structure required by the UI table components
  let mappedData = data.map((txn) => {
    let uiStatus = "Pending";
    if (txn.payment_status === "paid") uiStatus = "Completed";
    else if (txn.payment_status === "pending") uiStatus = "Pending";
    else if (txn.payment_status === "failed") uiStatus = "Cancelled";

    return {
      id: txn.id,
      property: txn.properties?.title || "—",
      propertyImage: txn.properties?.image || "",
      type: txn.amount > 10000000 ? "Sale" : "Rent", // Fallback logic based on amount
      customer: txn.customersDetails?.name || "—",
      amount: txn.amount ? Number(txn.amount) : 0,
      status: uiStatus,
      date: txn.created_at
        ? new Date(txn.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
    };
  });

  // Search Filter in-memory for customer name (relational field)
  if (searchQuery && searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    mappedData = mappedData.filter(
      (txn) =>
        txn.customer.toLowerCase().includes(q) ||
        txn.property.toLowerCase().includes(q)
    );
  }

  // Sort in-memory for relational fields (customer or property)
  if (sortBy && sortBy.sortField) {
    const sortField = sortBy.sortField;
    if (sortField === "customer" || sortField === "property") {
      mappedData.sort((a, b) => {
        const valA = String(a[sortField]).toLowerCase();
        const valB = String(b[sortField]).toLowerCase();
        if (valA < valB) return sortBy.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortBy.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
  }

  return mappedData;
}

// Add a new transaction
export async function addTransaction(rowData) {
  try {
    // 1. Resolve Customer ID by name
    let customerId = null;
    if (rowData.customer) {
      const { data: customerData } = await supabase
        .from("customersDetails")
        .select("id")
        .eq("name", rowData.customer)
        .limit(1);
      if (customerData && customerData.length > 0) customerId = customerData[0].id;
    }

    // 2. Resolve Property ID by title
    let propertyId = null;
    if (rowData.property) {
      const { data: propertyData } = await supabase
        .from("properties")
        .select("id")
        .eq("title", rowData.property)
        .limit(1);
      if (propertyData && propertyData.length > 0) propertyId = propertyData[0].id;
    }

    // 3. Construct database payload
    const dbPayload = {
      customer_id: customerId,
      property_id: propertyId,
      amount: Number(rowData.amount),
      payment_status: rowData.status && rowData.status.toLowerCase() === "completed" ? "paid" : (rowData.status && rowData.status.toLowerCase() === "cancelled" ? "failed" : "pending"),
    };

    if (rowData.date) {
      dbPayload.created_at = new Date(rowData.date).toISOString();
    }

    const { data, error } = await supabase
      .from("transactionDetails")
      .insert([dbPayload])
      .select();

    if (error) {
      console.error("Error adding transaction:", error);
      throw new Error("Failed to add transaction");
    }

    return data;
  } catch (err) {
    console.error("addTransaction error:", err.message);
    throw new Error("Failed to add transaction: " + err.message);
  }
}

// Update an existing transaction
export async function editTransaction(transactionId, updatedData) {
  try {
    // 1. Resolve Customer ID by name
    let customerId = null;
    if (updatedData.customer) {
      const { data: customerData } = await supabase
        .from("customersDetails")
        .select("id")
        .eq("name", updatedData.customer)
        .limit(1);
      if (customerData && customerData.length > 0) customerId = customerData[0].id;
    }

    // 2. Resolve Property ID by title
    let propertyId = null;
    if (updatedData.property) {
      const { data: propertyData } = await supabase
        .from("properties")
        .select("id")
        .eq("title", updatedData.property)
        .limit(1);
      if (propertyData && propertyData.length > 0) propertyId = propertyData[0].id;
    }

    // 3. Construct database payload
    const dbPayload = {
      customer_id: customerId,
      property_id: propertyId,
      amount: Number(updatedData.amount),
      payment_status: updatedData.status && updatedData.status.toLowerCase() === "completed" ? "paid" : (updatedData.status && updatedData.status.toLowerCase() === "cancelled" ? "failed" : "pending"),
    };

    if (updatedData.date) {
      dbPayload.created_at = new Date(updatedData.date).toISOString();
    }

    const { data, error } = await supabase
      .from("transactionDetails")
      .update(dbPayload)
      .eq("id", transactionId)
      .select();

    if (error) {
      console.error("Error updating transaction:", error);
      throw new Error("Failed to update transaction");
    }

    return data;
  } catch (err) {
    console.error("editTransaction error:", err.message);
    throw new Error("Failed to update transaction: " + err.message);
  }
}

// Delete a transaction
export async function deleteTransaction(transactionId) {
  const { data, error } = await supabase
    .from("transactionDetails")
    .delete()
    .eq("id", transactionId)
    .select();

  if (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Failed to delete transaction");
  }

  return data;
}
