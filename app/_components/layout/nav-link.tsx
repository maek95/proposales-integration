"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** A header link that marks itself as the current page. */
export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const current = usePathname() === href;
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`px-3 py-2.75 hover:text-fairway ${current ? "font-bold text-fairway" : ""}`}
    >
      {children}
    </Link>
  );
}
