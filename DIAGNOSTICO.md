# Diagnóstico para adotar o tema MPPA (Fase 0)

Formulário da Fase 0 do `REPLICAR.md`. O agente o preenche **só lendo** o codebase consumidor, sem mudar
nenhum arquivo, e o entrega ao desenvolvedor, que decide os conflitos (item 12) antes da Fase 1.

Onde gravar: se o consumidor tem processo próprio de planejamento (OpenSpec, ADR, issue), o diagnóstico é o
insumo do plano e vai onde o processo manda; senão, em `docs/tema-mppa/diagnostico.md`.

Em cada item, diga o que encontrou, com o caminho do arquivo. "Não há" também é resposta.

## 1. Identificação

- Sistema, versão atual (de onde ela vem) e data do diagnóstico.
- Versão do modelo `tema-mppa-next` que será aplicada.

## 2. Stack e caminho

- Framework e versão, roteador (App Router ou outro), React, Tailwind, gerenciador de pacotes, Node.
- **Caminho:** A (copiar a camada) ou B (portar). Se B, por quê.
- Versões que diferem das exigidas pelo `REPLICAR.md` (4.2) e o que mudar.

## 3. Estrutura

- Raiz do consumidor: a pasta do `package.json` do frontend. Num monorepo, a subpasta.
- Com ou sem `src/`; alias de import (`@/`); onde a camada e os estilos vão ficar.
- CSS global e layout raiz.

## 4. Processo do projeto

- Regras dos agentes (`AGENTS.md`, `CLAUDE.md`) que afetam a interface.
- Fluxo de planejamento (OpenSpec ou outro) e se ele exige plano revisado antes de código.
- Convenção de branch e de commit.
- Como rodar typecheck, lint, testes de unidade, e2e e build; hooks e CI.
- Specs, requisitos ou documentos que descrevem o layout, a marca, a fonte, o tema ou o rodapé de hoje.

## 5. Layout atual

- Arquivo(s) da casca de hoje (barra lateral, cabeçalho, menu móvel) e o layout autenticado que os usa.
- Páginas fora da casca (login, públicas, erro) e o que elas têm de casca própria.

## 6. Navegação

Tabela com cada item do menu de hoje e o que vira na configuração:

| Rótulo | Rota | Ícone | Só admin? | Proposta (`exact`, `matches`, `hidden`, `tone`, `description`) |
| --- | --- | --- | --- | --- |

Rotas fora do menu que precisam de título (detalhe, edição) e o item de cada uma. Itens que aparecem
ou somem por condição (consulta, permissão) e como a condição chega.

## 7. Sessão

- De onde vem o usuário logado (hook, provider, rota) e o logout.
- Origem de cada campo: `user_id`, `name`, `email`, `profileLabel`, `avatar` e **`is_admin`**, que tem de ser
  o booleano estrito vindo da sessão real (nunca deduzido de e-mail, nome ou texto).
- Telas de carregamento e de erro de sessão que o consumidor já tem.

## 8. Marca

- Nome e versão para a marca e o rodapé; anos da versão (`versionYears`).
- Símbolo: imagem existente ou inicial (`tm-brand-mark`).
- Logos institucionais (arquivos, largura e altura).
- Regras de hoje sobre onde o nome do sistema aparece.

## 9. Tema e segurança

- Provedor de tema de hoje, onde guarda a escolha e com que regra (sempre claro? lembra entre visitas?).
- CSP com `nonce` para script inline, e onde o nonce é lido.

## 10. Rodapé

- Rodapés de hoje, dentro e fora da casca, e o texto deles.
- Onde o texto padrão (`footerText`) vai entrar fora da casca.

## 11. Cores, fonte e bibliotecas

- Arquivo de tokens de hoje e a fonte.
- Tabela de cada token do consumidor, com o destino:

| Token de hoje | Uso | Destino: token do modelo / token próprio mantido (`var()` do modelo ou valor completo) / removido |
| --- | --- | --- |

- Cores fixas nas telas (resultado do grep da Fase 1, item 4.9).
- Bibliotecas de UI (Radix, MUI, outras) e os arquivos que as usam: saem na Fase 3.

## 12. Conflitos com o padrão (decisão do desenvolvedor)

Cada regra, requisito ou teste do consumidor que contradiz o padrão (marca, rodapé, larguras, busca,
tema, fonte), com a recomendação do agente e as alternativas. Nada aqui é decidido pelo agente.

## 13. Testes afetados

Cada teste (unidade, componente, e2e, script) que confere o layout, a fonte, o tema, a marca ou o rodapé
de hoje, e o que muda nele. Nenhum teste sai sem que o que ele comprovava passe a outro.

## 14. Plano por fase

- **Fase 1 (casca):** arquivos que entram, mudam e saem.
- **Fase 2 (telas):** lista das telas, agrupadas em entregas pequenas.
- **Fase 3 (limpeza):** componentes, bibliotecas e tokens que sairão.
- Riscos e como cada um será conferido.
