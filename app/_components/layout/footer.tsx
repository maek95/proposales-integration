import Link from "next/link";
import { club } from "@/app/_content/club";
import Container from "../ui/container";
import Text from "@/app/_components/ui/text";

export default function Footer() {
  return (
    // On the landing page it sits on the photo: no panel, white text (`landing:`, globals.css).
    <footer id="contact" className="bg-panel landing:bg-transparent">
      <Container className="flex flex-wrap justify-between gap-x-6 gap-y-4 py-10 text-caption text-muted landing:text-white/80">
        <span className="font-extrabold text-ink landing:text-white">{club.name}</span>
        <span>
          {club.address} · {club.phone} · {club.email}
        </span>
        <Text as="span" variant="fine" className="basis-full">
          A fictional club. This site is a demo of the{" "}
          <Link href="https://proposales.com" className="underline hover:text-ink landing:hover:text-white">
            Proposales
          </Link>{" "}
          API.
        </Text>
      </Container>
    </footer>
  );
}
