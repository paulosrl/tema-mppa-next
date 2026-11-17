# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Comandos

Requer Node 22 ou mais novo.

```bash
npm run dev               # demonstração em http://localhost:3000
npm run verify:template   # só a conferência estrutural (scripts/verify-template.mjs), a parte rápida do check
npm run typecheck
npm run lint
npm run check             # verify:template + typecheck + lint + build
npm run empacotar         # gera ../tema-mppa-next-v<versão>/tema-mppa-next/ com SHA256SUMS
```

- Não há executor de testes: o `scripts/verify-template.mjs` faz esse papel. Ele confere pinos de versão, tokens,
  contraste, a pasta entregue e os documentos, e executa funções da camada de verdade: transpila `utils.ts` para
  `node_modules/.cache/verify-template/utils.mjs` e chama `footerText` e as funções do grupo "Apoio". O `check`
  também gera a pasta entregue numa pasta temporária e compila com ela um consumidor descartável, por isso leva
  cerca de um minuto a mais.
- O `empacotar` recusa gerar de novo uma versão que já está na saída com outro conteúdo. `--substituir` só vale para
  uma pasta que nunca saiu da máquina.
- Prévia (`docs/preview/`) e comparações (`docs/comparacao/`): comandos no README, seção "Manter o modelo". Rodam
  com a demonstração em `npx next start -p 3123` e o `playwright-core` instalado fora do projeto
  (`PLAYWRIGHT_CORE`).

## Arquitetura

O repositório produz uma pasta entregue a sistemas consumidores. Um agente nesses sistemas a aplica.

- **Camada** (`src/components/tema-mppa/` + `src/styles/tema-mppa.css`): é o que vai para o consumidor.
  - `index.ts` é a API pública. O comentário numerado no topo registra cada mudança de contrato.
  - Tudo entra por `ShellConfig` e `AppShellProps` (`types.ts`).
  - `utils.ts` concentra a lógica que barra lateral, cabeçalho, migalhas e busca compartilham:
    - `currentNavigationItem`: o único item marcado, que dá o título e a aba aberta;
    - `canSeeAdministration`;
    - `shellNavigation` e `shellSearchItems`: itens de "Minha Página" e do grupo "Apoio";
    - `footerText`.
  - Os arquivos da camada não podem conter número de versão; o verify reprova.
- **Demonstração** (`src/app/`): fica fora da pasta entregue. A rota catch-all `[[...slug]]` renderiza
  `DemoConsumer`, que escolhe a tela pelo `pathname` com a configuração de `demo-config.tsx`.
- **Documentos entregues**: `REPLICAR.md`, `DIAGNOSTICO.md`, `GUIA.html`, `CHANGELOG.md` e `DESIGN.md`. O
  `CHANGELOG.md` tem uma seção "Ao atualizar de X" por versão, que o consumidor segue.
- **Scripts do consumidor**, que entram na pasta entregue:
  - `copy-template.mjs`: confere a pasta contra o `SHA256SUMS`, copia a camada e grava `docs/tema-mppa/camada.json`
    e o `verificar-camada.mjs` no consumidor;
  - `verificar-camada.mjs`: reprova camada editada, salvo alteração registrada em `alteracoes-locais.json`;
  - `verificar-design.mjs`: confere o `DESIGN.md` do sistema contra as cores do CSS.

## Onde a versão aparece

Ao subir a versão, troque em todos estes pontos; o verify confere parte deles.

- `package.json` e `package-lock.json` (`npm install --package-lock-only`);
- `README.md` ("Versão **x.y.z**" e o exemplo de pasta em "Usar num codebase");
- `REPLICAR.md` ("## Interface (tema-mppa x.y.z)");
- `GUIA.html` (`var VERSAO`);
- `<title>` de `docs/preview/index.html`;
- nova entrada no `CHANGELOG.md`.
