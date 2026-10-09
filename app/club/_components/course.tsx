import Container from "@/app/_components/ui/container";
import SectionHeading from "@/app/_components/ui/headings/section-heading";

const facts = [
  { value: "18", label: "holes" },
  { value: "72", label: "par" },
  { value: "6 012 m", label: "from the yellow tees" },
  { value: "Apr–Oct", label: "season" },
];

export default function Course() {
  return (
    <section>
      <Container className="flex flex-wrap items-start gap-x-16 gap-y-8 pt-22">
        <div className="flex-[1_1_360px]">
          <SectionHeading className="mb-5">The course</SectionHeading>
          <div className="max-w-[34em] space-y-4 text-muted">
            <p>
              The front nine winds through old pine forest, narrow and sheltered. The back nine
              opens up along the lake, where the wind decides how long the 14th plays.
            </p>
            <p>
              Fair for high handicappers, with enough water and sand to keep a low one honest. A
              driving range, chipping green and putting green sit next to the first tee.
            </p>
          </div>
        </div>
        <dl className="grid flex-[1_1_360px] grid-cols-2 gap-2.5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse rounded-card bg-panel px-5 py-5">
              <dt className="text-sm text-subtle">{fact.label}</dt>
              <dd className="text-[40px] leading-tight font-extrabold tracking-[-0.03em] tabular-nums">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
