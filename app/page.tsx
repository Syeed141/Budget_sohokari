import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-4 rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
          BudgetMate Dhaka
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Smart budgeting for fresh graduates starting work in Dhaka
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Track your expenses, understand your monthly financial health, see how
          much you can safely spend per day, and get AI guidance based on your
          own budget context.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            View Demo Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Track Expenses</h2>
          <p className="mt-2 text-sm text-slate-600">
            Log food, rent, transport, and daily expenses in one place.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Budget Smarter</h2>
          <p className="mt-2 text-sm text-slate-600">
            Understand your weekly and monthly costs and see your safe daily
            spending amount.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Ask AI for Advice</h2>
          <p className="mt-2 text-sm text-slate-600">
            Get personalized suggestions based on your own income, savings, and
            spending habits.
          </p>
        </div>
      </section>
    </main>
  );
}