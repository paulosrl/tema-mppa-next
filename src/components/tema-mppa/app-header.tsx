"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "./breadcrumbs";
import { buttonVariants } from "./button";
import { CommandPalette } from "./command-palette";
import { ImageSlot } from "./image-slot";
import { useSidebar } from "./sidebar-context";
import { ThemeToggle } from "./theme-toggle";
import type { ShellConfig, ShellSession } from "./types";
import { UserIdentity } from "./user-identity";
import { cn } from "./utils";

/** Cabeçalho do protótipo: 56px, fundo sólido, borda inferior; título da página aparece só aqui. */
export function AppHeader({
  config,
  session,
  onSignOut,
}: {
  config: ShellConfig;
  session: ShellSession;
  onSignOut?: () => void;
}) {
  const { setMobileOpen } = useSidebar();
  const logos = (config.header?.logos ?? []).filter((logo) => Boolean(logo.src));
  const BackIcon = config.header?.backLink?.icon;

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-[9px] border-b bg-background px-[18px]">
      <button
        type="button"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "-ml-1.5 desk:hidden")}
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu lateral"
      >
        <Menu />
      </button>
      <Breadcrumbs config={config} session={session} />
      <div className="ml-auto flex shrink-0 items-center gap-[9px]">
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
        <CommandPalette config={config} session={session} />
        <ThemeToggle />
        {logos.length ? (
          <span className="hidden items-center gap-2 sm:flex">
            {logos.map((logo) => (
              <ImageSlot key={`${logo.src}-${logo.alt}`} asset={logo} className="h-7 w-auto rounded-sm bg-logo-surface px-1.5 py-0.5" />
            ))}
          </span>
        ) : null}
        <UserIdentity session={session} onSignOut={onSignOut} signOutLabel={config.header?.signOutLabel ?? "Sair"} />
      </div>
    </header>
  );
}
