"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useScopedGsap } from "@/lib/gsap";

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    note: "Core languages used for systems, scripting, and algorithmic problem solving.",
    skills: ["Java", "Python", "C"],
  },
  {
    title: "Core Computer Science",
    note: "Theoretical and practical software engineering fundamentals.",
    skills: ["Object-Oriented Programming", "Data Structures and Algorithms"],
  },
  {
    title: "Backend Development",
    note: "High-throughput APIs, server architectures, and network transport.",
    skills: ["FastAPI", "REST APIs", "TCP Client-Server Architecture"],
  },
  {
    title: "Databases & Storage",
    note: "Relational persistence, vector storage, and modern cloud database systems.",
    skills: ["MySQL", "PostgreSQL", "Supabase"],
  },
  {
    title: "Frontend Development",
    note: "Responsive, accessible, component-driven user interfaces.",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "TypeScript"],
  },
  {
    title: "Artificial Intelligence & ML",
    note: "Deep learning models, computer vision, data analysis, and LLM augmentation.",
    skills: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "OpenCV",
      "Retrieval-Augmented Generation (RAG)",
      "Generative AI",
    ],
  },
  {
    title: "Developer Tools",
    note: "Environment, version control, and development workflows.",
    skills: ["Git", "GitHub", "Visual Studio Code", "Jupyter Notebook"],
  },
];

export function Skills() {
  const root = useRef<HTMLElement>(null);

  useScopedGsap(root, (mm, el) => {
    const q = gsap.utils.selector(el);
    mm.add(MOTION_OK, () => {
      gsap.from(q("[data-skills-head]"), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      q("[data-skill-row]").forEach((row) => {
        const rule = row.querySelector("[data-rule]");
        const words = row.querySelectorAll("[data-skill]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%" } });
        if (rule) tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, 0);
        tl.from(words, { y: 20, opacity: 0, duration: 0.8, stagger: 0.04, ease: "expo.out" }, 0.2);
      });
    });
  });

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="relative bg-ink-2 py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:mb-24 lg:flex-row lg:items-end">
          <div>
            <p className="label mb-4 flex items-center gap-3">
              <span className="text-coral">(05)</span> Technical Skills
            </p>
            <h2 id="skills-title" className="font-serif text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
              <span className="mask">
                <span data-skills-head className="block">
                  Tools &amp; technologies
                </span>
              </span>
              <span className="mask">
                <span data-skills-head className="block italic text-paper/90">
                  of the craft<span className="text-coral">.</span>
                </span>
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-paper/65">
            A comprehensive engineering stack covering systems programming, backend services, modern web interfaces, and applied AI/ML pipelines.
          </p>
        </div>

        <div className="space-y-2">
          {SKILL_CATEGORIES.map((g, gi) => (
            <div
              key={g.title}
              data-skill-row
              className="relative grid gap-6 py-8 sm:py-10 lg:grid-cols-12 lg:gap-10 lg:py-10"
            >
              <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
              <div className="lg:col-span-4">
                <p className="label flex items-center gap-3">
                  <span className="text-coral">0{gi + 1}</span>
                  {g.title}
                </p>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-paper/50">{g.note}</p>
              </div>

              {/* Responsive wrapped skill badges that NEVER overlap */}
              <div className="lg:col-span-8">
                <ul
                  aria-label={g.title}
                  className="flex flex-wrap items-center gap-2.5 sm:gap-3"
                >
                  {g.skills.map((item) => (
                    <li
                      key={item}
                      data-skill
                      className="group/tag inline-flex items-center gap-2 rounded-[3px] border border-line bg-ink px-3.5 py-2 transition-all duration-300 hover:border-coral/50 hover:bg-ink-3"
                    >
                      <span className="size-1 rounded-full bg-coral/60 transition-transform duration-300 group-hover/tag:scale-150 group-hover/tag:bg-coral" />
                      <span className="font-sans text-sm font-medium tracking-wide text-paper/85 transition-colors group-hover/tag:text-paper">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <span aria-hidden className="block h-px bg-line" />
        </div>
      </div>
    </section>
  );
}
