"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;
const MotionLink = motion.create(Link);

const rise = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: 0, transition: { duration: 1.1, ease, delay: 0.15 + i * 0.08 } }),
};
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.45 + i * 0.07 } }),
};

export function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  const sections = [
    { label: "The idea", body: project.idea },
    { label: "Engineering direction", body: project.direction },
    { label: "Interaction & feedback", body: project.motion },
    { label: "Implementation & stack", body: project.build },
  ];

  return (
    <article className="relative overflow-x-clip bg-ink">
      <div aria-hidden className="coral-light absolute top-0 right-[-10%] size-[46rem] opacity-50" />

      {/* Header */}
      <header id="top" className="relative mx-auto max-w-[1600px] px-5 pt-28 sm:px-8 lg:px-12 lg:pt-36">
        <motion.div initial="hidden" animate="show" custom={0} variants={fade}>
          <Link
            href="/#work"
            className="group label inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden />
            All projects
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p initial="hidden" animate="show" custom={0} variants={fade} className="label mb-5 flex flex-wrap items-center gap-3">
              <span className="text-coral">
                {project.index} / {String(projects.length).padStart(2, "0")}
              </span>
              <span>{project.category}</span>
              <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.6rem] tracking-[0.14em]">
                Verified Project
              </span>
            </motion.p>
            <h1 className="font-serif text-[clamp(2.5rem,5.8vw,5.5rem)] leading-[1.08] tracking-[-0.02em] text-paper">
              <span className="mask">
                <motion.span className="block break-words" initial="hidden" animate="show" custom={0} variants={rise}>
                  {project.title}
                </motion.span>
              </span>
            </h1>
            <p className="mt-4 font-serif text-[clamp(1.4rem,2.5vw,2.25rem)] leading-snug text-paper/80 italic">
              <span className="mask">
                <motion.span className="block" initial="hidden" animate="show" custom={1} variants={rise}>
                  {project.tagline}
                </motion.span>
              </span>
            </p>
          </div>
          <motion.dl
            initial="hidden"
            animate="show"
            custom={2}
            variants={fade}
            className="grid grid-cols-2 gap-6 text-sm lg:col-span-4 lg:pb-4"
          >
            <div>
              <dt className="label mb-2">Type</dt>
              <dd className="text-paper/85">Engineering Implementation</dd>
            </div>
            <div>
              <dt className="label mb-2">Discipline</dt>
              <dd className="text-paper/85">{project.category}</dd>
            </div>
            <div className="col-span-2">
              <dt className="label mb-2">Stack</dt>
              <dd className="text-paper/85">{project.stack.join(" · ")}</dd>
            </div>
          </motion.dl>
        </div>
      </header>

      {/* Key visual */}
      <motion.div
        initial={{ clipPath: "inset(10% 6% 10% 6%)", opacity: 0 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
        className="relative mx-auto mt-14 max-w-[1600px] px-5 sm:px-8 lg:mt-20 lg:px-12"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-ink-2 lg:aspect-[16/8]">
          <ProjectVisual slug={project.slug} className="absolute inset-0 h-full w-full" />
          <div aria-hidden className="viewfinder" />
        </div>
      </motion.div>

      {/* Story */}
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <p className="mx-auto max-w-3xl text-center font-serif text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.18] tracking-[-0.01em]">
          {project.summary}
        </p>

        <div className="mt-20 divide-y divide-line border-y border-line lg:mt-28">
          {sections.map((s, i) => (
            <motion.section
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease }}
              className="grid gap-4 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14"
              aria-labelledby={`s-${i}`}
            >
              <h2 id={`s-${i}`} className="label flex items-center gap-3 lg:col-span-4">
                <span className="text-coral">0{i + 1}</span>
                {s.label}
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-paper/75 lg:col-span-8">{s.body}</p>
            </motion.section>
          ))}
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="label mb-6">Focus areas</h2>
            <ul className="space-y-3">
              {project.focus.map((f) => (
                <li key={f} className="flex items-baseline gap-4 border-b border-line pb-3 font-serif text-2xl lg:text-3xl">
                  <span aria-hidden className="size-1.5 shrink-0 -translate-y-1.5 rounded-full bg-coral" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="label mb-6">Palette</h2>
            <ul className="grid grid-cols-3 gap-3">
              {project.palette.map((c) => (
                <li key={c.hex}>
                  <span className="block aspect-[3/4] rounded-[3px] border border-line" style={{ background: c.hex }} />
                  <span className="mt-3 block text-sm">{c.name}</span>
                  <span className="label">{c.hex}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 rounded-[3px] border border-line bg-ink-2 p-5 text-sm leading-relaxed text-paper/60">
              {project.title} was designed and engineered by Sanjeev Nadgir to explore practical architecture, systems
              programming, and applied artificial intelligence solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Next project */}
      <div className="relative border-t border-line">
        <MotionLink
          href={`/work/${next.slug}`}
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileFocus="hover"
          className="group mx-auto grid max-w-[1600px] items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24"
        >
          <div className="lg:col-span-7">
            <p className="label mb-4">Next project</p>
            <p className="flex items-center gap-5 font-serif text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.08] tracking-[-0.02em]">
              <span className="break-words">{next.title}</span>
              <motion.span
                aria-hidden
                variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 45, scale: 1.08 } }}
                transition={{ duration: 0.5, ease }}
                className="grid size-12 shrink-0 place-items-center rounded-full bg-coral text-ink lg:size-16"
              >
                <ArrowUpRight className="size-5 lg:size-7" />
              </motion.span>
            </p>
            <p className="mt-4 text-sm text-paper/60">{next.category}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-ink-2 lg:col-span-5">
            <motion.div
              className="absolute inset-0"
              variants={{ rest: { scale: 1.06 }, hover: { scale: 1 } }}
              transition={{ duration: 0.9, ease }}
            >
              <ProjectVisual slug={next.slug} className="h-full w-full" />
            </motion.div>
          </div>
        </MotionLink>
        <div className="mx-auto flex max-w-[1600px] justify-center px-5 pb-20 sm:px-8 lg:px-12">
          <Button href="/#contact" variant="ghost">
            Discuss a project
          </Button>
        </div>
      </div>
    </article>
  );
}
