import { Clubhouse } from "./_components/sections/club/clubhouse";
import { Course } from "./_components/sections/club/course";
import { GroupDaysTeaser } from "./_components/sections/club/group-days-teaser";
import { Intro } from "./_components/sections/club/intro";

// The club's home page: the course and the clubhouse. Group days have their own page.
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
