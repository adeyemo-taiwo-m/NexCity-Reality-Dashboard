import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import StatCard from "../../ui/StatCard";
import LoaderMini from "../../ui/LoaderMini";
import useAgents from "./useAgents";

const AgentStatsGrid = () => {
  const { agents, isPending } = useAgents();

  const totalAgents = agents ? agents.length : 0;
  const activeAgents = agents
    ? agents.filter((agent) => agent.status === "active").length
    : 0;
  const inactiveAgents = agents
    ? agents.filter((agent) => agent.status === "inactive").length
    : 0;
  const closedDeals = agents
    ? agents.reduce((total, agent) => total + (agent.closedDeals || 0), 0)
    : 0;

  const stats = [
    {
      label: "Total Agents",
      value: totalAgents,
      icon: <HiOutlineUserGroup className="text-3xl" />,
      color: "blue",
    },
    {
      label: "Active Agents",
      value: activeAgents,
      icon: <HiOutlineUserGroup className="text-3xl" />,
      color: "green",
    },
    {
      label: "Inactive Agents",
      value: inactiveAgents,
      icon: <HiOutlineUserGroup className="text-3xl" />,
      color: "red",
    },
    {
      label: "Total Closed Deals",
      value: closedDeals,
      icon: <HiOutlineClipboardDocumentCheck className="text-3xl" />,
      color: "indigo",
    },
  ];

  return (
    <div className="grid lap:grid-cols-4  tab:grid-cols-2 grid-cols-1 gap-2 tab:gap-4 lap:gap-6">
      {stats.map((item, i) => (
        <StatCard
          key={i}
          statData={{
            ...item,
            value: isPending ? <LoaderMini /> : item.value,
          }}
        />
      ))}
    </div>
  );
};

export default AgentStatsGrid;
