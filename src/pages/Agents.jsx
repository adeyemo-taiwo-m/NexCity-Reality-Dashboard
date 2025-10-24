import { stats } from "../assets/data";
import AgentListTable from "../features/agents/AgentsListTable";
import AgentsSearchBar from "../features/agents/AgentsSearchBar";
import AgentStatsGrid from "../features/agents/AgentStatGrid";
import Header from "../features/agents/Header";
import StatCards from "../ui/StatCards";

function Agents() {
  return (
    <section className="flex flex-col gap-6">
      <Header />
      <AgentsSearchBar />
      {/* <AgentStatsGrid /> */}
      <StatCards statData={stats} />
      <AgentListTable />
    </section>
  );
}

export default Agents;
