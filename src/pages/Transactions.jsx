import TransactionsSearchBar from "../features/transactions/TransactionsSearchBar";
import TransactionsListTable from "../features/transactions/TransactionsListTable";
import Header from "../features/transactions/Header";

function Transactions() {
  return (
    <section className="flex flex-col gap-6">
      <Header />
      <TransactionsSearchBar />
      <TransactionsListTable />
    </section>
  );
}

export default Transactions;
