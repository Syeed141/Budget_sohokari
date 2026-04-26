import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import { getSessionFromCookies } from "@/components/lib/auth";
import { connectToDatabase } from "@/components/lib/db";
import User from "@/components/models/User";

export default async function ProfilePage() {
  const session = await getSessionFromCookies();

  if (!session) {
    redirect("/login");
  }

  await connectToDatabase();

  const user = await User.findById(session.userId).select(
    "_id name email city profession monthlyIncome monthlySavingsGoal"
  );

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="py-10">
      <Container className="max-w-5xl">
        <PageHeader
          badgeText="Personal settings"
          title="Profile"
          description="Set your monthly income, savings goal, and basic information to personalize your financial insights."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <ProfileForm
            initialData={{
              name: user.name || "",
              city: user.city || "",
              profession: user.profession || "",
              monthlyIncome: user.monthlyIncome || 0,
              monthlySavingsGoal: user.monthlySavingsGoal || 0,
            }}
          />

          <Card>
            <CardContent>
              <h2 className="typewriter-display text-lg text-[color:var(--foreground)]">
                Profile Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Monthly Income
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
                    BDT {user.monthlyIncome || 0}
                  </p>
                </div>

                <div className="typewriter-panel rounded-[2px] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Savings Goal
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
                    BDT {user.monthlySavingsGoal || 0}
                  </p>
                </div>

                <div className="rounded-[2px] border border-[rgba(168,39,30,0.22)] bg-[rgba(168,39,30,0.08)] p-4">
                  <p className="typewriter-label text-[color:var(--secondary)]">
                    Planning note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
                    Higher income clarity creates better daily budget guidance.
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
