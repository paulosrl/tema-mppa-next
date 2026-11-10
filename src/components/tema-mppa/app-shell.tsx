"use client";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./sidebar-context";
import type { AppShellProps } from "./types";
import { footerText } from "./utils";

/**
 * Moldura visual pura. A sessão chega por propriedade; o componente não autentica,
 * não consulta API, não altera BFF e não impõe proteção de rotas administrativas.
 *
 * Conteúdo como no protótipo: padding 38px (22px/14px no celular), largura máxima de 1500px e
 * altura de linha `normal`.
 *
 * Rodapé padrão dos sistemas (`footerText`), igual em todos e sem substituição: a partir de 801px,
 * 56px fixos no pé da tela, na mesma linha do "Recolher" da barra, com até 3 linhas de texto; no
 * celular, onde não há "Recolher", fica no fim da página com a altura do texto.
 */
export function AppShell({ config, session, children, onSignOut }: AppShellProps) {
  const credit = footerText(config.brand);
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-background font-sans leading-[normal] text-foreground">
        <AppSidebar config={config} session={session} />
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <AppHeader config={config} session={session} onSignOut={onSignOut} />
          <main className="mx-auto flex w-full max-w-[1500px] min-w-0 flex-1 flex-col px-3.5 py-[22px] desk:p-[38px]">{children}</main>
          <footer className="z-10 flex min-h-14 shrink-0 items-center justify-center border-t bg-background py-2 text-center text-xs text-muted-foreground desk:sticky desk:bottom-0 desk:h-14 desk:py-0">
            <p className="m-0 mx-auto line-clamp-3 max-w-6xl px-4" title={credit}>
              {credit}
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
