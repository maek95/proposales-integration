import Link from "next/link";
import { club } from "@/app/_content/club";
import pill from "@/app/_components/ui/pill";
import Container from "@/app/_components/ui/container";
import PageHeading from "@/app/_components/ui/headings/page-heading";
import Photo from "@/app/_components/ui/photo";
import { photos } from "@/app/_content/photos";
import Text from "@/app/_components/ui/text";

export default function Intro() {
  return (
    <section>
      <Container className="pt-12">
        <PageHeading>Welcome to {club.name}.</PageHeading>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <Text variant="lead" className="flex-[1_1_320px] text-muted">
            Visitors are welcome all season, April to October. Book a tee time online, and stay for
            lunch on the terrace.
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={club.teeTimeUrl} className={pill("primary")}>
              Book a tee time
            </Link>
            <Link href="/group-days" className="px-3 py-3 font-semibold text-fairway hover:underline">
              Coming as a group?
            </Link>
          </div>
        </div>
        <Photo {...photos.lakeGreen} sizes="(min-width: 1200px) 1152px, 100vw" className="h-110" />
      </Container>
    </section>
  );
}
