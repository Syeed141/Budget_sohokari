import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/PageHeader";

const sampleMessages = [
  {
    id: 1,
    role: "user",
    content: "Can I spend 200 BDT on dinner today?",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "Based on your current monthly balance, spending 200 BDT is slightly above your safe daily target. You can still do it, but try to reduce food spending later this week.",
  },
  {
    id: 3,
    role: "user",
    content: "Which category is costing me the most?",
  },
  {
    id: 4,
    role: "assistant",
    content:
      "Your current highest category appears to be food. If this trend continues, it may reduce your ability to reach this month’s savings goal.",
  },
];

export default function AIPage() {
  return (
    <main className="py-10">
      <Container className="max-w-6xl">
        <PageHeader
          badgeText="Context-aware assistant"
          title="AI Assistant"
          description="Ask practical budget questions and get personalized guidance based on your income, expenses, and savings context."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="flex h-[650px] flex-col">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Chat
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Later this will be connected to your real AI endpoint.
                </p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto py-6">
                {sampleMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "ml-auto bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-800 ring-1 ring-slate-200"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    placeholder="Ask something about your monthly budget..."
                    className="flex-1"
                  />
                  <Button size="lg">Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-slate-900">
                AI Context Preview
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This side panel represents the kind of data the AI will later use
                for more relevant advice.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Monthly Income</p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    ৳ 25,000
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Spent So Far</p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    ৳ 12,400
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Safe Daily Budget</p>
                  <p className="mt-2 text-xl font-bold text-emerald-600">
                    ৳ 420
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 p-4 text-white">
                  <p className="text-sm text-slate-300">Current insight</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">
                    Food spending is the area where the assistant is likely to
                    advise adjustment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}