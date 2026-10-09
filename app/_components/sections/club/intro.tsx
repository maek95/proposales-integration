import Link from "next/link";
import { club } from "@/app/_lib/club";
import { pill } from "../../ui/button";
import { Container } from "../../ui/container";
import { PageHeading } from "../../ui/heading";
import { PhotoPlaceholder } from "../../ui/photo-placeholder";

export function Intro() {
  return (
    <section>
      <Container className="pt-12">
        <PageHeading>Golf among the pines.</PageHeading>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <p className="max-w-[32em] flex-[1_1_320px] text-[19px] text-muted">
            {club.intro} Visitors are welcome all season, April to October.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={club.teeTimeUrl} className={pill("primary")}>
              Book a tee time
            </Link>
            <Link href="/group-days" className="px-3 py-3 font-semibold text-fairway hover:underline">
              Coming as a group?
            </Link>
          </div>
        </div>
        <PhotoPlaceholder label="the 9th green by the lake, evening light" className="h-110" />
      </Container>
    </section>
  );
}
