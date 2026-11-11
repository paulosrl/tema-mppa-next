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

/**
 * Tons do ícone de seção: os quatro do protótipo e mais quatro, para sistemas com mais de quatro itens que
 * precisam de uma cor por item. Uma string fora da lista é tratada como classes, como no primeiro zip.
 */
export type NavigationTone = "red" | "green" | "violet" | "orange" | "blue" | "teal" | "pink" | "amber";

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
  /** Iniciais do avatar quando o sistema tem regra própria; sem elas, a camada as deriva do nome ou do e-mail. */
  initials?: string | null;
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

/** Controle da busca entregue ao `renderSearch`: o modelo cuida do botão e do `Ctrl+K`; o sistema, do diálogo. */
export type SearchControls = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type AppShellProps = {
  config: ShellConfig;
  /** `null` enquanto a sessão não chega: a casca aparece sem dado de usuário, sem administração e com o botão de sair. */
  session: ShellSession | null;
  children: ReactNode;
  onSignOut?: () => void;
  /**
   * Título vindo do conteúdo (por exemplo, o nome do registro numa rota de detalhe). Substitui o rótulo do
   * item no cabeçalho e aparece sem ícone de seção; o item continua marcado na barra.
   */
  title?: string | null;
  /** Ações do sistema no cabeçalho, à esquerda da busca (por exemplo, um botão de volta a outro sistema). */
  headerActions?: ReactNode;
  /**
   * Busca própria do sistema no lugar da paleta do modelo. O botão "Abrir busca" e o atalho `Ctrl+K` continuam
   * do modelo; o diálogo é o que esta função devolve, controlado por `open`/`setOpen`.
   */
  renderSearch?: (controls: SearchControls) => ReactNode;
};

export type NavigationSection = "platform" | "administration";

export type CurrentNavigation = {
  item: NavigationItem;
  section: NavigationSection;
};
