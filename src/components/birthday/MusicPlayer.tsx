import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MusicPlayer({
  visible,
  playing,
  muted,
  title,
  onToggle,
  onToggleMute,
}: {
  visible: boolean;
  playing: boolean;
  muted: boolean;
  title: string;
  onToggle: () => void;
  onToggleMute: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-border bg-background/90 p-1.5 shadow-soft backdrop-blur sm:bottom-6 sm:right-6"
          role="group"
          aria-label="Music controls"
        >
          <div className="hidden items-end gap-[3px] pl-3 pr-1 sm:flex" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-petal"
                animate={playing && !muted ? { height: [5, 14, 7, 12, 5] } : { height: 4 }}
                transition={
                  playing && !muted
                    ? { duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }
                    : { duration: 0.3 }
                }
              />
            ))}
          </div>
          <span className="hidden max-w-40 truncate px-1 font-serif text-sm italic text-muted-foreground md:block">
            {title}
          </span>
          <Button
            variant="float"
            size="icon-lg"
            onClick={onToggle}
            aria-label={playing ? "Pause music" : "Play music"}
            aria-pressed={playing}
            className={cn(playing && "text-rose-ink")}
          >
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </Button>
          <Button
            variant="float"
            size="icon-lg"
            onClick={onToggleMute}
            aria-label={muted ? "Unmute music" : "Mute music"}
            aria-pressed={muted}
          >
            {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
