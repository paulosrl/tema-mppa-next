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
- Antes de publicar: `npm run check`; se a aparência mudou, regere a prévia e as comparações (README, "Manter o modelo"); depois `npm run empacotar`.
- `REPLICAR.md` é o roteiro do agente no consumidor, em fases (diagnóstico, casca, telas, limpeza, atualização, sistema do zero; com OpenSpec ou sem), `DIAGNOSTICO.md` é o formulário da Fase 0 e `GUIA.html` é o guia do desenvolvedor, com o prompt de cada fase: mantenha os três em dia com a API da camada, os tokens e os scripts de cópia e de conferência (`copy-template.mjs`, `verificar-camada.mjs`).
- O que um consumidor relatar que o roteiro não previu (REPLICAR.md, seção 11) entra no modelo na versão seguinte.
- O protótipo `docs/prototipo/index.html` manda em todo elemento gráfico: raio 8px e realce dele; título só no cabeçalho.
- Exceção de 2026-11-11 (1.9.0): superfícies do claro em ardósia (fundo `#f4f7fb`, cartão e barra `#ffffff`, muted `#f1f5f9`, borda `#e2e8f0`, texto `#0f172a`), sombra `--shadow` em camadas com brilho interno de 1px, tons do escuro translúcidos gravados em hex ícones de seção duotone (preenchimento de 15%) e realce do item e da aba ativos mais claro (`#ecf4fe` no claro, `#1c3b73` no escuro). O `verify-template.mjs` confere esses valores.
- Exceção: o cabeçalho segue o padrão dos sistemas, definido em 2026-11-10 (REPLICAR.md, seção 9):
  - marca com nome e versão na mesma linha;
  - título com ícone de 24px;
  - tema;
  - logos entre divisórias;
  - avatar com nome e perfil;
  - botão de sair.

  Não volte ao avatar sozinho do protótipo.
- Busca "Buscar na página" com `Ctrl K`, definida em 2026-11-11: fixa na barra lateral, logo acima do "Recolher", na largura da barra (só a lupa com a barra recolhida; no celular, no menu móvel). O diálogo vai para o `<body>` por portal. Não volte a busca para o cabeçalho.
- Rodapé padrão dos sistemas, definido em 2026-11-10. O protótipo não tem rodapé; ele segue a página de exemplo do Heimdall e usa só tokens:
  - a partir de 801px, fixo no pé da tela (`sticky`), na faixa do "Recolher": altura `--shell-bar` (56px), a mesma de cabeçalho, marca e "Recolher", e borda `--sidebar-border` (= `--border`);
  - o texto institucional nunca é cortado (sem `line-clamp`): até 3 linhas em 56px; além disso, cresce;
  - no celular, no fim da página, com a altura do texto;
  - sem substituição: o `AppShell` não aceita `footer`;
  - texto pequeno e centralizado, montado de `brand.name`, `brand.version` e `brand.versionYears`:
    "Desenvolvido pelo Ministério Público do Estado do Pará - Escritório de Inteligência Artificial - Nome - V x.y.z - Ano".

  Não mude o lado esquerdo (o "Recolher").
- Contraste fixo: no claro, todo texto com 7:1 e secundário igual ao principal; no escuro, 4,5:1 e texto escuro sobre a primária; ícones de tom com 4,5:1.
- Telas de demonstração usam só os primitivos exportados (`PageFrame`, `Card`, `MetricCard`, `DataTable`, `BarChart`, `Button`).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
