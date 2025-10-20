import {
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineBanknotes,
  HiOutlineCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { BsHouses } from "react-icons/bs";
import LogoutBtn from "./LogoutBtn";
import NavLinkItem from "./NavLinkItem";

function MainSIdeNav() {
  // Base classes for all links (shared styles)
  const baseClasses =
    "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-150 text-neutral-700";

  // Hover and Active classes (the specific styles you want)
  const activeHoverClasses = "bg-light text-neutral-600 ";

  // Function to determine the class string for NavLink
  // This is the standard way to handle NavLink classes in modern React Router
  const getNavLinkClasses = ({ isActive }) =>
    `${baseClasses} ${isActive ? activeHoverClasses : "hover:bg-neutral-100"}`;

  return (
    <div className=" p-4 flex flex-col  h-8/10 justify-between">
      <nav className=" flex flex-col gap-2">
        {/* Dashboard */}
        <NavLinkItem to="/" icon={<RxDashboard className="w-5 h-5" />}>
          <span>Dashboard</span>
        </NavLinkItem>

        {/* Properties */}
        <NavLinkItem
          to="/properties"
          className={getNavLinkClasses}
          icon={<BsHouses className="w-5 h-5" />}
        >
          <span>Properties</span>
        </NavLinkItem>

        {/* Agents */}
        <NavLinkItem
          to="/agents"
          className={getNavLinkClasses}
          icon={<HiOutlineUserGroup className="w-5 h-5" />}
        >
          <span>Agents</span>
        </NavLinkItem>

        {/* Customers */}
        <NavLinkItem
          to="/customers"
          className={getNavLinkClasses}
          icon={<HiOutlineUsers className="w-5 h-5" />}
        >
          <span>Customers</span>
        </NavLinkItem>

        {/* Transactions */}
        <NavLinkItem
          to="/transactions"
          className={getNavLinkClasses}
          icon={<HiOutlineBanknotes className="w-5 h-5" />}
        >
          <span>Transactions</span>
        </NavLinkItem>

        {/* Settings */}
        <NavLinkItem
          to="/settings"
          className={getNavLinkClasses}
          icon={<HiOutlineCog6Tooth className="w-5 h-5" />}
        >
          <span>Settings</span>
        </NavLinkItem>
      </nav>
      <LogoutBtn variant="tertiary" Icon={HiArrowRightOnRectangle}>
        Logout
      </LogoutBtn>{" "}
      {/* Logout */}
    </div>
  );
}

export default MainSIdeNav;
