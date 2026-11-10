import type { ReactNode } from "react";
import type { IconComponent } from "./types";
import { SectionIcon } from "./section-icon";

export function PageFrame({
  title,
  description,
  icon,
  tone,
  actions,
  children,
}: {
  title?: string;
  description?: string;
  icon?: IconComponent;
  tone?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {title ? (
            <h1 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
              {icon ? <SectionIcon icon={icon} tone={tone} /> : null}
              <span className="truncate">{title}</span>
            </h1>
          ) : null}
          {description ? (
            <p className={title ? "mt-1 text-sm text-muted-foreground" : "text-sm text-muted-foreground"}>
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}
