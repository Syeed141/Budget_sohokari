"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import MonthlyExpensesChart from "@/components/expenses/MonthlyExpensesChart";
import MonthlyDailyBreakdown from "@/components/expenses/MonthlyDailyBreakdown";
import MonthlyExpenseSummary from "@/components/expenses/MonthlyExpenseSummary";
import MonthlyInsights from "@/components/expenses/MonthlyInsights";
import type { MonthlyExpenseAnalytics } from "@/types/expense";

const MonthlyExpensesPdfDownloadButton = dynamic(
  () => import("@/components/expenses/MonthlyExpensesPdfDownloadButton"),
  {
    ssr: false,
  }
);

type MonthlyExpensesAnalyticsProps = {
  initialData?: MonthlyExpenseAnalytics | null;
  isDemo?: boolean;
};

export default function MonthlyExpensesAnalytics({
  initialData = null,
  isDemo = false,
}: MonthlyExpensesAnalyticsProps) {
  const now = new Date();
  const initialMonth = initialData?.month ?? now.getMonth() + 1;
  const initialYear = initialData?.year ?? now.getFullYear();

  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);
  const [data, setData] = useState<MonthlyExpenseAnalytics | null>(initialData);
  const [loading, setLoading] = useState(!initialData && !isDemo);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isDemo) {
      setData(initialData);
      setLoading(false);
      setError("");
      return;
    }

    let isMounted = true;

    async function fetchMonthlyAnalytics() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/expenses/monthly?month=${month}&year=${year}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to load monthly analytics");
        }

        if (isMounted) {
          setData(result.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading monthly analytics"
          );
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMonthlyAnalytics();

    return () => {
      isMounted = false;
    };
  }, [initialData, isDemo, month, year]);

  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: new Date(2000, index, 1).toLocaleString("en-BD", {
      month: "long",
    }),
  }));

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Monthly Expense Analytics
            </h2>
            <p className="text-sm text-slate-500">
              Review day-by-day spending patterns and budgeting signals for a full month.
            </p>
            {isDemo ? (
              <p className="mt-2 text-sm text-emerald-700">
                Demo analytics are shown for a sample month. Sign in to inspect your own data.
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                disabled={isDemo}
                className="min-w-[170px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-300 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                disabled={isDemo}
                className="min-w-[130px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-300 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>
          </div>
        </div>
      </Card>

      {loading ? (
        <Card className="p-6">
          <p className="text-sm text-slate-500">
            Loading monthly expense analytics...
          </p>
        </Card>
      ) : error ? (
        <Card className="p-6">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </Card>
      ) : data ? (
        <>
          <MonthlyExpenseSummary
            month={data.month}
            year={data.year}
            totalMonthlyExpense={data.totalMonthlyExpense}
            categoryTotals={data.categoryTotals}
          />

          <MonthlyInsights insights={data.insights} />

          <MonthlyExpensesChart data={data.chartData} />

          <MonthlyDailyBreakdown groups={data.dailyGroups} />

          <div className="flex flex-col items-end gap-2">
            {isDemo ? (
              <p className="text-sm text-slate-500">
                Download the sample PDF report from this preview.
              </p>
            ) : null}
            <MonthlyExpensesPdfDownloadButton data={data} />
          </div>
        </>
      ) : null}
    </div>
  );
}
