import { Container } from "../ui/container";

export function Header() {
  return (
    <header className="border-b border-foreground/10">
      <Container className="flex h-16 items-center">
        <span className="font-semibold">Proposales integration</span>
      </Container>
    </header>
  );
}
