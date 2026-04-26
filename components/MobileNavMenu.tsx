"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
};

type MobileNavMenuProps = {
  links: NavLink[];
};

export default function MobileNavMenu({ links }: MobileNavMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (links.length === 0) {
    return null;
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
        <nav className="absolute right-0 top-[calc(100%+8px)] z-20 flex min-w-[220px] flex-col border border-[color:var(--border-soft)] bg-[color:var(--surface)] shadow-[0_14px_34px_rgba(26,15,0,0.12)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="typewriter-label border-b border-[color:var(--border-soft)] px-4 py-3 text-[color:var(--secondary)] last:border-b-0 hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
