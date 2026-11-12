"use client";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./sidebar-context";
import type { AppShellProps } from "./types";
import type { ReactNode } from "react";
import { footerText } from "./utils";

const INSTITUTION = "Ministério Público do Estado do Pará";

/** O texto do rodapé com o órgão em destaque e o nome do sistema no vermelho institucional. */
function FooterCredit({ text, name }: { text: string; name: string }) {
  const parts: ReactNode[] = [];
  let rest = text;
  for (const [needle, className] of [
    [INSTITUTION, "font-semibold text-foreground"],
    [name, "font-semibold text-institutional-foreground"],
  ] as const) {
    const at = needle ? rest.indexOf(needle) : -1;
    if (at < 0) continue;
    parts.push(rest.slice(0, at), <span key={needle} className={className}>{needle}</span>);
    rest = rest.slice(at + needle.length);
  }
  parts.push(rest);
  return <>{parts}</>;
}

/**
 * Moldura visual pura. A sessão chega por propriedade; o componente não autentica,
 * não consulta API, não altera BFF e não impõe proteção de rotas administrativas.
 *
 * Conteúdo: padding 40px × 36px (24px no tablet, 16px no celular), largura máxima de 1380px e altura de
 * linha `normal`.
 *
 * Rodapé padrão dos sistemas (`footerText`), igual em todos e sem substituição. A partir de 801px, fica
 * fixo no pé da tela, na faixa do "Recolher": mesma altura (`--shell-bar`, 62px) e mesma borda, translúcido com
 * desfoque. O texto institucional nunca é cortado: além de 62px, o rodapé cresce. No celular,
 * onde não há "Recolher", fica no fim da página.
 *
 * Sessão `null` (ainda a caminho): a casca aparece igual, sem dado de usuário e sem administração, e o
 * botão de sair continua disponível.
 */
export function AppShell({ config, session, children, onSignOut, title, headerActions, renderSearch }: AppShellProps) {
  const credit = footerText(config.brand);
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full font-sans leading-[normal] text-foreground">
        <AppSidebar config={config} session={session} renderSearch={renderSearch} />
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <AppHeader
            config={config}
            session={session}
            onSignOut={onSignOut}
            title={title}
            headerActions={headerActions}
          />
          <main className="mx-auto flex w-full max-w-[1380px] min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 desk:px-10 desk:py-9">{children}</main>
          <footer className="z-10 flex min-h-(--shell-bar) shrink-0 items-center justify-center border-t border-sidebar-border bg-header py-3 text-center text-xs font-medium text-muted-foreground backdrop-blur-md desk:sticky desk:bottom-0">
            <p className="m-0 mx-auto max-w-6xl px-4">
              <FooterCredit text={credit} name={typeof config.brand.name === "string" ? config.brand.name.trim() : ""} />
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
