import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";
import { club } from "./_content/club";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: club.name, template: `%s - ${club.name}` },
  description: club.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-base leading-normal">
        <Header />
        {/* Positioned, so the landing photo can sit behind both the page and the footer. */}
        <div className="relative isolate flex flex-1 flex-col">
          <main className="flex-1 landing:flex landing:flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
