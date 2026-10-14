/**
 * ScholarDesk brand lockups, shared across the auth app.
 *
 * Every image lives in /public/brand (mirrored from the public site's brand
 * kit) so a file can be swapped by replacing it without touching code.
 * Numbering below matches /public/brand/BRAND-README.md:
 *
 *   /brand/monogram-blue.png     standalone mark, light backgrounds  (01)
 *   /brand/monogram-navy.png     standalone mark, deep-ink tone      (02)
 *   /brand/monogram-reverse.png  mark on a blue field / dark photo   (03)
 *   /brand/wordmark-full.png     compact monogram + "esk" signature  (04)
 *   /brand/signature-reverse.png signature on a blue field           (06)
 *   /brand/wordmark-full-01.png  full "ScholarDesk" lockup           (07)
 *   /brand/og-image.png          social share card, light            (09)
 */
export const BRAND = {
  monogram: "/brand/monogram-blue.png",
  monogramNavy: "/brand/monogram-navy.png",
  monogramReverse: "/brand/monogram-reverse.png",
  signature: "/brand/wordmark-full.png",
  signatureReverse: "/brand/signature-reverse.png",
  wordmark: "/brand/wordmark-full-01.png",
  ogImage: "/brand/og-image.png",
} as const;

type Variant = "wordmark" | "signature" | "monogram";

const HEIGHTS: Record<Variant, string> = {
  wordmark: "h-9",
  signature: "h-9",
  monogram: "h-9 w-9",
};

/**
 * Primary logo. `variant="wordmark"` is the default full lockup;
 * `tone="inverse"` swaps to the reverse artwork for blue / navy fields.
 */
export function Logo({
  className = "",
  variant = "wordmark",
  tone = "default",
}: {
  className?: string;
  variant?: Variant;
  tone?: "default" | "inverse";
}) {
  const src =
    variant === "monogram"
      ? tone === "inverse"
        ? BRAND.monogramReverse
        : BRAND.monogram
      : variant === "signature"
        ? tone === "inverse"
          ? BRAND.signatureReverse
          : BRAND.signature
        : BRAND.wordmark;

  return (
    <img
      src={src}
      alt="ScholarDesk"
      className={`${HEIGHTS[variant]} w-auto shrink-0 object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}
