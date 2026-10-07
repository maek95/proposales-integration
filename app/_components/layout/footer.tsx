import { Container } from "../ui/container";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <Container className="py-8 text-sm text-foreground/60">
        Built on the{" "}
        <a
          href="https://docs.proposales.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Proposales API
        </a>
      </Container>
    </footer>
  );
}
