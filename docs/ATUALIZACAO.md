# Atualização e replicação

## Atualizar o template central

1. Crie uma branch.
2. Altere somente a camada visual em `src/components/tema-mppa/` ou os tokens em `src/styles/tema-mppa.css`.
3. Execute:

```bash
npm run check
```

4. Revise claro, escuro, 390 px, desktop, usuário comum e administrador.
5. Registre a mudança no versionamento do repositório.

## Levar uma atualização a um consumidor

No template atualizado:

```bash
node scripts/copy-template.mjs /caminho/do/consumidor --force
```

Com `--force`, o script cria uma cópia de segurança datada em `.tema-mppa-backup-*` antes de substituir arquivos.

Depois, no consumidor:

```bash
npm run typecheck
npm run lint
npm run build
```

Revise o diff antes do commit. O processo não toca autenticação, rotas da aplicação, BFF, APIs ou regras de negócio.

## Migrar da 1.0.0 para a 1.1.0

1. Copie a camada com `--force` (backup automático) e o `tema-mppa.css` novo.
2. Fixe as versões: React e React DOM `19.2.3`, `lucide-react` `1.46.0`, `@tanstack/react-query` `5.102.8`,
   `tailwind-merge` `3.6.0`, `@base-ui/react` `1.9.0`.
3. `PageFrame` não aceita mais `title`, `icon` e `tone`: apague-os. O título vem do item de navegação; para
   páginas fora do menu, crie itens com `hidden: true`.
4. Troque `tone` em classes (`"bg-emerald-500/10 text-emerald-700 …"`) por `"red"`, `"green"`, `"violet"` ou
   `"orange"`. As classes ainda funcionam, mas não garantem o contraste.
5. Remova a Geist Mono do layout, se só o tema a usava.
6. Se a sua cópia da 1.0.0 tinha desvios locais (footer, `description`/`matches`/`hidden`, tokens de logo e
   sobreposição, barra no `localStorage`, `Esc`, logos no menu móvel, `ImageSlot` estrito, `<kbd>` em
   `font-sans`), todos estão na 1.1.0: a pasta volta a ser idêntica à do modelo.
7. Troque cartões, métricas, tabelas e gráficos feitos à mão pelos primitivos.
8. Rode `typecheck`, `lint` e `build` e compare com `docs/comparacao/`.

## Atualizar dependências

Mantenha as versões centrais alinhadas ao sistema consumidor. Atualize uma família por vez e execute o build. Componentes `base-nova` usam Base UI; não introduza `@radix-ui/*`.

## Alterar a paleta

Todas as cores ficam em `src/styles/tema-mppa.css`. Para manter a identidade aprovada, não espalhe hex/OKLCH pelos componentes. O tema claro e o escuro devem ser alterados juntos. O protótipo (`docs/prototipo/index.html`) manda em todo elemento gráfico, e a regra de contraste é fixa: 7:1 para todo texto no claro, com o secundário igual ao principal; 4,5:1 no escuro, com texto escuro sobre a primária; 4,5:1 para os ícones de tom. `npm run verify:template` recalcula esses pares.

## Checklist de regressão

- tela igual ao protótipo em 1280px e 390px, claro e escuro (`docs/comparacao/`);
- sidebar expande/recolhe por botão e `Ctrl/Cmd+B`, e a escolha sobrevive ao recarregar;
- menu móvel abre expandido, fecha com `Esc` e não cria rolagem horizontal;
- um só item marcado; título uma vez, no cabeçalho;
- busca abre com `Ctrl/Cmd+K`;
- tema alterna entre claro, escuro e sistema;
- usuário comum não vê abas nem navegação administrativa;
- administrador vê as duas abas (se houver item administrativo visível);
- abaixo de 640px, as logos aparecem no menu móvel;
- imagens ausentes ou inválidas não mostram ícone quebrado;
- título do cabeçalho acompanha a rota, inclusive em itens `hidden`;
- conteúdo do consumidor permanece dentro da moldura.
