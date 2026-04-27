import HeroPreview from "@/components/home/HeroPreview";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const services = [
  {
    title: "Expense Tracking",
    text: "Log daily spending in categories like food, transport, rent, bills, and shopping.",
  },
  {
    title: "Safe Daily Budget",
    text: "See a clearer daily spending target based on your income, savings goal, and current month.",
  },
  {
    title: "Monthly Insights",
    text: "Understand top categories, spending patterns, and where your money is putting pressure on the month.",
  },
  {
    title: "Downloadable Reports",
    text: "Generate monthly expense summaries you can review or keep for later planning.",
  },
];

export default function HomePage() {
  return (
    <main className="pb-20">
      <section>
        <Container className="py-10 sm:py-16 lg:py-20">
          <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div className="animate-fade-up">
              <p className="typewriter-label text-[color:var(--secondary)]">
                Personal budgeting assistant
              </p>
              <h1 className="typewriter-display mt-4 max-w-3xl text-3xl leading-tight text-[color:var(--foreground)] sm:mt-5 sm:text-5xl lg:text-6xl">
                Track expenses, protect savings, and plan the month clearly.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--secondary)] sm:mt-5 sm:text-lg sm:leading-8">
                Budget Sohokari helps you record daily spending, understand your
                remaining balance, and follow a safer daily budget with less
                confusion.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/register" size="lg">
                  Create account
                </Button>
                <Button href="/dashboard" variant="ghost" size="lg">
                  View dashboard preview
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Expense tracking
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
                    Save daily transactions in a clean, readable structure.
                  </p>
                </div>
                <div className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Daily guidance
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
                    See how much you can safely spend before the month slips.
                  </p>
                </div>
                <div className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Monthly insight
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
                    Review category pressure, trends, and savings progress.
                  </p>
                </div>
              </div>
            </div>

            <HeroPreview />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-14 lg:py-16">
          <div className="max-w-2xl">
            <p className="typewriter-label text-[color:var(--secondary)]">
              Services
            </p>
            <h2 className="typewriter-display mt-4 text-2xl text-[color:var(--foreground)] sm:text-3xl">
              The main tools Budget Sohokari gives you
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--secondary)] sm:text-base">
              The app stays focused on a small set of services that help users
              manage day-to-day spending and understand the full month better.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-5 sm:p-6">
                  <p className="typewriter-label text-[color:var(--primary)]">
                    {service.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]">
                    {service.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
