"use client";

import { Activity, ArrowRight, BadgeCheck, Bot, Brain, Copy, Droplets, Dumbbell, Ellipsis, Filter, Flame, FlaskConical, Footprints, Heart, IdCard, LogOut, Mail, Moon, Navigation, Play, RotateCcw, ShieldCheck, StretchHorizontal, User, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  AppShell,
  BarChart,
  Button,
  Card,
  CardGrid,
  DataTable,
  DayStrip,
  FeaturedCard,
  FeaturedNote,
  GoalRow,
  InfoField,
  LinkCard,
  LinkCardMedia,
  MacroTile,
  MediaCard,
  MetricCard,
  MetricLine,
  OpeningCard,
  PageFrame,
  PanelCard,
  PanelGrid,
  ProgressBar,
  ProgressRing,
  RoundButton,
  SectionTitle,
  StatCard,
  StatValue,
  Tag,
  WorkoutRow,
  type DataTableColumn,
} from "@/components/tema-mppa";
import { demoConfig, demoSession } from "./demo-config";

/* Telas de demonstração pintadas só com os primitivos exportados pela camada visual. */

/* Marca d'água dos quadros de abertura (decorativa). O quadro de abertura fica só no primeiro item de cada aba: com a
   saudação em "Meus acessos" e sem ela em "Usuários & Papéis". */
const ciia = { src: "/ciia.png", alt: "", width: 244, height: 244 };

/* Logo do sistema, no centro do quadro de abertura da página inicial. Exemplo: o sistema passa a dele. */
const templateLogo = { src: "/template-logo.svg", alt: "Template", width: 360, height: 320 };

/** Painel inicial, na estética da página de referência do Heimdall. Dados fictícios. */
function DemoDashboard() {
  const avisar = (texto: string) => window.alert(texto);
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <OpeningCard
        badge="Minha Página · Template"
        badgeNote="CIIA · MPPA"
        greeting="Olá, José Hernandez!"
        description="Bem-vindo ao seu painel. Gerencie sua conta abaixo."
        watermark={ciia}
        logo={templateLogo}
      />

      <section>
        <SectionTitle live hint="Clique em um sistema para iniciar">
          Acessos a Sistemas
        </SectionTitle>
        <PanelGrid>
          <LinkCard
            kind="external"
            onClick={() => avisar("Abra aqui o sistema escolhido.")}
            media={<LinkCardMedia icon={Bot} />}
            title="HubIA"
            tag={<Tag>Oficial</Tag>}
            description="Ecossistema de IA do MPPA"
            footer={
              <>
                <MetricLine icon={Activity} value="35" label="acesso(s)" />
                <span className="font-mono text-[11px]">último em 11/11/2026</span>
              </>
            }
          />
          <LinkCard
            kind="external"
            accent="violet"
            onClick={() => avisar("Abra aqui o sistema escolhido.")}
            media={<LinkCardMedia icon={FlaskConical} />}
            title="HubIA (teste)"
            tag={<Tag tone="warning">Sandbox</Tag>}
            description="Ambiente de Homologação"
            footer={
              <>
                <MetricLine icon={Activity} value="4" label="acesso(s)" />
                <span className="font-mono text-[11px]">último em 11/11/2026</span>
              </>
            }
          />
        </PanelGrid>
      </section>

      <section>
        <SectionTitle tone="institutional">Ações rápidas</SectionTitle>
        <PanelGrid>
          <LinkCard href="/perfil" icon={User} tone="green" accent="green" title="Meu Perfil" description="Visualize e edite suas informações" />
          <LinkCard href="/sessoes" icon={ShieldCheck} tone="violet" accent="violet" title="Sessões Ativas" description="Gerencie onde você está conectado" />
        </PanelGrid>
      </section>

      <PanelCard title="Resumo da conta" icon={IdCard} aside={<Tag tone="neutral" mono>ID: MPPA-ADM</Tag>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoField
            icon={Mail}
            label="E-mail"
            value={demoSession.email}
            action={
              <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground" aria-label="Copiar e-mail" title="Copiar e-mail" onClick={() => navigator.clipboard?.writeText(demoSession.email)}>
                <Copy />
              </Button>
            }
          />
          <InfoField
            icon={BadgeCheck}
            tone="green"
            label="Verificação de e-mail"
            value={
              <span className="flex items-center gap-2">
                <span className="font-bold text-tone-green-foreground">Verificado</span>
                <Tag tone="success">Autenticado</Tag>
              </span>
            }
          />
        </div>
      </PanelCard>
    </div>
  );
}

type RecentItem = { id: string; item: string; area: string; updated: string; hits: number };

const activity = [
  { label: "Seg", value: 35 },
  { label: "Ter", value: 62 },
  { label: "Qua", value: 47 },
  { label: "Qui", value: 84 },
  { label: "Sex", value: 58 },
];

const columns: DataTableColumn<RecentItem>[] = [
  { key: "item", header: "Item", cell: (row) => row.item },
  { key: "area", header: "Área", cell: (row) => row.area },
  { key: "updated", header: "Atualizado", cell: (row) => row.updated },
  { key: "hits", header: "Acessos", cell: (row) => row.hits },
];

const rows: RecentItem[] = [{ id: "1", item: "Exemplo configurável", area: "Categoria", updated: "Hoje", hits: 12 }];

/** Página de dados: métricas, gráficos e tabela. */
function DemoDados() {
  return (
    <PageFrame
      description="Conteúdo demonstrativo. A moldura, a sessão e a navegação são fornecidas por propriedades."
      actions={
        <>
          <Button>Nova ação</Button>
          <Button variant="secondary">Ação secundária</Button>
        </>
      }
    >
      <CardGrid>
        <MetricCard label="Itens" value="24" note="Indicador fornecido pelo consumidor" />
        <MetricCard label="Categorias" value="6" note="Indicador fornecido pelo consumidor" />
      </CardGrid>
      <CardGrid>
        <Card title="Atividade recente" description="Substitua pelo componente de dados do sistema.">
          <BarChart data={activity} max={100} label="Atividade recente por dia" />
        </Card>
        <Card title="Distribuição por categoria" description="O template não consulta APIs nem contém regra de negócio.">
          <BarChart data={activity} max={100} variant="soft" label="Distribuição por categoria" />
        </Card>
      </CardGrid>
      <DataTable title="Itens recentes" columns={columns} rows={rows} rowKey={(row) => row.id} />
    </PageFrame>
  );
}

const semana = [
  { label: "Seg", day: "17" },
  { label: "Ter", day: "18" },
  { label: "Qua", day: "19" },
  { label: "Qui", day: "20" },
  { label: "Sex", day: "21" },
  { label: "Sáb", day: "22" },
  { label: "Dom", day: "23" },
];

/** Painel de metas, na composição do Moveflux: capa, cartões de métrica, metas, treinos e nutrição. Dados fictícios. */
function DemoMetas() {
  const [dia, setDia] = useState(0);
  const menu = (
    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" aria-label="Mais opções">
      <Ellipsis />
    </Button>
  );
  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-6">
        <MediaCard
          title={
            <>
              Painel de metas
              <br />
              do dia
            </>
          }
          subtitle="Cartões suaves, degradês vivos."
          action={<RoundButton icon={Play} label="Iniciar o treino" onClick={() => window.alert("Conecte aqui a ação do sistema.")} />}
        />
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Batimentos" icon={Heart} tone="pink">
            <div className="mt-4 flex items-center justify-center">
              <ProgressRing value="120" unit="bpm" label="Batimentos: 120 bpm" />
            </div>
          </StatCard>
          <StatCard label="Distância" icon={Navigation} tone="blue">
            <StatValue value="3,37" unit="km" />
            <div className="mt-auto pt-4">
              <Button size="sm">
                Em andamento
                <ArrowRight />
              </Button>
            </div>
          </StatCard>
          <StatCard label="Sono" icon={Moon} tone="violet">
            <StatValue value="7h 32m" />
            <ProgressBar className="mt-3" value={89} tone="violet" label="Qualidade do sono" />
            <p className="m-0 mt-2 text-xs text-muted-foreground">Qualidade: 89%</p>
          </StatCard>
          <StatCard label="Ativo" icon={Zap} tone="amber">
            <StatValue value="58" unit="min" />
            <div className="mt-3 flex items-center gap-2">
              <ProgressBar className="flex-1" value={97} tone="yellow" label="Meta de minutos ativos" />
              <p className="m-0 text-xs font-medium text-muted-foreground">97%</p>
            </div>
            <p className="m-0 mt-2 text-xs text-muted-foreground">Meta: 60 min</p>
          </StatCard>
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-6">
        <Card title="Resumo da semana" description="Seg 17 — Dom 23" actions={menu}>
          <DayStrip className="mt-5" days={semana} selected={dia} onSelect={setDia} />
          <div className="mt-5 flex flex-col gap-3">
            <GoalRow icon={Footprints} tone="amber" title="Passos" status="Concluída" percent={100} caption="22.000 / 22.000" />
            <GoalRow icon={Flame} tone="rose" title="Calorias" status="Em andamento" percent={85} caption="1.420 / 1.680 kcal" />
            <GoalRow icon={Droplets} tone="blue" title="Água" status="Em andamento" percent={73} caption="2,2 / 3 L" />
            <GoalRow icon={Brain} tone="emerald" title="Meditação" status="Pendente" percent={0} caption="0 / 15 min" />
          </div>
        </Card>
        <Card title="Treinos do dia" description="3 sessões previstas" actions={menu}>
          <div className="mt-5 flex flex-col gap-3">
            <WorkoutRow done icon={Dumbbell} title="Corrida leve" description="6h30 • 45 min" status="Concluída" />
            <WorkoutRow icon={Dumbbell} tone="orange" title="Treino de força" description="14h00 • 60 min" status="Próximo" statusTone="warning" />
            <WorkoutRow icon={StretchHorizontal} tone="violet" title="Alongamento" description="19h30 • 20 min" status="Pendente" />
          </div>
        </Card>
        <Card title="Nutrição" description="Calorias e macronutrientes">
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <ProgressRing tone="balance" thick value="1.420" unit="kcal" label="Calorias: 1.420 kcal" />
            <div className="grid min-w-0 grow basis-72 grid-cols-[repeat(auto-fit,minmax(6.5rem,1fr))] gap-3">
              <MacroTile tone="red" label="Carboidratos" value="178 g" percent={65} />
              <MacroTile tone="blue" label="Proteínas" value="92 g" percent={80} />
              <MacroTile tone="amber" label="Gorduras" value="38 g" percent={45} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* Quadros em destaque (featured.tsx), com dados fictícios. */

/** Perfil: só a barra azul (retângulo em destaque), sem saudação, e os dados. */
function DemoPerfil() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <FeaturedNote>Confira seus dados cadastrais e mantenha o e-mail em dia.</FeaturedNote>
      <PanelCard title="Dados cadastrais" icon={IdCard}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoField icon={User} label="Nome" value={demoSession.name} />
          <InfoField icon={Mail} label="E-mail" value={demoSession.email} />
        </div>
      </PanelCard>
    </div>
  );
}

type DemoSession = { id: string; device: string; place: string; last: string };
const sessionColumns: DataTableColumn<DemoSession>[] = [
  { key: "device", header: "Dispositivo", cell: (row) => row.device },
  { key: "place", header: "Local", cell: (row) => row.place },
  { key: "last", header: "Último acesso", cell: (row) => row.last },
];
const sessionRows: DemoSession[] = [
  { id: "1", device: "Navegador no computador", place: "Belém", last: "Hoje, 9h12" },
  { id: "2", device: "Navegador no celular", place: "Belém", last: "Ontem, 18h40" },
];

/** Sessões: quadro sem marca d'água, com título, indicador e o botão dentro, à direita. */
function DemoSessoes() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <FeaturedCard
        title="Sessões ativas"
        actions={
          <Button variant="destructive" size="sm" onClick={() => window.alert("Conecte aqui a ação do sistema.")}>
            <LogOut />
            Encerrar as outras
          </Button>
        }
      >
        <p className="m-0 text-base text-foreground">
          <strong className="font-semibold">2</strong> dispositivos conectados de <strong className="font-semibold">5</strong> permitidos
        </p>
      </FeaturedCard>
      <DataTable title="Dispositivos" columns={sessionColumns} rows={sessionRows} rowKey={(row) => row.id} />
    </div>
  );
}

type Perfil = "todos" | "admin" | "usuario";
type DemoUser = { id: string; name: string; email: string; admin: boolean };
const perfis: { id: Perfil; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "admin", label: "Administradores" },
  { id: "usuario", label: "Usuários" },
];
const userColumns: DataTableColumn<DemoUser>[] = [
  { key: "name", header: "Nome", cell: (row) => row.name },
  { key: "email", header: "E-mail", cell: (row) => row.email },
  { key: "profile", header: "Perfil", cell: (row) => <Tag tone={row.admin ? "primary" : "neutral"}>{row.admin ? "Administrador" : "Usuário"}</Tag> },
];
const userRows: DemoUser[] = [
  { id: "1", name: "Pessoa Lima", email: "pessoa@exemplo.local", admin: true },
  { id: "2", name: "Pessoa Souza", email: "souza@exemplo.local", admin: false },
  { id: "3", name: "Pessoa Rocha", email: "rocha@exemplo.local", admin: false },
];

/** Usuários & Papéis, primeiro item da Administração: quadro de abertura sem saudação e filtro com Filtrar e Limpar dentro, à direita. */
function DemoUsuarios() {
  const [perfil, setPerfil] = useState<Perfil>("todos");
  const [aplicado, setAplicado] = useState<Perfil>("todos");
  const filtrar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAplicado(perfil);
  };
  const limpar = () => {
    setPerfil("todos");
    setAplicado("todos");
  };
  const linhas = userRows.filter((row) => aplicado === "todos" || row.admin === (aplicado === "admin"));
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <OpeningCard
        badge="Administração do Template"
        badgeNote="CIIA · MPPA"
        description="Acompanhe os sistemas integrados e gerencie usuários, perfis e registros de acesso."
        watermark={ciia}
      />
      <FeaturedCard
        onSubmit={filtrar}
        actions={
          <>
            <Button type="submit">
              <Filter />
              Filtrar
            </Button>
            <Button variant="secondary" onClick={limpar}>
              <RotateCcw />
              Limpar
            </Button>
          </>
        }
      >
        {perfis.map(({ id, label }) => (
          <Button key={id} size="sm" variant={perfil === id ? "default" : "secondary"} aria-pressed={perfil === id} onClick={() => setPerfil(id)}>
            {label}
          </Button>
        ))}
      </FeaturedCard>
      <DataTable title="Usuários" columns={userColumns} rows={linhas} rowKey={(row) => row.id} emptyMessage="Nenhum usuário para o filtro escolhido." />
    </div>
  );
}

type DemoSystem = { id: string; name: string; environment: string; active: boolean; users: number };
const systemColumns: DataTableColumn<DemoSystem>[] = [
  { key: "name", header: "Sistema", cell: (row) => row.name },
  { key: "environment", header: "Ambiente", cell: (row) => row.environment },
  { key: "status", header: "Situação", cell: (row) => <Tag tone={row.active ? "success" : "neutral"}>{row.active ? "Ativo" : "Suspenso"}</Tag> },
  { key: "users", header: "Usuários", cell: (row) => row.users, align: "right" },
];
const systemRows: DemoSystem[] = [
  { id: "1", name: "HubIA", environment: "Produção", active: true, users: 35 },
  { id: "2", name: "HubIA (teste)", environment: "Homologação", active: true, users: 4 },
  { id: "3", name: "Sistema legado", environment: "Produção", active: false, users: 0 },
];

/** Sistemas Integrados: retângulo em destaque, indicadores e o catálogo de sistemas. */
function DemoSistemas() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <FeaturedNote>Catálogo dos sistemas integrados ao portal e de quem pode acessá-los.</FeaturedNote>
      <CardGrid columns={3}>
        <MetricCard label="Sistemas" value="3" note="2 ativos" />
        <MetricCard label="Usuários com acesso" value="39" note="Em todos os sistemas" />
        <MetricCard label="Ambientes" value="2" note="Produção e homologação" />
      </CardGrid>
      <DataTable
        title="Sistemas"
        actions={<Button size="sm" onClick={() => window.alert("Conecte aqui a ação do sistema.")}>Novo sistema</Button>}
        columns={systemColumns}
        rows={systemRows}
        rowKey={(row) => row.id}
      />
    </div>
  );
}

type Periodo = "hoje" | "7dias" | "30dias";
type DemoEvent = { id: string; when: string; user: string; event: string; ok: boolean; periodo: Periodo };
const periodos: { id: Periodo; label: string }[] = [
  { id: "hoje", label: "Hoje" },
  { id: "7dias", label: "7 dias" },
  { id: "30dias", label: "30 dias" },
];
const eventColumns: DataTableColumn<DemoEvent>[] = [
  { key: "when", header: "Quando", cell: (row) => row.when },
  { key: "user", header: "Usuário", cell: (row) => row.user },
  { key: "event", header: "Evento", cell: (row) => row.event },
  { key: "result", header: "Resultado", cell: (row) => <Tag tone={row.ok ? "success" : "warning"}>{row.ok ? "Sucesso" : "Falha"}</Tag> },
];
const eventRows: DemoEvent[] = [
  { id: "1", when: "Hoje, 9h12", user: "pessoa@exemplo.local", event: "Entrada no HubIA", ok: true, periodo: "hoje" },
  { id: "2", when: "Hoje, 8h47", user: "souza@exemplo.local", event: "Senha incorreta", ok: false, periodo: "hoje" },
  { id: "3", when: "20/11/2026, 17h05", user: "rocha@exemplo.local", event: "Perfil alterado", ok: true, periodo: "7dias" },
  { id: "4", when: "02/11/2026, 10h30", user: "pessoa@exemplo.local", event: "Sessão encerrada", ok: true, periodo: "30dias" },
];
const ordemDoPeriodo: Record<Periodo, number> = { hoje: 0, "7dias": 1, "30dias": 2 };

/** Auditoria & Segurança: retângulo em destaque, filtro de período com Filtrar e Limpar e os registros de acesso. */
function DemoAuditoria() {
  const [periodo, setPeriodo] = useState<Periodo>("30dias");
  const [aplicado, setAplicado] = useState<Periodo>("30dias");
  const filtrar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAplicado(periodo);
  };
  const limpar = () => {
    setPeriodo("30dias");
    setAplicado("30dias");
  };
  const linhas = eventRows.filter((row) => ordemDoPeriodo[row.periodo] <= ordemDoPeriodo[aplicado]);
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <FeaturedNote>Registros de acesso e eventos de segurança de todos os sistemas.</FeaturedNote>
      <FeaturedCard
        onSubmit={filtrar}
        actions={
          <>
            <Button type="submit">
              <Filter />
              Filtrar
            </Button>
            <Button variant="secondary" onClick={limpar}>
              <RotateCcw />
              Limpar
            </Button>
          </>
        }
      >
        {periodos.map(({ id, label }) => (
          <Button key={id} size="sm" variant={periodo === id ? "default" : "secondary"} aria-pressed={periodo === id} onClick={() => setPeriodo(id)}>
            {label}
          </Button>
        ))}
      </FeaturedCard>
      <DataTable title="Registros" columns={eventColumns} rows={linhas} rowKey={(row) => row.id} emptyMessage="Nenhum registro no período escolhido." />
    </div>
  );
}

/** Manual e Tutorial (subgrupo "Apoio"): conteúdo em elaboração. */
function DemoApoio({ assunto }: { assunto: string }) {
  return (
    <PageFrame description={`${assunto} do sistema.`}>
      <Card title="Conteúdo em elaboração" />
    </PageFrame>
  );
}

export function DemoConsumer() {
  const pathname = usePathname();
  return (
    <AppShell
      config={demoConfig}
      session={demoSession}
      onSignOut={() => window.alert("Conecte aqui a ação de saída do sistema consumidor.")}
    >
      {pathname === "/" ? (
        <DemoDashboard />
      ) : pathname === "/metas" ? (
        <DemoMetas />
      ) : pathname === "/perfil" ? (
        <DemoPerfil />
      ) : pathname === "/sessoes" ? (
        <DemoSessoes />
      ) : pathname === "/administracao/usuarios" ? (
        <DemoUsuarios />
      ) : pathname === "/administracao/sistemas" ? (
        <DemoSistemas />
      ) : pathname === "/administracao/auditoria" ? (
        <DemoAuditoria />
      ) : pathname === "/manual" ? (
        <DemoApoio assunto="Manual" />
      ) : pathname === "/tutorial" ? (
        <DemoApoio assunto="Tutorial" />
      ) : (
        <DemoDados />
      )}
    </AppShell>
  );
}
