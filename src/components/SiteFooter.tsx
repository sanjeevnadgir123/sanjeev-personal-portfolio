"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MOTION_OK, gsap, useScopedGsap } from "@/lib/gsap";
import { site } from "@/lib/site";

export function SiteFooter() {
  const root = useRef<HTMLElement>(null);

  useScopedGsap(root, (mm, el) => {
    const q = gsap.utils.selector(el);
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
      tl.from(q("[data-footer-letter]"), { yPercent: 100, duration: 1.4, stagger: 0.08, ease: "expo.out" }).from(
        q("[data-footer-fade]"),
        { opacity: 0, y: 12, duration: 0.9, stagger: 0.06, ease: "power3.out" },
        0.3,
      );
    });
  });

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line bg-ink pt-16">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 text-sm sm:grid-cols-3">
          <div data-footer-fade>
            <p className="label mb-3">Navigate</p>
            <ul className="space-y-1.5">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-paper/70 transition-colors hover:text-paper">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div data-footer-fade>
            <p className="label mb-3">Ventures &amp; Profiles</p>
            <ul className="space-y-1.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1 text-paper/70 transition-colors hover:text-paper"
                  >
                    {s.label} <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div data-footer-fade className="sm:text-right">
            <p className="label mb-3">Say hello</p>
            <a href={`mailto:${site.email}`} className="text-paper/85 underline-offset-4 hover:text-coral hover:underline">
              {site.email}
            </a>
            <p className="mt-1 font-mono text-xs text-paper/50">
              <a href={`tel:${site.phoneTel}`} className="hover:text-coral">
                {site.phone}
              </a>
            </p>
            <p className="mt-1 font-mono text-xs text-paper/40">{site.location}</p>
            <div className="mt-6">
              <motion.a
                href="#top"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.18em] text-paper/60 uppercase hover:text-paper"
              >
                Back to top <span aria-hidden>↑</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Monumental wordmark: SANJEEV */}
      <div aria-hidden className="relative mt-16 select-none overflow-hidden">
        <p className="-mb-[0.12em] flex justify-center font-serif text-[clamp(4.5rem,14vw,14rem)] leading-none tracking-[-0.015em]">
          {"SANJEEV".split("").map((l, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span data-footer-letter className="inline-block bg-gradient-to-b from-paper via-paper/80 to-paper/0 bg-clip-text text-transparent">
                {l}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div className="relative mx-auto flex max-w-[1600px] flex-col justify-between gap-2 border-t border-line px-5 py-6 text-xs text-paper/45 sm:flex-row sm:px-8 lg:px-12">
        <p>
          © {site.year} {site.name}. All rights reserved.
        </p>
        <p>{site.fullName} · {site.location}</p>
      </div>
    </footer>
  );
}
