import type { ReactNode } from "react";

/** The heading of a section within a page. */
export default function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[clamp(32px,5vw,44px)] leading-[1.05] font-extrabold tracking-[-0.03em] ${className}`}>
      {children}
    </h2>
  );
}
