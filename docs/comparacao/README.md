# Comparação com o protótipo

O protótipo aprovado (`docs/prototipo/index.html`, "Template Visual HubIA v1.0") manda em todo elemento
gráfico. Cada imagem põe, lado a lado, o protótipo (à esquerda) e a demonstração do modelo 1.1.0 (à
direita), página inteira:

| Largura | Claro | Escuro |
| --- | --- | --- |
| 1280px | `comparacao-1280-claro.png` | `comparacao-1280-escuro.png` |
| 390px | `comparacao-390-claro.png` | `comparacao-390-escuro.png` |

`menu-movel-390-claro.png` mostra o menu móvel aberto em 390px.

## Diferenças que permanecem, de propósito

- **Contraste:** primária, texto secundário, vermelho sobre o realce e ícones verde e laranja foram
  escurecidos para a regra AAA dos consumidores (tabela no CHANGELOG 1.1.0). No escuro, o botão primário
  fica `#ef4444` com texto escuro.
- **Ícones:** Lucide no lugar dos caracteres do protótipo (◴, ▤, ◎, ♙). O protótipo também repete o caractere
  no título (`◴Visão geral`); o modelo mostra só o ícone de seção e o rótulo.
- **Busca:** o modelo mostra o atalho `Ctrl K` e, no celular, a lupa dentro do quadrado de 34px (o protótipo
  deixa o quadrado vazio).
- **Tema:** o botão mostra o tema atual (sol, lua ou monitor) e alterna entre claro, escuro e sistema.
- **Fonte:** o protótipo pede Outfit, mas não a carrega; nas capturas, a Outfit servida pela demonstração foi
  oferecida ao protótipo. Os botões do protótipo não herdam a fonte (padrão do navegador); no modelo herdam.
- **Versão:** a demonstração mostra `v1.1`.

## Regerar as imagens

Com a demonstração rodando (`npm run build && npx next start -p 3123`) e o `playwright-core` instalado fora
do projeto, a partir da raiz do modelo:

```bash
FONTE=$(curl -s http://localhost:3123/ | grep -o '/_next/static/media/[^")]*woff2' | head -1)
mkdir -p /tmp/capturas
export PLAYWRIGHT_CORE=/caminho/node_modules/playwright-core/index.mjs
node docs/comparacao/shots.mjs "$FONTE" /tmp/capturas
node docs/comparacao/compose.mjs /tmp/capturas docs/comparacao
```

`CHROMIUM` aponta outro executável do Chromium; `BASE_URL`, outro endereço; `PROTOTIPO`, outro protótipo.
