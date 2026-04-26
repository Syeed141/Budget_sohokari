"use client";

import { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

const weeklyExpenseData = [
  { day: "Mon", food: 130, transport: 70, bills: 40 },
  { day: "Tue", food: 210, transport: 90, bills: 60 },
  { day: "Wed", food: 160, transport: 85, bills: 45 },
  { day: "Thu", food: 310, transport: 130, bills: 85 },
  { day: "Fri", food: 240, transport: 110, bills: 70 },
  { day: "Sat", food: 280, transport: 120, bills: 75 },
  { day: "Sun", food: 150, transport: 80, bills: 55 },
];

const principles = [
  {
    title: "Clarity",
    text: "See income, expenses, and remaining balance without decorative clutter getting in the way.",
  },
  {
    title: "Control",
    text: "Track spending as it happens and keep your daily budget decisions tied to the real month.",
  },
  {
    title: "Confidence",
    text: "Use monthly insights and safe daily spending guidance to make steadier financial choices.",
  },
];

const steps = [
  "Set your monthly income and savings target.",
  "Record each expense as it happens.",
  "Watch the safe daily spend update with the month.",
  "Review monthly patterns and category pressure points.",
];

type PreviewTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
};

function PreviewTooltip({ active, payload, label }: PreviewTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="typewriter-card rounded-[2px] p-3">
      <p className="typewriter-label text-[color:var(--secondary)]">Day {label}</p>
      <div className="mt-2 space-y-1.5 text-sm">
        {payload
          .filter((item) => Number(item.value) > 0)
          .map((item) => (
            <div key={item.dataKey} className="flex items-center justify-between gap-4">
              <span className="text-[color:var(--foreground)]">{item.dataKey}</span>
              <span className="font-semibold text-[color:var(--foreground)]">
                BDT {item.value}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

function HeroPreview() {
  return (
    <Card className="animate-fade-up border-[color:var(--border)]">
      <CardContent className="p-0">
        <div className="typewriter-grid border-b border-[color:var(--border-soft)] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="typewriter-label text-[color:var(--secondary)]">
                Monthly financial overview
              </p>
              <h2 className="typewriter-display mt-3 text-2xl text-[color:var(--foreground)]">
                Budget Sohokari
              </h2>
            </div>
            <Badge className="bg-[rgba(168,39,30,0.08)] text-[color:var(--primary)]">
              Live sample
            </Badge>
          </div>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="typewriter-panel rounded-[2px] p-4">
              <p className="typewriter-label text-[color:var(--secondary)]">
                Monthly income
              </p>
              <p className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
                BDT 25,000
              </p>
            </div>
            <div className="rounded-[2px] border border-[rgba(168,39,30,0.22)] bg-[rgba(168,39,30,0.08)] p-4">
              <p className="typewriter-label text-[color:var(--secondary)]">
                Safe daily spend
              </p>
              <p className="mt-2 text-2xl font-bold text-[color:var(--primary)]">
                BDT 420
              </p>
            </div>
          </div>

          <div className="typewriter-panel rounded-[2px] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="typewriter-display text-lg text-[color:var(--foreground)]">
                  Weekly spending pattern
                </p>
                <p className="mt-1 text-sm text-[color:var(--secondary)]">
                  A simple view of food, transport, and bills across one week.
                </p>
              </div>
              <p className="typewriter-label text-[color:var(--secondary)]">
                Category view
              </p>
            </div>

            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyExpenseData} barGap={2}>
                  <CartesianGrid
                    strokeDasharray="2 4"
                    vertical={false}
                    stroke="rgba(107, 91, 62, 0.28)"
                  />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6B5B3E", fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6B5B3E", fontSize: 11 }}
                  />
                  <Tooltip content={<PreviewTooltip />} />
                  <Bar dataKey="food" stackId="a" fill="#1A0F00" radius={[1, 1, 0, 0]} />
                  <Bar dataKey="transport" stackId="a" fill="#6B5B3E" />
                  <Bar dataKey="bills" stackId="a" fill="#A8271E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".home-scroll section");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-scroll pb-20">
      <section>
        <Container className="py-18 sm:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up">
              <Badge>Personal budgeting assistant</Badge>
              <h1 className="typewriter-display mt-6 max-w-3xl text-4xl leading-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
                Track expenses, protect savings, and plan the month clearly.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--secondary)] sm:text-lg">
                Budget Sohokari helps you record daily spending, understand your
                remaining balance, and follow a safer daily budget with less
                confusion.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/register" size="lg">
                  Create account
                </Button>
                <Button href="/dashboard" variant="ghost" size="lg">
                  View dashboard preview
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
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
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <Badge>Overview</Badge>
            <h2 className="typewriter-display mt-5 text-4xl text-[color:var(--foreground)]">
              A budgeting app for real monthly decisions
            </h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--secondary)]">
              The app is built for people who need practical budgeting help:
              clear expense records, safer day-to-day spending guidance, and a
              better view of where the month is going.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <Card key={item.title}>
                <CardContent>
                  <p className="typewriter-label text-[color:var(--primary)]">
                    {item.title}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <CardContent>
                <Badge className="bg-[rgba(168,39,30,0.08)] text-[color:var(--primary)]">
                  Workflow
                </Badge>
                <h2 className="typewriter-display mt-5 text-3xl text-[color:var(--foreground)]">
                  A simple budgeting workflow
                </h2>
                <p className="mt-4 text-sm leading-7 text-[color:var(--secondary)]">
                  Start with your income, log expenses through the month, then
                  use the dashboard and insights to adjust before overspending.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--foreground)]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
