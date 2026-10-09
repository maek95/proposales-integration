import type { ComponentProps } from "react";

/** A labelled input with its error message underneath. `name` also names the error's id. */
export function Field({
  label,
  error,
  name,
  ...input
}: ComponentProps<"input"> & { label: string; name: string; error?: string }) {
  const errorId = `${name}-error`;
  return (
    <label className="flex flex-[1_1_300px] flex-col gap-1.5 text-sm font-semibold">
      {label}
      <input
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-12 rounded-xl bg-white px-3.5 text-base font-normal text-ink outline-none focus-visible:ring-2 focus-visible:ring-fairway/40 ${
          error ? "border-2 border-field-error" : "border-[1.5px] border-line focus-visible:border-fairway"
        }`}
        {...input}
      />
      {error && (
        <span id={errorId} className="font-semibold text-field-error">
          {error}
        </span>
      )}
    </label>
  );
}
