import { FileText, LayoutDashboard, Monitor, ShieldAlert, ShieldCheck, ShieldHalf, User, Users } from "lucide-react";
import type { ShellConfig, ShellSession } from "@/components/tema-mppa";

/* Logos genéricas de exemplo (SVG embutido); o consumidor passa as logos institucionais reais. */
const svg = (markup: string) => `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
const logoOrgao = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="132" height="76" viewBox="0 0 132 76"><rect width="132" height="76" fill="#fff"/><text x="66" y="44" font-family="Arial" font-size="30" font-weight="700" fill="#9f0712" text-anchor="middle">ÓRGÃO</text><text x="66" y="62" font-family="Arial" font-size="11" fill="#18181b" text-anchor="middle">logo de exemplo</text></svg>',
);

/* Símbolo de exemplo: escudo em moldura com degradê, só com tokens. O consumidor passa a imagem dele. */
const symbol = (
  <span className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-institutional to-primary p-px shadow-md" aria-hidden>
    <span className="flex size-full items-center justify-center rounded-[11px] bg-foreground text-background">
      <ShieldHalf className="size-5 fill-current/20" strokeWidth={2} />
    </span>
  </span>
);

/**
 * Exemplo substituível, na estética da página de referência do Heimdall (12 nov. 2026). Todos os nomes,
 * rotas e itens chegam ao shell por configuração.
 */
export const demoConfig: ShellConfig = {
  brand: {
    name: "Template",
    version: "1.10.1",
    versionYears: "2026",
    tagline: "Portal de Sistemas MPPA",
    homeHref: "/",
    symbol,
  },
  platformLabel: "Plataforma",
  administrationLabel: "Administração",
  platformNavigation: [
    { id: "dashboard", label: "Dashboard", href: "/", icon: LayoutDashboard, exact: true, tone: "red", description: "Sistemas autorizados e ações rápidas" },
    { id: "profile", label: "Perfil", href: "/perfil", icon: User, tone: "green", description: "Informações cadastrais" },
    { id: "sessions", label: "Sessões", href: "/sessoes", icon: ShieldAlert, tone: "violet", badge: "Ativa", description: "Sessões ativas e dispositivos" },
    { id: "item-detail", label: "Detalhe do item", href: "/itens/detalhe", icon: FileText, tone: "green", hidden: true },
  ],
  administrationNavigation: [
    { id: "users", label: "Usuários & Papéis", href: "/administracao/usuarios", icon: Users, tone: "blue", description: "Contas e perfis" },
    { id: "systems", label: "Sistemas Integrados", href: "/administracao/sistemas", icon: Monitor, tone: "red", description: "Catálogo de sistemas" },
    { id: "audit", label: "Auditoria & Segurança", href: "/administracao/auditoria", icon: ShieldCheck, tone: "violet", description: "Registros de acesso" },
  ],
  header: {
    logos: [
      { src: logoOrgao, alt: "Órgão (exemplo)", width: 132, height: 76 },
      { src: "/ciia.png", alt: "CIIA", width: 244, height: 244 },
    ],
    searchPlaceholder: "Ir para…",
    signOutLabel: "Sair",
  },
  sidebarShortcutLabel: "Recolher menu",
};

/** Demonstração apenas; o sistema consumidor fornece a sessão real. */
export const demoSession: ShellSession = {
  user_id: "demo-user",
  name: "Pessoa Lima",
  email: "pessoa@exemplo.local",
  profileLabel: "Administrador",
  is_admin: true,
};
