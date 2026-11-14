# Replicar o modelo de interface (instruções para o agente)

Você é um agente de código trabalhando num **codebase consumidor**, novo ou antigo. O usuário colocou aqui o
modelo `tema-mppa-next` e pediu que você **replique o modelo de interface**: o layout, a estrutura e o código
de cores. Siga este arquivo do começo ao fim. Ele vale sozinho; o código da camada está em `src/`.

O trabalho anda em **fases**, cada uma uma entrega separada. Comece pela Fase 0, que só lê, e **pare** ao fim
dela: o desenvolvedor aprova o diagnóstico e decide os conflitos antes de qualquer arquivo mudar.

## 0. O que replicar e o que não tocar

Replicar:

- **Layout:**
  - barra lateral de 304px (76px recolhida);
  - cabeçalho de 62px no padrão dos sistemas (seção 9);
  - conteúdo com padding 40px × 36px (24px no tablet, 16px no celular) e largura máxima de 1380px;
  - menu móvel abaixo de 801px;
  - rodapé padrão dos sistemas.
- **Estrutura:**
  - abas Plataforma e Administração, e cada aba abre a página do primeiro item visível dela;
  - menu com ícones de seção coloridos;
  - busca `Ctrl+K` na barra lateral, acima do "Recolher";
  - tema claro, escuro e sistema;
  - identidade do usuário (avatar, nome e perfil) e botão de sair no cabeçalho;
  - cartões, métricas, tabelas e gráficos de barras.
- **Cores:** só os tokens de `src/styles/tema-mppa.css` (tabela na seção 8).

Não tocar: autenticação, login, logout, sessão, cookies, BFF, API, autorização de rotas e regras de
negócio. A interface **recebe** essas coisas por propriedade; o consumidor continua dono delas.

Referência visual, nesta ordem de autoridade:

1. `docs/prototipo/index.html`: o protótipo aprovado. Manda em todo elemento gráfico.
2. `docs/preview/index.html`: o modelo pronto, página única offline.
3. `docs/comparacao/*.png`: protótipo e modelo lado a lado, claro e escuro, 1280px e 390px.

Diferenças intencionais entre o modelo e o protótipo, que **não** devem ser "corrigidas":

- **Primária azul:** o protótipo era vermelho; todos os sistemas do MPPA usam azul como cor de ação (a mesma do
  Heimdall), e o realce, o ícone padrão e os gráficos o seguem (seção 8, "Equilíbrio de cores").
- **Tons escurecidos para o contraste:** texto secundário e ícones verde e laranja (tabela de cores na seção 8).
- **Ícones:** Lucide no lugar dos caracteres do protótipo.
- **Busca:** fica na barra lateral, fixa acima do "Recolher", com lupa e "Buscar na página"; o atalho `Ctrl+K` funciona, mas não aparece na tela.
- **Cabeçalho:** segue o padrão dos sistemas, não o do protótipo:
  - marca com nome e versão na mesma linha;
  - logos institucionais;
  - nome e perfil do usuário visíveis;
  - botão de sair.
- **Tema:** o botão alterna entre claro, escuro e sistema.
- **Rodapé:** o protótipo não tem; o padrão dos sistemas tem (seção 9).

## 1. Como trabalhar no consumidor

### 1.1 As fases

| Fase | O que faz | Muda arquivos? |
| --- | --- | --- |
| **0. Diagnóstico** (seção 3) | Lê o consumidor e preenche o `DIAGNOSTICO.md`. | Não. Para e espera o desenvolvedor. |
| **1. Casca** (seção 4) | Copia a camada; liga fonte, cores e tema; configura marca, menus e sessão; troca o rodapé; ajusta os testes do layout antigo; cria o `DESIGN.md`. | Sim. Uma entrega. |
| **2. Telas** (seção 5) | Repinta as telas com os primitivos. | Sim. Uma entrega por tela ou grupo de telas. |
| **3. Limpeza** (seção 6) | Tira componentes, bibliotecas e tokens antigos que ficaram sem uso. | Sim. Uma entrega. |
| **Atualização** (seção 7) | Leva o consumidor a uma versão nova do modelo. | Sim. |
| **Do zero** (seção 2.1) | Cria o app num repositório sem frontend, já com a casca e as telas iniciais. | Sim. Uma entrega. |

Num sistema **do zero** (repositório sem frontend), siga a seção 2.1: não há diagnóstico nem limpeza.
Num consumidor **novo** (app recém-criado, sem telas, sem testes de layout), as fases 1 e 2 podem ir juntas,
e a 3 não existe.
Num consumidor **antigo**, mantenha uma fase por entrega: a Fase 1 já entrega a cara nova, e as telas mudam
aos poucos, cada entrega pequena o bastante para revisar.

### 1.2 Siga o processo do consumidor

Antes de tudo, leia o `AGENTS.md`, o `CLAUDE.md` e o `README.md` do consumidor. As regras dele valem junto
com este guia; em conflito sobre **como trabalhar** (branch, commit, planejamento, testes), vale o consumidor.
Em conflito sobre **o padrão visual**, não decida: leve ao desenvolvedor no diagnóstico (item 12).

- **Planejamento:** se o consumidor usa OpenSpec (pasta `openspec/`) ou outro fluxo que exige plano revisado
  antes de código, cada fase é uma change desse fluxo, e o diagnóstico é o insumo do plano. A change anda em
  três passos, cada um num pedido do desenvolvedor:
  1. **Propor:** crie a change (proposta, tarefas e, se o projeto usa, design e specs) e **pare** sem
     implementar. O desenvolvedor revisa e pede ajustes.
  2. **Aplicar:** só quando ele aprovar, implemente as tarefas, verifique e faça o commit na branch.
  3. **Arquivar:** depois que ele conferir a entrega, arquive a change como o OpenSpec do projeto manda e
     faça o commit na mesma branch, antes do merge.

  Sem OpenSpec nem outro fluxo, cada fase é uma branch e um commit, sem passo de proposta.
- **Branch:** no padrão do consumidor (por exemplo, `change/<nome>`). Sem padrão, `feat/interface-tema-mppa`
  na Fase 1, `feat/interface-tema-mppa-telas-<grupo>` na 2 e `feat/interface-tema-mppa-limpeza` na 3.
- **Testes e documentação:** rode os que o consumidor manda rodar, e atualize os documentos que ele manda
  manter em dia, na mesma entrega.

### 1.3 Raiz do consumidor e monorepo

A **raiz do consumidor** é a pasta do `package.json` do frontend. Num monorepo, é a subpasta do frontend (por
exemplo, `apps/meu-app/frontend`). Todo caminho deste guia sem prefixo (`components/`, `styles/`,
`docs/tema-mppa/`, `app/`) é relativo a ela.

**A pasta do modelo.** O modelo chega como a pasta `tema-mppa-next/`, que o desenvolvedor copia inteira para a
raiz do repositório (não para a do frontend, num monorepo). Este guia a chama assim; se ela estiver em outro
lugar, troque `tema-mppa-next/` pelo caminho real em cada comando (é a pasta que tem `scripts/copy-template.mjs`).
Dentro dela, `SHA256SUMS` lista a soma de cada arquivo: o `copy-template.mjs` confere a pasta antes de copiar e
para se ela veio incompleta ou editada.

Caminhos do modelo citados sem prefixo (`src/…`, `scripts/…`, `docs/prototipo/`, `docs/preview/`,
`docs/comparacao/`) são os de dentro de `tema-mppa-next/`. Depois da cópia (4.1), a referência fica no consumidor
em `docs/tema-mppa/` (`docs/tema-mppa/prototipo/index.html`, `docs/tema-mppa/preview/index.html`,
`docs/tema-mppa/comparacao/`).

## 2. Conferir a stack

Leia o `package.json` e a estrutura de pastas do consumidor.

| Situação | Caminho |
| --- | --- |
| Next.js com App Router, React 19 e Tailwind CSS 4 | **Caminho A**: copiar a camada pronta (Fase 1, seção 4). |
| Qualquer outra (Vite, Pages Router, Tailwind 3, outro framework) | **Caminho B**: portar (seção 10). Não copie às cegas. |
| Sem frontend (repositório vazio ou só com documentos) | **Do zero**: criar o app (seção 2.1) e seguir o Caminho A. |

### 2.1 Sistema do zero

O desenvolvedor informa no pedido o nome do sistema, a versão, o ano (ou anos) da versão, a pasta do
frontend e as telas iniciais. Se faltar um desses dados, pergunte antes de começar. Não há Fase 0 (não há o
que diagnosticar) nem Fase 3 (não há visual antigo).

1. **OpenSpec:** se o desenvolvedor pediu OpenSpec e o repositório ainda não o tem, inicialize-o
   (`openspec init`) e trabalhe numa change, como em 1.2. Sem OpenSpec, trabalhe na branch
   `feat/interface-tema-mppa`.
2. **App:** crie o app Next.js na pasta do frontend (a raiz do consumidor, seção 1.3), na versão do modelo:

   ```bash
   npx create-next-app@16.3.5 <pasta> --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git
   ```

   Se a pasta já tem arquivos que conflitam (README, AGENTS.md), crie o app numa pasta temporária e mova-o,
   mantendo os arquivos que já estavam. Depois fixe as versões exatas, iguais às do modelo:

   ```bash
   npm install --save-exact next@16.3.5 react@19.2.3 react-dom@19.2.3
   npm install --save-exact --save-dev tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 typescript@5.9.3 eslint-config-next@16.3.5
   ```

   Apague a página e os estilos de exemplo do `create-next-app` (o conteúdo de `page.tsx`, o CSS além do
   `@import "tailwindcss";` e as imagens de `public/`).
3. **Casca:** siga a Fase 1 inteira (4.1 a 4.7 e 4.9), com os dados do pedido no `config/shell.tsx` (4.5):
   `brand.name`, `brand.version`, `brand.versionYears` e um item de `platformNavigation` por tela inicial,
   cada um com ícone Lucide e `tone`. A 4.8 não se aplica: não há testes antigos.
4. **Sessão:** o sistema ainda não tem autenticação, e este modelo não a implementa. Use uma sessão fixa
   num único arquivo (`config/sessao-provisoria.ts`), com `is_admin: false`, nome e perfil de exemplo, e um
   comentário dizendo que ela sai quando o sistema tiver autenticação. O botão de sair não faz nada até lá.
5. **Telas iniciais:** uma rota por tela, cada uma com `PageFrame` e uma frase que diga para que ela serve,
   só com os primitivos (seção 5). Sem dados inventados, sem API e sem regra de negócio.
6. **Verificação e registro:** confira que a pasta `tema-mppa-next/` já foi apagada (4.1), rode a 4.10 (o item 7
   não se aplica), registre no `AGENTS.md` (seção 11) e faça o commit.

## 3. Fase 0: Diagnóstico

1. Confira que a pasta `tema-mppa-next/` está na raiz do repositório (seção 1.3); o desenvolvedor a copia antes,
   para abrir o `GUIA.html`. Se ela não estiver lá, pare e peça-a. Ela nunca vai ao git: não use `git add -A`
   nem `git add .` enquanto ela existir (o `.gitignore` só a exclui a partir da 4.1).
2. Preencha o formulário `tema-mppa-next/DIAGNOSTICO.md` lendo o consumidor, **sem mudar nenhum arquivo dele**.
   Grave-o onde o processo do consumidor manda (seção 1.2); sem processo, em `docs/tema-mppa/diagnostico.md`.
   Registre no item 1 a **variante do tema** (`padrao` ou `v2`, 4.4) que o desenvolvedor pediu; sem pedido, `padrao`.
3. Entregue ao desenvolvedor um resumo curto: o caminho (A ou B), o que a Fase 1 muda e, um por um, os
   conflitos do item 12, cada um com a sua recomendação. **Pare aqui** até ele aprovar e decidir.

## 4. Fase 1: Casca (Caminho A)

### 4.1 Preparar e copiar

Acrescente ao `.gitignore` do repositório a linha `tema-mppa-next/` e, se não estiver lá, `*.tsbuildinfo`. Da
raiz do repositório:

```bash
node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor>   # "." se o frontend estiver na raiz
```

O script detecta a estrutura do consumidor:

- com `src/`: grava em `src/components/tema-mppa/` e `src/styles/tema-mppa.css`;
- sem `src/`: grava em `components/tema-mppa/` e `styles/tema-mppa.css`.

Use `--components-dir` e `--styles-dir` para outro lugar. Ele também grava em `docs/tema-mppa/`:

- a referência visual (protótipo, prévia, comparações), este guia, o `GUIA.html` do desenvolvedor (os
  prompts de cada fase) e o CHANGELOG do modelo;
- `DESIGN.md`, os tokens e a intenção do design da camada no formato DESIGN.md (ponto de partida da 4.9), e
  `verificar-design.mjs`, que confere um DESIGN.md contra o CSS;
- `camada.json`, a lista de conferência: a versão do modelo e o SHA-256 de cada arquivo da camada;
- `verificar-camada.mjs`, que confere a camada contra essa lista (`node docs/tema-mppa/verificar-camada.mjs`,
  da raiz do consumidor). Ligue-o aos testes ou ao `check` do consumidor, se ele tiver um.

E grava em `public/` (na raiz do consumidor, com ou sem `src/`; `--public-dir` para outro lugar) as três logos
padrão do cabeçalho: `mppa-logo.png`, `ciia.png` e `ciia-sigla.svg` (seção 4.5). Elas são do sistema, não da
camada: o script só as grava se faltam, nunca substitui uma que já existe (nem com `--force`) e avisa quando a do
sistema difere da do modelo. Faça o commit delas com a Fase 1.

Se a camada já existir, ele para; rode de novo com `--force`, que faz backup antes de substituir (na pasta
temporária do sistema, fora do consumidor, para lint e testes não acharem a camada antiga; o caminho sai no fim). A camada só
usa imports relativos: não depende do alias `@/`. Os arquivos saem com modo 644, e 755 só os scripts com
shebang (`verificar-camada.mjs`, `verificar-design.mjs`), seja qual for o modo que a pasta trouxe.

Antes de copiar, o script confere a pasta `tema-mppa-next/` contra o `SHA256SUMS` dela. Se apontar arquivo
ausente ou diferente, ele não copia nada: a pasta veio incompleta ou editada. Pare e peça ao desenvolvedor que a
copie de novo, inteira.

Logo depois da cópia, **apague a pasta `tema-mppa-next/`**: tudo o que o consumidor precisa já está em
`components/`, `styles/`, `public/` e `docs/tema-mppa/`. Se ela ficar, o `tsconfig` e o ESLint do consumidor
compilam uma segunda cópia da camada. O comentário do `index.ts` copiado cita `docs/prototipo/index.html`; no consumidor, o
arquivo está em `docs/tema-mppa/prototipo/index.html`.

**Não edite os arquivos copiados.** O que é de cada sistema entra por configuração e propriedades. Se a
camada não atende a uma necessidade real, registre-a para o modelo (seção 11) em vez de editar.

**Conferências do consumidor que a cópia aciona.** O diagnóstico (item 4) já as listou. Ajuste a
configuração delas, nunca os arquivos copiados:

- **Lint:** a camada desliga `@next/next/no-img-element` só na linha do `<img>` do `ImageSlot`. Se o consumidor
  desliga essa regra no projeto inteiro e reprova aviso (`--max-warnings 0`), a diretiva vira "Unused
  eslint-disable directive". Acrescente ao `eslint.config` do consumidor um bloco só para a camada:

  ```js
  { files: ["components/tema-mppa/**"], linterOptions: { reportUnusedDisableDirectives: "off" } },
  ```

  Use o caminho real da camada (com `src/`, se for o caso). Ignorar a pasta inteira também resolve, mas deixa
  de compilar a camada no lint.
- **Conferências que leem todo arquivo rastreado** (versão escrita fora dos pontos de versão, modo dos arquivos
  no git, links mortos em `.md`, cor fixa, ortografia): a camada não tem versão escrita e sai com modo
  644/755, mas `docs/tema-mppa/` é referência copiada (o CHANGELOG cita versões do modelo; o protótipo e a
  prévia têm cores fixas). Exclua `docs/tema-mppa/` dessas conferências, uma por uma.

### 4.2 Dependências, com versões exatas

```bash
npm install --save-exact react@19.2.3 react-dom@19.2.3 @base-ui/react@1.9.0 @tanstack/react-query@5.102.8 lucide-react@1.46.0 tailwind-merge@3.6.0 class-variance-authority@0.7.1 clsx@2.1.1
```

Instale só as que faltam ou diferem. Use o gerenciador do consumidor (pnpm, yarn) se não for npm. Não
adicione `@radix-ui/*`; as que o consumidor já tem saem na Fase 3. Se o consumidor fixa as versões numa matriz
própria, siga-a e anote no diagnóstico o que diverge.

### 4.3 CSS global e tokens próprios

No CSS global do consumidor (o que tem `@import "tailwindcss";`), logo depois dessa linha, com o caminho
relativo certo até o `tema-mppa.css`:

```css
@import "../styles/tema-mppa.css";
@custom-variant dark (&:is(.dark *));
```

O `tema-mppa.css` já traz a base (cor das bordas, fundo, cor do texto e fonte do `body`, movimento reduzido).
No CSS global do consumidor, **remova**:

- os tokens que a camada já define (`--background`, `--primary`, `--border`, `--radius`… e o `@theme` deles);
- regras de `html`/`body` que definem `background`, `color` ou `font-family`.

Os **tokens próprios** do consumidor (os que a camada não tem, como `--canvas` ou um `--accent-blue`) seguem a
tabela do diagnóstico (item 11):

| Situação do token próprio | O que fazer |
| --- | --- |
| Tem o mesmo papel de um token da camada | Aponte para ele: `--canvas: var(--background);` |
| Papel próprio, ainda usado | Mantenha no CSS do consumidor, em `:root` e `.dark`, com valor completo (hex) e o contraste da seção 8 conferido |
| Sem uso | Remova |

Exponha os próprios como cores do Tailwind num `@theme inline` do consumidor, como estavam. Outras regras
globais (reset de formulário, impressão, animações) podem ficar.

### 4.4 Layout raiz

```tsx
import { Inter, Outfit } from "next/font/google";
import { headers } from "next/headers";
import { TemaMppaProvider, ThemeScript, type TemaVariant } from "@/components/tema-mppa"; // ajuste o caminho

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const tema: TemaVariant = "padrao"; // "padrao" ou "v2": a variante escolhida no diagnóstico (item 1)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined; // só se o consumidor tem CSP com nonce
  return (
    <html lang="pt-BR" data-tema={tema} className={tema === "v2" ? inter.variable : outfit.variable} suppressHydrationWarning>
      <head><ThemeScript nonce={nonce} /></head>
      <body><TemaMppaProvider tema={tema}>{children}</TemaMppaProvider></body>
    </html>
  );
}
```

- **Variante do tema:** `"padrao"` (a interface de sempre: cartões de 16px, Outfit) ou `"v2"` (cartões de 24px,
  Inter, sombras em camadas e fundo da página mais escuro que o cartão; as cores são as mesmas). O valor vai nos
  dois lugares, o `data-tema` do `<html>` (os tokens, também no diálogo da busca, que vai para o `<body>`) e o
  `tema` do `TemaMppaProvider`. Quem usa só uma variante apaga a fonte da outra (`outfit` ou `inter`) e deixa o
  `tema` fixo. Sem escolha registrada no diagnóstico, é `"padrao"`. Trocar de variante depois é mudar esse valor
  (e a fonte); nenhum componente muda.
- **Script de tema:** use o `<ThemeScript>`. Ele aplica o tema e marca a barra recolhida
  (`data-tm-sidebar` no `<html>`) antes da hidratação, sem piscar nenhum dos dois. Ele e o
  `THEME_BOOT_SCRIPT` vêm de `theme-script.tsx`, módulo sem `"use client"`, e chegam ao layout raiz como texto.
  Não importe nada de `theme-provider.tsx` no servidor: ali tudo é `"use client"` e vira referência de cliente.
- **CSP:** se o consumidor tem `Content-Security-Policy` com `nonce`, passe o mesmo nonce que ele já usa (o
  cabeçalho ou a função dele) ao `<ThemeScript>`; sem isso, o navegador bloqueia o script de tema. Sem CSP, tire
  a linha do `nonce` e use `<ThemeScript />`.
- O layout raiz continua Server Component; os componentes da camada são client e podem ser usados nele.
- Se o consumidor já tem um `QueryClient`, passe-o: `<TemaMppaProvider queryClient={queryClient}>`.
- Se já tem um provedor de tema, remova-o e troque os usos dele (`useTheme`, alternador) pelos da camada. O
  da camada aplica a classe `dark` no `<html>`, abre sempre em claro e guarda a escolha só na aba
  (`sessionStorage`).
- Fonte: troque a fonte antiga pela da variante, como acima: Outfit no `padrao`, Inter na `v2`.

### 4.5 Configuração do shell

Crie um arquivo de configuração `.tsx`, porque `symbol` pode ser JSX (por exemplo `config/shell.tsx`), com
os dados **reais** do consumidor: nome, versão, menus atuais e logos. Modelo:

```tsx
import { FileText, Gauge, Settings } from "lucide-react";
import type { ShellConfig } from "@/components/tema-mppa";

export const shellConfig: ShellConfig = {
  brand: {
    name: "Nome do sistema",
    version: "1.0.0",
    versionYears: "2026", // ano (ou anos, "2025-2026") da versão, mostrado no rodapé
    tagline: "Subtítulo curto",
    homeHref: "/",
    symbol: <span className="tm-brand-mark" aria-hidden>N</span>, // ou { src: "/marca.svg", alt: "Nome" }
  },
  platformNavigation: [
    { id: "inicio", label: "Visão geral", href: "/", icon: Gauge, exact: true, tone: "blue" },
    { id: "docs", label: "Documentos", href: "/documentos", icon: FileText, tone: "green" },
    { id: "doc", label: "Documento", href: "/documentos/detalhe", icon: FileText, tone: "green", hidden: true },
  ],
  administrationNavigation: [
    { id: "config", label: "Configurações", href: "/admin/config", icon: Settings, tone: "violet" },
  ],
  header: {
    logos: [
      { src: "/mppa-logo.png", alt: "MPPA", width: 132, height: 76 },
      { src: "/ciia.png", alt: "CIIA", width: 244, height: 244 },
      { src: "/ciia-sigla.svg", alt: "", width: 132, height: 76 }, // sigla decorativa: repete a CIIA
    ],
    searchPlaceholder: "Buscar na página",
    signOutLabel: "Sair",
  },
};
```

Regras para preencher:

- `version` e `tagline` são opcionais: sem eles, a marca mostra só o nome. Use a versão do `package.json`
  do consumidor; não invente subtítulo.
- `versionYears`: o ano da versão (ou o intervalo, como `"2025-2026"`). Com `name` e `version`, monta o
  rodapé padrão, sempre igual em todos os sistemas: *"Desenvolvido pelo Ministério Público do Estado do
  Pará - Escritório de Inteligência Artificial - Nome do sistema - V 1.0.0 - 2026"*. O `AppShell` monta esse
  rodapé sozinho e não aceita substituição (a propriedade `footer` não existe). O nome da marca é o mesmo da
  barra lateral e do rodapé; se o consumidor tinha regra diferente para os dois, é um conflito do diagnóstico.
- `symbol`: a logo do sistema (`{ src, alt }`) ou, sem imagem, `<span className="tm-brand-mark">X</span>`
  com a inicial do sistema (quadrado de 32px com degradê vermelho, definido no `tema-mppa.css`).
- `header.logos`: **três itens, nesta ordem**, como no modelo acima. É o padrão dos sistemas, não exemplo da
  demonstração:
  1. MPPA: `{ src: "/mppa-logo.png", alt: "MPPA", width: 132, height: 76 }`;
  2. CIIA: `{ src: "/ciia.png", alt: "CIIA", width: 244, height: 244 }`;
  3. a sigla "CIIA", num espaço do tamanho da primeira: `{ src: "/ciia-sigla.svg", alt: "", width: 132, height: 76 }`.

  Os arquivos vêm na pasta do modelo, em `tema-mppa-next/public/`, e o `copy-template.mjs` os grava no `public/` do
  consumidor (4.1). A sigla tem `alt=""` (decorativa): com `alt="CIIA"`, o leitor de tela leria "CIIA, CIIA". A
  sigla é um SVG de 132×76: fundo `#fff`, texto "CIIA" em `#1a237e`, Arial 46px, negrito, centralizado em
  `y=55`. Se o sistema já tinha outras logos, é conflito do diagnóstico (item 12): o desenvolvedor decide. Na
  API, `logos: []` continua válido (sem logos, sem divisória). Cada logo é `{ src, alt, width, height }`; imagem ausente ou inválida some.
- Onde as logos aparecem: no cabeçalho a partir de 1024px, ou a partir de 801px com a barra recolhida; fora disso,
  sob a marca, na barra lateral aberta (801px a 1023px) ou no menu móvel (abaixo de 801px). Assim o título nunca
  fica espremido (seção 9).
- `header.searchPlaceholder` é o texto da caixa de busca da barra lateral (padrão: "Buscar na página"); `header.signOutLabel`, o
  rótulo do botão de sair.
- `description` e `keywords` dos itens são opcionais: preencha só com texto real do consumidor (por exemplo,
  as descrições de uma busca antiga).

- Migre **todos** os itens do menu atual do consumidor, com as mesmas rotas.
- Reveze os tons `"blue"` (o primeiro item e o padrão), `"green"`, `"violet"` e `"orange"`. Se o sistema precisa
  de uma cor por item e tem mais de quatro, use também `"teal"`, `"pink"` e `"amber"`. Não use `"red"` em item
  de menu: o vermelho é reservado ao que tem significado (seção 8).
- Rotas de detalhe ou fora do menu: crie itens com `hidden: true`, para darem o título certo.
- Item que some por condição (uma consulta, uma função desligada): monte a configuração numa função que
  recebe a condição e devolve o item com `hidden: true`; ele continua dando o título na própria rota.
- Rotas que devem marcar um item sem serem sub-rotas dele: use `matches`.
- Itens só de administrador vão em `administrationNavigation`.

Campos de cada item de navegação:

| Campo | Efeito |
| --- | --- |
| `id`, `label`, `href`, `icon` | obrigatórios; `icon` é um ícone do `lucide-react` |
| `exact` | só a rota exata marca o item; sem ele, as sub-rotas também marcam |
| `tone` | cor do ícone: `"blue"` (padrão), `"green"`, `"violet"`, `"orange"`, `"teal"`, `"pink"`, `"amber"`, `"red"` (reservado) |
| `description`, `keywords` | aparecem e entram no filtro da busca `Ctrl+K` |
| `matches` | outras rotas (e sub-rotas) que marcam o item |
| `hidden` | fora do menu e da busca, mas dá o título e a aba quando a rota é dele |

Um só item fica marcado: o de rota mais longa. Atalhos extras da busca entram em `searchItems: [{ id, label,
href, icon?, description?, keywords? }]`. A barra recolhe por botão ou `Ctrl+B` (atalho sem etiqueta na tela) e lembra a escolha.

### 4.6 Sessão e layout autenticado

O `AppShell` vai num componente client que envolve **só as páginas autenticadas**:

- Se o consumidor tem páginas públicas (login, erro, páginas abertas), use um route group:
  `app/(autenticado)/layout.tsx` renderiza o componente abaixo, e as páginas autenticadas passam para
  `app/(autenticado)/`. As URLs não mudam. As páginas públicas ficam fora do grupo, sem o shell.
- Se todas as páginas são autenticadas, renderize o componente no layout raiz, dentro do
  `TemaMppaProvider`.
- Se o consumidor já tem um layout autenticado, troque **só** o shell antigo dele por este, mantendo a
  confirmação de sessão, o carregamento e as telas de erro que ele já tem.

Adapte a sessão que o consumidor **já obtém** (não crie outra):

```tsx
"use client";
import { AppShell } from "@/components/tema-mppa";
import { shellConfig } from "@/config/shell";

export function LayoutAutenticado({ children }: { children: React.ReactNode }) {
  const sessao = useSessaoExistente(); // o hook, provider ou dado que o consumidor já usa
  if (!sessao) return null; // mantenha o loading/erro atual do consumidor

  return (
    <AppShell
      config={shellConfig}
      session={{
        user_id: sessao.id,
        name: sessao.nome,
        email: sessao.email,
        profileLabel: sessao.perfil,
        avatar: sessao.foto ? { src: sessao.foto, alt: sessao.nome } : null,
        is_admin: sessao.is_admin === true,
      }}
      onSignOut={logoutExistente}
    >
      {children}
    </AppShell>
  );
}
```

Outras propriedades do `AppShell`, todas opcionais:

| Propriedade | Efeito |
| --- | --- |
| `session={null}` | sessão ainda a caminho: a casca aparece (layout estático, sem salto), sem dado de usuário nem administração, com o botão de sair. Passe a sessão quando ela chegar. |
| `title` | título vindo do conteúdo, como o nome do registro numa rota de detalhe; substitui o rótulo do item no cabeçalho e sai sem ícone de seção |
| `headerActions` | ações do sistema no cabeçalho, à esquerda do tema (por exemplo, um botão de volta a outro sistema que só aparece em certa condição) |
| `renderSearch` | busca própria do sistema no lugar da paleta do modelo: recebe `{ open, setOpen }` e devolve o diálogo; o botão "Abrir busca" e o `Ctrl+K` continuam do modelo, e o diálogo é posto no `<body>` por portal |

`is_admin` tem de ser o booleano estrito vindo da sessão real (por exemplo, `sessao.role === "admin"`). Não
deduza administrador por e-mail, nome ou texto de perfil. A camada só esconde a administração; a proteção
das rotas administrativas continua no consumidor, como estava. `avatar` é opcional: sem foto, passe `null` e
o avatar mostra as iniciais (ou as de `initials`, se o sistema tem regra própria). `profileLabel` também; sem ele, aparece "Administrador" ou "Usuário". O nome e
o perfil aparecem ao lado do avatar a partir de 1280px; o e-mail, ao passar o mouse. Sem `onSignOut`, o
botão de sair não aparece. Remova o shell antigo (sidebar, header, navbar, busca) que o `AppShell` substitui.

### 4.7 Rodapé fora da casca

Páginas fora do `AppShell` que tinham rodapé (login, páginas públicas) passam ao mesmo texto padrão, montado
pela mesma função, com a mesma marca da configuração:

```tsx
import { footerText } from "@/components/tema-mppa";
import { shellConfig } from "@/config/shell";

<footer className="border-t py-4 text-center text-xs text-muted-foreground">{footerText(shellConfig.brand)}</footer>
```

O texto não é cortado (sem `truncate` nem `line-clamp`). Se a página não tinha rodapé, não acrescente.

### 4.8 Testes do layout antigo

Procure os testes do consumidor (unidade, componente, e2e, scripts) que conferem o layout de hoje: larguras,
textos e posição da marca, rodapé, busca, alternador e chave de tema, fonte, títulos e cores. O diagnóstico
(item 13) já os lista.

- Ajuste cada um ao comportamento novo; não apague teste sem que o que ele comprovava passe a outro.
- Testes que importavam o shell, a busca ou o provedor de tema antigos passam a usar os da camada.
- Cubra com teste, no mínimo: abas e itens de administração só com `is_admin: true` (também na busca), o
  título de cada rota com um só item marcado, o rodapé padrão e o botão de sair chamando o logout existente.
- Se o consumidor tem teste de cor fixa, a camada e o `tema-mppa.css` precisam passar nele; se não passarem,
  registre para o modelo (seção 11) em vez de editar a camada.

**Contrato observável da camada.** O que testes de unidade e e2e costumam ler, e o que muda em relação a uma
casca antiga típica:

| O quê | Na camada | Costuma quebrar |
| --- | --- | --- |
| Chaves de armazenamento | tema em `tema-mppa-theme` (`sessionStorage`); barra recolhida em `tema-mppa-sidebar-collapsed` (`localStorage`, `"1"` ou `"0"`) | teste que gravava a chave antiga ou o tema no `localStorage` |
| Barra recolhida | atributo `data-tm-sidebar="collapsed"` (ou `"expanded"`) no `<html>`; botão "Recolher menu lateral" / "Expandir menu lateral" com `aria-expanded` | teste que lia `data-state` da barra antiga |
| Alternador de tema | botão com aria-label "Tema: Claro. Alterar para Escuro"; ciclo claro → escuro → sistema | teste que procurava "Ativar tema escuro" ou alternava só entre claro e escuro |
| Barra lateral | `aside` com aria-label "Navegação principal"; abas com aria-label "Seções do menu" | seletor da `nav` ou da `aside` antigas |
| Título | um `h1` dentro do `header` (papel `banner`), sem trilha navegável; a seção à frente dele é decorativa (`aria-hidden`) | teste que procurava o título no conteúdo ou a trilha |
| Abas | na aba Plataforma, os links administrativos não ficam no DOM | teste que clicava num link administrativo a partir do dashboard: abra antes a aba Administração |
| Menu móvel | é a própria `aside`, fechada por translação (`-translate-x-full`); botão "Abrir menu lateral" | o Playwright a considera "visível" mesmo fechada: confira a posição (`boundingBox`) ou a classe, não `toBeVisible` |
| Busca | botão "Abrir busca" e diálogo "Busca e navegação" | seletor da busca antiga |
| Sair | botão com o aria-label do `signOutLabel` da configuração | texto do botão antigo |
| Tokens | cores em hex | teste que lia `--x` como HSL: leia a cor resolvida pelo navegador numa sonda (`el.style.color = 'var(--x)'` e `getComputedStyle(el).color`) |

### 4.9 DESIGN.md do sistema

O `DESIGN.md` ([formato aberto do Google Labs](https://github.com/google-labs-code/design.md), versão
`alpha`) dá aos agentes de IA os tokens e a intenção do design. Todo consumidor tem o seu, na raiz do
frontend, ao lado do `package.json`:

1. Copie `docs/tema-mppa/DESIGN.md` para a raiz e troque o `name`, a `description` e o título pelos do
   sistema (por exemplo, `"Nome do sistema · tema MPPA"`).
2. Mantenha todas as cores da camada, com os mesmos valores. Acrescente ao grupo `colors` os tokens próprios
   que ficaram no CSS do consumidor (tabela de 4.3), com o valor do tema claro; o escuro vai na tabela de
   "Colors". Componentes do sistema (por exemplo, o painel do login) entram em `components`, com referências
   `{colors.x}`.
3. Nas seções, diga o que é do sistema (quem usa, telas próprias, regras do `AGENTS.md` que afetam a
   interface) e, em "Do's and Don'ts", as regras visuais próprias decididas no diagnóstico. Telas ainda não
   repintadas vão numa seção "Known Gaps", no fim.
4. Confira:

   ```bash
   node docs/tema-mppa/verificar-design.mjs --css <CSS com os tokens próprios, por exemplo app/globals.css>
   ```

   O script reprova cor diferente da do CSS, cor da camada ausente, referência `{grupo.token}` inexistente
   e seção fora da ordem do formato. Ligue-o aos testes ou ao `check` do consumidor, como o
   `verificar-camada.mjs`. Se houver rede, rode também o linter oficial: `npx @google/design.md lint DESIGN.md`
   (0 erros; avisos de cor sem componente podem ficar).

Na Fase 3, tire do `DESIGN.md` os tokens que saíram do CSS.

### 4.10 Verificar a Fase 1

Os itens 3 a 7 precisam de navegador. Se você não tiver um, rode os itens 1, 2, 8 e 9, e entregue os demais ao
usuário como lista de conferência, dizendo que não foram verificados.

1. `node docs/tema-mppa/verificar-camada.mjs`: camada íntegra. `node docs/tema-mppa/verificar-design.mjs --css …`:
   DESIGN.md conforme.
2. `typecheck`, `lint`, testes e `build` do consumidor sem erro. No HTML servido (`curl` da página), o
   `<head>` traz `sessionStorage.getItem('tema-mppa-theme')`, sem "Attempted to call".
3. Abra o app em 1280px e em 390px, nos temas claro e escuro, e compare com `docs/tema-mppa/comparacao/` e o
   protótipo: raio, sombra, fundos, bordas, espaçamentos e cores da casca iguais.
4. Em 390px, a página não rola na horizontal.
5. Com `is_admin: false`, não há abas nem itens de administração, nem na busca. Com `true`, as duas abas
   aparecem. Clicar numa aba (mesmo na já aberta) abre a página do primeiro item visível dela, na ordem da
   configuração: "Minha Página" abre o primeiro de `platformNavigation`, "Administração" o primeiro de
   `administrationNavigation`. Por isso a ordem dos itens decide a página de entrada de cada aba.
6. Cada rota mostra o título certo, uma vez, no cabeçalho, e um só item marcado.
7. Login, logout, sessão expirada e chamadas de dados continuam funcionando como antes.
8. As conferências do consumidor que leem todo arquivo rastreado (4.1) passam.
9. Procure cor fixa nas telas: `grep -rnE "#[0-9a-fA-F]{3,6}\b|bg-white|text-(red|gray|zinc)-[0-9]" <pasta das telas>`.
   O resultado vai para a lista da Fase 2.

Registre no `AGENTS.md` do consumidor (seção 11) e faça o commit no padrão do consumidor.

## 5. Fase 2: Telas

Repinte as telas com os primitivos da camada, uma tela ou um grupo pequeno por entrega, na ordem do
diagnóstico (item 14). A lógica, as chamadas e o estado das páginas não mudam: só a apresentação.

### 5.1 Como repintar

```tsx
import { BarChart, Button, Card, CardGrid, DataTable, MetricCard, PageFrame, type DataTableColumn } from "@/components/tema-mppa";

<PageFrame
  description="Uma frase sobre a página."
  actions={<><Button>Ação principal</Button><Button variant="secondary">Secundária</Button></>}
>
  <CardGrid>
    <MetricCard label="Itens" value="24" note="Nota curta" />
    <MetricCard label="Categorias" value="6" />
  </CardGrid>
  <Card title="Título do cartão" description="Descrição curta.">
    <BarChart label="Descrição para leitor de tela" data={[{ label: "Seg", value: 35 }]} />
  </Card>
  <DataTable title="Tabela" columns={colunas} rows={linhas} rowKey={(linha) => linha.id} />
</PageFrame>
```

```tsx
// colunas da tabela, tipadas pela linha
type Linha = { id: string; titulo: string; data: string };
const colunas: DataTableColumn<Linha>[] = [
  { key: "titulo", header: "Título", cell: (linha) => linha.titulo },
  { key: "data", header: "Data", cell: (linha) => linha.data, align: "right" },
];
```

- **Título:** o título da página aparece só no cabeçalho, vindo do item de navegação. Apague `<h1>` e
  títulos repetidos dentro do conteúdo.
- **Ordem do conteúdo:** descrição e ações no topo (`PageFrame`), depois métricas (`CardGrid` de
  `MetricCard`), depois cartões com gráficos, depois tabelas. Mantenha todo o conteúdo que a página já tinha.
  Uma página que só tinha título e um parágrafo fica com o `PageFrame` e a `description`: isso é o esperado.
- **Cores com significado:** números em azul, verde ou laranja viram texto normal no `MetricCard`. Se a cor
  carregava informação (atraso, sucesso), diga isso no `note`, com `text-success` ou `text-warning` se
  preciso.
- **Componentes antigos:** troque cartões, botões, tabelas e gráficos antigos pelos primitivos. Para o que
  não tem primitivo (formulários, diálogos), use os tokens da seção 8 e `rounded-xl` (12px), `rounded-2xl` (16px) ou, para um quadro, `rounded-card` (acompanha a variante).
- **Cores:** troque toda cor fixa (`#hex`, `rgb()`, `text-red-600`, `bg-white`, `bg-gray-*`) pelo token
  equivalente.
- **Testes:** ajuste os testes da tela que procuravam o `<h1>`, textos ou classes antigas, pelo mesmo
  critério de 4.8.
- **Verificar:** itens 2 a 4 e 9 de 4.10 nas telas da entrega.

### 5.2 Referência dos primitivos

| Primitivo | Propriedades |
| --- | --- |
| `PageFrame` | `description?`, `actions?` (botões; largura total no celular), `children?` |
| `Card` | `title?`, `description?`, `actions?`, `padded?` (padrão `true`; `false` para conteúdo encostado), atributos de `<article>` |
| `CardGrid` | `columns?`: `1`, `2` (padrão), `3` ou `4`; uma coluna abaixo de 801px; 16px entre cartões |
| `MetricCard` | `label`, `value`, `note?` |
| `DataTable<Row>` | `title?`, `actions?`, `columns: { key, header, cell(row), align? }[]`, `rows`, `rowKey(row, i)`, `emptyMessage?`, `caption?` |
| `BarChart` | `data: { label, value }[]`, `label` (leitor de tela), `max?`, `variant?`: `"strong"` (azul) ou `"soft"` (azul claro) |
| `Button` | `variant?`: `"default"` (primário), `"secondary"`, `"ghost"`, `"chrome"`, `"destructive"`; `size?`: `"default"`, `"sm"`, `"icon"` (36px); atributos de `<button>` |
| `SectionIcon` | `icon` (Lucide), `tone?` |

Peças de painel (1.10.0), na estética da página de referência do Heimdall; a demonstração do modelo (`/`) as
usa todas:

| Primitivo | Propriedades |
| --- | --- |
| `PageGreeting` | `title`, `description?`, `badge?` (um `StatusBadge`), `aside?` (uma `InfoPill`) |
| `StatusBadge` | `children`, `tone?`: `"success"` (padrão), `"primary"`, `"warning"`, `"institutional"`; `pulse?` |
| `Tag` | `children`, `tone?`: `"primary"` (padrão), `"success"`, `"warning"`, `"institutional"`, `"neutral"`; `mono?` (código, sem maiúsculas) |
| `InfoPill` | `icon`, `tone?`, `title`, `description?`; some abaixo de 768px |
| `SectionTitle` | `children`, `tone?`: `"primary"` ou `"institutional"`; `hint?` (à direita, a partir de 640px); `live?` (ponto pulsando) |
| `PanelCard` | `title`, `icon?`, `tone?`, `accent?` (borda de cima: `"primary"`, `"institutional"` ou um tom), `aside?`, `children` |
| `InfoField` | `icon`, `tone?`, `label`, `value`, `action?` |
| `PanelGrid` | `children`; uma coluna no celular, três a partir de 640px |
| `LinkCard` | `href` (link) ou `onClick` (botão), `title`, `tag?`, `description?`, `icon?` + `tone?` ou `media?`, `accent?`, `kind?`: `"internal"` (›, padrão) ou `"external"` (↗), `footer?`, `disabled?` |
| `LinkCardMedia` | `icon?` ou `children` (a logo do sistema); caixa de 48px em degradê da primária |
| `MetricLine` | `icon?`, `value`, `label`; para o `footer` do `LinkCard` |

`NavigationItem` aceita `badge?` (selo curto à direita do rótulo no menu, no tom do item).

Para links com cara de botão: `<Link className={buttonVariants({ variant: "secondary" })}>`.

## 6. Fase 3: Limpeza

Quando nenhuma tela usar mais o visual antigo:

- remova os componentes de UI antigos que os primitivos substituíram e as bibliotecas que só eles usavam
  (por exemplo, `@radix-ui/*`), com o lock regenerado;
- remova os tokens próprios sem uso (tabela de 4.3), também do `DESIGN.md` (4.9), e as classes utilitárias
  antigas;
- confira com busca no código que nada mais importa o que saiu, e rode a verificação de 4.10.

## 7. Atualizar para uma versão nova do modelo

1. `node docs/tema-mppa/verificar-camada.mjs`: se apontar arquivo editado, entenda a edição antes de seguir;
   ela será perdida (vai para o backup).
2. **Antes da cópia, capture as telas** (receita em 7.1), se a versão nova anuncia mudança de aparência.
3. Com a pasta nova `tema-mppa-next/` na raiz do repositório (seção 1.3; se sobrou uma de versão anterior, ela
   precisa ter sido apagada antes, e não sobrescrita: arquivos velhos ficariam misturados), rode
   `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force`. O script confere a pasta contra
   o `SHA256SUMS` dela e para se ela veio incompleta ou editada; depois lista os arquivos da camada que estavam
   editados, guarda o backup fora do consumidor, grava as logos que faltam em `public/` e a lista de conferência
   da versão nova. **Logo em seguida, apague a pasta `tema-mppa-next/`** (4.1): daqui em diante, tudo é lido em
   `docs/tema-mppa/`.
4. Leia o `docs/tema-mppa/CHANGELOG.md` da versão anterior até a nova e faça o que a seção "Ao atualizar de"
   de cada versão pede ao consumidor (configuração nova, propriedade que saiu). **Saltando várias versões**, a
   cópia é uma só, com a versão final; os passos de cada "Ao atualizar de" se somam, e os que mandam copiar
   ou trocar a versão no `AGENTS.md` valem uma vez só.
5. **Refaça o `DESIGN.md` do sistema a partir do `docs/tema-mppa/DESIGN.md` novo**, com os tokens e o texto
   próprios do sistema por cima. Reaplicar as diferenças antigas (patch) falha quando a prosa da camada muda.
   Confira com o `verificar-design.mjs`, que precisa aprovar sem diferença.
6. Rode a verificação de 4.10, capture as telas de novo e compare (7.1), atualize a versão na seção
   "Interface" do `AGENTS.md`.

### 7.1 Pontos que costumam quebrar numa atualização

- **Capturas antes e depois:** um spec Playwright temporário, fora do commit, com um usuário administrador
  descartável e dados de exemplo; as telas principais (início, painel, uma lista, uma tela administrativa e o
  menu móvel), em 1280px e 390px, nos temas claro e escuro (tema gravado em `sessionStorage`, chave
  `tema-mppa-theme`, antes de abrir a página); cubra com uma faixa o que muda a cada execução (e-mail, hora).
  Compare pixel a pixel e classifique cada diferença: anunciada pelo CHANGELOG ou defeito.
- **Testes que leem classes internas da camada** (por exemplo, `desk:hidden` na barra recolhida) quebram
  quando a camada muda as classes. Teste pelo contrato observável (4.8): `aria-label`, `data-tm-sidebar`,
  largura e cor medidas.
- **Classes que sobrepõem a camada:** uma tela que passa cor ou borda na `className` de um primitivo (por
  exemplo, `border-border/70` num `Card`) continua com o visual antigo quando a camada muda o padrão. Procure
  essas classes (`grep -rn "border-border" <pasta das telas>` e semelhantes) e tire as que repetem ou contrariam
  a camada. Painel próprio que imita o cartão (raio 16px, fundo de cartão, sombra) segue o mesmo token do
  cartão, para não ficarem dois contornos diferentes lado a lado.
- **`bg-background` em componentes shadcn** (`Input`, botão `outline`, seletores, diálogos, alertas): o fundo
  da página deixa de ser o do cartão desde a 1.9.0. Superfície que precisa parecer cartão usa `bg-card`.
- **Degradê translúcido:** um degradê que termina transparente (`to-cor/[0.04]`) deixa ver o fundo da página
  e pode baixar o contraste do texto dentro dele. Ponha `bg-card` por baixo.
- **Medidor de contraste dos testes:** o fundo da página tem brilho decorativo (`--canvas-glow`, radial e fixo
  no `body`) e o item selecionado e as caixas de ícone usam `background-image`. Um medidor que lê
  `background-image` como cor cheia erra; ignore o brilho do `body` e componha as camadas sobre a cor de fundo.
- **Fonte mono:** a versão da marca e os números de métrica usam `font-mono`. Teste que exige uma
  só família em todo texto precisa aceitá-la nesses pontos.
- **Regras locais de cor:** regra, spec ou teste do consumidor que fixa a cor do texto (por exemplo, "todo texto
  preto") entra em conflito quando a camada muda a cor. Reescreva a regra local para seguir a camada; não
  sobreponha o token.

## 8. Código de cores (tokens)

Use as classes Tailwind da coluna "Classe". Nunca escreva o valor direto.

| Classe | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `bg-background` | `#f4f7fb` | `#070b12` | fundo da página (ardósia no claro, marinho no escuro), com o brilho `--canvas-glow` nos cantos |
| `bg-card` | `#ffffff` | `#111827` | cartões, botão secundário, busca |
| `bg-sidebar` / `text-sidebar-foreground` | `#ffffff` / `#334155` | `#0c121e` / `#cbd5e1` | barra lateral |
| `bg-muted` | `#f1f5f9` | `#182235` | trilho das abas, áreas neutras |
| `bg-header` | `rgba(255,255,255,.85)` | `rgba(12,18,30,.82)` | cabeçalho e rodapé translúcidos, com desfoque |
| `bg-highlight` / `text-highlight-foreground` | `#bfdbfe` / `#0a2a66` | `#2547a8` / `#ffffff` | item selecionado do menu, azul sólido sem degradê (9,62:1 e 8,25:1); sob o ponteiro, `bg-sidebar-hover` (`#ecf4fe` / `#142645`) |
| `text-foreground` | `#0f172a` | `#f8fafc` | texto principal |
| `text-muted-foreground` | `#5f6f86` | `#94a3b8` | texto secundário, cinza (4,67:1 no muted no claro; 6,21:1 no escuro) |
| `border` (`border-border`) | `#e2e8f0` | `rgba(255,255,255,.08)` | bordas |
| `border-card-border` | `#b5bac0` | `#3f6396` | contorno dos quadros (cartões, painéis, campos) e linhas internas deles e das tabelas |
| `text-institutional` / `text-institutional-foreground` | `#e11d48` / `#be123c` | `#fb7185` / `#fb7185` | selo da versão, aba Plataforma, nome no rodapé |
| `from-avatar-from to-avatar-to` / `text-avatar-foreground` | `#e11d48` → `#2563eb` / `#ffffff` | igual | avatar em degradê |
| `bg-online` | `#10b981` | `#10b981` | ponto de conectado |
| `text-theme-icon` | `#d97706` | `#60a5fa` | sol e lua do botão de tema |
| `bg-primary` / `text-primary-foreground` | `#0842a1` / `#ffffff` | `#61a6fa` / `#080c16` | ação principal, foco, links de ação |
| `bg-destructive` | `#991b1b` | `#f87171` | ação destrutiva |
| `text-success` / `text-warning` | `#08351f` / `#432506` | `#bbf7d0` / `#fef08a` | status |
| `bg-tone-red` + `text-tone-red-foreground` | `#fee2e2` + `#970611` | `#321426` + `#fb7185` | ícone vermelho (reservado) |
| `bg-tone-green` + `text-tone-green-foreground` | `#d1fae5` + `#047857` | `#0d3030` + `#34d399` | ícone verde |
| `bg-tone-violet` + `text-tone-violet-foreground` | `#ede9fe` + `#6d28d9` | `#231f45` + `#c4b5fd` | ícone violeta |
| `bg-tone-orange` + `text-tone-orange-foreground` | `#ffedd5` + `#a85005` | `#37231d` + `#fdba74` | ícone laranja |
| `bg-tone-blue` + `text-tone-blue-foreground` | `#dbeafe` + `#1d4ed8` | `#142645` + `#60a5fa` | ícone azul (padrão) |
| `bg-tone-teal` + `text-tone-teal-foreground` | `#ccfbf1` + `#0f766e` | `#0d3036` + `#5eead4` | ícone verde-água |
| `bg-tone-pink` + `text-tone-pink-foreground` | `#fce7f3` + `#be185d` | `#341c34` + `#f9a8d4` | ícone rosa |
| `bg-tone-amber` + `text-tone-amber-foreground` | `#fef3c7` + `#92400e` | `#362b1b` + `#fcd34d` | ícone âmbar |
| `bg-overlay/40` | `#000` a 40% | igual | fundo atrás do menu móvel |
| `bg-logo-surface` | `#ffffff` | `#ffffff` | fundo das logos |
| `shadow-surface` | `0 1px 3px rgba(15,23,42,.06), 0 1px 2px rgba(15,23,42,.04)` | `0 2px 6px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.06)` | aba e item ativos |
| `shadow-card` / `shadow-card-hover` | `0 2px 8px -2px rgba(15,23,42,.05), 0 1px 3px -1px rgba(15,23,42,.03)` / `0 14px 28px -6px rgba(15,23,42,.08), 0 4px 10px -2px rgba(15,23,42,.04)` | `0 4px 20px -2px rgba(0,0,0,.5)` e `0 18px 36px -8px rgba(0,0,0,.7)`, com brilho interno de 1px | cartão e cartão sob o mouse |
| `tm-bar tm-bar-strong` / `tm-bar-soft` | degradê `#0842a1→#3b82f6` / `#6f9be6→#94b6f1` | `#3b82f6→#61a6fa` / `#4f78b8→#7aa2dd` | barras de gráfico |

Contraste obrigatório:

- **Texto principal** (e o de status) sobre superfície neutra (fundo, cartão, muted, barra), nos dois temas: 7:1 ou mais.
- **Texto secundário** (`text-muted-foreground`), nos dois temas: 4,5:1 ou mais (WCAG AA) em toda superfície neutra; é
  cinza e deixa de ser igual ao principal.
- **Texto sobre preenchimento colorido** (botão primário, pílula): 4,5:1; no escuro, texto escuro sobre a primária.
- **Ícones de tom:** 4,5:1.

Os tokens já cumprem isso. Se o consumidor precisar de uma cor nova, crie um token no **próprio**
consumidor e confira o contraste.

Equilíbrio de cores (igual em todos os sistemas, sem diferença de cor, fonte, tamanho ou estrutura):

- **Azul é a ação:** botão primário, foco (`ring`), links de ação, `sidebar-primary` e `sidebar-ring`, o ícone do título da seção, o tom
  padrão dos ícones (`"blue"`, sem `tone`), as barras fortes do `BarChart` e as ilustrações de estado vazio que
  seguem a primária.
- **Vermelho só com significado:** destrutivo e erro (`--destructive`) e a identidade institucional (logos, o
  símbolo `tm-brand-mark`, o selo da versão, a aba Plataforma, o nome no rodapé e o realce do item ativo, que é
  um degradê do vermelho institucional ao azul). Não pinte ação nem ícone comum de vermelho.
- Os demais tons de seção (verde, violeta, laranja, verde-água, rosa, âmbar) continuam variados.
- Quem usava azul com token próprio (por exemplo, o `--accent-blue` do Heimdall) pode passar a usar a primária.

Não faça:

- **`text-primary` sobre `bg-primary/15` ou mais** (a pílula do shadcn/ui, nas opacidades maiores): com a
  primária `#0842a1`, o par cai abaixo de 7:1 no claro (6,59:1 sobre o fundo, 6,45:1 sobre o muted). Com
  `bg-primary/10` passa (`text-primary` sobre `bg-primary/10`: 7,18:1 sobre o fundo, 7,68:1 sobre o cartão e 7,04:1 sobre o muted;
  no escuro, 6,05:1 sobre o cartão e 4,98:1 sobre o muted). O mesmo vale para qualquer cor sobre a própria versão
  transparente: confira o contraste do par, não só o da cor.
- **Texto colorido onde o consumidor exige texto preto:** `text-success` e `text-warning` são coloridos (mais de 12:1
  sobre superfície neutra, quase pretos no claro). Se o consumidor tem regra de todo texto preto no claro, isso é conflito do diagnóstico (item 12): a
  cor fica no ícone ou no ponto de status, com o texto em `text-foreground`.

Fonte: Outfit (`font-sans`); na variante `v2`, Inter.

Raios, presos a `--radius` (8px; estética de 12 nov. 2026):

- `rounded-md` (6px): selo da versão;
- `rounded-lg` (8px): abas internas, ícones de seção e caixas das logos;
- `rounded-xl` (12px): botões, itens do menu, busca e trilho das abas;
- `rounded-2xl` (16px): tiles internos, tabelas e diálogo da busca; os quadros (`Card`, `PanelCard`, `LinkCard`) usam
  `rounded-card`, que é 16px no `padrao` e 24px na `v2`;
- `rounded-full`: avatar.

### 8.1 Variante `v2`

A `v2` muda a forma, não a paleta: azul de ação, vermelho institucional só com significado, ardósia no claro e
marinho no escuro, tons de seção, avatar e gráficos são os mesmos do `padrao`, e o verificador do modelo exige
isso. Os blocos dela ficam no `tema-mppa.css`, em `:root[data-tema="v2"]` (claro e escuro), e só sobrescrevem:

| Token | `padrao` | `v2` | Uso |
| --- | --- | --- | --- |
| `--font-tema` | Outfit | Inter | fonte do `font-sans`, `font-heading` e `body` |
| `--card-radius` (`rounded-card`) | 16px | 24px | `Card`, `PanelCard`, `LinkCard` |
| `--card-top-width` (`tm-card-top`) | 3px | 1px, sem a cor de destaque | borda de topo dos quadros com destaque |
| `--font-weight-bold` e `--font-weight-extrabold` | 700 e 800 | 600 | títulos e rótulos |
| `--background` (claro) | `#f4f7fb` | `#e2e8f0` | fundo da página: o cartão branco se destaca |
| `--muted-foreground` (claro) | `#5f6f86` | `#566880` | 4,62:1 no fundo mais escuro (o anterior dá 4,15:1) |
| `--card-border` (claro) | `#b5bac0` | `#cbd5e1` | contorno fino dos quadros |
| `--shadow`, `--card-shadow`, `--card-shadow-hover` (claro) | duas camadas | cinco camadas de 0,5px a 12px a 6% | quadros |

No escuro, a `v2` só muda a forma (fonte, raio, borda de topo e pesos); fundo, contorno e sombras são os do
`padrao`. Tela da `v2` usa os mesmos primitivos e as mesmas classes de cor; nada na tela depende da variante.
A forma vem do "Moveflux Design System" (cartões de 24px, Inter, contorno fino e sombra em camadas); a pré-visualização
da `v2` fica em `docs/tema-mppa/preview-v2/index.html`.

## 9. Estrutura do layout

```text
┌──────────────┬──────────────────────────────────────────────────────────────┐
│ [▣] Nome [v1.0]│ [ícone] Plataforma / Título        [☼] │ [logos] │ (PL) Nome / Perfil [⇥] │ 62px
├──────────────┼──────────────────────────────────────────────────────────────┤
│[Plataf.|Adm.]│  padding 40×36px (24 no tablet, 16 no celular), máx. 1380px  │
│ ──────────── │  Descrição da página ............ [Ação] [Secundária]        │
│ ▣ Item ativo │  ↕ 32px                                                      │
│ ▣ Item       │  ┌ Cartão ──────────┐ 16px ┌ Cartão ──────────┐              │
│ ▣ Item       │  └──────────────────┘      └──────────────────┘              │
│              │  ↕ 16px                                                      │
│              │  ┌ Tabela ─────────────────────────────────────┐             │
│              │  └─────────────────────────────────────────────┘             │
│[⌕ Buscar…   ]│                                                              │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Recolher    ◧│  Desenvolvido pelo MPPA - EIA - Nome - V 1.0.0 - 2026 (62px)  │
└──────────────┴──────────────────────────────────────────────────────────────┘
  304px (76px recolhida); abaixo de 801px vira menu móvel
```

Cabeçalho (igual em todos os sistemas):

- **Marca, no topo da barra lateral:** símbolo de 36px, com o nome em negrito e a versão num selo vermelho
  (fonte mono, 10px, `text-institutional-foreground`) na mesma linha.
- **Título:** ícone de seção de 28px, a seção à frente ("Minha Página / Meus acessos" na demonstração) e o
  rótulo do item (`text-sm`, peso 600). Tem prioridade de espaço: ocupa o que sobra e nunca fica com menos de
  128px; a seção só aparece quando o bloco do título tem 288px ou mais (consulta de contêiner) e encolhe antes
  do rótulo.
- **Tema:** botão `chrome` de ícone de 36px (borda, fundo do cartão, sombra leve), sol `text-theme-icon`.
- **Logos:** 32px de altura em caixas com borda e sombra sobre `bg-logo-surface`, com divisórias antes e depois;
  no cabeçalho a partir de 1024px, ou a partir de 801px com a barra recolhida. Fora disso, sob a marca (barra
  lateral aberta ou menu móvel). Padrão: MPPA, CIIA e a sigla CIIA (4.5).
- **Identidade:**
  - avatar redondo de 32px em degradê (`avatar-from` → `avatar-to`) com as iniciais (ou a foto) e o ponto
    verde de conectado;
  - nome (`text-xs` negrito) e perfil (`text-[11px]`, cor secundária) a partir de 1280px;
  - botão de sair de 36px, com realce destrutivo ao passar o mouse.
- **Fundo do cabeçalho:** `bg-header`, translúcido com desfoque.

Busca (igual em todos os sistemas): caixa de 36px (raio 12px) com lupa e "Buscar na página", sem etiqueta de atalho, fixa na barra lateral
logo acima do "Recolher" (não rola com o menu), na largura da barra. Com a barra recolhida, só a lupa; no
celular, no menu móvel.

Rodapé (igual em todos os sistemas), montado pela camada a partir de `brand` (seção 4.5):

- **A partir de 801px:** fixo no pé da tela, na faixa do "Recolher", com a mesma altura (62px, token
  `--shell-bar`) e a mesma borda.
- **Texto:** nunca é cortado. Além de 62px, o rodapé cresce.
- **No celular:** fica no fim da página, com a altura do texto.
- **Aparência:** borda superior, fundo `bg-header` com desfoque e texto `text-xs` centralizado, na cor secundária, com o órgão em negrito e o nome do sistema em `text-institutional-foreground`.

Medidas:

- **Ícone de seção:** caixa de 32px no menu (28px no título), tom com brilho (`tm-tone`).
- **Item de menu:** raio 12px, padding 8px 10px, 12px entre ícone e texto, 6px entre itens; no lugar do rótulo do grupo, uma linha de 1px em degradê do vermelho institucional ao azul, sumindo à direita (o rótulo fica só para leitores de tela).
- **Abas:** 32px de altura, com borda, num trilho com padding de 4px; a ativa em `bg-card` com sombra; ícones sempre visíveis.
- **Botões:** 36px de altura, raio 12px, peso 700; variante `chrome` no tema e no menu móvel.
- **Cartões:** raio 16px, padding de 24px, sombra `shadow-card`.
- **Métrica:** número de 32px, peso 800.
- **Gráfico:** 165px de altura; barras de até 90px de largura.

## 10. Caminho B: portar para outra stack

Os valores não mudam; só a forma. As fases são as mesmas; muda só a Fase 1, em que você recria a camada em
vez de copiá-la (e não há `verificar-camada.mjs`). Sem a cópia, a referência não chega a `docs/tema-mppa/`: copie
para lá, à mão, o `DESIGN.md`, o `verificar-design.mjs` (de `scripts/`), o `CHANGELOG.md`, este guia e os
`docs/prototipo/`, `docs/preview/` e `docs/comparacao/` da pasta `tema-mppa-next/`, antes de apagá-la; a 4.9 e a
4.10 os usam. O `verificar-design.mjs` precisa de `--css` com o CSS dos tokens, porque não há `camada.json`.

- **Cores:** copie os blocos `:root` e `.dark` de `src/styles/tema-mppa.css` como estão.
  - Tailwind 4: copie também o `@theme inline`.
  - Tailwind 3: mapeie as cores em `theme.extend.colors` como `var(--token)`.
  - Sem Tailwind: use as variáveis CSS diretamente.
- **Componentes:** recrie com o framework do consumidor, seguindo `src/components/tema-mppa/`:
  - `next/link` vira o link do roteador local;
  - `usePathname` vira a rota atual;
  - as abas usam qualquer componente acessível de abas;
  - o rodapé usa o mesmo texto de `footerText` (`src/components/tema-mppa/utils.ts`).
- **Fidelidade:** mantenha as medidas da seção 9 e compare visualmente com o protótipo, como em 4.10.

## 11. Registro e retorno ao modelo

1. Confira que a pasta `tema-mppa-next/` já foi apagada (seção 4.1). A referência fica em
   `docs/tema-mppa/`.
2. Na Fase 1, acrescente ao `AGENTS.md` do consumidor; se ele não existir, crie-o. Se houver `CLAUDE.md` que
   não aponte para o `AGENTS.md`, ponha lá também. Troque `<pasta>` pelos caminhos reais (por exemplo,
   `components` ou `src/components`):

```markdown
## Interface (tema-mppa 1.13.1)

- A camada visual fica em `<pasta>/tema-mppa/` e `<pasta dos estilos>/tema-mppa.css`; não edite esses arquivos.
  Confira com `node docs/tema-mppa/verificar-camada.mjs` e atualize copiando uma versão nova do modelo
  (`docs/tema-mppa/REPLICAR.md`, seção 7).
- Referência visual: `docs/tema-mppa/prototipo/index.html` (manda) e `docs/tema-mppa/preview/index.html`.
- Variante do tema: `padrao` ou `v2`, escolhida uma vez no layout raiz (`tema`, `REPLICAR.md` 4.4). Mudar de variante é mudar esse valor e a fonte; tela nenhuma depende dela. A prévia da `v2` fica em `docs/tema-mppa/preview-v2/index.html`.
- `DESIGN.md` na raiz do frontend: tokens e intenção do design para os agentes; confira com
  `node docs/tema-mppa/verificar-design.mjs --css <CSS próprio>` a cada mudança de token.
- Telas só com os primitivos (`PageFrame`, `Card`, `CardGrid`, `MetricCard`, `DataTable`, `BarChart`,
  `Button` e as peças de painel: `PageGreeting`, `PanelCard`, `InfoField`, `SectionTitle`, `LinkCard`); cores só pelos tokens; título só no cabeçalho, vindo do item de navegação.
- Contraste: texto principal com 7:1; secundário com 4,5:1 nos dois temas; 4,5:1 em texto de destaque
  colorido (marca, links, status) e em texto sobre preenchimento colorido.
- Administração aparece só com `session.is_admin === true`.
```

3. Ao fim de cada fase, resuma ao usuário o que mudou e o que ficou pendente, e liste à parte o que este guia
   **não previu** no consumidor (passo que faltou, instrução que não cabia, necessidade que a camada não
   atende). Essa lista volta ao modelo `tema-mppa-next` e melhora a próxima versão.
