"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {Card} from "@/components/ui/Card";
import { formatBDT } from "@/components/lib/format";
import type { MonthlyChartRow } from "@/types/expense";

type Props = {
  data: MonthlyChartRow[];
};

const CATEGORY_CONFIG = [
  { key: "Food", color: "#1A0F00" },
  { key: "Transport", color: "#6B5B3E" },
  { key: "Rent", color: "#A8271E" },
  { key: "Internet", color: "#8A7653" },
  { key: "Bills", color: "#3E2E16" },
  { key: "Shopping", color: "#B9564A" },
  { key: "Health", color: "#7D2A20" },
  { key: "Education", color: "#9A8661" },
  { key: "Entertainment", color: "#533A18" },
  { key: "Other", color: "#6B5B3E" },
];

type FilterValue = "All" | (typeof CATEGORY_CONFIG)[number]["key"];

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const visibleItems = payload.filter((item) => Number(item.value) > 0);
  const total = visibleItems.reduce((sum, item) => sum + Number(item.value || 0), 0);

  return (
    <div className="typewriter-card rounded-[2px] p-4 shadow-xl">
      <p className="typewriter-label mb-2 text-[color:var(--secondary)]">Day {label}</p>
      <p className="mb-3 text-sm text-[color:var(--foreground)]">Total: {formatBDT(total)}</p>

      <div className="space-y-2">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <div
              key={item.dataKey}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[color:var(--foreground)]">{item.dataKey}</span>
              </div>
              <span className="font-medium text-[color:var(--foreground)]">
                {formatBDT(Number(item.value))}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-[color:var(--secondary)]">No expense recorded.</p>
        )}
      </div>
    </div>
  );
}

export default function MonthlyExpensesChart({ data }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>("All");

  const filteredData = useMemo(() => {
    if (selectedCategory === "All") {
      return data;
    }

    return data.map((row) => ({
      day: row.day,
      total: row.total,
      [selectedCategory]: row[selectedCategory] || 0,
    }));
  }, [data, selectedCategory]);

  const activeCategories =
    selectedCategory === "All"
      ? CATEGORY_CONFIG
      : CATEGORY_CONFIG.filter((item) => item.key === selectedCategory);

  return (
    <Card className="min-w-0 p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="typewriter-display text-lg text-[color:var(--foreground)]">
            Daily Monthly Expense Chart
          </h2>
          <p className="text-sm text-[color:var(--secondary)]">
            Review daily totals and isolate spending by category.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <label className="typewriter-label mb-1 block text-[color:var(--secondary)]">
            Category Filter
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as FilterValue)}
            className="w-full rounded-none border border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.92)] px-3 py-2 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--primary)] sm:min-w-[180px]"
          >
            <option value="All">All Categories</option>
            {CATEGORY_CONFIG.map((item) => (
              <option key={item.key} value={item.key}>
                {item.key}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[280px] w-full min-w-0 sm:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            <CartesianGrid
              strokeDasharray="2 4"
              vertical={false}
              stroke="rgba(107, 91, 62, 0.28)"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B5B3E", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B5B3E", fontSize: 11 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            {activeCategories.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                stackId="expenses"
                fill={item.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

