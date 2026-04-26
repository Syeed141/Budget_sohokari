"use client";

import {Card} from "@/components/ui/Card";
import type { MonthlyInsight } from "@/types/expense";

type Props = {
  insights: MonthlyInsight[];
};

export default function MonthlyInsights({ insights }: Props) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="typewriter-display text-lg text-[color:var(--foreground)]">
          Monthly Insights
        </h2>
        <p className="text-sm text-[color:var(--secondary)]">
          Quick budgeting signals from your selected month.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((item) => (
          <div
            key={item.label}
            className="typewriter-panel rounded-[2px] p-4"
          >
            <p className="typewriter-label text-[color:var(--secondary)]">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
              {item.value}
            </p>
            {item.helperText ? (
              <p className="mt-1 text-xs text-[color:var(--secondary)]">{item.helperText}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
