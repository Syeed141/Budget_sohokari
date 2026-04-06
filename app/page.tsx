// import Link from "next/link";
// import Container from "@/components/ui/Container";
// import Button from "@/components/ui/Button";
// import Badge from "@/components/ui/Badge";
// import { Card, CardContent } from "@/components/ui/Card";

// const featureCards = [
//   {
//     title: "Track every expense",
//     description:
//       "Record food, rent, transport, internet, and daily costs in a clean and simple way.",
//   },
//   {
//     title: "Know your safe daily budget",
//     description:
//       "See how much you can safely spend today based on your salary, savings goal, and current month spending.",
//   },
//   {
//     title: "Get AI guidance",
//     description:
//       "Ask practical money questions and receive personalized suggestions based on your own financial context.",
//   },
// ];

// export default function HomePage() {
//   return (
//     <main className="pb-20">
//       <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
//         <Container className="py-20 sm:py-24">
//           <div className="grid items-center gap-12 lg:grid-cols-2">
//             <div>
//               <Badge>Built for early-career workers</Badge>

//               <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
//                 A smarter way to survive and plan your month on a starting salary
//               </h1>

//               <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
//                 Budget Sohokari helps fresh graduates track expenses, understand
//                 monthly financial health, plan daily spending, and get AI-powered
//                 guidance based on their real income and spending habits.
//               </p>

//               <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//                 <Button href="/register" size="lg">
//                   Create Account
//                 </Button>
//                 <Button href="/dashboard" variant="secondary" size="lg">
//                   View Demo Dashboard
//                 </Button>
//               </div>

//               <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
//                 <span>Expense tracking</span>
//                 <span>Daily budget insights</span>
//                 <span>Monthly analysis</span>
//                 <span>AI assistance</span>
//               </div>
//             </div>

//             <div className="lg:justify-self-end">
//               <Card className="overflow-hidden">
//                 <CardContent className="p-0">
//                   <div className="border-b border-slate-200 bg-white px-6 py-4">
//                     <p className="text-sm font-semibold text-slate-900">
//                       Monthly snapshot
//                     </p>
//                     <p className="mt-1 text-sm text-slate-500">
//                       Example financial overview
//                     </p>
//                   </div>

//                   <div className="grid gap-4 bg-slate-50 p-6 sm:grid-cols-2">
//                     <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
//                       <p className="text-sm text-slate-500">Monthly Income</p>
//                       <p className="mt-2 text-2xl font-bold text-slate-900">
//                         ৳ 25,000
//                       </p>
//                     </div>

//                     <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
//                       <p className="text-sm text-slate-500">Total Expenses</p>
//                       <p className="mt-2 text-2xl font-bold text-slate-900">
//                         ৳ 12,400
//                       </p>
//                     </div>

//                     <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
//                       <p className="text-sm text-slate-500">Remaining Balance</p>
//                       <p className="mt-2 text-2xl font-bold text-slate-900">
//                         ৳ 12,600
//                       </p>
//                     </div>

//                     <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
//                       <p className="text-sm text-slate-500">Safe Daily Spend</p>
//                       <p className="mt-2 text-2xl font-bold text-emerald-600">
//                         ৳ 420
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </Container>
//       </section>

//       <section className="py-16 sm:py-20">
//         <Container>
//           <div className="mb-10 max-w-2xl">
//             <h2 className="text-3xl font-bold tracking-tight text-slate-900">
//               Everything you need to build better money habits
//             </h2>
//             <p className="mt-3 text-base leading-7 text-slate-600">
//               Designed for people who need clarity, not complicated finance tools.
//             </p>
//           </div>

//           <div className="grid gap-6 md:grid-cols-3">
//             {featureCards.map((feature) => (
//               <Card key={feature.title}>
//                 <CardContent>
//                   <h3 className="text-lg font-semibold text-slate-900">
//                     {feature.title}
//                   </h3>
//                   <p className="mt-3 text-sm leading-6 text-slate-600">
//                     {feature.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </Container>
//       </section>

//       <section className="py-4">
//         <Container>
//           <Card className="bg-slate-900 text-white">
//             <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <h3 className="text-2xl font-bold tracking-tight">
//                   Start with a cleaner financial life
//                 </h3>
//                 <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
//                   Build awareness of your expenses, protect your savings, and make
//                   better daily spending decisions.
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 <Button href="/register" variant="secondary" size="lg">
//                   Get Started
//                 </Button>
//                 <Link
//                   href="/login"
//                   className="inline-flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:text-white"
//                 >
//                   Login
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </Container>
//       </section>
//     </main>
//   );
// }








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
  },
  {
    title: "Control",
    description:
      "See a safer daily spending number based on your real income, savings goal, and expenses.",
  },
  {
    title: "Confidence",
    description:
      "Make better decisions with simple monthly insights and personalized financial guidance.",
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
    <Card className="overflow-hidden border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Budget Sohokari
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Monthly financial overview
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
          </div>
        </div>

        <div className="bg-slate-50 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Monthly Income</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">৳ 25,000</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Total Expenses</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">৳ 12,400</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Remaining Balance</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">৳ 12,600</p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Safe Daily Spend</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">৳ 420</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Monthly expense pattern
                </p>
                <p className="text-xs text-slate-500">
                  Example spending activity
                </p>
              </div>
              <Badge>Live insights</Badge>
            </div>

            <div className="flex h-36 items-end gap-2">
              {[40, 68, 52, 88, 60, 78, 44, 72, 56, 84, 48, 66].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-xl bg-slate-900/90"
                    style={{ height: `${height}%` }}
                  />
                )
              )}
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
        <div className="mb-10 max-w-2xl">
          <Badge>Product preview</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See what Budget Sohokari helps you do
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A structured money dashboard for fresh graduates and early-career
            workers who need clarity, control, and smarter monthly planning.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
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
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {slide.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Example screen concept
                      </p>
                    </div>
                    <Badge>{slide.tag}</Badge>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {slide.stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <p className="text-xs text-slate-500">{item.label}</p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="space-y-3">
                      {mockRows.map((row) => (
                        <div
                          key={`${row.left}-${row.right}`}
                          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
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
                          className="h-full rounded-full bg-slate-900 transition-all duration-300"
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
                      className={`h-2.5 rounded-full transition-all ${
                        activeIndex === index
                          ? "w-8 bg-slate-900"
                          : "w-2.5 bg-slate-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-center">
            <Badge>{slide.tag}</Badge>
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
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
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
    <main className="bg-white pb-20">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.05),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#ffffff)]">
        <Container className="py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Badge>Built for fresh graduates and early-career workers</Badge>

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
                <Button href="/register" size="lg">
                  Create Account
                </Button>
                <Button href="/dashboard" variant="secondary" size="lg">
                  Explore Dashboard
                </Button>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">Built for</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    Starting salaries
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">Focused on</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    Daily affordability
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">Powered by</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    Real monthly insights
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <HeroPreviewCard />
            </div>
          </div>
        </Container>
      </section>

      <ProductCarousel />

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <Container>
          <div className="mb-10 max-w-2xl">
            <Badge>Why it matters</Badge>
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
                className="border-slate-200 bg-white shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900">
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
          <div className="mb-10 max-w-2xl">
            <Badge>How it works</Badge>
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
              <Card key={step.number} className="border-slate-200 bg-white">
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
          <Card className="overflow-hidden border-slate-900 bg-slate-900 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <CardContent className="flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge className="bg-white/10 text-white">Start now</Badge>
                <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  Start building a cleaner financial life
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  Track your spending, protect your savings, and make better
                  daily decisions with a budgeting tool designed for real life.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
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