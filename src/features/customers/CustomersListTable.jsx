import React from "react";
import CustomerRow from "./CustomerRow";
import Pagination from "../../ui/Pagination";
import { customersDetails } from "../../assets/data";

function CustomersListTable() {
  const [page, setPage] = React.useState(1);

  return (
    <div className="bg-white min-w-[40rem] shadow-md rounded-2xl overflow-x-auto">
      <div className="overflow-x-auto w-full">
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
            {customersDetails.map((customer, i) => (
              <CustomerRow
                key={i}
                avatarUrl={customer.avatarUrl}
                name={customer.name}
                email={customer.email}
                interestedProperty={customer.interestedProperty}
                dealType={customer.dealType}
                amount={customer.amount}
                status={customer.status}
                activity={customer.activity}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-neutral-200">
        <Pagination
          currentPage={page}
          totalPages={3}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}

export default CustomersListTable;
