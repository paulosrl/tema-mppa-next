import { Check } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Card } from "./card";
import { ImageSlot } from "./image-slot";
import { SectionIcon } from "./section-icon";
import type { IconComponent, ImageAsset, NavigationTone } from "./types";
import { cn } from "./utils";

/*
 * Peças de painel de metas, da composição do "Moveflux Design System" (14 nov. 2026): capa com imagem, cartão de
 * métrica, linha de meta com barra em degradê, anel de progresso, faixa de dias, tiles internos, selo de
 * status e linha de treino. Só tokens, o conteúdo chega por propriedades.
 */

/** Matiz da barra e do anel de progresso (degradê de dois tokens `--bar-*`). */
export type BarTone = "amber" | "rose" | "blue" | "emerald" | "violet" | "yellow";

const barFill: Record<BarTone, string> = {
  amber: "from-bar-amber-from to-bar-amber-to",
  rose: "from-bar-rose-from to-bar-rose-to",
  blue: "from-bar-blue-from to-bar-blue-to",
  emerald: "from-bar-emerald-from to-bar-emerald-to",
  violet: "from-bar-violet-from to-bar-violet-to",
  yellow: "from-bar-yellow-from to-bar-yellow-to",
};

/** Tom da caixa de ícone que combina com cada matiz de barra. */
const barIconTone: Record<BarTone, NavigationTone> = {
  amber: "amber",
  rose: "pink",
  blue: "blue",
  emerald: "green",
  violet: "violet",
  yellow: "amber",
};

const iconText: Record<NavigationTone, string> = {
  red: "text-tone-red-foreground",
  green: "text-tone-green-foreground",
  violet: "text-tone-violet-foreground",
  orange: "text-tone-orange-foreground",
  blue: "text-tone-blue-foreground",
  teal: "text-tone-teal-foreground",
  pink: "text-tone-pink-foreground",
  amber: "text-tone-amber-foreground",
};

const clamp = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

/** Barra de progresso: trilha de 8px e preenchimento em degradê. `value` vai de 0 a 100. */
export function ProgressBar({
  value,
  tone = "blue",
  label,
  className,
}: {
  value: number;
  tone?: BarTone;
  /** Nome para leitor de tela (por exemplo, "Passos"). */
  label: string;
  className?: string;
}) {
  const percent = clamp(value);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-bar-track", className)}
    >
      <div className={cn("h-full rounded-full bg-linear-to-r", barFill[tone])} style={{ width: `${percent}%` }} />
    </div>
  );
}

const pillTone = {
  success: "bg-tone-green text-tone-green-foreground",
  warning: "bg-tone-orange text-tone-orange-foreground",
  primary: "bg-tone-blue text-tone-blue-foreground",
  neutral: "bg-bar-track text-foreground",
} as const;

/** Selo de status em pílula, sem borda ("Concluída", "Próximo", "Pendente"). */
export function StatusPill({ children, tone = "neutral" }: { children: ReactNode; tone?: keyof typeof pillTone }) {
  return <span className={cn("inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium", pillTone[tone])}>{children}</span>;
}

/** Botão redondo de 44px com ícone, para ações sobre a imagem (por exemplo, iniciar). */
export function RoundButton({ icon: Icon, label, onClick, className }: { icon: IconComponent; label: string; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-card-border bg-card text-foreground shadow-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}

/**
 * Capa com imagem: fundo escuro, imagem opcional (some se faltar ou falhar), degradê escuro por cima, título e
 * subtítulo embaixo à esquerda e uma ação (`action`) embaixo à direita. Sem imagem, fica o fundo com degradê.
 */
export function MediaCard({
  title,
  subtitle,
  image,
  action,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  image?: ImageAsset | null;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("relative isolate h-80 overflow-hidden rounded-card bg-media text-media-foreground shadow-media transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0", className)}>
      <span className="absolute inset-0 bg-linear-to-br from-bar-blue-from/35 via-bar-violet-to/20 to-transparent" aria-hidden />
      <ImageSlot asset={image} className="absolute inset-0 size-full object-cover" />
      <span className="absolute inset-0 bg-linear-to-tr from-media/70 via-media/10 to-transparent" aria-hidden />
      <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="m-0 text-2xl font-semibold tracking-tight md:text-3xl">{title}</p>
          {subtitle ? <p className="m-0 mt-1 text-sm text-media-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
    </article>
  );
}

/** Cartão de métrica: rótulo e ícone no topo, e o conteúdo (valor, anel, barra) embaixo. Padding de 20px. */
export function StatCard({
  label,
  icon: Icon,
  tone = "blue",
  children,
  className,
}: {
  label: ReactNode;
  icon?: IconComponent;
  tone?: NavigationTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card padded={false} className={cn("flex min-h-44 flex-col p-5", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="m-0 text-sm font-medium text-muted-foreground">{label}</p>
        {Icon ? <Icon className={cn("size-4", iconText[tone])} aria-hidden /> : null}
      </div>
      {children}
    </Card>
  );
}

/** Valor grande de um `StatCard`, com a unidade ao lado ("3,37 km"). */
export function StatValue({ value, unit, className }: { value: ReactNode; unit?: ReactNode; className?: string }) {
  return (
    <p className={cn("m-0 mt-3 text-2xl font-semibold tracking-tight tabular-nums", className)}>
      {value}
      {unit ? <span className="ml-1 text-base font-medium text-muted-foreground">{unit}</span> : null}
    </p>
  );
}

const ringStops: Record<"heart" | "balance" | BarTone, [string, string, string]> = {
  heart: ["var(--bar-rose-from)", "var(--bar-amber-to)", "var(--bar-amber-from)"],
  balance: ["var(--bar-emerald-from)", "var(--bar-yellow-from)", "var(--bar-rose-from)"],
  amber: ["var(--bar-amber-from)", "var(--bar-amber-to)", "var(--bar-amber-from)"],
  rose: ["var(--bar-rose-from)", "var(--bar-rose-to)", "var(--bar-rose-from)"],
  blue: ["var(--bar-blue-from)", "var(--bar-blue-to)", "var(--bar-blue-from)"],
  emerald: ["var(--bar-emerald-from)", "var(--bar-emerald-to)", "var(--bar-emerald-from)"],
  violet: ["var(--bar-violet-from)", "var(--bar-violet-to)", "var(--bar-violet-from)"],
  yellow: ["var(--bar-yellow-from)", "var(--bar-yellow-to)", "var(--bar-yellow-from)"],
};

/** Anel de 96px com degradê cônico, valor e unidade no centro. `thick` engrossa o anel (8px em vez de 4px). */
export function ProgressRing({
  value,
  unit,
  tone = "heart",
  thick = false,
  label,
  className,
}: {
  value: ReactNode;
  unit?: ReactNode;
  tone?: keyof typeof ringStops;
  thick?: boolean;
  /** Descrição para leitor de tela (por exemplo, "Batimentos: 120 bpm"). */
  label: string;
  className?: string;
}) {
  const [from, via, to] = ringStops[tone];
  const style: CSSProperties = { backgroundImage: `conic-gradient(${from}, ${via}, ${to})` };
  return (
    <div role="img" aria-label={label} className={cn("relative size-24 shrink-0", className)}>
      <span className="absolute inset-0 rounded-full" style={style} aria-hidden />
      <span className={cn("absolute rounded-full bg-card", thick ? "inset-2" : "inset-1")} aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center text-center" aria-hidden>
        <div>
          <p className="m-0 text-xl font-semibold tracking-tight tabular-nums">{value}</p>
          {unit ? <p className="m-0 text-xs text-muted-foreground">{unit}</p> : null}
        </div>
      </div>
    </div>
  );
}

export type Day = { label: string; day: string };

/**
 * Faixa de dias: sete colunas, o dia selecionado em cor de ação e os demais em tile interno. Com `onSelect`,
 * cada dia é um botão; sem ele, só mostra o selecionado.
 */
export function DayStrip({
  days,
  selected,
  onSelect,
  className,
}: {
  days: Day[];
  /** Índice do dia selecionado. */
  selected: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-7 gap-2 text-center text-xs font-medium", className)}>
      {days.map((item, index) => {
        const active = index === selected;
        const classes = cn(
          "min-w-0 rounded-xl px-1 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3",
          active ? "bg-primary text-primary-foreground" : "border border-card-border bg-muted text-muted-foreground",
        );
        const body = (
          <>
            <span className="block font-medium">{item.label}</span>
            <span className={cn("mt-0.5 block text-sm tracking-tight", active ? "font-semibold" : "font-medium")}>{item.day}</span>
          </>
        );
        return onSelect ? (
          <button key={index} type="button" aria-pressed={active} onClick={() => onSelect(index)} className={classes}>
            {body}
          </button>
        ) : (
          <div key={index} aria-current={active ? "date" : undefined} className={classes}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

/** Tile interno (sobre um cartão branco): rótulo cinza e valor em peso 500, como o histórico do modelo. */
export function InsetTile({ label, value, className }: { label: ReactNode; value: ReactNode; className?: string }) {
  return (
    <div className={cn("min-w-0 rounded-2xl border border-card-border bg-muted p-3 text-sm", className)}>
      <p className="m-0 text-muted-foreground">{label}</p>
      <p className="m-0 font-medium">{value}</p>
    </div>
  );
}

const macroTone = {
  red: "border-tone-red-foreground/25 bg-tone-red text-tone-red-foreground [--meter:var(--tone-red-foreground)]",
  blue: "border-tone-blue-foreground/25 bg-tone-blue text-tone-blue-foreground [--meter:var(--tone-blue-foreground)]",
  amber: "border-tone-amber-foreground/25 bg-tone-amber text-tone-amber-foreground [--meter:var(--tone-amber-foreground)]",
  green: "border-tone-green-foreground/25 bg-tone-green text-tone-green-foreground [--meter:var(--tone-green-foreground)]",
} as const;

/** Tile colorido com medidor (macronutrientes): barra fina, rótulo no tom e valor. `percent` vai de 0 a 100. */
export function MacroTile({ label, value, percent, tone = "blue", className }: { label: ReactNode; value: ReactNode; percent: number; tone?: keyof typeof macroTone; className?: string }) {
  return (
    <div className={cn("min-w-0 rounded-2xl border p-3 text-center", macroTone[tone], className)}>
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-(--meter)/22" aria-hidden>
        <div className="h-full rounded-full bg-(--meter)" style={{ width: `${clamp(percent)}%` }} />
      </div>
      <p className="m-0 text-xs font-medium">{label}</p>
      <p className="m-0 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

/**
 * Linha de meta: caixa de ícone, título com o estado ("Concluída") à direita, barra em degradê, legenda e a
 * porcentagem. Fica sobre o tile interno; com `done`, no tom de sucesso.
 */
export function GoalRow({
  icon,
  tone = "amber",
  title,
  status,
  percent,
  caption,
  done = false,
  className,
}: {
  icon: IconComponent;
  tone?: BarTone;
  title: ReactNode;
  status?: ReactNode;
  percent: number;
  caption?: ReactNode;
  done?: boolean;
  className?: string;
}) {
  const value = clamp(percent);
  return (
    <div className={cn("flex items-center gap-4 rounded-2xl border p-4", done ? "border-tone-green-foreground/25 bg-tone-green/60" : "border-card-border bg-muted", className)}>
      <SectionIcon icon={icon} tone={barIconTone[tone]} className="size-9" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 text-sm">
          <p className="m-0 min-w-0 truncate font-medium">{title}</p>
          {status ? <p className="m-0 shrink-0 text-muted-foreground">{status}</p> : null}
        </div>
        <ProgressBar value={value} tone={tone} label={typeof title === "string" ? title : "Progresso"} className="mt-2" />
        {caption ? <p className="m-0 mt-1 text-xs text-muted-foreground">{caption}</p> : null}
      </div>
      <p className="m-0 shrink-0 text-sm font-medium tabular-nums">{value}%</p>
    </div>
  );
}

/** Linha de treino: caixa de ícone de 40px, título e horário, e o selo de status. Concluída: tom de sucesso e check. */
export function WorkoutRow({
  icon,
  tone = "orange",
  title,
  description,
  status,
  statusTone = "neutral",
  done = false,
  className,
}: {
  icon: IconComponent;
  tone?: NavigationTone;
  title: ReactNode;
  description?: ReactNode;
  status: ReactNode;
  statusTone?: keyof typeof pillTone;
  done?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 rounded-2xl border p-4", done ? "border-tone-green-foreground/25 bg-tone-green/60" : "border-card-border bg-muted", className)}>
      {done ? (
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-tone-green-foreground text-card" aria-hidden>
          <Check className="size-5" />
        </span>
      ) : (
        <SectionIcon icon={icon} tone={tone} className="size-10" />
      )}
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate font-medium">{title}</p>
        {description ? <p className="m-0 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <StatusPill tone={done ? "success" : statusTone}>{status}</StatusPill>
    </div>
  );
}
