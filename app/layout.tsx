import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";
import { club } from "./_lib/club";
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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
