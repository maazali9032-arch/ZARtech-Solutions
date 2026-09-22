import symbolAsset from "@/assets/zartech-symbol.webp";

// Keep the official brand artwork bundled with the site so production never
// depends on an editor-specific asset service.
export const symbolUrl = symbolAsset;

/** Official ZARtech symbol, used unmodified. */
export function Symbol({ className = "", alt = "ZARtech Solutions symbol" }) {
  return <img src={symbolUrl} alt={alt} className={className} loading="lazy" decoding="async" />;
}
