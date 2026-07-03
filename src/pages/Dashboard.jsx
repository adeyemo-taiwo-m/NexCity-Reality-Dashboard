import PropertySnapShot from "../features/dashboard/PropertySnapShot";
import { PropertyPerformanceOverviewSection } from "../features/dashboard/PropertyPerformance";
import StatSection from "../features/dashboard/StatSection";
import Header from "../features/dashboard/Header";
import ClientCount from "../features/dashboard/ClientCount";
import RecentHouseMap from "../features/dashboard/RecentHouseMap";
import useCustomers from "../features/customers/useCustomers";
import { useSelector } from "react-redux";

function Dashboard() {
  const { customers } = useCustomers();
  const { customersDelta } = useSelector((state) => state.stats);
  const customerCount = (customers?.length || 0) + customersDelta;

  return (
    <section className="w-full min-h-screen  overflow-hidden">
      <div className="mx-auto flex flex-col gap-8 w-full ">
        <Header />
        {/* <StatCards statData={statsData} /> */}
        <StatSection />
        <div className="flex flex-col gap-6 lap:flex-row  ">
          <div className="flex  flex-col gap-6 w-full  overflow-hidden">
            <ClientCount count={customerCount} />
            <PropertySnapShot />
          </div>
          <div className="   w-full">
            <RecentHouseMap />
          </div>
        </div>
        <PropertyPerformanceOverviewSection />
      </div>
    </section>
  );
}
export default Dashboard;
