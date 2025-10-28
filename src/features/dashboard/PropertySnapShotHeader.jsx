import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import Heading from "../../ui/Heading.jsx";

import Button from "../../ui/Button.jsx";
import { useNavigate } from "react-router-dom";
function PropertySnapShotHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-4">
      <Heading type="h2">Property Snapshot</Heading>
      <div className="flex items-center gap-2">
        <Button onClick={() => navigate("/properties")}>View all</Button>
      </div>
    </div>
  );
}

export default PropertySnapShotHeader;
