import { useId } from "react";
import { cn } from "@/lib/utils";

/** A small honey bee drawn in SVG, facing left. Wings flap while `flying`. */
export function BeeIcon({ flying = false, className }: { flying?: boolean; className?: string }) {
  const id = useId();
  const wing = cn("bee-wing", flying && "animate-wing-flap");
  return (
    <svg viewBox="0 0 40 32" aria-hidden="true" className={cn("overflow-visible", className)}>
      <defs>
        <clipPath id={`${id}-body`}>
          <ellipse cx="22" cy="20" rx="11" ry="7.5" />
        </clipPath>
        <radialGradient id={`${id}-gold`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0%" style={{ stopColor: "var(--bee-honey)" }} />
          <stop offset="100%" style={{ stopColor: "var(--bee-gold)" }} />
        </radialGradient>
      </defs>
      {/* back wing */}
      <g className={wing} style={{ animationDelay: "-0.04s" }}>
        <ellipse
          cx="25"
          cy="8.5"
          rx="6.5"
          ry="8.5"
          transform="rotate(22 25 8.5)"
          fill="var(--bee-wing)"
          stroke="var(--petal)"
          strokeWidth="0.8"
        />
      </g>
      {/* body */}
      <ellipse cx="22" cy="20" rx="11" ry="7.5" fill={`url(#${id}-gold)`} />
      <g clipPath={`url(#${id}-body)`} fill="var(--bee-ink)">
        <rect x="17.5" y="10" width="3" height="20" rx="1" />
        <rect x="23.5" y="10" width="3" height="20" rx="1" />
        <rect x="29.5" y="10" width="2.6" height="20" rx="1" />
      </g>
      <path d="M32.6 19.2 36.5 20.4 32.6 21.6Z" fill="var(--bee-ink)" />
      {/* head + antennae */}
      <circle cx="10.5" cy="18.5" r="5.2" fill="var(--bee-ink)" />
      <circle cx="8.4" cy="17.3" r="1.1" fill="var(--background)" />
      <path
        d="M9.5 13.8C8.6 10.6 6.6 8.8 4.4 8.4M12 13.6c.2-3.2 1.6-5.4 3.6-6.4"
        stroke="var(--bee-ink)"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="4.2" cy="8.3" r="1" fill="var(--bee-ink)" />
      <circle cx="15.8" cy="7" r="1" fill="var(--bee-ink)" />
      {/* front wing */}
      <g className={wing}>
        <ellipse
          cx="19.5"
          cy="9"
          rx="6"
          ry="8.5"
          transform="rotate(-14 19.5 9)"
          fill="var(--bee-wing)"
          stroke="var(--petal)"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}
