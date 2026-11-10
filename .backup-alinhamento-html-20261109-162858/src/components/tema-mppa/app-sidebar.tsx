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
import type { ImageAsset, NavigationItem, ShellConfig, ShellSession } from "./types";
import { cn, isNavigationActive } from "./utils";

type SidebarTab = "platform" | "administration";

function isImageAsset(value: ShellConfig["brand"]["symbol"]): value is ImageAsset {
  return Boolean(value && typeof value === "object" && !isValidElement(value) && "alt" in value);
}

function Brand({ config }: { config: ShellConfig }) {
  const { collapsed, setMobileOpen } = useSidebar();
  const { brand } = config;
  return (
    <Link
      href={brand.homeHref}
      onClick={() => setMobileOpen(false)}
      className={cn("flex min-h-12 items-center gap-2 px-2 py-1.5 hover:bg-sidebar-accent", collapsed && "justify-center px-0")}
      title={`${brand.name}${brand.version ? ` v${brand.version}` : ""}`}
    >
      {isImageAsset(brand.symbol) ? <ImageSlot asset={brand.symbol} className="size-8 shrink-0" /> : brand.symbol ?? null}
      <span className={cn("grid min-w-0 flex-1 text-left leading-tight", collapsed && "hidden")}>
        <span className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate font-semibold tracking-tight">{brand.name}</span>
          {brand.version ? <span className="shrink-0 text-xs font-normal text-muted-foreground">v{brand.version}</span> : null}
        </span>
        {brand.tagline ? <span className="truncate text-xs text-muted-foreground">{brand.tagline}</span> : null}
      </span>
    </Link>
  );
}

function NavigationList({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname();
  const { collapsed, setMobileOpen } = useSidebar();
  return (
    <nav className="space-y-1" aria-label="Itens da seção">
      {items.map((item) => {
        const active = isNavigationActive(pathname, item);
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active ? "page" : undefined}
            title={collapsed ? item.label : undefined}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex h-9 items-center gap-2 px-2 text-sm font-medium text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
              active && "rounded-lg bg-primary/10 text-sidebar-foreground shadow-sm",
              collapsed && "justify-center px-0",
            )}
          >
            <SectionIcon icon={item.icon} tone={item.tone} />
            <span className={cn("truncate", collapsed && "hidden")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ config, session }: { config: ShellConfig; session: ShellSession }) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const isAdministrationPath = config.administrationNavigation?.some((item) => isNavigationActive(pathname, item)) ?? false;
  const [manualSelection, setManualSelection] = useState<{ pathname: string; tab: SidebarTab } | null>(null);
  const manualTab = manualSelection?.pathname === pathname ? manualSelection.tab : null;
  const activeTab: SidebarTab = manualTab ?? (isAdministrationPath ? "administration" : "platform");
  const isAdmin = session.is_admin === true;
  const items = activeTab === "administration" ? (config.administrationNavigation ?? []) : config.platformNavigation;
  const groupLabel = activeTab === "administration"
    ? (config.administrationLabel ?? "Administração")
    : (config.platformLabel ?? "Plataforma");

  if (!isAdmin) {
    return (
      <section className="px-2 py-2">
        <p className={cn("px-2 pb-2 text-xs font-medium text-sidebar-foreground", collapsed && "sr-only")}>
          {config.platformLabel ?? "Plataforma"}
        </p>
        <NavigationList items={config.platformNavigation} />
      </section>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Tabs.Root
        value={activeTab}
        onValueChange={(value) => setManualSelection({ pathname, tab: value as SidebarTab })}
        className="px-2 pt-2"
      >
        <Tabs.List className={cn("grid grid-cols-2 bg-sidebar-accent/60 p-0.5 text-xs", collapsed && "flex flex-col")}>
          <Tabs.Tab
            value="platform"
            className="flex h-7 items-center justify-center px-2 text-sidebar-foreground outline-none data-[active]:bg-primary/10 data-[active]:shadow-sm focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            title={config.platformLabel ?? "Plataforma"}
          >
            <LayoutDashboard className={cn("size-3.5", !collapsed && "hidden")} />
            <span className={cn("truncate", collapsed && "hidden")}>{config.platformLabel ?? "Plataforma"}</span>
          </Tabs.Tab>
          <Tabs.Tab
            value="administration"
            className="flex h-7 items-center justify-center px-2 text-sidebar-foreground outline-none data-[active]:bg-primary/10 data-[active]:shadow-sm focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            title={config.administrationLabel ?? "Administração"}
          >
            <ShieldCheck className={cn("size-3.5", !collapsed && "hidden")} />
            <span className={cn("truncate", collapsed && "hidden")}>{config.administrationLabel ?? "Administração"}</span>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>
      <section className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        <p className={cn("px-2 pb-2 text-xs font-medium text-sidebar-foreground", collapsed && "sr-only")}>{groupLabel}</p>
        <NavigationList items={items} />
      </section>
    </div>
  );
}

export function AppSidebar({ config, session }: { config: ShellConfig; session: ShellSession }) {
  const { collapsed, mobileOpen, toggleCollapsed, setMobileOpen } = useSidebar();
  return (
    <>
      {mobileOpen ? (
        <button
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Fechar menu lateral"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <aside
        aria-label="Navegação principal"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width,transform] duration-200 md:sticky md:top-0 md:z-30 md:h-dvh md:translate-x-0",
          collapsed && "md:w-16",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-sidebar-border p-2"><Brand config={config} /></div>
        <SidebarBody config={config} session={session} />
        <div className="mt-auto border-t border-sidebar-border p-2">
          <div className="flex items-center justify-between gap-2">
            {!collapsed ? <span className="truncate px-2 text-sm font-semibold tracking-wide text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground">{config.sidebarShortcutLabel ?? "Recolher"}</span> : null}
            <Button
              variant="ghost"
              size="icon"
              className={cn(collapsed && "mx-auto")}
              onClick={toggleCollapsed}
              aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
              aria-expanded={!collapsed}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
