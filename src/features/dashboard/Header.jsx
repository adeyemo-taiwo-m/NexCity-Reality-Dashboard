import Heading from "../../ui/Heading";
import Filter from "../../ui/Filter";

function Header() {
  const timeRangeOptions = [
    { value: 7, label: "Last 7 Days" },
    { value: 14, label: "Last 14 Days" },
    { value: 30, label: "Last 30 Days" },
  ];
  return (
    <header className="flex justify-between items-center  tab:flex-row gap-2">
      <Heading>Dashboard</Heading>
      <Filter field={"date"} options={timeRangeOptions} />
    </header>
  );
}

export default Header;
