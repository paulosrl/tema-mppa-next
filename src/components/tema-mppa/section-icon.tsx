import type { IconComponent, NavigationTone } from "./types";
import { cn } from "./utils";

const tones: Record<NavigationTone, string> = {
  red: "bg-tone-red text-tone-red-foreground",
  green: "bg-tone-green text-tone-green-foreground",
  violet: "bg-tone-violet text-tone-violet-foreground",
  orange: "bg-tone-orange text-tone-orange-foreground",
};

function toneClass(tone: string | undefined) {
  if (!tone) return tones.red;
  return tone in tones ? tones[tone as NavigationTone] : tone;
}

/** Ícone de seção do protótipo: 28px, raio 6px, fundo pastel do tom. */
export function SectionIcon({
  icon: Icon,
  tone,
  className,
}: {
  icon: IconComponent;
  tone?: NavigationTone | (string & {});
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex size-7 shrink-0 items-center justify-center rounded-md", tones.red, toneClass(tone), className)}
    >
      <Icon className="size-4" strokeWidth={2.25} />
    </span>
  );
}
