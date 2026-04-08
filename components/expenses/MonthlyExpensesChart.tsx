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
  Legend,
} from "recharts";
import {Card} from "@/components/ui/Card";
import { formatBDT } from "@/components/lib/format";
import type { MonthlyChartRow } from "@/types/expense";

type Props = {
  data: MonthlyChartRow[];
};

const CATEGORY_CONFIG = [
  { key: "Food", color: "#ef4444" },
  { key: "Transport", color: "#f59e0b" },
  { key: "Rent", color: "#8b5cf6" },
  { key: "Internet", color: "#06b6d4" },
  { key: "Bills", color: "#3b82f6" },
  { key: "Shopping", color: "#ec4899" },
  { key: "Health", color: "#22c55e" },
  { key: "Education", color: "#14b8a6" },
  { key: "Entertainment", color: "#a855f7" },
  { key: "Other", color: "#64748b" },
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
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="mb-2 text-sm font-semibold text-slate-900">Day {label}</p>
      <p className="mb-3 text-sm text-slate-600">Total: {formatBDT(total)}</p>

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
                <span className="text-slate-700">{item.dataKey}</span>
              </div>
              <span className="font-medium text-slate-900">
                {formatBDT(Number(item.value))}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No expense recorded.</p>
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
    <Card className="p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Daily Monthly Expense Chart
          </h2>
          <p className="text-sm text-slate-500">
            Review daily totals and isolate spending by category.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Category Filter
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as FilterValue)}
            className="min-w-[180px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-300"
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

      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
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

