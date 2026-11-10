"use client";

import { usePathname } from "next/navigation";
import { SectionIcon } from "./section-icon";
import type { ShellConfig, ShellSession } from "./types";
import { currentNavigationItem } from "./utils";

/**
 * Título da página, exibido uma única vez, no cabeçalho: ícone de seção (28px) e rótulo do item
 * marcado, 10px entre eles. Sem item correspondente, mostra o nome do sistema.
 */
export function Breadcrumbs({ config, session }: { config: ShellConfig; session: ShellSession }) {
  const pathname = usePathname();
  const current = currentNavigationItem(pathname, config, session);
  const item = current?.item;

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      {item ? <SectionIcon icon={item.icon} tone={item.tone} /> : null}
      <h1 className="truncate text-base font-[650]">{item?.label ?? config.brand.name}</h1>
    </div>
  );
}
