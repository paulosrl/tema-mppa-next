import { Bot, FileText, Gauge, Share2, ShieldCheck, Users } from "lucide-react";
import type { ShellConfig, ShellSession } from "@/components/tema-mppa";

/* Logos genéricas de exemplo (SVG embutido); o consumidor passa as logos institucionais reais. */
const svg = (markup: string) => `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
const logoOrgao = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="132" height="76" viewBox="0 0 132 76"><rect width="132" height="76" fill="#fff"/><text x="66" y="44" font-family="Arial" font-size="30" font-weight="700" fill="#9f0712" text-anchor="middle">ÓRGÃO</text><text x="66" y="62" font-family="Arial" font-size="11" fill="#18181b" text-anchor="middle">logo de exemplo</text></svg>',
);
const logoSetor = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r="34" fill="#fff" stroke="#1e3a8a" stroke-width="5"/><text x="38" y="45" font-family="Arial" font-size="20" font-weight="700" fill="#1e3a8a" text-anchor="middle">SET</text></svg>',
);

/**
 * Exemplo substituível, com o conteúdo do protótipo (docs/prototipo/index.html). Todos os nomes,
 * rotas e itens chegam ao shell por configuração.
 */
export const demoConfig: ShellConfig = {
  brand: {
    name: "Template",
    version: "1.9.0",
    versionYears: "2026",
    homeHref: "/",
    symbol: <span className="tm-brand-mark" aria-hidden>T</span>,
  },
  platformLabel: "Plataforma",
  administrationLabel: "Administração",
  platformNavigation: [
    { id: "overview", label: "Visão geral", href: "/", icon: Gauge, exact: true, tone: "blue", description: "Indicadores e atividade recente" },
    { id: "items", label: "Meus itens", href: "/itens", icon: FileText, tone: "green", description: "Itens criados por você" },
    { id: "shared", label: "Itens compartilhados", href: "/compartilhados", icon: Share2, tone: "violet", description: "Itens que outras pessoas compartilharam" },
    { id: "agents", label: "Automações", href: "/automacoes", icon: Bot, tone: "orange", description: "Rotinas agendadas" },
    { id: "item-detail", label: "Detalhe do item", href: "/itens/detalhe", icon: FileText, tone: "green", hidden: true },
  ],
  administrationNavigation: [
    { id: "curation", label: "Curadoria", href: "/administracao/curadoria", icon: ShieldCheck, tone: "blue", description: "Revisão de itens publicados" },
    { id: "users", label: "Usuários", href: "/administracao/usuarios", icon: Users, tone: "green", description: "Contas e perfis" },
  ],
  header: {
    logos: [
      { src: logoOrgao, alt: "Órgão (exemplo)", width: 132, height: 76 },
      { src: logoSetor, alt: "Setor (exemplo)", width: 76, height: 76 },
    ],
    searchPlaceholder: "Buscar na página",
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
