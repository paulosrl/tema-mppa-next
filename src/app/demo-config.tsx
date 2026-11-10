import { Bot, FileText, Gauge, Share2, ShieldCheck, Users } from "lucide-react";
import type { ShellConfig, ShellSession } from "@/components/tema-mppa";

/**
 * Exemplo substituível, com o conteúdo do protótipo (docs/prototipo/index.html). Todos os nomes,
 * rotas e itens chegam ao shell por configuração.
 */
export const demoConfig: ShellConfig = {
  brand: {
    name: "Template",
    version: "1.1",
    tagline: "Sistema consumidor",
    homeHref: "/",
    symbol: <span className="tm-brand-mark" aria-hidden>T</span>,
  },
  platformLabel: "Plataforma",
  administrationLabel: "Administração",
  platformNavigation: [
    { id: "overview", label: "Visão geral", href: "/", icon: Gauge, exact: true, tone: "red", description: "Indicadores e atividade recente" },
    { id: "items", label: "Meus itens", href: "/itens", icon: FileText, tone: "green", description: "Itens criados por você" },
    { id: "shared", label: "Itens compartilhados", href: "/compartilhados", icon: Share2, tone: "violet", description: "Itens que outras pessoas compartilharam" },
    { id: "agents", label: "Automações", href: "/automacoes", icon: Bot, tone: "orange", description: "Rotinas agendadas" },
    { id: "item-detail", label: "Detalhe do item", href: "/itens/detalhe", icon: FileText, tone: "green", hidden: true },
  ],
  administrationNavigation: [
    { id: "curation", label: "Curadoria", href: "/administracao/curadoria", icon: ShieldCheck, tone: "red", description: "Revisão de itens publicados" },
    { id: "users", label: "Usuários", href: "/administracao/usuarios", icon: Users, tone: "green", description: "Contas e perfis" },
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
  name: "Pessoa Lima",
  email: "pessoa@exemplo.local",
  profileLabel: "Administrador",
  is_admin: true,
};
