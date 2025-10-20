import MainSIdeNav from "./MainSIdeNav";

function SideNavLap() {
  return (
    <aside className="hidden lap:block w-64 bg-white h-screen shadow-sm border-r border-gray-200 flex-shrink-0">
      <MainSIdeNav />
    </aside>
  );
}

export default SideNavLap;
