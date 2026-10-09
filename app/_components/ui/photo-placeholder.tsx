/** Striped green stand-in for a photo the club doesn't have yet. `label` says what it will show. */
export function PhotoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={`flex items-end rounded-panel bg-[repeating-linear-gradient(115deg,var(--color-grass)_0_70px,var(--color-grass-light)_70px_140px)] p-6 text-sm text-on-grass ${className}`}
    >
      Photo · {label}
    </div>
  );
}
