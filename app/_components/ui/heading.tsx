import type { ReactNode } from "react";

/** The big headline at the top of a page. */
export function PageHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-6 max-w-[11em] text-[clamp(44px,8vw,104px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
      {children}
    </h1>
  );
}

export function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[clamp(32px,5vw,44px)] leading-[1.05] font-extrabold tracking-[-0.03em] ${className}`}>
      {children}
    </h2>
  );
}
