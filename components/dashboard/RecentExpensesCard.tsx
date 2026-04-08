import { Card, CardContent } from "@/components/ui/Card";

type RecentExpenseItem = {
  _id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
};

type RecentExpensesCardProps = {
  items: RecentExpenseItem[];
};

export default function RecentExpensesCard({
  items,
}: RecentExpensesCardProps) {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold text-slate-900">
          Recent Expenses
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Your latest saved transactions.
        </p>

        {items.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm text-slate-600">
              No expenses yet. Add your first expense to start tracking.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((expense) => (
              <div
                key={expense._id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200"
              >
                <div>
                  <p className="font-medium text-slate-900">{expense.title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {expense.category} - {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>

                <p className="font-semibold text-slate-900">BDT {expense.amount}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
