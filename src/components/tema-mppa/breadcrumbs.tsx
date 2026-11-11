"use client";

import { usePathname } from "next/navigation";
import { SectionIcon } from "./section-icon";
import type { ShellConfig, ShellSession } from "./types";
import { currentNavigationItem } from "./utils";

/**
 * Título da página, exibido uma única vez, no cabeçalho: ícone de seção (24px) e rótulo do item
 * marcado, 10px entre eles. Sem item correspondente, mostra o nome do sistema, sem ícone. Com `title`
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

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      {item && !override ? <SectionIcon icon={item.icon} tone={item.tone} size="sm" /> : null}
      <h1 className="truncate text-sm font-medium">{override || item?.label || config.brand.name}</h1>
    </div>
  );
}
