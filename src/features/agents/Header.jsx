import React from "react";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      {/* Title */}
      <Heading>Agents</Heading>
      <Button>Add Agent</Button>
    </header>
  );
}

export default Header;
