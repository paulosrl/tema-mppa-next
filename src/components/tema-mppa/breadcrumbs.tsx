"use client";

import { usePathname } from "next/navigation";
import { SectionIcon } from "./section-icon";
import type { ShellConfig, ShellSession } from "./types";
import { currentNavigationItem } from "./utils";

/**
 * Título da página, exibido uma única vez, no cabeçalho: ícone de seção (28px), a seção (Plataforma ou
 * Administração, a partir de 640px) e o rótulo do item marcado. Sem item correspondente, mostra o nome do
 * sistema, sem ícone nem seção. Com `title`
 * (vindo do conteúdo, como o nome do registro numa rota de detalhe), mostra esse texto, sem ícone.
 */
export function Breadcrumbs({
  config,
  session,
  title,
}: {
  config: ShellConfig;
  session: ShellSession | null;
  title?: string | null;
}) {
  const pathname = usePathname();
  const current = currentNavigationItem(pathname, config, session);
  const item = current?.item;
  const override = title?.trim();
  const sectionLabel =
    current?.section === "administration" ? (config.administrationLabel ?? "Administração") : (config.platformLabel ?? "Plataforma");

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      {item && !override ? <SectionIcon icon={item.icon} tone={item.tone} size="sm" /> : null}
      <div className="flex min-w-0 items-center gap-1.5">
        {item && !override ? (
          <span className="hidden shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground sm:flex" aria-hidden>
            {sectionLabel}
            <span className="opacity-50">/</span>
          </span>
        ) : null}
        <h1 className="truncate text-sm font-semibold">{override || item?.label || config.brand.name}</h1>
      </div>
    </div>
  );
}
