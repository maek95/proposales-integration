/** A pill stepper: − quantity +. Labels name what's counted ("green fees"). */
export function Stepper({
  value,
  min = 0,
  max,
  label,
  onChange,
}: {
  value: number;
  min?: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
}) {
  const button =
    "grid size-11 place-items-center rounded-full text-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fairway";
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white p-1">
      <button
        type="button"
        aria-label={`Fewer: ${label}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={`${button} bg-stepper text-ink`}
      >
        −
      </button>
      <output aria-live="polite" aria-label={label} className="min-w-9 text-center text-lg font-bold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        aria-label={`More: ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={`${button} bg-fairway text-white`}
      >
        +
      </button>
    </div>
  );
}
