"use client";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./sidebar-context";
import type { AppShellProps } from "./types";

/**
 * Moldura visual pura. A sessão chega por propriedade; o componente não autentica,
 * não consulta API, não altera BFF e não impõe proteção de rotas administrativas.
 */
export function AppShell({ config, session, children, onSignOut }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-background text-foreground">
        <AppSidebar config={config} session={session} />
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <AppHeader config={config} session={session} onSignOut={onSignOut} />
          <main className="flex min-w-0 flex-1 flex-col gap-6 overflow-x-hidden p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
