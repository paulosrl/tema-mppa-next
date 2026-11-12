import { cn } from "./utils";

export type BarChartDatum = { label: string; value: number };

/**
 * Gráfico de barras do protótipo: 165px de altura, barras com degradê, topo arredondado (6px),
 * no máximo 90px de largura e 18px de altura mínima. `strong` é o azul de ação; `soft`, o azul claro.
 */
export function BarChart({
  data,
  max,
  variant = "strong",
  label,
  className,
}: {
  data: BarChartDatum[];
  /** Valor que ocupa a altura toda; por padrão, o maior valor. */
  max?: number;
  variant?: "strong" | "soft";
  /** Descrição do gráfico para leitores de tela. */
  label: string;
  className?: string;
}) {
  const top = max ?? Math.max(1, ...data.map((datum) => datum.value));
  const summary = data.map((datum) => `${datum.label}: ${datum.value}`).join("; ");
  return (
    <div role="img" aria-label={`${label}. ${summary}`} className={cn("mt-[18px] flex h-[165px] items-end gap-3.5", className)}>
      {data.map((datum) => (
        <span
          key={datum.label}
          title={`${datum.label}: ${datum.value}`}
          className={cn("tm-bar min-h-[18px] max-w-[90px] flex-1", variant === "soft" ? "tm-bar-soft" : "tm-bar-strong")}
          style={{ height: `${Math.min(100, Math.max(0, (datum.value / top) * 100))}%` }}
        />
      ))}
    </div>
  );
}
