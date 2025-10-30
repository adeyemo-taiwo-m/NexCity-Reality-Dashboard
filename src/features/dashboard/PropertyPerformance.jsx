import { FaChartLine } from "react-icons/fa";
import Heading from "../../ui/Heading";
import { useState } from "react";
import {
  eachDayOfInterval,
  format,
  parse,
  subDays,
  isSameDay,
  startOfDay,
} from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useProperties from "./useProperties";

export const PropertyPerformanceOverviewSection = () => {
  const { properties, isPending: isLoading } = useProperties();

  // MOCK DATA (remove when using real data)

  const [isDarkMode] = useState(false); // Toggle this!

  const parsePropertyDate = (dateString) => {
    try {
      return parse(dateString, "dd MMM", new Date());
    } catch (error) {
      console.warn("Invalid date:", dateString, error);
      return null;
    }
  };

  const thirtyDaysAgo = startOfDay(subDays(new Date(), 29));
  const now = startOfDay(new Date());

  const recentProperties = (properties || [])
    .map((prop) => ({
      ...prop,
      parsedDate: parsePropertyDate(prop.date),
    }))
    .filter(
      (prop) =>
        prop.parsedDate &&
        prop.parsedDate >= thirtyDaysAgo &&
        prop.parsedDate <= now
    );

  const allDates = eachDayOfInterval({ start: thirtyDaysAgo, end: now });

  const propertyChartData = allDates.map((date) => {
    const dailyTotal = recentProperties
      .filter((prop) => isSameDay(prop.parsedDate, date))
      .reduce((acc, cur) => acc + (cur.price || 0), 0);

    return {
      label: format(date, "MMM dd"),
      totalPrice: dailyTotal,
    };
  });

  // DESIGN TOKENS USING CSS VARIABLES
  const colors = isDarkMode
    ? {
        totalPrice: {
          stroke: "var(--color-dark)", // #04396e
          fill: "rgba(4, 57, 110, 0.3)", // Soft dark fill
        },
        text: "#e5e7eb", // Light gray
        grid: "#374151", // Dark gray
        background: "#111827", // Dark bg
        border: "#374151",
        sectionBg: "bg-[#111827]",
      }
    : {
        totalPrice: {
          stroke: "var(--color-normal)", // #054c93
          fill: "var(--color-light)", // #e5f6fb
        },
        text: "var(--color-neutral-700)", // #57595a
        grid: "var(--color-neutral-200)", // #eaeaea
        background: "var(--color-white)", // #ffffff
        border: "var(--color-neutral-300)", // #d2d3d3
        sectionBg: "bg-white",
      };

  return (
    <section
      data-testid="property-performance-section"
      className={`${colors.sectionBg} p-8 flex flex-col gap-8 rounded-xl shadow-sm transition-colors duration-200`}
    >
      <div className="flex items-center justify-between mb-4">
        <Heading type="h2">Property Revenue Overview</Heading>
        <div className="flex items-center gap-3">
          <FaChartLine
            className="text-xl"
            style={{ color: isDarkMode ? "#60a5fa" : "var(--color-normal)" }}
          />
        </div>
      </div>

      <div className="h-64 flex items-center justify-center text-sm rounded-md">
        {isLoading ? (
          <p className="text-center text-neutral-500">Loading data...</p>
        ) : recentProperties.length === 0 ? (
          <p className="text-center text-neutral-500">
            No properties listed in the last 30 days
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={240} key="chart">
            <AreaChart
              data={propertyChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis
                dataKey="label"
                tick={{ fill: colors.text, fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: colors.text, fontSize: 12 }}
                tickLine={false}
                domain={[0, (dataMax) => dataMax + 50000]}
                tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
                formatter={(value) =>
                  value > 0 ? `₦${value.toLocaleString()}` : "₦0"
                }
                labelStyle={{ color: colors.text, fontWeight: 500 }}
              />
              <Area
                type="monotone"
                dataKey="totalPrice"
                stroke={colors.totalPrice.stroke}
                strokeWidth={2.5}
                fillOpacity={0.7}
                fill={colors.totalPrice.fill}
                dot={{ fill: colors.totalPrice.stroke, r: 5 }}
                activeDot={{ r: 7, strokeWidth: 2 }}
                name="Total Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};
