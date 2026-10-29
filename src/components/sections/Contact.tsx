"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { CinematicVideo } from "@/components/ui/CinematicVideo";
import { Button } from "@/components/ui/Button";
import { MOTION_OK, gsap, useScopedGsap } from "@/lib/gsap";
import { film, site } from "@/lib/site";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useScopedGsap(root, (mm, el) => {
    const q = gsap.utils.selector(el);
    mm.add(MOTION_OK, () => {
      // The film returns as a letterboxed callback that widens into view.
      gsap.fromTo(
        q("[data-band]"),
        { clipPath: "inset(12% 8% 12% 8%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: q("[data-band]")[0], start: "top 95%", end: "top 25%", scrub: true },
        },
      );
      gsap.fromTo(
        q("[data-band-film]"),
        { yPercent: -10 },
        { yPercent: 10, ease: "none", scrollTrigger: { trigger: q("[data-band]")[0], start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.from(q("[data-contact-head]"), {
        yPercent: 110,
        duration: 1.3,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: q("[data-contact-copy]")[0], start: "top 85%" },
      });
      gsap.from(q("[data-contact-fade]"), {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: q("[data-contact-copy]")[0], start: "top 70%" },
      });
    });
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section ref={root} id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink pt-10 pb-24 lg:pb-32">
      {/* Letterboxed callback to the final frames of the preserved film */}
      <div data-band className="relative mx-auto h-[54svh] min-h-[350px] w-full overflow-hidden lg:h-[70svh]">
        <div data-band-film className="absolute -inset-y-[12%] inset-x-0">
          <CinematicVideo
            className="absolute inset-0"
            poster={film.finalFrame}
            loopFrom={4.5}
            objectPosition="50% 24%"
            mediaClassName="scale-[1.12] grayscale-[35%] contrast-[1.08] brightness-[0.85]"
            label="Sanjeev Nadgir portrait frame."
          />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent via-40% to-ink" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-ink)_85%)]" />
        <div aria-hidden className="coral-light absolute top-[10%] left-[58%] size-[38vmax] opacity-60 mix-blend-screen" />
        <div aria-hidden className="viewfinder hidden sm:block" style={{ inset: "1.5rem 2.5rem" }} />
        <p className="label absolute top-6 left-5 text-paper/60 sm:top-10 sm:left-16">Final frame · Sanjeev Nadgir</p>
      </div>

      <div data-contact-copy className="relative z-10 mx-auto -mt-20 max-w-[1600px] px-5 text-center sm:px-8 lg:-mt-32 lg:px-12">
        <p data-contact-fade className="label mb-6 inline-flex items-center gap-3">
          <span className="text-coral">(07)</span> Contact
        </p>
        <h2 id="contact-title" className="font-serif text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">
          <span className="mask">
            <span data-contact-head className="block">
              Have an idea
            </span>
          </span>
          <span className="mask">
            <span data-contact-head className="block italic">
              worth <span className="text-coral">building?</span>
            </span>
          </span>
        </h2>
        <p data-contact-fade className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-paper/70 sm:text-lg">
          Available for software engineering roles, technical co-founder discussions, and practical AI collaborations.
        </p>

        {/* Contact actions */}
        <div data-contact-fade className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href={`mailto:${site.email}`}>
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" /> Send Email
            </span>
          </Button>

          <Button href={`tel:${site.phoneTel}`} variant="ghost">
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4" /> Call: {site.phone}
            </span>
          </Button>

          <motion.button
            type="button"
            onClick={copyEmail}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex h-12 items-center gap-3 rounded-full border border-line-strong px-5 text-sm text-paper/80 transition-colors hover:border-paper/60 hover:text-paper"
            aria-live="polite"
          >
            <span className="font-mono text-xs tracking-wide">{site.email}</span>
            <span className="relative grid size-4 place-items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copiedEmail ? "ok" : "copy"}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  {copiedEmail ? <Check className="size-4 text-coral" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="sr-only">{copiedEmail ? "Email copied" : "Copy email address"}</span>
          </motion.button>
        </div>

        {/* Location badge */}
        <div data-contact-fade className="mt-8 flex items-center justify-center gap-2 text-sm text-paper/60">
          <MapPin className="size-4 text-coral" aria-hidden />
          <span>{site.location}</span>
        </div>

        {/* Verified Links */}
        <ul data-contact-fade className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label="Verified profiles">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-1.5 font-mono text-[0.75rem] tracking-[0.16em] text-paper/70 uppercase transition-colors hover:text-coral"
              >
                {s.label}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
