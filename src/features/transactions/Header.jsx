import Heading from "../../ui/Heading";
import DropdownBtn from "../../ui/DropdownBtn";
import Filter from "../../ui/Filter";
import { statusRangeOptions } from "../../assets/data";

function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      <Heading>Transaction</Heading>
      <div className="flex gap-2">
        <span className="border-1 border-neutral-200 rounded-md">
          <DropdownBtn>Transaction Type</DropdownBtn>
        </span>
        <Filter field={statusRangeOptions} defaultValue="all" />
      </div>
    </header>
  );
}

export default Header;
