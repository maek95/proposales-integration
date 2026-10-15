import Container from "@/app/_components/ui/container";
import PageHeading from "@/app/_components/ui/headings/page-heading";
import Steps from "@/app/_components/ui/steps";
import Text from "@/app/_components/ui/text";

// What happens after Send - the club reviews in Proposales and the offer comes by email.
const steps = [
  { title: "Put your day together", text: "Green fees, carts and lunch, a date and who you are." },
  { title: "The club sends an offer", text: "We check availability and email you an offer, usually within a day." },
  { title: "Adjust and sign", text: "Add extras, change numbers and sign right in the offer." },
];

export default function Intro() {
  return (
    <section>
      <Container className="pt-12 pb-22">
        <PageHeading>Golf for the whole team.</PageHeading>
        <Text variant="lead" className="mb-12 text-muted">
          Company days, customer events and golf societies, put together online and confirmed by
          the club.
        </Text>
        <Steps steps={steps} />
      </Container>
    </section>
  );
}
