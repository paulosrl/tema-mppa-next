"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { TemaVarianteContext } from "./tema-variante";
import { ThemeProvider } from "./theme-provider";
import type { TemaVariant } from "./types";

/** Providers visuais. Não cria autenticação, BFF, endpoints ou regras de negócio. */
export function TemaMppaProvider({ children, queryClient, tema = "padrao" }: { children: ReactNode; queryClient?: QueryClient; tema?: TemaVariant }) {
  const [internalClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient ?? internalClient}>
      <TemaVarianteContext.Provider value={tema}>
        <ThemeProvider>{children}</ThemeProvider>
      </TemaVarianteContext.Provider>
    </QueryClientProvider>
  );
}
