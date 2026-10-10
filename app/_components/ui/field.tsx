import type { ComponentProps } from "react";
import fieldControl from "./field-control";

/** A labelled input with its error message underneath. `name` also names the error's id. */
export default function Field({
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
        className={`h-12 ${fieldControl(error)}`}
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
