# Tema MPPA — modelo de interface para Next.js

Versão **1.4.0**. Interface igual ao protótipo aprovado ([`docs/prototipo/index.html`](docs/prototipo/index.html)), com o
cabeçalho padrão dos sistemas:

- barra lateral com abas Plataforma e Administração;
- cabeçalho de 56px: título da página, busca, tema, logos institucionais, nome e perfil do usuário e
  botão de sair;
- busca `Ctrl+K`;
- tema claro e escuro;
- rodapé padrão com o crédito institucional, o nome, a versão e o ano do sistema;
- cartões, métricas, tabelas e gráficos;
- código de cores com contraste AAA.

Veja pronta em [`docs/preview/index.html`](docs/preview/index.html), que abre direto no navegador.

## Usar num codebase

1. Gere o zip: `npm run empacotar`. Ele grava `tema-mppa-next-v1.4.0.zip` e o `.sha256` na pasta acima
   desta.
2. Copie o zip para a raiz do codebase que vai receber a interface.
3. Diga ao agente desse codebase:

   > Descompacte tema-mppa-next-v1.4.0.zip, leia tema-mppa-next/REPLICAR.md e replique o modelo de
   > interface neste codebase.

O zip tem só o que o agente usa:

- [`REPLICAR.md`](REPLICAR.md), o roteiro dele;
- a camada visual (`src/components/tema-mppa/`);
- as cores (`src/styles/tema-mppa.css`);
- o script de cópia;
- o protótipo, a prévia e as comparações.

Autenticação, sessão, API e regras de negócio do codebase não são tocadas.

## O que há neste repositório

| Caminho | Para quê |
| --- | --- |
| `REPLICAR.md` | roteiro do agente no codebase consumidor |
| `src/components/tema-mppa/` | camada visual (shell e primitivos) |
| `src/styles/tema-mppa.css` | tokens: cores, raio, sombra, base |
| `src/app/` | demonstração que compila e exibe a camada (fica fora do zip) |
| `docs/prototipo/` | protótipo aprovado; manda em todo elemento gráfico |
| `docs/preview/` | prévia offline gerada da demonstração |
| `docs/comparacao/` | protótipo e modelo lado a lado, claro e escuro, 1280px e 390px |
| `scripts/` | verificação, cópia, empacotamento, prévia e capturas |

## Manter o modelo

```bash
npm install
npm run dev          # demonstração em http://localhost:3000
npm run check        # verificação (pinos, tokens, contraste), typecheck, lint e build
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

Stack fixada (versões exatas, conferidas por `npm run check`):

- Next.js `16.3.5`, React `19.2.3`, TypeScript `5.9.3`, Tailwind CSS `4.3.3`;
- `@base-ui/react` `1.9.0`, Lucide `1.46.0`, TanStack Query `5.102.8`;
- tailwind-merge `3.6.0`, class-variance-authority `0.7.1`, clsx `2.1.1`.
