import type { ReactNode } from "react";

/** The big headline at the top of a page. */
export default function PageHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-6 max-w-[11em] text-[clamp(44px,8vw,104px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
      {children}
    </h1>
  );
}
