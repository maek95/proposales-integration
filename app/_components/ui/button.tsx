import type { ComponentProps } from "react";
import pill, { type PillVariant } from "./pill";

export default function Button({
  variant,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant: PillVariant }) {
  return <button type={type} className={pill(variant, className)} {...props} />;
}
