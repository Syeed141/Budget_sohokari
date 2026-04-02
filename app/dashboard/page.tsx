import Container from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/PageHeader";

const summaryCards = [
  { label: "Monthly Income", value: "৳ 25,000" },
  { label: "Total Expenses", value: "৳ 12,400" },
  { label: "Remaining Balance", value: "৳ 12,600" },
  { label: "Safe Daily Spend", value: "৳ 420" },
];

const recentActivity = [
  { title: "Lunch", category: "Food", amount: "৳ 120" },
  { title: "Bus Fare", category: "Transport", amount: "৳ 60" },
  { title: "Internet Bill", category: "Utility", amount: "৳ 800" },
];

export default function DashboardPage() {
  return (
    <main className="py-10">
      <Container>
        <PageHeader
          badgeText="Monthly overview"
          title="Dashboard"
          description="Track your spending health, monitor remaining balance, and understand how much you can safely spend each day."
        />

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.label}>
              <CardContent>
                <p className="text-sm text-slate-500">{card.label}</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {card.value}
                </h2>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Weekly Spending Trend
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    This area will later contain a real chart.
                  </p>
                </div>
              </div>

              <div className="mt-6 h-72 rounded-3xl border border-dashed border-slate-300 bg-slate-50" />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-slate-900">
                Savings Status
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                You are currently on track to save money this month.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Goal progress</span>
                    <span className="font-semibold text-slate-900">65%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div className="h-3 w-[65%] rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Savings Goal</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    ৳ 5,000
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-slate-900">
                Recent Expenses
              </h3>

              <div className="mt-5 space-y-4">
                {recentActivity.map((expense) => (
                  <div
                    key={`${expense.title}-${expense.amount}`}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{expense.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {expense.category}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-900">{expense.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-slate-900">
                AI Quick Advice
              </h3>

              <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-sm leading-6 text-slate-200">
                  Your food spending is slightly above your current monthly pace.
                  Try keeping daily food cost under <span className="font-semibold text-white">৳ 180</span> for the next week to stay on track.
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-sm leading-6 text-slate-600">
                  Later, this section will be connected to the real AI assistant.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}