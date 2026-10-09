import Link from "next/link";
import { pill } from "../../ui/button";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/heading";

export function GroupDaysTeaser() {
  return (
    <section>
      <Container className="pt-22 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 rounded-panel bg-fairway px-10 py-14 text-white">
          <div className="max-w-[36em] flex-[1_1_360px]">
            <SectionHeading className="mb-4">Bring the whole team.</SectionHeading>
            <p className="text-[19px] text-on-fairway-muted">
              Company days, customer events and golf societies. Pick green fees, carts and lunch
              online, and the club emails you an offer.
            </p>
          </div>
          <Link href="/group-days" className={pill("outline")}>
            Plan a group day
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
