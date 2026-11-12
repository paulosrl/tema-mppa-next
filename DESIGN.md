---
version: alpha
name: "Tema MPPA · camada visual"
description: >-
  Camada visual comum dos sistemas do Escritório de Inteligência Artificial do Ministério Público do Estado do
  Pará (modelo tema-mppa-next): azul de ação e vermelho institucional sobre ardósia (claro) e marinho (escuro), fonte Outfit, raio-base de 8px
  (cartões de 16px, botões e itens de 12px), sombras em camadas, barra lateral de 268px com abas Plataforma e Administração,
  cabeçalho de 62px e rodapé padrão (estética de 12 nov. 2026). Texto principal com 7:1 ou mais nos dois temas, texto
  secundário cinza com 4,5:1 ou mais em toda superfície neutra e texto sobre preenchimento colorido com 4,5:1. Os valores
  abaixo são os do tema claro; os do escuro estão em "Colors". A fonte da verdade é styles/tema-mppa.css.

colors:
  primary: "#0842a1"
  primary-foreground: "#ffffff"
  background: "#f4f7fb"
  foreground: "#0f172a"
  card: "#ffffff"
  card-foreground: "#0f172a"
  popover: "#ffffff"
  popover-foreground: "#0f172a"
  secondary: "#f1f5f9"
  muted: "#f1f5f9"
  muted-foreground: "#5f6f86"
  accent: "#f1f5f9"
  accent-foreground: "#0f172a"
  highlight: "#0842a1"
  highlight-foreground: "#ffffff"
  destructive: "#991b1b"
  destructive-foreground: "#ffffff"
  success: "#08351f"
  warning: "#432506"
  border: "#e2e8f0"
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
  sidebar-foreground: "#334155"
  sidebar-accent: "#f1f5f9"
  sidebar-accent-foreground: "#0f172a"
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
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
  brand-name:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 700
    letterSpacing: -0.025em
  nav-item:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13.5px
    fontWeight: 500
  nav-group:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 700
  tab:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 500
  button:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 700
  card-title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 700
  body-md:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
  table:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
  table-header:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 700
  caption:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
  caption-strong:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
  metric:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.2
  kbd:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 10px
    fontWeight: 600

rounded:
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  2xl: 16px
  full: 9999px

spacing:
  shell-bar: 62px
  sidebar: 268px
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
    width: 268px
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
  nav-group-label:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.nav-group}"
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
    rounded: "{rounded.2xl}"
    padding: 24px
  card-title:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.card-title}"
  metric-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.metric}"
    rounded: "{rounded.2xl}"
    padding: 24px
  data-table:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.table}"
    rounded: "{rounded.2xl}"
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
  e a identidade institucional (logos, símbolo padrão, detalhes de realce). O resto é ardósia (claro) ou marinho (escuro) neutro. Nenhum sistema escolhe outra
  cor de ação.
- **Outfit** em todo texto, geométrica e calma, com pesos fortes (650 a 800) nos rótulos e nas métricas.
- **Raios de 8 a 16px e sombras em camadas** (estética de 12 nov. 2026): cartões de 16px com a sombra
  `shadow-card`, botões e itens de 12px, abas e ícones de 8px; superfícies macias, sem exagero.

**Características principais:**

- Casca única em todos os sistemas: barra lateral de 268px (76px recolhida) com abas Plataforma e
  Administração, cabeçalho de 62px, conteúdo com padding de 40px × 36px e largura máxima de 1380px, rodapé padrão
  fixo no pé da tela, na faixa do "Recolher". Cabeçalho e rodapé são translúcidos, com desfoque, e o fundo tem um
  brilho vermelho e azul nos cantos de cima.
- Título da página só no cabeçalho, vindo do item marcado no menu; nenhum título repetido no conteúdo.
- Ícones de seção Lucide, numa caixa de 32px (28px no título) com raio de 8px, fundo pastel (no escuro,
  translúcido) com brilho em degradê (`tm-tone`) e traço do mesmo tom (azul, verde, violeta, laranja,
  revezados), duotone: o miolo do ícone recebe 20% da cor do traço, e uma borda de 1px na cor do traço contorna a
  caixa. No menu, o ícone cresce 5% sob o mouse (sem movimento com
  `prefers-reduced-motion`).
- Busca `Ctrl K` com as páginas que cada usuário pode ver.
- Tema claro, escuro e sistema; toda entrada abre em claro e a escolha vale só para a aba.

## Colors

### Marca e ação

- **Primary** (`{colors.primary}`, `#0842a1`): botão primário, foco (`ring`), links de ação, `sidebar-primary`,
  barra de gráfico forte. Texto branco sobre ela (9,11:1; 8,48:1 dela sobre o fundo). No escuro, `#61a6fa` com texto `#080c16` (7,76:1).
- **Equilíbrio:** o azul é a ação; o vermelho só com significado (destrutivo/erro e identidade
  institucional). Os demais tons de seção continuam variados.
- **Destructive** (`{colors.destructive}`, `#991b1b`): ação destrutiva, com texto branco.
- **Highlight** (`{colors.highlight}`, `#0842a1`): item selecionado do menu em azul escuro, degradê `#0842a1` →
  `#0b4fc0`, texto e ícone brancos (9,11:1 a 7,26:1), barra de 3,5px em azul-claro à esquerda e brilho azul. O item
  sob o ponteiro usa o azul sutil `{colors.sidebar-hover}`. A aba ativa não usa o realce: fica em `bg-card`.
- **Institutional** (`{colors.institutional}`, `#e11d48`; texto `{colors.institutional-foreground}`,
  `#be123c`, 5,52:1 sobre o selo): selo da versão na marca, ícone da aba Plataforma e nome do sistema no
  rodapé. **Avatar:** degradê `#e11d48` → `#2563eb` com texto branco e ponto verde de conectado
  (`{colors.online}`, `#10b981`). **Ícone do tema:** sol `#d97706`, lua `#60a5fa` (`{colors.theme-icon}`).
  **Header** (`rgba(255,255,255,.85)` no claro): fundo translúcido de cabeçalho e rodapé.

### Superfícies e texto

- **Background** (`#f4f7fb`, ardósia): página e cabeçalho; destaca cartões e barra brancos. **Card**
  (`#ffffff`): cartões, botão secundário, caixa de busca. **Sidebar** (`#ffffff`): barra lateral. **Muted**
  (`#f1f5f9`): trilho das abas, avatar, áreas neutras.
- **Foreground** (`#0f172a`): texto principal (16,61:1 no fundo). **Muted foreground** (`#5f6f86`): texto
  secundário (descrições, rótulos, rodapé, cabeçalhos de tabela) em cinza-ardósia, com 4,67:1 sobre o muted,
  4,76:1 sobre o fundo e 5,12:1 sobre o cartão. O texto da barra (`sidebar-foreground`) é `#334155` (10,35:1
  no branco, 9,45:1 no muted).
- **Border** (`#e2e8f0`): toda borda, inclusive a da barra lateral, para as linhas da barra e do conteúdo
  coincidirem.
- **Logo surface** (`#ffffff` nos dois temas): fundo das logos institucionais, em caixas com borda e sombra.

### Status e tons

- **Success** (`#08351f`) e **Warning** (`#432506`): status, com 7:1 ou mais sobre toda superfície neutra
  (12,45:1 e 12,73:1 sobre o muted).
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

O formato não tem modos; os valores do escuro ficam aqui (marinho). Texto principal com 7:1 ou mais, secundário
com 4,5:1 ou mais; texto sobre preenchimento colorido com 4,5:1.

| Token | Escuro |
| --- | --- |
| background / foreground | `#070b12` / `#f8fafc` |
| sidebar / sidebar-foreground | `#0c121e` / `#cbd5e1` |
| card, popover | `#111827` |
| muted, secondary, accent, sidebar-accent | `#182235` |
| sidebar-hover (item do menu sob o ponteiro) | `#142645` (texto `#f8fafc` com 14,41:1) |
| muted-foreground | `#94a3b8` (6,21:1 no muted, 6,92:1 no cartão, 7,69:1 no fundo) |
| primary / primary-foreground | `#61a6fa` / `#080c16` |
| destructive / destructive-foreground | `#f87171` / `#070b12` |
| highlight / highlight-foreground | `#1e3a8a` / `#ffffff` (10,36:1); degradê `#1e3a8a` → `#2547a8` (8,25:1), barra `#bfdbfe` → `#60a5fa` |
| institutional, avatar, online, theme-icon | `#fb7185` (selo e texto, 6,40:1), degradê do avatar igual ao do claro, `#10b981`, lua `#60a5fa` |
| success / warning (texto sobre eles: `#070b12`) | `#bbf7d0` / `#fef08a` |
| border | `rgba(255, 255, 255, 0.08)` |
| ring, sidebar-ring, sidebar-primary | `#61a6fa` (texto sobre sidebar-primary: `#080c16`) |
| gráficos | forte `#3b82f6 → #61a6fa`, suave `#4f78b8 → #7aa2dd` |
| tons dos ícones | a cor a 18% sobre a barra `#0c121e`, em hex, com os traços do CSS (5,93:1 ou mais): azul `#142645` + `#60a5fa`, verde `#0d3030` + `#34d399`, violeta `#231f45` + `#c4b5fd`, laranja `#37231d` + `#fdba74`, vermelho `#321426` + `#fb7185`, verde-água `#0d3036` + `#5eead4`, rosa `#341c34` + `#f9a8d4`, âmbar `#362b1b` + `#fcd34d` |
| logo surface | `#ffffff` |

## Typography

Uma família só: **Outfit**, servida pelo `next/font` como `--font-outfit` e lida pelo `--font-sans` da
camada. A altura de linha da casca é `normal`.

| Token | Tamanho | Peso | Uso |
| --- | --- | --- | --- |
| `{typography.page-title}` | 14px | 600 | Título da página no cabeçalho |
| `{typography.brand-name}` | 16px | 700 | Nome do sistema no topo da barra lateral, em negrito; a versão ao lado, em selo vermelho de fonte mono (10px) |
| `{typography.nav-item}` | 13.5px | 500 (ativo 600) | Itens do menu |
| `{typography.nav-group}` | 11px | 700 | Rótulo do grupo ("Plataforma", "Administração"), em maiúsculas e cinza |
| `{typography.tab}` | 13px | 500 | Abas da barra lateral |
| `{typography.button}` | 13px | 700 | Botões |
| `{typography.card-title}` | 16px | 700 | Título de cartão e de tabela |
| `{typography.body-md}` | 16px | 400 | Texto corrido e descrições |
| `{typography.table}` / `{typography.table-header}` | 13px | 400 / 700 | Células e cabeçalhos de tabela |
| `{typography.caption}` | 12px | 400 | Rodapé, perfil do usuário, texto da busca |
| `{typography.caption-strong}` | 12px | 600 | Nome do usuário, iniciais do avatar |
| `{typography.metric}` | 32px | 800 | Número do cartão de métrica (algarismos tabulares) |
| `{typography.kbd}` | 10px | 600 | "Ctrl K" na busca e "Ctrl B" no "Recolher", em fonte mono |

## Layout

- **Casca:** barra lateral de 268px (`{spacing.sidebar}`), recolhida em 76px por botão ou `Ctrl+B`,
  lembrada no navegador. Abaixo de 801px (`{spacing.breakpoint-desk}`) vira menu móvel sobreposto, sempre
  expandido, com as logos sob a marca; `Esc` fecha.
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
- **Cabeçalho, da esquerda para a direita:** ícone de seção de 28px e título com a seção à frente
  ("Plataforma / Dashboard", a seção a partir de 640px); tema (botão `chrome` de 36px); divisória; logos com 32px
  de altura, em caixas com borda e sombra (a partir de 640px); divisória; avatar de 32px em degradê com ponto
  verde, nome e perfil (a partir de 1280px), botão de sair (36px, com realce destrutivo).

## Elevation & Depth

Hierarquia por superfície e por sombras em camadas (os valores exatos estão em `styles/tema-mppa.css`):

- `shadow-surface` (`0 1px 3px rgba(15,23,42,.06), 0 1px 2px rgba(15,23,42,.04)` no claro; no escuro, sombra funda
  com brilho interno de 1px no topo): abas ativas, item ativo e busca aberta.
- `shadow-card` (`0 2px 8px -2px rgba(15,23,42,.05), 0 1px 3px -1px rgba(15,23,42,.03)` no claro; no escuro,
  `0 4px 20px -2px rgba(0,0,0,.5)` com brilho interno): cartões. `shadow-card-hover` (`0 14px 28px -6px
  rgba(15,23,42,.08), 0 4px 10px -2px rgba(15,23,42,.04)` no claro): cartão sob o mouse e diálogo da busca.
- `shadow-drawer` (`8px 0 24px rgba(0,0,0,.22)`): só no menu móvel aberto; `bg-overlay` a 40% atrás dele e a
  60% atrás da busca.
- As barras da casca não têm sombra: separam-se por borda de 1px; cabeçalho e rodapé são translúcidos (`--header`) com desfoque.
- Barras de gráfico com sombra leve (`0 1px 2px rgba(0,0,0,.08)`) e topo arredondado.

## Shapes

Tudo preso a `--radius` (8px):

- `{rounded.2xl}` 16px: cartões, tabelas, diálogo da busca.
- `{rounded.xl}` 12px: botões, itens do menu, busca, trilho das abas, selos de caixa.
- `{rounded.lg}` 8px: abas internas, ícones de seção, caixas das logos.
- `{rounded.md}` 6px: selo da versão, `kbd`, topo das barras de gráfico. `{rounded.xs}` 2px: base das barras de gráfico.
- `{rounded.full}`: avatar.
- Raio maior que 16px: não use em tela nova.

## Components

Os primitivos vêm de `components/tema-mppa` (`index.ts`); nunca recrie um nem edite a pasta.

**`AppShell`** (`app-header`, `app-sidebar`, `page-footer`): a casca inteira, configurada por um
`ShellConfig` do sistema. Recebe a sessão e o logout por propriedade; não chama API nem decide acesso. As
abas e os itens de administração só aparecem com `session.is_admin === true`.

**Menu** (`nav-item`, `nav-item-active`, `tab-active`): ícone de seção em caixa de 32px e rótulo; um só item
marcado, o de rota mais longa, que dá também o título e a aba aberta. Recolhido, só ícones com o rótulo
no `title`. Cartões com transição de 200ms e título com `tracking-tight`.

**Busca** (`search-box`, `command-palette`): caixa de 36px (raio de 12px) com lupa, "Buscar na página" e `Ctrl K` em `kbd` mono, fixa
na barra lateral logo acima do "Recolher", na largura da barra (padding de 10px); com a barra recolhida, só
a lupa; no celular, no menu móvel. `Ctrl K` abre a lista das páginas do menu, com nome e descrição; o filtro
aceita o nome ou a descrição, sem acento. O diálogo vai para o `<body>` por portal.

**`Button`** (`button-primary`, `button-secondary`, `button-ghost`, `button-chrome`, `button-destructive`): 36px de altura,
peso 700, raio de 12px; ícone de 36px (`size-9`), mais a variante `chrome` (borda, fundo do cartão, sombra leve), usada no tema e no menu móvel. Link com cara de botão: `buttonVariants`.

**`Card` / `MetricCard` / `CardGrid`** (`card`, `metric-card`): raio de 16px, padding de 24px, borda e sombra
`shadow-card`; métrica com número de 32px peso 800 e nota opcional.

**`DataTable`** (`data-table`, `data-table-header`): título opcional com ações, células de 13px com padding
12px × 16px, cabeçalho em negrito, mensagem de vazio.

**`BarChart`** (`chart-bar-strong-base`/`-top`, `chart-bar-soft-base`/`-top`): 165px de altura, barras
de até 90px de largura com degradê da base ao topo, variante forte (azul) ou suave (azul claro), com
rótulo para leitor de tela.

**Rodapé padrão** (`page-footer`): "Desenvolvido pelo Ministério Público do Estado do Pará - Escritório de
Inteligência Artificial - Nome - V x.y.z - Ano", montado por `footerText(brand)`, com o órgão em negrito e o
nome do sistema no vermelho institucional, nunca cortado; na casca e
nas páginas públicas que têm rodapé.

**`ThemeScript`**: o script de tema no `<head>` do layout raiz, com o `nonce` da CSP quando houver.

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
- **Don't** use `text-primary` sobre `bg-primary/15` ou mais: o par cai abaixo de 7:1 no claro (6,59:1 sobre o
  fundo, 6,45:1 sobre o muted). Com `bg-primary/10` passa (7,18:1 sobre o fundo, 7,68:1 sobre o cartão,
  7,04:1 sobre o muted); nos demais casos use o texto
  principal e deixe a primária no ícone ou na borda.
- **Don't** deduza administrador por e-mail, nome ou rótulo de perfil; só o booleano da sessão real.
- **Don't** importe o `ThemeProvider` para pôr o script de tema: use `<ThemeScript nonce={nonce} />`.
- **Don't** acrescente raio maior que 16px nem sombra mais forte que `shadow-card-hover` em tela nova.
