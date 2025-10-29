import React from "react";

function LoaderMini({ className }) {
  return (
    <div className="flex justify-center items-center my-2">
      <div
        className={`w-8 h-8 border-4 ${className}  border-normal border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export default LoaderMini;
