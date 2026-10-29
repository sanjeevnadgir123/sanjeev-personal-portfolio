"use client";

import { useRef } from "react";
import { DESKTOP_MOTION, MOBILE_MOTION, MOTION_OK, gsap, useScopedGsap } from "@/lib/gsap";

const STEPS = [
  { n: "01", title: "Analyze", body: "Deconstruct the core engineering problem, requirements, and data constraints." },
  { n: "02", title: "Architect", body: "Design clean client-server protocols, schemas, and robust API contracts." },
  { n: "03", title: "Implement", body: "Build with typed languages, modern frameworks, and applied ML pipelines." },
  { n: "04", title: "Optimize", body: "Benchmark performance, verify concurrency, and refine end-user responsiveness." },
];

export function Process() {
  const root = useRef<HTMLElement>(null);

  useScopedGsap(root, (mm, el) => {
    const q = gsap.utils.selector(el);
    mm.add(MOTION_OK, () => {
      gsap.from(q("[data-process-head]"), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      gsap.from(q("[data-step]"), {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: q("[data-steps]")[0], start: "top 80%" },
      });
    });
    // The rail draws with scroll: horizontal on desktop, vertical on mobile.
    mm.add(DESKTOP_MOTION, () => {
      gsap.fromTo(
        q("[data-rail-x]"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: q("[data-steps]")[0], start: "top 75%", end: "bottom 60%", scrub: true } },
      );
    });
    mm.add(MOBILE_MOTION, () => {
      gsap.fromTo(
        q("[data-rail-y]"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: q("[data-steps]")[0], start: "top 70%", end: "bottom 60%", scrub: true } },
      );
    });
  });

  return (
    <section ref={root} id="process" aria-labelledby="process-title" className="relative overflow-hidden bg-ink py-28 lg:py-36">
      <div aria-hidden className="coral-light absolute -bottom-40 left-1/2 size-[44rem] -translate-x-1/2 opacity-35" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <p className="label mb-4 flex items-center gap-3">
            <span className="text-coral">(06)</span> Engineering Process
          </p>
          <h2 id="process-title" className="font-serif text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            <span className="mask">
              <span data-process-head className="block">
                From concept
              </span>
            </span>
            <span className="mask">
              <span data-process-head className="block italic text-paper/90">
                to reliable execution<span className="text-coral">.</span>
              </span>
            </span>
          </h2>
        </div>

        <div data-steps className="relative">
          {/* Rails */}
          <span aria-hidden className="absolute inset-x-0 top-0 hidden h-px bg-line lg:block" />
          <span data-rail-x aria-hidden className="absolute inset-x-0 top-0 hidden h-px origin-left bg-coral lg:block" />
          <span aria-hidden className="absolute top-0 bottom-0 left-[0.4rem] w-px bg-line lg:hidden" />
          <span data-rail-y aria-hidden className="absolute top-0 bottom-0 left-[0.4rem] w-px origin-top bg-coral lg:hidden" />

          <ol className="grid gap-14 lg:grid-cols-4 lg:gap-10">
            {STEPS.map((s) => (
              <li key={s.n} data-step className="group relative pl-10 lg:pt-12 lg:pl-0">
                <span
                  aria-hidden
                  className="absolute top-1.5 left-0 size-[0.85rem] rounded-full border border-coral bg-ink transition-colors duration-500 group-hover:bg-coral lg:-top-[0.42rem]"
                />
                <p className="outline-text font-serif text-[clamp(3.5rem,6vw,6.5rem)] leading-none transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke-color:var(--color-coral)]">
                  {s.n}
                </p>
                <h3 className="mt-4 font-serif text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-paper/60">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
