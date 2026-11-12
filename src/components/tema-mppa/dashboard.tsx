import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { SectionIcon, toneClass } from "./section-icon";
import type { IconComponent, NavigationTone } from "./types";
import { cn } from "./utils";

/*
 * Peças de painel da estética de 12 nov. 2026 (página de referência do Heimdall): saudação, selos, pílula
 * informativa, título de seção, cartão com cabeçalho, campo com ícone e cartão clicável. Só tokens; o
 * conteúdo chega por propriedades.
 */

/** Cor de destaque de cartões e títulos: a primária, o vermelho institucional ou um tom de seção. */
export type Accent = "primary" | "institutional" | NavigationTone;

const accentBorder: Record<Accent, string> = {
  primary: "border-t-primary/60 group-hover:border-t-primary",
  institutional: "border-t-institutional",
  red: "border-t-tone-red-foreground/45 group-hover:border-t-tone-red-foreground",
  green: "border-t-tone-green-foreground/45 group-hover:border-t-tone-green-foreground",
  violet: "border-t-tone-violet-foreground/45 group-hover:border-t-tone-violet-foreground",
  orange: "border-t-tone-orange-foreground/45 group-hover:border-t-tone-orange-foreground",
  blue: "border-t-tone-blue-foreground/45 group-hover:border-t-tone-blue-foreground",
  teal: "border-t-tone-teal-foreground/45 group-hover:border-t-tone-teal-foreground",
  pink: "border-t-tone-pink-foreground/45 group-hover:border-t-tone-pink-foreground",
  amber: "border-t-tone-amber-foreground/45 group-hover:border-t-tone-amber-foreground",
};

const accentDot: Record<"primary" | "institutional", string> = {
  primary: "bg-primary",
  institutional: "bg-institutional",
};

/** Saudação do painel: barra em degradê, título grande, selo opcional, descrição e um bloco à direita. */
export function PageGreeting({
  title,
  description,
  badge,
  aside,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex min-w-0 items-center gap-3.5">
        <span
          className="h-11 w-1.5 shrink-0 rounded-full bg-linear-to-b from-institutional via-tone-violet-foreground to-primary shadow-xs"
          aria-hidden
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="m-0 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{title}</h2>
            {badge}
          </div>
          {description ? <p className="m-0 mt-0.5 text-sm text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      {aside}
    </div>
  );
}

const statusTone = {
  success: "border-tone-green-foreground/25 bg-tone-green text-tone-green-foreground",
  primary: "border-primary/25 bg-primary/10 text-primary",
  warning: "border-warning/30 bg-warning/10 text-warning",
  institutional: "border-institutional/20 bg-institutional/10 text-institutional-foreground",
} as const;

/** Selo arredondado com ponto, para estado ("Acesso Autorizado"). `pulse` faz o ponto pulsar. */
export function StatusBadge({
  children,
  tone = "success",
  pulse = false,
}: {
  children: ReactNode;
  tone?: keyof typeof statusTone;
  pulse?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", statusTone[tone])}>
      <span className={cn("size-1.5 rounded-full bg-current", pulse && "motion-safe:animate-pulse")} aria-hidden />
      {children}
    </span>
  );
}

const tagTone = {
  primary: "border-primary/25 bg-primary/10 text-primary",
  warning: "border-tone-amber-foreground/30 bg-tone-amber text-tone-amber-foreground",
  success: "border-tone-green-foreground/25 bg-tone-green text-tone-green-foreground",
  institutional: "border-institutional/20 bg-institutional/10 text-institutional-foreground",
  neutral: "border-transparent bg-muted text-muted-foreground",
} as const;

/** Etiqueta curta em maiúsculas ("Oficial", "Sandbox") ou, com `mono`, um código ("ID: ..."). */
export function Tag({
  children,
  tone = "primary",
  mono = false,
}: {
  children: ReactNode;
  tone?: keyof typeof tagTone;
  mono?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border",
        mono ? "px-2.5 py-1 font-mono text-[11px] font-medium" : "px-1.5 py-0.5 text-[10px] font-bold uppercase",
        tagTone[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Pílula informativa com ícone, título e linha de apoio; some abaixo de 768px. */
export function InfoPill({
  icon,
  tone = "blue",
  title,
  description,
}: {
  icon: IconComponent;
  tone?: NavigationTone;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-card-border bg-card/70 px-4 py-2.5 shadow-xs md:flex">
      <SectionIcon icon={icon} tone={tone} />
      <div className="text-xs">
        <p className="m-0 font-semibold text-foreground">{title}</p>
        {description ? <p className="m-0 text-muted-foreground">{description}</p> : null}
      </div>
    </div>
  );
}

/** Título de seção do painel: ponto colorido (que pulsa com `live`), rótulo em maiúsculas e dica à direita. */
export function SectionTitle({
  children,
  tone = "primary",
  hint,
  live = false,
}: {
  children: ReactNode;
  tone?: "primary" | "institutional";
  hint?: ReactNode;
  live?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-2.5" aria-hidden>
          {live ? <span className={cn("absolute inline-flex size-full rounded-full opacity-75 motion-safe:animate-ping", accentDot[tone])} /> : null}
          <span className={cn("relative inline-flex size-2.5 rounded-full", accentDot[tone])} />
        </span>
        <h3 className="m-0 text-xs font-extrabold tracking-wider text-foreground uppercase">{children}</h3>
      </div>
      {hint ? <span className="hidden text-xs font-medium text-muted-foreground sm:inline">{hint}</span> : null}
    </div>
  );
}

/** Cartão com cabeçalho separado: ícone de seção, título e um elemento à direita; borda superior colorida. */
export function PanelCard({
  title,
  icon,
  tone = "red",
  accent = "institutional",
  aside,
  children,
  className,
}: {
  title: ReactNode;
  icon?: IconComponent;
  tone?: NavigationTone;
  accent?: Accent;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative min-w-0 overflow-hidden rounded-2xl border border-card-border border-t-[3px] bg-card text-card-foreground shadow-card",
        accentBorder[accent],
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-card-border px-6 pt-6 pb-4">
        <h3 className="m-0 flex items-center gap-2.5 text-base font-bold tracking-tight">
          {icon ? <SectionIcon icon={icon} tone={tone} size="sm" /> : null}
          {title}
        </h3>
        {aside}
      </div>
      <div className="p-6">{children}</div>
    </article>
  );
}

/** Campo de leitura com ícone grande: rótulo em maiúsculas, valor e uma ação opcional à direita. */
export function InfoField({
  icon,
  tone = "blue",
  label,
  value,
  action,
}: {
  icon: IconComponent;
  tone?: NavigationTone;
  label: ReactNode;
  value: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-card-border bg-muted/40 p-4 transition-colors hover:bg-muted/70">
      <div className="flex min-w-0 items-center gap-3.5">
        <SectionIcon icon={icon} tone={tone} className="size-10 rounded-xl [&_svg]:size-5" />
        <div className="flex min-w-0 flex-col">
          <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">{label}</span>
          <span className="min-w-0 truncate text-sm font-semibold text-foreground">{value}</span>
        </div>
      </div>
      {action}
    </div>
  );
}

/** Grade das peças de painel: 16px entre elas; três colunas a partir de 640px. */
export function PanelGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3", className)}>{children}</div>;
}

type LinkCardTarget = { href: string; onClick?: never } | { href?: never; onClick: () => void };

/**
 * Cartão clicável: ícone (`tone`, em caixa de tom) ou mídia própria (`media`, por exemplo a logo do sistema),
 * título com etiqueta, descrição, seta (`external`: ↗; `internal`: ›) e uma linha de rodapé opcional.
 * Com `href`, é um link; com `onClick`, um botão.
 */
export function LinkCard({
  title,
  description,
  tag,
  icon,
  tone = "blue",
  media,
  accent = "primary",
  kind = "internal",
  footer,
  disabled,
  className,
  ...target
}: LinkCardTarget & {
  title: ReactNode;
  description?: ReactNode;
  tag?: ReactNode;
  icon?: IconComponent;
  tone?: NavigationTone;
  media?: ReactNode;
  accent?: Accent;
  kind?: "external" | "internal";
  footer?: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const body = (
    <span
      className={cn(
        "relative flex h-full min-w-0 flex-col justify-between rounded-2xl border border-card-border border-t-[3px] bg-card p-6 text-left text-card-foreground shadow-card transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-card group-hover:shadow-card-hover motion-reduce:group-hover:translate-y-0",
        accentBorder[accent],
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="flex min-w-0 items-center gap-3.5">
          {media ?? (icon ? <SectionIcon icon={icon} tone={tone} className="size-11 rounded-xl [&_svg]:size-5" /> : null)}
          <span className="min-w-0">
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{title}</span>
              {tag}
            </span>
            {description ? <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span> : null}
          </span>
        </span>
        {kind === "external" ? (
          <span
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-primary/10 group-hover:text-primary motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
            aria-hidden
          >
            <ArrowUpRight className="size-4" />
          </span>
        ) : (
          <ChevronRight
            className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground motion-reduce:group-hover:translate-x-0"
            aria-hidden
          />
        )}
      </span>
      {footer ? (
        <span className="mt-6 flex items-center justify-between gap-2 border-t border-card-border pt-4 text-xs text-muted-foreground">{footer}</span>
      ) : null}
    </span>
  );
  const outer = cn(
    "group block h-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60",
    className,
  );
  if (target.href) {
    return (
      <Link href={target.href} className={outer}>
        {body}
      </Link>
    );
  }
  return (
    <button type="button" onClick={target.onClick} disabled={disabled} className={outer}>
      {body}
    </button>
  );
}

/** Caixa de 48px em degradê da primária, para a logo ou o ícone de um sistema dentro do `LinkCard`. */
export function LinkCardMedia({ icon: Icon, children }: { icon?: IconComponent; children?: ReactNode }) {
  return (
    <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-primary to-tone-violet-foreground text-primary-foreground shadow-md transition-transform group-hover:scale-105 motion-reduce:group-hover:scale-100">
      {children ?? (Icon ? <Icon className="size-6 fill-current/20" strokeWidth={2} aria-hidden /> : null)}
    </span>
  );
}

/** Linha de métrica do rodapé do `LinkCard`: ícone, número em mono e rótulo. */
export function MetricLine({ icon: Icon, value, label }: { icon?: IconComponent; value: ReactNode; label: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 font-medium">
      {Icon ? <Icon className="size-3.5 text-primary" aria-hidden /> : null}
      <strong className="font-mono font-semibold text-foreground">{value}</strong> {label}
    </span>
  );
}

export { toneClass };
