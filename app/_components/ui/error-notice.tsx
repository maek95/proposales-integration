import type { ReactNode } from "react";

/** Inline error for a feature whose integration failed - the rest of the page keeps working. */
export function ErrorNotice({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div role="alert" className="flex gap-3.5 rounded-card bg-danger-bg px-5 py-4.5 text-danger-text">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        className="mt-px shrink-0 stroke-danger-icon"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="9" />
        <path d="M11 6v6M11 15.5v.5" />
      </svg>
      <div>
        <strong>{title}</strong> {children}
      </div>
    </div>
  );
}
