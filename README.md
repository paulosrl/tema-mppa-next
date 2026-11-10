# Tema MPPA — template Next.js reutilizável

Shell visual configurável baseado no protótipo aprovado: sidebar recolhível, abas **Plataforma** e **Administração**, cabeçalho, breadcrumb, busca `Ctrl+K`, tema claro/escuro/sistema, identidade do usuário e moldura de página.

## Stack fixada

- Next.js `16.3.5` (App Router)
- React / React DOM `19.3.1`
- TypeScript `5.9.3`
- Tailwind CSS / PostCSS `4.3.3`
- shadcn/ui `base-nova`, com Base UI
- Lucide React `1.70.0`
- TanStack Query `5.106.1`
- npm, alinhado ao frontend consumidor de referência

## O que o template faz

- reproduz a estrutura visual e o comportamento responsivo;
- centraliza a paleta Marvel (Red sobre Zinc), fonte Outfit e cantos retos;
- lê `session.is_admin` **somente por propriedade**;
- mostra as duas abas apenas quando `is_admin === true`;
- recebe símbolo, logos, nome, versão, usuário, perfil, rotas e menus por configuração;
- remove imagens ausentes ou com falha sem exibir ícone quebrado;
- fornece uma busca local sobre as rotas configuradas;
- mantém o conteúdo da aplicação no slot `children`.

## O que o template não faz

Não implementa nem substitui autenticação, autorização de rota, BFF, API, cookies, login, logout ou regra de negócio. O consumidor continua responsável por esses pontos. Ocultar a aba administrativa é comportamento de interface; a proteção das rotas deve permanecer no sistema consumidor.

## Executar a demonstração

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. A demonstração usa dados genéricos em `src/app/demo-config.tsx`; não são defaults do componente reutilizável.

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

O script só copia os componentes e o CSS para o destino. Ele não altera autenticação, rotas, BFF, APIs nem `package.json`.

## Validação

```bash
npm run verify:template
npm run typecheck
npm run lint
npm run build
# ou tudo em sequência
npm run check
```

> Este pacote foi montado em ambiente sem acesso ao registry npm. O verificador estrutural foi executado; `typecheck`, `lint` e `build` devem ser executados após `npm install` em uma rede com acesso ao registry configurado.
