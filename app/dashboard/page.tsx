import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/PageHeader";
import SummaryCard from "@/components/dashboard/SummaryCard";
import SavingsProgressCard from "@/components/dashboard/SavingsProgressCard";
import RecentExpensesCard from "@/components/dashboard/RecentExpensesCard";
import CategoryBreakdownCard from "@/components/dashboard/CategoryBreakdownCard";
import { getSessionFromCookies } from "@/components/lib/auth";
import { getDashboardData } from "@/components/lib/dashboard";

export default async function DashboardPage() {
  const session = await getSessionFromCookies();

  if (!session) {
    redirect("/login");
  }

  const dashboardData = await getDashboardData(session.userId);

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
          badgeText="Monthly overview"
          title={`Welcome back, ${user.name} !`}
          description="Track your real monthly spending, remaining balance, savings progress, and category-wise trends."
        />

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Your Monthly Income"
            value={`৳ ${totals.monthlyIncome}`}
            // hint="From your profile settings"
          />
          <SummaryCard
            label="This Month's Expenses"
            value={`৳ ${totals.monthlyExpenses}`}
            // hint="Calculated from current month expense records"
          />
          <SummaryCard
            label="Current Month's remaining Balance"
            value={`৳ ${totals.remainingBalance}`}
            // hint="Income minus this month's spending"
            emphasis={totals.remainingBalance < 0 ? "negative" : "default"}
          />
          <SummaryCard
            label="Safe Daily Spend"
            value={`৳ ${totals.safeDailySpend}`}
            // hint="Estimated for the remaining days of this month"
            emphasis="positive"
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