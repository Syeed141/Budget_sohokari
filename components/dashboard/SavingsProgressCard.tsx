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
        <h3 className="typewriter-display text-lg text-[color:var(--foreground)]">
          Savings Status
        </h3>
        <p className="mt-2 text-sm text-[color:var(--secondary)]">
          Compare your current monthly savings against your target.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="typewriter-label text-[color:var(--secondary)]">Goal progress</span>
              <span className="font-semibold text-[color:var(--foreground)]">
                {progressWidth}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-[rgba(107,91,62,0.12)]">
              <div
                className="h-3 rounded-full bg-[color:var(--primary)]"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>

          <div className="typewriter-panel rounded-[2px] p-4">
            <p className="typewriter-label text-[color:var(--secondary)]">Current Savings</p>
            <p className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
              BDT {actualSavings}
            </p>
          </div>

          <div className="typewriter-panel rounded-[2px] p-4">
            <p className="typewriter-label text-[color:var(--secondary)]">Savings Goal</p>
            <p className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
              BDT {savingsGoal}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
