"use client";

import { Tabs } from "@base-ui/react/tabs";
import { ChevronLeft, LayoutDashboard, PanelLeftClose, PanelLeftOpen, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isValidElement, Suspense, useState } from "react";
import { Button } from "./button";
import { CommandPalette } from "./command-palette";
import { ImageSlot } from "./image-slot";
import { SectionIcon, toneClass } from "./section-icon";
import { useCollapsedAttribute, useSidebar } from "./sidebar-context";
import type { AppShellProps, ImageAsset, NavigationItem, NavigationSection, ShellConfig, ShellSession } from "./types";
import { canSeeAdministration, cn, currentNavigationItem, visibleNavigation } from "./utils";

function isImageAsset(value: ShellConfig["brand"]["symbol"]): value is ImageAsset {
  return Boolean(value && typeof value === "object" && !isValidElement(value) && "alt" in value);
}

/*
 * Recolhida só vale a partir de 801px: abaixo disso o menu móvel abre sempre expandido. A aparência vem da
 * variante `tm-collapsed` (atributo no <html>, posto antes da hidratação), não do estado do React.
 */
const hideWhenCollapsed = "desk:tm-collapsed:hidden";

function Brand({ config }: { config: ShellConfig }) {
  const { setMobileOpen } = useSidebar();
  const { brand } = config;
  return (
    <div className="flex h-(--shell-bar) shrink-0 items-center border-b border-sidebar-border px-3 desk:tm-collapsed:justify-center">
      <Link
        href={brand.homeHref}
        onClick={() => setMobileOpen(false)}
        className="group flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl px-2 outline-none transition-all hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring desk:tm-collapsed:flex-none desk:tm-collapsed:justify-center desk:tm-collapsed:px-1"
        title={`${brand.name}${brand.version ? ` v${brand.version}` : ""}`}
      >
        {isImageAsset(brand.symbol) ? (
          <ImageSlot asset={brand.symbol} className="size-9 shrink-0 rounded-xl transition-transform group-hover:scale-105" />
        ) : (
          brand.symbol ?? null
        )}
        <span className={cn("grid min-w-0 flex-1 text-left leading-tight", hideWhenCollapsed)}>
          <span className="flex min-w-0 items-center gap-2">
            <span className="truncate text-base font-bold tracking-tight text-foreground">{brand.name}</span>
            {brand.version ? (
              <span className="shrink-0 rounded-md border border-institutional/20 bg-institutional/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-institutional-foreground">
                v{brand.version}
              </span>
            ) : null}
          </span>
          {brand.tagline ? <span className="truncate text-[11px] font-medium text-muted-foreground">{brand.tagline}</span> : null}
        </span>
      </Link>
    </div>
  );
}

/* Abaixo de 640px as logos saem do cabeçalho e aparecem aqui, sob a marca. */
function MobileLogos({ config }: { config: ShellConfig }) {
  const logos = (config.header?.logos ?? []).filter((logo) => Boolean(logo.src));
  if (!logos.length) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-b border-sidebar-border px-3 py-2.5 sm:hidden">
      {logos.map((logo) => (
        <ImageSlot key={`${logo.src}-${logo.alt}`} asset={logo} className="h-8 w-auto rounded-lg border bg-logo-surface px-2 py-1 shadow-xs" />
      ))}
    </div>
  );
}

function NavigationList({ items, activeId }: { items: NavigationItem[]; activeId?: string }) {
  const { setMobileOpen } = useSidebar();
  const collapsed = useCollapsedAttribute();
  return (
    <nav className="grid gap-1.5" aria-label="Itens da seção">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active ? "page" : undefined}
            title={collapsed ? item.label : undefined}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] font-medium text-sidebar-foreground outline-none transition-all hover:bg-sidebar-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring desk:tm-collapsed:justify-center desk:tm-collapsed:px-0",
              active && "tm-nav-active font-semibold text-highlight-foreground hover:bg-highlight hover:text-highlight-foreground",
            )}
          >
            <SectionIcon
              icon={item.icon}
              tone={item.tone}
              className={active ? "bg-highlight-foreground/15 text-highlight-foreground" : undefined}
            />
            <span className={cn("truncate", hideWhenCollapsed)}>{item.label}</span>
            {item.badge ? (
              <span className={cn("ml-auto shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold", toneClass(item.tone), hideWhenCollapsed)}>
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

const tabClass =
  "flex h-8 min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 text-[13px] font-medium text-muted-foreground outline-none transition-all duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active]:bg-card data-[active]:font-semibold data-[active]:text-foreground data-[active]:shadow-surface";

function SidebarBody({ config, session }: { config: ShellConfig; session: ShellSession | null }) {
  const pathname = usePathname();
  const current = currentNavigationItem(pathname, config, session);
  const [manualSelection, setManualSelection] = useState<{ pathname: string; tab: NavigationSection } | null>(null);
  const manualTab = manualSelection?.pathname === pathname ? manualSelection.tab : null;
  const showTabs = canSeeAdministration(config, session);
  const activeTab: NavigationSection = showTabs ? (manualTab ?? current?.section ?? "platform") : "platform";
  const platformLabel = config.platformLabel ?? "Plataforma";
  const administrationLabel = config.administrationLabel ?? "Administração";
  const items = visibleNavigation(activeTab === "administration" ? config.administrationNavigation : config.platformNavigation);
  const groupLabel = activeTab === "administration" ? administrationLabel : platformLabel;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {showTabs ? (
        <Tabs.Root
          value={activeTab}
          onValueChange={(value) => setManualSelection({ pathname, tab: value as NavigationSection })}
          className="mx-3 mt-3.5"
        >
          <Tabs.List className="grid grid-cols-2 gap-1 rounded-xl border bg-muted p-1 desk:tm-collapsed:grid-cols-1" aria-label="Seções do menu">
            <Tabs.Tab value="platform" className={tabClass} title={platformLabel}>
              <LayoutDashboard className="size-3.5 shrink-0 fill-current/20 text-institutional desk:tm-collapsed:size-4" strokeWidth={2.2} aria-hidden />
              <span className={cn("truncate", hideWhenCollapsed)}>{platformLabel}</span>
            </Tabs.Tab>
            <Tabs.Tab value="administration" className={tabClass} title={administrationLabel}>
              <ShieldCheck className="size-3.5 shrink-0 fill-current/15 text-primary desk:tm-collapsed:size-4" strokeWidth={2.2} aria-hidden />
              <span className={cn("truncate", hideWhenCollapsed)}>{administrationLabel}</span>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.Root>
      ) : null}
      <section className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <p className="mx-2 mb-2.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase desk:tm-collapsed:sr-only">{groupLabel}</p>
        <NavigationList items={items} activeId={current?.section === activeTab ? current.item.id : undefined} />
      </section>
    </div>
  );
}

/*
 * A rota só existe em tempo de execução nas rotas dinâmicas: com Cache Components (Next 16), ler
 * `usePathname()` fora de `<Suspense>` bloqueia o prerender. Enquanto a rota não chega, a barra mostra os
 * itens de plataforma sem item marcado e sem abas; o resto da casca continua estático.
 */
function SidebarBodyFallback({ config }: { config: ShellConfig }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <section className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <p className="mx-2 mb-2.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase desk:tm-collapsed:sr-only">
          {config.platformLabel ?? "Plataforma"}
        </p>
        <NavigationList items={visibleNavigation(config.platformNavigation)} />
      </section>
    </div>
  );
}

export function AppSidebar({
  config,
  session,
  renderSearch,
}: {
  config: ShellConfig;
  session: ShellSession | null;
  renderSearch?: AppShellProps["renderSearch"];
}) {
  const { collapsed, mobileOpen, toggleCollapsed, setMobileOpen } = useSidebar();
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-overlay/40 desk:hidden"
          aria-label="Fechar menu lateral"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <aside
        aria-label="Navegação principal"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh w-[268px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-drawer transition-[width,transform] duration-300 ease-out desk:sticky desk:top-0 desk:z-30 desk:translate-x-0 desk:shadow-none desk:tm-collapsed:w-[76px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Brand config={config} />
        <MobileLogos config={config} />
        <Suspense fallback={<SidebarBodyFallback config={config} />}>
          <SidebarBody config={config} session={session} />
        </Suspense>
        {/* Busca fixa acima do "Recolher": não rola com o menu. */}
        <div className="flex shrink-0 justify-center border-t border-sidebar-border px-3 py-2.5">
          <CommandPalette config={config} session={session} renderSearch={renderSearch} />
        </div>
        <div className="flex h-(--shell-bar) shrink-0 items-center justify-between gap-2 border-t border-sidebar-border px-3.5 desk:tm-collapsed:justify-center">
          <span className={cn("min-w-0 truncate text-xs font-semibold text-muted-foreground", hideWhenCollapsed)}>
            {config.sidebarShortcutLabel ?? "Recolher"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="hidden size-8 rounded-lg text-muted-foreground desk:inline-flex"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            aria-expanded={!collapsed}
            aria-keyshortcuts="Control+B Meta+B"
          >
            <PanelLeftClose className="tm-collapsed:hidden" />
            <PanelLeftOpen className="hidden tm-collapsed:block" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground desk:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu lateral"
          >
            <ChevronLeft />
          </Button>
        </div>
      </aside>
    </>
  );
}
