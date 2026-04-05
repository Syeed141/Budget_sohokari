import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import LogoutButton from "@/components/auth/LogoutButton";
import { getSessionFromCookies } from "@/components/lib/auth";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/profile", label: "Profile" },
  { href: "/ai", label: "AI Assistant" },
];

export default async function Navbar() {
  const session = await getSessionFromCookies();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
            Budget Sohokari
          </Link>

          {session ? (
            <nav className="hidden items-center gap-5 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">
                {session.name}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">
                Login
              </Button>
              <Button href="/register" size="sm">
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}