import type { HTMLAttributes } from "react";

// Text by what it is, not by its size: the variant decides size, weight and spacing, so two leads
// always look alike. `className` is for colour and margins only - never a size. Headings aren't
// here: <h1>-<h6> get theirs from app/globals.css.
const variants = {
  /** The paragraph that says what a page or section is about. */
  lead: "max-w-[32em] text-lead",
  /** Small capitals over a headline. */
  eyebrow: "text-label uppercase tracking-eyebrow",
  /** A big number - the total, a fact about the course. */
  stat: "text-stat tabular-nums",
  /** The name of something in a list - a product, a step. */
  item: "text-item",
  /** Supporting text - a price, a unit, a short description. */
  caption: "text-caption",
  /** The smallest print - terms, notes, tags. */
  fine: "text-fine",
  /** Names what's next to it - "Your day", "Indicative total". */
  label: "text-label",
};

export type TextVariant = keyof typeof variants;

export default function Text({
  variant,
  as: Element = "p",
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & {
  variant: TextVariant;
  /** The element, when a paragraph isn't the right one. */
  as?: "p" | "span" | "div" | "dt" | "dd";
}) {
  return <Element className={`${variants[variant]} ${className}`} {...props} />;
}
