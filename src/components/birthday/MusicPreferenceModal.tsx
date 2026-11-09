import { AnimatePresence, motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import lilySprig from "@/assets/lily-sprig.webp";
import lilyBloom from "@/assets/lily-bloom.webp";
import { FallingPetals, PetalDivider } from "./FloralDecorations";
import type { BirthdayContent } from "@/content/birthday";

export function MusicPreferenceModal({
  open,
  content,
  onChoose,
}: {
  open: boolean;
  content: BirthdayContent["musicModal"];
  onChoose: (withMusic: boolean) => void;
}) {
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    firstButton.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="music-modal"
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-background px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div aria-hidden="true" className="bg-glow absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2" />
          <img
            src={lilySprig}
            alt=""
            aria-hidden="true"
            width={640}
            height={707}
            className="animate-sway pointer-events-none absolute -left-16 -top-10 w-56 -scale-x-100 rotate-[160deg] opacity-30 md:w-80"
          />
          <img
            src={lilyBloom}
            alt=""
            aria-hidden="true"
            width={720}
            height={720}
            className="animate-gentle-float pointer-events-none absolute -bottom-16 -right-16 w-60 opacity-30 md:w-96"
          />
          <FallingPetals count={6} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="music-modal-title"
            aria-describedby="music-modal-desc"
            className="relative w-full max-w-md rounded-3xl border border-border bg-background/95 px-7 py-10 text-center shadow-lift backdrop-blur sm:px-10 sm:py-12"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="music-modal-title" className="mt-4 text-4xl leading-tight sm:text-[2.75rem]">
              {content.heading}
            </h2>
            <PetalDivider className="mt-5 justify-center" />
            <p id="music-modal-desc" className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              {content.description}
            </p>
            <div className="mt-9 flex flex-col gap-3">
              <Button
                ref={firstButton}
                variant="bloom"
                size="pill"
                onClick={() => onChoose(true)}
              >
                <Music aria-hidden="true" />
                {content.yes}
              </Button>
              <Button variant="petal" size="pill" onClick={() => onChoose(false)}>
                <VolumeX aria-hidden="true" />
                {content.no}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
