import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Pause, Play, Repeat, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

/** Slim editorial progress bar backed by an accessible range input. */
export function ProgressBar({
  value,
  max,
  onSeek,
  label,
  className,
}: {
  value: number;
  max: number;
  onSeek: (v: number) => void;
  label: string;
  className?: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className={cn("group/bar relative flex h-5 flex-1 items-center", className)}>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-petal-soft">
        <div className="absolute inset-y-0 left-0 rounded-full bg-rose" style={{ width: `${pct}%` }} />
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-rose shadow-soft transition-transform group-hover/bar:scale-125"
        style={{ left: `${pct}%` }}
      />
      <input
        type="range"
        min={0}
        max={max || 0}
        step={0.01}
        value={value}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

export function VideoPlayer({
  src,
  poster,
  title,
  loop: initialLoop = false,
  onPlay,
}: {
  src: string;
  poster?: string | undefined;
  title: string;
  loop?: boolean | undefined;
  onPlay?: (() => void) | undefined;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(initialLoop);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    // Metadata can load before hydration, so read it once on mount too.
    const v = videoRef.current;
    if (v && v.readyState >= 1 && Number.isFinite(v.duration)) setDuration(v.duration);
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === videoRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const goFullscreen = () => {
    const v = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!v) return;
    if (v.requestFullscreen) void v.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.();
  };

  return (
    <div className="relative">
      <div
        className="group relative aspect-video w-full overflow-hidden rounded-[1.75rem] border border-border bg-foreground shadow-lift"
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "k") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop={loop}
          playsInline
          preload="metadata"
          controls={fullscreen}
          onClick={toggle}
          onPlay={() => {
            setPlaying(true);
            setStarted(true);
            onPlay?.();
          }}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onDurationChange={(e) => setDuration(e.currentTarget.duration || 0)}
          className="h-full w-full cursor-pointer object-cover"
          aria-label={title}
        />

        {/* Soft vignette + label */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent"
        />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[0.625rem] uppercase tracking-[0.25em] text-foreground backdrop-blur sm:left-6 sm:top-6">
          Memory reel · {formatTime(duration)}
        </span>

        {/* Centre play button */}
        <AnimatePresence>
          {!playing && (
            <motion.button
              type="button"
              onClick={toggle}
              aria-label={started ? "Resume video" : "Play video"}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className="motion-decor absolute h-24 w-24 animate-ping rounded-full bg-petal/30 [animation-duration:2.4s] sm:h-28 sm:w-28"
              />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background/95 text-rose-ink shadow-lift transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20">
                <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" aria-hidden="true" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating control bar */}
      <div
        role="group"
        aria-label="Video controls"
        className="relative z-10 mx-auto mt-3 flex sm:-mt-7 w-[calc(100%-1.5rem)] max-w-2xl items-center gap-2 rounded-full border border-border bg-background/95 px-2 py-1.5 shadow-soft backdrop-blur sm:w-[calc(100%-4rem)] sm:gap-3 sm:px-3"
      >
        <Button
          variant="bloom"
          size="icon"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="h-9 w-9 shrink-0"
        >
          {playing ? <Pause aria-hidden="true" /> : <Play className="ml-0.5" aria-hidden="true" />}
        </Button>
        <span className="w-10 shrink-0 text-right font-serif text-sm italic tabular-nums text-muted-foreground">
          {formatTime(time)}
        </span>
        <ProgressBar
          value={time}
          max={duration}
          label="Seek video"
          onSeek={(v) => {
            if (videoRef.current) videoRef.current.currentTime = v;
            setTime(v);
          }}
        />
        <span className="hidden w-10 shrink-0 font-serif text-sm italic tabular-nums text-muted-foreground sm:block">
          {formatTime(duration)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLoop((l) => !l)}
          aria-label={loop ? "Turn off replay" : "Replay automatically"}
          aria-pressed={loop}
          className={cn(
            "hidden h-9 w-9 shrink-0 rounded-full hover:bg-blush sm:inline-flex",
            loop ? "text-rose-ink" : "text-muted-foreground",
          )}
        >
          <Repeat aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          aria-pressed={muted}
          className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:bg-blush hover:text-rose-ink"
        >
          {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goFullscreen}
          aria-label="Watch full screen"
          className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:bg-blush hover:text-rose-ink"
        >
          <Maximize2 aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
