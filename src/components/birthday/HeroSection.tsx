import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import lilyStem from "@/assets/lily-stem.webp";
import lilyBloom from "@/assets/lily-bloom.webp";
import { FallingPetals, Sparkles } from "./FloralDecorations";
import { BeeIcon } from "./LittleBee";
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
/** Where the upper lily's center sits inside lily-stem.webp, in % of the image box. */
const LILY_CORE = { x: 35.5, y: 32.5 };
const BEE_SIZE = "h-6 w-6 -ml-3 -mt-3 md:h-7 md:w-7 md:-ml-3.5 md:-mt-3.5";

type BeePhase = "hidden" | "perched" | "flying" | "landed";
type Flight = { x: number[]; y: number[]; flip: boolean };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export function HeroSection({
  content,
  nickname,
  petName,
  ready,
  onExplore,
}: {
  content: BirthdayContent["hero"];
  nickname: string;
  petName: string;
  ready: boolean;
  onExplore: () => void;
}) {
  const state = ready ? "show" : "hidden";
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const [bee, setBee] = useState<BeePhase>("hidden");
  const [settled, setSettled] = useState(false);
  const [flight, setFlight] = useState<Flight | null>(null);

  // After the music choice: the bee lands on the lily, rests, then flies to the masthead.
  useEffect(() => {
    if (!ready) return;
    if (reduceMotion) {
      setBee("landed");
      return;
    }
    const perch = window.setTimeout(() => setBee("perched"), 1700);
    const takeOff = window.setTimeout(() => {
      const s = sectionRef.current?.getBoundingClientRect();
      const a = anchorRef.current?.getBoundingClientRect();
      const t = slotRef.current?.getBoundingClientRect();
      if (!s || !a || !t) return setBee("landed");
      const sx = a.left - s.left;
      const sy = a.top - s.top;
      const ex = t.left + t.width / 2 - s.left;
      const ey = t.top + t.height / 2 - s.top;
      const dx = ex - sx;
      const dy = ey - sy;
      setFlight({
        x: [sx, sx + dx * 0.2 + 40, sx + dx * 0.55 - 30, sx + dx * 0.85 + 14, ex],
        y: [sy, sy + dy * 0.15 - 50, sy + dy * 0.6 + 34, ey + 18, ey],
        flip: dx > 0,
      });
      setBee("flying");
    }, 4600);
    return () => {
      window.clearTimeout(perch);
      window.clearTimeout(takeOff);
    };
  }, [ready, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Happy birthday"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background"
    >
      <FallingPetals count={9} className="-z-10" />
      <Sparkles className="-z-10" />

      {/* The little bee in flight, from the lily to the masthead */}
      {bee === "flying" && flight && (
        <motion.span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 z-30 ${BEE_SIZE}`}
          initial={{ x: flight.x[0] ?? 0, y: flight.y[0] ?? 0, rotate: 0 }}
          animate={{ x: flight.x, y: flight.y, rotate: [0, -14, 10, -6, 0] }}
          transition={{ duration: 2.8, ease: "easeInOut", times: [0, 0.25, 0.55, 0.85, 1] }}
          onAnimationComplete={() => setBee("landed")}
        >
          <BeeIcon flying className={`h-full w-full ${flight.flip ? "-scale-x-100" : ""}`} />
        </motion.span>
      )}

      {/* Masthead */}
      <motion.header
        initial="hidden"
        animate={state}
        variants={fadeUp}
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 text-[0.625rem] uppercase tracking-[0.3em] text-muted-foreground md:px-10 md:pt-8"
      >
        <span
          ref={slotRef}
          role="img"
          aria-label={petName}
          className="group relative inline-flex h-6 w-6 shrink-0 items-center justify-center md:h-7 md:w-7"
        >
          {bee === "landed" && (
            <motion.span
              className="block h-full w-full"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1, y: [0, -2, 0] }}
              transition={{
                scale: { duration: 0.4 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <BeeIcon className="h-full w-full [&_.bee-wing]:group-hover:animate-wing-flap" />
            </motion.span>
          )}
          <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap font-serif text-sm normal-case italic tracking-normal text-rose-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {petName}
          </span>
        </span>
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
          {/* Wrapper hugs the image exactly so the bee's % position stays on the lily's center */}
          <div className="animate-sway relative mx-auto w-fit max-w-full">
            <img
              src={lilyStem}
              alt="Pink lilies in bloom"
              width={820}
              height={1390}
              fetchPriority="high"
              className="relative block h-auto max-h-[42svh] w-auto max-w-full md:max-h-[78svh]"
            />
            <span
              ref={anchorRef}
              aria-hidden="true"
              className="absolute h-0 w-0"
              style={{ left: `${LILY_CORE.x}%`, top: `${LILY_CORE.y}%` }}
            >
              {bee === "perched" && (
                <motion.span
                  className={`absolute left-0 top-0 block ${BEE_SIZE}`}
                  initial={{ opacity: 0, x: 36, y: -44, scale: 0.6, rotate: -18 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  onAnimationComplete={() => setSettled(true)}
                >
                  <BeeIcon flying={!settled} className="h-full w-full" />
                </motion.span>
              )}
            </span>
          </div>
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
