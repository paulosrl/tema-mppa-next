"use client";

import {
  AppShell,
  BarChart,
  Button,
  Card,
  CardGrid,
  DataTable,
  MetricCard,
  PageFrame,
  type DataTableColumn,
} from "@/components/tema-mppa";
import { demoConfig, demoSession } from "./demo-config";

/* Tela do protótipo pintada só com os primitivos exportados pela camada visual. */

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

export function DemoConsumer() {
  return (
    <AppShell
      config={demoConfig}
      session={demoSession}
      onSignOut={() => window.alert("Conecte aqui a ação de saída do sistema consumidor.")}
    >
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
    </AppShell>
  );
}
