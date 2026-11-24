import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useId, type FormEventHandler, type ReactNode } from "react";
import { buttonVariants } from "./button";
import { Card } from "./card";
import { Tag } from "./dashboard";
import { WatermarkSlot } from "./image-slot";
import type { IconComponent, ImageAsset } from "./types";
import { cn } from "./utils";

/*
 * Quadros em destaque: o fundo do quadro, o quadro de abertura, o quadro com os botões dentro e o retângulo em
 * destaque. Só tokens; texto, selo, imagem e atalhos chegam por propriedades.
 */

/**
 * Fundo do quadro: degradê azul da direita para a esquerda, que se dissolve no fundo do cartão, contorno interno,
 * dois brilhos e filete vertical à esquerda. Decorativo. Vai dentro de um `Card` com `overflow-hidden`, e o conteúdo
 * fica por cima, com `relative z-10` (e `pl-2`, para não encostar no filete).
 */
export function CardBackdrop() {
  return (
    <>
      <div aria-hidden className="tm-card-backdrop pointer-events-none absolute inset-0 z-0 rounded-card ring-1 ring-primary/15 ring-inset" />
      <div aria-hidden className="pointer-events-none absolute -top-12 -left-12 z-0 size-36 rounded-full bg-institutional/8 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-12 z-0 size-44 rounded-full bg-primary/12 blur-2xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-3 left-0 z-10 w-1 rounded-r-full bg-linear-to-b from-institutional via-primary to-chart-2"
      />
    </>
  );
}

/** Atalho do quadro de abertura: link interno com ícone opcional e a seta ↗. */
export type OpeningShortcut = {
  label: ReactNode;
  href: string;
  icon?: IconComponent;
};

/**
 * Quadro de abertura: selo, saudação opcional, frase, marca d'água opcional e atalhos opcionais à direita (o primeiro
 * primário, os demais secundários). A marca d'água fica fixa, no mesmo lugar em toda página, qualquer que seja o
 * tamanho da frase: sem atalhos, à direita do quadro, com o mesmo recuo do texto à esquerda, e o quadro guarda a altura
 * dela; com atalhos, logo antes deles. Sem saudação, o selo dá nome à região. Vai só no primeiro item de cada aba.
 */
export function OpeningCard({
  badge,
  badgeIcon: BadgeIcon = Sparkles,
  badgeNote,
  greeting,
  description,
  watermark,
  shortcuts,
  className,
}: {
  badge: ReactNode;
  badgeIcon?: IconComponent;
  badgeNote?: ReactNode;
  greeting?: ReactNode;
  description: ReactNode;
  watermark?: ImageAsset | null;
  shortcuts?: OpeningShortcut[];
  className?: string;
}) {
  const id = useId();
  const badgeId = `${id}-selo`;
  const greetingId = `${id}-saudacao`;
  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <CardBackdrop />
      <section
        aria-labelledby={greeting ? greetingId : badgeId}
        className={cn("relative z-10 flex flex-col justify-between gap-6 pl-2 md:flex-row md:items-center", watermark?.src && "md:min-h-26")}
      >
        <div className={cn("relative min-w-0 flex-1 space-y-1.5", watermark?.src && "md:pr-40")}>
          <div className="relative z-10 flex flex-wrap items-center gap-2">
            <Tag tone="institutional">
              <BadgeIcon aria-hidden className="mr-1 size-3" />
              <span id={badgeId}>{badge}</span>
            </Tag>
            {badgeNote ? (
              <>
                <span aria-hidden className="hidden size-1 rounded-full bg-primary/40 sm:inline-block" />
                <span className="hidden text-xs font-medium text-tone-blue-foreground sm:inline">{badgeNote}</span>
              </>
            ) : null}
          </div>
          {greeting ? (
            <h2 id={greetingId} className="relative z-10 m-0 text-base font-semibold tracking-tight text-foreground md:text-lg">
              {greeting}
            </h2>
          ) : null}
          <p className="relative z-10 m-0 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <WatermarkSlot
            asset={watermark}
            className={cn("top-1/2 right-2 size-28 -translate-y-1/2 -rotate-12 md:size-36", shortcuts?.length && "md:right-0")}
          />
        </div>
        {shortcuts?.length ? (
          <div className="flex shrink-0 flex-col gap-2 rounded-2xl border border-primary/15 bg-card/80 p-2 shadow-xs backdrop-blur-xs sm:flex-row md:min-w-60 md:flex-col">
            {shortcuts.map(({ label, href, icon: Icon }, index) => (
              <Link
                key={href}
                href={href}
                className={buttonVariants({ variant: index === 0 ? "default" : "secondary", className: "justify-between" })}
              >
                <span className="flex items-center gap-2">
                  {Icon ? <Icon aria-hidden /> : null}
                  {label}
                </span>
                <ArrowUpRight aria-hidden />
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </Card>
  );
}

/**
 * Quadro em destaque, sem marca d'água: o fundo do quadro, título opcional e conteúdo à esquerda (campos de filtro,
 * indicadores) e os botões dentro do quadro, à direita. Com `onSubmit`, conteúdo e botões ficam num `<form>`.
 */
export function FeaturedCard({
  title,
  children,
  actions,
  onSubmit,
  className,
}: {
  title?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  className?: string;
}) {
  const layout = "relative z-10 flex w-full flex-wrap items-center gap-3 pl-2";
  const body = (
    <>
      {title || children ? (
        <div className="flex min-w-0 flex-[1_1_16rem] flex-col gap-1.5">
          {title ? <p className="m-0 text-base font-semibold tracking-tight text-foreground md:text-lg">{title}</p> : null}
          {children ? <div className="flex min-w-0 flex-wrap items-center gap-3">{children}</div> : null}
        </div>
      ) : null}
      {actions ? <div className="ml-auto flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </>
  );
  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <CardBackdrop />
      {onSubmit ? (
        <form onSubmit={onSubmit} className={layout}>
          {body}
        </form>
      ) : (
        <div className={layout}>{body}</div>
      )}
    </Card>
  );
}

/** Retângulo em destaque: degradê azul da esquerda para a direita, sem logomarca; a frase que descreve a seção. */
export function FeaturedNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "m-0 w-full rounded-2xl bg-linear-to-r from-tone-blue via-tone-blue/70 to-tone-blue/30 px-6 py-4 text-base font-semibold text-foreground shadow-xs ring-1 ring-primary/15 ring-inset sm:w-fit",
        className,
      )}
    >
      {children}
    </p>
  );
}
