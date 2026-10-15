import Image from "next/image";
import Link from "next/link";
import { club } from "./_content/club";
import { photos } from "./_content/photos";
import pill from "./_components/ui/pill";
import Text from "@/app/_components/ui/text";

// The landing page: the course, and the two ways in - the club, or a group day. The photo fills
// everything below the header, footer included: it's positioned against the layout's wrapper
// around the page and the footer, and `data-landing` switches the footer to white on the photo.
export default function LandingPage() {
  return (
    <section
      data-landing
      className="flex flex-1 items-center justify-center px-6 py-24 text-center text-white"
    >
      <Image
        src={photos.hero.src}
        alt={photos.hero.alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        // Paint the photo together with the page, never the page without it: with the default
        // ("async") Chrome showed the grey overlay for a few frames on every reload, while the
        // already-cached photo was still being decoded.
        decoding="sync"
        placeholder="blur"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-ink/30 via-ink/35 to-ink/65" />
      <div className="max-w-3xl">
        <Text variant="eyebrow" className="mb-4">
          {club.name}
        </Text>
        <h1 className="mb-6">
          Golf among the pines.
        </h1>
        <Text variant="lead" className="mx-auto mb-10">
          {club.intro}
        </Text>
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
