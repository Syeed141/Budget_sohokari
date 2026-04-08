"use client";

import {Card} from "@/components/ui/Card";
import type { MonthlyInsight } from "@/types/expense";

type Props = {
  insights: MonthlyInsight[];
};

export default function MonthlyInsights({ insights }: Props) {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Monthly Insights
        </h2>
        <p className="text-sm text-slate-500">
          Quick budgeting signals from your selected month.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {item.value}
            </p>
            {item.helperText ? (
              <p className="mt-1 text-xs text-slate-500">{item.helperText}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
