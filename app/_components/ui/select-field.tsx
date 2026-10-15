import type { ComponentProps } from "react";
import fieldControl from "./field-control";

/** A labelled select with its error message underneath - `Field`, for a fixed list of choices. */
export default function SelectField({
  label,
  error,
  name,
  children,
  ...select
}: ComponentProps<"select"> & { label: string; name: string; error?: string }) {
  const errorId = `${name}-error`;
  return (
    <label className="flex flex-[1_1_300px] flex-col gap-1.5 text-label">
      {label}
      <select
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-12 ${fieldControl(error)} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
        {...select}
      >
        {children}
      </select>
      {error && (
        <span id={errorId} className="font-semibold text-field-error">
          {error}
        </span>
      )}
    </label>
  );
}
