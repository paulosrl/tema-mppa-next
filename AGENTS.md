# Regras do template

- Next.js 16 App Router; leia a documentação instalada em `node_modules/next/dist/docs/` antes de alterar APIs do framework.
- Use Base UI; não adicione dependências `@radix-ui/*`.
- Preserve `components.json` com estilo `base-nova` e Lucide.
- Não implemente autenticação, BFF, API ou regra de negócio neste template.
- A visibilidade administrativa depende exclusivamente de `session.is_admin === true`.
- Nome, versão, usuário, perfil, rotas, menus, símbolo e logos entram por configuração/propriedades.
- Imagens opcionais devem desaparecer quando ausentes ou inválidas.
- Mantenha tokens claro/escuro em `src/styles/tema-mppa.css` e não espalhe cores fixas no shell.
- Garanta 390 px sem rolagem horizontal da página.
- Antes de publicar: `npm run check`; se a aparência mudou, regere a prévia e as comparações (README, "Manter o modelo"); depois `npm run empacotar`, que gera a pasta `tema-mppa-next-v<versão>/tema-mppa-next/` (com `SHA256SUMS`) para o consumidor copiar. Conteúdo novo pede número novo: nunca duas entregas diferentes com a mesma versão.
- `REPLICAR.md` é o roteiro do agente no consumidor, em fases (diagnóstico, casca, telas, limpeza, atualização, sistema do zero; com OpenSpec ou sem), `DIAGNOSTICO.md` é o formulário da Fase 0 e `GUIA.html` é o guia do desenvolvedor, com o prompt de cada fase: mantenha os três em dia com a API da camada, os tokens e os scripts de cópia e de conferência (`copy-template.mjs`, `verificar-camada.mjs`).
- O que um consumidor relatar que o roteiro não previu (REPLICAR.md, seção 11) entra no modelo na versão seguinte.
- O protótipo `docs/prototipo/index.html` manda em todo elemento gráfico, e a aparência única da 2.0.0 (Moveflux) prevalece sobre ele em fonte, raio, sombra, cores e medidas: título só no cabeçalho.
- Tema único, definido em 14 nov. 2026 (2.0.0): não há variantes. Nada de `data-tema`, `TemaVariant`, `useTemaVariante`, `NEXT_PUBLIC_TEMA` nem segunda prévia; a última versão é a oficial.
- Aparência da 2.0.0, regra da camada: claro em pedra quente e escuro em pedra escura (fundo `#e7e5e4` e `#0c0a09`, barra `#ffffff` e `#12100f`, cartão `#ffffff` e `#1c1917`, muted `#fafaf9` e `#292524`); Inter, com peso 600 nos títulos; raio-base de 8px com quadros de 24px (`rounded-card`, padding 24px, sombra `shadow-card` em camadas, sem faixa colorida no topo; no hover, todo quadro sobe 2px com `shadow-card-hover`, como os cartões clicáveis, pedido de 14 nov. 2026) e botões, itens e busca de 12px; `--shell-bar` de 62px (`3.875rem`), barra lateral de 304px (76px recolhida; largura de 12 nov. 2026, para "Minha Página" e "Administração" caberem inteiras nas abas), contorno fino dos quadros em `--card-border` (`#e7e5e4` no claro, `#44403c` no escuro), linha em degradê no lugar do rótulo do grupo do menu, conteúdo com padding 40px × 36px e máximo de 1380px; realce do item ativo em azul sólido (`--highlight`) com barra de 3,5px à esquerda; avatar em degradê; cabeçalho e rodapé translúcidos com desfoque; ícones de seção em caixa de 32px (`tm-tone`); botão `chrome` no tema e no menu móvel. A regra de cores segue a institucional: azul na ação, vermelho só com significado. O `verify-template.mjs` confere esses valores.
- Exceção: o cabeçalho segue o padrão dos sistemas, definido em 2026-11-10 (REPLICAR.md, seção 9):
  - marca com nome e versão na mesma linha;
  - título com ícone de 28px e a seção à frente;
  - tema;
  - logos entre divisórias;
  - avatar com nome e perfil;
  - botão de sair.

  Não volte ao avatar sozinho do protótipo.
- Logos do cabeçalho, definidas em 12 nov. 2026 (1.12.0): três, nesta ordem, MPPA (132×76), CIIA (244×244) e a sigla CIIA (132×76, `alt=""`), em `public/` e na pasta entregue. O título tem prioridade de espaço (bloco de 128px no mínimo; a seção à frente só com 288px): as logos ficam no cabeçalho a partir de 1024px, ou desde 801px com a barra recolhida, e fora disso sob a marca (barra lateral ou menu móvel).
- Busca "Buscar na página", definida em 2026-11-11: fixa na barra lateral, logo acima do "Recolher", na largura da barra (só a lupa com a barra recolhida; no celular, no menu móvel). O diálogo vai para o `<body>` por portal. Não volte a busca para o cabeçalho.
- Sem etiquetas de atalho na interface (pedido de 12 nov. 2026): nada de `Ctrl K`, `Ctrl B` ou outro `<kbd>` ao lado da lupa, do "Recolher" ou em qualquer ponto. Os atalhos `Ctrl+K` e `Ctrl+B` continuam funcionando e ficam só em `aria-keyshortcuts`.
- Rodapé padrão dos sistemas, definido em 2026-11-10. O protótipo não tem rodapé; ele segue a página de exemplo do Heimdall e usa só tokens:
  - a partir de 801px, fixo no pé da tela (`sticky`), na faixa do "Recolher": altura `--shell-bar` (62px), a mesma de cabeçalho, marca e "Recolher", e borda `--sidebar-border` (= `--border`);
  - o texto institucional nunca é cortado (sem `line-clamp`): além de 62px, cresce;
  - no celular, no fim da página, com a altura do texto;
  - sem substituição: o `AppShell` não aceita `footer`;
  - texto pequeno e centralizado, montado de `brand.name`, `brand.version` e `brand.versionYears`:
    "Desenvolvido pelo Ministério Público do Estado do Pará - Escritório de Inteligência Artificial - Nome - V x.y.z - Ano".

  Não mude o lado esquerdo (o "Recolher").
- Contraste fixo, nos dois temas: texto principal com 7:1 ou mais; secundário (`--muted-foreground`, cinza) com 4,5:1 ou mais (WCAG AA) em toda superfície neutra, e não mais igual ao principal; texto de destaque colorido (marca, links, status), texto sobre preenchimento colorido e ícones de tom com 4,5:1 (no escuro, texto escuro sobre a primária).
- Telas de demonstração usam só os primitivos exportados (`PageFrame`, `Card`, `MetricCard`, `DataTable`, `BarChart`, `Button` e as peças de painel de `dashboard.tsx`). A página inicial da demonstração reproduz a página de referência do Heimdall (12 nov. 2026), com dados fictícios.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
