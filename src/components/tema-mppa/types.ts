import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type IconComponent = LucideIcon;

export type ImageAsset = {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

/** Tons do protótipo para o ícone de seção. Uma string fora da lista é tratada como classes (1.0.0). */
export type NavigationTone = "red" | "green" | "violet" | "orange";

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  icon: IconComponent;
  /** Só a rota exata marca o item; sem `exact`, as sub-rotas também marcam. */
  exact?: boolean;
  tone?: NavigationTone | (string & {});
  keywords?: string[];
  /** Texto curto mostrado e filtrado pela busca. */
  description?: string;
  /** Outras rotas (e suas sub-rotas) que marcam este item. */
  matches?: string[];
  /** Fora do menu e da busca, mas dá o título e marca a aba quando a rota é dele. */
  hidden?: boolean;
};

export type SearchItem = {
  id: string;
  label: string;
  href: string;
  icon?: IconComponent;
  description?: string;
  keywords?: string[];
};

export type ShellSession = {
  user_id?: string;
  name?: string | null;
  email: string;
  profileLabel?: string;
  avatar?: ImageAsset | null;
  is_admin: boolean;
};

export type BrandConfig = {
  name: string;
  version?: string | null;
  /** Ano (ou anos, como "2025-2026") da versão, mostrado no rodapé. */
  versionYears?: string | null;
  tagline?: string | null;
  homeHref: string;
  symbol?: ImageAsset | ReactNode | null;
};

export type HeaderConfig = {
  logos?: ImageAsset[];
  backLink?: { href: string; label: string; icon?: IconComponent } | null;
  searchPlaceholder?: string;
  signOutLabel?: string;
};

export type ShellConfig = {
  brand: BrandConfig;
  platformLabel?: string;
  administrationLabel?: string;
  platformNavigation: NavigationItem[];
  administrationNavigation?: NavigationItem[];
  header?: HeaderConfig;
  searchItems?: SearchItem[];
  sidebarShortcutLabel?: string;
};

export type AppShellProps = {
  config: ShellConfig;
  session: ShellSession;
  children: ReactNode;
  /**
   * Substitui o texto padrão do rodapé. Não use: o rodapé padrão dos sistemas já vem montado com
   * `brand.name`, `brand.version` e `brand.versionYears`.
   */
  footer?: ReactNode;
  onSignOut?: () => void;
};

export type NavigationSection = "platform" | "administration";

export type CurrentNavigation = {
  item: NavigationItem;
  section: NavigationSection;
};
