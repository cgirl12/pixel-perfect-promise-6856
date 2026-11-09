import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal, SectionHeader } from "./Reveal";
import type { BirthdayContent } from "@/content/birthday";

/** Editorial bento layout for 8 photos (2 columns on mobile, 4 on desktop). */
const LAYOUT = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 md:col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 md:col-span-3 row-span-1",
];

const pad = (n: number) => String(n).padStart(2, "0");

export function PhotoGallery({ content }: { content: BirthdayContent["gallery"] }) {
  const photos = content.photos;
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length));
    },
    [photos.length],
  );

  const current = index !== null ? photos[index] : null;

  return (
    <section
      id="gallery"
      aria-label={content.heading}
      className="relative bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader number="02" eyebrow={content.eyebrow} heading={content.heading} />
          <Reveal>
            <p className="text-sm text-muted-foreground">Tap any photo to view it larger.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:mt-16 md:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[15rem]">
          {photos.map((photo, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08} className={cn(LAYOUT[i % LAYOUT.length])}>
              <button
                type="button"
                onClick={() => {
                  setDirection(1);
                  setIndex(i);
                }}
                aria-label={`Open photo ${i + 1}: ${photo.caption}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl bg-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <PhotoFrame
                  src={photo.src}
                  alt={photo.alt}
                  label={`Photo ${pad(i + 1)}`}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 font-serif text-xs italic text-foreground backdrop-blur">
                  {pad(i + 1)}
                </span>
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <DialogPrimitive.Root open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 py-16 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:px-20"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
          >
            <DialogPrimitive.Title className="sr-only">Photo gallery</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Use the arrow buttons or keys to browse photos.
            </DialogPrimitive.Description>

            <div className="absolute inset-x-4 top-4 flex items-center justify-between sm:inset-x-8 sm:top-6">
              <span className="font-serif text-lg italic text-muted-foreground">
                {index !== null && `${pad(index + 1)} / ${pad(photos.length)}`}
              </span>
              <DialogPrimitive.Close asChild>
                <Button variant="float" size="icon-lg" aria-label="Close gallery">
                  <X aria-hidden="true" />
                </Button>
              </DialogPrimitive.Close>
            </div>

            <div className="relative flex h-[68svh] w-full max-w-5xl items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                {current && index !== null && (
                  <motion.div
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) go(1);
                      else if (info.offset.x > 60) go(-1);
                    }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    {current.src ? (
                      <img
                        src={current.src}
                        alt={current.alt}
                        className="max-h-full max-w-full rounded-2xl object-contain shadow-lift"
                        draggable={false}
                      />
                    ) : (
                      <div className="aspect-[4/5] h-full max-h-full max-w-full overflow-hidden rounded-2xl border border-border shadow-lift">
                        <PhotoFrame src="" alt={current.alt} label={`Photo ${pad(index + 1)}`} />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {current && (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 max-w-xl text-center font-serif text-xl italic text-foreground"
                >
                  {current.caption}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              variant="float"
              size="icon-lg"
              aria-label="Previous photo"
              onClick={() => go(-1)}
              className="absolute bottom-6 left-1/2 -translate-x-[calc(100%+0.5rem)] sm:bottom-auto sm:left-6 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              variant="float"
              size="icon-lg"
              aria-label="Next photo"
              onClick={() => go(1)}
              className="absolute bottom-6 left-1/2 translate-x-2 sm:bottom-auto sm:left-auto sm:right-6 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
