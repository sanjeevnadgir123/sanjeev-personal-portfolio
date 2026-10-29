"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { MOTION_OK, gsap, useScopedGsap } from "@/lib/gsap";
import { site } from "@/lib/site";

export function StartupLeadership() {
  const root = useRef<HTMLElement>(null);

  useScopedGsap(root, (mm, el) => {
    const q = gsap.utils.selector(el);
    mm.add(MOTION_OK, () => {
      gsap.from(q("[data-section-head]"), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      gsap.from(q("[data-card]"), {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: q("[data-grid]")[0], start: "top 80%" },
      });
    });
  });

  return (
    <section ref={root} id="startup" aria-labelledby="startup-title" className="relative overflow-hidden bg-ink-2 py-28 lg:py-36">
      <div aria-hidden className="coral-light absolute -top-40 right-1/4 size-[40rem] opacity-35" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="label mb-4 flex items-center gap-3">
            <span className="text-coral">(03)</span> Startup &amp; Leadership
          </p>
          <h2 id="startup-title" className="font-serif text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            <span className="mask">
              <span data-section-head className="block">
                Building ventures
              </span>
            </span>
            <span className="mask">
              <span data-section-head className="block italic text-paper/90">
                &amp; leading initiatives<span className="text-coral">.</span>
              </span>
            </span>
          </h2>
        </div>

        {/* Startup Feature: Geminal Studio */}
        <div data-card className="group relative mb-16 overflow-hidden rounded-[3px] border border-line-strong bg-ink p-8 transition-colors duration-500 hover:border-coral/50 sm:p-12 lg:mb-20">
          <div aria-hidden className="viewfinder opacity-40" />
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-coral/10 border border-coral/30 px-3 py-1 font-mono text-xs tracking-wider text-coral uppercase">
                  Technology Startup
                </span>
                <span className="label text-paper/60">Founded · Active</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                {site.startup.company}
              </h3>
              <p className="mt-2 font-mono text-xs tracking-widest uppercase text-coral">
                {site.startup.role}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/75 sm:text-lg sm:leading-relaxed">
                {site.startup.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
              <a
                href={site.startup.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex h-12 items-center gap-3 rounded-full bg-paper px-6 text-sm font-medium text-ink transition-all hover:bg-coral hover:text-paper"
              >
                <span>View Company Profile</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
              <span className="font-mono text-xs text-paper/40">Verified Google Drive Dossier</span>
            </div>
          </div>
        </div>

        {/* Leadership & Event Coordination Grid */}
        <div>
          <p className="label mb-6 text-paper/70">Leadership &amp; Event Coordination</p>
          <div data-grid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.leadership.map((item, idx) => (
              <div
                key={item.event}
                data-card
                className="group relative rounded-[3px] border border-line bg-ink p-7 transition-all duration-500 hover:border-line-strong hover:bg-ink-3"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="label text-coral">0{idx + 1}</span>
                  <span className="font-mono text-xs text-paper/45">{item.year}</span>
                </div>
                <h4 className="font-serif text-2xl text-paper transition-colors group-hover:text-coral">
                  {item.role}
                </h4>
                <p className="mt-2 font-mono text-xs tracking-wider uppercase text-paper/70">
                  {item.event}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-paper/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
