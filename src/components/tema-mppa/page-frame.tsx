import type { ReactNode } from "react";
import { cn } from "./utils";

/**
 * Moldura da página, como o `.lead` do protótipo: descrição à esquerda, ações à direita (largura
 * total no celular) e 38px até o conteúdo, com 20px entre os blocos.
 *
 * O título não entra aqui: ele aparece uma única vez, no cabeçalho, vindo do item de navegação
 * marcado (use `hidden` para páginas fora do menu).
 */
export function PageFrame({
  description,
  actions,
  children,
  className,
}: {
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      {description || actions ? (
        <div className="mb-[38px] flex flex-wrap items-start justify-between gap-4">
          {description ? <p className="m-0 text-muted-foreground">{description}</p> : null}
          {actions ? (
            <div className="flex w-full gap-2 *:flex-1 desk:w-auto desk:*:flex-none">{actions}</div>
          ) : null}
        </div>
      ) : null}
      {children ? <div className="flex min-w-0 flex-col gap-5">{children}</div> : null}
    </div>
  );
}
