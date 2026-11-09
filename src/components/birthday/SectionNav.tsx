import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "top", label: "Welcome" },
  { id: "about", label: "About you" },
  { id: "gallery", label: "Gallery" },
  { id: "video", label: "Video" },
  { id: "memories", label: "Memories" },
  { id: "letter", label: "Letter" },
  { id: "wish", label: "Birthday wish" },
];

/** Discreet vertical dot navigation on large screens. */
export function SectionNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-4">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-label={s.label}
              aria-current={active === s.id ? "true" : undefined}
              className="group flex items-center gap-3"
            >
              <span className="pointer-events-none text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {s.label}
              </span>
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500",
                  active === s.id ? "w-6 bg-rose" : "w-1.5 bg-petal/60 group-hover:bg-rose",
                )}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
