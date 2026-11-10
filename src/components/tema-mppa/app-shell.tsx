"use client";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./sidebar-context";
import type { AppShellProps, BrandConfig } from "./types";

const FOOTER_CREDIT = "Desenvolvido pelo Ministério Público do Estado do Pará - Escritório de Inteligência Artificial";

/** Texto padrão do rodapé: crédito institucional, nome do sistema, versão e ano(s) da versão. */
export function footerText(brand: BrandConfig) {
  const version = brand.version?.trim().replace(/^v\s*/i, "");
  return [FOOTER_CREDIT, brand.name, version ? `V ${version}` : null, brand.versionYears?.trim() || null]
    .filter(Boolean)
    .join(" - ");
}

/**
 * Moldura visual pura. A sessão chega por propriedade; o componente não autentica,
 * não consulta API, não altera BFF e não impõe proteção de rotas administrativas.
 *
 * Conteúdo como no protótipo: padding 38px (22px/14px no celular), largura máxima de 1500px e
 * altura de linha `normal`. Rodapé padrão dos sistemas: 56px, alinhado ao "Recolher" da barra,
 * texto pequeno e centralizado (`footerText`).
 */
export function AppShell({ config, session, children, footer, onSignOut }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-background font-sans leading-[normal] text-foreground">
        <AppSidebar config={config} session={session} />
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <AppHeader config={config} session={session} onSignOut={onSignOut} />
          <main className="mx-auto flex w-full max-w-[1500px] min-w-0 flex-1 flex-col px-3.5 py-[22px] desk:p-[38px]">{children}</main>
          <footer className="flex min-h-14 shrink-0 items-center justify-center border-t border-sidebar-border py-2 text-center text-xs text-muted-foreground">
            <div className="mx-auto max-w-6xl px-4">{footer ?? footerText(config.brand)}</div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
