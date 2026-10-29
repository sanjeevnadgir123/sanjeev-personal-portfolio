"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function SiteNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 10);
    // Hide while scrolling down past the hero, reveal on any upward scroll.
    setHidden(y > prev && y > 400 && !open);
  });

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Lock scroll, focus the first link and support Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Close the menu on route change.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? "-110%" : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: hidden ? 0 : 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto flex h-16 items-center justify-between px-5 transition-[background-color,border-color,backdrop-filter] duration-500 sm:px-8 lg:px-12",
            scrolled || open
              ? "border-b border-line bg-ink/85 backdrop-blur-xl shadow-lg shadow-black/20"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <Link href="/" className="group relative z-50 flex items-baseline gap-1.5" aria-label={`${site.name} — home`}>
            <span className="font-serif text-2xl leading-none tracking-[0.04em]">{site.name}</span>
            <span className="size-1.5 rounded-full bg-coral transition-transform duration-500 group-hover:scale-150" />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative inline-flex px-3 py-2 font-mono text-[0.6875rem] tracking-[0.18em] text-paper/70 uppercase transition-colors hover:text-paper"
                  >
                    {item.label}
                    <span className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-coral transition-transform duration-500 ease-(--ease-cine) group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              href={`mailto:${site.email}`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="hidden h-9 items-center rounded-full border border-line-strong px-4 font-mono text-[0.6875rem] tracking-[0.18em] uppercase transition-colors hover:border-coral hover:text-coral md:inline-flex"
            >
              Let&apos;s talk
            </motion.a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-50 grid size-10 place-items-center rounded-full border border-line-strong md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid place-items-center"
                >
                  {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-ink px-5 pt-28 pb-10 sm:px-8 md:hidden"
          >
            <div aria-hidden className="coral-light absolute -right-24 top-1/4 size-96" />
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {site.nav.map((item, i) => (
                  <li key={item.href} className="mask">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                    >
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-1 font-serif text-[clamp(2.75rem,13vw,4.5rem)] leading-[1.05]"
                      >
                        <span className="label text-coral">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="relative space-y-3"
            >
              <p className="label">Get in touch</p>
              <a href={`mailto:${site.email}`} className="text-lg text-paper underline-offset-4 hover:underline">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
