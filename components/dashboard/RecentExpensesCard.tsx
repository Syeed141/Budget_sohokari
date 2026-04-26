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
        <h3 className="typewriter-display text-lg text-[color:var(--foreground)]">
          Recent Expenses
        </h3>
        <p className="mt-1 text-sm text-[color:var(--secondary)]">
          Your latest saved transactions.
        </p>

        {items.length === 0 ? (
          <div className="mt-6 rounded-[2px] border border-dashed border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.65)] p-8 text-center">
            <p className="text-sm text-[color:var(--secondary)]">
              No expenses yet. Add your first expense to start tracking.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((expense) => (
              <div
                key={expense._id}
                className="typewriter-panel flex items-center justify-between rounded-[2px] px-4 py-4"
              >
                <div>
                  <p className="font-medium text-[color:var(--foreground)]">{expense.title}</p>
                  <p className="mt-1 text-sm text-[color:var(--secondary)]">
                    {expense.category} - {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>

                <p className="font-semibold text-[color:var(--foreground)]">BDT {expense.amount}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
