import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { capabilities } from "@/data/site";
import { RevealLines } from "./Reveal";

export function Capabilities() {
  const [open, setOpen] = useState<string | null>(capabilities[0]!.number);
  const [hover, setHover] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="capabilities" className="relative border-t border-line py-28 sm:py-40">
      <div className="zt-shell">
        <p className="zt-eyebrow mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" />
          Capabilities
        </p>
        <RevealLines className="zt-display block" lines={["What we build."]} />

        <ul className="mt-16 border-t border-line">
          {capabilities.map((c) => {
            const expanded = open === c.number;
            const hovered = hover === c.number;
            return (
              <li
                key={c.number}
                className="border-b border-line"
                onMouseEnter={() => setHover(c.number)}
                onMouseLeave={() => setHover(null)}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`cap-${c.number}`}
                    onClick={() => setOpen(expanded ? null : c.number)}
                    className="flex w-full items-center gap-5 py-6 text-left sm:gap-10 sm:py-8"
                  >
                    <span
                      className="font-mono text-[11px] tracking-[0.2em] transition-colors duration-400"
                      style={{
                        color: expanded || hovered ? "var(--accent)" : "var(--muted-foreground)",
                      }}
                    >
                      {c.number}
                    </span>
                    <span
                      className="flex-1 font-display text-[7vw] leading-[1] font-extrabold tracking-[-0.035em] uppercase transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-4xl lg:text-6xl"
                      style={{
                        transform: hovered || expanded ? "translateX(10px)" : "translateX(0)",
                        color: expanded ? "var(--foreground)" : undefined,
                        opacity: hover && !hovered ? 0.45 : 1,
                      }}
                    >
                      {c.title}
                    </span>
                    <span
                      className="hidden font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:block"
                      aria-hidden="true"
                    >
                      {expanded ? "Close" : "Open"}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`cap-${c.number}`}
                      initial={reduce ? { height: "auto" } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 sm:grid-cols-[1.1fr_1fr] sm:gap-16 sm:pl-[calc(11px+2.5rem)]">
                        <div>
                          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                            {c.note}
                          </p>
                          <ul className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                            {c.items.map((i, idx) => (
                              <motion.li
                                key={i}
                                initial={reduce ? false : { opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="flex items-center gap-3 border-b border-line py-2.5 text-sm"
                              >
                                <span className="h-1 w-1 bg-accent" />
                                {i}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col justify-between gap-6">
                          <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-surface">
                            <div className="zt-grid-bg absolute inset-0 opacity-50" />
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-px p-4">
                              {Array.from({ length: 8 }).map((_, i) => (
                                <motion.span
                                  key={i}
                                  className="block"
                                  style={{
                                    gridColumn: `span ${1 + (i % 3)}`,
                                    background:
                                      i % 3 === 0
                                        ? "color-mix(in oklab, var(--accent) 30%, transparent)"
                                        : "var(--surface-2)",
                                  }}
                                  initial={reduce ? false : { scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ duration: 0.6, delay: i * 0.05 }}
                                />
                              ))}
                            </div>
                          </div>
                          <ul className="flex flex-wrap gap-2">
                            {c.tech.map((t) => (
                              <li
                                key={t}
                                className="border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
