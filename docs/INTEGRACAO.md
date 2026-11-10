# Integração sem substituir regras do consumidor

## 1. Obtenha a sessão como o sistema já faz

Continue usando o hook, Server Component, BFF ou provider existente. Só adapte o resultado para `ShellSession`.

## 2. Renderize a moldura no layout autenticado

```tsx
"use client";

import { AppShell } from "@/components/tema-mppa";
import { shellConfig } from "@/config/shell";
import { useSessionDoMeuSistema } from "@/auth/use-session";

export function LayoutAutenticado({ children }: { children: React.ReactNode }) {
  const { data } = useSessionDoMeuSistema();

  if (!data) return null; // preserve aqui o loading/erro atual do consumidor

  return (
    <AppShell
      config={shellConfig}
      session={{
        user_id: data.user_id,
        name: data.nome,
        email: data.email,
        profileLabel: data.perfil,
        is_admin: data.is_admin === true,
      }}
      onSignOut={() => {
        // chame a rotina de logout já existente
      }}
    >
      {children}
    </AppShell>
  );
}
```

## 3. Preserve a proteção administrativa

O shell esconde a aba para não administradores, mas não bloqueia URL. Mantenha o controle atual do consumidor no servidor, no BFF e/ou no backend.

## 4. Preserve o fluxo de erro

Loading, sessão expirada, 401, 403, indisponibilidade e retry continuam no layout ou provider do consumidor. O template não redireciona e não limpa cookies.

## 5. Preserve chamadas de dados

TanStack Query está disponível no provider, mas o template não define `queryKey`, endpoint, mutation ou invalidação. Reaproveite a camada de dados existente.

## 6. Substitua a demonstração

Os arquivos `src/app/demo-config.tsx` e `src/app/demo-consumer.tsx` servem somente para visualizar o template. Em uma integração real, remova-os junto com `src/app/[[...slug]]/`.
