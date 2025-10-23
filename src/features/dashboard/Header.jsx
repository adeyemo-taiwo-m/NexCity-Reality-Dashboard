import { timeRangeOptions } from "../../assets/data";
import Heading from "../../ui/Heading";
import Filter from "../../ui/Filter";

function Header() {
  return (
    <header className="flex justify-between items-center flex-col tab:flex-row gap-2">
      <Heading>Dashboard</Heading>
      <Filter field={timeRangeOptions} />
    </header>
  );
}

export default Header;
