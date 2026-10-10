import Link from "next/link";
import { club } from "@/app/_content/club";
import pill from "../ui/pill";
import Container from "../ui/container";
import NavLink from "./nav-link";

export default function Header() {
  return (
    <header>
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4.5">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 text-xl font-extrabold tracking-[-0.02em]">
          <svg width="22" height="28" viewBox="0 0 22 28" fill="none" className="stroke-fairway" strokeWidth="2" aria-hidden="true">
            <path d="M4 27V2l14 6-14 6" />
          </svg>
          {club.name}
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-medium">
          <NavLink href="/club">The club</NavLink>
          <NavLink href="/group-days">Group days</NavLink>
          <Link href="#contact" className="min-h-11 rounded-full px-4 py-2.75 transition-colors hover:bg-panel">
            Contact
          </Link>
          <Link href={club.teeTimeUrl} className={pill("dark", "text-[15px] font-medium")}>
            Book a tee time
          </Link>
        </nav>
      </Container>
    </header>
  );
}
