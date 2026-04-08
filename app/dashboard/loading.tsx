import Container from "@/components/ui/Container";

export default function DashboardLoading() {
  return (
    <main className="py-10">
      <Container>
        <div className="mb-8">
          <div className="h-6 w-40 rounded-full bg-slate-200" />
          <div className="mt-4 h-10 w-80 rounded-xl bg-slate-200" />
          <div className="mt-3 h-5 w-lg max-w-full rounded-xl bg-slate-200" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="mt-4 h-8 w-32 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-44 rounded bg-slate-100" />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-5 w-52 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-40 rounded bg-slate-100" />
            <div className="mt-6 h-48 rounded-3xl bg-slate-100" />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-5 w-36 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-44 rounded bg-slate-100" />
            <div className="mt-6 h-32 rounded-3xl bg-slate-100" />
          </div>
        </div>
      </Container>
    </main>
  );
}
