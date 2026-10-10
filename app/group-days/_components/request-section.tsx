import { attempt } from "@/app/_clients/http";
import { getProducts } from "@/app/_clients/golf-booking";
import Container from "@/app/_components/ui/container";
import SectionHeading from "@/app/_components/ui/headings/section-heading";
import RequestForm from "./request-form";

// Server Component: loads the club's products from the golf booking system and hands them to
// the interactive form. Without prices the form can't work, so it shows why and disables Send.
export default async function RequestSection() {
  const products = await attempt(getProducts);

  return (
    <section id="request">
      <Container className="pb-20">
        <SectionHeading className="mb-9">Put your day together</SectionHeading>
        {products.ok ? (
          <RequestForm products={products.data} />
        ) : (
          <RequestForm products={null} productsError={products.message} />
        )}
      </Container>
    </section>
  );
}
