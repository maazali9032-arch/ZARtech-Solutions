import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, workFilters } from "@/data/site";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal, RevealLines } from "./Reveal";

export function Work() {
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  return (
    <section id="work" className="relative border-t border-line py-28 sm:py-40">
      <div className="zt-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="zt-eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-accent" />
              Selected Work
            </p>
            <RevealLines
              className="font-display text-[12vw] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-7xl lg:text-8xl"
              lines={["What we", "have built."]}
            />
          </div>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Work presented by industry, solution and capability.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-3" role="tablist" aria-label="Work categories">
          {workFilters.map((f) => {
            const activeFilter = filter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter}
                onClick={() => {
                  setFilter(f.id);
                  setOpenId(null);
                }}
                className="group relative py-1 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
                style={{ color: activeFilter ? "var(--foreground)" : "var(--muted-foreground)" }}
              >
                {f.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-500"
                  style={{ transform: activeFilter ? "scaleX(1)" : "scaleX(0)" }}
                />
              </button>
            );
          })}
        </div>

        <ul className="mt-6 border-t border-line">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((p) => {
              const expanded = openId === p.id;
              return (
                <motion.li
                  key={p.id}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group border-b border-line"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(expanded ? null : p.id)}
                      aria-expanded={expanded}
                      aria-controls={`panel-${p.id}`}
                      className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-7 text-left sm:gap-8 sm:py-9"
                    >
                      <span
                        className="font-mono text-[11px] tracking-[0.2em] transition-all duration-500 group-hover:translate-y-[-2px]"
                        style={{ color: expanded ? "var(--accent)" : "var(--muted-foreground)" }}
                      >
                        {p.number}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[7.5vw] leading-[1] font-extrabold tracking-[-0.035em] uppercase transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:text-4xl lg:text-6xl">
                          {p.industry}{" "}
                          <span
                            className="transition-colors duration-500"
                            style={{ color: expanded ? "var(--accent)" : "var(--steel)" }}
                          >
                            {p.title}
                          </span>
                        </span>
                        <span className="mt-2 block font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:text-[11px]">
                          {p.meta}
                        </span>
                      </span>
                      <span
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-500"
                        style={{
                          borderColor: expanded ? "var(--accent)" : "var(--line-strong)",
                          color: expanded ? "var(--accent)" : "var(--muted-foreground)",
                        }}
                        aria-hidden="true"
                      >
                        <span className="absolute h-px w-3 bg-current" />
                        <span
                          className="absolute h-3 w-px bg-current transition-transform duration-500"
                          style={{ transform: expanded ? "scaleY(0)" : "scaleY(1)" }}
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={`panel-${p.id}`}
                        key="panel"
                        initial={reduce ? { height: "auto" } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
                          <motion.div
                            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
                            animate={{ clipPath: "inset(0 0 0% 0)" }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <ProjectVisual project={p} />
                          </motion.div>
                          <div className="flex flex-col justify-between gap-8">
                            <motion.p
                              className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
                              initial={reduce ? false : { opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                            >
                              {p.description}
                            </motion.p>
                            <div>
                              <p className="zt-eyebrow mb-4">Capabilities</p>
                              <ul className="flex flex-wrap gap-2">
                                {p.capabilities.map((c, i) => (
                                  <motion.li
                                    key={c}
                                    initial={reduce ? false : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.25 + i * 0.05 }}
                                    className="border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
                                  >
                                    {c}
                                  </motion.li>
                                ))}
                              </ul>
                              <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                                Status —{" "}
                                <span className="text-accent">
                                  {p.status === "delivered" ? "Delivered" : "Ongoing"}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
