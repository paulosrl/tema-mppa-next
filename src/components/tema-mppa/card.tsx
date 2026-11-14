import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

/** Cartão: borda, raio `rounded-card` (16px; 24px na v2), fundo do cartão, sombra em camadas e padding 24px. */
export function Card({
  title,
  description,
  actions,
  padded = true,
  className,
  children,
  ...props
}: Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** `false` tira o padding (tabelas, listas que encostam na borda). */
  padded?: boolean;
}) {
  return (
    <article
      className={cn(
        "relative min-w-0 rounded-card border border-card-border bg-card text-card-foreground shadow-card transition-all duration-200",
        padded && "p-6",
        className,
      )}
      {...props}
    >
      {title || description || actions ? (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title ? <h2 className="tm-card-title m-0 text-base font-bold tracking-tight">{title}</h2> : null}
            {description ? <p className="m-0 mt-0.5 text-sm text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </article>
  );
}

const gridColumns = {
  1: "",
  2: "desk:grid-cols-2",
  3: "desk:grid-cols-3",
  4: "desk:grid-cols-2 xl:grid-cols-4",
} as const;

/** Grade de cartões: 16px entre eles; uma coluna no celular. */
export function CardGrid({
  columns = 2,
  className,
  children,
}: {
  columns?: keyof typeof gridColumns;
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("grid min-w-0 grid-cols-1 gap-4", gridColumns[columns], className)}>{children}</div>;
}

/** Métrica do protótipo: rótulo, número de 32px peso 800 e nota. */
export function MetricCard({
  label,
  value,
  note,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <h2 className="tm-metric-label m-0 text-base font-bold tracking-tight">{label}</h2>
      <p className="mt-3 mb-[3px] text-[32px] leading-[1.2] font-extrabold tabular-nums">{value}</p>
      {note ? <p className="m-0 text-muted-foreground">{note}</p> : null}
    </Card>
  );
}
