---
version: alpha
name: "Tema MPPA · camada visual"
description: >-
  Camada visual comum dos sistemas do Escritório de Inteligência Artificial do Ministério Público do Estado do
  Pará (modelo tema-mppa-next): azul de ação e vermelho institucional sobre pedra quente (claro) e pedra escura (escuro), fonte Inter, raio-base de 8px
  (quadros de 24px com contorno fino, botões e itens de 12px), sombras em camadas, barra lateral de 304px com abas Plataforma e
  Administração, cabeçalho de 62px e rodapé padrão (aparência do Moveflux Design System, 14 nov. 2026). Texto principal com 7:1 ou mais nos dois temas, texto
  secundário cinza com 4,5:1 ou mais em toda superfície neutra e texto sobre preenchimento colorido com 4,5:1. Os valores
  abaixo são os do tema claro; os do escuro estão em "Colors". A fonte da verdade é styles/tema-mppa.css.

colors:
  primary: "#0842a1"
  primary-foreground: "#ffffff"
  background: "#e7e5e4"
  foreground: "#1c1917"
  card: "#ffffff"
  card-foreground: "#1c1917"
  popover: "#ffffff"
  popover-foreground: "#1c1917"
  secondary: "#f5f5f4"
  muted: "#fafaf9"
  muted-foreground: "#5f5a56"
  accent: "#f5f5f4"
  accent-foreground: "#1c1917"
  highlight: "#bfdbfe"
  highlight-foreground: "#0a2a66"
  destructive: "#991b1b"
  destructive-foreground: "#ffffff"
  success: "#08351f"
  warning: "#432506"
  border: "#e7e5e4"
  card-border: "#e7e5e4"
  ring: "#0842a1"
  overlay: "#000000"
  logo-surface: "#ffffff"
  institutional: "#e11d48"
  institutional-foreground: "#be123c"
  avatar-from: "#e11d48"
  avatar-to: "#2563eb"
  avatar-foreground: "#ffffff"
  online: "#10b981"
  theme-icon: "#d97706"
  sidebar: "#ffffff"
  sidebar-foreground: "#44403c"
  sidebar-accent: "#f5f5f4"
  sidebar-accent-foreground: "#1c1917"
  sidebar-hover: "#ecf4fe"
  tone-red: "#fee2e2"
  tone-red-foreground: "#970611"
  tone-green: "#d1fae5"
  tone-green-foreground: "#047857"
  tone-violet: "#ede9fe"
  tone-violet-foreground: "#6d28d9"
  tone-orange: "#ffedd5"
  tone-orange-foreground: "#a85005"
  tone-blue: "#dbeafe"
  tone-blue-foreground: "#1d4ed8"
  tone-teal: "#ccfbf1"
  tone-teal-foreground: "#0f766e"
  tone-pink: "#fce7f3"
  tone-pink-foreground: "#be185d"
  tone-amber: "#fef3c7"
  tone-amber-foreground: "#92400e"
  chart-strong-from: "#0842a1"
  chart-strong-to: "#3b82f6"
  chart-soft-from: "#6f9be6"
  chart-soft-to: "#94b6f1"

typography:
  page-title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
  brand-name:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    letterSpacing: -0.025em
  nav-item:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13.5px
    fontWeight: 500
  nav-group:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 600
  tab:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 500
  button:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 600
  card-title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    letterSpacing: -0.025em
  body-md:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
  table:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
  table-header:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 600
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
  caption-strong:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
  metric:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2

rounded:
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  2xl: 16px
  3xl: 24px
  full: 9999px

spacing:
  shell-bar: 62px
  sidebar: 304px
  sidebar-collapsed: 76px
  breakpoint-desk: 801px
  content: 40px
  content-y: 36px
  content-tablet: 24px
  content-mobile-y: 24px
  content-mobile-x: 16px
  content-max: 1380px
  card: 24px
  grid-gap: 16px
  item-y: 8px
  item-x: 10px
  item-gap: 12px
  item-stack: 6px
  tab-height: 32px
  tab-rail: 4px
  button-height: 36px
  icon-button: 36px
  section-icon: 32px
  title-icon: 28px
  avatar: 32px
  search-width: 240px
  logo-height: 32px
  chart-height: 165px
  chart-bar-max: 90px

components:
  app-header:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.page-title}"
    height: 62px
    padding: "0px 24px"
  app-sidebar:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    typography: "{typography.nav-item}"
    width: 304px
  app-sidebar-collapsed:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    width: 76px
  sidebar-brand:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    typography: "{typography.brand-name}"
    height: 62px
  nav-item:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    typography: "{typography.nav-item}"
    rounded: "{rounded.xl}"
    padding: "8px 10px"
  nav-item-hover:
    backgroundColor: "{colors.sidebar-hover}"
    textColor: "{colors.sidebar-accent-foreground}"
    rounded: "{rounded.xl}"
  nav-item-active:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.highlight-foreground}"
    typography: "{typography.nav-item}"
    rounded: "{rounded.xl}"
    padding: "8px 10px"
  nav-group-rule:
    backgroundColor: "{colors.institutional}"
    height: 1px
  tab-rail:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.xl}"
    padding: 4px
  tab-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.tab}"
    rounded: "{rounded.lg}"
    height: 32px
  section-icon-red:
    backgroundColor: "{colors.tone-red}"
    textColor: "{colors.tone-red-foreground}"
    rounded: "{rounded.lg}"
    size: 32px
  section-icon-green:
    backgroundColor: "{colors.tone-green}"
    textColor: "{colors.tone-green-foreground}"
    rounded: "{rounded.lg}"
    size: 32px
  section-icon-violet:
    backgroundColor: "{colors.tone-violet}"
    textColor: "{colors.tone-violet-foreground}"
    rounded: "{rounded.lg}"
    size: 32px
  section-icon-orange:
    backgroundColor: "{colors.tone-orange}"
    textColor: "{colors.tone-orange-foreground}"
    rounded: "{rounded.lg}"
    size: 32px
  section-icon-blue:
    backgroundColor: "{colors.tone-blue}"
    textColor: "{colors.tone-blue-foreground}"
    rounded: "{rounded.lg}"
    size: 32px
  section-icon-teal:
    backgroundColor: "{colors.tone-teal}"
    textColor: "{colors.tone-teal-foreground}"
    rounded: "{rounded.lg}"
    size: 32px
  section-icon-pink:
    backgroundColor: "{colors.tone-pink}"
    textColor: "{colors.tone-pink-foreground}"
    rounded: "{rounded.lg}"
    size: 32px
  section-icon-amber:
    backgroundColor: "{colors.tone-amber}"
    textColor: "{colors.tone-amber-foreground}"
    rounded: "{rounded.lg}"
    size: 32px
  search-box:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.xl}"
    height: 36px
    width: 240px
  command-palette:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.2xl}"
  avatar:
    backgroundColor: "{colors.avatar-from}"
    textColor: "{colors.avatar-foreground}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.full}"
    size: 32px
  logo-chip:
    backgroundColor: "{colors.logo-surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    height: 32px
    padding: "4px 8px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.xl}"
    height: 36px
    padding: "0px 13px"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.xl}"
    height: 36px
    padding: "0px 13px"
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.xl}"
    size: 36px
  button-chrome:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.xl}"
    size: 36px
  button-ghost-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.xl}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.xl}"
    height: 36px
    padding: "0px 13px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.3xl}"
    padding: 24px
  card-title:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.card-title}"
  metric-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.metric}"
    rounded: "{rounded.3xl}"
    padding: 24px
  data-table:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.table}"
    rounded: "{rounded.3xl}"
    padding: "12px 16px"
  data-table-header:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.table-header}"
    padding: "12px 16px"
  focus-ring:
    backgroundColor: "{colors.ring}"
    rounded: "{rounded.lg}"
    width: 2px
  drawer-overlay:
    backgroundColor: "{colors.overlay}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  chart-bar-strong-base:
    backgroundColor: "{colors.chart-strong-from}"
    rounded: "{rounded.md}"
    width: 90px
  chart-bar-strong-top:
    backgroundColor: "{colors.chart-strong-to}"
    rounded: "{rounded.md}"
    width: 90px
  chart-bar-soft-base:
    backgroundColor: "{colors.chart-soft-from}"
    rounded: "{rounded.md}"
    width: 90px
  chart-bar-soft-top:
    backgroundColor: "{colors.chart-soft-to}"
    rounded: "{rounded.md}"
    width: 90px
  page-footer:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.caption}"
    height: 62px
  status-success:
    backgroundColor: "{colors.card}"
    textColor: "{colors.success}"
    typography: "{typography.caption-strong}"
  status-warning:
    backgroundColor: "{colors.card}"
    textColor: "{colors.warning}"
    typography: "{typography.caption-strong}"
---

# Tema MPPA · camada visual

Este arquivo descreve a camada visual comum dos sistemas do MPPA para agentes de IA e pessoas, no formato
[DESIGN.md](https://github.com/google-labs-code/design.md) (versão `alpha`): tokens no bloco YAML acima e a
intenção do design abaixo. Ele não é a fonte da verdade: as cores e as medidas vêm de `styles/tema-mppa.css`
e de `components/tema-mppa/`, e o `verificar-design.mjs` reprova cor ou medida deste arquivo diferente da de
lá.

No sistema consumidor, este arquivo fica em `docs/tema-mppa/DESIGN.md` como referência. O `DESIGN.md` do
sistema, na raiz do frontend, parte dele e acrescenta os tokens e as regras próprias (`REPLICAR.md`, 4.9).

## Overview

**Institucional, sóbrio, legível.** Os sistemas do Escritório de Inteligência Artificial do Ministério
Público do Estado do Pará têm a mesma casca e o mesmo código de cores: quem passa de um para outro reconhece
o MPPA e não reaprende a navegação. A interface não tenta impressionar; ela tem de ser legível por qualquer
pessoa, inclusive com baixa visão. Por isso o texto principal tem 7:1 ou mais nos dois temas, e o secundário,
cinza, tem 4,5:1 ou mais (WCAG AA) em toda superfície neutra.

A identidade vem de três escolhas:

- **Um azul de ação e um vermelho institucional.** O azul (`{colors.primary}`, `#0842a1`, o mesmo do
  Heimdall) é a cor de tudo o que o usuário aciona: botão primário, foco, realce do item ativo, ícone padrão
  de seção e gráficos. O vermelho só aparece com significado: erro e ação destrutiva (`{colors.destructive}`)
  e a identidade institucional (logos, símbolo padrão, detalhes de realce). O resto é pedra quente (claro) ou pedra escura (escuro) neutra. Nenhum sistema escolhe outra
  cor de ação.
- **Inter** em todo texto, com peso 600 nos títulos, rótulos e métricas.
- **Raios de 8 a 24px e sombras em camadas** (aparência do "Moveflux Design System", 14 nov. 2026): quadros de
  24px com contorno fino de 1px e a sombra `shadow-card`, botões e itens de 12px, tiles internos de 16px, abas e
  ícones de 8px; superfícies macias, sem exagero.

**Características principais:**

- Casca única em todos os sistemas: barra lateral de 304px (76px recolhida) com abas Plataforma e
  Administração, cabeçalho de 62px, conteúdo com padding de 40px × 36px e largura máxima de 1380px, rodapé padrão
  fixo no pé da tela, na faixa do "Recolher". Cabeçalho e rodapé são translúcidos, com desfoque, e o fundo é liso, sem brilho nos cantos.
- Título da página só no cabeçalho, vindo do item marcado no menu; nenhum título repetido no conteúdo.
- Ícones de seção Lucide, numa caixa de 32px (28px no título) com raio de 8px, fundo pastel (no escuro,
  translúcido), chapado, sem brilho nem borda (`tm-tone`), e traço do mesmo tom (azul, verde, violeta, laranja,
  revezados), duotone: o miolo do ícone recebe 20% da cor do traço. No menu, o ícone cresce 5% sob o mouse (sem movimento com
  `prefers-reduced-motion`).
- Busca (atalho `Ctrl+K`, sem etiqueta na tela) com as páginas que cada usuário pode ver.
- Tema claro, escuro e sistema; toda entrada abre em claro e a escolha vale só para a aba.

## Colors

### Marca e ação

- **Primary** (`{colors.primary}`, `#0842a1`): botão primário, foco (`ring`), links de ação, `sidebar-primary`,
  barra de gráfico forte. Texto branco sobre ela (9,11:1; 7,26:1 dela sobre o fundo). No escuro, `#61a6fa` com texto `#080c16` (7,76:1).
- **Equilíbrio:** o azul é a ação; o vermelho só com significado (destrutivo/erro e identidade
  institucional). Os demais tons de seção continuam variados.
- **Destructive** (`{colors.destructive}`, `#991b1b`): ação destrutiva, com texto branco.
- **Highlight** (`{colors.highlight}`, `#bfdbfe`): item selecionado do menu em azul sólido, sem degradê, com texto
  e ícone azul-marinho `#0a2a66` (9,62:1), barra de 3,5px em azul forte à esquerda e brilho azul; no escuro, `#2547a8`
  com texto branco (8,25:1). O item sob o ponteiro usa o azul sutil `{colors.sidebar-hover}`. A aba ativa não usa
  o realce: fica em `bg-card`.
- **Institutional** (`{colors.institutional}`, `#e11d48`; texto `{colors.institutional-foreground}`,
  `#be123c`, 5,52:1 sobre o selo): selo da versão na marca, ícone da aba Plataforma e nome do sistema no
  rodapé. **Avatar:** degradê `#e11d48` → `#2563eb` com texto branco e ponto verde de conectado
  (`{colors.online}`, `#10b981`). **Ícone do tema:** sol `#d97706`, lua `#60a5fa` (`{colors.theme-icon}`).
  **Header** (`rgba(255,255,255,.85)` no claro): fundo translúcido de cabeçalho e rodapé.

### Superfícies e texto

- **Background** (`#e7e5e4`, pedra quente): página e cabeçalho; mais escuro que o cartão, que o destaca. **Card**
  (`#ffffff`): cartões, botão secundário, caixa de busca. **Sidebar** (`#ffffff`): barra lateral. **Muted**
  (`#fafaf9`): tiles internos, trilho das abas, avatar, áreas neutras; **Secondary** e **Accent** (`#f5f5f4`).
- **Foreground** (`#1c1917`): texto principal (13,93:1 no fundo, 17,49:1 no cartão). **Muted foreground**
  (`#5f5a56`): texto secundário (descrições, rótulos, rodapé, cabeçalhos de tabela) em cinza de pedra, com 6,52:1
  sobre o muted, 5,42:1 sobre o fundo e 6,81:1 sobre o cartão. O texto da barra (`sidebar-foreground`) é `#44403c`
  (10,27:1 no branco, 9,84:1 no muted).
- **Border** (`#e7e5e4`): bordas da casca (cabeçalho, rodapé, barra lateral, diálogos), para as linhas da barra e
  do conteúdo coincidirem.
- **Card border** (`{colors.card-border}`, `#e7e5e4`, o contorno fino de 1px do modelo; no escuro `#44403c`): contorno
  dos quadros e das linhas de dentro deles (`Card`, `PanelCard`, `LinkCard`, `InfoField`, a caixa do
  `PageGreeting` e as linhas do `DataTable`), utilitário `border-card-border`.
- **Logo surface** (`#ffffff` nos dois temas): fundo das logos institucionais, em caixas com borda e sombra.

### Status e tons

- **Success** (`#08351f`) e **Warning** (`#432506`): status, com 7:1 ou mais sobre toda superfície neutra
  (13,06:1 e 13,35:1 sobre o muted).
- **Tons dos ícones de seção:** azul `#dbeafe` + `#1d4ed8` (o padrão, sem `tone`), verde `#d1fae5` +
  `#047857`, violeta `#ede9fe` + `#6d28d9`, laranja `#ffedd5` + `#a85005`, e mais quatro para menus com
  mais de quatro itens: vermelho `#fee2e2` + `#970611` (reservado ao que tem significado institucional),
  verde-água `#ccfbf1` + `#0f766e`, rosa `#fce7f3` + `#be185d` e âmbar
  `#fef3c7` + `#92400e`; todos com 4,5:1 ou mais e iguais nos dois temas.
- **Gráficos:** degradê forte `#0842a1 → #3b82f6` e suave `#6f9be6 → #94b6f1` (`tm-bar-strong`,
  `tm-bar-soft`); são elementos gráficos, sem texto. No escuro, `#3b82f6 → #61a6fa` e `#4f78b8 → #7aa2dd`.
- **Símbolo padrão** (`tm-brand-mark`, 32px): degradê `#ef3340 → #7f1d1d` com a inicial em branco, peso 800.
  É identidade institucional, por isso continua vermelho; é marca, não texto corrido, e fica fora dos
  tokens acima.

### Tema escuro

O formato não tem modos; os valores do escuro ficam aqui (pedra escura). Texto principal com 7:1 ou mais, secundário
com 4,5:1 ou mais; texto sobre preenchimento colorido com 4,5:1.

| Token | Escuro |
| --- | --- |
| background / foreground | `#0c0a09` / `#fafaf9` (18,92:1) |
| sidebar / sidebar-foreground | `#12100f` / `#d6d3d1` |
| card, popover | `#1c1917` |
| muted, secondary, accent, sidebar-accent | `#292524` |
| sidebar-hover (item do menu sob o ponteiro) | `#142645` (texto `#fafaf9` com 14,44:1) |
| muted-foreground | `#a8a29e` (6,01:1 no muted, 6,93:1 no cartão, 7,83:1 no fundo) |
| primary / primary-foreground | `#61a6fa` / `#080c16` |
| destructive / destructive-foreground | `#f87171` / `#0c0a09` |
| highlight / highlight-foreground | `#2547a8` / `#ffffff` (8,25:1), sólido, barra `#93c5fd` |
| institutional, avatar, online, theme-icon | `#fb7185` (selo e texto, 6,40:1; 6,50:1 no cartão), degradê do avatar igual ao do claro, `#10b981`, lua `#60a5fa` |
| success / warning (texto sobre eles: `#0c0a09`) | `#bbf7d0` / `#fef08a` |
| border | `rgba(255, 255, 255, 0.08)` |
| card-border (contorno dos quadros e linhas internas; claro `#e7e5e4`) | `#44403c` |
| ring, sidebar-ring, sidebar-primary | `#61a6fa` (texto sobre sidebar-primary: `#080c16`) |
| gráficos | forte `#3b82f6 → #61a6fa`, suave `#4f78b8 → #7aa2dd` |
| tons dos ícones | a cor a 18% sobre a barra, em hex, com os traços do CSS (5,93:1 ou mais): azul `#142645` + `#60a5fa`, verde `#0d3030` + `#34d399`, violeta `#231f45` + `#c4b5fd`, laranja `#37231d` + `#fdba74`, vermelho `#321426` + `#fb7185`, verde-água `#0d3036` + `#5eead4`, rosa `#341c34` + `#f9a8d4`, âmbar `#362b1b` + `#fcd34d` |
| logo surface | `#ffffff` |

## Typography

Uma família só: **Inter**, servida pelo `next/font` como `--font-inter` e lida pelo `--font-sans` da
camada. Os pesos 700 e 800 do Tailwind (`font-bold`, `font-extrabold`) valem 600 (`--font-weight-bold` e
`--font-weight-extrabold`), como no modelo. A altura de linha da casca é `normal`.

| Token | Tamanho | Peso | Uso |
| --- | --- | --- | --- |
| `{typography.page-title}` | 14px | 600 | Título da página no cabeçalho |
| `{typography.brand-name}` | 16px | 600 | Nome do sistema no topo da barra lateral, em negrito; a versão ao lado, em selo vermelho de fonte mono (10px) |
| `{typography.nav-item}` | 13.5px | 500 (ativo 600) | Itens do menu |
| `{typography.nav-group}` | 11px | 600 | Nome do grupo ("Plataforma", "Administração"), só para leitores de tela; na tela, uma linha de 1px em degradê do vermelho institucional ao azul |
| `{typography.tab}` | 13px | 500 | Abas da barra lateral |
| `{typography.button}` | 13px | 600 | Botões |
| `{typography.card-title}` | 20px | 600 | Título de cartão e de tabela (`tm-card-title`, com `tracking-tight`) |
| `{typography.body-md}` | 16px | 400 | Texto corrido e descrições |
| `{typography.table}` / `{typography.table-header}` | 13px | 400 / 600 | Células e cabeçalhos de tabela |
| `{typography.caption}` | 12px | 400 | Rodapé, perfil do usuário, texto da busca |
| `{typography.caption-strong}` | 12px | 600 | Nome do usuário, iniciais do avatar |
| `{typography.metric}` | 32px | 600 | Número do cartão de métrica (algarismos tabulares) |

## Layout

- **Casca:** barra lateral de 304px (`{spacing.sidebar}`), recolhida em 76px por botão ou `Ctrl+B`,
  lembrada no navegador. Abaixo de 801px (`{spacing.breakpoint-desk}`) vira menu móvel sobreposto, sempre
  expandido, com as logos sob a marca; `Esc` fecha. Entre 801px e 1023px, com a barra aberta, as logos também
  ficam sob a marca, na barra lateral.
- **Faixas de 62px** (`{spacing.shell-bar}`): topo da barra lateral (marca), cabeçalho, faixa "Recolher" e
  rodapé têm a mesma altura e a mesma borda, alinhadas sem diferença de pixel.
- **Conteúdo:** padding de 40px × 36px (24px no tablet, 16px no celular), largura máxima de 1380px; sem rolagem horizontal
  em 390px.
- **Ordem do conteúdo** (`PageFrame`): descrição e ações no topo, 32px abaixo as métricas (`CardGrid` de
  `MetricCard`), depois cartões com gráficos, depois tabelas; 16px entre cartões; uma coluna abaixo de
  801px; as ações ocupam a largura toda no celular.
- **Menu:** item com padding 8px × 10px, 12px entre ícone e texto, 6px entre itens; abas de 32px, com
  borda, num trilho com padding de 4px; ícones sempre visíveis (Plataforma no vermelho institucional,
  Administração na primária).
- **Grupo "Apoio"** (desde a 2.2.0), da camada, em todos os sistemas: em "Minha Página", 16px abaixo dos itens do
  sistema, rótulo "APOIO" (11px, peso 600, maiúsculas, `{colors.muted-foreground}`) sobre a linha em degradê do menu,
  e os itens "Manual" (livro, tom azul) e "Tutorial" (capelo, tom verde-água). O sistema só dá os endereços
  (`support`). Com a barra recolhida, só a linha.
- **Cabeçalho, da esquerda para a direita:** ícone de seção de 28px e título com a seção à frente
  ("Minha Página / Meus acessos" na demonstração); tema (botão `chrome` de 36px); divisória; logos com 32px de
  altura, em caixas com borda e sombra; divisória; avatar de 32px em degradê com ponto verde, nome e perfil (a
  partir de 1280px), botão de sair (36px, com realce destrutivo).
- **Prioridade do título:** o título ocupa o que sobra e nunca fica com menos de 128px (ícone e cerca de 90px de
  texto). A seção à frente só aparece quando o bloco do título tem 288px ou mais, e encolhe antes dele. As logos
  ficam no cabeçalho a partir de 1024px, ou a partir de 801px com a barra recolhida; fora disso, sob a marca.
  Padrão dos sistemas: três logos, MPPA, CIIA e a sigla CIIA (decorativa, `alt` vazio).

## Elevation & Depth

Hierarquia por superfície e por sombras em camadas (os valores exatos estão em `styles/tema-mppa.css`):

- `shadow-surface` (contorno de 1px e duas camadas a 6% no claro; no escuro, sombra funda com brilho interno de 1px
  no topo): abas ativas, item ativo e busca aberta.
- `shadow-card` (contorno de 1px e cinco camadas de 0,5px a 12px a 6% no claro; no escuro, `0 4px 20px -2px
  rgba(0,0,0,.5)` com brilho interno): quadros. `shadow-card-hover` (as mesmas camadas a 7 e 8%, mais fundas, no
  claro): quadro sob o mouse e diálogo da busca.
- Hover dos quadros (desde a 2.1.0): todo quadro (`Card`, `PanelCard`, `MediaCard`, `LinkCard` e os que usam o `Card`)
  sobe 2px e passa a `shadow-card-hover` em 200ms, e a caixa do ícone cresce 5%; com `prefers-reduced-motion`, fica
  só a sombra (`tm-card-hover`).
- `shadow-drawer` (`8px 0 24px rgba(0,0,0,.22)`): só no menu móvel aberto; `bg-overlay` a 40% atrás dele e a
  60% atrás da busca.
- As barras da casca não têm sombra: separam-se por borda de 1px; cabeçalho e rodapé são translúcidos (`--header`) com desfoque.
- Barras de gráfico com sombra leve (`0 1px 2px rgba(0,0,0,.08)`) e topo arredondado.

## Shapes

Tudo preso a `--radius` (8px):

- `{rounded.3xl}` 24px (`--radius-card`, `rounded-card`): quadros (cartões, tabelas).
- `{rounded.2xl}` 16px: tiles internos (`tm-tile`) e diálogo da busca.
- `{rounded.xl}` 12px: botões, itens do menu, busca, trilho das abas, selos de caixa.
- `{rounded.lg}` 8px: abas internas, ícones de seção, caixas das logos.
- `{rounded.md}` 6px: selo da versão, topo das barras de gráfico. `{rounded.xs}` 2px: base das barras de gráfico.
- `{rounded.full}`: avatar.
- Raio maior que 24px: não use em tela nova.

## Components

Os primitivos vêm de `components/tema-mppa` (`index.ts`); nunca recrie um nem edite a pasta.

**`AppShell`** (`app-header`, `app-sidebar`, `page-footer`): a casca inteira, configurada por um
`ShellConfig` do sistema. Recebe a sessão e o logout por propriedade; não chama API nem decide acesso. As
abas e os itens de administração só aparecem com `session.is_admin === true`.

**Menu** (`nav-item`, `nav-item-active`, `tab-active`, `nav-group-rule`): ícone de seção em caixa de 32px e rótulo; um só item
marcado, o de rota mais longa, que dá também o título e a aba aberta. Abaixo das abas, no lugar do nome do grupo,
uma linha de 1px em degradê do vermelho institucional ao azul, sumindo à direita; o nome fica num `h2` só para
leitores de tela. Recolhido, só ícones com o rótulo no `title`. Cartões com transição de 200ms e título com
`tracking-tight`.

**Logos** (`logo-chip`): caixas de 32px de altura com borda e sombra sobre `bg-logo-surface`, vindas de
`header.logos`. Padrão dos sistemas, nesta ordem: MPPA (132×76), CIIA (244×244) e a sigla CIIA (132×76,
decorativa, `alt=""`). No cabeçalho a partir de 1024px (ou de 801px com a barra recolhida); fora disso, sob a
marca, na barra lateral ou no menu móvel.

**Busca** (`search-box`, `command-palette`): caixa de 36px (raio de 12px) com lupa e "Buscar na página", sem etiqueta de atalho, fixa
na barra lateral logo acima do "Recolher", na largura da barra (padding de 10px); com a barra recolhida, só
a lupa; no celular, no menu móvel. O atalho `Ctrl+K`, que não aparece na tela, abre a lista das páginas do menu, com nome e descrição; o filtro
aceita o nome ou a descrição, sem acento. O diálogo vai para o `<body>` por portal.

**`Button`** (`button-primary`, `button-secondary`, `button-ghost`, `button-chrome`, `button-destructive`): 36px de altura,
peso 600, raio de 12px; ícone de 36px (`size-9`), mais a variante `chrome` (borda, fundo do cartão, sombra leve), usada no tema e no menu móvel. Link com cara de botão: `buttonVariants`.

**`Card` / `MetricCard` / `CardGrid`** (`card`, `metric-card`): raio de 24px, padding de 24px, borda
`border-card-border` e sombra `shadow-card`, sem faixa colorida no topo; métrica com número de 32px peso 600 e nota
opcional.

**`DataTable`** (`data-table`, `data-table-header`): título opcional com ações, células de 13px com padding
12px × 16px, cabeçalho em peso 600, mensagem de vazio.

**`BarChart`** (`chart-bar-strong-base`/`-top`, `chart-bar-soft-base`/`-top`): 165px de altura, barras
de até 90px de largura com degradê da base ao topo, variante forte (azul) ou suave (azul claro), com
rótulo para leitor de tela.

**Rodapé padrão** (`page-footer`): "Desenvolvido pelo Ministério Público do Estado do Pará - Escritório de
Inteligência Artificial - Nome - V x.y.z - Ano", montado por `footerText(brand)`, com o órgão em negrito e o
nome do sistema no vermelho institucional, nunca cortado; na casca e
nas páginas públicas que têm rodapé.

**`ThemeScript`**: o script de tema no `<head>` do layout raiz, com o `nonce` da CSP quando houver.

### Forma do tema e peças de metas

A forma vem das classes `tm-*` do CSS, postas nas peças da camada: quadros de 24px com contorno fino de 1px e sombra em
cinco camadas, sem faixa colorida no topo (`tm-card-top`; a cor de `accent` não pinta a borda); Inter em peso 600;
tiles internos (`tm-tile`), rótulos (`tm-label`) e selos (`tm-tag`, `tm-status`) sem maiúsculas; caixas de ícone
chapadas (`tm-tone`); título de seção sem o ponto colorido. Tela nenhuma depende dessas classes.

As peças de metas (`MediaCard`, `StatCard`, `StatValue`, `GoalRow`, `WorkoutRow`, `ProgressBar`, `ProgressRing`,
`DayStrip`, `InsetTile`, `MacroTile`, `StatusPill`, `RoundButton`) usam só tokens (`--bar-*`, `--media*`); a ação do
dia selecionado é a primária.

## Do's and Don'ts

- **Do** pinte só com tokens (`bg-card`, `text-muted-foreground`, `border`…); nunca `#hex`, `rgb()`,
  `bg-white` ou `text-gray-*` nas telas.
- **Do** confira 7:1 no texto principal nos dois temas e 4,5:1 (WCAG AA) no secundário sobre toda superfície
  neutra (4,5:1 também sobre preenchimento colorido); o secundário é cinza, não igual ao principal.
- **Do** ponha o título só no cabeçalho, vindo do item de navegação; uma rota fora do menu ganha um item com
  `hidden: true`, e uma rota de detalhe passa o nome do registro ao `title` do `AppShell`.
- **Do** entre o que é do sistema por configuração (`ShellConfig`, tokens próprios no CSS do sistema).
- **Don't** edite `components/tema-mppa/` nem `styles/tema-mppa.css`: o `verificar-camada.mjs` reprova.
  Necessidade que a camada não atende volta ao modelo `tema-mppa-next`.
- **Do** use vermelho só com significado (erro, ação destrutiva, identidade institucional); a ação é azul.
- **Don't** use `text-primary` sobre `bg-primary/15` ou mais, nem sobre `bg-primary/10` no fundo da página: o par cai
  abaixo de 7:1 no claro (6,19:1 com /10 e 5,71:1 com /15 sobre o fundo; 6,73:1 com /15 sobre o muted). Com
  `bg-primary/10` passa sobre o cartão (7,68:1) e o muted (7,39:1); nos demais casos use o texto
  principal e deixe a primária no ícone ou na borda.
- **Don't** deduza administrador por e-mail, nome ou rótulo de perfil; só o booleano da sessão real.
- **Don't** importe o `ThemeProvider` para pôr o script de tema: use `<ThemeScript nonce={nonce} />`.
- **Don't** acrescente raio maior que 24px nem sombra mais forte que `shadow-card-hover` em tela nova.
