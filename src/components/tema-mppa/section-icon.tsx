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

/** Ícone de seção: 28px no menu (`md`), 24px no título do cabeçalho (`sm`); raio 6px, fundo pastel do tom. */
export function SectionIcon({
  icon: Icon,
  tone,
  size = "md",
  className,
}: {
  icon: IconComponent;
  tone?: NavigationTone | (string & {});
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md",
        size === "sm" ? "size-6" : "size-7",
        tones.red,
        toneClass(tone),
        className,
      )}
    >
      <Icon className={size === "sm" ? "size-3.5" : "size-4"} strokeWidth={2.25} />
    </span>
  );
}
