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
            <p className="typewriter-label inline-flex border border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.9)] px-3 py-1 text-[color:var(--secondary)]">
              Start your journey
            </p>
            <h1 className="typewriter-display mt-6 text-4xl tracking-tight text-[color:var(--foreground)]">
              Create your personal budgeting space
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-[color:var(--secondary)]">
              Set up your account and begin tracking income, expenses, savings,
              and monthly spending decisions in one place.
            </p>
          </div>

          <Card className="mx-auto w-full max-w-xl">
            <CardContent className="p-8">
              <PageHeader
                title="Register"
                description="Create an account to start tracking your money."
              />

              <RegisterForm />

              <p className="mt-6 text-sm text-[color:var(--secondary)]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[color:var(--primary)] underline underline-offset-4"
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
