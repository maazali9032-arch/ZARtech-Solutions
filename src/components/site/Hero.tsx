import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { symbolUrl } from "./brand";

const HEADLINES = [
  ["We build", "what businesses", "need next."],
  ["Digital", "experiences."],
  ["Business", "systems."],
  ["Intelligent", "products."],
];

/** Generative node/line environment: geometry, not sci-fi. */
function SystemCanvas({ dispersion }: { dispersion: React.MutableRefObject<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    type Node = { x: number; y: number; ox: number; oy: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = mobile ? 26 : Math.min(72, Math.round((w * h) / 26000));
      nodes = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.2 + 0.6,
        };
      });
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    const pointer = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    if (!mobile) window.addEventListener("pointermove", onMove, { passive: true });

    const maxDist = mobile ? 130 : 170;

    const draw = () => {
      const d = dispersion.current;
      ctx.clearRect(0, 0, w, h);

      // architectural grid, fades as the system deconstructs
      ctx.strokeStyle = `rgba(255,255,255,${0.035 * (1 - d)})`;
      ctx.lineWidth = 1;
      const step = mobile ? 72 : 104;
      for (let x = (w % step) / 2; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = (h % step) / 2; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      for (const n of nodes) {
        n.ox += n.vx;
        n.oy += n.vy;
        if (n.ox < 0 || n.ox > w) n.vx *= -1;
        if (n.oy < 0 || n.oy > h) n.vy *= -1;

        // scroll-driven deconstruction: nodes drift outward from centre
        const dx0 = n.ox - w / 2;
        const dy0 = n.oy - h / 2;
        let tx = n.ox + dx0 * d * 0.55;
        let ty = n.oy + dy0 * d * 0.35;

        if (!mobile) {
          const mx = tx - pointer.x;
          const my = ty - pointer.y;
          const dist = Math.hypot(mx, my);
          if (dist < 180) {
            const f = (1 - dist / 180) * 26;
            tx += (mx / (dist || 1)) * f;
            ty += (my / (dist || 1)) * f;
          }
        }
        n.x += (tx - n.x) * 0.08;
        n.y += (ty - n.y) * 0.08;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.5 * (1 - d * 0.85);
            ctx.strokeStyle = `rgba(150,170,180,${alpha * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const near = !mobile && Math.hypot(a.x - pointer.x, a.y - pointer.y) < 150;
        ctx.fillStyle = near ? "rgba(60,170,190,0.95)" : `rgba(210,225,230,${0.5 * (1 - d * 0.7)})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + (near ? 1 : 0), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [dispersion, reduce]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const dispersion = useRef(0);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    dispersion.current = Math.min(1, Math.max(0, (v - 0.08) / 0.7));
    const i = v < 0.2 ? 0 : v < 0.45 ? 1 : v < 0.7 ? 2 : 3;
    setIndex(i);
  });

  const symbolScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const symbolOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.22, 0.1, 0.03]);
  const symbolRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const contentOpacity = useTransform(scrollYProgress, [0.82, 0.97], [1, 0]);

  const lines = HEADLINES[index]!;

  return (
    <section ref={sectionRef} id="top" className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <SystemCanvas dispersion={dispersion} />

        <motion.img
          src={symbolUrl}
          alt=""
          aria-hidden="true"
          style={{
            scale: symbolScale,
            opacity: symbolOpacity,
            rotate: symbolRotate,
            maskImage: "radial-gradient(closest-side, #000 25%, transparent 82%)",
            WebkitMaskImage: "radial-gradient(closest-side, #000 25%, transparent 82%)",
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 w-[78vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen select-none"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />

        <motion.div
          style={{ opacity: contentOpacity }}
          className="zt-shell relative flex h-full flex-col justify-end pb-16 sm:pb-20 lg:justify-center lg:pb-0"
        >
          <motion.p
            className="zt-eyebrow mb-6 flex items-center gap-3"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block h-px w-10 bg-accent" />
            ZARtech Solutions
          </motion.p>

          <h1 className="zt-display max-w-[16ch]" aria-label="We build what businesses need next.">
            {lines.map((line, i) => (
              <span key={index + line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            Digital experiences. Business systems. Intelligent products.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-5"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 font-mono text-[11px] tracking-[0.2em] text-background uppercase transition-colors duration-400 hover:bg-accent hover:text-accent-foreground"
            >
              Explore Our Work
              <span className="inline-block transition-transform duration-400 group-hover:translate-y-1">
                ↓
              </span>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-line-strong px-6 py-4 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-400 hover:border-accent hover:text-accent"
            >
              Start a Project
              <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          <div className="mt-14 hidden items-center gap-4 lg:flex">
            {HEADLINES.map((_, i) => (
              <span
                key={i}
                className="h-px w-14 transition-colors duration-500"
                style={{ background: i <= index ? "var(--accent)" : "var(--line-strong)" }}
              />
            ))}
            <span className="zt-eyebrow">System 0{index + 1} / 04</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
