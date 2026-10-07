import type { ReactNode } from "react";
import { Container } from "./container";

/** A full-width page section with a centred container. */
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <Container className="py-20">{children}</Container>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>;
}
