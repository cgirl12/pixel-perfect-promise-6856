import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/** Fade + slide-up when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Editorial section header: number, eyebrow label and serif heading. */
export function SectionHeader({
  number,
  eyebrow,
  heading,
  align = "left",
}: {
  number: string;
  eyebrow: string;
  heading: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
        <span className="font-serif text-lg italic text-rose">{number}</span>
        <span className="h-px w-10 bg-petal" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="text-balance-safe mt-5 text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.02]">
        {heading}
      </h2>
    </Reveal>
  );
}
