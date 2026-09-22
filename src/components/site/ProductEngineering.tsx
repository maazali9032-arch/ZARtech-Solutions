import { motion, useReducedMotion } from "framer-motion";
import { productTypes } from "@/data/site";
import { Reveal, RevealLines } from "./Reveal";

const orbit = [
  { label: "Users", x: "8%", y: "12%" },
  { label: "Database", x: "78%", y: "10%" },
  { label: "API", x: "2%", y: "62%" },
  { label: "Automation", x: "72%", y: "68%" },
  { label: "Notifications", x: "40%", y: "88%" },
];

function ProductScene() {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-square w-full max-w-xl sm:aspect-[5/4]">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {orbit.map((o, i) => (
          <line
            key={o.label}
            x1={o.x}
            y1={o.y}
            x2="50%"
            y2="50%"
            stroke="var(--line-strong)"
            strokeWidth="1"
            strokeDasharray="4 6"
            style={
              reduce ? undefined : { animation: `zt-dash ${9 + i}s linear infinite` }
            }
          />
        ))}
      </svg>

      {orbit.map((o, i) => (
        <motion.span
          key={o.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 border border-line bg-surface px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase"
          style={{ left: o.x, top: o.y }}
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          {o.label}
        </motion.span>
      ))}

      <motion.div
        className="absolute top-1/2 left-1/2 w-44 -translate-x-1/2 -translate-y-1/2 border border-accent/70 bg-background p-4 sm:w-56"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-8 bg-accent" />
          <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground">
            PRODUCT
          </span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-1.5 w-full bg-muted" />
          <div className="h-1.5 w-4/5 bg-muted" />
          <div className="h-1.5 w-2/3 bg-muted" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-5 border border-line"
              style={{ borderColor: i === 1 ? "var(--accent)" : undefined }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function ProductEngineering() {
  return (
    <section className="relative border-t border-line py-28 sm:py-40">
      <div className="zt-shell">
        <p className="zt-eyebrow mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" />
          Product Engineering
        </p>
        <RevealLines className="zt-display block" lines={["From idea", "to working product."]} />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We've contributed engineering and product development to early-stage ventures and
              custom digital products — translating ideas into functional platforms and usable
              experiences.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="border border-line p-6 sm:p-8">
              <p className="zt-eyebrow mb-4">Startup Product Platform</p>
              <ul className="space-y-2">
                {[
                  "Product Engineering",
                  "Application Development",
                  "Interface Design",
                  "Platform Architecture",
                ].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1 w-1 bg-accent" />
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Contributed to the design and engineering of a digital product for an early-stage
                venture, helping transform product requirements into a working platform.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-32 grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <RevealLines
              className="font-display text-[11vw] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-6xl"
              lines={["We build", "products too."]}
            />
            <ul className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {productTypes.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 0.04} className="border-b border-line py-3.5">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-sm">{p}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="flex justify-center lg:justify-end">
            <ProductScene />
          </div>
        </div>
      </div>
    </section>
  );
}
