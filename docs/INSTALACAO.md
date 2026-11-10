# Instalação

## Opção A — novo projeto a partir deste codebase

```bash
cp -R tema-mppa-next meu-projeto
cd meu-projeto
npm install
npm run dev
```

O `package.json` já fixa as versões centrais exigidas. O primeiro `npm install` cria o `package-lock.json` do ambiente consumidor.

## Opção B — integração a um Next.js existente

Pré-requisitos: App Router, alias `@/*`, Tailwind CSS 4 e React 19.

Na raiz deste template:

```bash
node scripts/copy-template.mjs /caminho/do/consumidor
```

No projeto consumidor, instale apenas o que ainda não existir:

```bash
npm install --save-exact @base-ui/react@1.9.0 @tanstack/react-query@5.102.8 lucide-react@1.46.0 tailwind-merge@3.6.0 class-variance-authority clsx
```

React e React DOM ficam em `19.2.3`, a versão da matriz do ecossistema.

Adicione ao `globals.css` do consumidor, depois de `@import "tailwindcss";`:

```css
@import "../styles/tema-mppa.css";
@custom-variant dark (&:is(.dark *));
```

Ajuste o caminho relativo caso o `globals.css` não esteja em `src/app/`. O `tema-mppa.css` já traz a cor das
bordas, a variante `desk:` (801px, o ponto de quebra do protótipo) e os utilitários `tm-*`; não é preciso
copiar o `globals.css` deste modelo.

## Fonte

No layout raiz, carregue Outfit e exponha `--font-outfit`. O exemplo completo está em `src/app/layout.tsx`.
A fonte mono é a do sistema (`ui-monospace`); não é preciso carregar a Geist Mono.

```tsx
import { Outfit } from "next/font/google";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
```

## Providers

Envolva a área que usa o shell:

```tsx
import { TemaMppaProvider } from "@/components/tema-mppa";

<TemaMppaProvider>{children}</TemaMppaProvider>
```

Se o sistema já possui um `QueryClient`, passe-o em `queryClient` para não criar outro.

## Conferência

```bash
npm run typecheck
npm run lint
npm run build
```
