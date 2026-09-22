import { motion, useReducedMotion } from "framer-motion";
import { Reveal, RevealLines } from "./Reveal";

const designExhibits = [
  { label: "Typography System", kind: "type" },
  { label: "Interface Layout", kind: "layout" },
  { label: "Visual Hierarchy", kind: "hierarchy" },
  { label: "Responsive Behaviour", kind: "responsive" },
  { label: "Motion & Interaction", kind: "motion" },
  { label: "Information Architecture", kind: "ia" },
];

function Exhibit({ kind }: { kind: string }) {
  if (kind === "type")
    return (
      <div className="flex h-full flex-col justify-center gap-2 p-5">
        <span className="font-display text-3xl leading-none font-extrabold tracking-[-0.04em]">
          Aa
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Display / Mono
        </span>
        <div className="mt-2 space-y-1.5">
          <div className="h-1 w-full bg-muted" />
          <div className="h-1 w-4/5 bg-muted" />
          <div className="h-1 w-1/2 bg-accent/60" />
        </div>
      </div>
    );
  if (kind === "layout")
    return (
      <div className="grid h-full grid-cols-4 grid-rows-3 gap-1 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="block border border-line"
            style={{
              background: i === 1 || i === 6 ? "color-mix(in oklab, var(--accent) 22%, transparent)" : "transparent",
            }}
          />
        ))}
      </div>
    );
  if (kind === "hierarchy")
    return (
      <div className="flex h-full flex-col justify-center gap-2.5 p-5">
        <div className="h-3 w-3/4 bg-foreground/80" />
        <div className="h-1.5 w-1/2 bg-steel/70" />
        <div className="h-1 w-full bg-muted" />
        <div className="h-1 w-5/6 bg-muted" />
        <div className="mt-2 h-5 w-24 border border-accent" />
      </div>
    );
  if (kind === "responsive")
    return (
      <div className="flex h-full items-end justify-center gap-2 p-5">
        {[28, 44, 66, 90].map((w, i) => (
          <div
            key={w}
            className="border border-line"
            style={{
              width: w / 2,
              height: 40 + i * 12,
              borderColor: i === 3 ? "var(--accent)" : undefined,
            }}
          />
        ))}
      </div>
    );
  if (kind === "motion")
    return (
      <div className="relative h-full overflow-hidden p-5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-5 block h-px bg-accent/70"
            style={{ top: `${32 + i * 22}%`, width: "60%" }}
            animate={{ x: ["-15%", "35%", "-15%"] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <span className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          Easing
        </span>
      </div>
    );
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2" style={{ paddingLeft: i * 14 }}>
          <span className="h-1 w-1 bg-accent" />
          <span className="h-1 bg-muted" style={{ width: 90 - i * 18 }} />
        </div>
      ))}
    </div>
  );
}

const engineeringLayers = [
  "Frontend",
  "API",
  "Business Logic",
  "Database",
  "Storage",
  "Infrastructure",
];

export function Craft() {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="relative border-t border-line py-28 sm:py-40">
        <div className="zt-shell">
          <p className="zt-eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent" />
            Design
          </p>
          <RevealLines className="zt-display block" lines={["Design isn't", "decoration."]} />
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              It's how technology becomes understandable.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {designExhibits.map((e, i) => (
              <Reveal key={e.label} delay={i * 0.06}>
                <div className="group h-52 bg-background transition-colors duration-500 hover:bg-surface">
                  <div className="h-[calc(100%-2.5rem)]">
                    <Exhibit kind={e.kind} />
                  </div>
                  <div className="flex h-10 items-center justify-between border-t border-line px-5">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                      {e.label}
                    </span>
                    <span className="h-1 w-1 bg-accent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-line py-28 sm:py-40">
        <div className="zt-shell">
          <p className="zt-eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent" />
            Engineering
          </p>
          <RevealLines className="zt-display block" lines={["Engineering isn't", "just code."]} />
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              It's architecture, reliability and decisions that hold up after launch.
            </p>
          </Reveal>

          <ol className="mt-20 mx-auto max-w-3xl">
            {engineeringLayers.map((l, i) => (
              <motion.li
                key={l}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-center justify-between border border-line bg-surface/60 px-5 py-5 transition-colors duration-500 hover:border-accent sm:px-8">
                  <span className="font-display text-base font-bold tracking-[0.08em] uppercase sm:text-xl">
                    {l}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {i < engineeringLayers.length - 1 && (
                  <span className="mx-auto block h-6 w-px bg-accent/50" aria-hidden="true" />
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line py-32 sm:py-48">
        <div className="zt-shell text-center">
          <RevealLines
            className="zt-display block"
            lines={["Where design", "meets engineering."]}
          />
          <div className="mt-20 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
            {["Design", "+", "Engineering"].map((t, i) => (
              <motion.span
                key={t}
                initial={reduce ? false : { opacity: 0, x: i === 0 ? -50 : i === 2 ? 50 : 0, scale: i === 1 ? 0.6 : 1 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl font-extrabold tracking-[-0.02em] uppercase sm:text-4xl"
                style={{ color: i === 1 ? "var(--accent)" : undefined }}
              >
                {t}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-10 font-display text-[11vw] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-7xl"
          >
            Digital products
          </motion.p>
        </div>
      </section>
    </>
  );
}
