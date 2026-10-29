import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden px-5 pt-24 text-center">
      <div aria-hidden className="coral-light absolute top-1/4 left-1/2 size-[36rem] -translate-x-1/2 opacity-60" />
      <div className="relative">
        <p className="label mb-6">Error 404 · Scene missing</p>
        <h1 className="font-serif text-[clamp(4rem,14vw,11rem)] leading-[0.85] tracking-[-0.02em]">
          Lost the <em className="text-coral">plot.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-paper/60">This page didn&apos;t make the final cut.</p>
        <div className="mt-10 flex justify-center">
          <Button href="/">Back to Home</Button>
        </div>
      </div>
    </section>
  );
}
