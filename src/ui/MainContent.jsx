import React from "react";

function MainContent({ children }) {
  return (
    <div className="flex flex-col flex-1 w-screen  lap:mt-0 h-full">
      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-4 lap:p-6">
        <div className="p-2 lap:p-4 text-base lg:text-lg font-semibold">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainContent;
