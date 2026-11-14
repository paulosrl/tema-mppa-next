"use client";

import { Activity, BadgeCheck, Bot, Copy, FlaskConical, IdCard, Mail, ShieldCheck, User } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  AppShell,
  BarChart,
  Button,
  Card,
  CardGrid,
  DataTable,
  InfoField,
  InfoPill,
  LinkCard,
  LinkCardMedia,
  MetricCard,
  MetricLine,
  PageFrame,
  PageGreeting,
  PanelCard,
  PanelGrid,
  SectionTitle,
  StatusBadge,
  Tag,
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

export function DemoConsumer() {
  const pathname = usePathname();
  return (
    <AppShell
      config={demoConfig}
      session={demoSession}
      onSignOut={() => window.alert("Conecte aqui a ação de saída do sistema consumidor.")}
    >
      {pathname === "/" ? <DemoDashboard /> : <DemoDados />}
    </AppShell>
  );
}
