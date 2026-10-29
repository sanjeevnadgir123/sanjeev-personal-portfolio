import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

/** Everything inside <body>. Shared by the root layout (and the local preview harness). */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        <div className="grain" />
      </div>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </Providers>
  );
}
