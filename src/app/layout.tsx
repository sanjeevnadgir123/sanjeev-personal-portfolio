import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { film, site } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: site.fullTitle, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.fullTitle,
    description: site.tagline,
    type: "website",
    images: [{ url: film.finalFrame, width: film.width, height: film.height, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.fullTitle, description: site.tagline, images: [film.finalFrame] },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Flags JS before first paint so hero pre-reveal states never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
