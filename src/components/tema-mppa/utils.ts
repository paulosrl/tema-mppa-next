import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CurrentNavigation, NavigationItem, NavigationSection, ShellConfig, ShellSession } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function routeMatches(pathname: string, route: string, exact: boolean) {
  if (pathname === route) return true;
  if (exact) return false;
  const prefix = route.endsWith("/") ? route : `${route}/`;
  return pathname.startsWith(prefix);
}

/** Tamanho da rota mais longa do item que casa com `pathname`; -1 quando nenhuma casa. */
export function navigationScore(pathname: string, item: NavigationItem) {
  let score = routeMatches(pathname, item.href, item.exact === true) ? item.href.length : -1;
  for (const route of item.matches ?? []) {
    if (routeMatches(pathname, route, false)) score = Math.max(score, route.length);
  }
  return score;
}

export function isNavigationActive(pathname: string, item: NavigationItem) {
  return navigationScore(pathname, item) >= 0;
}

/**
 * Abas e itens administrativos aparecem só com `session.is_admin === true` e pelo menos um item
 * administrativo visível. A mesma regra vale para a barra lateral, a busca e o título.
 */
export function canSeeAdministration(config: ShellConfig, session: ShellSession) {
  return session.is_admin === true && (config.administrationNavigation ?? []).some((item) => !item.hidden);
}

export function visibleNavigation(items: NavigationItem[] | undefined) {
  return (items ?? []).filter((item) => !item.hidden);
}

/**
 * O único item marcado: o de rota mais longa entre os que o usuário pode ver (inclusive os
 * `hidden`). É o mesmo do título no cabeçalho e o que decide a aba aberta.
 */
export function currentNavigationItem(
  pathname: string,
  config: ShellConfig,
  session: ShellSession,
): CurrentNavigation | null {
  const sections: [NavigationSection, NavigationItem[]][] = [["platform", config.platformNavigation]];
  if (canSeeAdministration(config, session)) sections.push(["administration", config.administrationNavigation ?? []]);

  let best: CurrentNavigation | null = null;
  let bestScore = -1;
  for (const [section, items] of sections) {
    for (const item of items) {
      const score = navigationScore(pathname, item);
      if (score > bestScore) {
        best = { item, section };
        bestScore = score;
      }
    }
  }
  return best;
}

export function displayName(session: ShellSession) {
  const name = session.name?.trim();
  if (!name) return session.email;
  const parts = name.split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts.at(-1)}` : parts[0];
}

export function initials(session: ShellSession) {
  const source = session.name?.trim() || session.email.split("@")[0] || "?";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  return `${parts[0]?.[0] ?? "?"}${parts.length > 1 ? parts.at(-1)?.[0] ?? "" : ""}`.toUpperCase();
}

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}
