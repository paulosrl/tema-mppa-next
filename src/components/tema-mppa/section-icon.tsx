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

function toneClass(tone: string | undefined) {
  if (!tone) return tones.blue;
  return Object.hasOwn(tones, tone) ? tones[tone as NavigationTone] : tone;
}

/**
 * Ícone de seção: 28px no menu (`md`), 24px no título do cabeçalho (`sm`); raio 6px (`rounded-md`),
 * acabamento duotone vetorial e anel interno sutil para máximo contraste nos temas claro e escuro.
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
        "inline-flex shrink-0 items-center justify-center rounded-md ring-1 ring-inset ring-current/15 transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 [&_svg]:fill-current/15",
        size === "sm" ? "size-6" : "size-7",
        tones.blue,
        toneClass(tone),
        className,
      )}
    >
      <Icon className={size === "sm" ? "size-3.5" : "size-4"} strokeWidth={2.25} />
    </span>
  );
}
