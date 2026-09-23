import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Philosophy } from "@/components/site/Philosophy";
import { Work } from "@/components/site/Work";
import { Systems } from "@/components/site/Systems";
import { ProductEngineering } from "@/components/site/ProductEngineering";
import { Capabilities } from "@/components/site/Capabilities";
import { Technology } from "@/components/site/Technology";
import { Craft } from "@/components/site/Craft";
import { About } from "@/components/site/About";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

const title = "ZARtech Solutions — Digital Systems, Experiences & Products";
const description =
  "ZARtech Solutions designs and engineers digital experiences, business systems, ERP platforms, automation and custom digital products.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "ZARtech Solutions",
              description,
              url: "/",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                telephone: "+91 9493553093",
              },
            },
            {
              "@type": "WebSite",
              name: "ZARtech Solutions",
              url: "/",
              description,
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Work />
        <Systems />
        <ProductEngineering />
        <Capabilities />
        <Technology />
        <Craft />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
