import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { techStack } from "@/data/site";
import { Reveal, RevealLines } from "./Reveal";

const orbitNodes = [
  { id: "experience", label: "Experience", angle: -90 },
  { id: "application", label: "Application", angle: -30 },
  { id: "data", label: "Data", angle: 30 },
  { id: "infrastructure", label: "Infrastructure", angle: 90 },
  { id: "automation", label: "Automation", angle: 150 },
  { id: "ai", label: "AI", angle: 210 },
];

function Architecture() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const R = 38; // percent radius

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {orbitNodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 50 + R * Math.cos(rad);
          const y = 50 + R * Math.sin(rad);
          const on = active === n.id;
          return (
            <line
              key={n.id}
              x1="50%"
              y1="50%"
              x2={`${x}%`}
              y2={`${y}%`}
              stroke={on ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth={on ? 1.4 : 1}
              strokeDasharray="3 7"
              style={reduce ? undefined : { animation: `zt-dash ${10 + i}s linear infinite` }}
            />
          );
        })}
        <circle
          cx="50%"
          cy="50%"
          r={`${R}%`}
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
        />
      </svg>

      <motion.div
        className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-accent/60 bg-background sm:h-28 sm:w-28"
        initial={reduce ? false : { scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-display text-xs font-extrabold tracking-[0.06em] uppercase">
          ZARtech
        </span>
      </motion.div>

      {orbitNodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = 50 + R * Math.cos(rad);
        const y = 50 + R * Math.sin(rad);
        const on = active === n.id;
        return (
          <motion.button
            key={n.id}
            type="button"
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 border bg-surface px-3 py-2 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-400"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              borderColor: on ? "var(--accent)" : "var(--line-strong)",
              color: on ? "var(--accent)" : "var(--muted-foreground)",
            }}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
          >
            {n.label}
          </motion.button>
        );
      })}
    </div>
  );
}

export function Technology() {
  return (
    <section className="relative border-t border-line py-28 sm:py-40">
      <div className="zt-shell">
        <p className="zt-eyebrow mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" />
          Technology
        </p>
        <RevealLines className="zt-display block" lines={["Engineered", "with purpose."]} />

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {techStack.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 0.06}>
                <div>
                  <div className="flex items-baseline justify-between border-b border-line pb-3">
                    <h3 className="font-display text-sm font-bold tracking-[0.1em] uppercase">
                      {g.group}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {g.items.map((i) => (
                      <li
                        key={i}
                        className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                      >
                        <span className="h-px w-3 bg-line-strong transition-[width,background-color] duration-400 group-hover:w-5 group-hover:bg-accent" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex items-center">
            <Architecture />
          </div>
        </div>
      </div>
    </section>
  );
}
