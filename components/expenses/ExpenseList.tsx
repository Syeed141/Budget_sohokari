"use client";

import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { ExpenseRecord } from "@/types/expense";

export type ExpenseItem = ExpenseRecord;

type ExpenseListProps = {
  expenses: ExpenseItem[];
  onEdit: (expense: ExpenseItem) => void;
  onDelete: (expenseId: string) => Promise<void>;
  isDemo?: boolean;
};

export default function ExpenseList({
  expenses,
  onEdit,
  onDelete,
  isDemo = false,
}: ExpenseListProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="typewriter-display text-lg text-[color:var(--foreground)]">
              Recent Expenses
            </h2>
            <p className="mt-1 text-sm text-[color:var(--secondary)]">
              Review, edit, and remove your saved expenses.
            </p>
          </div>
        </div>

        {expenses.length === 0 ? (
          <div className="mt-6 rounded-[2px] border border-dashed border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.65)] p-8 text-center">
            <p className="text-sm text-[color:var(--secondary)]">
              No expenses yet. Add your first expense to start tracking.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-[700px] border-collapse text-left sm:min-w-full">
              <thead>
                <tr className="border-b border-[color:var(--border-soft)]">
                  <th className="typewriter-label py-3 pr-4 text-[color:var(--secondary)]">
                    Title
                  </th>
                  <th className="typewriter-label py-3 pr-4 text-[color:var(--secondary)]">
                    Category
                  </th>
                  <th className="typewriter-label py-3 pr-4 text-[color:var(--secondary)]">
                    Amount
                  </th>
                  <th className="typewriter-label py-3 pr-4 text-[color:var(--secondary)]">
                    Date
                  </th>
                  <th className="typewriter-label py-3 pr-4 text-[color:var(--secondary)]">
                    Type
                  </th>
                  <th className="typewriter-label py-3 pr-4 text-[color:var(--secondary)]">
                    {isDemo ? "Preview" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="border-b border-[color:var(--border-soft)]">
                    <td className="py-4 pr-4">
                      <div>
                        <p className="text-sm font-medium text-[color:var(--foreground)]">
                          {expense.title}
                        </p>
                        {expense.note ? (
                          <p className="mt-1 text-xs text-[color:var(--secondary)]">
                            {expense.note}
                          </p>
                        ) : null}
                      </div>
                    </td>

                    <td className="py-4 pr-4 text-sm text-[color:var(--secondary)]">
                      {expense.category}
                    </td>

                    <td className="py-4 pr-4 text-sm font-medium text-[color:var(--foreground)]">
                      BDT {expense.amount}
                    </td>

                    <td className="py-4 pr-4 text-sm text-[color:var(--secondary)]">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>

                    <td className="py-4 pr-4 text-sm text-[color:var(--secondary)]">
                      {expense.isFixed ? "Fixed" : "Variable"}
                    </td>

                    <td className="py-4 pr-4">
                      {isDemo ? (
                        <span className="typewriter-label inline-flex border border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.9)] px-3 py-1 text-[color:var(--secondary)]">
                          Demo only
                        </span>
                      ) : (
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => onEdit(expense)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => onDelete(expense._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
