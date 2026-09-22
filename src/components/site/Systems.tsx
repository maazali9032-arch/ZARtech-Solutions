import { motion, useReducedMotion } from "framer-motion";
import { systemCapabilities } from "@/data/site";
import { DrawRule, Reveal, RevealLines } from "./Reveal";

const layers = [
  { label: "Users", detail: "Roles, portals, permissions" },
  { label: "Application", detail: "Interfaces, workflows, state" },
  { label: "Business Logic", detail: "Rules, validation, processes" },
  { label: "Database", detail: "Relational architecture, integrity" },
  { label: "Storage", detail: "Documents, media, exports" },
  { label: "Automation", detail: "Jobs, notifications, integrations" },
];

const erpModules = [
  "Academic Management",
  "Attendance",
  "Fees",
  "Guardians",
  "Parent Portal",
  "Staff Portal",
  "Role-Based Access",
  "Import Centre",
  "Audit",
  "Cloud Infrastructure",
];

export function Systems() {
  const reduce = useReducedMotion();

  return (
    <section id="systems" className="relative border-t border-line py-28 sm:py-40">
      <div className="zt-grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="zt-shell relative">
        <p className="zt-eyebrow mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" />
          Beyond the interface
        </p>
        <RevealLines
          className="zt-display block"
          lines={["We also build", "the systems", "behind the business."]}
        />

        <div className="mt-24 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <h3 className="font-display text-xl font-bold tracking-[-0.02em] uppercase">
                Enterprise &amp; Business Systems
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                We engineer operational software that connects people, workflows, data and
                business processes.
              </p>
            </Reveal>
            <ul className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {systemCapabilities.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 0.02} className="border-b border-line py-3">
                  <span className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1 w-1 shrink-0 bg-accent" />
                    {c}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Engineering visualization */}
          <div className="relative">
            <div className="sticky top-28">
              <p className="zt-eyebrow mb-8">System Architecture</p>
              <ol className="relative pr-1 sm:pr-0">
                {layers.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={reduce ? false : { opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative border border-line bg-surface/70 p-5 backdrop-blur-[2px] transition-colors duration-500 hover:border-accent"
                    style={{ marginTop: i === 0 ? 0 : 28, marginLeft: `calc(${i} * min(10px, 1vw))` }}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-sm font-bold tracking-[0.06em] uppercase">
                        {l.label}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                        L{i + 1}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                      {l.detail}
                    </p>
                    {i < layers.length - 1 && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute -bottom-7 left-8 block h-7 w-px bg-accent/60"
                        initial={reduce ? false : { scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.09 }}
                        style={{ transformOrigin: "top" }}
                      />
                    )}
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* ERP platform, presented generically */}
        <div className="mt-32">
          <DrawRule />
          <div className="grid gap-10 pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <p className="zt-eyebrow mb-5">Enterprise · ERP · Business Systems</p>
              <h3 className="font-display text-3xl leading-[0.95] font-extrabold tracking-[-0.03em] uppercase sm:text-5xl">
                Multi-role school management platform
              </h3>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  A full-scale management platform connecting academic operations, attendance,
                  fees, guardians, staff, administration and role-specific portals through a
                  unified system.
                </p>
              </Reveal>
              <ul className="mt-10 flex flex-wrap gap-2">
                {erpModules.map((m, i) => (
                  <Reveal as="li" key={m} delay={0.15 + i * 0.03}>
                    <span className="block border border-line px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase transition-colors duration-400 hover:border-accent hover:text-foreground">
                      {m}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
