import { Card, CardContent } from "@/components/ui/Card";

type CategoryBreakdownItem = {
  category: string;
  total: number;
};

type CategoryBreakdownCardProps = {
  items: CategoryBreakdownItem[];
};

export default function CategoryBreakdownCard({
  items,
}: CategoryBreakdownCardProps) {
  const maxValue = items.length > 0 ? items[0].total : 0;

  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold text-slate-900">
          Top Spending Categories
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Based on this month&apos;s expenses.
        </p>

        {items.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm text-slate-600">
              No category data yet for this month.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((item) => {
              const width =
                maxValue > 0 ? Math.max((item.total / maxValue) * 100, 8) : 8;

              return (
                <div key={item.category}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.category}
                    </span>
                    <span className="text-slate-600">৳ {item.total}</span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-slate-900"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}