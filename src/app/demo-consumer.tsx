"use client";

import { Activity, ArrowRight, BadgeCheck, Bot, Brain, Copy, Droplets, Dumbbell, Ellipsis, Flame, FlaskConical, Footprints, Heart, IdCard, Mail, Moon, Navigation, Play, ShieldCheck, StretchHorizontal, User, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AppShell,
  BarChart,
  Button,
  Card,
  CardGrid,
  DataTable,
  DayStrip,
  GoalRow,
  InfoField,
  InfoPill,
  LinkCard,
  LinkCardMedia,
  MacroTile,
  MediaCard,
  MetricCard,
  MetricLine,
  PageFrame,
  PageGreeting,
  PanelCard,
  PanelGrid,
  ProgressBar,
  ProgressRing,
  RoundButton,
  SectionTitle,
  StatCard,
  StatValue,
  StatusBadge,
  Tag,
  WorkoutRow,
  type DataTableColumn,
} from "@/components/tema-mppa";
import { demoConfig, demoSession } from "./demo-config";

/* Telas de demonstração pintadas só com os primitivos exportados pela camada visual. */

/** Painel inicial, na estética da página de referência do Heimdall. Dados fictícios. */
function DemoDashboard() {
  const avisar = (texto: string) => window.alert(texto);
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <PageGreeting
        title="Olá, PESSOA!"
        badge={<StatusBadge pulse>Acesso Autorizado</StatusBadge>}
        description="Bem-vindo ao seu painel. Gerencie sua conta abaixo."
        aside={<InfoPill icon={ShieldCheck} title="Autenticação Unificada SSO" description="2 sistemas habilitados para seu perfil" />}
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
            <div className="grid min-w-0 flex-1 grid-cols-3 gap-3">
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

export function DemoConsumer() {
  const pathname = usePathname();
  return (
    <AppShell
      config={demoConfig}
      session={demoSession}
      onSignOut={() => window.alert("Conecte aqui a ação de saída do sistema consumidor.")}
    >
      {pathname === "/" ? <DemoDashboard /> : pathname === "/metas" ? <DemoMetas /> : <DemoDados />}
    </AppShell>
  );
}
