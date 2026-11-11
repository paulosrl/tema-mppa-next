---
version: alpha
name: "Tema MPPA · camada visual"
description: >-
  Camada visual comum dos sistemas do Escritório de Inteligência Artificial do Ministério Público do Estado do
  Pará (modelo tema-mppa-next): vermelho institucional sobre Zinc, fonte Outfit, raio de 8px, sombras
  discretas, barra lateral de 260px com abas Plataforma e Administração, cabeçalho de 56px e rodapé padrão.
  Texto sobre superfície neutra com 12:1 nos dois temas (secundário e status inclusive) e texto sobre
  preenchimento colorido com 4,5:1. Os valores
  abaixo são os do tema claro; os do escuro estão em "Colors". A fonte da verdade é styles/tema-mppa.css.

colors:
  primary: "#9f0712"
  primary-foreground: "#ffffff"
  background: "#ffffff"
  foreground: "#18181b"
  card: "#fafafa"
  card-foreground: "#18181b"
  popover: "#fafafa"
  popover-foreground: "#18181b"
  secondary: "#f4f4f5"
  muted: "#f4f4f5"
  muted-foreground: "#18181b"
  accent: "#f4f4f5"
  accent-foreground: "#18181b"
  highlight: "#fee2e2"
  highlight-foreground: "#18181b"
  destructive: "#991b1b"
  destructive-foreground: "#ffffff"
  success: "#08351f"
  warning: "#432506"
  border: "#d4d4d8"
  ring: "#9f0712"
  overlay: "#000000"
  logo-surface: "#ffffff"
  sidebar: "#fcfcfc"
  sidebar-foreground: "#18181b"
  sidebar-accent: "#f4f4f5"
  sidebar-accent-foreground: "#18181b"
  tone-red: "#fee2e2"
  tone-red-foreground: "#970611"
  tone-green: "#d1fae5"
  tone-green-foreground: "#047857"
  tone-violet: "#ede9fe"
  tone-violet-foreground: "#7c3aed"
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
  chart-strong-from: "#b50008"
  chart-strong-to: "#ff2935"
  chart-soft-from: "#eb777d"
  chart-soft-to: "#ff9da2"

typography:
  page-title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
  brand-name:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    letterSpacing: -0.025em
  nav-item:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 600
  nav-group:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 700
  tab:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 650
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
  full: 9999px

spacing:
  shell-bar: 56px
  sidebar: 260px
  sidebar-collapsed: 64px
  breakpoint-desk: 801px
  content: 38px
  content-mobile-y: 22px
  content-mobile-x: 14px
  content-max: 1500px
  card: 20px
  grid-gap: 20px
  item-y: 7px
  item-x: 8px
  item-gap: 10px
  item-stack: 5px
  tab-height: 32px
  tab-rail: 3px
  button-height: 36px
  icon-button: 34px
  section-icon: 28px
  title-icon: 24px
  avatar: 32px
  search-width: 224px
  logo-height: 28px
  chart-height: 165px
  chart-bar-max: 90px

components:
  app-header:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.page-title}"
    height: 56px
    padding: "0px 16px"
  app-sidebar:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    typography: "{typography.nav-item}"
    width: 260px
  app-sidebar-collapsed:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    width: 64px
  sidebar-brand:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    typography: "{typography.brand-name}"
    height: 56px
  nav-item:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    typography: "{typography.nav-item}"
    rounded: "{rounded.lg}"
    padding: "7px 8px"
  nav-item-hover:
    backgroundColor: "{colors.sidebar-accent}"
    textColor: "{colors.sidebar-accent-foreground}"
    rounded: "{rounded.lg}"
  nav-item-active:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.highlight-foreground}"
    typography: "{typography.nav-item}"
    rounded: "{rounded.lg}"
    padding: "7px 8px"
  nav-group-label:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    typography: "{typography.nav-group}"
  tab-rail:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.sidebar-foreground}"
    rounded: "{rounded.lg}"
    padding: 3px
  tab-active:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.highlight-foreground}"
    typography: "{typography.tab}"
    rounded: "{rounded.md}"
    height: 32px
  section-icon-red:
    backgroundColor: "{colors.tone-red}"
    textColor: "{colors.tone-red-foreground}"
    rounded: "{rounded.md}"
    size: 28px
  section-icon-green:
    backgroundColor: "{colors.tone-green}"
    textColor: "{colors.tone-green-foreground}"
    rounded: "{rounded.md}"
    size: 28px
  section-icon-violet:
    backgroundColor: "{colors.tone-violet}"
    textColor: "{colors.tone-violet-foreground}"
    rounded: "{rounded.md}"
    size: 28px
  section-icon-orange:
    backgroundColor: "{colors.tone-orange}"
    textColor: "{colors.tone-orange-foreground}"
    rounded: "{rounded.md}"
    size: 28px
  section-icon-blue:
    backgroundColor: "{colors.tone-blue}"
    textColor: "{colors.tone-blue-foreground}"
    rounded: "{rounded.md}"
    size: 28px
  section-icon-teal:
    backgroundColor: "{colors.tone-teal}"
    textColor: "{colors.tone-teal-foreground}"
    rounded: "{rounded.md}"
    size: 28px
  section-icon-pink:
    backgroundColor: "{colors.tone-pink}"
    textColor: "{colors.tone-pink-foreground}"
    rounded: "{rounded.md}"
    size: 28px
  section-icon-amber:
    backgroundColor: "{colors.tone-amber}"
    textColor: "{colors.tone-amber-foreground}"
    rounded: "{rounded.md}"
    size: 28px
  search-box:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.lg}"
    height: 32px
    width: 224px
  command-palette:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
  avatar:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.full}"
    size: 32px
  logo-chip:
    backgroundColor: "{colors.logo-surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    height: 28px
    padding: "2px 6px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: 36px
    padding: "0px 13px"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: 36px
    padding: "0px 13px"
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    size: 34px
  button-ghost-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.lg}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: 36px
    padding: "0px 13px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 20px
  card-title:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.card-title}"
  metric-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.metric}"
    rounded: "{rounded.lg}"
    padding: 20px
  data-table:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.table}"
    rounded: "{rounded.lg}"
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
    height: 56px
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
pessoa, inclusive com baixa visão. Por isso todo texto sobre superfície neutra tem 12:1 ou mais nos dois
temas, e no claro todo texto é preto.

A identidade vem de três escolhas:

- **Um vermelho institucional** (`{colors.primary}`, `#9f0712`) para a ação principal, o foco e o
  realce; o resto é Zinc neutro. O protótipo usava `#b91c1c`, escurecido para passar de 7:1 com branco.
- **Outfit** em todo texto, geométrica e calma, com pesos fortes (650 a 800) nos rótulos e nas métricas.
- **Raio de 8px e sombra discreta** em cartões, botões, itens e abas ativos: superfícies macias, sem
  exagero.

**Características principais:**

- Casca única em todos os sistemas: barra lateral de 260px (64px recolhida) com abas Plataforma e
  Administração, cabeçalho de 56px, conteúdo com padding de 38px e largura máxima de 1500px, rodapé padrão
  fixo no pé da tela, na faixa do "Recolher".
- Título da página só no cabeçalho, vindo do item marcado no menu; nenhum título repetido no conteúdo.
- Ícones de seção Lucide, num quadrado de 28px com fundo pastel e traço do mesmo tom (vermelho, verde,
  violeta, laranja, revezados).
- Busca `Ctrl K` com as páginas que cada usuário pode ver.
- Tema claro, escuro e sistema; toda entrada abre em claro e a escolha vale só para a aba.

## Colors

### Marca e ação

- **Primary** (`{colors.primary}`, `#9f0712`): botão primário, foco (`ring`), barra de gráfico forte.
  Texto branco sobre ela (8,36:1). No escuro, `#ef4444` com texto `#09090b`.
- **Destructive** (`{colors.destructive}`, `#991b1b`): ação destrutiva, com texto branco.
- **Highlight** (`{colors.highlight}`, `#fee2e2`): fundo do item e da aba ativos, com texto preto e sombra.

### Superfícies e texto

- **Background** (`#ffffff`): página e cabeçalho. **Card** (`#fafafa`): cartões, botão secundário, caixa de
  busca. **Sidebar** (`#fcfcfc`): barra lateral. **Muted** (`#f4f4f5`): trilho das abas, avatar, áreas
  neutras.
- **Foreground** (`#18181b`): todo texto. **Muted foreground** é o mesmo `#18181b` no claro: o texto
  secundário (menus, descrições, rótulos, rodapé, cabeçalhos de tabela) é preto, sem cinza.
- **Border** (`#d4d4d8`): toda borda, inclusive a da barra lateral, para as linhas da barra e do conteúdo
  coincidirem.
- **Logo surface** (`#ffffff` nos dois temas): fundo das logos institucionais.

### Status e tons

- **Success** (`#08351f`) e **Warning** (`#432506`): status, com 12:1 ou mais sobre toda superfície neutra
  (12,41:1 e 12,69:1 sobre o muted).
- **Tons dos ícones de seção:** vermelho `#fee2e2` + `#970611`, verde `#d1fae5` + `#047857`, violeta
  `#ede9fe` + `#7c3aed`, laranja `#ffedd5` + `#a85005`, e mais quatro para menus com mais de quatro itens:
  azul `#dbeafe` + `#1d4ed8`, verde-água `#ccfbf1` + `#0f766e`, rosa `#fce7f3` + `#be185d` e âmbar
  `#fef3c7` + `#92400e`; todos com 4,5:1 ou mais e iguais nos dois temas.
- **Gráficos:** degradê forte `#b50008 → #ff2935` e suave `#eb777d → #ff9da2` (`tm-bar-strong`,
  `tm-bar-soft`); são elementos gráficos, sem texto.
- **Símbolo padrão** (`tm-brand-mark`, 32px): degradê `#ef3340 → #7f1d1d` com a inicial em branco, peso 800.
  É marca, não texto corrido; fica fora dos tokens acima.

### Tema escuro

O formato não tem modos; os valores do escuro ficam aqui. Texto sobre superfície neutra com 12:1 ou mais;
texto sobre preenchimento colorido com 4,5:1.

| Token | Escuro |
| --- | --- |
| background / foreground | `#09090b` / `#fafafa` |
| card, popover, sidebar | `#18181b` |
| muted, secondary, accent, sidebar-accent | `#27272a` |
| muted-foreground | `#f4f4f5` (13,55:1 no muted) |
| primary / primary-foreground | `#ef4444` / `#09090b` |
| destructive / destructive-foreground | `#f87171` / `#09090b` |
| highlight / highlight-foreground | `#351518` / `#fafafa` |
| success / warning (texto sobre eles: `#09090b`) | `#bbf7d0` / `#fef08a` |
| border | `rgba(255, 255, 255, 0.12)` |
| ring | `#ef4444` |
| tons dos ícones, gráficos, logo surface | iguais ao claro |

## Typography

Uma família só: **Outfit**, servida pelo `next/font` como `--font-outfit` e lida pelo `--font-sans` da
camada. A altura de linha da casca é `normal`.

| Token | Tamanho | Peso | Uso |
| --- | --- | --- | --- |
| `{typography.page-title}` | 14px | 500 | Título da página no cabeçalho |
| `{typography.brand-name}` | 16px | 600 | Nome do sistema no topo da barra lateral; a versão ao lado em 12px |
| `{typography.nav-item}` | 13px | 600 | Itens do menu |
| `{typography.nav-group}` | 13px | 700 | Rótulo do grupo ("Plataforma", "Administração") |
| `{typography.tab}` | 13px | 650 | Abas da barra lateral |
| `{typography.button}` | 13px | 700 | Botões |
| `{typography.card-title}` | 16px | 700 | Título de cartão e de tabela |
| `{typography.body-md}` | 16px | 400 | Texto corrido e descrições |
| `{typography.table}` / `{typography.table-header}` | 13px | 400 / 700 | Células e cabeçalhos de tabela |
| `{typography.caption}` | 12px | 400 | Rodapé, perfil do usuário, texto da busca |
| `{typography.caption-strong}` | 12px | 600 | Nome do usuário, iniciais do avatar |
| `{typography.metric}` | 32px | 800 | Número do cartão de métrica (algarismos tabulares) |
| `{typography.kbd}` | 10px | 600 | "Ctrl K" na busca |

## Layout

- **Casca:** barra lateral de 260px (`{spacing.sidebar}`), recolhida em 64px por botão ou `Ctrl+B`,
  lembrada no navegador. Abaixo de 801px (`{spacing.breakpoint-desk}`) vira menu móvel sobreposto, sempre
  expandido, com as logos sob a marca; `Esc` fecha.
- **Faixas de 56px** (`{spacing.shell-bar}`): topo da barra lateral (marca), cabeçalho, faixa "Recolher" e
  rodapé têm a mesma altura e a mesma borda, alinhadas sem diferença de pixel.
- **Conteúdo:** padding de 38px (22px × 14px no celular), largura máxima de 1500px; sem rolagem horizontal
  em 390px.
- **Ordem do conteúdo** (`PageFrame`): descrição e ações no topo, 38px abaixo as métricas (`CardGrid` de
  `MetricCard`), depois cartões com gráficos, depois tabelas; 20px entre cartões; uma coluna abaixo de
  801px; as ações ocupam a largura toda no celular.
- **Menu:** item com padding 7px × 8px, 10px entre ícone e texto, 5px entre itens; abas de 32px num trilho
  com padding de 3px.
- **Cabeçalho, da esquerda para a direita:** ícone de seção de 24px e título; busca de 224px × 32px (só a
  lupa abaixo de 640px); tema (34px); divisória; logos com 28px de altura (a partir de 640px); divisória;
  avatar de 32px, nome e perfil (a partir de 1280px), botão de sair (34px).

## Elevation & Depth

Hierarquia por superfície e por uma sombra única, discreta:

- `shadow-surface`: `0 2px 6px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)` no claro e
  `0 2px 8px rgba(0,0,0,.3), 0 1px 2px rgba(0,0,0,.2)` no escuro, em cartões, item e aba ativos e na busca
  aberta.
- `shadow-drawer` (`8px 0 24px rgba(0,0,0,.2)`): só no menu móvel aberto; `bg-overlay` a 40% atrás dele e a
  60% atrás da busca.
- As barras da casca não têm sombra: separam-se por borda de 1px.
- Barras de gráfico com sombra leve (`0 1px 2px rgba(0,0,0,.08)`) e topo arredondado.

## Shapes

Tudo preso a `--radius` (8px):

- `{rounded.lg}` 8px: cartões, botões, itens do menu, busca, trilho das abas.
- `{rounded.md}` 6px: abas internas, ícones de seção, topo das barras de gráfico.
- `{rounded.sm}` 4px: fundo das logos. `{rounded.xs}` 2px: tecla "Ctrl K", base das barras de gráfico.
- `{rounded.full}`: avatar.
- `{rounded.xl}` 12px e acima: não use em tela nova.

## Components

Os primitivos vêm de `components/tema-mppa` (`index.ts`); nunca recrie um nem edite a pasta.

**`AppShell`** (`app-header`, `app-sidebar`, `page-footer`): a casca inteira, configurada por um
`ShellConfig` do sistema. Recebe a sessão e o logout por propriedade; não chama API nem decide acesso. As
abas e os itens de administração só aparecem com `session.is_admin === true`.

**Menu** (`nav-item`, `nav-item-active`, `tab-active`): ícone de seção de 28px e rótulo; um só item
marcado, o de rota mais longa, que dá também o título e a aba aberta. Recolhido, só ícones com o rótulo
no `title`.

**Busca** (`search-box`, `command-palette`): `Ctrl K` abre a lista das páginas do menu, com nome e
descrição; o filtro aceita o nome ou a descrição, sem acento.

**`Button`** (`button-primary`, `button-secondary`, `button-ghost`, `button-destructive`): 36px de altura,
peso 700, raio de 8px; ícone de 34px. Link com cara de botão: `buttonVariants`.

**`Card` / `MetricCard` / `CardGrid`** (`card`, `metric-card`): padding de 20px, borda e sombra de
superfície; métrica com número de 32px peso 800 e nota opcional.

**`DataTable`** (`data-table`, `data-table-header`): título opcional com ações, células de 13px com padding
12px × 16px, cabeçalho em negrito, mensagem de vazio.

**`BarChart`** (`chart-bar-strong-base`/`-top`, `chart-bar-soft-base`/`-top`): 165px de altura, barras
de até 90px de largura com degradê da base ao topo, variante forte (vermelha) ou suave (rosada), com
rótulo para leitor de tela.

**Rodapé padrão** (`page-footer`): "Desenvolvido pelo Ministério Público do Estado do Pará - Escritório de
Inteligência Artificial - Nome - V x.y.z - Ano", montado por `footerText(brand)`, nunca cortado; na casca e
nas páginas públicas que têm rodapé.

**`ThemeScript`**: o script de tema no `<head>` do layout raiz, com o `nonce` da CSP quando houver.

## Do's and Don'ts

- **Do** pinte só com tokens (`bg-card`, `text-muted-foreground`, `border`…); nunca `#hex`, `rgb()`,
  `bg-white` ou `text-gray-*` nas telas.
- **Do** mantenha o texto preto no tema claro, inclusive o secundário, e confira 12:1 em texto sobre
  superfície neutra nos dois temas (4,5:1 sobre preenchimento colorido).
- **Do** ponha o título só no cabeçalho, vindo do item de navegação; uma rota fora do menu ganha um item com
  `hidden: true`, e uma rota de detalhe passa o nome do registro ao `title` do `AppShell`.
- **Do** entre o que é do sistema por configuração (`ShellConfig`, tokens próprios no CSS do sistema).
- **Don't** edite `components/tema-mppa/` nem `styles/tema-mppa.css`: o `verificar-camada.mjs` reprova.
  Necessidade que a camada não atende volta ao modelo `tema-mppa-next`.
- **Don't** use `text-primary` sobre `bg-primary/10` em texto: o par fica abaixo de 7:1 (cerca de 6,7:1 sobre
  o cartão e 6,9:1 sobre o fundo). Use o texto principal e deixe a primária no ícone ou na borda.
- **Don't** deduza administrador por e-mail, nome ou rótulo de perfil; só o booleano da sessão real.
- **Don't** importe o `ThemeProvider` para pôr o script de tema: use `<ThemeScript nonce={nonce} />`.
- **Don't** acrescente raio maior que 8px nem sombra forte em tela nova.
