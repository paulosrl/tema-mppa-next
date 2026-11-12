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
 * Rodapé padrão dos sistemas (`footerText`), igual em todos e sem substituição. A partir de 801px, fica
 * fixo no pé da tela, na faixa do "Recolher": mesma altura (`--shell-bar`, 56px) e mesma borda. O texto
 * institucional nunca é cortado: até 3 linhas cabem em 56px; além disso, o rodapé cresce. No celular,
 * onde não há "Recolher", fica no fim da página.
 *
 * Sessão `null` (ainda a caminho): a casca aparece igual, sem dado de usuário e sem administração, e o
 * botão de sair continua disponível.
 */
export function AppShell({ config, session, children, onSignOut, title, headerActions, renderSearch }: AppShellProps) {
  const credit = footerText(config.brand);
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-background font-sans leading-[normal] text-foreground">
        <AppSidebar config={config} session={session} renderSearch={renderSearch} />
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <AppHeader
            config={config}
            session={session}
            onSignOut={onSignOut}
            title={title}
            headerActions={headerActions}
          />
          <main className="mx-auto flex w-full max-w-[1500px] min-w-0 flex-1 flex-col px-3.5 py-[22px] desk:p-[38px]">{children}</main>
          <footer className="z-10 flex min-h-(--shell-bar) shrink-0 items-center justify-center border-t border-sidebar-border bg-background py-1 text-center text-xs text-muted-foreground desk:sticky desk:bottom-0">
            <p className="m-0 mx-auto max-w-6xl px-4">{credit}</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
