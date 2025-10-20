import React from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

function LogoutBtn() {
  return (
    <div className="flex gap-2 items-center mx-2   text-gray-700 hover:bg-gray-100 p-2  rounded-md cursor-pointer">
      <span>{<HiArrowRightOnRectangle />}</span>
      Logout
    </div>
  );
}

export default LogoutBtn;
