import type { ComponentProps } from "react";

export function Container({
  className = "",
  ...props
}: ComponentProps<"div">) {
  return <div className={`mx-auto max-w-5xl px-6 ${className}`} {...props} />;
}
