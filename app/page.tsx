import { Footer } from "./_components/layout/footer";
import { Header } from "./_components/layout/header";
import { Companies } from "./_components/sections/companies";
import { Hero } from "./_components/sections/hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Companies />
      </main>
      <Footer />
    </>
  );
}
