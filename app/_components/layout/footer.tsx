import Link from "next/link";
import { club } from "@/app/_content/club";
import Container from "../ui/container";

export default function Footer() {
  return (
    <footer id="contact" className="bg-panel">
      <Container className="flex flex-wrap justify-between gap-x-6 gap-y-4 py-10 text-sm text-muted">
        <span className="font-extrabold text-ink">{club.name}</span>
        <span>
          {club.address} · {club.phone} · {club.email}
        </span>
        <span className="basis-full text-xs">
          A fictional club. This site is a demo of the{" "}
          <Link href="https://proposales.com" className="underline hover:text-ink">
            Proposales
          </Link>{" "}
          API.
        </span>
      </Container>
    </footer>
  );
}
