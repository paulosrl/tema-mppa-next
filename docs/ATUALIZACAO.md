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

## Atualizar dependências

Mantenha as versões centrais alinhadas ao sistema consumidor. Atualize uma família por vez e execute o build. Componentes `base-nova` usam Base UI; não introduza `@radix-ui/*`.

## Alterar a paleta

Todas as cores ficam em `src/styles/tema-mppa.css`. Para manter a identidade aprovada, não espalhe hex/OKLCH pelos componentes. O tema claro e o escuro devem ser alterados juntos.

## Checklist de regressão

- sidebar expande/recolhe por botão e `Ctrl/Cmd+B`;
- menu móvel abre e fecha sem rolagem horizontal;
- busca abre com `Ctrl/Cmd+K`;
- tema alterna entre claro, escuro e sistema;
- usuário comum não vê abas nem navegação administrativa;
- administrador vê as duas abas;
- imagens ausentes ou inválidas não mostram ícone quebrado;
- breadcrumb acompanha a rota;
- conteúdo do consumidor permanece dentro da moldura.
