import React from "react";

function PlainPage({ children }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      {children}
    </div>
  );
}

export default PlainPage;
