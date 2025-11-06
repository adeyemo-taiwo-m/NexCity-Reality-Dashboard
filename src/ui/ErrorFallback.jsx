import React from "react";
import Button from "./Button";

function ErrorFallback() {
  return (
    <div>
      <p>Sorry, Something went wrong. Please try again.</p>
      <Button>Try again</Button>
    </div>
  );
}

export default ErrorFallback;
