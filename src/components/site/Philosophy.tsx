import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealLines } from "./Reveal";

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-line py-32 sm:py-48">
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute -top-10 left-0 font-display text-[28vw] leading-none font-extrabold text-foreground/[0.025] uppercase select-none"
        aria-hidden="true"
      >
        ZARtech
      </motion.div>

      <div className="zt-shell relative">
        <RevealLines
          className="zt-display block"
          lines={["Built,", "not promised."]}
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal delay={0.1}>
            <p className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Our work is the evidence.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              From customer-facing digital experiences to operational platforms and custom
              products, we build technology around real business requirements.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
