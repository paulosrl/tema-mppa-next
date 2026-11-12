"use client";

import { usePathname } from "next/navigation";
import { SectionIcon } from "./section-icon";
import type { ShellConfig, ShellSession } from "./types";
import { currentNavigationItem } from "./utils";

/**
 * Título da página, exibido uma única vez, no cabeçalho: ícone de seção (28px), a seção (Plataforma ou
 * Administração) e o rótulo do item marcado. Sem item correspondente, mostra o nome do sistema, sem ícone nem
 * seção. Com `title` (vindo do conteúdo, como o nome do registro numa rota de detalhe), mostra esse texto, sem
 * ícone.
 *
 * Prioridade de espaço: o bloco ocupa o que sobra no cabeçalho e nunca fica abaixo de 128px (ícone e cerca de
 * 90px de texto). A seção só aparece quando o bloco tem 288px ou mais (consulta de contêiner), e encolhe antes
 * do título; abaixo disso, o título fica sozinho.
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
    <div className="@container flex min-w-32 flex-1 items-center gap-2.5">
      {item && !override ? <SectionIcon icon={item.icon} tone={item.tone} size="sm" /> : null}
      <div className="flex min-w-0 items-center gap-1.5">
        {item && !override ? (
          <span className="hidden min-w-0 shrink-[4] items-center gap-1.5 text-xs font-medium text-muted-foreground @[18rem]:flex" aria-hidden>
            <span className="truncate">{sectionLabel}</span>
            <span className="shrink-0 opacity-50">/</span>
          </span>
        ) : null}
        <h1 className="min-w-0 truncate text-sm font-semibold">{override || item?.label || config.brand.name}</h1>
      </div>
    </div>
  );
}
