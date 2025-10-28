import {
  HiOutlineBuildingOffice,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import useProperties from "./useProperties";
import StatCard from "../../ui/StatCard";
import LoaderMini from "../../ui/LoaderMini";
import { formatCurrency } from "../../utils/helpers";

function StatSection() {
  const { properties, isPending } = useProperties();

  const totalProperties = properties?.length > 0 ? properties?.length : 0;
  const revenue = properties
    ?.filter((property) => property.status.toLowerCase() === "sold")
    .reduce((acc, cur) => acc + cur.price, 0);

  const availableProperties = properties?.filter(
    (property) => property.status.toLowerCase() === "available"
  ).length;

  const soldProperties = properties?.filter(
    (property) => property.status === "sold"
  ).length;

  const soldPercentage = (soldProperties / availableProperties) * 100;
  const statsData = [
    {
      id: "total-properties",
      icon: <HiOutlineBuildingOffice className=" text-3xl" />,
      label: "Total Properties",
      value: totalProperties,
      color: "blue",
    },
    {
      id: "revenue",
      icon: <HiOutlineCurrencyDollar className="text-3xl" />,
      label: "Revenue",
      value: formatCurrency(revenue),
      color: "green",
    },
    {
      id: "available",
      icon: <HiOutlineCheckCircle className=" text-3xl" />,
      label: "Available Properties",
      value: availableProperties,
      color: "red",
    },
    {
      id: "Sold",
      icon: <HiOutlineHomeModern className=" text-3xl" />,
      label: "Percentage Sold",
      value: `${Math.ceil(soldPercentage)}%`,
      color: "indigo",
    },
  ];
  return (
    <div className="grid lap:grid-cols-4 tab:grid-cols-2 grid-cols-1 gap-2 tab:gap-4 lap:gap-6">
      {statsData.map((stat, i) => (
        <StatCard
          key={i}
          statData={{
            ...stat,
            value: isPending ? <LoaderMini /> : stat.value,
          }}
        />
      ))}
    </div>
  );
}

export default StatSection;
