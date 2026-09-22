import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/data/site";
import { symbolUrl } from "./brand";
import { RevealLines } from "./Reveal";

export function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-32 sm:py-48">
      <div className="zt-shell relative">
        <p className="zt-eyebrow mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" />
          Contact
        </p>

        <RevealLines className="zt-display block" lines={["Have something", "worth building?"]} />

        <p className="mt-10 max-w-xl text-base text-muted-foreground sm:text-lg">
          Let's turn the idea into something real.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3 sm:gap-5">
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-3 bg-foreground px-7 py-4 font-mono text-[11px] tracking-[0.2em] text-background uppercase transition-colors duration-400 hover:bg-accent hover:text-accent-foreground"
          >
            Start a Project
            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-3 border border-line-strong px-7 py-4 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-400 hover:border-accent hover:text-accent"
          >
            WhatsApp
            <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <dl className="mt-14 grid max-w-md grid-cols-2 gap-6 border-t border-line pt-8">
          <div>
            <dt className="zt-eyebrow">WhatsApp</dt>
            <dd className="mt-2 font-mono text-sm">{contact.whatsapp}</dd>
          </div>
          <div>
            <dt className="zt-eyebrow">Contact</dt>
            <dd className="mt-2 font-mono text-sm">{contact.person}</dd>
          </div>
        </dl>

        {/* Finish with the official ZARtech symbol, presented without effects. */}
        <div className="relative mt-28 flex flex-col items-center">
          <motion.img
            src={symbolUrl}
            alt="ZARtech Solutions symbol"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-40 select-none sm:w-56"
          />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-10 font-display text-xl font-extrabold tracking-[-0.02em] uppercase sm:text-3xl"
          >
            ZARtech Solutions
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Let's build something that matters.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
