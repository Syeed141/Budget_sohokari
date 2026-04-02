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
      "Based on your current monthly balance, you can spend around 180 BDT safely today. Spending 200 BDT is possible, but you may need to reduce food cost later this week.",
  },
];

export default function AIPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <PageHeader
        title="AI Assistant"
        description="Ask budget questions and get personalized financial guidance."
      />

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="space-y-4">
          {sampleMessages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                message.role === "user"
                  ? "ml-auto bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <input
            type="text"
            placeholder="Ask something about your budget..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-500"
          />
          <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
            Send
          </button>
        </div>
      </section>
    </main>
  );
}