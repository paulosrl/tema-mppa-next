# Tema MPPA — modelo de interface para Next.js

Versão **1.8.0**. Interface igual ao protótipo aprovado ([`docs/prototipo/index.html`](docs/prototipo/index.html)), com o
cabeçalho padrão dos sistemas:

- barra lateral com abas Plataforma e Administração;
- cabeçalho de 56px: título da página, busca, tema, logos institucionais, nome e perfil do usuário e
  botão de sair;
- busca `Ctrl+K`;
- tema claro e escuro;
- rodapé padrão com o crédito institucional, o nome, a versão e o ano do sistema;
- cartões, métricas, tabelas e gráficos;
- código de cores com contraste AAA: azul na ação (igual ao Heimdall) e vermelho só para erro e identidade
  institucional.

Veja pronta em [`docs/preview/index.html`](docs/preview/index.html), que abre direto no navegador.

## Usar num codebase

1. Gere o zip: `npm run empacotar`. Ele grava só `tema-mppa-next-v1.8.0.zip`, na pasta acima desta.
2. Entregue o zip ao desenvolvedor do sistema. Ele o copia para a raiz do repositório, descompacta e abre
   `tema-mppa-next/GUIA.html` no navegador.
3. No [`GUIA.html`](GUIA.html), ele responde duas perguntas: a situação do sistema (do zero, já existe sem o
   tema, já tem o tema) e se o repositório usa OpenSpec. O guia monta os passos daquele caso, cada um com o
   prompt pronto para colar no Claude Code e o que conferir depois. No sistema do zero, nome, versão, ano e
   telas iniciais entram por campos do guia.

O agente trabalha em fases, cada uma uma entrega:

| Fase | O agente faz | O desenvolvedor faz |
| --- | --- | --- |
| 0. Diagnóstico | Lê o codebase e preenche o [`DIAGNOSTICO.md`](DIAGNOSTICO.md), sem mudar nada | Aprova e decide os conflitos com o padrão |
| 1. Casca | Copia a camada; liga fonte, cores e tema; configura marca, menus e sessão; troca o rodapé; ajusta os testes; cria o `DESIGN.md` do sistema | Confere as capturas e testa na mão |
| 2. Telas | Repinta as telas com os primitivos, aos poucos | Confere cada entrega |
| 3. Limpeza | Tira o visual antigo que ficou sem uso | Confere |

Num repositório sem frontend, o caminho "do zero" (`REPLICAR.md`, 2.1) cria o app Next.js nas versões do
modelo e monta a casca e as telas iniciais numa entrega só. Com OpenSpec, cada fase é uma change em três
pedidos: propor (o agente para e o desenvolvedor revisa), aplicar e arquivar.

Ele segue o processo do codebase (OpenSpec, padrão de branch, testes). Para levar um codebase a uma versão
nova do modelo, o mesmo pedido serve: o `REPLICAR.md` tem a seção de atualização.

O zip tem só o que o desenvolvedor e o agente usam:

- [`GUIA.html`](GUIA.html), o guia do desenvolvedor, com os prompts;
- [`REPLICAR.md`](REPLICAR.md), o roteiro dele, e o [`DIAGNOSTICO.md`](DIAGNOSTICO.md), o formulário da Fase 0;
- a camada visual (`src/components/tema-mppa/`);
- as cores (`src/styles/tema-mppa.css`);
- o [`DESIGN.md`](DESIGN.md) da camada (tokens e intenção do design para agentes de IA, no formato aberto
  DESIGN.md), base do `DESIGN.md` de cada sistema;
- o script de cópia, o `verificar-camada.mjs`, que confere no codebase que ninguém editou a camada, e o
  `verificar-design.mjs`, que prende o `DESIGN.md` do sistema às cores do CSS;
- o protótipo, a prévia e as comparações.

Autenticação, sessão, API e regras de negócio do codebase não são tocadas.

## O que há neste repositório

| Caminho | Para quê |
| --- | --- |
| `GUIA.html` | guia do desenvolvedor do consumidor: passos e prompts de cada fase e da atualização |
| `REPLICAR.md` | roteiro do agente no codebase consumidor, em fases |
| `DIAGNOSTICO.md` | formulário da Fase 0, preenchido pelo agente no consumidor |
| `DESIGN.md` | tokens e intenção do design da camada (formato DESIGN.md), conferido contra o CSS |
| `src/components/tema-mppa/` | camada visual (shell e primitivos) |
| `src/styles/tema-mppa.css` | tokens: cores, raio, sombra, base |
| `src/app/` | demonstração que compila e exibe a camada (fica fora do zip) |
| `docs/prototipo/` | protótipo aprovado; manda em todo elemento gráfico |
| `docs/preview/` | prévia offline gerada da demonstração |
| `docs/comparacao/` | protótipo e modelo lado a lado, claro e escuro, 1280px e 390px |
| `scripts/` | verificação, cópia, conferência da camada no consumidor, empacotamento, prévia e capturas |

## Manter o modelo

```bash
npm install
npm run dev          # demonstração em http://localhost:3000
npm run check        # verificação (pinos, tokens, contraste, zip e consumidor de teste), typecheck, lint e build
npm run empacotar    # zip para os consumidores
```

Depois de mudar a aparência, regere a prévia e as comparações com a demonstração rodando
(`npm run build && npx next start -p 3123`). Os scripts usam o `playwright-core`, instalado fora do projeto:

```bash
export PLAYWRIGHT_CORE=/caminho/node_modules/playwright-core/index.mjs
node scripts/gerar-preview.mjs
FONTE=$(curl -s http://localhost:3123/ | grep -o '/_next/static/media/[^")]*woff2' | head -1)
node scripts/capturar-comparacao.mjs "$FONTE" /tmp/capturas
node scripts/compor-comparacao.mjs /tmp/capturas docs/comparacao
```

O `npm run check` gera o zip numa pasta temporária, copia a camada dele para um consumidor descartável e
compila esse consumidor (requer `zip` e `unzip`; leva cerca de um minuto a mais). Ao mudar uma cor, atualize o
`DESIGN.md` e, com rede, rode `npx @google/design.md lint DESIGN.md`.

Requer Node 22 ou mais novo. O `npm run check` executa `footerText` de verdade: transpila `utils.ts` com o TypeScript do projeto, sem depender do TypeScript nativo do Node.

Stack fixada (versões exatas, conferidas por `npm run check`):

- Next.js `16.3.5`, React `19.2.3`, TypeScript `5.9.3`, Tailwind CSS `4.3.3`;
- `@base-ui/react` `1.9.0`, Lucide `1.46.0`, TanStack Query `5.102.8`;
- tailwind-merge `3.6.0`, class-variance-authority `0.7.1`, clsx `2.1.1`.
