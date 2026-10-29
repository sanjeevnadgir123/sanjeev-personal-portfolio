"use client";

import { useRef } from "react";
import { GraduationCap, Trophy } from "lucide-react";
import { MOTION_OK, gsap, useScopedGsap } from "@/lib/gsap";
import { site } from "@/lib/site";

export function EducationAchievements() {
  const root = useRef<HTMLElement>(null);

  useScopedGsap(root, (mm, el) => {
    const q = gsap.utils.selector(el);
    mm.add(MOTION_OK, () => {
      gsap.from(q("[data-edu-head]"), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      gsap.from(q("[data-edu-card]"), {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: q("[data-edu-grid]")[0], start: "top 80%" },
      });
      gsap.from(q("[data-achieve-card]"), {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: q("[data-achieve-grid]")[0], start: "top 80%" },
      });
    });
  });

  return (
    <section ref={root} id="education" aria-labelledby="edu-title" className="relative overflow-hidden bg-ink py-28 lg:py-36">
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="label mb-4 flex items-center gap-3">
            <span className="text-coral">(04)</span> Education &amp; Achievements
          </p>
          <h2 id="edu-title" className="font-serif text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            <span className="mask">
              <span data-edu-head className="block">
                Academic foundation
              </span>
            </span>
            <span className="mask">
              <span data-edu-head className="block italic text-paper/90">
                &amp; competitive honors<span className="text-coral">.</span>
              </span>
            </span>
          </h2>
        </div>

        {/* Two-column layout: Education Left, Achievements Right */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Education Column */}
          <div className="lg:col-span-6">
            <div className="mb-8 flex items-center gap-3">
              <GraduationCap className="size-5 text-coral" aria-hidden />
              <h3 className="label text-paper tracking-[0.16em]">Academic Background</h3>
            </div>
            <div data-edu-grid className="space-y-6">
              {site.education.map((edu, idx) => (
                <div
                  key={edu.degree}
                  data-edu-card
                  className="group relative rounded-[3px] border border-line bg-ink-2 p-7 transition-all duration-500 hover:border-line-strong hover:bg-ink-3"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <span className="label text-coral">0{idx + 1}</span>
                    <span className="rounded-full border border-coral/30 bg-coral/10 px-3 py-0.5 font-mono text-xs font-medium text-coral">
                      {edu.score}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl text-paper transition-colors group-hover:text-coral">
                    {edu.degree}
                  </h4>
                  <p className="mt-2 text-sm text-paper/85">
                    {edu.institution}
                  </p>
                  {"university" in edu && typeof (edu as Record<string, unknown>).university === "string" && (
                    <p className="mt-1 font-mono text-xs text-paper/50">
                      {String((edu as Record<string, unknown>).university)} · {edu.duration}
                    </p>
                  )}
                  <p className="mt-4 text-xs leading-relaxed text-paper/60">
                    {edu.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Column */}
          <div className="lg:col-span-6">
            <div className="mb-8 flex items-center gap-3">
              <Trophy className="size-5 text-coral" aria-hidden />
              <h3 className="label text-paper tracking-[0.16em]">Honors &amp; Hackathons</h3>
            </div>
            <div data-achieve-grid className="space-y-6">
              {site.achievements.map((item, idx) => (
                <div
                  key={item.event}
                  data-achieve-card
                  className="group relative rounded-[3px] border border-line bg-ink-2 p-7 transition-all duration-500 hover:border-line-strong hover:bg-ink-3"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <span className="label text-coral">0{idx + 1}</span>
                    <span className="font-mono text-xs text-paper/40">{item.year}</span>
                  </div>
                  <div className="inline-block rounded-sm bg-coral/15 px-2.5 py-1 font-mono text-xs font-semibold text-coral uppercase tracking-wide">
                    {item.rank}
                  </div>
                  <h4 className="mt-3 font-serif text-2xl text-paper transition-colors group-hover:text-coral">
                    {item.event}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-paper/60">
                    {item.organization}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/65">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
