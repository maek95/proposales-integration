import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/heading";
import { PhotoPlaceholder } from "../../ui/photo-placeholder";

export function Clubhouse() {
  return (
    <section>
      <Container className="flex flex-wrap items-center gap-x-16 gap-y-8 pt-22">
        <PhotoPlaceholder label="the clubhouse terrace over the 18th" className="h-80 flex-[1_1_360px]" />
        <div className="flex-[1_1_360px]">
          <SectionHeading className="mb-5">The clubhouse</SectionHeading>
          <div className="max-w-[34em] space-y-4 text-muted">
            <p>
              The restaurant serves lunch of the day from 11, and the terrace looks straight down
              the 18th. There&apos;s a pro shop for balls, gloves and rental clubs, and changing
              rooms with showers.
            </p>
            <p>New to golf? The club pro runs taster sessions every weekend through the summer.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
