import React from "react";
import Heading from "../ui/Heading";
import Header from "../features/customers/Header";
import CustomersSearchBar from "../features/customers/CustomersSearchBar";
import ClientCount from "../features/dashboard/ClientCount";
import CustomersListTable from "../features/customers/CustomersListTable";
import { HiOutlineDownload } from "react-icons/hi";
import Button from "../ui/Button";

function Customers() {
  return (
    <section className="flex flex-col gap-6">
      <Header />
      <CustomersSearchBar />
      <CustomersListTable />
      <div>
        <Button variant="tertiary" Icon={HiOutlineDownload}>
          Export
        </Button>
      </div>
    </section>
  );
}

export default Customers;
