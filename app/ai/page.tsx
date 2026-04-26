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
      "Your current highest category appears to be food. If this trend continues, it may reduce your ability to reach this month's savings goal.",
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

        <div className="typewriter-status mb-6 rounded-[2px] px-4 py-3 text-sm font-medium">
          AI chat integration is coming in the next update.
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="flex min-h-[520px] flex-col sm:h-[650px]">
              <div className="typewriter-rule border-b pb-4">
                <h2 className="typewriter-display text-lg text-[color:var(--foreground)]">
                  Chat
                </h2>
                <p className="mt-1 text-sm text-[color:var(--secondary)]">
                  Coming soon in the next update.
                </p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto py-6">
                {sampleMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[85%] rounded-[2px] px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "ml-auto border border-[color:var(--primary)] bg-[color:var(--primary)] text-[color:var(--surface)]"
                        : "typewriter-panel text-[color:var(--foreground)]"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </div>

              <div className="typewriter-rule border-t pt-4">
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
              <h2 className="typewriter-display text-lg text-[color:var(--foreground)]">
                AI Context Preview
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--secondary)]">
                This side panel represents the kind of data the AI will later
                use for more relevant advice.
              </p>

              <div className="mt-6 space-y-4">
                <div className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Monthly Income
                  </p>
                  <p className="mt-2 text-xl font-bold text-[color:var(--foreground)]">
                    BDT 25,000
                  </p>
                </div>

                <div className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Spent So Far
                  </p>
                  <p className="mt-2 text-xl font-bold text-[color:var(--foreground)]">
                    BDT 12,400
                  </p>
                </div>

                <div className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Safe Daily Budget
                  </p>
                  <p className="mt-2 text-xl font-bold text-[color:var(--primary)]">
                    BDT 420
                  </p>
                </div>

                <div className="rounded-[2px] border border-[rgba(168,39,30,0.22)] bg-[rgba(168,39,30,0.08)] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Current insight
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
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
