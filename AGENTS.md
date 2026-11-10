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
- Execute `npm run check` antes de publicar.
- O protótipo `docs/prototipo/index.html` manda em todo elemento gráfico: raio 8px, sombra `--shadow`, fundos, borda e realce dele; título só no cabeçalho.
- Contraste fixo: no claro, todo texto com 7:1 e secundário igual ao principal; no escuro, 4,5:1 e texto escuro sobre a primária; ícones de tom com 4,5:1.
- Telas de demonstração usam só os primitivos exportados (`PageFrame`, `Card`, `MetricCard`, `DataTable`, `BarChart`, `Button`).
