import { Card, CardContent } from "@/components/ui/Card";

type SpendingCalendarCell = {
  key: string;
  isoDate: string | null;
  dayNumber: number | null;
  total: number | null;
  isToday: boolean;
  intensity: number;
};

type SpendingCalendarCardProps = {
  monthLabel: string;
  weekdayLabels: string[];
  highestDailySpend: number;
  days: SpendingCalendarCell[];
};

function formatCompactBDT(amount: number) {
  if (amount <= 0) {
    return "";
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: amount >= 10000 ? 0 : 1,
  }).format(amount);
}

function formatCellSpend(amount: number) {
  if (amount >= 10000) {
    return `${Math.round(amount / 1000)}k`;
  }

  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return String(Math.round(amount));
}

export default function SpendingCalendarCard({
  monthLabel,
  weekdayLabels,
  highestDailySpend,
  days,
}: SpendingCalendarCardProps) {
  return (
    <Card>
      <CardContent>
        <h3 className="typewriter-display text-lg text-[color:var(--foreground)]">
          Daily Spend Calendar
        </h3>
        <p className="mt-1 text-sm text-[color:var(--secondary)]">
          {monthLabel} at a glance.
        </p>

        <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekdayLabels.map((label) => (
            <div
              key={label}
              className="typewriter-label text-center text-[9px] sm:text-[10px] text-[color:var(--secondary)]"
            >
              {label}
            </div>
          ))}

          {days.map((day) => {
            if (day.dayNumber === null) {
              return <div key={day.key} className="h-[4.25rem] sm:h-[4.75rem]" aria-hidden="true" />;
            }

            const hasSpend = (day.total || 0) > 0;
            const backgroundColor = hasSpend
              ? `rgba(168, 39, 30, ${0.08 + day.intensity * 0.3})`
              : "rgba(245, 234, 200, 0.55)";

            return (
              <div
                key={day.key}
                className={`min-w-0 rounded-[2px] border px-1.5 py-1.5 sm:p-2 ${
                  day.isToday
                    ? "border-[color:var(--primary)]"
                    : "border-[color:var(--border-soft)]"
                }`}
                style={{ backgroundColor }}
                title={
                  hasSpend && day.total
                    ? `${monthLabel} ${day.dayNumber}: BDT ${day.total}`
                    : `${monthLabel} ${day.dayNumber}: no spending`
                }
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-semibold text-[color:var(--foreground)] sm:text-xs">
                    {day.dayNumber}
                  </span>
                  {day.isToday ? (
                    <span
                      className="block h-1.5 w-1.5 rounded-full bg-[color:var(--primary)]"
                      aria-label="Today"
                    />
                  ) : null}
                </div>

                <div className="mt-2 min-h-7 sm:mt-3 sm:min-h-8">
                  {hasSpend && day.total ? (
                    <>
                      <p className="truncate text-[11px] font-semibold leading-none text-[color:var(--foreground)] sm:text-sm">
                        {formatCellSpend(day.total)}
                      </p>
                      <p className="mt-0.5 text-[8px] uppercase tracking-[0.04em] text-[color:var(--secondary)] sm:mt-1 sm:text-[10px]">
                        BDT
                      </p>
                    </>
                  ) : (
                    <p className="pt-1 text-center text-[11px] text-[color:var(--secondary)] sm:pt-2 sm:text-xs">-</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-[2px] border border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.65)] p-3">
          <p className="text-xs leading-6 text-[color:var(--secondary)]">
            Darker dates indicate higher spend. Highest single-day total this month:
            {" "}
            <span className="font-semibold text-[color:var(--foreground)]">
              BDT {highestDailySpend}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
