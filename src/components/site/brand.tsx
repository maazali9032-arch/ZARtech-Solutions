import symbolAsset from "@/assets/zartech-symbol.png.asset.json";
import lockupAsset from "@/assets/zartech-lockup.png.asset.json";

export const symbolUrl = symbolAsset.url;
export const lockupUrl = lockupAsset.url;

/** Official ZARtech symbol, used unmodified. */
export function Symbol({ className = "", alt = "ZARtech Solutions symbol" }) {
  return <img src={symbolUrl} alt={alt} className={className} loading="lazy" decoding="async" />;
}

/** Full ZARtech lockup: symbol, wordmark and SOLUTIONS descriptor. */
export function Lockup({ className = "" }) {
  return (
    <img
      src={lockupUrl}
      alt="ZARtech Solutions"
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}
