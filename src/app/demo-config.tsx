import {
  Bot,
  Boxes,
  FileText,
  Gauge,
  Globe2,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ShellConfig, ShellSession } from "@/components/tema-mppa";

/** Exemplo substituível. Todos os nomes, rotas e itens chegam ao shell por configuração. */
export const demoConfig: ShellConfig = {
  brand: {
    name: "Produto Exemplo",
    version: "1.0.0",
    tagline: "Plataforma configurável",
    homeHref: "/",
    symbol: <Boxes className="size-8 shrink-0 text-primary" aria-hidden />,
  },
  platformLabel: "Plataforma",
  administrationLabel: "Administração",
  platformNavigation: [
    { id: "overview", label: "Visão geral", href: "/", icon: Gauge, exact: true, tone: "bg-red-500/10 text-red-700 dark:text-red-300" },
    { id: "items", label: "Meus itens", href: "/itens", icon: FileText, tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
    { id: "shared", label: "Itens compartilhados", href: "/compartilhados", icon: Globe2, tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300" },
    { id: "agents", label: "Automações", href: "/automacoes", icon: Bot, tone: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  ],
  administrationNavigation: [
    { id: "curation", label: "Curadoria", href: "/administracao/curadoria", icon: ShieldCheck, tone: "bg-red-500/10 text-red-700 dark:text-red-300" },
    { id: "users", label: "Usuários", href: "/administracao/usuarios", icon: Users, tone: "bg-sky-500/10 text-sky-700 dark:text-sky-300" },
    { id: "settings", label: "Configurações", href: "/administracao/configuracoes", icon: Settings2, tone: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300" },
  ],
  header: {
    logos: [],
    searchPlaceholder: "Buscar ou executar…",
    signOutLabel: "Sair",
  },
  sidebarShortcutLabel: "Recolher",
};

/** Demonstração apenas; o sistema consumidor fornece a sessão real. */
export const demoSession: ShellSession = {
  user_id: "demo-user",
  name: "Usuário Exemplo",
  email: "usuario@exemplo.local",
  profileLabel: "Administrador",
  is_admin: true,
};
