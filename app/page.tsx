import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

const featureCards = [
  {
    title: "Track every expense",
    description:
      "Record food, rent, transport, internet, and daily costs in a clean and simple way.",
  },
  {
    title: "Know your safe daily budget",
    description:
      "See how much you can safely spend today based on your salary, savings goal, and current month spending.",
  },
  {
    title: "Get AI guidance",
    description:
      "Ask practical money questions and receive personalized suggestions based on your own financial context.",
  },
];

export default function HomePage() {
  return (
    <main className="pb-20">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge>Built for early-career workers in Dhaka</Badge>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                A smarter way to survive and plan your month on a starting salary
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                BudgetMate Dhaka helps fresh graduates track expenses, understand
                monthly financial health, plan daily spending, and get AI-powered
                guidance based on their real income and spending habits.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/register" size="lg">
                  Create Account
                </Button>
                <Button href="/dashboard" variant="secondary" size="lg">
                  View Demo Dashboard
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
                <span>Expense tracking</span>
                <span>Daily budget insights</span>
                <span>Monthly analysis</span>
                <span>AI assistance</span>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="border-b border-slate-200 bg-white px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">
                      Monthly snapshot
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Example financial overview
                    </p>
                  </div>

                  <div className="grid gap-4 bg-slate-50 p-6 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                      <p className="text-sm text-slate-500">Monthly Income</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        ৳ 25,000
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                      <p className="text-sm text-slate-500">Total Expenses</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        ৳ 12,400
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                      <p className="text-sm text-slate-500">Remaining Balance</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        ৳ 12,600
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                      <p className="text-sm text-slate-500">Safe Daily Spend</p>
                      <p className="mt-2 text-2xl font-bold text-emerald-600">
                        ৳ 420
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Everything you need to build better money habits
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Designed for people who need clarity, not complicated finance tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Card key={feature.title}>
                <CardContent>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Card className="bg-slate-900 text-white">
            <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Start with a cleaner financial life
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Build awareness of your expenses, protect your savings, and make
                  better daily spending decisions.
                </p>
              </div>

              <div className="flex gap-3">
                <Button href="/register" variant="secondary" size="lg">
                  Get Started
                </Button>
                <Link
                  href="/login"
                  className="inline-flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </main>
  );
}