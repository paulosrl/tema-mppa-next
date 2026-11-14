import type { Key, ReactNode } from "react";
import { Card } from "./card";
import { cn } from "./utils";

export type DataTableColumn<Row> = {
  key: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
};

const alignClass = { left: "text-left", right: "text-right", center: "text-center" } as const;

/**
 * Tabela do protótipo dentro de um cartão sem padding: título com borda inferior, cabeçalho em
 * texto secundário e linhas com borda. Rola na horizontal dentro do cartão, nunca a página.
 */
export function DataTable<Row>({
  title,
  actions,
  columns,
  rows,
  rowKey,
  emptyMessage = "Nenhum registro.",
  caption,
  className,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row, index: number) => Key;
  emptyMessage?: ReactNode;
  /** Legenda para leitores de tela; por padrão, o título. */
  caption?: string;
  className?: string;
}) {
  return (
    <Card padded={false} className={cn("overflow-hidden", className)}>
      {title || actions ? (
        <div className="flex items-center justify-between gap-3 border-b border-card-border px-6 py-4">
          {title ? <h2 className="tm-card-title m-0 text-base font-bold tracking-tight">{title}</h2> : <span />}
          {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          {caption || typeof title === "string" ? <caption className="sr-only">{caption ?? (title as string)}</caption> : null}
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn("tm-label border-b border-card-border px-4 py-3 text-[11px] font-bold tracking-wider whitespace-nowrap text-muted-foreground uppercase", alignClass[column.align ?? "left"], column.className)}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, index) => (
                <tr key={rowKey(row, index)}>
                  {columns.map((column) => (
                    <td key={column.key} className={cn("border-b border-card-border px-4 py-3", alignClass[column.align ?? "left"], column.className)}>
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="border-b border-card-border px-4 py-6 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
