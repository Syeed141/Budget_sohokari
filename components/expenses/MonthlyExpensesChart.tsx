"use client";

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
  { key: "Food", color: "#0f172a" },
  { key: "Transport", color: "#334155" },
  { key: "Rent", color: "#475569" },
  { key: "Bills", color: "#64748b" },
  { key: "Shopping", color: "#94a3b8" },
  { key: "Health", color: "#cbd5e1" },
  { key: "Education", color: "#a8b4c7" },
  { key: "Entertainment", color: "#7c8ba1" },
  { key: "Other", color: "#dbe4ee" },
];

export default function MonthlyExpensesChart({ data }: Props) {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Daily Monthly Expense Chart
        </h2>
        <p className="text-sm text-slate-500">
          Each bar represents a day. Stacked sections show spending by category.
        </p>
      </div>

      <div className="h-95 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              formatter={(value: number) => formatBDT(value)}
              labelFormatter={(label) => `Day ${label}`}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              }}
            />
            <Legend />
            {CATEGORY_CONFIG.map((item) => (
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