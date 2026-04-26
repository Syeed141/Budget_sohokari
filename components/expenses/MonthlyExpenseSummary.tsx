"use client";

import {Card} from "@/components/ui/Card";
import { formatBDT, getMonthName } from "@/components/lib/format";
import type { CategoryTotal } from "@/types/expense";

type Props = {
  month: number;
  year: number;
  totalMonthlyExpense: number;
  categoryTotals: CategoryTotal[];
};

export default function MonthlyExpenseSummary({
  month,
  year,
  totalMonthlyExpense,
  categoryTotals,
}: Props) {
  const topCategories = categoryTotals.slice(0, 3);

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="typewriter-display text-lg text-[color:var(--foreground)]">
          {getMonthName(month)} {year} Summary
        </h2>
        <p className="text-sm text-[color:var(--secondary)]">
          Your expense overview for the selected month.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="typewriter-panel rounded-[2px] p-4">
          <p className="typewriter-label text-[color:var(--secondary)]">Total Spent</p>
          <p className="mt-2 text-xl font-semibold text-[color:var(--foreground)]">
            {formatBDT(totalMonthlyExpense)}
          </p>
        </div>

        {topCategories.map((item) => (
          <div
            key={item.category}
            className="typewriter-panel rounded-[2px] p-4"
          >
            <p className="typewriter-label text-[color:var(--secondary)]">{item.category}</p>
            <p className="mt-2 text-xl font-semibold text-[color:var(--foreground)]">
              {formatBDT(item.amount)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
