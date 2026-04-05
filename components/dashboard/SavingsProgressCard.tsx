import { Card, CardContent } from "@/components/ui/Card";

type SavingsProgressCardProps = {
  actualSavings: number;
  savingsGoal: number;
  savingsProgressPercentage: number;
};

export default function SavingsProgressCard({
  actualSavings,
  savingsGoal,
  savingsProgressPercentage,
}: SavingsProgressCardProps) {
  const progressWidth = Math.min(Math.max(savingsProgressPercentage, 0), 100);

  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold text-slate-900">
          Savings Status
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Compare your current monthly savings against your target.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-500">Goal progress</span>
              <span className="font-semibold text-slate-900">
                {progressWidth}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-emerald-500"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Current Savings</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              ৳ {actualSavings}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Savings Goal</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              ৳ {savingsGoal}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}