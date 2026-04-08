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
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Expenses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review, edit, and remove your saved expenses.
            </p>
          </div>
        </div>

        {expenses.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm text-slate-600">
              No expenses yet. Add your first expense to start tracking.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Title
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Category
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Amount
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Date
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Type
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    {isDemo ? "Preview" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="border-b border-slate-100">
                    <td className="py-4 pr-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {expense.title}
                        </p>
                        {expense.note ? (
                          <p className="mt-1 text-xs text-slate-500">
                            {expense.note}
                          </p>
                        ) : null}
                      </div>
                    </td>

                    <td className="py-4 pr-4 text-sm text-slate-600">
                      {expense.category}
                    </td>

                    <td className="py-4 pr-4 text-sm font-medium text-slate-900">
                      BDT {expense.amount}
                    </td>

                    <td className="py-4 pr-4 text-sm text-slate-600">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>

                    <td className="py-4 pr-4 text-sm text-slate-600">
                      {expense.isFixed ? "Fixed" : "Variable"}
                    </td>

                    <td className="py-4 pr-4">
                      {isDemo ? (
                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          Demo only
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit(expense)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
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
