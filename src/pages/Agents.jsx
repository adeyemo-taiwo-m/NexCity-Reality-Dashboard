import AgentListTable from "../features/agents/AgentsListTable";
import AgentsSearchBar from "../features/agents/AgentsSearchBar";
import AgentStatsGrid from "../features/agents/AgentStatGrid";
import Header from "../features/agents/Header";

function Agents() {
  return (
    <section className="flex flex-col gap-6">
      <Header />
      <AgentsSearchBar />
      <AgentStatsGrid />
      <AgentListTable />
    </section>
  );
}

export default Agents;
