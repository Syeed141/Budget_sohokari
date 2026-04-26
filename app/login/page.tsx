import Link from "next/link";
import Container from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/PageHeader";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <p className="typewriter-label inline-flex border border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.9)] px-3 py-1 text-[color:var(--secondary)]">
              Welcome back
            </p>
            <h1 className="typewriter-display mt-6 text-4xl tracking-tight text-[color:var(--foreground)]">
              Continue tracking your financial progress
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-[color:var(--secondary)]">
              Log in to view your dashboard, manage expenses, track savings, and
              chat with your AI budgeting assistant.
            </p>
          </div>

          <Card className="mx-auto w-full max-w-md">
            <CardContent className="p-8">
              <PageHeader
                title="Login"
                description="Sign in to access your budget dashboard."
              />

              <LoginForm />

              <p className="mt-6 text-sm text-[color:var(--secondary)]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[color:var(--primary)] underline underline-offset-4"
                >
                  Register
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}
