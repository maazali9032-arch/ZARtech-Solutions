import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks } from "@/data/site";
import { symbolUrl } from "./brand";

const sectionIds = ["work", "capabilities", "systems", "about", "contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-background/70 py-3 backdrop-blur-xl"
            : "py-6"
        }`}
      >
        <nav className="zt-shell flex items-center justify-between gap-6" aria-label="Primary">
          <a
            href="#top"
            className="group flex shrink-0 items-center gap-3"
            aria-label="ZARtech Solutions — home"
          >
            <img
              src={symbolUrl}
              alt=""
              className="h-7 w-7 object-contain transition-transform duration-500 group-hover:-translate-y-0.5 sm:h-8 sm:w-8"
            />
            <span className="font-display text-sm font-extrabold tracking-[-0.02em] uppercase">
              ZARtech<span className="text-accent">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => {
              const id = l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="zt-link-underline font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-300"
                    style={{ color: active === id ? "var(--foreground)" : "var(--muted-foreground)" }}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 border border-line-strong px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-400 hover:border-accent hover:text-accent sm:inline-flex"
            >
              Start a Project
              <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                →
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border border-line-strong transition-colors hover:border-accent lg:hidden"
            >
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-background"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="zt-diagonal pointer-events-none absolute inset-0 opacity-40" />
            <div className="zt-shell relative flex items-center justify-between py-6">
              <span className="font-display text-sm font-extrabold tracking-[-0.02em] uppercase">
                ZARtech<span className="text-accent">.</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center border border-line-strong text-lg transition-colors hover:border-accent hover:text-accent"
              >
                ×
              </button>
            </div>

            <div className="zt-shell relative flex flex-1 flex-col justify-center">
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between gap-4 py-4 font-display text-[clamp(1.9rem,10vw,3.2rem)] leading-[1] font-extrabold tracking-[-0.04em] uppercase sm:text-6xl"
                      initial={reduce ? false : { y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.18 + i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {l.label}
                      <span className="zt-eyebrow shrink-0">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-10 inline-flex items-center gap-3 self-start bg-accent px-6 py-4 font-mono text-[11px] tracking-[0.2em] text-accent-foreground uppercase"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Start a Project →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
