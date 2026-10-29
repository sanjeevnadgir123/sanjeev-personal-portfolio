"use client";

import { useRef } from "react";
import { CinematicVideo } from "@/components/ui/CinematicVideo";
import { Button } from "@/components/ui/Button";
import { MOTION_OK, gsap, useScopedGsap } from "@/lib/gsap";
import { site } from "@/lib/site";

const STATEMENT =
  "I build software, AI-powered applications, and practical technology solutions with disciplined engineering and human-centered design.";

const DISCIPLINES = [
  {
    title: "Software Engineering",
    body: "Designing robust client-server architectures, RESTful APIs with FastAPI, and type-safe front ends with React and TypeScript.",
  },
  {
    title: "Artificial Intelligence",
    body: "Training deep learning models for audio emotion recognition, engineering RAG pipelines, and deploying practical AI solutions.",
  },
  {
    title: "Systems & Networking",
    body: "Exploring foundational low-level computing through TCP client-server protocols, socket programming, and in-memory stores.",
  },
  {
    title: "Startup Leadership",
    body: "Serving as Co-Founder & CEO at Geminal Studio, designing technology products and delivering high-value solutions to organizations.",
  },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useScopedGsap(root, (mm, el) => {
    const q = gsap.utils.selector(el);
    mm.add(MOTION_OK, () => {
      // Portrait frame unmasks upward, then the film drifts inside it.
      gsap.fromTo(
        q("[data-about-frame]"),
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: q("[data-about-frame]")[0], start: "top 80%" },
        },
      );
      gsap.fromTo(
        q("[data-about-film]"),
        { yPercent: -6 },
        { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
      // Statement brightens word by word as it is read.
      gsap.fromTo(
        q("[data-word]"),
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.from(q("[data-discipline]"), {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: q("[data-disciplines]")[0], start: "top 85%" },
      });
    });
  });

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-ink py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* Portrait crop of the preserved film */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div data-about-frame className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[3px] lg:max-w-none">
              <div data-about-film className="absolute -inset-y-[8%] inset-x-0">
                <CinematicVideo
                  className="absolute inset-0"
                  objectPosition="50% 20%"
                  mediaClassName="grayscale-[25%] contrast-[1.04]"
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/20" />
                  <div aria-hidden className="coral-light absolute -right-1/3 top-1/4 size-[120%] opacity-60 mix-blend-screen" />
                </CinematicVideo>
              </div>
              <div aria-hidden className="viewfinder" />
              <p className="label absolute bottom-5 left-5 text-paper/70">Frame study · 4:5</p>
              <p className="label absolute right-5 bottom-5 text-paper/70">Sanjeev Nadgir</p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7 lg:pl-[4vw]">
          <p className="label mb-6 flex items-center gap-3">
            <span className="text-coral">(02)</span> About Sanjeev
          </p>
          <h2 id="about-title" className="sr-only">
            About Sanjeev Nadgir
          </h2>
          <p
            data-statement
            className="font-serif text-[clamp(1.85rem,3.4vw,3.25rem)] leading-[1.2] tracking-[-0.01em]"
          >
            {STATEMENT.split(" ").map((w, i) => (
              <span key={i} data-word className="inline">
                {w}{" "}
              </span>
            ))}
          </p>

          <div className="mt-8 space-y-4 max-w-2xl text-base leading-relaxed text-paper/70">
            <p>
              I&apos;m <strong className="text-paper font-semibold">{site.fullName}</strong> (known professionally as{" "}
              <strong className="text-paper font-semibold">{site.name}</strong>) — a final-year Electronics and
              Communication Engineering student at AGM Rural College of Engineering and Technology, Hubballi (VTU), based
              in Mundgod, Karnataka, India.
            </p>
            <p>
              My work spans backend development, systems networking, and applied artificial intelligence. I enjoy
              understanding systems from the transport layer up — whether that means parsing RESP protocols over raw TCP
              sockets in Java, classifying acoustic spectrograms with CNNs, or building retrieval-augmented generation (RAG)
              assistants.
            </p>
          </div>

          {/* Core Pillars */}
          <ul data-disciplines className="mt-14 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2">
            {DISCIPLINES.map((d, i) => (
              <li key={d.title} data-discipline className="group bg-ink p-7 transition-colors duration-500 hover:bg-ink-2">
                <p className="label mb-5 flex items-center justify-between">
                  <span>0{i + 1}</span>
                  <span className="h-px w-8 origin-right bg-coral transition-[width] duration-500 group-hover:w-14" aria-hidden />
                </p>
                <h3 className="font-serif text-2xl transition-colors duration-500 group-hover:text-coral">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{d.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/#startup">Startup &amp; Leadership</Button>
            <Button href="/#education" variant="ghost">
              Education &amp; Achievements
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
