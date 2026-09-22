import { contact, navLinks } from "@/data/site";
import { symbolUrl } from "./brand";

export function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="zt-shell grid gap-10 sm:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={symbolUrl} alt="" className="h-8 w-8 object-contain" loading="lazy" />
            <span className="font-display text-sm font-extrabold tracking-[-0.02em] uppercase">
              ZARtech<span className="text-accent">.</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Digital systems. Digital experiences. Digital products.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="zt-link-underline font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="zt-link-underline block transition-colors hover:text-foreground"
          >
            WhatsApp {contact.whatsapp}
          </a>
          <p>{contact.person}</p>
          <p className="pt-6">© 2026 ZARtech Solutions</p>
        </div>
      </div>
    </footer>
  );
}
