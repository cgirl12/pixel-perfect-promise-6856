import { motion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import lilyArrangement from "@/assets/lily-arrangement.webp";
import { FallingPetals, PetalDivider, Sparkles } from "./FloralDecorations";
import { Reveal } from "./Reveal";
import type { BirthdayContent } from "@/content/birthday";

export function FinalWish({
  content,
  footer,
  onCelebrate,
}: {
  content: BirthdayContent["finalWish"];
  footer: string;
  onCelebrate: () => void;
}) {
  const closingRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(closingRef, { once: true, amount: 0.8 });

  useEffect(() => {
    if (inView) onCelebrate();
  }, [inView, onCelebrate]);

  return (
    <section
      id="wish"
      aria-label={content.heading}
      className="relative isolate overflow-hidden bg-background pt-28 md:pt-40"
    >
      <FallingPetals count={12} className="-z-10" />
      <Sparkles className="-z-10" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">{content.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-balance-safe mt-6 text-[clamp(2.75rem,8.5vw,6.5rem)] font-normal leading-[0.98]">
            {content.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <PetalDivider className="mt-8 justify-center" />
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.description}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p ref={closingRef} className="mt-12 font-serif text-4xl italic text-rose md:text-5xl">
            {content.closing}
          </p>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto -mb-4 mt-14 w-[130%] max-w-6xl -translate-x-[11.5%] sm:w-full sm:translate-x-0"
      >
        <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10 scale-110" />
        <img
          src={lilyArrangement}
          alt="An arrangement of pink lilies"
          loading="lazy"
          width={1400}
          height={635}
          className="animate-gentle-float w-full"
        />
      </motion.div>

      <footer className="relative border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:flex-row md:px-10">
          <span>{footer}</span>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors hover:text-rose-ink"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </section>
  );
}
