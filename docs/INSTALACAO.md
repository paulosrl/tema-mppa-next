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
npm install @base-ui/react @tanstack/react-query class-variance-authority clsx lucide-react tailwind-merge
```

Adicione ao `globals.css` do consumidor, depois de `@import "tailwindcss";`:

```css
@import "../styles/tema-mppa.css";
@custom-variant dark (&:is(.dark *));
```

Ajuste o caminho relativo caso o `globals.css` não esteja em `src/app/`.

## Fonte

No layout raiz, carregue Outfit e exponha `--font-outfit`. O exemplo completo está em `src/app/layout.tsx`.

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
