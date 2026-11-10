# Configuração

O shell não contém nomes, rotas, imagens nem sessão fixos. Tudo entra em `ShellConfig` e `ShellSession`.

## Configuração mínima

```tsx
import { Gauge, Settings, Wrench } from "lucide-react";
import type { ShellConfig } from "@/components/tema-mppa";

export const shellConfig: ShellConfig = {
  brand: {
    name: "Meu sistema",
    version: "2.4.0",
    tagline: "Descrição curta",
    homeHref: "/painel",
    symbol: { src: "/marca/simbolo.svg", alt: "Meu sistema" },
  },
  platformNavigation: [
    { id: "inicio", label: "Visão geral", href: "/painel", icon: Gauge, exact: true },
    { id: "tarefas", label: "Tarefas", href: "/painel/tarefas", icon: Wrench },
  ],
  administrationNavigation: [
    { id: "config", label: "Configurações", href: "/painel/admin/config", icon: Settings },
  ],
  header: {
    logos: [
      { src: "/marca/orgao.svg", alt: "Órgão", width: 120, height: 32 },
    ],
    searchPlaceholder: "Buscar ou executar…",
    signOutLabel: "Sair",
  },
};
```

`symbol` também aceita um elemento React, por exemplo um ícone Lucide. Nenhuma imagem é obrigatória. Um `src` vazio ou uma carga com erro faz o elemento desaparecer.

## Sessão

Adapte o objeto já obtido pelo sistema consumidor:

```tsx
const shellSession = {
  user_id: sessao.id,
  name: sessao.nome,
  email: sessao.email,
  profileLabel: sessao.rotuloPerfil,
  avatar: sessao.avatarUrl
    ? { src: sessao.avatarUrl, alt: `Foto de ${sessao.nome}` }
    : null,
  is_admin: sessao.is_admin === true,
};
```

A chave decisiva é `is_admin`. O template não infere administrador a partir de `role`, e-mail ou texto do perfil.

## Regra das abas

- `is_admin: false`: mostra apenas o grupo Plataforma, sem abas e sem itens administrativos.
- `is_admin: true`: mostra as abas Plataforma e Administração.
- Ao entrar numa rota presente em `administrationNavigation`, a aba Administração abre automaticamente.

Essa regra é apenas de apresentação. Mantenha a autorização real de rota e de API no consumidor.

## Cores por item

Use classes semânticas em `tone`:

```tsx
{
  tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
}
```

Se `tone` não for informado, o ícone usa `primary` do tema Marvel.

## Busca

As rotas configuradas entram automaticamente na busca `Ctrl+K`. Itens extras podem ser fornecidos em `searchItems`. O template não chama API; resultados remotos continuam sob responsabilidade do consumidor.
