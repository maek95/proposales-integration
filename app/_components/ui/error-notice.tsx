import type { ReactNode } from "react";

/** Inline error for a feature whose integration failed - the rest of the page keeps working. */
export function ErrorNotice({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div
      role="alert"
      className="rounded-md border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm"
    >
      <p className="font-medium text-red-700 dark:text-red-400">{title}</p>
      {children && <p className="mt-1 text-foreground/70">{children}</p>}
    </div>
  );
}
