"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { SectionIcon } from "./section-icon";
import type { NavigationItem, ShellConfig } from "./types";
import { isNavigationActive } from "./utils";

function allItems(config: ShellConfig) {
  return [...config.platformNavigation, ...(config.administrationNavigation ?? [])];
}

function currentItem(pathname: string, config: ShellConfig): NavigationItem | undefined {
  return allItems(config)
    .filter((item) => isNavigationActive(pathname, item))
    .sort((a, b) => b.href.length - a.href.length)[0];
}

export function Breadcrumbs({ config }: { config: ShellConfig }) {
  const pathname = usePathname();
  const item = currentItem(pathname, config);
  const isAdmin = config.administrationNavigation?.some((candidate) => candidate.id === item?.id) ?? false;
  const crumbs = item
    ? isAdmin
      ? [{ label: config.administrationLabel ?? "Administração" }, { label: item.label }]
      : [{ label: item.label }]
    : [{ label: config.brand.name }];

  return (
    <nav aria-label="Localização" className="min-w-0">
      <ol className="flex min-w-0 items-center gap-1.5 text-sm">
        {crumbs.map((crumb, index) => (
          <Fragment key={`${crumb.label}-${index}`}>
            {index > 0 ? <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden /> : null}
            <li className="flex min-w-0 items-center gap-2.5">
              {index === 0 && item ? <SectionIcon icon={item.icon} tone={item.tone} /> : null}
              {index === crumbs.length - 1 ? (
                <span className="truncate font-medium">{crumb.label}</span>
              ) : (
                <Link href={config.brand.homeHref} className="truncate text-muted-foreground hover:text-foreground">
                  {crumb.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
