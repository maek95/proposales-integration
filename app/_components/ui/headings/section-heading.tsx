import type { ReactNode } from "react";

/** The heading of a section within a page. */
export default function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={className}>
      {children}
    </h2>
  );
}
