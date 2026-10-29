import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { StartupLeadership } from "@/components/sections/StartupLeadership";
import { EducationAchievements } from "@/components/sections/EducationAchievements";
import { Skills } from "@/components/sections/Skills";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <StartupLeadership />
      <EducationAchievements />
      <Skills />
      <Process />
      <Contact />
    </>
  );
}
