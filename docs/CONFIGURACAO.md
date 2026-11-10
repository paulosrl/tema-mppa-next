# Configuração

O shell não contém nomes, rotas, imagens nem sessão fixos. Tudo entra em `ShellConfig`, `ShellSession` e
nas propriedades do `AppShell`.

## Configuração mínima

```tsx
import { FileText, Gauge, Settings, Wrench } from "lucide-react";
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
    { id: "inicio", label: "Visão geral", href: "/painel", icon: Gauge, exact: true, tone: "red" },
    {
      id: "tarefas",
      label: "Tarefas",
      href: "/painel/tarefas",
      icon: Wrench,
      tone: "green",
      description: "Fila de trabalho da equipe",
      matches: ["/painel/fila"],
    },
    { id: "tarefa", label: "Detalhe da tarefa", href: "/painel/tarefas/detalhe", icon: FileText, tone: "green", hidden: true },
  ],
  administrationNavigation: [
    { id: "config", label: "Configurações", href: "/painel/admin/config", icon: Settings, tone: "violet" },
  ],
  header: {
    logos: [{ src: "/marca/orgao.svg", alt: "Órgão", width: 120, height: 32 }],
    searchPlaceholder: "Buscar ou executar…",
    signOutLabel: "Sair",
  },
};
```

`symbol` também aceita um elemento React. Sem imagem própria, use o símbolo do protótipo:
`<span className="tm-brand-mark" aria-hidden>M</span>`. Nenhuma imagem é obrigatória: um `src` vazio ou uma
carga com erro faz o elemento desaparecer.

## Itens de navegação

| Campo | Efeito |
| --- | --- |
| `exact` | Só a rota exata marca o item; sem ele, as sub-rotas também marcam. |
| `tone` | Cor do ícone de seção: `"red"` (padrão), `"green"`, `"violet"` ou `"orange"`. Uma string fora da lista é tratada como classes, como na 1.0.0, mas use os tons para manter o contraste. |
| `description` | Aparece na busca e entra no filtro. |
| `keywords` | Entram no filtro da busca. |
| `matches` | Outras rotas (e suas sub-rotas) que marcam o item. |
| `hidden` | O item fica fora do menu e da busca, mas dá o título e escolhe a aba quando a rota é dele. Use para páginas de detalhe. |

Um só item fica marcado: o de rota mais longa entre `href` e `matches`. É o mesmo que dá o título no
cabeçalho e que decide a aba aberta. `currentNavigationItem(pathname, config, session)` devolve esse item
para o consumidor usar em outras partes da tela.

## Título da página

O título aparece uma única vez, no cabeçalho: ícone de seção e rótulo do item marcado. Sem item
correspondente, aparece o nome do sistema. `PageFrame` não tem título; para uma página fora do menu, crie
um item `hidden`.

## Sessão

Adapte o objeto já obtido pelo sistema consumidor:

```tsx
const shellSession = {
  user_id: sessao.id,
  name: sessao.nome,
  email: sessao.email,
  profileLabel: sessao.rotuloPerfil,
  avatar: sessao.avatarUrl ? { src: sessao.avatarUrl, alt: `Foto de ${sessao.nome}` } : null,
  is_admin: sessao.is_admin === true,
};
```

O cabeçalho mostra só o avatar redondo (foto ou iniciais). Ao clicar, abre um painel com nome, e-mail,
perfil e o botão de saída, quando `onSignOut` é passado ao `AppShell`.

A chave decisiva é `is_admin`. O template não infere administrador a partir de `role`, e-mail ou texto do
perfil.

## Regra das abas

- `is_admin !== true`, ou nenhum item administrativo visível: mostra apenas o grupo Plataforma, sem abas e
  sem itens administrativos.
- `is_admin === true` e algum item administrativo sem `hidden`: mostra as abas Plataforma e Administração.
- Ao entrar numa rota administrativa, a aba Administração abre automaticamente.
- A busca e o título seguem a mesma regra (`canSeeAdministration(config, session)`).

Essa regra é apenas de apresentação. Mantenha a autorização real de rota e de API no consumidor.

## Rodapé

```tsx
<AppShell config={shellConfig} session={shellSession} footer={<span>© Órgão · versão 2.4.0</span>}>
  {children}
</AppShell>
```

O rodapé aparece abaixo do conteúdo, com borda superior e o mesmo recuo do conteúdo.

## Barra lateral

- Recolhe pelo botão do rodapé da barra ou por `Ctrl/Cmd+B`; a escolha fica no `localStorage`
  (`SIDEBAR_STORAGE_KEY`) e vale nas próximas visitas. Sem armazenamento, vale só na página aberta.
- Abaixo de 801px, vira menu móvel: abre pelo botão do cabeçalho, sempre expandido, e fecha por `Esc`, pela
  sobreposição ou ao escolher um item.
- Abaixo de 640px, as logos do cabeçalho aparecem no menu móvel, sob a marca.

## Primitivos de página

Pinte as telas só com eles, para todas as aplicações ficarem iguais ao protótipo:

```tsx
import { BarChart, Button, Card, CardGrid, DataTable, MetricCard, PageFrame } from "@/components/tema-mppa";

<PageFrame
  description="Texto curto sobre a página."
  actions={<><Button>Nova ação</Button><Button variant="secondary">Ação secundária</Button></>}
>
  <CardGrid>
    <MetricCard label="Itens" value="24" note="Atualizado hoje" />
    <MetricCard label="Categorias" value="6" />
  </CardGrid>
  <CardGrid>
    <Card title="Atividade recente" description="Últimos cinco dias.">
      <BarChart label="Atividade por dia" data={[{ label: "Seg", value: 35 }, { label: "Ter", value: 62 }]} />
    </Card>
    <Card title="Distribuição">
      <BarChart variant="soft" label="Distribuição" data={[{ label: "A", value: 4 }, { label: "B", value: 7 }]} />
    </Card>
  </CardGrid>
  <DataTable
    title="Itens recentes"
    columns={[
      { key: "item", header: "Item", cell: (row) => row.item },
      { key: "acessos", header: "Acessos", cell: (row) => row.acessos, align: "right" },
    ]}
    rows={linhas}
    rowKey={(row) => row.id}
  />
</PageFrame>
```

| Primitivo | Protótipo |
| --- | --- |
| `PageFrame` | Descrição e ações (largura total no celular), 38px até o conteúdo, 20px entre blocos. |
| `Card` | Borda, raio 8px, sombra, padding 20px; `padded={false}` para conteúdo encostado. |
| `CardGrid` | 2 colunas (ou `columns` 1, 3, 4) com 20px; uma coluna abaixo de 801px. |
| `MetricCard` | Rótulo, número de 32px peso 800 e nota. |
| `DataTable` | Cabeçalho em texto secundário, linhas com borda, rolagem horizontal dentro do cartão. |
| `BarChart` | 165px, barras com degradê e topo arredondado; `variant` `strong` ou `soft`. |
| `Button` | Raio 8px, peso 700; `default` (primário), `secondary`, `ghost`, `destructive`; `size` `default`, `sm`, `icon`. |
| `SectionIcon` | Ícone de 28px, raio 6px, com `tone`. |

## Cores

Use só os tokens de `src/styles/tema-mppa.css` (`bg-card`, `text-muted-foreground`, `bg-highlight`,
`text-success`, `bg-tone-green`…). Não escreva hex nem classes de paleta (`text-red-700`) nas telas: os
tokens já têm o contraste exigido nos dois temas.

## Busca

As rotas visíveis entram automaticamente na busca `Ctrl+K`, com `description` e `keywords` no filtro. Itens
extras podem ser fornecidos em `searchItems`. O template não chama API; resultados remotos continuam sob
responsabilidade do consumidor.
