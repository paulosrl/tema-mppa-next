"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "./breadcrumbs";
import { buttonVariants } from "./button";
import { ImageSlot } from "./image-slot";
import { useSidebar } from "./sidebar-context";
import { ThemeToggle } from "./theme-toggle";
import { Suspense, type ReactNode } from "react";
import type { ShellConfig, ShellSession } from "./types";
import { UserIdentity } from "./user-identity";
import { cn } from "./utils";

/**
 * Cabeçalho padrão dos sistemas: 62px, translúcido com desfoque, borda inferior. À esquerda, o título da página
 * (só aqui); à direita, tema, logos institucionais e identidade com saída, separados por divisórias. As
 * ações do sistema (`headerActions`) vêm antes do tema. A busca fica na barra lateral, acima do "Recolher".
 */
export function AppHeader({
  config,
  session,
  onSignOut,
  title,
  headerActions,
}: {
  config: ShellConfig;
  session: ShellSession | null;
  onSignOut?: () => void;
  title?: string | null;
  headerActions?: ReactNode;
}) {
  const { setMobileOpen } = useSidebar();
  const logos = (config.header?.logos ?? []).filter((logo) => Boolean(logo.src));
  const BackIcon = config.header?.backLink?.icon;

  return (
    <header className="sticky top-0 z-20 flex h-(--shell-bar) shrink-0 items-center gap-2.5 border-b bg-header px-3.5 backdrop-blur-md sm:px-6">
      <button
        type="button"
        className={cn(buttonVariants({ variant: "chrome", size: "icon" }), "-ml-1 desk:hidden")}
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu lateral"
      >
        <Menu />
      </button>
      <span className="hidden h-4 w-px bg-border sm:block desk:hidden" aria-hidden />
      {/* A rota (`usePathname`) só chega em tempo de execução nas rotas dinâmicas: sob Suspense, o resto do
          cabeçalho continua no prerender (Cache Components, Next 16). */}
      <Suspense fallback={<div className="min-w-0 flex-1" />}>
        <Breadcrumbs config={config} session={session} title={title} />
      </Suspense>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {config.header?.backLink ? (
          <Link
            href={config.header.backLink.href}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            aria-label={config.header.backLink.label}
            title={config.header.backLink.label}
          >
            {BackIcon ? <BackIcon /> : null}
          </Link>
        ) : null}
        {headerActions}
        <ThemeToggle />
        {logos.length ? (
          <>
            <span className="mx-0.5 hidden h-5 w-px bg-border sm:block" aria-hidden />
            <span className="hidden items-center gap-2 sm:flex">
              {logos.map((logo) => (
                <ImageSlot key={`${logo.src}-${logo.alt}`} asset={logo} className="h-8 w-auto rounded-lg border bg-logo-surface px-2 py-1 shadow-xs" />
              ))}
            </span>
          </>
        ) : null}
        <span className="mx-0.5 hidden h-5 w-px bg-border sm:block" aria-hidden />
        <UserIdentity session={session} onSignOut={onSignOut} signOutLabel={config.header?.signOutLabel ?? "Sair"} />
      </div>
    </header>
  );
}
