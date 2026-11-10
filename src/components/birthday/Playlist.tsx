import { motion } from "framer-motion";
import { ExternalLink, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import lilyBloom from "@/assets/lily-bloom.webp";
import lilySprig from "@/assets/lily-sprig.webp";
import { cn } from "@/lib/utils";
import type { MusicController, Track } from "@/hooks/use-background-music";
import type { BirthdayContent } from "@/content/birthday";
import { Reveal, SectionHeader } from "./Reveal";
import { ProgressBar, formatTime } from "./VideoPlayer";

const pad = (n: number) => String(n).padStart(2, "0");

function Equalizer({ active }: { active: boolean }) {
  return (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-rose"
          animate={active ? { height: [4, 14, 6, 12, 4] } : { height: 4 }}
          transition={
            active
              ? { duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
      ))}
    </span>
  );
}

export function Playlist({
  content,
  tracks,
  music,
}: {
  content: BirthdayContent["playlist"];
  /** Same songs as `content.songs`, with stable ids for the shared player. */
  tracks: Track[];
  music: MusicController;
}) {
  const activeIndex = tracks.findIndex((t) => t.id === music.current.id);
  const isPlaylistActive = activeIndex !== -1;
  const shownIndex = isPlaylistActive ? activeIndex : 0;
  const shown = content.songs[shownIndex]!;
  const isPlaying = isPlaylistActive && music.playing;

  return (
    <section
      id="playlist"
      aria-label={content.heading}
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <img
        src={lilySprig}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={640}
        height={707}
        className="pointer-events-none absolute -left-14 bottom-10 w-36 -scale-x-100 rotate-12 opacity-50 md:w-52"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader number="05" eyebrow={content.eyebrow} heading={content.heading} />

        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* Now playing */}
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-blush p-7 shadow-card sm:p-10">
              <div className="relative mx-auto aspect-square w-full max-w-[17rem]">
                <div aria-hidden="true" className="bg-glow absolute inset-[-12%]" />
                <div
                  className={cn(
                    "animate-disc relative h-full w-full rounded-full border border-petal/50 bg-background shadow-lift",
                    !isPlaying && "[animation-play-state:paused]",
                  )}
                >
                  {[10, 20, 30].map((inset) => (
                    <span
                      key={inset}
                      aria-hidden="true"
                      className="absolute rounded-full border border-petal-soft"
                      style={{ inset: `${inset}%` }}
                    />
                  ))}
                  <img
                    src={lilyBloom}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={720}
                    height={720}
                    className="absolute inset-[22%] h-[56%] w-[56%] object-contain"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-petal bg-background"
                  />
                </div>
              </div>

              <div className="mt-8 text-center" aria-live="polite">
                <p className="eyebrow">
                  {isPlaying ? "Now playing" : isPlaylistActive ? "Paused" : "Ready to play"} ·{" "}
                  {pad(shownIndex + 1)}/{pad(tracks.length)}
                </p>
                <p className="text-balance-safe mt-3 font-serif text-3xl leading-tight">
                  {shown.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{shown.artist}</p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="w-10 text-right font-serif text-sm italic tabular-nums text-muted-foreground">
                  {formatTime(isPlaylistActive ? music.time : 0)}
                </span>
                <ProgressBar
                  value={isPlaylistActive ? music.time : 0}
                  max={isPlaylistActive ? music.duration : 0}
                  onSeek={(v) => isPlaylistActive && music.seek(v)}
                  label="Seek song"
                />
                <span className="w-10 font-serif text-sm italic tabular-nums text-muted-foreground">
                  {formatTime(isPlaylistActive ? music.duration : 0)}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-center gap-4">
                <Button
                  variant="float"
                  size="icon-lg"
                  aria-label="Previous song"
                  onClick={() => (isPlaylistActive ? music.prev() : music.playTrack(tracks[tracks.length - 1]!))}
                >
                  <SkipBack aria-hidden="true" />
                </Button>
                <Button
                  variant="bloom"
                  size="icon"
                  className="h-14 w-14 [&_svg]:size-5"
                  aria-label={isPlaying ? "Pause song" : "Play song"}
                  onClick={() => music.playTrack(tracks[shownIndex]!)}
                >
                  {isPlaying ? (
                    <Pause aria-hidden="true" />
                  ) : (
                    <Play className="ml-0.5 fill-current" aria-hidden="true" />
                  )}
                </Button>
                <Button
                  variant="float"
                  size="icon-lg"
                  aria-label="Next song"
                  onClick={() => (isPlaylistActive ? music.next() : music.playTrack(tracks[1]!))}
                >
                  <SkipForward aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Track list */}
          <ol className="lg:col-span-7">
            {content.songs.map((song, i) => {
              const active = i === activeIndex;
              const rowPlaying = active && music.playing;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border first:border-t"
                >
                  <div
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl px-3 py-5 transition-colors duration-300 sm:gap-6 sm:px-5",
                      active ? "bg-blush" : "hover:bg-blush/70",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => music.playTrack(tracks[i]!)}
                      aria-label={`${rowPlaying ? "Pause" : "Play"} ${song.title} by ${song.artist}`}
                      className="flex min-w-0 flex-1 items-center gap-4 text-left focus-visible:outline-none sm:gap-6"
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          active
                            ? "border-rose bg-background text-rose-ink"
                            : "border-border bg-background text-muted-foreground group-hover:border-petal group-hover:text-rose-ink",
                          "group-focus-visible:ring-2 group-focus-visible:ring-ring",
                        )}
                      >
                        {rowPlaying ? (
                          <Equalizer active />
                        ) : (
                          <>
                            <span className="font-serif text-base italic group-hover:hidden">
                              {pad(i + 1)}
                            </span>
                            <Play className="ml-0.5 hidden h-4 w-4 fill-current group-hover:block" aria-hidden="true" />
                          </>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-serif text-2xl leading-tight">
                          {song.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {song.artist}
                        </span>
                        <span className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">
                          {song.note}
                        </span>
                      </span>
                    </button>
                    {song.link && (
                      <a
                        href={song.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${song.title} in a music app`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-rose-ink"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
