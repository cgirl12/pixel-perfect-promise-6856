import { ImageIcon } from "lucide-react";
import lilyBloom from "@/assets/lily-bloom.webp";
import { cn } from "@/lib/utils";

/** Shows a photo, or a tasteful placeholder while no photo has been added yet. */
export function PhotoFrame({
  src,
  alt,
  label,
  className,
  imgClassName,
  eager = false,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName, className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${label} — placeholder, add a photo in the content file`}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-blush text-center",
        className,
      )}
    >
      <img
        src={lilyBloom}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={720}
        height={720}
        className="pointer-events-none absolute -bottom-8 -right-8 w-2/3 max-w-56 opacity-15"
      />
      <ImageIcon className="h-5 w-5 text-petal" aria-hidden="true" />
      <span className="font-serif text-xl italic text-foreground/70">{label}</span>
      <span className="text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground">
        Your photo here
      </span>
    </div>
  );
}
