import PageHeader from "@/components/PageHeader";

const sampleExpenses = [
  {
    id: 1,
    title: "Lunch",
    category: "Food",
    amount: 120,
    date: "2026-04-02",
  },
  {
    id: 2,
    title: "Bus Fare",
    category: "Transport",
    amount: 60,
    date: "2026-04-02",
  },
  {
    id: 3,
    title: "Internet Bill",
    category: "Utility",
    amount: 800,
    date: "2026-04-01",
  },
];

export default function ExpensesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <PageHeader
        title="Expenses"
        description="Add and review your daily and fixed expenses."
      />

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Recent Expenses</h2>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 pr-4 font-medium">Title</th>
                <th className="py-3 pr-4 font-medium">Category</th>
                <th className="py-3 pr-4 font-medium">Amount</th>
                <th className="py-3 pr-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {sampleExpenses.map((expense) => (
                <tr key={expense.id} className="border-b border-slate-100">
                  <td className="py-4 pr-4 font-medium text-slate-800">
                    {expense.title}
                  </td>
                  <td className="py-4 pr-4 text-slate-600">
                    {expense.category}
                  </td>
                  <td className="py-4 pr-4 text-slate-600">
                    ৳ {expense.amount}
                  </td>
                  <td className="py-4 pr-4 text-slate-600">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}