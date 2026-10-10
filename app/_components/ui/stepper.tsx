/** A pill stepper: − quantity +. Calls `onStep` with -1 or +1; the owner applies it. */
export default function Stepper({
  value,
  min = 0,
  max,
  label,
  onStep,
}: {
  value: number;
  min?: number;
  max: number;
  label: string;
  /** Applied to the current value, so quick clicks don't use a stale one. */
  onStep: (step: -1 | 1) => void;
}) {
  const button =
    "grid size-11 place-items-center rounded-full text-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fairway";
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white p-1">
      <button
        type="button"
        aria-label={`Fewer: ${label}`}
        disabled={value <= min}
        onClick={() => onStep(-1)}
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
        onClick={() => onStep(1)}
        className={`${button} bg-fairway text-white`}
      >
        +
      </button>
    </div>
  );
}
