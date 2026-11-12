import { FileText, LayoutDashboard, Monitor, ShieldAlert, ShieldCheck, ShieldHalf, User, Users } from "lucide-react";
import type { ShellConfig, ShellSession } from "@/components/tema-mppa";

/* Logos de exemplo: MPPA e CIIA (em public/) e a palavra CIIA em SVG embutido; o consumidor passa as dele. */
const svg = (markup: string) => `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
const logoCiia = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="132" height="76" viewBox="0 0 132 76"><rect width="132" height="76" fill="#fff"/><text x="66" y="55" font-family="Arial" font-size="46" font-weight="700" fill="#1a237e" text-anchor="middle">CIIA</text></svg>',
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
    version: "1.11.0",
    versionYears: "2026",
    tagline: "Portal de Sistemas MPPA",
    homeHref: "/",
    symbol,
  },
  platformLabel: "Minha Página",
  administrationLabel: "Administração",
  platformNavigation: [
    { id: "dashboard", label: "Meus acessos", href: "/", icon: LayoutDashboard, exact: true, tone: "red", description: "Sistemas autorizados e ações rápidas" },
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
      { src: "/mppa-logo.png", alt: "MPPA", width: 132, height: 76 },
      { src: "/ciia.png", alt: "CIIA", width: 244, height: 244 },
      { src: logoCiia, alt: "CIIA", width: 132, height: 76 },
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
