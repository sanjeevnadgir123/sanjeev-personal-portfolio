"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Client-side app wrapper.
 * - Framer Motion follows the OS reduced-motion preference.
 * - ScrollTrigger positions are recalculated once fonts and media have settled,
 *   so pinned sections never measure against fallback-font layouts.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
