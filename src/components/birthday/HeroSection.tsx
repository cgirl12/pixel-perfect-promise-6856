import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import lilyStem from "@/assets/lily-stem.webp";
import lilyBloom from "@/assets/lily-bloom.webp";
import { FallingPetals, Sparkles } from "./FloralDecorations";
import type { BirthdayContent } from "@/content/birthday";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "60%", filter: "blur(6px)" },
  show: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { duration: 1, ease } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export function HeroSection({
  content,
  nickname,
  ready,
  onExplore,
}: {
  content: BirthdayContent["hero"];
  nickname: string;
  ready: boolean;
  onExplore: () => void;
}) {
  const state = ready ? "show" : "hidden";

  return (
    <section
      id="top"
      aria-label="Happy birthday"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background"
    >
      <FallingPetals count={9} className="-z-10" />
      <Sparkles className="-z-10" />

      {/* Masthead */}
      <motion.header
        initial="hidden"
        animate={state}
        variants={fadeUp}
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 text-[0.625rem] uppercase tracking-[0.3em] text-muted-foreground md:px-10 md:pt-8"
      >
        <span>№ 01</span>
        <span className="hidden sm:inline">The Birthday Edition</span>
        <span>A Blooming Day</span>
      </motion.header>
      <div className="mx-auto mt-4 h-px w-[calc(100%-3rem)] max-w-7xl bg-border md:w-[calc(100%-5rem)]" />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-6 px-6 pb-24 pt-6 md:grid-cols-12 md:px-10 md:pt-0">
        {/* Lily focal point */}
        <motion.div
          className="relative order-1 mx-auto w-[62%] max-w-[18rem] md:order-2 md:col-span-5 md:w-full md:max-w-none"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 1.6, ease, delay: 0.1 }}
        >
          <div aria-hidden="true" className="bg-glow absolute inset-[-15%] -z-10" />
          <img
            src={lilyStem}
            alt="Pink lilies in bloom"
            width={820}
            height={1390}
            fetchPriority="high"
            className="animate-sway relative max-h-[42svh] w-full object-contain md:max-h-[78svh]"
          />
          <img
            src={lilyBloom}
            alt=""
            aria-hidden="true"
            width={720}
            height={720}
            className="animate-gentle-float absolute -bottom-6 -left-10 w-24 opacity-90 md:-left-16 md:w-40"
          />
        </motion.div>

        {/* Editorial copy */}
        <div className="relative order-2 text-center md:order-1 md:col-span-7 md:text-left">
          <motion.p initial="hidden" animate={state} variants={fadeUp} className="eyebrow">
            {content.eyebrow}
          </motion.p>

          <motion.h1
            initial="hidden"
            animate={state}
            variants={container}
            className="text-balance-safe mt-5 text-[clamp(3.1rem,12vw,8.75rem)] font-normal leading-[0.9] tracking-[-0.02em]"
          >
            <span className="sr-only">
              {content.greeting} {nickname}!
            </span>
            <span aria-hidden="true">
              {content.greeting.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span variants={word} className="inline-block pr-[0.22em]">
                    {w}
                  </motion.span>
                </span>
              ))}
              <br />
              <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span variants={word} className="inline-block italic text-rose">
                  {nickname}
                  <span className="text-petal">!</span>
                </motion.span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate={state}
            variants={fadeUp}
            transition={{ delay: 0.9 }}
            className="mx-auto mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg"
          >
            {content.supporting}
          </motion.p>

          <motion.div
            initial="hidden"
            animate={state}
            variants={fadeUp}
            transition={{ delay: 1.1 }}
            className="mt-9"
          >
            <Button variant="bloom" size="pill" onClick={onExplore} className="group">
              {content.cta}
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to the next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.625rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-rose-ink"
      >
        <span>Scroll</span>
        <ArrowDown aria-hidden="true" className="animate-scroll-cue h-4 w-4" />
      </motion.a>
    </section>
  );
}
