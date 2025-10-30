import React from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogoutUser from "../features/Authentication/useLogoutUser";

function LogoutBtn() {
  const { logout, isPending } = useLogoutUser();

  return (
    <button
      onClick={logout}
      disabled={isPending}
      className="flex gap-2 items-center mx-2 
        text-[var(--color-neutral-700)] 
        hover:bg-[var(--color-light)] 
        p-2 rounded-md cursor-pointer transition-colors duration-200 disabled:opacity-70"
    >
      <HiArrowRightOnRectangle className="w-5 h-5" />
      Logout
    </button>
  );
}

export default LogoutBtn;
