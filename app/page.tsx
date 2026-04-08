"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
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
    accent: "bg-[#B0E4CC]",
    badgeClass: "bg-white  font-bold",
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
    accent: "bg-[#B0E4CC]",
     badgeClass: "bg-white  font-bold",
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
    accent: "bg-[#B0E4CC]",
     badgeClass: "bg-white  font-bold",
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
    accent: "bg-[#B0E4CC]",
     badgeClass: "bg-white  font-bold",
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
    chipClass: "bg-[#408A71] text-[#B0E4CC]",
    cardTint: "bg-[#B0E4CC]",
  },
  {
    title: "Control",
    description:
      "See a safer daily spending number based on your real income, savings goal, and expenses.",
    chipClass: "bg-[#285A48] text-[#B0E4CC]",
    cardTint: "bg-[#B0E4CC]",
  },
  {
    title: "Confidence",
    description:
      "Make better decisions with simple monthly insights and personalized financial guidance.",
    chipClass: "bg-[#408A71] text-[#B0E4CC]",
    cardTint: "bg-[#B0E4CC]",
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

  const visibleItems = payload.filter((item) => Number(item.value) > 0);
  const total = visibleItems.reduce((sum, item) => sum + Number(item.value), 0);

  return (
    <div className="rounded-xl border border-[#9bcdb8] bg-white p-3 shadow-lg">
      <p className="text-xs font-semibold text-[#091413]">{label}</p>
      <p className="mt-1 text-xs text-[#214b3d]">Total: ৳ {total}</p>
      <div className="mt-2 space-y-1.5">
        {visibleItems.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#214b3d]">{item.dataKey}</span>
            </div>
            <span className="font-medium text-[#091413]">৳ {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroPreviewCard() {
  const weeklyExpenseData = [
    { day: "Mon", Food: 130, Transport: 70, Bills: 40 },
    { day: "Tue", Food: 210, Transport: 90, Bills: 60 },
    { day: "Wed", Food: 160, Transport: 85, Bills: 45 },
    { day: "Thu", Food: 310, Transport: 130, Bills: 85 },
    { day: "Fri", Food: 240, Transport: 110, Bills: 70 },
    { day: "Sat", Food: 280, Transport: 120, Bills: 75 },
    { day: "Sun", Food: 150, Transport: 80, Bills: 55 },
  ];

  return (
    <Card className="animate-float-soft !border-0 overflow-hidden bg-white/85 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-md">
      <CardContent className="p-0">
        <div className="flex items-center justify-between bg-[#B0E4CC] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[#091413]">
              Budget Sohokari
            </p>
            <p className="mt-1 text-xs text-[#214b3d]">
              Monthly financial overview
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#091413]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#285A48]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#408A71]" />
          </div>
        </div>

        <div className="bg-[#B0E4CC] p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#d9f1e4] p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-sm text-[#214b3d]">Monthly Income</p>
              <p className="mt-2 text-2xl font-bold text-[#091413]">৳ 25,000</p>
            </div>

            <div className="rounded-2xl bg-[#d9f1e4] p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-sm text-[#214b3d]">Total Expenses</p>
              <p className="mt-2 text-2xl font-bold text-[#091413]">৳ 12,400</p>
            </div>

            <div className="rounded-2xl bg-[#d9f1e4] p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-sm text-[#214b3d]">Remaining Balance</p>
              <p className="mt-2 text-2xl font-bold text-[#091413]">৳ 12,600</p>
            </div>

            <div className="rounded-2xl bg-[#408A71] p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-sm text-[#B0E4CC]">Safe Daily Spend</p>
              <p className="mt-2 text-2xl font-bold text-[#B0E4CC]">৳ 420</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#d9f1e4] p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#091413]">
                  Monthly expense pattern
                </p>
                <p className="text-xs text-[#214b3d]">
                  Weekly stacked view by category 
                </p>
              </div>
            
            </div>

            <div className="h-44 rounded-xl bg-[#eef8f2] p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyExpenseData} barGap={2}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#9bcdb8"
                  />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#214b3d", fontSize: 11, fontWeight: 600 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#285A48", fontSize: 10 }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<PreviewTooltip />} />
                  <Bar dataKey="Food" stackId="a" fill="#285A48" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Transport" stackId="a" fill="#408A71" />
                  <Bar dataKey="Bills" stackId="a" fill="#78B79D" />
                </BarChart>
              </ResponsiveContainer>
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
          <Badge className="bg-[#d9f1e4] text-[#214b3d]">Product preview</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#091413] sm:text-4xl">
            See what Budget Sohokari helps you do
          </h2>
          <p className="mt-4 text-base leading-7 text-[#285A48]">
            A structured money dashboard for fresh graduates and early-career
            workers who need clarity, control, and smarter monthly planning.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="!border-0 overflow-hidden bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-500">
            <CardContent className="p-0">
              <div className="flex items-center justify-between bg-white/80 px-5 py-4 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-semibold text-[#091413]">
                    {slide.tag}
                  </p>
                  <p className="mt-1 text-xs text-[#214b3d]">
                    Interactive product preview
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-[#214b3d] transition hover:bg-[#eef8f2]"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-[#214b3d] transition hover:bg-[#eef8f2]"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className={`p-5 transition-all duration-500 ${slide.accent}`}>
                <div className="rounded-[28px] bg-white/85 p-5 shadow-sm backdrop-blur-md">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#091413]">
                        {slide.title}
                      </p>
                      <p className="mt-1 text-xs text-[#214b3d]">
                        Example screen concept
                      </p>
                    </div>
                    <Badge className={slide.badgeClass}>{slide.tag}</Badge>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {slide.stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl bg-white/90 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                      >
                        <p className="text-xs text-[#214b3d]">{item.label}</p>
                        <p className="mt-2 text-base font-semibold text-[#091413]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-white/90 p-4">
                    <div className="space-y-3">
                      {mockRows.map((row) => (
                        <div
                          key={`${row.left}-${row.right}`}
                          className="flex items-center justify-between rounded-xl bg-[#eef8f2] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                        >
                          <span className="text-sm font-medium text-[#091413]">
                            {row.left}
                          </span>
                          <span className="text-sm text-[#214b3d]">
                            {row.right}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs text-[#214b3d]">
                        <span>Progress overview</span>
                        <span>Clean, structured, useful</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-[#e3f4eb]">
                        <div
                          className="h-full rounded-full bg-[#285A48] transition-all duration-500"
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
                          ? "w-8 bg-[#091413]" : "w-2.5 bg-[#78b79d] hover:bg-[#408A71]"
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
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#091413] sm:text-3xl">
              {slide.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-[#285A48]">
              {slide.description}
            </p>

            <div className="mt-6 space-y-3">
              {slide.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-sm text-[#214b3d]">{item.label}</p>
                  <p className="mt-1 text-base font-semibold text-[#091413]">
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
      <section className="bg-[#B0E4CC]">
        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="animate-fade-up">
              <Badge className="bg-[#d9f1e4] text-[#214b3d]">
                Built for fresh graduates and early-career workers
              </Badge>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-[#091413] sm:text-5xl lg:text-6xl">
                A budgeting app that helps you survive the month with more
                clarity and less stress
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#285A48] sm:text-lg">
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
                  className="bg-white/90 shadow-sm"
                >
                  Explore Dashboard
                </Button>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                  <p className="text-sm text-[#214b3d]">Built for</p>
                  <p className="mt-2 text-base font-semibold text-[#091413]">
                    Starting salaries
                  </p>
                </div>

                <div className="rounded-2xl bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                  <p className="text-sm text-[#214b3d]">Focused on</p>
                  <p className="mt-2 text-base font-semibold text-[#091413]">
                    Daily affordability
                  </p>
                </div>

                <div className="rounded-2xl bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                  <p className="text-sm text-[#214b3d]">Powered by</p>
                  <p className="mt-2 text-base font-semibold text-[#091413]">
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

      <section className="bg-[#bde8d2] py-16 sm:py-20">
        <Container>
          <div className="mb-10 max-w-2xl animate-fade-up">
            <Badge className="bg-[#d9f1e4] text-[#285A48]">
              Why it matters
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#091413] sm:text-4xl">
              Built to give you clarity, control, and confidence
            </h2>
            <p className="mt-4 text-base leading-7 text-[#285A48]">
              Most people starting their first job do not need complicated
              finance software. They need a tool that makes daily decisions
              easier.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {valueCards.map((item) => (
              <Card
                key={item.title}
                className={`!border-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.cardTint}`}
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex rounded-2xl px-3 py-2 text-sm font-semibold ${item.chipClass}`}
                  >
                    {item.title}
                  </div>
                  <p className="text-sm leading-7 text-[#285A48]">
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
            <Badge className="bg-[#c5ead8] text-[#214b3d]">
              How it works
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#091413] sm:text-4xl">
              A simple flow for better money decisions
            </h2>
            <p className="mt-4 text-base leading-7 text-[#285A48]">
              The app is designed to stay simple, calm, and practical from day
              one.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="!border-0 bg-white/75 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-[#214b3d]">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[#091413]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#285A48]">
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
          <Card className="!border-0 overflow-hidden bg-[#091413] text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <CardContent className="relative flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative">
                <Badge className="bg-white/10 text-black font-bold">Start now</Badge>
                <h3 className="mt-4 text-2xl text-black font-bold tracking-tight sm:text-3xl">
                  Start building a cleaner financial life
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-black font-bold">
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
                  className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-[#B0E4CC] transition hover:bg-white/5 hover:text-white"
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







