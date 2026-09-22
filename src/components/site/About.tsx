import { Reveal, RevealLines } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-28 sm:py-40">
      <div className="zt-shell">
        <p className="zt-eyebrow mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" />
          About
        </p>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <RevealLines
            className="font-display text-[10vw] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase sm:text-6xl"
            lines={["ZARtech is built", "around one idea."]}
          />
          <div className="max-w-xl">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Businesses don't need technology for the sake of technology. They need digital
                products that solve real problems, create better experiences and make the business
                work better.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 font-display text-2xl font-extrabold tracking-[-0.02em] uppercase">
                That's what we build.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
