"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { film } from "@/lib/site";
import { cn } from "@/lib/cn";

type CinematicVideoProps = {
  /** Extra classes for the frame. It fills its (sized) parent absolutely, so it never causes layout shift. */
  className?: string;
  /** Classes for the <video>/<img> itself, e.g. filters or scale. */
  mediaClassName?: string;
  /** CSS object-position. Keep her face in frame for each crop. */
  objectPosition?: string;
  /** Poster image shown before playback, on failure and for reduced motion. */
  poster?: string;
  /** Hero instance: autoplay immediately and preload eagerly. Others wait until near the viewport. */
  priority?: boolean;
  /** Loop only the tail of the film (in seconds), e.g. the final frames as a callback. */
  loopFrom?: number;
  /** Render a small accessible pause / play toggle. */
  showControl?: boolean;
  controlClassName?: string;
  /** Accessible description. Decorative instances can omit it. */
  label?: string;
  style?: CSSProperties;
  /** Overlay layers (grades, light, brackets) rendered above the film but below the control. */
  children?: ReactNode;
};

/**
 * The single walking film, reused across the site with different crops.
 * - autoplay, muted, playsInline, looped
 * - only plays while on screen (saves battery; same cached file for every instance)
 * - respects prefers-reduced-motion (shows the poster; user may press play)
 * - falls back to the poster image if the video cannot load or play
 */
export function CinematicVideo({
  className,
  mediaClassName,
  objectPosition = "50% 30%",
  poster = film.poster,
  priority = false,
  loopFrom,
  showControl = false,
  controlClassName,
  label,
  style,
  children,
}: CinematicVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [inView, setInView] = useState(priority);
  const [playing, setPlaying] = useState(false);

  // Reduced motion pauses by default; an explicit user choice always wins.
  const paused = userPaused ?? Boolean(prefersReduced);

  // Observe visibility so off-screen instances never decode frames.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Drive playback from state.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    v.muted = true; // React does not reliably serialise `muted`; set the property directly.
    if (inView && !paused) {
      if (v.preload !== "auto") v.preload = "auto";
      const p = v.play();
      if (p) p.catch(() => setPlaying(false)); // Refused (e.g. low-power mode): poster remains.
    } else {
      v.pause();
    }
  }, [inView, paused, failed]);

  // Optional tail loop for the contact callback.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || loopFrom === undefined) return;
    const jump = () => {
      if (v.currentTime < loopFrom) v.currentTime = loopFrom;
    };
    v.addEventListener("loadedmetadata", jump);
    v.addEventListener("timeupdate", jump);
    return () => {
      v.removeEventListener("loadedmetadata", jump);
      v.removeEventListener("timeupdate", jump);
    };
  }, [loopFrom]);

  const mediaStyle: CSSProperties = { objectPosition };
  const mediaClasses = cn("absolute inset-0 h-full w-full object-cover", mediaClassName);

  return (
    <div
      ref={frameRef}
      className={cn("absolute inset-0 overflow-hidden bg-ink", className)}
      style={style}
    >
      {label && <span className="sr-only">{label}</span>}
      {failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className={mediaClasses} style={mediaStyle} decoding="async" />
      ) : (
        <video
          ref={videoRef}
          className={mediaClasses}
          style={mediaStyle}
          poster={poster}
          autoPlay={priority}
          muted
          loop
          playsInline
          disablePictureInPicture
          preload={priority ? "auto" : "none"}
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          {film.sources.map((s, i) => (
            <source
              key={s.src}
              src={s.src}
              type={s.type}
              onError={i === film.sources.length - 1 ? () => setFailed(true) : undefined}
            />
          ))}
        </video>
      )}

      {children}

      {showControl && !failed && (
        <button
          type="button"
          onClick={() => setUserPaused(playing)}
          aria-pressed={!playing}
          aria-label={playing ? "Pause background film" : "Play background film"}
          className={cn(
            "group absolute z-20 inline-flex h-9 items-center gap-2 rounded-full border border-line-strong bg-ink/40 px-3 text-paper/80 backdrop-blur-md transition-colors hover:border-paper/50 hover:text-paper",
            controlClassName,
          )}
        >
          {playing ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
          <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase">{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </div>
  );
}
