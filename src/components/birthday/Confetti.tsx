import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["bg-petal", "bg-rose", "bg-petal-soft", "bg-rose-ink"];

/** A light, one-off confetti burst. Re-fires whenever `trigger` increases. */
export function Confetti({ trigger }: { trigger: number }) {
  const reduce = useReducedMotion();

  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: `${trigger}-${i}`,
        x: (Math.random() - 0.5) * Math.min(900, typeof window === "undefined" ? 600 : window.innerWidth),
        rise: 160 + Math.random() * 260,
        fall: 380 + Math.random() * 320,
        rotate: (Math.random() - 0.5) * 720,
        delay: Math.random() * 0.15,
        color: COLORS[i % COLORS.length],
        shape: i % 3 === 0 ? "h-2 w-2 rounded-full" : "h-3 w-1.5 rounded-[2px]",
      })),
    [trigger],
  );

  if (!trigger || reduce) return null;

  return (
    <div
      key={trigger}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[55%] z-[70] flex justify-center"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute ${p.shape} ${p.color}`}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: [0, p.x * 0.7, p.x],
            y: [0, -p.rise, p.fall],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: 2.4, delay: p.delay, ease: [0.2, 0.7, 0.4, 1] }}
        />
      ))}
    </div>
  );
}
