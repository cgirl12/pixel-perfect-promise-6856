import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import lilyBloom from "@/assets/lily-bloom.webp";
import lilySprig from "@/assets/lily-sprig.webp";
import { cn } from "@/lib/utils";
import { PetalDivider } from "./FloralDecorations";
import { SectionHeader } from "./Reveal";
import type { BirthdayContent, Memory } from "@/content/birthday";

const pad = (n: number) => String(n).padStart(2, "0");

export function MemoryCards({ content }: { content: BirthdayContent["memories"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const memory: Memory | null = open !== null ? (content.items[open] ?? null) : null;

  return (
    <section
      id="memories"
      aria-label={content.heading}
      className="relative bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader number="04" eyebrow={content.eyebrow} heading={content.heading} />

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-6">
          {content.items.map((m, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                className={cn(
                  "group relative flex h-full min-h-64 w-full flex-col overflow-hidden rounded-3xl border border-border p-7 text-left shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-petal hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  i % 2 === 0 ? "bg-background" : "bg-blush",
                )}
              >
                <img
                  src={lilyBloom}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={720}
                  height={720}
                  className="pointer-events-none absolute -right-6 -top-6 w-24 opacity-80 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
                />
                <span className="font-serif text-sm italic text-rose">No. {pad(i + 1)}</span>
                {m.date && (
                  <span className="mt-1 text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground">
                    {m.date}
                  </span>
                )}
                <h3 className="text-balance-safe mt-auto pt-10 text-[1.75rem] leading-tight">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-rose-ink">
                  Read memory
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[88svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border-border p-8 sm:rounded-3xl sm:p-12">
          <img
            src={lilySprig}
            alt=""
            aria-hidden="true"
            width={640}
            height={707}
            className="pointer-events-none absolute -bottom-8 -right-8 w-36 opacity-25"
          />
          {memory && open !== null && (
            <div className="relative">
              <p className="eyebrow">
                Memory No. {pad(open + 1)}
                {memory.date ? ` • ${memory.date}` : ""}
              </p>
              <DialogTitle className="text-balance-safe mt-4 font-serif text-4xl font-medium leading-tight">
                {memory.title}
              </DialogTitle>
              <PetalDivider className="mt-5" />
              <DialogDescription className="mt-6 whitespace-pre-line text-base leading-[1.85] text-muted-foreground">
                {memory.description}
              </DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
