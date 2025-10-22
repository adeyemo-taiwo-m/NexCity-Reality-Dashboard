import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      {/* Title */}
      <Heading>Properties</Heading>
      <Button>Add Property</Button>
    </header>
  );
}

export default Header;
