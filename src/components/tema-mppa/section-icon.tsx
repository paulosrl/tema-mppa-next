import type { IconComponent, NavigationTone } from "./types";
import { cn } from "./utils";

const tones: Record<NavigationTone, string> = {
  red: "bg-tone-red text-tone-red-foreground",
  green: "bg-tone-green text-tone-green-foreground",
  violet: "bg-tone-violet text-tone-violet-foreground",
  orange: "bg-tone-orange text-tone-orange-foreground",
  blue: "bg-tone-blue text-tone-blue-foreground",
  teal: "bg-tone-teal text-tone-teal-foreground",
  pink: "bg-tone-pink text-tone-pink-foreground",
  amber: "bg-tone-amber text-tone-amber-foreground",
};

export function toneClass(tone: string | undefined) {
  if (!tone) return tones.blue;
  return Object.hasOwn(tones, tone) ? tones[tone as NavigationTone] : tone;
}

/**
 * Ícone de seção: caixa de 32px no menu (`md`) e de 28px no título do cabeçalho (`sm`), raio 8px
 * (`rounded-lg`), tom com brilho em degradê, borda de 1px na cor do traço e ícone duotone (miolo a 20%).
 */
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
        "tm-tone inline-flex shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 [&_svg]:fill-current/20",
        size === "sm" ? "size-7" : "size-8",
        tones.blue,
        toneClass(tone),
        className,
      )}
    >
      <Icon className={size === "sm" ? "size-3.5" : "size-4"} strokeWidth={2.2} />
    </span>
  );
}
