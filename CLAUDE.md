# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Comandos

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
- Os arquivos da camada não podem conter número de versão; o verify reprova.

## Onde a versão aparece

Ao subir a versão, troque em todos estes pontos; o verify confere parte deles.

- `package.json` e `package-lock.json` (`npm install --package-lock-only`);
- `README.md` ("Versão **x.y.z**" e o exemplo de pasta em "Usar num codebase");
- `REPLICAR.md` ("## Interface (tema-mppa x.y.z)");
- `GUIA.html` (`var VERSAO`);
- `<title>` de `docs/preview/index.html`;
- nova entrada no `CHANGELOG.md`.
