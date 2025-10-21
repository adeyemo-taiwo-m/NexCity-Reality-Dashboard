import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import Heading from "../../ui/Heading.jsx";
import DropdownBtn from "../../ui/DropdownBtn.jsx";
function PropertySnapShotHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
      <Heading type="h2">Property Snapshot</Heading>
      <div className="flex items-center gap-2">
        <DropdownBtn icon={<FaChevronDown />}>Recent Listed</DropdownBtn>
        <DropdownBtn type="darkBg" icon={<FaArrowRight />}>
          View all
        </DropdownBtn>
      </div>
    </div>
  );
}

export default PropertySnapShotHeader;
