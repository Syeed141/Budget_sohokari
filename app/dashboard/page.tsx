import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/PageHeader";
import SummaryCard from "@/components/dashboard/SummaryCard";
import SavingsProgressCard from "@/components/dashboard/SavingsProgressCard";
import RecentExpensesCard from "@/components/dashboard/RecentExpensesCard";
import CategoryBreakdownCard from "@/components/dashboard/CategoryBreakdownCard";
import { getSessionFromCookies } from "@/components/lib/auth";
import {
  getDashboardData,
  getDemoDashboardData,
} from "@/components/lib/dashboard";

export default async function DashboardPage() {
  const session = await getSessionFromCookies();
  const isDemo = !session;
  const dashboardData = session
    ? await getDashboardData(session.userId)
    : getDemoDashboardData();

  const {
    user,
    totals,
    categoryBreakdown,
    recentExpenses,
  } = dashboardData;

  return (
    <main className="py-10">
      <Container>
        <PageHeader
          badgeText={isDemo ? "Demo dashboard" : "Monthly overview"}
          title={
            isDemo
              ? `See how ${user.name} tracks the month`
              : `Welcome back, ${user.name} !`
          }
          description={
            isDemo
              ? "This preview shows a realistic budget snapshot with monthly spending, remaining balance, savings progress, and category trends before sign in."
              : "Track your real monthly spending, remaining balance, savings progress, and category-wise trends."
          }
        />

        {isDemo ? (
          <section className="mb-8 rounded-3xl border border-emerald-200 bg-emerald-50/80 p-5 text-sm text-emerald-950 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="max-w-3xl leading-6">
                You are viewing a sample account. Sign in or create an account to
                replace this demo with your own live dashboard, expenses, and
                monthly insights.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Create account
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Your Monthly Income"
            value={`BDT ${totals.monthlyIncome}`}
          />
          <SummaryCard
            label="This Month's Expenses"
            value={`BDT ${totals.monthlyExpenses}`}
          />
          <SummaryCard
            label="Current Month's remaining Balance"
            value={`BDT ${totals.remainingBalance}`}
            emphasis={totals.remainingBalance < 0 ? "negative" : "default"}
          />
          <SummaryCard
            label="Safe Daily Spend"
            value={`BDT ${totals.safeDailySpend}`}
            emphasis={totals.safeDailySpend < 0 ? "negative" : "positive"}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CategoryBreakdownCard items={categoryBreakdown} />
          </div>

          <div>
            <SavingsProgressCard
              actualSavings={totals.actualSavings}
              savingsGoal={totals.savingsGoal}
              savingsProgressPercentage={totals.savingsProgressPercentage}
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <RecentExpensesCard items={recentExpenses} />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Monthly Planning Notes
            </h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Profession</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {user.profession || "Not set yet"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">City</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {user.city || "Not set yet"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-sm leading-6 text-slate-200">
                  {totals.remainingBalance >= 0
                    ? "You still have room to manage the rest of this month carefully. Use your safe daily spending number as a guide."
                    : "You are currently spending above your monthly income. Reduce non-essential spending and review your highest categories first."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
