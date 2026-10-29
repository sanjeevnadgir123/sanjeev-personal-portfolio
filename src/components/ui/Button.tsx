"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  external?: boolean;
  icon?: boolean;
};

/**
 * Pill CTA. Framer Motion owns the button's own transform (hover / tap);
 * GSAP only ever animates wrapper elements around it.
 */
export function Button({ href, children, variant = "solid", className, external, icon = true }: ButtonProps) {
  const classes = cn(
    "group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full pl-6 pr-2 text-sm font-medium tracking-tight",
    variant === "solid"
      ? "bg-paper text-ink"
      : "border border-line-strong text-paper hover:border-paper/60",
    !icon && "pr-6",
    className,
  );

  const inner = (
    <>
      {/* Coral wash that rises on hover */}
      <motion.span
        aria-hidden
        className={cn("absolute inset-0 origin-bottom", variant === "solid" ? "bg-coral" : "bg-paper/[0.06]")}
        variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="relative">{children}</span>
      {icon && (
        <span
          className={cn(
            "relative grid size-8 place-items-center overflow-hidden rounded-full",
            variant === "solid" ? "bg-ink text-paper" : "bg-paper text-ink",
          )}
        >
          <motion.span
            className="grid place-items-center"
            variants={{ rest: { x: 0, y: 0, rotate: 0 }, hover: { x: 1, y: -1, rotate: 45 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </motion.span>
        </span>
      )}
    </>
  );

  const motionProps = {
    initial: "rest" as const,
    animate: "rest" as const,
    whileHover: "hover" as const,
    whileFocus: "hover" as const,
    whileTap: { scale: 0.97 },
  };

  if (external) {
    return (
      <motion.a href={href} className={classes} {...motionProps} target="_blank" rel="noopener noreferrer">
        {inner}
      </motion.a>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {inner}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} className={classes} {...motionProps}>
      {inner}
    </MotionLink>
  );
}
