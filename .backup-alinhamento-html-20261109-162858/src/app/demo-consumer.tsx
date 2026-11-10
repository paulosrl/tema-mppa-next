"use client";

import { ArrowRight, BarChart3, FilePlus2, Plus, Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import { AppShell, Button, PageFrame } from "@/components/tema-mppa";
import { demoConfig, demoSession } from "./demo-config";

function titleForPath(pathname: string) {
  const items = [...demoConfig.platformNavigation, ...(demoConfig.administrationNavigation ?? [])];
  return items.find((item) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`)))
    ?? demoConfig.platformNavigation[0];
}

function MetricCard({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Tag }) {
  return (
    <article className="rounded-lg border bg-card p-4 text-card-foreground shadow-[0_1px_3px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.04)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-primary">{label}</p>
        <Icon className="size-4 text-muted-foreground" aria-hidden />
      </div>
      <p className="mt-4 text-3xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </article>
  );
}

function Bars({ red = false }: { red?: boolean }) {
  const values = [35, 62, 47, 84, 58];
  return (
    <div className="mt-6 flex h-32 items-end gap-3" aria-label="Gráfico ilustrativo">
      {values.map((value, index) => (
        <span key={index} className={red ? "flex-1 bg-primary" : "flex-1 bg-chart-1"} style={{ height: `${value}%` }} />
      ))}
    </div>
  );
}

export function DemoConsumer() {
  const pathname = usePathname();
  const current = titleForPath(pathname);

  return (
    <AppShell
      config={demoConfig}
      session={demoSession}
      onSignOut={() => window.alert("Conecte aqui a ação de saída do sistema consumidor.")}
    >
      <PageFrame
        title={current.label}
        description="Conteúdo demonstrativo. A moldura, a sessão e a navegação são fornecidas por propriedades."
        icon={current.icon}
        tone={current.tone}
        actions={
          <>
            <Button><FilePlus2 />Nova ação</Button>
            <Button variant="outline"><Plus />Ação secundária</Button>
          </>
        }
      >
        <section className="grid gap-3 sm:grid-cols-2">
          <MetricCard label="Itens" value="24" note="Indicador fornecido pelo consumidor" icon={FilePlus2} />
          <MetricCard label="Categorias" value="6" note="Indicador fornecido pelo consumidor" icon={Tag} />
        </section>
        <section className="grid gap-3 xl:grid-cols-2">
          <article className="rounded-lg border bg-card p-5 text-card-foreground shadow-[0_1px_3px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.04)]">
            <div className="flex items-center gap-2"><BarChart3 className="size-4 text-primary" /><h2 className="font-semibold">Atividade recente</h2></div>
            <p className="mt-1 text-xs text-muted-foreground">Substitua pelo componente de dados do sistema.</p>
            <Bars red />
          </article>
          <article className="rounded-lg border bg-card p-5 text-card-foreground shadow-[0_1px_3px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.04)]">
            <div className="flex items-center gap-2"><BarChart3 className="size-4 text-chart-1" /><h2 className="font-semibold">Distribuição por categoria</h2></div>
            <p className="mt-1 text-xs text-muted-foreground">O template não consulta APIs nem contém regra de negócio.</p>
            <Bars />
          </article>
        </section>
        <section className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-[0_1px_3px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.04)]">
          <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
            <div><h2 className="font-semibold">Itens recentes</h2><p className="text-xs text-muted-foreground">Tabela demonstrativa</p></div>
            <Button variant="ghost" size="sm">Ver todos <ArrowRight /></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-muted/50 text-xs text-muted-foreground"><tr><th className="px-5 py-3 font-medium">Item</th><th className="px-5 py-3 font-medium">Área</th><th className="px-5 py-3 font-medium">Atualizado</th><th className="px-5 py-3 text-right font-medium">Acessos</th></tr></thead>
              <tbody><tr className="border-t"><td className="px-5 py-4 font-medium">Exemplo configurável</td><td className="px-5 py-4">Categoria</td><td className="px-5 py-4">Hoje</td><td className="px-5 py-4 text-right tabular-nums">12</td></tr></tbody>
            </table>
          </div>
        </section>
      </PageFrame>
    </AppShell>
  );
}
