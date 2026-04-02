import PageHeader from "@/components/PageHeader";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <PageHeader
        title="Dashboard"
        description="See your income, expenses, remaining balance, and budget insights."
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Monthly Income</p>
          <h2 className="mt-2 text-2xl font-bold">৳ 25,000</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Total Expenses</p>
          <h2 className="mt-2 text-2xl font-bold">৳ 12,400</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Remaining Balance</p>
          <h2 className="mt-2 text-2xl font-bold">৳ 12,600</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Safe Daily Spend</p>
          <h2 className="mt-2 text-2xl font-bold">৳ 420</h2>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-lg font-semibold">Weekly Summary</h3>
          <p className="mt-3 text-sm text-slate-600">
            Later, this section will show a chart of your weekly spending.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-lg font-semibold">Top Spending Categories</h3>
          <p className="mt-3 text-sm text-slate-600">
            Later, this section will show category-wise expense breakdown.
          </p>
        </div>
      </section>
    </main>
  );
}