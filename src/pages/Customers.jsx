import React from "react";
import Heading from "../ui/Heading";
import Header from "../features/customers/Header";
import CustomersSearchBar from "../features/customers/CustomersSearchBar";
import ClientCount from "../features/dashboard/ClientCount";
import CustomersListTable from "../features/customers/CustomersListTable";

function Customers() {
  return (
    <section className="flex flex-col gap-6">
      <Header />
      <CustomersSearchBar />
      <CustomersListTable />
    </section>
  );
}

export default Customers;
