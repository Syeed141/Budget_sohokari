import Container from "@/components/ui/Container";

export default function DashboardLoading() {
  return (
    <main className="py-10">
      <Container>
        <div className="mb-8">
          <div className="h-6 w-40 rounded-[2px] bg-[rgba(107,91,62,0.16)]" />
          <div className="mt-4 h-10 w-80 rounded-[2px] bg-[rgba(107,91,62,0.16)]" />
          <div className="mt-3 h-5 w-full max-w-lg rounded-[2px] bg-[rgba(107,91,62,0.12)]" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="typewriter-card rounded-[2px] p-6"
            >
              <div className="h-4 w-28 rounded-[2px] bg-[rgba(107,91,62,0.16)]" />
              <div className="mt-4 h-8 w-32 rounded-[2px] bg-[rgba(107,91,62,0.16)]" />
              <div className="mt-3 h-4 w-44 rounded-[2px] bg-[rgba(107,91,62,0.12)]" />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="typewriter-card rounded-[2px] p-6 lg:col-span-2">
            <div className="h-5 w-52 rounded-[2px] bg-[rgba(107,91,62,0.16)]" />
            <div className="mt-3 h-4 w-40 rounded-[2px] bg-[rgba(107,91,62,0.12)]" />
            <div className="mt-6 h-48 rounded-[2px] bg-[rgba(107,91,62,0.12)]" />
          </div>

          <div className="typewriter-card rounded-[2px] p-6">
            <div className="h-5 w-36 rounded-[2px] bg-[rgba(107,91,62,0.16)]" />
            <div className="mt-3 h-4 w-44 rounded-[2px] bg-[rgba(107,91,62,0.12)]" />
            <div className="mt-6 h-32 rounded-[2px] bg-[rgba(107,91,62,0.12)]" />
          </div>
        </div>
      </Container>
    </main>
  );
}
