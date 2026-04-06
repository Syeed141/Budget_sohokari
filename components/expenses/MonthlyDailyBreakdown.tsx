"use client";

import {Card} from "@/components/ui/Card";
import { formatBDT, formatShortDate } from "@/components/lib/format";
import type { DailyExpenseGroup } from "@/types/expense";

type Props = {
  groups: DailyExpenseGroup[];
};

export default function MonthlyDailyBreakdown({ groups }: Props) {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Daily Expense Details
        </h2>
        <p className="text-sm text-slate-500">
          Full expense entries grouped day by day for the selected month.
        </p>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
          No expenses found for this month.
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div
              key={group.date}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {formatShortDate(group.date)}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {group.expenses.length} expense
                    {group.expenses.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="text-sm font-semibold text-slate-900">
                  Total: {formatBDT(group.total)}
                </div>
              </div>

              <div className="space-y-3">
                {group.expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {expense.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {expense.category}
                        {expense.isFixed ? " • Fixed" : " • Variable"}
                        {expense.note ? ` • ${expense.note}` : ""}
                      </p>
                    </div>

                    <div className="text-sm font-semibold text-slate-900">
                      {formatBDT(expense.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}