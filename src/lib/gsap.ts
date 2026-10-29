"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Media queries shared by every scroll animation. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
export const MOBILE_MOTION = "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scoped GSAP setup. Everything created inside `setup` (tweens, timelines,
 * ScrollTriggers, matchMedia branches) is reverted automatically on unmount,
 * so there are no leaked triggers between route changes or HMR reloads.
 *
 * Animations are only registered inside matchMedia branches, which means
 * users who prefer reduced motion simply see the final, static layout.
 */
export function useScopedGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (mm: gsap.MatchMedia, root: HTMLElement) => void,
) {
  useIsomorphicLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    setup(mm, root);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
