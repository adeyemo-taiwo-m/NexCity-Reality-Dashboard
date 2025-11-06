import React from "react";
import Button from "./Button";

function ErrorFallback() {
  return (
    <div className="min-w-screen h-screen flex justify-center items-center">
      <div className="text-center space-y-4">
        <p>Sorry, something went wrong. Please try again.</p>
        <Button onClick={() => window.location.reload()}>Reload App</Button>
      </div>
    </div>
  );
}

export default ErrorFallback;
