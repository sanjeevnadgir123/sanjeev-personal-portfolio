"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { DESKTOP_MOTION, MOBILE_MOTION, MOTION_OK, gsap, useScopedGsap } from "@/lib/gsap";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);
const ease = [0.22, 1, 0.36, 1] as const;

export function Work() {
  const root = useRef<HTMLElement>(null);

  useScopedGsap(root, (mm, el) => {
    const q = gsap.utils.selector(el);

    // Heading reveal (all breakpoints).
    mm.add(MOTION_OK, () => {
      gsap.from(q("[data-work-head]"), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: q("[data-work-header]")[0], start: "top 80%" },
      });
    });

    // Desktop: pinned horizontal showcase.
    mm.add(DESKTOP_MOTION, () => {
      const pin = q("[data-pin]")[0] as HTMLElement;
      const track = q("[data-track]")[0] as HTMLElement;
      const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

      gsap.set(pin, { overflow: "hidden" });

      const scroller = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        q("[data-progress]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: true },
        },
      );

      // Each key visual eases from a slight zoom as it travels into frame.
      q("[data-visual-scale]").forEach((v) => {
        gsap.fromTo(
          v,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: v, containerAnimation: scroller, start: "left right", end: "center 55%", scrub: true },
          },
        );
      });

      // Titles unmask as each panel arrives.
      q("[data-panel]").forEach((panel, i) => {
        const title = panel.querySelector("[data-title]");
        if (!title) return;
        gsap.from(title, {
          yPercent: 105,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger:
            i < 2
              ? { trigger: pin, start: "top 55%" }
              : { trigger: panel, containerAnimation: scroller, start: "left 80%" },
        });
      });
    });

    // Tablet / mobile: vertical editorial list with scroll-scaled imagery.
    mm.add(MOBILE_MOTION, () => {
      q("[data-visual-scale]").forEach((v) => {
        gsap.fromTo(
          v,
          { scale: 1.18 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: v, start: "top bottom", end: "center center", scrub: true } },
        );
      });
      q("[data-title]").forEach((t) => {
        gsap.from(t, { yPercent: 105, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 90%" } });
      });
    });
  });

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative bg-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="coral-light absolute top-10 -left-40 size-[40rem] opacity-50" />
      </div>

      <div
        data-pin
        className="relative flex flex-col lg:motion-safe:h-[100svh] lg:motion-safe:min-h-[700px] lg:motion-safe:overflow-x-auto"
      >
        {/* Header */}
        <div
          data-work-header
          className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-5 pt-28 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pt-28 lg:motion-safe:pt-20"
        >
          <div>
            <p className="label mb-4 flex items-center gap-3">
              <span className="text-coral">(01)</span> Featured Projects
            </p>
            <h2 id="work-title" className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em] lg:motion-safe:text-[clamp(3rem,5vw,5.5rem)]">
              <span className="mask lg:motion-safe:mr-[0.22em] lg:motion-safe:inline-block">
                <span data-work-head className="block">
                  Featured
                </span>
              </span>
              <span className="mask lg:motion-safe:inline-block">
                <span data-work-head className="block italic text-paper/90">
                  projects<span className="text-coral">.</span>
                </span>
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-paper/65 lg:pb-3 lg:text-right">
            Four engineering systems and practical applications exploring networking, deep learning, mobile architectures, and generative AI.
          </p>
        </div>

        {/* Track */}
        <div className="relative flex flex-1 items-center lg:motion-safe:pb-12">
          <ol
            data-track
            className="flex w-full flex-col gap-24 px-5 pt-16 pb-28 sm:px-8 lg:px-12 lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-[6vw] lg:motion-safe:py-0 lg:motion-safe:pr-[10vw]"
          >
            {projects.map((p, i) => {
              const flip = i % 2 === 1;
              return (
                <li
                  key={p.slug}
                  data-panel
                  className={cn(
                    "relative w-full shrink-0 md:w-[85%] lg:w-[68%]",
                    flip ? "md:self-end" : "md:self-start",
                    "lg:motion-safe:w-auto lg:motion-safe:self-auto",
                  )}
                >
                  <MotionLink
                    href={`/work/${p.slug}`}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileFocus="hover"
                    className={cn("group flex flex-col gap-6", flip && "lg:motion-safe:flex-col-reverse")}
                  >
                    {/* Visual */}
                    <div
                      className={cn(
                        "relative aspect-[16/10] w-full overflow-hidden rounded-[3px] bg-ink-3",
                        flip ? "lg:motion-safe:h-[36vh] lg:motion-safe:w-auto" : "lg:motion-safe:h-[42vh] lg:motion-safe:w-auto",
                      )}
                    >
                      <div data-visual-scale className="absolute inset-0">
                        <motion.div
                          className="absolute inset-0"
                          variants={{ rest: { scale: 1, filter: "saturate(0.88) brightness(0.95)" }, hover: { scale: 1.045, filter: "saturate(1) brightness(1.02)" } }}
                          transition={{ duration: 0.9, ease }}
                        >
                          <ProjectVisual slug={p.slug} className="h-full w-full" />
                        </motion.div>
                      </div>
                      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                      <div aria-hidden className="viewfinder opacity-50" style={{ inset: "0.75rem" }} />
                      <motion.span
                        aria-hidden
                        variants={{ rest: { y: 16, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
                        transition={{ duration: 0.5, ease }}
                        className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-xs font-medium text-ink"
                      >
                        View engineering details <ArrowUpRight className="size-3.5" />
                      </motion.span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-start justify-between gap-6 lg:motion-safe:max-w-[min(46vh*1.6,720px)]">
                      <div className="min-w-0">
                        <p className="label mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-coral">{p.index}</span>
                          <span>{p.category}</span>
                          <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.6rem] tracking-[0.14em]">
                            Verified Project
                          </span>
                        </p>
                        <h3 className="mask font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-0.015em] lg:motion-safe:text-[clamp(1.75rem,2.3vw,2.35rem)]">
                          <span data-title className="block break-words">
                            {p.title}
                          </span>
                        </h3>
                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper/65 lg:motion-safe:line-clamp-2">
                          {p.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.stack.slice(0, 3).map((tech) => (
                            <span key={tech} className="rounded-sm bg-ink-2 px-2 py-0.5 font-mono text-[0.65rem] text-paper/60 border border-line">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <motion.span
                        aria-hidden
                        variants={{ rest: { rotate: 0, backgroundColor: "rgba(247,245,242,0)" }, hover: { rotate: 45, backgroundColor: "#ff3f6c" } }}
                        transition={{ duration: 0.5, ease }}
                        className="mt-1 grid size-12 shrink-0 place-items-center rounded-full border border-line-strong"
                      >
                        <ArrowUpRight className="size-5" />
                      </motion.span>
                    </div>
                  </MotionLink>
                </li>
              );
            })}

            {/* Closing card */}
            <li
              data-panel
              className="flex w-full shrink-0 flex-col justify-center gap-6 border-t border-line pt-12 md:w-[85%] lg:motion-safe:w-[32vw] lg:motion-safe:border-t-0 lg:motion-safe:border-l lg:motion-safe:pt-0 lg:motion-safe:pl-[4vw]"
            >
              <p className="label text-coral">Collaborate</p>
              <p className="font-serif text-[clamp(2.25rem,3.4vw,3.5rem)] leading-[1.05] tracking-[-0.01em]">
                Let&apos;s build something <em className="text-coral">impactful.</em>
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-paper/60">
                Open to software engineering roles, AI research collaborations, and startup discussions.
              </p>
              <div>
                <Button href="/#contact">Get in Touch</Button>
              </div>
            </li>
          </ol>
        </div>

        {/* Desktop progress rail */}
        <div aria-hidden className="absolute inset-x-12 bottom-7 hidden h-px bg-line lg:motion-safe:block">
          <div data-progress className="h-full origin-left bg-coral" />
        </div>
      </div>
    </section>
  );
}
