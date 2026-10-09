"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** A header link that marks itself as the current page. */
export default function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const current = usePathname() === href;
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`min-h-11 rounded-full px-4 py-2.75 transition-colors ${
        current ? "bg-fairway font-semibold text-white" : "hover:bg-panel"
      }`}
    >
      {children}
    </Link>
  );
}
