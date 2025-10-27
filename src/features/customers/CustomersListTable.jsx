import React from "react";
import CustomerRow from "./CustomerRow";
import Pagination from "../../ui/Pagination";
import CustomerCards from "./CustomerCard";
import useCustomers from "./useCustomers";
import EmptyState from "../../ui/EmptyState";
import LoadingState from "../../ui/LoadingState";
import Button from "../../ui/Button";
import { HiOutlineDownload } from "react-icons/hi";
import { saveAs } from "file-saver";

function CustomersListTable() {
  const [page, setPage] = React.useState(1);
  const { customers, isPending } = useCustomers();
  console.log(isPending);
  // --- Loading State ---
  if (isPending) {
    return <LoadingState entityName="customers" />;
  }

  // --- Empty State ---
  if (!customers || customers.length === 0) {
    return <EmptyState entityName="customers" />;
  }

  // Download cusotmer list

  const handleExport = (customers) => {
    if (!customers || customers.length === 0) return;

    const headers = [
      "Name",
      "Email",
      "Property",
      "Deal Type",
      "Amount",
      "Status",
      "Activity",
    ];
    const rows = customers.map((c) => [
      c.name,
      c.email,
      c.interestedProperty,
      c.dealType,
      c.amount,
      c.status,
      c.activity,
    ]);

    const csvContent = [headers, ...rows]
      .map((e) => e.join(",")) // join columns
      .join("\n"); // join rows

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "customers.csv");
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        {/* ---- TABLE VIEW (laptop and up) ---- */}
        <div className="hidden lap:block overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-light text-neutral-700">
              <tr className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
                <th className="px-6 py-3 text-left whitespace-nowrap">
                  Customer
                </th>
                <th className="px-6 py-3 text-left whitespace-nowrap">Email</th>
                <th className="px-6 py-3 text-center whitespace-nowrap">
                  Property
                </th>
                <th className="px-6 py-3 text-center whitespace-nowrap">
                  Deal Type
                </th>
                <th className="px-6 py-3 text-center whitespace-nowrap">
                  Amount
                </th>
                <th className="px-6 py-3 text-center whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-left whitespace-nowrap">
                  Activity
                </th>
                <th className="px-6 py-3 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-200">
              {customers.map((customer, i) => (
                <CustomerRow key={i} {...customer} customerId={customer.id} />
              ))}
            </tbody>
          </table>
        </div>

        {/* ---- CARD VIEW (tablet & mobile) ---- */}
        <CustomerCards />

        <div className="border-t border-neutral-200">
          <Pagination
            currentPage={page}
            totalPages={3}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
      <div>
        <Button
          onClick={() => handleExport(customers)}
          variant="tertiary"
          Icon={HiOutlineDownload}
        >
          Export
        </Button>
      </div>
    </>
  );
}

export default CustomersListTable;
