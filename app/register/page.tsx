import Link from "next/link";
import Container from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/PageHeader";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Start your journey
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
              Create your personal budgeting space
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              Set up your account and begin tracking income, expenses, savings,
              and monthly spending decisions in one place.
            </p>
          </div>

          <Card className="mx-auto w-full max-w-md">
            <CardContent className="p-8">
              <PageHeader
                title="Register"
                description="Create an account to start tracking your money."
              />

              <RegisterForm />

              <p className="mt-6 text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-slate-900 underline underline-offset-4"
                >
                  Login
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}