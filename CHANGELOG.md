# Changelog

## 1.5.0 — 2026-11-10

Procedimento padrão para levar o modelo a codebases antigos, com o que o planejamento do Heimdall (o
primeiro consumidor antigo) mostrou. A aparência e a API da camada não mudam.

- **Fases:** o `REPLICAR.md` passa a trabalhar em fases, cada uma uma entrega: 0. Diagnóstico (só lê e para
  para o desenvolvedor decidir), 1. Casca, 2. Telas (aos poucos), 3. Limpeza, e a atualização para uma
  versão nova. Num consumidor novo, as fases 1 e 2 podem ir juntas.
- **Diagnóstico:** novo formulário `DIAGNOSTICO.md`, que o agente preenche sem mudar nada: stack, estrutura,
  processo do projeto, casca, menus, sessão, marca, tema, rodapé, tokens, testes afetados, conflitos com o
  padrão e o plano por fase.
- **Processo do consumidor:** o agente segue as regras dele (OpenSpec, padrão de branch e de commit,
  testes); a branch `feat/interface-tema-mppa` vale só para quem não tem padrão. Conflitos com o padrão
  visual vão ao desenvolvedor.
- **Monorepo:** a raiz do consumidor é a pasta do `package.json` do frontend; o roteiro e o script dizem isso.
- **Lista de conferência da camada:** o `copy-template.mjs` grava `docs/tema-mppa/camada.json` (versão e
  SHA-256 de cada arquivo) e copia o `verificar-camada.mjs`, que reprova arquivo editado, ausente ou a mais.
  Na atualização com `--force`, o script avisa quais arquivos estavam editados.
- **CSP:** o exemplo do layout raiz passa o `nonce` ao script de tema.
- **Tokens próprios do consumidor:** tabela para mapear cada um (apontar para o token da camada, manter
  com valor completo e contraste conferido, ou remover).
- **Testes do layout antigo:** seção própria na Fase 1, com o mínimo a cobrir.
- **Rodapé fora da casca:** páginas públicas com rodapé usam `footerText` com a mesma marca.
- **Retorno ao modelo:** ao fim de cada fase, o agente lista o que o roteiro não previu.
- **`verify-template`:** confere o `REPLICAR.md` na versão, o zip com o diagnóstico e o verificador, e faz uma
  cópia de verdade num consumidor descartável (camada intacta aprovada, editada reprovada).

### Ao atualizar de 1.4.x

Nada muda na camada. Rode o `copy-template.mjs --force` para ganhar a lista de conferência e o verificador,
e troque a versão na seção "Interface" do `AGENTS.md`.

## 1.4.2 — 2026-11-10

Correções da terceira revisão de código. A aparência não muda.

- **Node mínimo volta a 22.0** (`engines`): o `verify-template` transpila `utils.ts` com o TypeScript do
  projeto em vez de depender do TypeScript nativo do Node 22.18.
- **`verify-template`:**
  - procura a propriedade `footer` pela árvore do TypeScript, no componente e na declaração inteira de
    `AppShellProps`: comentários, textos com `//` e tipos aninhados não escondem mais nada;
  - confere que `--shell-bar: 3.5rem` está definido em `:root`, não só que as classes o usam;
  - confere que o título da prévia traz a versão do pacote.
- **Prévia:** `gerar-preview.mjs` lê a versão do `package.json`; o título deixa de dizer v1.1.0.

## 1.4.1 — 2026-11-10

Correções da segunda revisão de código do rodapé. A aparência não muda.

- **Texto institucional nunca cortado:** sai o limite de 3 linhas (`line-clamp`) e a dica no `title`. Até 3
  linhas cabem em 56px; com um nome muito longo, o rodapé cresce em vez de esconder texto.
- **Uma altura para as faixas:** token `--shell-bar` (56px), usado pelo cabeçalho, pela marca, pelo
  "Recolher" e pelo rodapé (`h-(--shell-bar)`), no lugar de quatro `h-14` soltos.
- **Uma borda para as faixas:** `--sidebar-border` passa a ser `var(--border)` nos dois temas, e o rodapé
  usa a mesma borda do "Recolher". O valor não muda.
- **Nome ausente:** `footerText` aguenta `brand.name` vazio ou ausente (sistemas em JavaScript ou com
  configuração lida em tempo de execução) sem derrubar o shell; a parte vazia sai do texto.
- **`verify-template`:**
  - falha, em vez de só avisar, quando não consegue executar `footerText`;
  - procura qualquer menção à propriedade `footer` no tipo e no componente;
  - proíbe cortar o texto do rodapé;
  - confere o token de altura nas faixas e a versão do `package-lock.json`;
  - testa cinco casos.
- **Node mínimo 22.18** (`engines`), a primeira versão 22 que executa TypeScript sem configuração.
- **`package-lock.json`** volta a ter a versão do `package.json`.

## 1.4.0 — 2026-11-10

Correções do rodapé da 1.3.0, apontadas na revisão de código. A aparência do resto da interface não muda.

- **Sempre alinhado ao "Recolher":** a partir de 801px, o rodapé fica fixo no pé da tela (`sticky`), na
  mesma linha do "Recolher" também em páginas longas. Antes, só se alinhava quando o conteúdo era curto.
- **Altura fixa de 56px no desktop** (`h-14`), com o texto limitado a 3 linhas; o texto completo aparece
  ao passar o mouse. No celular, onde não há "Recolher", o rodapé fica no fim da página com a altura do
  texto.
- **Sem substituição:** a propriedade `footer` do `AppShell` foi removida. Ela permitia trocar ou apagar
  o texto institucional. Mudança que quebra quem a passava: apague a propriedade.
- **`footerText(brand)` e `FOOTER_CREDIT`:** passam para `utils.ts`, módulo sem `"use client"`, e são
  exportados pelo `index.ts`.
- **Versão no rodapé:** só um "v" seguido de número é removido ("v2.0.0" vira "V 2.0.0"; "vNext-1"
  fica). Versão ou ano vazios saem do texto.
- **Borda do rodapé:** usa o token do conteúdo (`border`) no lugar do da barra lateral; o valor é o mesmo
  nos dois temas.
- **`verify-template`:** passa a conferir:
  - o texto montado com `footerText(config.brand)`;
  - `sticky`, `h-14`, o limite de 3 linhas e a borda;
  - a ausência da propriedade `footer`.

  Ele também executa `footerText` com quatro casos de teste.
- **`AGENTS.md`:** registra que o rodapé, ausente no protótipo, segue a página de exemplo.

## 1.3.0 — 2026-11-10

Rodapé padrão dos sistemas, no lado direito, embaixo do conteúdo. O "Recolher" da barra lateral e o resto
da interface sem mudança.

- **Sempre presente:** 56px de altura, alinhado ao "Recolher"; borda superior; texto `text-xs`, centralizado,
  na cor secundária.
- **Texto montado da configuração:** *"Desenvolvido pelo Ministério Público do Estado do Pará - Escritório
  de Inteligência Artificial - {brand.name} - V {brand.version} - {brand.versionYears}"*. A versão e o ano
  saem do texto quando não informados. A função `footerText(brand)` monta esse texto.
- **Configuração nova:** `brand.versionYears`, o ano (ou os anos, como `"2025-2026"`) da versão.
- **`footer` do `AppShell`:** agora substitui o texto padrão; os sistemas não devem usá-lo.

## 1.2.0 — 2026-11-10

Cabeçalho no padrão que os sistemas vão usar, igual ao do Heimdall 2.0.0. Estrutura, cores e tokens sem
mudança.

- **Marca no topo da barra lateral:** símbolo de 32px; nome (semibold) e versão (`text-xs`, cor secundária)
  na mesma linha; subtítulo, se houver, abaixo. `tm-brand-mark` passa de 34px para 32px.
- **Título:** ícone de seção de 24px (`SectionIcon size="sm"`) e título em `text-sm`, peso 500, 10px depois do
  ícone.
- **Busca:** caixa de 224px × 32px, com lupa, texto (`header.searchPlaceholder`) e `Ctrl K`, a partir de 640px;
  abaixo, só a lupa.
- **Lado direito:** tema; divisória; logos institucionais; divisória; identidade.
- **Identidade:**
  - avatar redondo de 32px;
  - nome e perfil visíveis a partir de 1280px;
  - e-mail ao passar o mouse;
  - botão de sair visível (`onSignOut`).

  O painel que o avatar abria (Base UI Popover) saiu.
- Espaçamentos do cabeçalho: padding de 16px (12px no celular) e 4px entre os controles da direita.
- Demonstração com duas logos genéricas de exemplo e sem subtítulo; prévia e comparações regeradas.
- `REPLICAR.md` e `AGENTS.md` descrevem o cabeçalho padrão, que prevalece sobre o do protótipo.

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
