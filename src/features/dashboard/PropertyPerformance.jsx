import { FaChartLine } from "react-icons/fa";
import Heading from "../../ui/Heading";

export const PropertyPerformanceOverviewSection = () => {
  return (
    <section className="bg-white p-8 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Heading type="h2">Property Performance Overview</Heading>
        <FaChartLine className="text-normal text-xl" />
      </div>

      <div className="h-48 flex items-center justify-center text-neutral-500 text-sm border border-dashed rounded-md">
        Chart visualization placeholder
      </div>
    </section>
  );
};
