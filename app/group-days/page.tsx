import type { Metadata } from "next";
import { Intro } from "../_components/sections/group-days/intro";
import { RequestSection } from "../_components/sections/group-days/request-section";

export const metadata: Metadata = {
  title: "Company & group days",
  description: "Put together a golf day for your company or group and get an offer from the club.",
};

export default function GroupDaysPage() {
  return (
    <>
      <Intro />
      <RequestSection />
    </>
  );
}
