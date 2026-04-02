import Link from "next/link";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/PageHeader";

export default function LoginPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              Welcome back
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
              Continue tracking your financial progress
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
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

              <form className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />

                <Button className="w-full" size="lg">
                  Login
                </Button>
              </form>

              <p className="mt-6 text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-slate-900 underline underline-offset-4"
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