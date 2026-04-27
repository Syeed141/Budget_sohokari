"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";

type NavLink = {
  href: string;
  label: string;
};

type MobileNavMenuProps = {
  links: NavLink[];
  sessionName?: string;
};

export default function MobileNavMenu({
  links,
  sessionName,
}: MobileNavMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { pushToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  async function handleLogout() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      pushToast("Failed to logout. Please try again.", "error");
      return;
    }

    setIsOpen(false);
    pushToast("Logged out successfully", "success");
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        className="typewriter-label border border-[color:var(--border-soft)] bg-[color:var(--surface)] px-3 py-2 text-[color:var(--secondary)] transition hover:text-[color:var(--primary)]"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[min(18rem,calc(100vw-2rem))] border border-[color:var(--border-soft)] bg-[color:var(--surface)] shadow-[0_14px_34px_rgba(26,15,0,0.12)]">
          {sessionName ? (
            <div className="border-b border-[color:var(--border-soft)] px-4 py-3">
              <p className="typewriter-label text-[color:var(--secondary)]">
                Signed in
              </p>
              <p className="mt-2 text-sm text-[color:var(--foreground)]">
                {sessionName}
              </p>
            </div>
          ) : null}

          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="typewriter-label border-b border-[color:var(--border-soft)] px-4 py-3 text-[color:var(--secondary)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--primary)]"
              >
                {link.label}
              </Link>
            ))}

            {sessionName ? (
              <button
                type="button"
                onClick={handleLogout}
                className="typewriter-label px-4 py-3 text-left text-[color:var(--secondary)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--primary)]"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="typewriter-label border-b border-[color:var(--border-soft)] px-4 py-3 text-[color:var(--secondary)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--primary)]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="typewriter-label px-4 py-3 text-[color:var(--secondary)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--primary)]"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
