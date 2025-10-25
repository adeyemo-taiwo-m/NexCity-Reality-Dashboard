import React from "react";

function RecentHouseMap() {
  return (
    <article
      className="flex flex-col flex-1 h-full  items-start p-4 bg-white rounded-lg shadow-sm overflow-hidden"
      aria-label="Recent properties map section"
    >
      <img
        src="/map.png"
        alt="Map showing recent property locations"
        className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-[1.02]"
      />
    </article>
  );
}

export default RecentHouseMap;
