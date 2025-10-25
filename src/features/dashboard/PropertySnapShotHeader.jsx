import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import Heading from "../../ui/Heading.jsx";

import Button from "../../ui/Button.jsx";
function PropertySnapShotHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
      <Heading type="h2">Property Snapshot</Heading>
      <div className="flex items-center gap-2">
        <Button>View all</Button>
      </div>
    </div>
  );
}

export default PropertySnapShotHeader;
