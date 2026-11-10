"use client";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./sidebar-context";
import type { AppShellProps } from "./types";

/**
 * Moldura visual pura. A sessão chega por propriedade; o componente não autentica,
 * não consulta API, não altera BFF e não impõe proteção de rotas administrativas.
 *
 * Conteúdo como no protótipo: padding 38px (22px/14px no celular), largura máxima de 1500px e
 * altura de linha `normal`.
 */
export function AppShell({ config, session, children, footer, onSignOut }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-background font-sans leading-[normal] text-foreground">
        <AppSidebar config={config} session={session} />
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <AppHeader config={config} session={session} onSignOut={onSignOut} />
          <main className="mx-auto flex w-full max-w-[1500px] min-w-0 flex-1 flex-col px-3.5 py-[22px] desk:p-[38px]">{children}</main>
          {footer ? (
            <footer className="border-t text-sm">
              <div className="mx-auto w-full max-w-[1500px] px-3.5 py-4 desk:px-[38px]">{footer}</div>
            </footer>
          ) : null}
        </div>
      </div>
    </SidebarProvider>
  );
}
