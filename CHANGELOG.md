# Changelog

## 1.1.1 — 2026-11-10

O modelo passa a servir para ser entregue a um agente: basta colocar o zip no codebase consumidor e pedir
que ele replique a interface. Sem mudança visual nem de API na camada.

- `REPLICAR.md` na raiz: roteiro para o agente do consumidor, com:
  - escopo (o que replicar e o que não tocar);
  - escolha entre copiar e portar, conforme a stack;
  - dependências, CSS global, layout raiz, configuração do shell, sessão e telas;
  - tabela do código de cores, estrutura com medidas;
  - verificação, limpeza e o trecho para o `AGENTS.md` do consumidor.
- `scripts/copy-template.mjs`:
  - detecta se o consumidor usa `src/` (grava em `components/` e `styles/` quando não usa);
  - aceita `--components-dir` e `--styles-dir`;
  - copia para `docs/tema-mppa/` do consumidor o guia, a configuração, o CHANGELOG, o protótipo, a prévia
    e as comparações;
  - recusa o próprio modelo como destino.
- README e `AGENTS.md` do modelo apontam o agente do consumidor para o `REPLICAR.md`.
- Repositório enxuto:
  - saem o backup antigo `.backup-alinhamento-*`, o `postcss.config.mjs.backup-*`, o `tsconfig.tsbuildinfo`
    (agora ignorado) e o `.env.example`;
  - saem `docs/INSTALACAO`, `INTEGRACAO`, `ATUALIZACAO`, `CONFIGURACAO`, `VALIDACAO` e
    `docs/comparacao/README`, cujo conteúdo foi para o `REPLICAR.md` e o README;
  - as ferramentas de prévia e captura vão para `scripts/`.
- `npm run empacotar` (`scripts/empacotar.mjs`) gera o zip só com o que o agente do consumidor usa:
  - `REPLICAR.md`, CHANGELOG e licença;
  - camada visual, `tema-mppa.css` e script de cópia;
  - protótipo, prévia e comparações.

  A demonstração Next.js fica fora do zip.
- `tema-mppa.css` passa a trazer a base do `html`/`body` (fundo, cor do texto, fonte Outfit, suavização e
  movimento reduzido): o CSS global do consumidor precisa só do `@import` e do `@custom-variant`. O
  `globals.css` da demonstração ficou reduzido a isso.
- `PageFrame`: `children` opcional, para páginas só com descrição e ações.
- `class-variance-authority` `0.7.1` e `clsx` `2.1.1` também com versão exata.
- Testado às cegas: um agente sem contexto, só com a frase do README, integrou o modelo num consumidor
  Next.js sem `src/` (typecheck, lint e build aprovados, tela igual à do modelo). Os pontos em que ele
  precisou adivinhar foram respondidos no `REPLICAR.md`:
  - route group para páginas públicas;
  - campos opcionais da marca e da sessão;
  - referência dos primitivos;
  - ordem do conteúdo;
  - o que fazer sem navegador;
  - `.gitignore`;
  - criação do `AGENTS.md`.

## 1.1.0 — 2026-11-10

Correção visual: a 1.0.0 não reproduzia o protótipo aprovado (`docs/prototipo/index.html`, "Template
Visual HubIA v1.0") nem o guia oficial ("Raio de 8 px, bordas suaves, sombras discretas e gráficos com
degradê"; "Título exibido uma única vez, no cabeçalho"). O protótipo manda em todo elemento gráfico.
Comparação lado a lado, nos dois temas, em 1280px e 390px: `docs/comparacao/`.

### Tokens (`src/styles/tema-mppa.css`), claro e escuro

- Raio de 8px (`--radius: 0.5rem`); abas internas e ícones de seção a 6px (`rounded-md`); avatar redondo.
- Escala de raio inteira (`xs` a `4xl`) presa a `--radius`: `xs` 2px, `sm` 4px, `md` 6px, `lg` 8px, `xl` 12px,
  `2xl` 16px, `3xl` 24px, `4xl` 32px.
- Sombra do protótipo como token `--shadow` (claro `0 2px 6px …/.08, 0 1px 2px …/.05`; escuro
  `0 2px 8px …/.3, 0 1px 2px …/.2`), utilitário `shadow-surface`, aplicada a cartão, aba ativa e item ativo.
  Também `--bar-shadow` (barras) e `--drawer-shadow` (menu móvel).
- Fundos: página `#fff` e cartão `#fafafa` (escuro `#09090b` e `#18181b`); barra lateral `#fcfcfc` (escuro
  `#18181b`); muted `#f4f4f5` (escuro `#27272a`).
- Borda `#d4d4d8` (escuro `rgba(255,255,255,.12)`).
- Realce do ativo em token novo, `--highlight`: `#fee2e2` (escuro `#351518`).
- Tokens novos: `--overlay` (sobreposições, `bg-overlay/40` e `/60`), `--logo-surface` (fundo das logos),
  `--success` e `--warning`, tons de ícone (`--tone-red|green|violet|orange` e `-foreground`), degradês dos
  gráficos (`--chart-strong-*`, `--chart-soft-*`) e do símbolo (`--brand-mark-*`).
- Valores em hex, como no protótipo, no lugar de OKLCH.
- `--font-mono` passa a `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`, sem Geist Mono; o layout de
  demonstração deixa de carregar a Geist.
- Variante `desk:` (a partir de 801px), o ponto de quebra do protótipo.
- Regra de base com a cor da borda no token, para a camada funcionar sem o `globals.css` do modelo.
- Utilitários `tm-bar`, `tm-bar-strong`, `tm-bar-soft` e `tm-brand-mark`.

### Contraste

Regra fixa dos consumidores: no claro, todo texto com 7:1 sobre o próprio fundo e texto secundário igual
ao principal; no escuro, 4,5:1 e texto escuro sobre a primária. O verificador estrutural recalcula cada
par a partir do CSS.

| Elemento | Protótipo | 1.1.0 |
| --- | --- | --- |
| Primária (claro) | `#b91c1c`, 6,47:1 com branco | `#9f0712`, 8,36:1 |
| Texto vermelho sobre `#fee2e2` | `#b91c1c`, 5,30:1 | `#970611`, 7,32:1 |
| Texto secundário (claro) | `#71717a`, 4,83:1 | `#18181b`, o preto do texto |
| Ícone verde sobre `#d1fae5` | `#059669`, 3,32:1 | `#047857`, 4,84:1 |
| Ícone violeta sobre `#ede9fe` | `#7c3aed`, 4,80:1 | sem mudança |
| Ícone laranja sobre `#ffedd5` | `#d97706`, 2,78:1 | `#a85005`, 4,80:1 |
| Primária (escuro) | `#b91c1c` com branco | `#ef4444` com `#09090b`, 5,29:1 |
| Destrutiva | — | `#991b1b` com branco, 8,31:1; escuro `#f87171` com `#09090b`, 7,19:1 |
| Sucesso / alerta (claro) | — | `#15603a` / `#7a4510` com branco, acima de 7:1 |

No escuro, os ícones de seção continuam pastéis, como no protótipo.

### Componentes iguais ao protótipo

- Abas em trilho `muted` com raio 8px e padding 3px; abas de 32px a 6px; aba ativa com realce e sombra.
- Item de menu com raio 8px, ícone e texto a 10px, 5px entre itens; ativo com realce e sombra.
- Ícone de seção de 28px, raio 6px, com `tone` por item: `"red" | "green" | "violet" | "orange"`. Classes
  soltas, como na 1.0.0, continuam aceitas.
- Barra lateral de 260px; marca com nome, versão e subtítulo; rodapé "Recolher" com botão de 34px.
- Cabeçalho de 56px com fundo sólido, sem transparência nem desfoque; busca com borda, fundo do cartão e
  raio 8px (quadrado de 34px abaixo de 801px); avatar redondo de 30px.
- O avatar abre um painel (Base UI Popover) com nome, e-mail, perfil e "Sair": o cabeçalho mostra só o
  avatar, como no protótipo.
- Botões com raio 8px e peso 700: primário cheio, secundário com borda sobre o cartão; `outline` vira
  sinônimo de `secondary`; nova variante `destructive`; botão de ícone de 34px.
- Cartão com borda, raio, sombra e padding 20px; métrica de 32px peso 800.
- Tabela com cabeçalho em texto secundário e linhas com borda; rola dentro do cartão.
- Barras de gráfico com degradê, topo arredondado (6px), até 90px de largura e 18px de altura mínima.
- Conteúdo com padding 38px (22px/14px no celular), largura máxima de 1500px, 38px entre a descrição e o
  conteúdo e 20px entre cartões; altura de linha `normal`, como no protótipo.
- Título só no cabeçalho, uma vez, como `<h1>`: `PageFrame` não aceita mais `title`, `icon` nem `tone`
  (mudança que quebra quem os usava; o título vem do item de navegação, inclusive dos `hidden`). O cabeçalho
  deixa de repetir "Administração ›" antes do item.

### Primitivos exportados

`PageFrame`, `Card`, `CardGrid`, `MetricCard`, `DataTable`, `BarChart`, `Button` e `SectionIcon`, para os
consumidores pintarem as próprias telas só com eles. Também `ThemeToggle`, `THEME_STORAGE_KEY`,
`SIDEBAR_STORAGE_KEY`, `cn`, `currentNavigationItem`, `canSeeAdministration`, `isNavigationActive` e os tipos
`NavigationTone`, `NavigationSection`, `CurrentNavigation`, `DataTableColumn`, `BarChartDatum`, `ButtonProps`
e `Theme`. A demonstração usa só esses primitivos.

### Ajustes que os consumidores fizeram na 1.0.0

- `AppShell` aceita `footer`, exibido abaixo do conteúdo.
- Topo da barra lateral, cabeçalho e rodapé da barra com a mesma altura (56px).
- `NavigationItem` ganha `description` (mostrada e filtrada pela busca), `matches` (rotas que marcam o item)
  e `hidden` (fora do menu e da busca, mas dá o título e a aba). Um só item fica marcado: o de rota mais
  longa, o mesmo do título e da aba aberta (`currentNavigationItem`).
- Sobreposição do menu móvel e da busca em `bg-overlay`; fundo das logos em `bg-logo-surface`, no lugar do
  preto e do branco fixos.
- Barra recolhida no `localStorage` (`tema-mppa-sidebar-collapsed`); sem armazenamento, só na memória da
  página.
- `Esc` fecha o menu móvel; o menu móvel abre sempre expandido, mesmo com a barra recolhida.
- Abas só com `is_admin === true` e algum item administrativo visível; a busca e o título seguem a mesma
  regra (`canSeeAdministration`).
- Abaixo de 640px, as logos do cabeçalho aparecem no menu móvel, abaixo da marca.
- `ImageSlot` compila com `strict` sem asserção não nula.
- `<kbd>` da busca em `font-sans`.

### Dependências

Versões exatas da matriz do ecossistema: React e React DOM `19.2.3`, Lucide React `1.46.0`, TanStack Query
`5.102.8`, tailwind-merge `3.6.0` e `@base-ui/react` `1.9.0`. Next.js `16.3.5`, TypeScript `5.9.3` e Tailwind
CSS `4.3.3` sem mudança.

### Modelo e documentação

- Protótipo aprovado incluído em `docs/prototipo/index.html`, para o zip bastar como fonte.
- Comparações lado a lado em `docs/comparacao/`.
- Prévia offline e autocontida em `docs/preview/index.html`, no papel do `index.html` da 1.0, capturada do
  build de produção (`docs/preview/gerar-preview.mjs`).
- `verify-template` confere os pinos, os tokens do protótipo, os contrastes, a ausência de cor fixa e de
  canto reto nos componentes, o título único e os primitivos exportados.
- README e `docs/` atualizados.

## 1.0.0 — 2026-11-09

- template migrado para Next.js 16 App Router e React 19;
- shell visual configurável com sidebar recolhível;
- abas Plataforma/Administração condicionadas a `is_admin=true`;
- cabeçalho, breadcrumb, busca, tema e identidade do usuário;
- paleta Marvel Red/Zinc, Outfit e cantos retos;
- imagens opcionais sem ícone quebrado;
- integração por propriedades, sem autenticação, BFF, API ou regra de negócio;
- script de cópia/atualização com backup;
- documentação de instalação, configuração, integração e atualização.
