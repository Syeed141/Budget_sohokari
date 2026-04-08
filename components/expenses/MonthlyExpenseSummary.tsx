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
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          {getMonthName(month)} {year} Summary
        </h2>
        <p className="text-sm text-slate-500">
          Your expense overview for the selected month.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Total Spent</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            {formatBDT(totalMonthlyExpense)}
          </p>
        </div>

        {topCategories.map((item) => (
          <div
            key={item.category}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <p className="text-sm text-slate-500">{item.category}</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {formatBDT(item.amount)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
