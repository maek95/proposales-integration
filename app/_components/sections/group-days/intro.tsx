import { Container } from "../../ui/container";
import { PageHeading } from "../../ui/heading";

// What happens after Send - the club reviews in Proposales and the offer comes by email.
const steps = [
  { title: "Put your day together", text: "Green fees, carts and lunch, a date and who you are." },
  { title: "The club sends an offer", text: "We check availability and email you an offer, usually within a day." },
  { title: "Adjust and sign", text: "Add extras, change numbers and sign right in the offer." },
];

export function Intro() {
  return (
    <section>
      <Container className="pt-12 pb-22">
        <PageHeading>Golf for the whole team.</PageHeading>
        <p className="mb-12 max-w-[32em] text-[19px] text-muted">
          Company days, customer events and golf societies, put together online and confirmed by
          the club.
        </p>
        <ol className="grid gap-2.5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-card bg-panel px-5 py-5">
              <div className="mb-2 grid size-8 place-items-center rounded-full bg-fairway text-sm font-bold text-white">
                {i + 1}
              </div>
              <div className="text-[17px] font-bold">{step.title}</div>
              <p className="text-sm text-subtle">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
