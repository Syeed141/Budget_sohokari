import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/PageHeader";

export default function ProfilePage() {
  return (
    <main className="py-10">
      <Container className="max-w-5xl">
        <PageHeader
          badgeText="Personal settings"
          title="Profile"
          description="Set your monthly income, savings goal, and basic information to personalize your financial insights."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent>
              <h2 className="text-lg font-semibold text-slate-900">
                Personal Information
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                These details will later be saved to your account.
              </p>

              <form className="mt-6 grid gap-5 md:grid-cols-2">
                <Input label="Full Name" placeholder="Your name" />
                <Input label="Profession" placeholder="Junior Executive" />
                <Input label="City" placeholder="Dhaka" />
                <Input label="Monthly Income" type="number" placeholder="25000" />
                <Input
                  label="Savings Goal"
                  type="number"
                  placeholder="5000"
                />

                <div className="md:col-span-2">
                  <Button size="lg">Save Profile</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-slate-900">
                Profile Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Monthly Income</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    ৳ 25,000
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Savings Goal</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    ৳ 5,000
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 p-4 text-white">
                  <p className="text-sm text-slate-300">Planning note</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">
                    Later, this section can show profile-based financial advice.
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