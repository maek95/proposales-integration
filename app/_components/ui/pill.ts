const variants = {
  /** The main action on a light background. */
  primary: "min-h-13 px-6.5 bg-fairway text-white hover:bg-fairway/90",
  /** The main action on the dark summary panel. */
  mint: "min-h-13.5 w-full text-[17px] font-bold bg-mint text-ink hover:bg-mint/90 disabled:bg-subtle disabled:text-ink/70",
  /** The main action on a photo. */
  light: "min-h-13 px-6.5 bg-white text-ink hover:bg-white/90",
  /** A quieter dark pill, for the header. */
  dark: "min-h-11 px-4.5 bg-ink text-white hover:bg-ink/85",
  /** On a coloured panel or a photo. */
  outline: "min-h-12 px-5.5 border-[1.5px] border-current bg-transparent hover:bg-white/10",
};

export type PillVariant = keyof typeof variants;

/** The pill classes, for links that look like buttons. */
export default function pill(variant: PillVariant, className = "") {
  return `inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fairway ${variants[variant]} ${className}`;
}
