# Replicar o modelo de interface (instruções para o agente)

Você é um agente de código trabalhando num **codebase consumidor**. O usuário colocou aqui o modelo
`tema-mppa-next` e pediu que você **replique o modelo de interface**: o layout, a estrutura e o código de
cores. Siga este arquivo do começo ao fim. Ele vale sozinho; o código da camada está em `src/`.

## 0. O que replicar e o que não tocar

Replicar:

- **Layout:**
  - barra lateral de 260px (64px recolhida);
  - cabeçalho de 56px no padrão dos sistemas (seção 4);
  - conteúdo com padding 38px e largura máxima de 1500px;
  - menu móvel abaixo de 801px.
- **Estrutura:**
  - abas Plataforma e Administração;
  - menu com ícones de seção coloridos;
  - busca `Ctrl+K`;
  - tema claro, escuro e sistema;
  - identidade do usuário (avatar, nome e perfil) e botão de sair no cabeçalho;
  - cartões, métricas, tabelas e gráficos de barras.
- **Cores:** só os tokens de `src/styles/tema-mppa.css` (tabela na seção 3).

Não tocar: autenticação, login, logout, sessão, cookies, BFF, API, autorização de rotas e regras de
negócio. A interface **recebe** essas coisas por propriedade; o consumidor continua dono delas.

Referência visual, nesta ordem de autoridade:

1. `docs/prototipo/index.html`: o protótipo aprovado. Manda em todo elemento gráfico.
2. `docs/preview/index.html`: o modelo pronto, página única offline.
3. `docs/comparacao/*.png`: protótipo e modelo lado a lado, claro e escuro, 1280px e 390px.

Diferenças intencionais entre o modelo e o protótipo, que **não** devem ser "corrigidas":

- **Tons escurecidos para o contraste:** primária, texto secundário, vermelho sobre o realce e ícones verde
  e laranja (tabela de cores na seção 3).
- **Ícones:** Lucide no lugar dos caracteres do protótipo.
- **Busca:** mostra `Ctrl K` e uma lupa.
- **Cabeçalho:** segue o padrão dos sistemas, não o do protótipo:
  - marca com nome e versão na mesma linha;
  - logos institucionais;
  - nome e perfil do usuário visíveis;
  - botão de sair.
- **Tema:** o botão alterna entre claro, escuro e sistema.

## 1. Conferir a stack do consumidor

Leia o `package.json` e a estrutura de pastas do consumidor.

| Situação | Caminho |
| --- | --- |
| Next.js com App Router, React 19 e Tailwind CSS 4 | **Caminho A**: copiar a camada pronta (seção 2). |
| Qualquer outra (Vite, Pages Router, Tailwind 3, outro framework) | **Caminho B**: portar (seção 6). Não copie às cegas. |

Antes de mudar qualquer arquivo, crie uma branch: `git checkout -b feat/interface-tema-mppa`. Acrescente
ao `.gitignore` do consumidor `tema-mppa-next/`, `tema-mppa-next-*.zip*`, `.tema-mppa-backup-*/` e, se não
estiver lá, `*.tsbuildinfo`, para nada disso entrar no commit.

## 2. Caminho A: copiar e ligar a camada

### 2.1 Copiar

Descompacte o zip (`unzip tema-mppa-next-v1.4.0.zip`); ele cria a pasta `tema-mppa-next/`. Da raiz do
consumidor:

```bash
node tema-mppa-next/scripts/copy-template.mjs .
```

O script detecta a estrutura do consumidor:

- com `src/`: grava em `src/components/tema-mppa/` e `src/styles/tema-mppa.css`;
- sem `src/`: grava em `components/tema-mppa/` e `styles/tema-mppa.css`.

Use `--components-dir` e `--styles-dir` para outro lugar. Ele também copia a referência visual e este
guia para `docs/tema-mppa/`. Se a camada já existir, ele para; rode de novo com `--force`, que faz backup
antes de substituir.

A camada só usa imports relativos: não depende do alias `@/`.

Logo depois da cópia, **apague a pasta descompactada `tema-mppa-next/`**: tudo o que o consumidor precisa já
está em `components/`, `styles/` e `docs/tema-mppa/`. Se ela ficar, o `tsconfig` e o ESLint do consumidor
compilam uma segunda cópia da camada. O zip é do usuário: deixe-o (o `.gitignore` já o exclui) e diga que
pode ser apagado. O comentário do `index.ts` copiado cita `docs/prototipo/index.html`; no consumidor, o
arquivo está em `docs/tema-mppa/prototipo/index.html`.

**Não edite os arquivos copiados.** O que é de cada sistema entra por configuração e propriedades.

### 2.2 Dependências, com versões exatas

```bash
npm install --save-exact react@19.2.3 react-dom@19.2.3 @base-ui/react@1.9.0 @tanstack/react-query@5.102.8 lucide-react@1.46.0 tailwind-merge@3.6.0 class-variance-authority@0.7.1 clsx@2.1.1
```

Use o gerenciador do consumidor (pnpm, yarn) se não for npm. Não adicione `@radix-ui/*`.

### 2.3 CSS global

No CSS global do consumidor (o que tem `@import "tailwindcss";`), logo depois dessa linha, com o caminho
relativo certo até o `tema-mppa.css`:

```css
@import "../styles/tema-mppa.css";
@custom-variant dark (&:is(.dark *));
```

Só essas duas linhas: o `tema-mppa.css` já traz a base (cor das bordas, fundo, cor do texto e fonte do
`body`, movimento reduzido). No CSS global do consumidor, **remova**:

- blocos `:root { --background: … }`, `.dark { … }` ou `@theme` com as mesmas variáveis (padrão do
  shadcn/ui): as cores passam a vir só do `tema-mppa.css`;
- regras de `html`/`body` que definem `background`, `color` ou `font-family`.

Outras regras globais do consumidor (reset de formulário, impressão) podem ficar.

### 2.4 Layout raiz

```tsx
import { Outfit } from "next/font/google";
import { TemaMppaProvider, THEME_BOOT_SCRIPT } from "@/components/tema-mppa"; // ajuste o caminho

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={outfit.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} /></head>
      <body><TemaMppaProvider>{children}</TemaMppaProvider></body>
    </html>
  );
}
```

O layout raiz continua Server Component; os componentes da camada são client e podem ser usados nele.
Se o consumidor já tem um `QueryClient`, passe-o: `<TemaMppaProvider queryClient={queryClient}>`. Se já
tem um provedor de tema, remova-o: o da camada aplica a classe `dark` no `<html>`.

### 2.5 Configuração do shell

Crie um arquivo de configuração `.tsx`, porque `symbol` pode ser JSX (por exemplo `config/shell.tsx`) com os dados **reais** do consumidor:
nome, versão, menus atuais e logos. Modelo:

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
    { id: "inicio", label: "Visão geral", href: "/", icon: Gauge, exact: true, tone: "red" },
    { id: "docs", label: "Documentos", href: "/documentos", icon: FileText, tone: "green" },
    { id: "doc", label: "Documento", href: "/documentos/detalhe", icon: FileText, tone: "green", hidden: true },
  ],
  administrationNavigation: [
    { id: "config", label: "Configurações", href: "/admin/config", icon: Settings, tone: "violet" },
  ],
  header: { logos: [], searchPlaceholder: "Buscar ou executar…", signOutLabel: "Sair" },
};
```

Regras para preencher:

- `version` e `tagline` são opcionais: sem eles, a marca mostra só o nome. Use a versão do `package.json`
  do consumidor; não invente subtítulo.
- `versionYears`: o ano da versão (ou o intervalo, como `"2025-2026"`). Com `name` e `version`, monta o
  rodapé padrão, sempre igual em todos os sistemas: *"Desenvolvido pelo Ministério Público do Estado do
  Pará - Escritório de Inteligência Artificial - Nome do sistema - V 1.0.0 - 2026"*. O `AppShell` monta esse
  rodapé sozinho e não aceita substituição (a propriedade `footer` não existe mais). Se o consumidor
  passava `footer` ou tinha rodapé próprio, apague-o.
- `symbol`: a logo do sistema (`{ src, alt }`) ou, sem imagem, `<span className="tm-brand-mark">X</span>`
  com a inicial do sistema (quadrado de 32px com degradê vermelho, definido no `tema-mppa.css`).
- `header.logos: []` é válido; logos institucionais entram como `{ src, alt, width, height }` e aparecem
  no cabeçalho a partir de 640px (abaixo disso, no menu móvel).
- `header.searchPlaceholder` é o texto da caixa de busca (por exemplo, "Ir para…"); `header.signOutLabel`, o
  rótulo do botão de sair.
- `description` e `keywords` dos itens são opcionais: preencha só com texto real do consumidor.

- Migre **todos** os itens do menu atual do consumidor, com as mesmas rotas.
- Reveze os tons `"red"`, `"green"`, `"violet"` e `"orange"`, como no protótipo.
- Rotas de detalhe ou fora do menu: crie itens com `hidden: true`, para darem o título certo.
- Rotas que devem marcar um item sem serem sub-rotas dele: use `matches`.
- Itens só de administrador vão em `administrationNavigation`.

Campos de cada item de navegação:

| Campo | Efeito |
| --- | --- |
| `id`, `label`, `href`, `icon` | obrigatórios; `icon` é um ícone do `lucide-react` |
| `exact` | só a rota exata marca o item; sem ele, as sub-rotas também marcam |
| `tone` | cor do ícone: `"red"` (padrão), `"green"`, `"violet"`, `"orange"` |
| `description`, `keywords` | aparecem e entram no filtro da busca `Ctrl+K` |
| `matches` | outras rotas (e sub-rotas) que marcam o item |
| `hidden` | fora do menu e da busca, mas dá o título e a aba quando a rota é dele |

Um só item fica marcado: o de rota mais longa. Atalhos extras da busca entram em `searchItems: [{ id, label,
href, icon?, description?, keywords? }]`. A barra recolhe por botão ou `Ctrl+B` e lembra a escolha.

### 2.6 Sessão e layout autenticado

O `AppShell` vai num componente client que envolve **só as páginas autenticadas**:

- Se o consumidor tem páginas públicas (login, erro, páginas abertas), use um route group:
  `app/(autenticado)/layout.tsx` renderiza o componente abaixo, e as páginas autenticadas passam para
  `app/(autenticado)/`. As URLs não mudam. As páginas públicas ficam fora do grupo, sem o shell.
- Se todas as páginas são autenticadas, renderize o componente no layout raiz, dentro do
  `TemaMppaProvider`.
- Se o consumidor já tem um layout autenticado, troque o shell antigo dele por este.

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

`is_admin` tem de ser o booleano estrito vindo da sessão real. Não deduza administrador por e-mail,
nome ou texto de perfil. Se o consumidor não tinha tela de carregamento nem de erro, `return null` enquanto
não há sessão é aceitável. `avatar` é opcional: sem foto, passe `null` e o avatar mostra as iniciais.
`profileLabel` também; sem ele, aparece "Administrador" ou "Usuário". O nome e o perfil aparecem ao
lado do avatar a partir de 1280px; o e-mail, ao passar o mouse. Sem `onSignOut`, o botão de sair não aparece. Remova o shell antigo (sidebar,
header, navbar) que o `AppShell` substitui.

### 2.7 Telas

Repinte cada página só com os primitivos da camada:

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
  não tem primitivo (formulários, diálogos), use os tokens da seção 3 e `rounded-lg` (8px).
- **Cores:** troque toda cor fixa (`#hex`, `rgb()`, `text-red-600`, `bg-white`, `bg-gray-*`) pelo token
  equivalente.
- **Dados:** a lógica, as chamadas e o estado das páginas não mudam: só a apresentação.

### 2.8 Referência dos primitivos

| Primitivo | Propriedades |
| --- | --- |
| `PageFrame` | `description?`, `actions?` (botões; largura total no celular), `children?` |
| `Card` | `title?`, `description?`, `actions?`, `padded?` (padrão `true`; `false` para conteúdo encostado), atributos de `<article>` |
| `CardGrid` | `columns?`: `1`, `2` (padrão), `3` ou `4`; uma coluna abaixo de 801px; 20px entre cartões |
| `MetricCard` | `label`, `value`, `note?` |
| `DataTable<Row>` | `title?`, `actions?`, `columns: { key, header, cell(row), align? }[]`, `rows`, `rowKey(row, i)`, `emptyMessage?`, `caption?` |
| `BarChart` | `data: { label, value }[]`, `label` (leitor de tela), `max?`, `variant?`: `"strong"` (vermelho) ou `"soft"` (rosado) |
| `Button` | `variant?`: `"default"` (primário), `"secondary"`, `"ghost"`, `"destructive"`; `size?`: `"default"`, `"sm"`, `"icon"` (34px); atributos de `<button>` |
| `SectionIcon` | `icon` (Lucide), `tone?` |

Para links com cara de botão: `<Link className={buttonVariants({ variant: "secondary" })}>`.

## 3. Código de cores (tokens)

Use as classes Tailwind da coluna "Classe". Nunca escreva o valor direto.

| Classe | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `bg-background` | `#ffffff` | `#09090b` | fundo da página e do cabeçalho |
| `bg-card` | `#fafafa` | `#18181b` | cartões, botão secundário, busca |
| `bg-sidebar` | `#fcfcfc` | `#18181b` | barra lateral |
| `bg-muted` | `#f4f4f5` | `#27272a` | trilho das abas, avatar, áreas neutras |
| `bg-highlight` | `#fee2e2` | `#351518` | item e aba ativos |
| `text-foreground` | `#18181b` | `#fafafa` | texto |
| `text-muted-foreground` | `#18181b` | `#a1a1aa` | texto secundário (no claro, igual ao texto) |
| `border` (`border-border`) | `#d4d4d8` | `rgba(255,255,255,.12)` | bordas |
| `bg-primary` / `text-primary-foreground` | `#9f0712` / `#ffffff` | `#ef4444` / `#09090b` | ação principal, foco |
| `bg-destructive` | `#991b1b` | `#f87171` | ação destrutiva |
| `text-success` / `text-warning` | `#15603a` / `#7a4510` | `#4ade80` / `#facc15` | status |
| `bg-tone-red` + `text-tone-red-foreground` | `#fee2e2` + `#970611` | igual | ícone de seção vermelho |
| `bg-tone-green` + `text-tone-green-foreground` | `#d1fae5` + `#047857` | igual | ícone verde |
| `bg-tone-violet` + `text-tone-violet-foreground` | `#ede9fe` + `#7c3aed` | igual | ícone violeta |
| `bg-tone-orange` + `text-tone-orange-foreground` | `#ffedd5` + `#a85005` | igual | ícone laranja |
| `bg-overlay/40` | `#000` a 40% | igual | fundo atrás do menu móvel |
| `bg-logo-surface` | `#ffffff` | `#ffffff` | fundo das logos |
| `shadow-surface` | `0 2px 6px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)` | `0 2px 8px rgba(0,0,0,.3), 0 1px 2px rgba(0,0,0,.2)` | cartão, aba e item ativos |
| `tm-bar tm-bar-strong` / `tm-bar-soft` | degradê `#b50008→#ff2935` / `#eb777d→#ff9da2` | igual | barras de gráfico |

Contraste obrigatório:

- **Claro:** todo texto com 7:1 sobre o próprio fundo, e o texto secundário igual ao principal.
- **Escuro:** 4,5:1, com texto escuro sobre a primária.
- **Ícones de tom:** 4,5:1.

Os tokens já cumprem isso. Se o consumidor precisar de uma cor nova, crie um token no **próprio**
consumidor e confira o contraste.

Fonte: Outfit (`font-sans`).

Raios, presos a `--radius` (8px):

- `rounded-md` (6px): abas internas e ícones;
- `rounded-lg` (8px): cartões, botões, itens e busca;
- `rounded-full`: avatar.

## 4. Estrutura do layout

```text
┌──────────────┬──────────────────────────────────────────────────────────────┐
│ [▣] Nome v1.0│ [ícone] Título    [⌕ Buscar… Ctrl K] [☼] │ [logos] │ (PL) Nome / Perfil [⇥] │ 56px
├──────────────┼──────────────────────────────────────────────────────────────┤
│[Plataf.|Adm.]│  padding 38px (22/14 no celular), máx. 1500px                │
│ Plataforma   │  Descrição da página ............ [Ação] [Secundária]        │
│ ▣ Item ativo │  ↕ 38px                                                      │
│ ▣ Item       │  ┌ Cartão ──────────┐ 20px ┌ Cartão ──────────┐              │
│ ▣ Item       │  └──────────────────┘      └──────────────────┘              │
│              │  ↕ 20px                                                      │
│              │  ┌ Tabela ─────────────────────────────────────┐             │
│              │  └─────────────────────────────────────────────┘             │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Recolher  ‹  │  Desenvolvido pelo MPPA - EIA - Nome - V 1.0.0 - 2026 (56px)  │
└──────────────┴──────────────────────────────────────────────────────────────┘
  260px (64px recolhida); abaixo de 801px vira menu móvel
```

Cabeçalho (igual em todos os sistemas):

- **Marca, no topo da barra lateral:** símbolo de 32px, com nome (semibold) e versão (`text-xs`, cor
  secundária) na mesma linha.
- **Título:** ícone de seção de 24px, 10px até o título (`text-sm`, peso 500).
- **Busca:** caixa de 224px × 32px com lupa, texto e `Ctrl K`. Abaixo de 640px, só a lupa.
- **Tema:** botão de ícone de 34px.
- **Logos:** 28px de altura sobre `bg-logo-surface`, com divisórias de 24px antes e depois.
- **Identidade:**
  - avatar redondo de 32px com as iniciais (ou a foto);
  - nome (`text-xs` semibold) e perfil (`text-xs`, cor secundária) a partir de 1280px;
  - botão de sair de 34px.

Rodapé (igual em todos os sistemas), montado pela camada a partir de `brand` (seção 2.5):

- **A partir de 801px:** 56px fixos no pé da tela, na mesma linha do "Recolher", com até 3 linhas de
  texto (o texto completo aparece ao passar o mouse).
- **No celular:** fica no fim da página, com a altura do texto.
- **Aparência:** borda superior e texto `text-xs` centralizado, na cor secundária.

Medidas:

- **Ícone de seção:** 28px no menu.
- **Item de menu:** padding 7px 8px, 10px entre ícone e texto, 5px entre itens.
- **Abas:** 32px de altura, num trilho com padding de 3px.
- **Botões:** 36px de altura, peso 700.
- **Cartões:** padding de 20px.
- **Métrica:** número de 32px, peso 800.
- **Gráfico:** 165px de altura; barras de até 90px de largura.

## 5. Verificar antes de entregar

Os itens 2 a 6 precisam de navegador. Se você não tiver um, rode os itens 1 e 7, e entregue os demais ao
usuário como lista de conferência, dizendo que não foram verificados.

1. `typecheck`, `lint` e `build` do consumidor sem erro.
2. Abra o app em 1280px e em 390px, nos temas claro e escuro, e compare com `docs/tema-mppa/comparacao/`
   e o protótipo. Deve ficar igual em raio, sombra, fundos, bordas, espaçamentos e cores.
3. Em 390px, a página não rola na horizontal.
4. Com `is_admin: false`, não há abas nem itens de administração, nem na busca. Com `true`, as duas abas
   aparecem.
5. Cada rota mostra o título certo, uma vez, no cabeçalho, e um só item marcado.
6. Login, logout, sessão expirada e chamadas de dados continuam funcionando como antes.
7. Procure cor fixa nas telas: `grep -rnE "#[0-9a-fA-F]{3,6}\b|bg-white|text-(red|gray|zinc)-[0-9]" <pasta das telas>`.
   Cada ocorrência vira token.

## 6. Caminho B: portar para outra stack

Os valores não mudam; só a forma.

- **Cores:** copie os blocos `:root` e `.dark` de `src/styles/tema-mppa.css` como estão.
  - Tailwind 4: copie também o `@theme inline`.
  - Tailwind 3: mapeie as cores em `theme.extend.colors` como `var(--token)`.
  - Sem Tailwind: use as variáveis CSS diretamente.
- **Componentes:** recrie com o framework do consumidor, seguindo `src/components/tema-mppa/`:
  - `next/link` vira o link do roteador local;
  - `usePathname` vira a rota atual;
  - as abas usam qualquer componente acessível de abas.
- **Fidelidade:** mantenha as medidas da seção 4 e compare visualmente com o protótipo, como na seção 5.

## 7. Limpeza e registro

1. Confira que a pasta descompactada `tema-mppa-next/` já foi apagada (seção 2.1). A referência fica em
   `docs/tema-mppa/`.
2. Acrescente ao `AGENTS.md` do consumidor; se ele não existir, crie-o. Se houver `CLAUDE.md`, ponha lá
   também. Troque `<pasta>` pelos caminhos reais (por exemplo, `components` ou `src/components`):

```markdown
## Interface (tema-mppa 1.4.0)

- A camada visual fica em `<pasta>/tema-mppa/` e `<pasta dos estilos>/tema-mppa.css`; não edite esses arquivos.
  Atualize copiando uma versão nova do modelo.
- Referência visual: `docs/tema-mppa/prototipo/index.html` (manda) e `docs/tema-mppa/preview/index.html`.
- Telas só com os primitivos (`PageFrame`, `Card`, `CardGrid`, `MetricCard`, `DataTable`, `BarChart`,
  `Button`); cores só pelos tokens; título só no cabeçalho, vindo do item de navegação.
- Contraste: 7:1 no claro (secundário igual ao principal), 4,5:1 no escuro.
- Administração aparece só com `session.is_admin === true`.
```

3. Faça o commit na branch criada e resuma ao usuário o que mudou e o que ficou pendente.
