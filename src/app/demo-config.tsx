import { FileText, LayoutDashboard, Monitor, ShieldAlert, ShieldCheck, ShieldHalf, Target, User, Users } from "lucide-react";
import type { ShellConfig, ShellSession } from "@/components/tema-mppa";
import packageJson from "../../package.json";

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
    version: packageJson.version,
    versionYears: "2026",
    tagline: "Portal de Sistemas MPPA",
    homeHref: "/",
    symbol,
  },
  platformLabel: "Minha Página",
  administrationLabel: "Administração",
  platformNavigation: [
    { id: "dashboard", label: "Meus acessos", href: "/", icon: LayoutDashboard, exact: true, tone: "red", description: "Sistemas autorizados e ações rápidas" },
    { id: "goals", label: "Painel de metas", href: "/metas", icon: Target, tone: "amber", description: "Metas do dia, anéis e treinos" },
    { id: "profile", label: "Perfil", href: "/perfil", icon: User, tone: "green", description: "Informações cadastrais" },
    { id: "sessions", label: "Sessões", href: "/sessoes", icon: ShieldAlert, tone: "violet", badge: "Ativa", description: "Sessões ativas e dispositivos" },
    { id: "item-detail", label: "Detalhe do item", href: "/itens/detalhe", icon: FileText, tone: "green", hidden: true },
  ],
  /* Subgrupo "Apoio" (Manual e Tutorial), posto pela camada em "Minha Página": o sistema só dá os endereços. */
  support: { manualHref: "/manual", tutorialHref: "/tutorial" },
  administrationNavigation: [
    { id: "users", label: "Usuários & Papéis", href: "/administracao/usuarios", icon: Users, tone: "blue", description: "Contas e perfis" },
    { id: "systems", label: "Sistemas Integrados", href: "/administracao/sistemas", icon: Monitor, tone: "red", description: "Catálogo de sistemas" },
    { id: "audit", label: "Auditoria & Segurança", href: "/administracao/auditoria", icon: ShieldCheck, tone: "violet", description: "Registros de acesso" },
  ],
  header: {
    /* As três logos padrão dos sistemas (REPLICAR, 4.5), nesta ordem; os arquivos vão na pasta entregue, em public/. */
    logos: [
      { src: "/mppa-logo.png", alt: "MPPA", width: 132, height: 76, href: "https://www.mppa.mp.br/" },
      { src: "/ciia.png", alt: "CIIA", width: 244, height: 244, href: "https://ciia.mppa.mp.br/" },
      // A sigla repete a CIIA: decorativa, com alt vazio, para o leitor de tela não ler "CIIA, CIIA".
      { src: "/ciia-sigla.svg", alt: "", width: 132, height: 76, href: "https://ciia.mppa.mp.br/" },
    ],
    /* Volta ao painel principal (o Heimdall, nos sistemas). Na demonstração, a página inicial. */
    backLink: { href: "/", label: "Voltar ao painel principal" },
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
