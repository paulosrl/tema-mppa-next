# Validação desta entrega (1.1.0)

Executado em 2026-11-10, no WSL, com Node.js 24 e as dependências instaladas do registry npm.

## `npm run check`

Aprovado nas quatro etapas:

1. `verify:template`:
   - versões exatas da matriz;
   - `base-nova`, Base UI e Lucide, sem `@radix-ui/*`;
   - regra `is_admin === true` com item administrativo visível, também na busca;
   - `ImageSlot` sem asserção não nula;
   - `AppShell` sem chamada de API e com `footer`;
   - `PageFrame` sem título;
   - primitivos exportados;
   - tokens iguais ao protótipo nos dois temas;
   - contrastes recalculados do CSS;
   - componentes sem cor fixa e sem canto reto;
   - nada de Geist.
2. `tsc --noEmit` com `strict`.
3. ESLint (`eslint-config-next`).
4. `next build` de produção.

## Teste visual

Protótipo e demonstração lado a lado, página inteira, em `docs/comparacao/`: claro e escuro, 1280px e
390px. A página não rola na horizontal em nenhum dos quatro casos (`scrollWidth - clientWidth = 0`).

## Teste de comportamento (Chromium headless, build de produção)

| Verificação | Resultado |
| --- | --- |
| Rota administrativa abre a aba Administração | aba "Administração", título "Usuários" |
| Um só item marcado e um só `<h1>` | 1 item (`aria-current`), 1 `<h1>`, no cabeçalho |
| Item `hidden` | dá o título ("Detalhe do item"), fora do menu e da busca |
| Sub-rota (`/itens/outro`) | marca só "Meus itens" |
| Alturas de marca, cabeçalho e rodapé da barra | 56px, 56px, 56px |
| Barra recolhida | 64px, gravada no `localStorage` e mantida após recarregar |
| Busca por `description` ("contas") | encontra "Usuários" |
| `<kbd>` da busca | Outfit (`font-sans`) |
| Avatar | painel com nome, e-mail, perfil e "Sair" |
| Menu móvel em 390px com a barra recolhida salva | abre com 260px, rótulos visíveis; `Esc` fecha |

## Pendente no consumidor

Depois de copiar a camada, rode o `typecheck`, o `lint` e o `build` do consumidor, e revise claro, escuro,
390px, desktop, usuário comum e administrador com as rotas reais.

## Teste cego de replicação (1.1.1)

Um agente sem nenhum contexto recebeu só a frase do README: *"Descompacte tema-mppa-next-v1.1.1.zip, leia
tema-mppa-next/REPLICAR.md e replique o modelo de interface neste codebase."* Dois consumidores Next.js 16
de exemplo, com sidebar própria, cores fixas e hook de sessão próprio:

| Consumidor | O que o agente fez | Resultado |
| --- | --- | --- |
| Sem `src/` | camada em `components/` e `styles/`; `AppShell` no layout raiz; telas com os primitivos; `AGENTS.md` criado | typecheck, lint e build aprovados; tela igual à do modelo em 1280px e 390px, claro e escuro |
| Com `src/` e `/login` público | camada em `src/`; route group `(autenticado)` com o `AppShell`; `/login` fora do shell, só com tokens | typecheck, lint e build aprovados; `/login` sem shell; Painel igual ao modelo |

Os pontos em que o primeiro agente precisou adivinhar foram respondidos no `REPLICAR.md` antes do segundo
teste.
