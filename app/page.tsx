"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

const previewSlides = [
  {
    title: "Track every expense clearly",
    description:
      "Record food, transport, rent, bills, shopping, and daily costs in one clean flow.",
    tag: "Expense Tracking",
    accent: "from-sky-50 via-white to-blue-50",
    badgeClass: "bg-sky-100 text-sky-700",
    stats: [
      { label: "Food", value: "৳ 4,200" },
      { label: "Transport", value: "৳ 1,850" },
      { label: "Bills", value: "৳ 2,100" },
    ],
  },
  {
    title: "See your safe daily spending",
    description:
      "Understand how much you can spend today without breaking your monthly balance or savings target.",
    tag: "Daily Budget Guidance",
    accent: "from-emerald-50 via-white to-teal-50",
    badgeClass: "bg-emerald-100 text-emerald-700",
    stats: [
      { label: "Monthly Income", value: "৳ 25,000" },
      { label: "Remaining Balance", value: "৳ 12,600" },
      { label: "Safe Daily Spend", value: "৳ 420" },
    ],
  },
  {
    title: "Understand monthly patterns",
    description:
      "Review your spending trends, biggest categories, and highest-expense days for better decisions.",
    tag: "Monthly Analytics",
    accent: "from-violet-50 via-white to-fuchsia-50",
    badgeClass: "bg-violet-100 text-violet-700",
    stats: [
      { label: "Top Category", value: "Food" },
      { label: "Highest Day", value: "Day 18" },
      { label: "No-Spend Days", value: "9" },
    ],
  },
  {
    title: "Get practical budgeting advice",
    description:
      "Ask smart questions about your money and get personalized guidance from your real financial data.",
    tag: "AI Assistant",
    accent: "from-orange-50 via-white to-rose-50",
    badgeClass: "bg-orange-100 text-orange-700",
    stats: [
      { label: "Question", value: "Can I spend ৳200 today?" },
      { label: "Answer", value: "Yes, but reduce eating out this week." },
      { label: "Focus", value: "Stay on savings target" },
    ],
  },
];

const valueCards = [
  {
    title: "Clarity",
    description:
      "Know where your money goes every month without using complicated finance tools.",
    chipClass: "bg-sky-100 text-sky-700",
    cardTint: "bg-gradient-to-br from-white to-sky-50/80",
  },
  {
    title: "Control",
    description:
      "See a safer daily spending number based on your real income, savings goal, and expenses.",
    chipClass: "bg-emerald-100 text-emerald-700",
    cardTint: "bg-gradient-to-br from-white to-emerald-50/80",
  },
  {
    title: "Confidence",
    description:
      "Make better decisions with simple monthly insights and personalized financial guidance.",
    chipClass: "bg-violet-100 text-violet-700",
    cardTint: "bg-gradient-to-br from-white to-violet-50/80",
  },
];

const steps = [
  {
    number: "01",
    title: "Set income and savings goals",
    description:
      "Start by telling the app how much you earn and how much you want to save each month.",
  },
  {
    number: "02",
    title: "Track daily expenses",
    description:
      "Log your spending in categories like food, rent, transport, bills, and shopping.",
  },
  {
    number: "03",
    title: "Follow your safe daily budget",
    description:
      "See how much you can safely spend today based on your current monthly position.",
  },
  {
    number: "04",
    title: "Review monthly insights and reports",
    description:
      "Understand your patterns, top cost areas, and monthly financial health with downloadable reports.",
  },
];

function HeroPreviewCard() {
  return (
    <Card className="animate-float-soft overflow-hidden border-white/70 bg-white/85 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-md">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-sm">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Budget Sohokari
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Monthly financial overview
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 via-sky-50/70 to-emerald-50/50 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-sky-100 bg-white/95 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-sm text-slate-500">Monthly Income</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">৳ 25,000</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-sm text-slate-500">Total Expenses</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">৳ 12,400</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-sm text-slate-500">Remaining Balance</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">৳ 12,600</p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-sm text-emerald-700">Safe Daily Spend</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">৳ 420</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Monthly expense pattern
                </p>
                <p className="text-xs text-slate-500">
                  Example spending activity
                </p>
              </div>
              <Badge className="bg-violet-100 text-violet-700">
                Live insights
              </Badge>
            </div>

            <div className="flex h-36 items-end gap-2">
              {[
                "h-[40%]",
                "h-[68%]",
                "h-[52%]",
                "h-[88%]",
                "h-[60%]",
                "h-[78%]",
                "h-[44%]",
                "h-[72%]",
                "h-[56%]",
                "h-[84%]",
                "h-[48%]",
                "h-[66%]",
              ].map((height, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t-xl bg-gradient-to-t from-slate-900 via-slate-700 to-sky-500/80 ${height} transition-all duration-300 hover:opacity-80`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slide = previewSlides[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % previewSlides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? previewSlides.length - 1 : prev - 1
    );
  };

  const mockRows = useMemo(() => {
    if (activeIndex === 0) {
      return [
        { left: "Lunch", right: "Food • ৳ 180" },
        { left: "Bus", right: "Transport • ৳ 60" },
        { left: "Internet Bill", right: "Bills • ৳ 900" },
      ];
    }

    if (activeIndex === 1) {
      return [
        { left: "Today", right: "Safe spend ৳ 420" },
        { left: "Savings Goal", right: "৳ 5,000" },
        { left: "Current Pace", right: "Under control" },
      ];
    }

    if (activeIndex === 2) {
      return [
        { left: "Top Category", right: "Food" },
        { left: "Highest Spend Day", right: "Day 18" },
        { left: "No-Spend Days", right: "9 days" },
      ];
    }

    return [
      { left: "Question", right: "Can I spend today?" },
      { left: "AI Reply", right: "Yes, but reduce food delivery." },
      { left: "Focus", right: "Stay within savings target" },
    ];
  }, [activeIndex]);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-10 max-w-2xl animate-fade-up">
          <Badge className="bg-sky-100 text-sky-700">Product preview</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See what Budget Sohokari helps you do
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A structured money dashboard for fresh graduates and early-career
            workers who need clarity, control, and smarter monthly planning.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden border-white/70 bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-500">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {slide.tag}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Interactive product preview
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div
                className={`bg-gradient-to-br p-5 transition-all duration-500 ${slide.accent}`}
              >
                <div className="rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur-md">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {slide.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Example screen concept
                      </p>
                    </div>
                    <Badge className={slide.badgeClass}>{slide.tag}</Badge>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {slide.stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                      >
                        <p className="text-xs text-slate-500">{item.label}</p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white/90 p-4">
                    <div className="space-y-3">
                      {mockRows.map((row) => (
                        <div
                          key={`${row.left}-${row.right}`}
                          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/90 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                        >
                          <span className="text-sm font-medium text-slate-900">
                            {row.left}
                          </span>
                          <span className="text-sm text-slate-500">
                            {row.right}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                        <span>Progress overview</span>
                        <span>Clean, structured, useful</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-slate-900 via-sky-600 to-emerald-500 transition-all duration-500"
                          style={{
                            width:
                              activeIndex === 0
                                ? "58%"
                                : activeIndex === 1
                                ? "76%"
                                : activeIndex === 2
                                ? "68%"
                                : "82%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-center gap-2">
                  {previewSlides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeIndex === index
                          ? "w-8 bg-slate-900"
                          : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex animate-fade-up flex-col justify-center">
            <Badge className={slide.badgeClass}>{slide.tag}</Badge>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {slide.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {slide.description}
            </p>

            <div className="mt-6 space-y-3">
              {slide.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/80 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[linear-gradient(to_bottom,_#f8fafc_0%,_#ffffff_18%,_#f8fafc_50%,_#ffffff_100%)] pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-drift-soft absolute left-[-120px] top-[40px] h-[320px] w-[320px] rounded-full bg-sky-200/25 blur-3xl" />
        <div className="animate-drift-soft absolute right-[-120px] top-[180px] h-[320px] w-[320px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute left-[28%] top-[620px] h-[260px] w-[260px] rounded-full bg-violet-200/16 blur-3xl" />
        <div className="absolute right-[10%] top-[980px] h-[240px] w-[240px] rounded-full bg-orange-200/14 blur-3xl" />
        <div className="absolute left-[-80px] bottom-[240px] h-[280px] w-[280px] rounded-full bg-cyan-200/14 blur-3xl" />
      </div>

      <section className="relative overflow-hidden border-b border-slate-200 bg-white/55 backdrop-blur-[2px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-80px] top-[-60px] h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />
          <div className="absolute right-[-70px] top-[80px] h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[35%] h-72 w-72 rounded-full bg-violet-200/16 blur-3xl" />
        </div>

        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="animate-fade-up">
              <Badge className="bg-sky-100 text-sky-700">
                Built for fresh graduates and early-career workers
              </Badge>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                A budgeting app that helps you survive the month with more
                clarity and less stress
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Budget Sohokari helps you track expenses, protect your savings,
                understand your safe daily spending, and make smarter decisions
                from your real financial situation.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/register" size="lg" className="shadow-sm">
                  Create Account
                </Button>
                <Button
                  href="/dashboard"
                  variant="secondary"
                  size="lg"
                  className="border-slate-200 bg-white/90 shadow-sm"
                >
                  Explore Dashboard
                </Button>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sky-100 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                  <p className="text-sm text-slate-500">Built for</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    Starting salaries
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                  <p className="text-sm text-slate-500">Focused on</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    Daily affordability
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-100 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                  <p className="text-sm text-slate-500">Powered by</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    Real monthly insights
                  </p>
                </div>
              </div>
            </div>

            <div className="animate-fade-up-delayed lg:justify-self-end">
              <HeroPreviewCard />
            </div>
          </div>
        </Container>
      </section>

      <ProductCarousel />

      <section className="border-y border-slate-200 bg-white/50 py-16 sm:py-20 backdrop-blur-[2px]">
        <Container>
          <div className="mb-10 max-w-2xl animate-fade-up">
            <Badge className="bg-emerald-100 text-emerald-700">
              Why it matters
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built to give you clarity, control, and confidence
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Most people starting their first job do not need complicated
              finance software. They need a tool that makes daily decisions
              easier.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {valueCards.map((item) => (
              <Card
                key={item.title}
                className={`border-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.cardTint}`}
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex rounded-2xl px-3 py-2 text-sm font-semibold ${item.chipClass}`}
                  >
                    {item.title}
                  </div>
                  <p className="text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-10 max-w-2xl animate-fade-up">
            <Badge className="bg-violet-100 text-violet-700">
              How it works
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A simple flow for better money decisions
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The app is designed to stay simple, calm, and practical from day
              one.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="border-white/80 bg-white/75 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-slate-400">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Card className="overflow-hidden border-slate-900 bg-[linear-gradient(135deg,_#0f172a,_#1e293b,_#0f172a)] text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <CardContent className="relative flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(125,211,252,0.18),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(52,211,153,0.12),_transparent_25%)]" />

              <div className="relative">
                <Badge className="bg-white/10 text-white">Start now</Badge>
                <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  Start building a cleaner financial life
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  Track your spending, protect your savings, and make better
                  daily decisions with a budgeting tool designed for real life.
                </p>
              </div>

              <div className="relative flex flex-col gap-3 sm:flex-row">
                <Button href="/register" variant="secondary" size="lg">
                  Get Started
                </Button>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-white"
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