import type { Metadata } from "next";
import Clubhouse from "./_components/clubhouse";
import Course from "./_components/course";
import GroupDaysTeaser from "./_components/group-days-teaser";
import Intro from "./_components/intro";

export const metadata: Metadata = {
  title: "The club",
};

// The club itself: the course and the clubhouse. Group days have their own page.
export default function ClubPage() {
  return (
    <>
      <Intro />
      <Course />
      <Clubhouse />
      <GroupDaysTeaser />
    </>
  );
}
