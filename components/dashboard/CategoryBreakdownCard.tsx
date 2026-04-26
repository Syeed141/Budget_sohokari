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
        <h3 className="typewriter-display text-lg text-[color:var(--foreground)]">
          Top Spending Categories
        </h3>
        <p className="mt-1 text-sm text-[color:var(--secondary)]">
          Based on this month&apos;s expenses.
        </p>

        {items.length === 0 ? (
          <div className="mt-6 rounded-[2px] border border-dashed border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.65)] p-8 text-center">
            <p className="text-sm text-[color:var(--secondary)]">
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
                    <span className="font-medium text-[color:var(--foreground)]">
                      {item.category}
                    </span>
                    <span className="text-[color:var(--secondary)]">BDT {item.total}</span>
                  </div>

                  <div className="h-3 rounded-full bg-[rgba(107,91,62,0.12)]">
                    <div
                      className="h-3 rounded-full bg-[color:var(--foreground)]"
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
