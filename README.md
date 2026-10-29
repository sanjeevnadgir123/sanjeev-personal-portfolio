# Sanjeev Nadgir — Professional Developer Portfolio

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Motion (Framer Motion) · Lucide

Personal portfolio for **Sanjeev Nadgir** (Sanjeevkumar Anil Nadgir) — final-year Electronics and Communication Engineering student, software developer, AI/ML enthusiast, and Co-Founder & CEO at Geminal Studio.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

Requires Node 20+. Fonts (Instrument Serif, Geist, Geist Mono) load via `next/font/google` at build time.

## Contact Details & Configuration

Configured in `src/lib/site.ts`:
- **Email:** `sanjeevnadgir2005@gmail.com`
- **Phone:** `+91 9611103853`
- **Location:** Mundgod, Karnataka, India
- **Startup:** Geminal Studio (Co-Founder & CEO)
- **Education:** AGM Rural College of Engineering and Technology, Hubballi (VTU)

## Architecture

```
src/
  app/
    layout.tsx                  fonts, metadata, pre-paint `.js` flag
    page.tsx                    Hero → Work → About → StartupLeadership → EducationAchievements → Skills → Process → Contact
    work/[slug]/page.tsx        statically generated project pages (dynamicParams = false)
    work/template.tsx           Motion page-enter transition
    not-found.tsx, icon.svg, globals.css (design tokens)
  components/
    sections/                   Hero, Work, About, StartupLeadership, EducationAchievements, Skills, Process, Contact
    ui/                         CinematicVideo, Button, ProjectVisual (custom SVG key art)
    SiteNav.tsx, SiteFooter.tsx, SiteShell.tsx, Providers.tsx
  lib/
    site.ts                     verified personal, contact, education, startup, and achievement data
    projects.ts                 verified project details (Redis Java, EchoMind, Smart Medicine Box, IntelliMind)
```
