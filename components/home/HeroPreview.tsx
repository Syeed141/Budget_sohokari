"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/Card";

const weeklyExpenseData = [
  { day: "Mon", food: 130, transport: 70, bills: 40 },
  { day: "Tue", food: 210, transport: 90, bills: 60 },
  { day: "Wed", food: 160, transport: 85, bills: 45 },
  { day: "Thu", food: 310, transport: 130, bills: 85 },
  { day: "Fri", food: 240, transport: 110, bills: 70 },
  { day: "Sat", food: 280, transport: 120, bills: 75 },
  { day: "Sun", food: 150, transport: 80, bills: 55 },
];

type PreviewTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
};

function PreviewTooltip({ active, payload, label }: PreviewTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="typewriter-card rounded-[2px] p-3">
      <p className="typewriter-label text-[color:var(--secondary)]">Day {label}</p>
      <div className="mt-2 space-y-1.5 text-sm">
        {payload
          .filter((item) => Number(item.value) > 0)
          .map((item) => (
            <div key={item.dataKey} className="flex items-center justify-between gap-4">
              <span className="text-[color:var(--foreground)]">{item.dataKey}</span>
              <span className="font-semibold text-[color:var(--foreground)]">
                BDT {item.value}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function HeroPreview() {
  return (
    <Card className="border-[color:var(--border)]">
      <CardContent className="p-0">
        <div className="typewriter-grid border-b border-[color:var(--border-soft)] px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
            <div>
              <p className="typewriter-label text-[color:var(--secondary)]">
                Monthly financial overview
              </p>
              <h2 className="typewriter-display mt-3 text-xl text-[color:var(--foreground)] sm:text-2xl">
                Budget Sohokari
              </h2>
            </div>
            <p className="typewriter-label text-[color:var(--primary)]">Live sample</p>
          </div>
        </div>

        <div className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="typewriter-panel rounded-[2px] p-4">
              <p className="typewriter-label text-[color:var(--secondary)]">
                Monthly income
              </p>
              <p className="mt-2 text-xl font-bold text-[color:var(--foreground)] sm:text-2xl">
                BDT 25,000
              </p>
            </div>
            <div className="rounded-[2px] border border-[rgba(168,39,30,0.22)] bg-[rgba(168,39,30,0.08)] p-4">
              <p className="typewriter-label text-[color:var(--secondary)]">
                Safe daily spend
              </p>
              <p className="mt-2 text-xl font-bold text-[color:var(--primary)] sm:text-2xl">
                BDT 420
              </p>
            </div>
          </div>

          <div className="typewriter-panel rounded-[2px] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div>
                <p className="typewriter-display text-lg text-[color:var(--foreground)]">
                  Weekly spending pattern
                </p>
                <p className="mt-1 text-sm text-[color:var(--secondary)]">
                  A simple view of food, transport, and bills across one week.
                </p>
              </div>
              <p className="typewriter-label text-[color:var(--secondary)]">
                Category view
              </p>
            </div>

            <div className="mt-4 h-48 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyExpenseData} barGap={2}>
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
                  />
                  <Tooltip content={<PreviewTooltip />} />
                  <Bar dataKey="food" stackId="a" fill="#1A0F00" radius={[1, 1, 0, 0]} />
                  <Bar dataKey="transport" stackId="a" fill="#6B5B3E" />
                  <Bar dataKey="bills" stackId="a" fill="#A8271E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
