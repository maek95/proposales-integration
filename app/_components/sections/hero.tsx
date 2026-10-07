import { Section } from "../ui/section";

export function Hero() {
  return (
    <Section>
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight">
        [Headline for the app idea]
      </h1>
      <p className="mt-4 max-w-xl text-lg text-foreground/70">
        [One sentence on what it does with Proposales.]
      </p>
    </Section>
  );
}
