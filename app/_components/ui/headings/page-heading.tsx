import type { ReactNode } from "react";

/** The big headline at the top of a page. */
export default function PageHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-6 max-w-[11em]">
      {children}
    </h1>
  );
}
