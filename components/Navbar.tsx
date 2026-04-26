import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import LogoutButton from "@/components/auth/LogoutButton";
import MobileNavMenu from "@/components/MobileNavMenu";
import { getSessionFromCookies } from "@/components/lib/auth";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/profile", label: "Profile" },
  { href: "/ai", label: "AI Assistant" },
];

export default async function Navbar() {
  const session = await getSessionFromCookies();
  const visibleLinks = session
    ? navLinks
    : navLinks.filter(
        (link) => link.href === "/dashboard" || link.href === "/expenses"
      );

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border-soft)] bg-[color:var(--surface)]">
      <Container className="py-3">
        <div className="flex min-h-10 flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <Link
              href="/"
              className="typewriter-display min-w-0 text-base tracking-tight text-[color:var(--foreground)] sm:text-lg"
            >
              Budget Sohokari
            </Link>

            {visibleLinks.length > 0 ? (
              <nav className="hidden items-center gap-5 md:flex">
                {visibleLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="typewriter-label text-[color:var(--secondary)] transition hover:text-[color:var(--primary)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <MobileNavMenu links={visibleLinks} />

            {session ? (
              <>
                <span className="hidden text-sm text-[color:var(--secondary)] sm:inline">
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
        </div>
      </Container>
    </header>
  );
}
