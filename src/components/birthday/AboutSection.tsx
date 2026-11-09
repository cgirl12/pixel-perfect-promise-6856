import lilySprig from "@/assets/lily-sprig.webp";
import { PetalShape } from "./FloralDecorations";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal, SectionHeader } from "./Reveal";
import type { BirthdayContent } from "@/content/birthday";

export function AboutSection({
  content,
  photo,
  photoAlt,
}: {
  content: BirthdayContent["about"];
  photo: string;
  photoAlt: string;
}) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-background py-24 md:py-36"
    >
      <img
        src={lilySprig}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={640}
        height={707}
        className="animate-sway pointer-events-none absolute -right-10 -top-6 w-36 rotate-[200deg] opacity-80 md:-right-6 md:w-60"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <Reveal className="relative md:col-span-5">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-petal/60 md:translate-x-6 md:translate-y-6"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
            <PhotoFrame src={photo} alt={photoAlt} label="Portrait" />
          </div>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <div id="about-heading">
            <SectionHeader number="01" eyebrow={content.eyebrow} heading={content.heading} />
          </div>
          <div className="mt-8 space-y-5 text-base leading-[1.85] text-muted-foreground md:text-[1.0625rem]">
            {content.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <ul className="mt-10 grid grid-cols-1 border-y border-border sm:grid-cols-3">
              {content.qualities.map((q, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 border-border py-4 sm:justify-center sm:border-l sm:first:border-l-0"
                >
                  <PetalShape className="h-4 w-3 shrink-0" />
                  <span className="font-serif text-xl italic">{q}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
