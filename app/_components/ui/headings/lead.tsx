import type { ReactNode } from "react";

/** The subtitle under a PageHeading. */
export default function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`max-w-[32em] text-[19px] text-muted ${className}`}>{children}</p>;
}
