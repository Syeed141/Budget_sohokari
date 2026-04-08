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
  const visibleLinks = session
    ? navLinks
    : navLinks.filter(
        (link) => link.href === "/dashboard" || link.href === "/expenses"
      );

  return (
    <header className="sticky top-0 z-50 border-b border-[#408A71]/70 bg-[#091413]/92 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#B0E4CC]">
            Budget Sohokari
          </Link>

          {visibleLinks.length > 0 ? (
            <nav className="hidden items-center gap-5 md:flex">
              {visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#9ed5c0] transition hover:text-[#B0E4CC]"
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
              <span className="hidden text-sm text-[#9ed5c0] sm:inline">
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
