import type { IconComponent } from "./types";
import { cn } from "./utils";

export function SectionIcon({ icon: Icon, tone, className }: { icon: IconComponent; tone?: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex size-6 shrink-0 items-center justify-center bg-primary/10 text-primary", tone, className)}
    >
      <Icon className="size-3.5" />
    </span>
  );
}
