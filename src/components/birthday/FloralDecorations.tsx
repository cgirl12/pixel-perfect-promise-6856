import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** A single soft lily petal drawn as SVG. */
export function PetalShape({ className, style }: { className?: string; style?: CSSProperties }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 36" aria-hidden="true" className={className} style={style}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--petal-soft)" }} />
          <stop offset="60%" style={{ stopColor: "var(--petal)" }} />
          <stop offset="100%" style={{ stopColor: "var(--rose)" }} />
        </linearGradient>
      </defs>
      <path
        d="M12 1C5 9 2 17 4 25c1.5 6 6 10 8 10s6.5-4 8-10c2-8-1-16-8-24Z"
        fill={`url(#${id}-g)`}
        opacity="0.9"
      />
      <path
        d="M12 5c-.6 8-.6 18 0 28"
        stroke="var(--rose)"
        strokeOpacity="0.35"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

/** Petals drifting down through a section. Positions are deterministic (SSR-safe). */
export function FallingPetals({ count = 10, className }: { count?: number; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("motion-decor pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37 + 11) % 100;
        const size = 10 + ((i * 7) % 12);
        const style = {
          left: `${left}%`,
          width: size,
          height: size * 1.5,
          "--petal-delay": `${-((i * 1.9) % 14)}s`,
          "--petal-duration": `${13 + ((i * 3) % 9)}s`,
          "--petal-drift": `${(i % 2 ? 1 : -1) * (24 + ((i * 13) % 50))}px`,
        } as CSSProperties;
        return (
          <span key={i} className="animate-petal-fall absolute -top-10 block" style={style}>
            <PetalShape className="h-full w-full" />
          </span>
        );
      })}
    </div>
  );
}

const SPARKLE_SPOTS = [
  { top: "12%", left: "8%", size: 14, delay: 0 },
  { top: "22%", left: "88%", size: 10, delay: 1.1 },
  { top: "68%", left: "14%", size: 9, delay: 2.2 },
  { top: "78%", left: "82%", size: 13, delay: 0.6 },
  { top: "40%", left: "94%", size: 8, delay: 1.7 },
  { top: "48%", left: "4%", size: 11, delay: 2.8 },
];

/** Minimal four-point sparkles that softly twinkle. */
export function Sparkles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("motion-decor pointer-events-none absolute inset-0", className)}
    >
      {SPARKLE_SPOTS.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="animate-twinkle absolute text-petal"
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--twinkle-delay": `${s.delay}s`,
            } as CSSProperties
          }
        >
          <path d="M10 0c.8 5.2 4.8 9.2 10 10-5.2.8-9.2 4.8-10 10-.8-5.2-4.8-9.2-10-10 5.2-.8 9.2-4.8 10-10Z" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

/** Thin editorial divider with a tiny petal at its center. */
export function PetalDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-10 bg-petal/70" />
      <PetalShape className="h-3.5 w-2.5" />
      <span className="h-px w-10 bg-petal/70" />
    </div>
  );
}
