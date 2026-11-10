# Tema MPPA — template Next.js reutilizável

> **Para replicar esta interface num codebase:** coloque o zip na raiz do codebase e diga ao agente
> *"Descompacte tema-mppa-next-v1.1.1.zip, leia tema-mppa-next/REPLICAR.md e replique o modelo de
> interface neste codebase."* O [`REPLICAR.md`](REPLICAR.md) é o roteiro completo para o agente: cópia,
> dependências, configuração, telas, código de cores, estrutura, verificação e limpeza.

Versão **1.1.1**. Shell visual configurável igual ao protótipo aprovado, `docs/prototipo/index.html`
("Template Visual HubIA v1.0"): barra lateral recolhível, abas **Plataforma** e **Administração**,
cabeçalho de 56px com o título da página, busca `Ctrl+K`, tema claro/escuro/sistema, avatar com painel
da conta e primitivos de página (cartão, métrica, tabela, gráfico de barras, botões).

O protótipo manda em todo elemento gráfico: raio de 8px, bordas suaves, sombras discretas e gráficos com
degradê. A comparação lado a lado, nos dois temas, em 1280px e 390px, está em
[`docs/comparacao/`](docs/comparacao/README.md).

## Stack fixada

- Next.js `16.3.5` (App Router)
- React / React DOM `19.2.3`
- TypeScript `5.9.3`
- Tailwind CSS / PostCSS `4.3.3`
- shadcn/ui `base-nova`, com Base UI (`@base-ui/react` `1.9.0`)
- Lucide React `1.46.0`
- TanStack Query `5.102.8`
- tailwind-merge `3.6.0`
- npm

As versões são exatas, da matriz do ecossistema; `npm run verify:template` confere cada uma.

## O que o template faz

- reproduz o protótipo: tokens, componentes, espaçamentos e comportamento responsivo (ponto de quebra de 801px);
- centraliza a paleta (vermelho sobre Zinc), a fonte Outfit, o raio e a sombra em `src/styles/tema-mppa.css`;
- garante contraste AAA no claro (7:1, texto secundário igual ao principal) e 4,5:1 no escuro;
- lê `session.is_admin` **somente por propriedade** e mostra as abas apenas quando `is_admin === true` e há
  item administrativo visível;
- recebe símbolo, logos, nome, versão, usuário, perfil, rotas, menus e rodapé por configuração;
- remove imagens ausentes ou com falha sem exibir ícone quebrado;
- fornece uma busca local sobre as rotas configuradas;
- exporta primitivos para os consumidores pintarem as próprias telas: `PageFrame`, `Card`, `CardGrid`,
  `MetricCard`, `DataTable`, `BarChart`, `Button` e `SectionIcon`.

## O que o template não faz

Não implementa nem substitui autenticação, autorização de rota, BFF, API, cookies, login, logout ou regra
de negócio. O consumidor continua responsável por esses pontos. Ocultar a aba administrativa é
comportamento de interface; a proteção das rotas deve permanecer no sistema consumidor.

## Prévia sem instalar nada

[`docs/preview/index.html`](docs/preview/index.html) é a demonstração 1.1.0 numa página única, offline e
autocontida (CSS e fonte embutidos): abra direto no navegador. Ela é capturada do build de produção, então
mostra o HTML e o CSS dos componentes reais; abas, itens, tema, barra recolhida (`Ctrl+B`) e menu móvel
(`Esc` fecha) funcionam, mas a busca e o painel da conta ficam só na aparência. Para regerar, veja o
cabeçalho de `docs/preview/gerar-preview.mjs`.

## Executar a demonstração

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. A demonstração usa os dados do protótipo em `src/app/demo-config.tsx` e pinta
a tela só com os primitivos exportados (`src/app/demo-consumer.tsx`); nada disso é default do componente.

## Usar em outro projeto

Consulte, nesta ordem:

1. [`docs/INSTALACAO.md`](docs/INSTALACAO.md)
2. [`docs/CONFIGURACAO.md`](docs/CONFIGURACAO.md)
3. [`docs/INTEGRACAO.md`](docs/INTEGRACAO.md)
4. [`docs/ATUALIZACAO.md`](docs/ATUALIZACAO.md)
5. [`docs/VALIDACAO.md`](docs/VALIDACAO.md)

Também é possível copiar a camada visual com:

```bash
node scripts/copy-template.mjs /caminho/do/projeto-consumidor
```

O script só copia os componentes e o CSS para o destino. Ele não altera autenticação, rotas, BFF, APIs nem
`package.json`. A camada é copiada sem edição: o que é de cada sistema entra por configuração.

## Validação

```bash
npm run verify:template
npm run typecheck
npm run lint
npm run build
# ou tudo em sequência
npm run check
```
