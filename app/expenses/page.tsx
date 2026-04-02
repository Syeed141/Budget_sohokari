import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/PageHeader";

const sampleExpenses = [
  {
    id: 1,
    title: "Lunch",
    category: "Food",
    amount: "৳ 120",
    date: "2026-04-02",
  },
  {
    id: 2,
    title: "Bus Fare",
    category: "Transport",
    amount: "৳ 60",
    date: "2026-04-02",
  },
  {
    id: 3,
    title: "Internet Bill",
    category: "Utility",
    amount: "৳ 800",
    date: "2026-04-01",
  },
];

export default function ExpensesPage() {
  return (
    <main className="py-10">
      <Container>
        <PageHeader
          badgeText="Expense management"
          title="Expenses"
          description="Track daily spending and fixed monthly costs in one clean view."
        />

        <section className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-1">
            <CardContent>
              <h2 className="text-lg font-semibold text-slate-900">
                Add Expense
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Later this form will submit to your real backend.
              </p>

              <form className="mt-6 space-y-4">
                <Input label="Title" placeholder="Lunch" />
                <Input label="Amount" type="number" placeholder="120" />
                <Input label="Category" placeholder="Food" />
                <Input label="Date" type="date" />
                <Input label="Note" placeholder="Office lunch" />

                <Button className="w-full" size="lg">
                  Save Expense
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="xl:col-span-2">
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Recent Expenses
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review and later edit or delete saved items.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" size="sm">
                    Filter
                  </Button>
                  <Button variant="ghost" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                        Title
                      </th>
                      <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                        Category
                      </th>
                      <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                        Amount
                      </th>
                      <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleExpenses.map((expense) => (
                      <tr key={expense.id} className="border-b border-slate-100">
                        <td className="py-4 pr-4 text-sm font-medium text-slate-900">
                          {expense.title}
                        </td>
                        <td className="py-4 pr-4 text-sm text-slate-600">
                          {expense.category}
                        </td>
                        <td className="py-4 pr-4 text-sm text-slate-600">
                          {expense.amount}
                        </td>
                        <td className="py-4 pr-4 text-sm text-slate-600">
                          {expense.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}