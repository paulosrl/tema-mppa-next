# Changelog

## 1.10.0 — 2026-11-12

Estética nova, com a mesma estrutura e a mesma API. Pedido do autor em 12 nov. 2026: a camada passa a seguir a
página de referência do Heimdall (`heimdall_acesso_a_sistemas.html`), inclusive o que a 1.9.0 deixou de fora por
contraste. Decisão do autor: o texto secundário volta a ser cinza, com 4,5:1 (WCAG AA) em toda superfície
neutra. Nada muda de lugar: a busca continua na barra lateral e o título continua só no cabeçalho.

### Adicionado

- **Peças de painel** (`dashboard.tsx`), da página de referência: `PageGreeting` (saudação com barra em
  degradê), `StatusBadge`, `Tag`, `InfoPill`, `SectionTitle`, `PanelCard` (cartão com cabeçalho, ícone e borda
  de cima colorida), `InfoField` (campo com ícone), `PanelGrid`, `LinkCard` (cartão clicável com seta e
  rodapé), `LinkCardMedia` e `MetricLine`. Tabela de propriedades no `REPLICAR.md`, 5.2.
- **`NavigationItem.badge`:** selo curto à direita do rótulo no menu ("Ativa"), no tom do item.
- **Demonstração:** a página inicial reproduz a página de referência do Heimdall (saudação, resumo da conta,
  acessos a sistemas e ações rápidas), com dados fictícios; as outras rotas mantêm métricas, gráficos e tabela.

### Modificado

- **Contraste:** texto principal com 7:1 ou mais nos dois temas; secundário cinza com 4,5:1 ou mais. No claro,
  `--muted-foreground` passa de `#0f172a` a `#5f6f86` (o `#64748b` da referência escurecido para chegar a 4,5:1
  no muted: 4,67:1; 4,76:1 no fundo; 5,12:1 no cartão). No escuro, `#94a3b8` (6,21:1 no muted).
- **Escuro marinho:** deixa o Zinc. Fundo `#070b12`, barra `#0c121e`, cartão e popover `#111827`, muted,
  secondary, accent e sidebar-accent `#182235`, texto `#f8fafc`, texto da barra `#cbd5e1`, borda branca a 8%.
  Tons dos ícones a 18% da cor sobre a barra, com os traços da referência (de 5,93:1 a 9,59:1).
- **Item selecionado do menu:** azul escuro em degradê (`#0842a1` → `#0b4fc0` no claro; `#1e3a8a` → `#2547a8` no
  escuro), texto e ícone brancos (7,26:1 ou mais), barra de 3,5px em azul-claro à esquerda e brilho azul
  (`--highlight-shadow`); utilitário `tm-nav-active`. `--highlight` passa a `#0842a1` (escuro `#1e3a8a`) e
  `--highlight-foreground` a `#ffffff`. Sob o ponteiro, o item fica num azul sutil (`--sidebar-hover`). As abas
  deixam o realce: a ativa fica em `bg-card` com sombra, e os ícones das abas aparecem sempre (Plataforma no
  vermelho institucional, Administração na primária).
- **Ícones de seção:** caixa de 32px no menu e 28px no título (eram 28 e 24), raio 8px, tom com brilho em degradê
  e borda de 1px na cor do traço (utilitário `tm-tone`), miolo a 20%.
- **Medidas:** faixas (`--shell-bar`) de 62px (eram 56px); barra lateral de 268px, 76px recolhida (eram 260 e
  64); conteúdo com padding 40px × 36px (24px no tablet, 16px no celular) e largura máxima de 1380px (eram 38px e
  1500px); `PageFrame` com 32px até o conteúdo e 16px entre blocos; `CardGrid` com 16px.
- **Cartões:** raio 16px, padding 24px, sombra em camadas (`shadow-card`; `shadow-card-hover` para cartões
  clicáveis do sistema). Cabeçalho da `DataTable` em maiúsculas, 11px.
- **Botões:** raio 12px e ícone de 36px. Variante nova `chrome` (borda, fundo do cartão e sombra leve), usada no
  botão de tema e no de menu móvel.
- **Cabeçalho e rodapé:** translúcidos com desfoque (`--header`); fundo da página com brilho vermelho e azul nos
  cantos de cima (`--canvas-glow`). Título com a seção à frente ("Plataforma / Dashboard", a seção a partir de
  640px; o `<h1>` continua só com o rótulo). Logos em caixas com borda e sombra. Avatar em degradê do vermelho
  ao azul com ponto verde de conectado; nome em negrito. Sair com realce destrutivo. Sol âmbar e lua azul no
  botão de tema (`--theme-icon`).
- **Item do menu sob o ponteiro:** fundo azul (`--sidebar-hover`: `#ecf4fe` no claro, texto com 16,10:1;
  `#142645` no escuro, 14,41:1), no lugar do cinza neutro.
- **Barra lateral:** marca com nome em negrito e versão num selo vermelho em fonte mono; `tagline` em 11px.
  Rótulo do grupo em maiúsculas, 11px, cinza. Itens com raio 12px e 13,5px. "Recolher" com `Ctrl B` em `kbd` e
  ícone de painel. Busca com raio 12px, sombra e `kbd` mono.
- **Rodapé:** "Ministério Público do Estado do Pará" em negrito e o nome do sistema no vermelho institucional;
  o texto continua o de `footerText`.
- **Tokens novos:** `--institutional`, `--institutional-foreground`, `--header`, `--canvas-glow`,
  `--avatar-from`, `--avatar-to`, `--avatar-foreground`, `--online`, `--theme-icon`, `--tone-sheen`,
  `--highlight-gradient`, `--highlight-bar`, `--card-shadow` e `--card-shadow-hover`.
- **Documentos e verificador:** `AGENTS.md`, `DESIGN.md`, `REPLICAR.md`, `GUIA.html`, `README.md` e
  `verify-template.mjs` com os valores e as regras novas. Prévia e comparações regeradas.

### Ao atualizar de 1.9.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Rode o `verificar-design.mjs` e leve ao `DESIGN.md` do sistema os valores novos (secundário, escuro marinho,
   realce, logo surface, violeta e as medidas).
3. Regras, specs e testes locais que exigem o secundário igual ao principal ou 12:1 em todo texto passam a
   exigir 7:1 no texto principal e 4,5:1 no secundário; reescreva-os (a regra é da camada).
4. Testes que leem o fundo do item ativo (`background-color`) passam a ler o degradê (`background-image`) ou a
   cor do texto (branca); testes que exigem o texto principal sobre `--highlight` passam a exigir
   `--highlight-foreground`; os que medem 56px, 260px, 64px, 34px ou o realce da aba ativa precisam dos valores novos.
5. Telas do sistema que imitavam a estética nova com classes locais (`rounded-xl`/`rounded-2xl`, `shadow-xs`,
   borda superior colorida em `Card`, cinza fixo no texto secundário) podem voltar ao primitivo: o `Card` já tem
   raio 16px, padding 24px e sombra em camadas. Mantenha só o que for do sistema.
6. Opcional: `brand.tagline` aparece sob o nome; `sidebarShortcutLabel: "Recolher menu"` deixa o rótulo igual
   ao da referência. Painéis montados à mão (saudação, cartões de atalho, campos com ícone) podem passar às
   peças de painel (`PageGreeting`, `PanelCard`, `InfoField`, `SectionTitle`, `LinkCard`).
7. Troque a versão na seção "Interface" do `AGENTS.md` para 1.10.0.

## 1.9.0 — 2026-11-11

Superfícies em ardósia no claro, sombra com brilho interno, ícones de seção duotone, busca na barra lateral e
realce mais claro. Pedido do autor em 11 nov. 2026, aplicado dentro das regras de contraste (7:1 no claro, secundário igual ao texto, ícones com
4,5:1). A API não muda; mudam a aparência e o lugar da busca. O escuro continua em Zinc.

### Modificado

- **Claro em ardósia:** fundo `#ffffff` → `#f4f7fb`; cartão e popover `#fafafa` → `#ffffff`; barra `#fcfcfc` →
  `#ffffff`; muted, secondary, accent e sidebar-accent `#f4f4f5` → `#f1f5f9`; borda e input `#d4d4d8` →
  `#e2e8f0`; texto e secundário `#18181b` → `#0f172a` (16,61:1 no fundo); texto da barra `#334155` (10,35:1);
  logo surface `#f8fafc`. A primária fica `#0842a1` (8,48:1 sobre o fundo). O pedido trazia secundário `#64748b` (4,4:1), item ativo escuro e tons a 12% (3,3:1), que
  ficaram de fora por contraste.
- **Busca na barra lateral:** a caixa "Abrir busca" sai do cabeçalho e fica fixa na barra lateral, logo acima
  do "Recolher", na largura da barra, com lupa, texto e `Ctrl K`; com a barra recolhida, só a lupa; no celular,
  no menu móvel (antes, só a lupa no cabeçalho). O texto padrão de `header.searchPlaceholder` passa de
  "Buscar ou executar…" a "Buscar na página". O diálogo (o do modelo e o de `renderSearch`) vai para o `<body>`
  por portal, porque a barra tem `transform`. Escolher um resultado fecha também o menu móvel. `headerActions`
  fica à esquerda do tema.
- **Realce do item e da aba ativos mais claro:** `--highlight` passa de `#dbeafe` a `#ecf4fe` no claro (texto com
  16,10:1; 10 pontos de luz dariam branco, então sobe 3,5) e de `#12264a` a `#1c3b73` no escuro (10 pontos a mais
  de luz; texto com 10,47:1).
- **Sombra (`--shadow`):** deixa a do protótipo e passa a camadas com brilho interno de 1px no topo:
  `0 1px 3px rgba(9,9,11,.06), 0 4px 12px -2px rgba(9,9,11,.05), inset 0 1px 0 0 rgba(255,255,255,.8)` no
  claro e `0 4px 16px -2px rgba(0,0,0,.5), 0 1px 3px rgba(0,0,0,.35), inset 0 1px 0 0 rgba(255,255,255,.07)` no
  escuro. `--drawer-shadow` a 22%.
- **Tons do escuro:** deixam de repetir os pastéis do claro. Fundo translúcido (18 a 20% da cor sobre a barra
  `#18181b`), gravado em hex, com traço pastel de 9,69:1 a 10,44:1 (azul `#1f2d47` + `#bfdbfe`, verde `#17352d` +
  `#a7f3d0`, e os demais na tabela do `REPLICAR.md`, seção 8).
- **`SectionIcon` duotone:** o miolo do ícone recebe 15% da cor do traço (`[&_svg]:fill-current/15`); anel
  interno de 1px a 15%; cresce 5% sob o mouse no menu (os links ganham `group`), sem movimento com
  `prefers-reduced-motion`.
- **Abas Plataforma/Administração:** a ativa ganha anel de 1px na borda a 50% e transição de cor e sombra.
- **`Card`:** transição de 200ms, título com `tracking-tight` e descrição com 2px acima.
- **`text-primary` sobre `bg-primary/15`:** o aviso continua, agora pelo fundo (6,59:1) e pelo muted (6,45:1);
  `bg-primary/10` passa (7,18:1, 7,68:1 e 7,04:1).
- **Demonstração:** a segunda logo do cabeçalho passa a ser a do CIIA (`public/ciia.png`, a mesma do Heimdall);
  a primeira continua a de exemplo. A prévia offline embute as imagens de `public/`, uma vez só.
- **Documentos e verificador:** `AGENTS.md` (exceção ao protótipo), `DESIGN.md`, `REPLICAR.md` (seção 8),
  `GUIA.html` e `verify-template.mjs` com os valores novos. Prévia e comparações regeradas.

### Ao atualizar de 1.8.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Rode o `verificar-design.mjs`: fundos, texto, borda, sombra e os tons do escuro mudaram; leve os valores ao
   `DESIGN.md` do sistema.
3. Telas do sistema que pintavam algo com `bg-background` para parecer cartão passam a ardósia: use `bg-card`.
4. A busca saiu do cabeçalho: testes e seletores que a procuravam no `<header>` passam a procurá-la na barra
   lateral (`aria-label="Abrir busca"` não mudou). Um `renderSearch` que dependia de ficar dentro do cabeçalho
   agora é renderizado no `<body>`.
5. Testes, capturas e comparações visuais que fixam o fundo branco, o realce `#dbeafe`/`#12264a`, a borda `#d4d4d8` ou a sombra antiga
   precisam ser atualizados.
6. Troque a versão na seção "Interface" do `AGENTS.md` para 1.9.0.

## 1.8.0 — 2026-11-11

Primária azul e equilíbrio de cores. Decisão do autor em 11 nov. 2026: todos os sistemas do MPPA passam a usar
azul como cor de ação, para equilibrar com o vermelho da identidade institucional, sem nenhuma diferença de
cor, fonte, tamanho ou estrutura entre eles. Os azuis são os que o Heimdall já usava: `#0842a1` no claro
(texto `#ffffff`) e `#61a6fa` no escuro (texto `#080c16`). A API não muda; muda a aparência.

### Modificado

- **Ação em azul:** `--primary`, `--ring`, `--sidebar-primary` e `--sidebar-ring` passam de vermelho
  (`#9f0712` no claro, `#ef4444` no escuro) a `#0842a1` (9,11:1 com branco e sobre o fundo) no claro e a `#61a6fa`
  (7,04:1 sobre o cartão, 7,90:1 sobre o fundo; texto escuro com 7,76:1) no escuro. O botão primário, o foco e
  os links de ação seguem.
- **Item ativo da barra:** `--highlight` passa a azul-claro, `#dbeafe` no claro (texto preto com 14,52:1) e
  `#12264a` no escuro (texto claro com 14,35:1). O ícone do item é azul.
- **Ícone padrão de seção:** `SectionIcon` sem `tone` e o ícone do título do cabeçalho passam de `"red"` a
  `"blue"`; a demonstração usa `"blue"` nos dois primeiros itens de cada aba. `"red"` continua aceito, mas
  fica reservado ao que tem significado institucional.
- **Gráficos:** as barras do `BarChart` e `--chart-1..5` passam a azul: forte `#0842a1 → #3b82f6`, suave
  `#6f9be6 → #94b6f1` (no nível do vermelho suave de antes). No escuro, o azul do claro some no cartão (1,7:1);
  os gráficos têm valores próprios: forte `#3b82f6 → #61a6fa` (4,82:1 a 7,04:1 sobre o cartão) e suave
  `#4f78b8 → #7aa2dd` (3,97:1 a 6,78:1).
- **Vermelho só com significado:** `--destructive` (erro e ação destrutiva) e o símbolo padrão `tm-brand-mark`
  (identidade institucional) continuam vermelhos, como as logos e qualquer faixa institucional vermelho-azul.
  Os demais tons de seção continuam variados.
- **`text-primary` sobre `bg-primary/10`:** com o azul, o par passa a ter 7,68:1 sobre o fundo, 7,40:1 sobre o
  cartão e 7,01:1 sobre o muted no claro, e 6,05:1 sobre o cartão no escuro. O aviso do `REPLICAR.md` (seção 8)
  passa a valer só de `bg-primary/15` em diante (6,74:1 sobre o cartão).
- **Protótipo:** `docs/prototipo/index.html` mudou primeiro (botão primário, realce, ícone e barras em azul), e
  o `tema-mppa.css` o segue. Prévia e comparações regeradas.
- **Documentos:** `DESIGN.md` (tokens, "Overview", "Colors", tabela do escuro, "Do's and Don'ts"), `REPLICAR.md`
  (tabela de tokens, `tone`, equilíbrio de cores, aviso de `bg-primary/10`), `DIAGNOSTICO.md` (onde o sistema usa
  vermelho como ação) e `GUIA.html` (as cores do próprio guia).
- **`verify-template`:** confere o azul de ação nos quatro tokens e no texto sobre eles, o destrutivo e o símbolo
  ainda vermelhos, o tom padrão azul, os contrastes dos gráficos e dos seis tons de seção.

### Ao atualizar de 1.7.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Rode o `verificar-design.mjs`: `primary`, `ring`, `highlight` e os `chart-*` mudaram; leve os valores ao
   `DESIGN.md` do sistema.
3. Confira o que ficou vermelho por ser a antiga cor de ação no código do sistema (não na camada): botão, link,
   realce, ícone, gráfico, ilustração de estado vazio. Passe a `bg-primary`, `text-primary`, `ring` ou ao tom
   `"blue"`. O vermelho fica para erro, ação destrutiva e identidade institucional.
4. Um consumidor que pintava algo de azul com token próprio, como o `--accent-blue` da tela de entrada do
   Heimdall, pode passar a usar a primária: o valor é o mesmo.
5. Testes, capturas e comparações visuais que fixam a cor vermelha da primária, do item ativo ou do gráfico
   precisam ser atualizados.
6. Itens de menu sem `tone` (ou com `"red"` só por ser o padrão) passam a azul: reveze os tons como na seção 4.5.
7. Troque a versão na seção "Interface" do `AGENTS.md` para 1.8.0.

## 1.7.0 — 2026-11-10

Pedidos do HubIA (o segundo consumidor antigo, Fase 1), P1 a P5 do plano dele, e dois ajustes que a adoção
mostrou. A cópia do HubIA, única que existia, partia da 1.6.0; esta entrada foi recuperada dela e leva junto as
correções da 1.6.1 (tema com o `sessionStorage` bloqueado). A API só ganha propriedades opcionais; nada sai.
O que muda na aparência: o texto secundário e o de status passam a 12:1 sobre superfície neutra nos dois temas.

- **P1. Mais tons de seção:** `NavigationTone` ganha `"blue"`, `"teal"`, `"pink"` e `"amber"` (tokens
  `--tone-*` e `--tone-*-foreground`, de 4,86:1 a 6,37:1 sobre o próprio fundo), para sistemas com mais de
  quatro itens que pedem uma cor por item.
- **P2. Barra recolhida sem piscar em layout estático:** o script de boot (`<ThemeScript>`) passa a marcar
  `data-tm-sidebar="collapsed"` no `<html>` a partir do `localStorage`, e a barra se desenha pela variante
  `tm-collapsed` do `tema-mppa.css`, não pelo estado do React. Antes, numa casca hidratada, a barra recolhida
  nascia expandida e fechava depois. O pedido era um cookie opcional; o atributo resolve o mesmo sem obrigar
  o layout a ler cookie (que o tornaria dinâmico). `SIDEBAR_STORAGE_KEY` passa a vir de `theme-script.tsx`.
- **P3. Busca do sistema (`renderSearch`):** o `AppShell` aceita `renderSearch({ open, setOpen })`, que troca
  a paleta do modelo pelo diálogo do sistema (por exemplo, uma busca no servidor). O botão "Abrir busca" e o
  `Ctrl+K` continuam do modelo.
- **P4. Ações do sistema no cabeçalho (`headerActions`):** nó renderizado à esquerda da busca, para um botão
  que depende de estado do sistema (por exemplo, "Voltar ao Heimdall" só para quem veio de lá). O
  `header.backLink` fixo continua.
- **P5. Contraste de 12:1 em superfície neutra:** `--muted-foreground` escuro vai de `#a1a1aa` (5,81:1 no
  muted) a `#f4f4f5` (13,55:1); `--success`/`--warning` vão a `#08351f`/`#432506` no claro (12,41:1 e
  12,69:1 no muted) e a `#bbf7d0`/`#fef08a` no escuro (12,29:1 e 12,80:1). Texto sobre preenchimento
  colorido continua em 4,5:1.
- **Sessão a caminho (`session={null}`):** a casca aparece sem esperar a sessão (sem salto de layout), sem
  dado de usuário nem administração, com o espaço do avatar reservado e o botão de sair disponível.
- **Título vindo do conteúdo (`title`):** numa rota de detalhe, o nome do registro substitui o rótulo do item
  no cabeçalho e sai sem ícone de seção; o item continua marcado na barra.
- **Rota sob `<Suspense>`:** a barra lateral e o título do cabeçalho leem `usePathname()` dentro de
  `<Suspense>`. Com Cache Components (Next 16), ler a rota fora dele reprovava o `next build` nas rotas
  dinâmicas ("URL data `usePathname()` in a Client Component outside of `<Suspense>`"). Enquanto a rota não
  chega, a barra mostra os itens de plataforma sem item marcado, e o título fica vazio. Os itens leem a barra
  recolhida pela loja externa (`useCollapsedAttribute`), não pelo contexto: a fronteira hidrata depois do resto,
  e o `title` do item em modo ícone divergiria do HTML servido e ficaria ausente.
- **Iniciais próprias (`session.initials`):** opcional; sem ele, a regra da camada continua.
- **`REPLICAR.md`:** 4.4 (o script também marca a barra), 4.5 (tons novos), 4.6 (tabela das propriedades
  novas), 4.8 (atributo `data-tm-sidebar`), seção 8 (tons novos e contraste de 12:1) e seção 11.
- **`DESIGN.md`:** tons novos, status e secundário do escuro com os valores novos, e a regra de 12:1.

### Ao atualizar de 1.6.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (seção 7).
2. Rode o `verificar-design.mjs`: `success`, `warning` e os tons novos mudaram; leve os valores ao `DESIGN.md`
   do sistema.
3. Testes que leem o estado da barra recolhida passam a ler `data-tm-sidebar` no `<html>` (ou o
   `aria-expanded` do botão "Recolher menu lateral").
4. Opcional: troque a busca, o botão de volta e o título de detalhe locais por `renderSearch`, `headerActions`
   e `title`.
5. Troque a versão na seção "Interface" do `AGENTS.md`.

## 1.6.1 — 2026-11-10

Duas correções do tema com o `sessionStorage` bloqueado, achadas na revisão de código do Heimdall. A
aparência e a API da camada não mudam.

- **`setTheme` com o armazenamento bloqueado:** o `ThemeProvider` lia o tema só do `sessionStorage`; bloqueado
  (navegação privada, política do navegador) ou cheio, a leitura devolvia sempre "light" e o alternador não
  trocava o tema. O comentário "mantém a interface operacional" não era verdade. Agora, quando a gravação
  falha, o tema fica numa variável do módulo e vale para a aba até recarregar a página, que volta ao claro,
  como o script de tema. Quando a gravação volta a funcionar, o `sessionStorage` retoma o papel.
- **Script de tema com o armazenamento bloqueado:** o `catch` do `THEME_BOOT_SCRIPT` acrescentava `light` sem
  tirar `dark`; uma página servida com `class="dark"` ficava com as duas classes. Agora tira `dark` antes.
- **`verify-template`:** executa os dois casos: transpila `theme-script.tsx` e `theme-provider.tsx` com o
  TypeScript do projeto e roda o script de tema e o provedor no `vm` do Node, com o `sessionStorage` bloqueado
  e cheio (só a gravação falha). Os testes reprovam a 1.6.0.

### Ao atualizar de 1.6.0

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
   Mudam só `theme-provider.tsx` e `theme-script.tsx`; o `camada.json` volta com os novos SHA-256 e a versão
   1.6.1. Se o `copy-template` avisar que um deles estava editado, refaça a edição local sobre o arquivo novo.
2. O HTML do script de tema muda (o `catch` agora tira `dark`). Teste do consumidor que compara o
   `THEME_BOOT_SCRIPT` com um texto fixo, ou um hash de CSP calculado sobre ele, precisa ser atualizado; com o
   `nonce` do `<ThemeScript nonce={nonce} />`, nada muda.
3. Se o consumidor tem teste que espera o tema preso no claro com o `sessionStorage` bloqueado, ele passa a
   falhar: o alternador agora troca o tema na aba.
4. Troque a versão na seção "Interface" do `AGENTS.md` para 1.6.1.

## 1.6.0 — 2026-11-10

Correções do que a adoção pelo Heimdall (o primeiro consumidor antigo, Fase 1) mostrou no zip, no roteiro e
na camada. A aparência não muda. A API ganha o `<ThemeScript>`; nada sai.

- **Zip sem `package.json`:** o `copy-template.mjs` lia a versão do `package.json` do modelo, que o zip não leva,
  e falhava com ENOENT sem gravar nada. Agora lê a versão do primeiro título do `CHANGELOG.md`, que vai no zip.
- **Script de tema (`<ThemeScript nonce />`):** `THEME_STORAGE_KEY`, `THEME_BOOT_SCRIPT` e o novo `ThemeScript`
  passam para `theme-script.tsx`, módulo sem `"use client"`. Vindo do `theme-provider.tsx` (`"use client"`), o
  `THEME_BOOT_SCRIPT` importado no layout raiz era, no servidor, uma referência de cliente: uma função que
  lança "Attempted to call THEME_BOOT_SCRIPT() from the server". O HTML só saía certo porque o React
  resolvia a referência ao renderizar; qualquer outro uso no servidor (concatenar, testar o tipo) quebrava.
  O exemplo da seção 4.4 do `REPLICAR.md` e a demonstração usam `<ThemeScript nonce={nonce} />`.
- **Tema escuro sem transição na montagem:** na hidratação, o `ThemeProvider` aplicava por um instante o tema do
  servidor (claro) e voltava ao escuro no mesmo quadro. Uma casca montada nesse instante (no consumidor que
  espera a sessão chegar no navegador) nascia com as cores do claro e fazia a transição de cor até as do
  escuro, em cerca de 150ms: item e aba ativos piscavam em rosa. Achado no teste cego da 1.6.0. Agora o
  provedor aplica o tema guardado, e não o da renderização.
- **Modo dos arquivos:** o zip trazia a camada com 0777, que vira `100755` sem shebang num repositório que confere
  o modo pelo índice do git. O `empacotar` fixa 644, e 755 só para script com shebang, seja qual for o modo
  na pasta; o `copy-template` grava os mesmos modos no consumidor; e o próprio modelo corrigiu os modos no git.
- **Sem versão escrita na camada:** comentários com versões (`1.5.0`, `1.0.0`, `v2.0.0`…) acionavam a
  conferência de "versão fora dos pontos de versão" do consumidor. A versão da camada fica só no `camada.json`
  e no CHANGELOG.
- **Contrato observável (`REPLICAR.md`, 4.8):** tabela do que a camada muda e os testes do consumidor costumam
  ler: chaves de armazenamento, alternador de tema e o ciclo claro → escuro → sistema, `aside` "Navegação
  principal", título num `h1` dentro do `header`, links administrativos fora do DOM na aba Plataforma, menu
  móvel fechado por translação (o Playwright o vê "visível"), busca, sair e leitura dos tokens em hex.
- **`DESIGN.md`:** novo `DESIGN.md` da camada, no formato aberto do Google Labs (`alpha`; linter oficial com
  0 erros e 0 avisos), copiado para `docs/tema-mppa/DESIGN.md`. A Fase 1 passa a criar o `DESIGN.md` do
  sistema na raiz do frontend (`REPLICAR.md`, 4.9; a verificação da Fase 1 vira 4.10). O novo
  `verificar-design.mjs`, copiado com a camada, reprova cor diferente da do CSS, cor da camada ausente,
  referência inexistente e seção fora de ordem, sem rede e sem Vitest.
- **Guia do desenvolvedor (`GUIA.html`):** página que vai no zip e abre direto no navegador. O
  desenvolvedor responde duas perguntas (situação do sistema: do zero, já existe sem o tema ou já tem o
  tema; e se o repositório usa OpenSpec) e o guia monta os passos daquele caso, cada um com o prompt pronto
  e o que conferir depois. No sistema do zero, nome, versão, ano e telas iniciais entram por campos e vão
  para o prompt. O `copy-template` grava o guia em `docs/tema-mppa/`, onde ele fica depois que a pasta
  descompactada sai. O zip passa a ser o único arquivo entregue: o `empacotar` não grava mais o `.sha256`.
- **Sistema do zero (`REPLICAR.md`, 2.1):** num repositório sem frontend, o agente cria o app com o
  `create-next-app` nas versões exatas do modelo, monta a casca com os dados do pedido, uma sessão
  provisória (sem autenticação, que o modelo não implementa) e uma página por tela inicial.
- **OpenSpec em três passos (`REPLICAR.md`, 1.2):** cada fase é uma change: propor (o agente para e o
  desenvolvedor revisa), aplicar e arquivar, cada passo num pedido. Sem OpenSpec, cada fase é uma branch e um
  commit.
- **Fase 0 (`DIAGNOSTICO.md`):** pergunta pelas regras de lint desligadas no projeto inteiro e por
  `--max-warnings 0`; pelas regras visuais próprias e pelos pares de cor antigos, com o contraste recalculado;
  pelas conferências que leem todo arquivo rastreado (versão, modo, links em `.md`, cor fixa); e por um
  `DESIGN.md` existente.
- **`REPLICAR.md`:**
  - 4.1: bloco de lint só para a pasta da camada (`reportUnusedDisableDirectives: "off"`) e exclusão de
    `docs/tema-mppa/` das conferências de todo arquivo;
  - 4.10: confere o script de tema no HTML servido;
  - seção 8: "não faça" `text-primary` sobre `bg-primary/10` (abaixo de 7:1 com a primária `#9f0712`) e
    texto colorido onde o consumidor exige texto preto.
- **`verify-template`:**
  - gera o zip numa pasta temporária, confere o modo de cada entrada e que ele não leva o `package.json`;
  - descompacta o zip e roda o `copy-template` **de lá** num consumidor descartável;
  - compila esse consumidor com os exemplos da 4.4 e da 4.5 tais como estão, e confere no HTML servido o
    script de tema (sem "Attempted to call"), o contrato observável e, numa sonda, que o script é texto no
    servidor;
  - confere o contrato da 4.8 contra o código da camada, a ausência de versão escrita na camada, o
    `DESIGN.md` do modelo contra o CSS e o `verificar-design.mjs` num `DESIGN.md` de consumidor (aprovado,
    cor trocada e cor ausente reprovadas).

### Ao atualizar de 1.5.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (seção 7). Os arquivos da
   camada voltam com modo 644; se o git do consumidor os tinha como `100755`, o commit registra a troca de
   modo.
2. Troque o script de tema do layout raiz por `<ThemeScript nonce={nonce} />` (importado de
   `components/tema-mppa`) e apague o contorno local, se houver (por exemplo, um Client Component que
   renderizava o `THEME_BOOT_SCRIPT`). Testes que importam `THEME_BOOT_SCRIPT` ou `THEME_STORAGE_KEY`
   continuam funcionando: os nomes não mudaram.
3. Se o consumidor desliga `@next/next/no-img-element` no projeto inteiro e ignorou a pasta da camada no lint,
   pode trocar pelo bloco da 4.1 (`reportUnusedDisableDirectives: "off"` só na pasta), que volta a compilar a
   camada no lint.
4. Crie o `DESIGN.md` do sistema (4.9) e ligue o `verificar-design.mjs` aos testes. Se ele já existe, rode o
   verificador: ele exige as cores da camada com os mesmos valores.
5. Confira na tabela da 4.8 os testes do consumidor e, na seção 4.1, as conferências que leem todo arquivo
   rastreado; troque a versão na seção "Interface" do `AGENTS.md`.

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
