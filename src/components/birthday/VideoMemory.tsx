import { Film } from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";
import { VideoPlayer } from "./VideoPlayer";
import type { BirthdayContent } from "@/content/birthday";

/** Turns a YouTube or Vimeo link into an embeddable URL; returns null for direct video files. */
export function toEmbedUrl(src: string): string | null {
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`;
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export function VideoMemory({
  content,
  onPlay,
}: {
  content: BirthdayContent["video"];
  /** Called when the video starts, e.g. to pause background music. */
  onPlay?: () => void;
}) {
  const embed = content.src ? toEmbedUrl(content.src) : null;

  return (
    <section
      id="video"
      aria-label={content.eyebrow}
      className="relative bg-gradient-blush py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeader number="03" eyebrow={content.eyebrow} heading={content.heading} align="center" />

        <Reveal delay={0.15} className="mt-14 md:mt-16">
          {!content.src ? (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-border bg-blush px-6 text-center shadow-lift">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-petal bg-background text-rose shadow-soft">
                <Film className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="font-serif text-2xl italic">Your video goes here</span>
              <span className="text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground">
                Add a file or a YouTube / Vimeo link
              </span>
            </div>
          ) : embed ? (
            <div className="aspect-video w-full overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-lift">
              <iframe
                src={embed}
                title={content.caption || content.eyebrow}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <VideoPlayer
              src={content.src}
              poster={content.poster || undefined}
              title={content.caption || content.heading}
              loop={content.loop}
              onPlay={onPlay}
            />
          )}
          {content.caption && (
            <p className="mt-8 text-center font-serif text-lg italic text-muted-foreground">
              {content.caption}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
