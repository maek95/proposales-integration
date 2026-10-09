import type { ComponentProps } from "react";

export default function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-page px-6 ${className}`} {...props} />;
}
