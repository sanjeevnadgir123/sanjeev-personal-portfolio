"use client";

import { useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CinematicVideo } from "@/components/ui/CinematicVideo";
import { Button } from "@/components/ui/Button";
import { gsap, MOTION_OK, useScopedGsap } from "@/lib/gsap";
import { site } from "@/lib/site";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useScopedGsap(root, (mm) => {
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. The film opens like an aperture.
      tl.to(q("[data-hero='frame']"), { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
        .to(q("[data-hero='frame']"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.9, ease: "expo.inOut" }, 0)
        .fromTo(q("[data-film-scale]"), { scale: 1.25 }, { scale: 1, duration: 2.4, ease: "expo.inOut" }, 0)
        // 2. Bold Heading lines unmask with dynamic kinetic easing.
        .fromTo(
          q("[data-hero-line]"),
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.14, ease: "power4.out" },
          0.85,
        )
        // 3. Supporting UI settles in with gentle stagger.
        .fromTo(
          q("[data-hero='fade']"),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out" },
          1.2,
        );

      // Controlled parallax as the hero leaves (gentle scrub to prevent clipping)
      gsap.to(q("[data-parallax-film]"), {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-parallax-copy]"), {
        yPercent: -6,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
  });

  return (
    <section
      ref={root}
      id="top"
      aria-label="Introduction"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* ── Film ─────────────────────────────────────────────── */}
      <div
        data-parallax-film
        className="absolute inset-x-0 top-0 h-[58svh] sm:h-[62svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[74%]"
      >
        <div data-hero="frame" className="absolute inset-0">
          <div data-film-scale className="absolute inset-0">
            <CinematicVideo
              priority
              showControl
              controlClassName="top-20 right-5 sm:right-8 lg:top-auto lg:right-40 lg:bottom-12"
              className="absolute inset-0"
              objectPosition="50% 24%"
              label="Sanjeev Nadgir in cinematic studio lighting."
            >
              {/* Grade: blend the film into the ink background */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-ink via-ink/75 to-transparent lg:block" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-ink via-ink/80 to-transparent lg:h-1/3 lg:via-ink/40" />
              {/* Restrained coral rim light */}
              <div aria-hidden className="coral-light absolute top-[18%] right-[-12%] size-[46vmax] opacity-70 mix-blend-screen" />
            </CinematicVideo>
          </div>
        </div>
      </div>

      <div className="viewfinder z-10 hidden lg:block" style={{ inset: "5.5rem 1.5rem 1.5rem 1.5rem" }} aria-hidden />

      {/* ── Copy Container: Guaranteed non-overlapping layout with clear space below fixed navbar ──────────────── */}
      <div
        data-parallax-copy
        className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pt-28 pb-14 sm:px-8 sm:pb-16 lg:justify-start lg:px-12 lg:pt-32 lg:pb-16"
      >
        <div className="pointer-events-auto my-auto max-w-[44rem] lg:max-w-[min(52vw,50rem)]">
          {/* Distinct Non-Overlapping Role Badges on the left side */}
          <div data-hero="fade" className="mb-5 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-coral uppercase shadow-sm">
              <span className="size-1.5 rounded-full bg-coral animate-pulse" aria-hidden />
              Full-Stack Developer
            </span>
            <a
              href={site.startup.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-ink-2 px-3.5 py-1.5 font-mono text-xs tracking-wider text-paper/85 uppercase transition-all duration-300 hover:border-coral/60 hover:text-coral"
            >
              <span>Co-Founder &amp; CEO · Geminal Studio</span>
              <ArrowUpRight className="size-3 text-coral transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/70 px-3 py-1.5 font-mono text-xs tracking-wider text-paper/70 uppercase">
              AI/ML Enthusiast
            </span>
          </div>

          {/* Main Hero Heading with Bold Lettering & Kinetic Reveal Animation */}
          <h1
            aria-label={site.heroHeading}
            className="text-paper select-none"
          >
            <span className="mask mb-2.5 block">
              <span
                data-hero="rise"
                data-hero-line
                className="block font-sans text-[clamp(1.25rem,2.4vw,1.9rem)] font-bold tracking-[0.14em] uppercase text-paper/75"
              >
                Hi, I&apos;m
              </span>
            </span>
            <span className="mask block">
              <span
                data-hero="rise"
                data-hero-line
                className="block font-sans text-[clamp(2.85rem,7.2vw,6.25rem)] font-black leading-[0.98] tracking-[-0.035em] text-paper text-glow"
              >
                {site.name}
                <span className="text-coral">.</span>
              </span>
            </span>
          </h1>

          {/* Supporting Introduction */}
          <p
            data-hero="fade"
            className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg sm:leading-relaxed lg:mt-7"
          >
            {site.heroIntro}
          </p>

          {/* Quick Credential Chips */}
          <div data-hero="fade" className="mt-5 flex flex-wrap items-center gap-2 text-xs text-paper/60">
            <span className="rounded-full border border-line-strong bg-ink/70 px-3 py-1 font-mono text-[0.6875rem] tracking-wide text-paper/80">
              Software Developer
            </span>
            <span className="rounded-full border border-line-strong bg-ink/70 px-3 py-1 font-mono text-[0.6875rem] tracking-wide text-paper/80">
              Building Practical AI Solutions
            </span>
            <span className="rounded-full border border-line-strong bg-ink/70 px-3 py-1 font-mono text-[0.6875rem] tracking-wide text-paper/80">
              ECE @ AGM RCET, Hubballi
            </span>
            <span className="rounded-full border border-line-strong bg-ink/70 px-3 py-1 font-mono text-[0.6875rem] tracking-wide text-paper/80">
              VTU 2023–2027
            </span>
          </div>

          {/* Action Buttons */}
          <div data-hero="fade" className="mt-8 flex flex-wrap items-center gap-3.5 sm:mt-9">
            <Button href="/#work">Explore My Work</Button>
            <Button href="/#contact" variant="ghost">
              Let&apos;s Connect
            </Button>
          </div>

          {/* Location - Architecturally integrated directly into flow below buttons; CANNOT overlap */}
          <div
            data-hero="fade"
            className="mt-6 flex items-center gap-2.5 font-mono text-[0.75rem] tracking-wider uppercase text-paper/65"
          >
            <MapPin className="size-3.5 text-coral shrink-0" aria-hidden />
            <span>
              Location <span className="text-paper/90 font-medium">— {site.location}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Scroll cue (anchored on bottom-right, clean and isolated from copy) ────────────────── */}
      <div
        data-hero="fade"
        className="pointer-events-none absolute right-8 bottom-8 z-10 hidden items-center gap-3 lg:flex lg:right-12 lg:bottom-10"
      >
        <a
          href="#work"
          className="pointer-events-auto flex items-center gap-3 text-paper/70 transition-colors hover:text-paper"
          aria-label="Scroll to selected work"
        >
          <span className="label">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-line-strong">
            <span className="scroll-cue-dot absolute inset-x-0 top-0 h-1/2 bg-coral" />
          </span>
        </a>
      </div>

      <p data-hero="fade" className="label absolute top-28 right-12 z-10 hidden text-right lg:block">
        Portfolio <span className="text-paper/80">— {site.year}</span>
        <br />
        <span className="text-coral">Engineer &amp; Founder</span>
      </p>
    </section>
  );
}
