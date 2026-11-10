"use client";

import { Tabs } from "@base-ui/react/tabs";
import { ChevronLeft, ChevronRight, LayoutDashboard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isValidElement, useState } from "react";
import { Button } from "./button";
import { ImageSlot } from "./image-slot";
import { SectionIcon } from "./section-icon";
import { useSidebar } from "./sidebar-context";
import type { ImageAsset, NavigationItem, NavigationSection, ShellConfig, ShellSession } from "./types";
import { canSeeAdministration, cn, currentNavigationItem, visibleNavigation } from "./utils";

function isImageAsset(value: ShellConfig["brand"]["symbol"]): value is ImageAsset {
  return Boolean(value && typeof value === "object" && !isValidElement(value) && "alt" in value);
}

/* Recolhida só vale a partir de 801px: abaixo disso o menu móvel abre sempre expandido. */
function useCompact() {
  const { collapsed } = useSidebar();
  return {
    collapsed,
    hideWhenCollapsed: collapsed ? "desk:hidden" : undefined,
  };
}

function Brand({ config }: { config: ShellConfig }) {
  const { setMobileOpen } = useSidebar();
  const { collapsed, hideWhenCollapsed } = useCompact();
  const { brand } = config;
  return (
    <div className={cn("flex h-(--shell-bar) shrink-0 items-center border-b border-sidebar-border px-2", collapsed && "desk:justify-center")}>
      <Link
        href={brand.homeHref}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg px-2 outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          collapsed && "desk:flex-none desk:justify-center desk:px-1",
        )}
        title={`${brand.name}${brand.version ? ` v${brand.version}` : ""}`}
      >
        {isImageAsset(brand.symbol) ? <ImageSlot asset={brand.symbol} className="size-8 shrink-0" /> : brand.symbol ?? null}
        <span className={cn("grid min-w-0 flex-1 text-left leading-tight", hideWhenCollapsed)}>
          <span className="flex min-w-0 items-baseline gap-1.5">
            <span className="truncate font-semibold tracking-tight">{brand.name}</span>
            {brand.version ? <span className="shrink-0 text-xs font-normal text-muted-foreground">v{brand.version}</span> : null}
          </span>
          {brand.tagline ? <span className="truncate text-xs text-muted-foreground">{brand.tagline}</span> : null}
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
    <div className="flex flex-wrap items-center gap-2 border-b border-sidebar-border px-3 py-2 sm:hidden">
      {logos.map((logo) => (
        <ImageSlot key={`${logo.src}-${logo.alt}`} asset={logo} className="h-7 w-auto rounded-sm bg-logo-surface px-1.5 py-0.5" />
      ))}
    </div>
  );
}

function NavigationList({ items, activeId }: { items: NavigationItem[]; activeId?: string }) {
  const { setMobileOpen } = useSidebar();
  const { collapsed, hideWhenCollapsed } = useCompact();
  return (
    <nav className="grid gap-[5px]" aria-label="Itens da seção">
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
              "flex items-center gap-2.5 rounded-lg px-2 py-[7px] text-[13px] font-semibold text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
              active && "bg-highlight text-highlight-foreground shadow-surface hover:bg-highlight",
              collapsed && "desk:justify-center desk:px-0",
            )}
          >
            <SectionIcon icon={item.icon} tone={item.tone} />
            <span className={cn("truncate", hideWhenCollapsed)}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

const tabClass =
  "flex h-8 items-center justify-center rounded-md px-2 text-[13px] font-[650] text-sidebar-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active]:bg-highlight data-[active]:text-highlight-foreground data-[active]:shadow-surface";

function SidebarBody({ config, session }: { config: ShellConfig; session: ShellSession }) {
  const pathname = usePathname();
  const { collapsed, hideWhenCollapsed } = useCompact();
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
          className="mx-2.5 mt-2.5"
        >
          <Tabs.List
            className={cn("grid grid-cols-2 gap-1 rounded-lg bg-muted p-[3px]", collapsed && "desk:grid-cols-1")}
            aria-label="Seções do menu"
          >
            <Tabs.Tab value="platform" className={tabClass} title={platformLabel}>
              <LayoutDashboard className={cn("hidden size-4", collapsed && "desk:block")} aria-hidden />
              <span className={cn("truncate", hideWhenCollapsed)}>{platformLabel}</span>
            </Tabs.Tab>
            <Tabs.Tab value="administration" className={tabClass} title={administrationLabel}>
              <ShieldCheck className={cn("hidden size-4", collapsed && "desk:block")} aria-hidden />
              <span className={cn("truncate", hideWhenCollapsed)}>{administrationLabel}</span>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.Root>
      ) : null}
      <section className="min-h-0 flex-1 overflow-y-auto p-2.5">
        <p className={cn("mx-2 mt-0.5 mb-2 text-[13px] font-bold text-sidebar-foreground", collapsed && "desk:sr-only")}>{groupLabel}</p>
        <NavigationList items={items} activeId={current?.section === activeTab ? current.item.id : undefined} />
      </section>
    </div>
  );
}

export function AppSidebar({ config, session }: { config: ShellConfig; session: ShellSession }) {
  const { mobileOpen, toggleCollapsed, setMobileOpen } = useSidebar();
  const { collapsed, hideWhenCollapsed } = useCompact();
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
          "fixed inset-y-0 left-0 z-50 flex h-dvh w-[260px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-drawer transition-[width,transform] duration-200 desk:sticky desk:top-0 desk:z-30 desk:translate-x-0 desk:shadow-none",
          collapsed && "desk:w-16",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Brand config={config} />
        <MobileLogos config={config} />
        <SidebarBody config={config} session={session} />
        <div className={cn("flex h-(--shell-bar) shrink-0 items-center justify-between gap-2 border-t border-sidebar-border px-2.5", collapsed && "desk:justify-center")}>
          <span className={cn("truncate text-sm font-bold text-sidebar-foreground", hideWhenCollapsed)}>
            {config.sidebarShortcutLabel ?? "Recolher"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="hidden desk:inline-flex"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            aria-expanded={!collapsed}
            aria-keyshortcuts="Control+B Meta+B"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="desk:hidden"
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
