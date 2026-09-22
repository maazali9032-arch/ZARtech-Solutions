import type { Project } from "@/data/site";

/** Abstract interface compositions — built in markup, never fake screenshots. */
export function ProjectVisual({ project }: { project: Project }) {
  const v = project.visual;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface sm:aspect-[16/10]">
      <div className="zt-grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-0 zt-diagonal opacity-30" />

      {v === "erp" ? (
        <div className="relative grid h-full grid-cols-[1fr_2fr] gap-px bg-line">
          <div className="space-y-3 bg-surface p-4 sm:p-6">
            {["Overview", "Academics", "Attendance", "Fees", "Guardians", "Audit"].map((r, i) => (
              <div key={r} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5"
                  style={{ background: i === 2 ? "var(--accent)" : "var(--steel)" }}
                />
                <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase sm:text-[10px]">
                  {r}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-surface p-4 sm:p-6">
            <div className="mb-4 h-px w-full bg-line" />
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 border border-line sm:h-12"
                  style={{
                    borderColor: i % 4 === 0 ? "var(--accent)" : undefined,
                    background: i % 4 === 0 ? "color-mix(in oklab, var(--accent) 12%, transparent)" : undefined,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full"
                  style={{
                    height: 6 + ((i * 13) % 34),
                    background: i % 5 === 0 ? "var(--accent)" : "var(--muted)",
                    alignSelf: "flex-end",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : v === "product" ? (
        <div className="relative flex h-full items-center justify-center p-6">
          <div className="relative h-full w-full max-w-md">
            <div className="absolute top-1/2 left-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 border border-accent/60 bg-background/80 p-3">
              <div className="h-1.5 w-10 bg-accent" />
              <div className="mt-2 space-y-1.5">
                <div className="h-1 w-full bg-muted" />
                <div className="h-1 w-3/4 bg-muted" />
                <div className="h-1 w-1/2 bg-muted" />
              </div>
            </div>
            {["Users", "API", "Data", "Automation"].map((label, i) => {
              const pos = [
                "left-0 top-4",
                "right-0 top-4",
                "left-0 bottom-4",
                "right-0 bottom-4",
              ][i];
              return (
                <div
                  key={label}
                  className={`absolute ${pos} border border-line bg-surface-2 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase`}
                >
                  {label}
                </div>
              );
            })}
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              <g stroke="var(--line-strong)" strokeWidth="1" fill="none" strokeDasharray="3 6">
                <line x1="12%" y1="12%" x2="50%" y2="50%" />
                <line x1="88%" y1="12%" x2="50%" y2="50%" />
                <line x1="12%" y1="88%" x2="50%" y2="50%" />
                <line x1="88%" y1="88%" x2="50%" y2="50%" />
              </g>
            </svg>
          </div>
        </div>
      ) : (
        <div className="relative grid h-full grid-rows-[auto_1fr] p-5 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
              {project.industry}
            </span>
            <span className="h-1.5 w-1.5 bg-accent" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div
                  className="w-full flex-1 border border-line"
                  style={{
                    background:
                      i === 1
                        ? "linear-gradient(160deg, color-mix(in oklab, var(--accent) 22%, transparent), transparent)"
                        : "var(--surface-2)",
                    transform: `translateY(${i === 1 ? -10 : i === 2 ? 8 : 0}px)`,
                  }}
                />
                <div className="h-1 w-2/3 bg-muted" />
                <div className="h-1 w-1/3 bg-muted" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
