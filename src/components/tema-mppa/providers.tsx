"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

/** Providers visuais. Não cria autenticação, BFF, endpoints ou regras de negócio. */
export function TemaMppaProvider({ children, queryClient }: { children: ReactNode; queryClient?: QueryClient }) {
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
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
