import Image from "next/image";
import Link from "next/link";
import { club } from "./_lib/club";
import { photos } from "./_lib/photos";
import pill from "./_components/ui/pill";

// The landing page: the course, and the two ways in - the club, or a group day.
export default function LandingPage() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-80px)] items-center justify-center overflow-hidden px-6 py-24 text-center text-white">
      <Image
        {...photos.hero}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-ink/30 via-ink/35 to-ink/65" />
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase">{club.name}</p>
        <h1 className="mb-6 text-[clamp(44px,8vw,104px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
          Golf among the pines.
        </h1>
        <p className="mx-auto mb-10 max-w-[32em] text-[19px]">{club.intro}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/club" className={pill("light")}>
            The club & tee times
          </Link>
          <Link href="/group-days" className={pill("outline", "min-h-13 px-6.5")}>
            Plan a group day
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
