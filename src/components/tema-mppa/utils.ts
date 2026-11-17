import { clsx, type ClassValue } from "clsx";
import { BookOpen, GraduationCap } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type {
  BrandConfig,
  CurrentNavigation,
  NavigationItem,
  NavigationSection,
  SearchItem,
  ShellConfig,
  ShellSession,
  SupportConfig,
} from "./types";

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
 * administrativo visível. A mesma regra vale para a barra lateral, a busca e o título. Sem sessão
 * (`null`, ainda a caminho), nada administrativo aparece.
 */
export function canSeeAdministration(config: ShellConfig, session: ShellSession | null) {
  return session?.is_admin === true && (config.administrationNavigation ?? []).some((item) => !item.hidden);
}

export function visibleNavigation(items: NavigationItem[] | undefined) {
  return (items ?? []).filter((item) => !item.hidden);
}

export const SUPPORT_LABEL = "Apoio";

type ShellNavigation = {
  /** Itens do sistema em "Minha Página", sem os que repetem o endereço de um item do grupo "Apoio". */
  platform: NavigationItem[];
  /** Itens do grupo "Apoio" ("Manual" e "Tutorial"), só os que têm endereço. */
  support: NavigationItem[];
  /** `platform` seguido de `support`: todos os itens da aba de plataforma. */
  platformWithSupport: NavigationItem[];
  platformSource: NavigationItem[] | undefined;
  supportSource: Partial<SupportConfig> | undefined;
};

const navigationCache = new WeakMap<ShellConfig, ShellNavigation>();

function supportHref(value: unknown) {
  return typeof value === "string" && value ? value : null;
}

/**
 * Itens de "Minha Página": os do sistema e os do grupo "Apoio". Os do grupo são fixos da camada; só os endereços
 * vêm de `config.support`. Sem `support` (configuração antiga ou sem tipo) ou com endereço vazio, o item sai, sem
 * erro. Item do sistema (`platformNavigation`) com o endereço de um item do grupo também sai: vale o do grupo, e
 * nada aparece duas vezes. O resultado é guardado por configuração e refeito só quando a lista ou `support` mudam.
 */
export function shellNavigation(config: ShellConfig): ShellNavigation {
  const supportSource: Partial<SupportConfig> | undefined = config.support;
  const cached = navigationCache.get(config);
  if (cached && cached.platformSource === config.platformNavigation && cached.supportSource === supportSource) return cached;

  const support: NavigationItem[] = [];
  const manualHref = supportHref(supportSource?.manualHref);
  const tutorialHref = supportHref(supportSource?.tutorialHref);
  if (manualHref) support.push({ id: "tm-apoio-manual", label: "Manual", href: manualHref, icon: BookOpen, tone: "blue", description: "Manual do sistema" });
  if (tutorialHref) support.push({ id: "tm-apoio-tutorial", label: "Tutorial", href: tutorialHref, icon: GraduationCap, tone: "teal", description: "Tutorial do sistema" });
  const supportHrefs = new Set(support.map((item) => item.href));
  const platform = (config.platformNavigation ?? []).filter((item) => !supportHrefs.has(item.href));

  const navigation = {
    platform,
    support,
    platformWithSupport: [...platform, ...support],
    platformSource: config.platformNavigation,
    supportSource,
  };
  navigationCache.set(config, navigation);
  return navigation;
}

/** Itens do grupo "Apoio" ("Manual" e "Tutorial"), fixos da camada; só os endereços vêm de `config.support`. */
export function supportNavigation(config: ShellConfig): NavigationItem[] {
  return shellNavigation(config).support;
}

/**
 * Itens da busca do modelo: os itens de menu que o usuário vê (do sistema, do grupo "Apoio" e, para
 * administradores, os administrativos), seguidos de `config.searchItems`. Item de `searchItems` com o endereço
 * de um item do grupo "Apoio" sai, para não aparecer duas vezes. Quem usa `renderSearch` chama esta função para
 * listar os mesmos itens na busca própria.
 */
export function shellSearchItems(config: ShellConfig, session: ShellSession | null): SearchItem[] {
  const { platform, support } = shellNavigation(config);
  const supportHrefs = new Set(support.map((item) => item.href));
  const navigation = [
    ...visibleNavigation(platform),
    ...support,
    ...(canSeeAdministration(config, session) ? visibleNavigation(config.administrationNavigation) : []),
  ];
  return [
    ...navigation.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      href: item.href,
      icon: item.icon,
      description: item.description,
      keywords: item.keywords,
    })),
    ...(config.searchItems ?? []).filter((item) => !supportHrefs.has(item.href)),
  ];
}

/**
 * O único item marcado: o de rota mais longa entre os que o usuário pode ver (inclusive os
 * `hidden`). É o mesmo do título no cabeçalho e o que decide a aba aberta.
 */
export function currentNavigationItem(
  pathname: string,
  config: ShellConfig,
  session: ShellSession | null,
): CurrentNavigation | null {
  const sections: [NavigationSection, NavigationItem[]][] = [
    ["platform", shellNavigation(config).platformWithSupport],
  ];
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
  const own = session.initials?.trim();
  if (own) return own;
  const source = session.name?.trim() || session.email.split("@")[0] || "?";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  return `${parts[0]?.[0] ?? "?"}${parts.length > 1 ? parts.at(-1)?.[0] ?? "" : ""}`.toUpperCase();
}

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export const FOOTER_CREDIT = "Desenvolvido pelo Ministério Público do Estado do Pará - Escritório de Inteligência Artificial";

/**
 * Texto do rodapé padrão dos sistemas: crédito institucional, nome, "V " + versão e ano(s) da versão.
 * Só um "v" seguido de número é removido da versão ("vX.Y.Z" com números vira "V X.Y.Z"); nome, versão ou ano
 * vazios ou ausentes saem do texto, sem erro.
 */
export function footerText(brand: BrandConfig) {
  const version = brand.version?.trim().replace(/^v(?=\d)/i, "").trim();
  const years = brand.versionYears?.trim();
  const name = typeof brand.name === "string" ? brand.name.trim() : "";
  return [FOOTER_CREDIT, name || null, version ? `V ${version}` : null, years || null]
    .filter(Boolean)
    .join(" - ");
}
