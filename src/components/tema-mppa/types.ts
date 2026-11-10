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

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  icon: IconComponent;
  exact?: boolean;
  tone?: string;
  keywords?: string[];
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
  onSignOut?: () => void;
};
