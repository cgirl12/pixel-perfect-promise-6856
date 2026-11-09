import lilySprig from "@/assets/lily-sprig.webp";
import { PetalDivider } from "./FloralDecorations";
import { Reveal, SectionHeader } from "./Reveal";
import type { BirthdayContent } from "@/content/birthday";

export function BirthdayLetter({
  content,
  from,
}: {
  content: BirthdayContent["letter"];
  from: string;
}) {
  return (
    <section
      id="letter"
      aria-label={content.eyebrow}
      className="relative overflow-hidden bg-gradient-blush py-24 md:py-36"
    >
      <img
        src={lilySprig}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={640}
        height={707}
        className="animate-sway pointer-events-none absolute -left-12 top-10 w-40 -scale-x-100 opacity-80 md:left-0 md:w-64"
      />
      <img
        src={lilySprig}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={640}
        height={707}
        className="pointer-events-none absolute -bottom-10 -right-12 w-40 rotate-180 opacity-60 md:right-0 md:w-56"
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <SectionHeader number="05" eyebrow={content.eyebrow} heading={content.heading} align="center" />

        <Reveal delay={0.15}>
          <article className="mt-14 rounded-[2rem] border border-border bg-background px-7 py-12 shadow-card sm:px-14 sm:py-16">
            <p className="font-serif text-3xl italic text-foreground">{content.greeting}</p>
            <div className="mt-8 space-y-6 text-[1.0625rem] leading-[1.95] text-foreground/80">
              {content.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <PetalDivider className="mt-12" />
            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-muted-foreground">
              {content.signOff}
            </p>
            <p className="mt-2 font-serif text-3xl italic text-rose-ink">{from}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
