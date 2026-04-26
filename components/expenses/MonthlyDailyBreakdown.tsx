"use client";

import { Card } from "@/components/ui/Card";
import { formatBDT, formatShortDate } from "@/components/lib/format";
import type { DailyExpenseGroup } from "@/types/expense";

type Props = {
  groups: DailyExpenseGroup[];
};

export default function MonthlyDailyBreakdown({ groups }: Props) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="typewriter-display text-lg text-[color:var(--foreground)]">
          Daily Expense Details
        </h2>
        <p className="text-sm text-[color:var(--secondary)]">
          Full expense entries grouped day by day for the selected month.
        </p>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-[2px] border border-dashed border-[color:var(--border-soft)] p-8 text-center text-sm text-[color:var(--secondary)]">
          No expenses found for this month.
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div
              key={group.date}
              className="typewriter-panel rounded-[2px] p-4"
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-[color:var(--foreground)]">
                    {formatShortDate(group.date)}
                  </h3>
                  <p className="text-sm text-[color:var(--secondary)]">
                    {group.expenses.length} expense
                    {group.expenses.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="text-sm font-semibold text-[color:var(--foreground)]">
                  Total: {formatBDT(group.total)}
                </div>
              </div>

              <div className="space-y-3">
                {group.expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex flex-col gap-3 rounded-[2px] border border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.72)] px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-[color:var(--foreground)]">
                        {expense.title}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--secondary)]">
                        {expense.category}
                        {expense.isFixed ? " - Fixed" : " - Variable"}
                        {expense.note ? ` - ${expense.note}` : ""}
                      </p>
                    </div>

                    <div className="text-sm font-semibold text-[color:var(--foreground)]">
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
