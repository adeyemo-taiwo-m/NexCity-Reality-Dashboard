import React, { useState } from "react";

function Logo() {
  const [isDarkMode] = useState(false);

  return (
    <img
      className="h-8 lap:h-10"
      src={`/logo-${isDarkMode ? "dark" : "white"}.svg`}
      alt="NexCity Logo"
    />
  );
}

export default Logo;
