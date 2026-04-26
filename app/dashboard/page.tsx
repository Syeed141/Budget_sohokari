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
              : `Welcome back, ${user.name}!`
          }
          description={
            isDemo
              ? "This preview shows a realistic budget snapshot with monthly spending, remaining balance, savings progress, and category trends before sign in."
              : "Track your real monthly spending, remaining balance, savings progress, and category-wise trends."
          }
        />

        {isDemo ? (
          <section className="typewriter-status mb-8 rounded-[2px] p-5 text-sm shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="max-w-3xl leading-6">
                You are viewing a sample account. Sign in or create an account to
                replace this demo with your own live dashboard, expenses, and
                monthly insights.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center border border-[color:var(--primary)] bg-[color:var(--primary)] px-4 py-2 font-semibold uppercase tracking-[0.04em] text-[color:var(--surface)] transition hover:bg-[color:var(--primary-hover)]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 font-semibold uppercase tracking-[0.04em] text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-muted)]"
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
            label="Current Month's Remaining Balance"
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

          <div className="typewriter-card rounded-[2px] p-6">
            <h3 className="typewriter-display text-lg text-[color:var(--foreground)]">
              Monthly Planning Notes
            </h3>

            <div className="mt-6 space-y-4">
              <div className="typewriter-panel rounded-[2px] p-4">
                <p className="typewriter-label text-[color:var(--secondary)]">Profession</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
                  {user.profession || "Not set yet"}
                </p>
              </div>

              <div className="typewriter-panel rounded-[2px] p-4">
                <p className="typewriter-label text-[color:var(--secondary)]">City</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
                  {user.city || "Not set yet"}
                </p>
              </div>

              <div className="rounded-[2px] border border-[rgba(168,39,30,0.22)] bg-[rgba(168,39,30,0.08)] p-5">
                <p className="text-sm leading-6 text-[color:var(--foreground)]">
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
