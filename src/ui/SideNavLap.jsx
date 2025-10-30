import MainSIdeNav from "./MainSIdeNav";

function SideNavLap() {
  return (
    <aside className="hidden lap:block w-64 bg-white h-screen shadow-sm border-r border-neutral-400 flex-shrink-0">
      <MainSIdeNav />
    </aside>
  );
}

export default SideNavLap;
