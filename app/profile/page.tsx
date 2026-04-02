import PageHeader from "@/components/PageHeader";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <PageHeader
        title="Profile"
        description="Manage your personal information, income, and savings goal."
      />

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Profession
            </label>
            <input
              type="text"
              placeholder="Junior Executive"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              City
            </label>
            <input
              type="text"
              placeholder="Dhaka"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Monthly Income
            </label>
            <input
              type="number"
              placeholder="25000"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Savings Goal
            </label>
            <input
              type="number"
              placeholder="5000"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-500"
            />
          </div>
        </div>

        <button className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
          Save Profile
        </button>
      </section>
    </main>
  );
}