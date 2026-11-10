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
- `REPLICAR.md` é o roteiro do agente no consumidor, em fases (diagnóstico, casca, telas, limpeza, atualização), `DIAGNOSTICO.md` é o formulário da Fase 0 e `GUIA.html` é o guia do desenvolvedor, com o prompt de cada fase: mantenha os três em dia com a API da camada, os tokens e os scripts de cópia e de conferência (`copy-template.mjs`, `verificar-camada.mjs`).
- O que um consumidor relatar que o roteiro não previu (REPLICAR.md, seção 11) entra no modelo na versão seguinte.
- O protótipo `docs/prototipo/index.html` manda em todo elemento gráfico: raio 8px, sombra `--shadow`, fundos, borda e realce dele; título só no cabeçalho.
- Exceção: o cabeçalho segue o padrão dos sistemas, definido em 2026-11-10 (REPLICAR.md, seção 9):
  - marca com nome e versão na mesma linha;
  - título com ícone de 24px;
  - busca de 224px com `Ctrl K`;
  - tema;
  - logos entre divisórias;
  - avatar com nome e perfil;
  - botão de sair.

  Não volte ao avatar sozinho do protótipo.
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
