import Link from "next/link";
import Container from "@/components/ui/Container";

const footerLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/profile", label: "Profile" },
  { href: "/ai", label: "AI Assistant" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border-soft)] bg-[color:var(--surface)]">
      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="text-center lg:text-left">
            <p className="typewriter-label text-[color:var(--secondary)]">
              Budget Sohokari
            </p>
            <h2 className="typewriter-display mt-3 max-w-2xl text-2xl leading-tight text-[color:var(--foreground)] sm:text-3xl lg:max-w-2xl">
              Track the month with more clarity and less stress.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--secondary)] sm:text-base">
              Expense tracking, daily budget guidance, and monthly insights in
              one simple workspace.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="border-t border-[color:var(--border-soft)] pt-4 sm:border-t-0 sm:pt-0 text-center sm:text-left">
              <p className="typewriter-label text-[color:var(--secondary)]">
                Navigate
              </p>
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-4 sm:gap-y-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[color:var(--foreground)] transition hover:text-[color:var(--primary)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[color:var(--border-soft)] pt-4 sm:border-t-0 sm:pt-0 text-center sm:text-left">
              <p className="typewriter-label text-[color:var(--secondary)]">
                Focus
              </p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--foreground)]">
                <p>Know what you spent.</p>
                <p>See what remains.</p>
                <p>Adjust before overspending.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-[color:var(--border-soft)] pt-4 text-center text-xs text-[color:var(--secondary)] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>Budget Sohokari is built for practical monthly planning.</p>
          <p>Track. Review. Adjust.</p>
        </div>
      </Container>
    </footer>
  );
}
