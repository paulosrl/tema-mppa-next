# Changelog

Dentro de cada versão, a seção "Ao atualizar de X" descreve a atualização de X para essa versão. Quem atualiza
saltando versões faz as seções de cada versão entre a atual e a nova, uma de cada vez, com uma só cópia (`REPLICAR.md`, seção 7).

## 2.0.4 — 2026-11-14

Restos de texto da aparência antiga, achados ao revisar a 2.0.x. Só textos, imagens de comparação e a legenda delas
mudam; a camada visual e a API não mudam, por isso sobe o último número.

### Corrigido

- **Item ativo do menu:** o `AGENTS.md` e o `REPLICAR.md` (seção 8) diziam que o realce é um degradê do vermelho
  institucional ao azul; o CSS usa azul sólido (`--highlight`) com barra azul à esquerda, e agora os textos dizem isso.
- **Protótipo e comparações:** o `REPLICAR.md` dizia que o protótipo "manda em todo elemento gráfico" e a 4.10 pedia
  "raio, sombra, fundos, bordas e cores iguais" aos do protótipo, o que deixou de valer na 2.0.0. Agora o protótipo
  manda na estrutura da casca (disposição, itens e medidas), a prévia manda na aparência, a lista de diferenças
  intencionais inclui a aparência da 2.0 e o bloco "Interface" do `AGENTS.md` do consumidor diz o mesmo.
- **`docs/comparacao/`:** continuam, só como comparação de estrutura. A legenda do lado do protótipo diz "só a
  estrutura" e as quatro imagens foram regeradas.

### Ao atualizar de 2.0.3

1. Copie a pasta `tema-mppa-next/` e rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force`
   (`REPLICAR.md`, seção 7). Nada a mudar nas telas.
2. Troque a versão na seção "Interface" do `AGENTS.md` para 2.0.4 e, se ele cita o protótipo como autoridade
   visual, use a linha nova do bloco "Interface" do `REPLICAR.md` (seção 11).

## 2.0.3 — 2026-11-14

Dois restos achados no teste cego da 2.0.0. Só a tela de demonstração e as imagens de comparação mudam; a camada
visual, a API e os textos do roteiro não mudam, por isso sobe o último número.

### Corrigido

- **Demonstração, "Painel de metas":** a grade dos três `MacroTile` ficava ao lado do anel com `flex-1`, que parte de
  largura zero e nunca quebrava de linha; a 390px cada coluna tinha 29px, o rótulo "Carboidratos" saía cortado e
  "178 g" quebrava em duas linhas. Agora a grade quebra abaixo do anel quando falta espaço e usa colunas que se
  adaptam (`grid-cols-[repeat(auto-fit,minmax(6.5rem,1fr))]`). Conferido de 1280px a 320px: nenhum texto sai cortado.
  O `MacroTile` não muda; quem repete esse arranjo no sistema próprio deve evitar `flex-1` ao lado de algo largo.

### Removido

- `docs/comparacao/menu-movel-390-claro.png`: sobra da aparência antiga, que nenhum script gera e nada cita.

### Ao atualizar de 2.0.2

1. Copie a pasta `tema-mppa-next/` e rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force`
   (`REPLICAR.md`, seção 7). Nada a mudar nas telas. O sistema que repetiu o arranjo de macros acima pode ajustá-lo.
2. Troque a versão na seção "Interface" do `AGENTS.md` para 2.0.3.

## 2.0.2 — 2026-11-14

Achado ao preparar a atualização do Heimdall, que já estava na variante v2 da 1.14.x: o prompt do guia dizia que,
vindo de qualquer 1.x, "a aparência muda por inteiro", o que só vale para quem estava no padrão. Só os textos
(`GUIA.html` e `REPLICAR.md`) mudam; a camada visual e a API não mudam, por isso sobe o último número.

### Corrigido

- **Prompt de atualizar (`GUIA.html`):** separa os dois casos de uma 1.x. No padrão, a aparência muda por inteiro e a
  diferença das capturas é esperada; na variante v2 da 1.14.x, a aparência não muda, saem só os restos da variante e
  qualquer diferença visual é defeito. Os itens de contraste e de testes só valem para quem estava no padrão.
- **Como o agente reconhece o caso:** o prompt diz que o `<html>` do layout raiz sem `data-tema`, ou com
  `data-tema="padrao"`, é o padrão, e com `data-tema="v2"` é a v2. O texto da opção "Já tem o tema" do guia diz o mesmo.
- **`REPLICAR.md`, 7.2:** os passos 3 e 4 dizem como reconhecer cada caso (variante `v2` passada ao `<html>` e ao
  `TemaMppaProvider`, ou ausente) e que, na v2, qualquer diferença nas capturas é defeito.

### Ao atualizar de 2.0.1

1. Copie a pasta `tema-mppa-next/` e rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force`
   (`REPLICAR.md`, seção 7). Nada a mudar nas telas.
2. Troque a versão na seção "Interface" do `AGENTS.md` para 2.0.2.

## 2.0.1 — 2026-11-14

Achados do teste cego dos prompts do guia da 2.0.0 (dois agentes sem contexto atualizaram um consumidor de teste
da 1.14.1, um sem OpenSpec e um com). Os dois concluíram a atualização sozinhos; o que sobrou eram lacunas do
roteiro. Só os textos (`REPLICAR.md`, `CHANGELOG.md`, `GUIA.html`) e a mensagem final do `copy-template.mjs`
mudam; a camada visual e a API não mudam, por isso sobe o último número.

### Corrigido

- **Ordem na atualização:** o "Ao atualizar de 1.x" da 2.0.0 mandava copiar no passo 1, e o `REPLICAR.md` manda
  capturar as telas antes da cópia. Agora o passo 1 do CHANGELOG manda capturar antes.
- **`REPLICAR.md`, 7.2:** o passo 1 só remete ao passo 2 da seção 7 (antes repetia a captura); o passo 4 diz que o
  consumidor no padrão faz os passos 1 e 2 e a troca visual completa (5 a 8), em vez de "5 a 8".
- **`.gitignore` na atualização:** a seção 7 passa a mandar conferir que `tema-mppa-next/` e `tema-mppa-next-v*/`
  estão ignorados (antes só a 4.1, da Fase 1, dizia isso).
- **Convenção do CHANGELOG:** uma nota no topo diz o que o "Ao atualizar de X" significa e como somar versões.
- **Mensagem do `copy-template.mjs`:** o fim da cópia não diz mais "Próximos passos" (contradizia o prompt do guia,
  que manda o agente não sugerir próximos passos); diz "Depois da cópia".
- **`accent`:** as tabelas de `PanelCard` e `LinkCard` no `REPLICAR.md` diziam "borda de cima"; agora dizem que ele
  não tem efeito visual desde a 2.0.0, e a 7.2 diz que quem o passa pode tirá-lo.
- **Contraste de token próprio (7.2, passo 5):** traz a fórmula da razão WCAG e o limite de cada tipo de texto,
  porque o `verificar-design.mjs` não mede token próprio; o que cair se corrige no token do sistema.
- **4.10:** o item 3 diz que, numa atualização, a comparação é a da branch com a `main`; o item 7 diz que o que o
  sistema não tem (login num sistema de exemplo) vai no relatório como "não se aplica"; o caminho do `--css` em 4.9
  lembra `src/app/globals.css`.
- **OpenSpec (1.2):** diz o comando para arquivar (`openspec archive <nome> -y`), o que fazer com tarefa pendente (não
  se marca como feita; vai no relatório) e que, sem nenhuma spec no projeto, a validação exige uma: numa atualização
  visual, a capacidade `interface-tema-mppa`. O prompt de arquivar do guia cita a seção 1.2.
- **CHANGELOG da 2.0.0:** diz que a camada passa de 25 para 24 arquivos (saiu o `tema-variante.tsx`).

### Ao atualizar de 2.0.0

1. Copie a pasta `tema-mppa-next/` e rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force`
   (`REPLICAR.md`, seção 7). Nada a mudar nas telas.
2. Troque a versão na seção "Interface" do `AGENTS.md` para 2.0.1.

## 2.0.0 — 2026-11-14

Pedido do autor em 14 nov. 2026: uma versão só. O tema deixa de ter variantes e a última versão é a oficial. Fica a
aparência da antiga v2 (a do "Moveflux Design System", com a regra de cores institucional); o padrão (Outfit,
ardósia e marinho, quadros de 16px, faixa colorida de 3px no topo) sai. Como o contrato muda (`data-tema`, `tema` no
provider, `useTemaVariante`), o número sobe para 2.0.0. A 1.14.2, que mexia só no `GUIA.html` e nunca foi entregue,
entra aqui.

### Muda (quebra o contrato)

- **Tema único:** os tokens do `:root` e do `.dark` passam a ser os da v2, e o bloco `data-tema="v2"` some do CSS.
  - Neutros em pedra quente: claro com fundo `#e7e5e4`, cartão `#ffffff`, muted `#fafaf9`, texto `#1c1917` e
    secundário `#5f5a56`; escuro com fundo `#0c0a09`, barra `#12100f`, cartão `#1c1917`, muted `#292524` e secundário
    `#a8a29e`.
  - Quadros de 24px (`--radius-card`) com contorno fino (`--card-border`: `#e7e5e4` no claro, `#44403c` no escuro),
    sombra em camadas e topo de 1px na cor do contorno; Inter com peso 600 nos títulos.
  - Não mudam: o azul de ação (`#0842a1` e `#61a6fa`), o vermelho só com significado, os tons de seção, o avatar, os
    gráficos, as medidas do shell (62px, 304px e 76px) e a API dos componentes.
- **Removidos:**
  - `data-tema` no `<html>` e a propriedade `tema` do `TemaMppaProvider`;
  - `useTemaVariante` e o tipo `TemaVariant`;
  - os tokens `--tema-variante`, `--font-tema`, `--card-radius` e `--card-top-width`;
  - `NEXT_PUBLIC_TEMA`, a prévia `docs/preview-v2/` e o selo de variante da prévia (fica `docs/preview/`);
  - o arquivo `tema-variante.tsx`: a camada passa de 25 para 24 arquivos.
- **Fonte:** só a Inter, servida como `--font-inter` no `<html>` (`REPLICAR.md`, 4.4). A Outfit sai do layout raiz.
- **`accent` de `PanelCard` e `LinkCard`:** continua aceito, mas já não pinta o topo do quadro.

### Guia (o que era a 1.14.2)

- **Prompt de propor (OpenSpec):** manda o agente não sugerir comandos, "próximos passos" nem `/clear`, parar e
  mostrar o nome da change, o que muda, a lista de tarefas e as decisões que são do desenvolvedor.
- **Prompt de aplicar:** aprova "a change que você acabou de propor (a mais recente em `openspec/changes/`)", sem
  depender do nome da change nem da conversa anterior.
- **"Depois, você":** avisa que, se o agente sugerir outro comando, o desenvolvedor ignora e cola o prompt do guia, na
  mesma conversa.
- **Atualização:** o prompt de "Já tem o tema" cobre a troca visual da 2.0.0: layout raiz, contraste dos tokens
  próprios sobre os fundos novos, testes que citam cor, fonte ou token, o `DESIGN.md` do sistema, capturas com cada
  diferença classificada e uma passada manual pelas telas.

### Ao atualizar de 1.x

1. Copie a pasta `tema-mppa-next/` e rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force`
   (`REPLICAR.md`, seção 7), depois de capturar as telas (passo 2 da seção 7, receita em 7.1). Apague
   `docs/tema-mppa/preview-v2/`, se existir.
2. No layout raiz, ponha só a Inter (`--font-inter`) no `<html>` e tire a Outfit, o `data-tema` e a propriedade
   `tema` do `TemaMppaProvider`; troque qualquer `useTemaVariante`.
3. Quem estava no padrão muda de aparência por inteiro: confira o contraste dos tokens próprios sobre os fundos novos,
   os testes que citam cor, fonte, raio ou token e o `DESIGN.md` do sistema (`verificar-design.mjs`), e compare as
   capturas. Quem já usava a v2 só faz o passo 2.
4. Troque a versão na seção "Interface" do `AGENTS.md` para 2.0.0.

## 1.14.1 — 2026-11-14

O primeiro consumidor a atualizar para a 1.14.0 (o Heimdall) devolveu 11 pontos que o roteiro não previa
(`REPLICAR.md`, seção 11). Esta versão os trata e acrescenta um aviso de variante às prévias. A camada visual e as
duas variantes não mudam, fora o ajuste de uma classe.

### Corrigido

- **`MacroTile`:** a trilha do medidor usava `color-mix(...)` escrito na classe, que testes de cor de consumidores
  recusam. Agora é `bg-(--meter)/22`, com o mesmo resultado.
- **Pasta de fora na cópia:** o `copy-template.mjs` avisa, no fim, quando há outra pasta do modelo perto do consumidor
  (uma `tema-mppa-next/` de versão antiga ou a pasta de fora, `tema-mppa-next-v<versão>/`) e diz a versão dela. O
  `REPLICAR.md` (1.3 e 4.1) e o `GUIA.html` mandam apagá-las, e o `.gitignore` ganha também `tema-mppa-next-v*/`.
- **Roteiro de atualização (7.1):** alterações locais registradas na camada (a cópia sobrescreve; arquivo igual nas
  duas versões volta ao da branch), `docs/tema-mppa/` fora das conferências também na atualização, arquivo novo na
  camada que passa pelas conferências do consumidor, e o menu móvel que fecha no clique da aba.
- **GUIA:** "não edite a camada" e a parada do agente agora ressalvam as alterações locais já registradas.
- **`REPLICAR.md` 4.9:** o linter oficial do `DESIGN.md` só roda com rede e com o `npx` liberado; sem isso, o
  `verificar-design.mjs` basta.
- **CHANGELOG:** os passos "Ao atualizar de" das versões 1.12.2, 1.12.3 e 1.13.2 ganharam o que faltava (aba por
  alteração local, linha da variante no `AGENTS.md` e o arquivo novo `metas.tsx`).

### Novo

- **Aviso de variante nas prévias:** um selo fixo no canto de cada prévia mostra a variante ("padrão" ou "v2") e o link
  para a outra (`../preview-v2/` e `../preview/`, que ficam lado a lado no modelo e em `docs/tema-mppa/`).

### Ao atualizar de 1.14.0

1. Nada a mudar nas telas. Copie a pasta `tema-mppa-next/` e rode
   `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Se o consumidor tinha contornado o `color-mix` do `MacroTile` por conta própria, tire o contorno.
3. Troque a versão na seção "Interface" do `AGENTS.md` para 1.14.1.

## 1.14.0 — 2026-11-14

Pedido do autor em 14 nov. 2026: a variante `v2` passa a copiar **toda** a aparência do "Moveflux Design System"
(antes copiava só os cantos, a fonte e a sombra) e a manter só a regra de cores do tema anterior. A variante
`padrao` não muda.

### Alterado (variante `v2`)

- **Neutros em pedra quente**, como o modelo: fundo `#e7e5e4` (escuro: `#0c0a09`), cartão branco (escuro: `#1c1917`),
  tile interno `#fafaf9` (escuro: `#292524`), contorno fino do quadro, sem brilho colorido no fundo. Texto principal
  com 7:1 e secundário com 4,5:1 nos dois temas, conferidos pelo verificador.
- **Quadros sem faixa colorida no topo:** o topo do `PanelCard` e do `LinkCard` é um fio de 1px na cor do contorno,
  também ao passar o mouse. No `padrao`, a faixa de 3px segue como era.
- **Forma das peças que já existiam:** cabeçalho do `PanelCard` sem a linha de baixo e com título de 20px; rótulo
  do `MetricCard` em 14px; `InfoField` como tile interno; título de seção e rótulos sem maiúsculas e sem o ponto
  colorido; `Tag` e `StatusBadge` como pílula de 12px sem borda e sem ponto; caixas de ícone chapadas; a tabela (`DataTable`) com título de 20px e cabeçalho de coluna sem maiúsculas.
- **Regra de cores mantida:** ação em azul (primária, foco, item ativo, gráficos), vermelho só com significado,
  tons de seção, avatar e gráficos iguais aos do padrão. O verificador exige isso.

### Novo (as duas variantes)

- **Peças de metas**, da composição do modelo: `MediaCard` (capa com imagem opcional), `RoundButton`, `StatCard` e
  `StatValue`, `ProgressBar`, `ProgressRing`, `GoalRow`, `WorkoutRow`, `DayStrip`, `InsetTile`, `MacroTile` e
  `StatusPill` (propriedades na seção 5.2 do `REPLICAR.md`). Só tokens, sem regra de negócio.
- **Tokens:** `--bar-track`, os degradês `--bar-*-from`/`-to` (âmbar, rosa, azul, esmeralda, violeta e amarelo),
  `--media`, `--media-foreground`, `--media-muted` e `--media-shadow`, com contraste conferido.
- **Demonstração:** a página "Painel de metas" (`/metas`) mostra as peças; a versão da marca e do rodapé agora vem do
  `package.json`, e não de um texto fixo.
- **Documentos:** `REPLICAR.md` (5.2 e 8.1), `DESIGN.md` (variantes e peças de metas), README e GUIA.

### Ao atualizar de 1.13.2

1. Quem usa o `padrao`: nada a mudar nas telas. As peças de metas ficam disponíveis; a faixa colorida do topo dos
   quadros continua.
2. Quem usa a `v2`: a aparência muda (neutros em pedra, quadros sem faixa, selos e rótulos sem maiúsculas). Capture as
   telas antes e depois da cópia (`REPLICAR.md`, 7.1) e confira o contraste de tokens próprios sobre o fundo `#e7e5e4`.
3. A cópia traz um arquivo novo, `metas.tsx`, que passa pelo lint, pelos tipos e pelas conferências de cor do consumidor
   mesmo sem uso. Se uma delas recusar, ajuste a configuração dela, não o arquivo (`REPLICAR.md`, 7.1).
4. Troque a versão na seção "Interface" do `AGENTS.md` para 1.14.0.

## 1.13.2 — 2026-11-14

Pedido do autor em 14 nov. 2026: o guia, o README e o `REPLICAR.md` não batiam com os caminhos da pasta entregue.
A camada visual, as variantes e a demonstração não mudam; mudam os documentos e, por consequência, a versão que
as prévias e as comparações mostram.

### Corrigido

- **Pasta a copiar:** a entrega sai em `tema-mppa-next-v<versão>/tema-mppa-next/`. O `GUIA.html` (passo "Preparar"),
  o README e o `REPLICAR.md` (1.3) agora dizem que só a pasta de dentro, `tema-mppa-next/`, vai para a raiz do
  repositório, com o comando `cp -r` do caminho completo; a de fora leva a versão no nome e não é copiada.
- **GUIA, tabela "Arquivos":** explica a raiz do frontend (o que é relativo a ela e o que fica na raiz do
  repositório) e lista o `.gitignore`, o `AGENTS.md` e o conteúdo de `docs/tema-mppa/`. A versão da seção
  "Interface" do `AGENTS.md` aparecia em branco; agora vem do guia.
- **README:** o guia faz três perguntas (situação, OpenSpec e variante), não duas; as prévias são duas (padrão e
  `v2`); os caminhos usam `<versão>` em vez de uma versão fixa.
- **REPLICAR:** a referência visual lista as duas prévias (0, 1.3, 4.1 e 10), e o caminho B manda levar também os
  blocos `v2` dos tokens.

### Ao atualizar de 1.13.1

1. Nada a mudar nas telas. Para ter os documentos novos em `docs/tema-mppa/`, copie a pasta `tema-mppa-next/` e rode
   `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Troque a versão na seção "Interface" do `AGENTS.md` para 1.13.2.

## 1.13.1 — 2026-11-14

Pedido do autor em 14 nov. 2026: na página "Meus acessos" da demonstração, o cartão "Resumo da conta" desce para o
fim. A camada visual não muda (componentes, tokens e as duas variantes iguais aos da 1.13.0); mudam só a página
de exemplo e, por consequência, a prévia e as comparações.

### Alterado

- **Página inicial da demonstração (`demo-consumer.tsx`):** a ordem agora é a saudação, "Acessos a Sistemas",
  "Ações rápidas" e, por último, "Resumo da conta". O restante da página, os dados fictícios e os primitivos
  usados são os mesmos.

### Ao atualizar de 1.13.0

1. Nada a mudar nas telas do consumidor: a ordem é da página de exemplo do modelo. Para ter a prévia nova em
   `docs/tema-mppa/preview/` e `preview-v2/`, copie a pasta `tema-mppa-next/` e rode
   `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Troque a versão na seção "Interface" do `AGENTS.md` para 1.13.1.

## 1.13.0 — 2026-11-14

Pedido do autor em 14 nov. 2026: uma segunda versão do tema, no mesmo pacote, sem perder a atual. A interface que
já existe (variante `padrao`) não muda: quem não escolhe nada continua exatamente como estava.

### Novo

- **Variante `v2`:** a forma do "Moveflux Design System" com as cores do tema anterior (azul de ação, vermelho
  institucional só com significado, ardósia no claro e marinho no escuro, tons, avatar e gráficos). Quadros de
  24px com contorno fino e sombra em cinco camadas, Inter com peso 600, e fundo da página `#e2e8f0` (cartão branco
  em destaque). No escuro, só a forma muda. A tabela de tokens está na seção 8.1 do `REPLICAR.md`.
- **Escolha da variante:** uma vez, no layout raiz: `data-tema` no `<html>` e `tema` no `TemaMppaProvider`
  (`TemaVariant`: `"padrao"` ou `"v2"`; `useTemaVariante()` lê o valor). Na demonstração,
  `NEXT_PUBLIC_TEMA=v2 npm run dev`. Sem escolha, `padrao`.
- **Tokens novos, com o valor do padrão:** `--font-tema` (Outfit), `--card-radius` (16px) e `--card-top-width`
  (3px), e a classe `rounded-card` e o utilitário `tm-card-top` que os usam em `Card`, `PanelCard` e `LinkCard`.
  A fonte da camada agora vem de `--font-tema`, não de `--font-outfit` direto.
- **Prévia da `v2`:** `docs/preview-v2/index.html`. O `GUIA.html` pergunta a variante e a põe nos prompts; o
  `DIAGNOSTICO.md` a registra no item 1.
- O `verify-template.mjs` confere os contrastes da `v2` e que ela use as mesmas cores de ação, avatar, destaque e
  gráficos do padrão.

### Ao atualizar de 1.12.3

1. Quem continua no padrão: nada a mudar nas telas. O layout raiz pode ficar como está (sem `data-tema`, vale o
   padrão); a `--font-outfit` segue sendo a fonte.
2. Quem quer a `v2`: troque o layout raiz pelo exemplo da 4.4 (as duas fontes, `tema`, `data-tema` e
   `tema` no provider), com `tema = "v2"`, e apague a fonte que não usa. Se o consumidor tinha tokens próprios
   em `:root`/`.dark` por cima da camada, confira o contraste deles sobre o fundo `#e2e8f0` da `v2`.
3. Troque a versão na seção "Interface" do `AGENTS.md` para 1.13.0 e acrescente a ela a linha da variante (o modelo da
   seção está no fim do `REPLICAR.md`).

## 1.12.3 — 2026-11-12

Pedido do autor em 12 nov. 2026: cada aba do menu abre a página do seu primeiro item. A aparência não muda;
é correção de comportamento, por isso 1.12.3.

### Corrigido

- **Abas do menu:** clicar em "Minha Página" ou "Administração" só trocava a lista de itens e deixava a página
  aberta. Agora abre a página do primeiro item visível da aba (itens `hidden` não contam), na ordem de
  `platformNavigation` e `administrationNavigation`: na demonstração, "Meus acessos" e "Usuários & Papéis". Vale
  também ao clicar na aba já aberta, que volta ao primeiro item. No celular, o menu fecha, como num link. Aba sem
  item visível só troca o menu. O `verify-template.mjs` confere.

### Ao atualizar de 1.12.2

1. Nada a mudar nas telas. Ponha, em cada lista de navegação, como primeiro item o que deve ser a página de
   entrada da aba.
2. Se o consumidor fazia a aba navegar por alteração local, tire-a e apague o registro: a camada já faz. O menu móvel
   passa a fechar no clique da aba; decida se aceita (`REPLICAR.md`, 7.1).
3. Troque a versão na seção "Interface" do `AGENTS.md` para 1.12.3.

## 1.12.2 — 2026-11-12

Prévia (`docs/preview/index.html`) consertada, a partir do que o autor viu em 12 nov. 2026. A camada não muda:
componentes, tokens e aparência iguais aos da 1.12.0.

### Corrigido

- **"Recolher menu" na prévia:** não recolhia a barra desde a 1.7.0, quando a camada passou a desenhá-la pelo
  atributo `data-tm-sidebar` do `<html>`; o script da prévia trocava o HTML da barra, mas não o atributo. Agora
  marca o atributo, como a aplicação, e o `verify-template.mjs` confere.
- **Navegação na prévia:** o gerador usava uma lista fixa com as rotas antigas da demonstração (`/itens`,
  `/automacoes`…), e o clique em "Perfil", "Sessões" ou nos itens de administração voltava ao início. Agora as
  rotas vêm do próprio menu da demonstração, e cada página da prévia mostra o seu conteúdo, não só o título.

### Ao atualizar de 1.12.1

1. Nada a mudar nas telas. Para ter a prévia nova em `docs/tema-mppa/preview/`, copie a pasta `tema-mppa-next/`
   e rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Troque a versão na seção "Interface" do `AGENTS.md` para 1.12.2.

## 1.12.1 — 2026-11-12

Pedido do autor em 12 nov. 2026: o modelo passa a ser entregue como a pasta `tema-mppa-next/`, que o
desenvolvedor copia para a raiz do repositório, sem zip. A camada não muda: componentes, tokens e aparência iguais
aos da 1.12.0. É correção de entrega e de documentação, por isso 1.12.1.

### Modificado

- **Entrega em pasta:** o `npm run empacotar` gera `tema-mppa-next-v<versão>/tema-mppa-next/` no lugar do zip.
  Some o passo de descompactar, e com ele a pasta extra que o "Extrair tudo" do Windows criava.
- **Conferência automática:** a pasta leva `SHA256SUMS`, com a soma de cada arquivo (formato do `sha256sum`), no
  lugar do `.zip.sha256`. O `copy-template.mjs` confere a pasta contra ela antes de copiar e não copia nada se um
  arquivo falta ou foi editado. O `empacotar` continua recusando gerar de novo uma versão com outro conteúdo.
- **`REPLICAR.md`:**
  - 1.3: a pasta do modelo, a conferência e onde ficam os caminhos citados;
  - 2.1, 4.1 e 7: a pasta é apagada logo depois da cópia, antes da verificação (se ficasse, o `tsconfig` e o
    ESLint compilariam uma segunda cópia da camada); numa atualização, a pasta antiga é apagada antes, e não
    sobrescrita;
  - 3: a pasta já copiada pelo desenvolvedor, fora do git desde a Fase 0;
  - 4.1: `.gitignore` com `tema-mppa-next/` (a regra do backup, que vai para a pasta temporária desde a 1.10.1,
    sai);
  - 4.5 e 7: sem zip nem soma manual;
  - 4.8: a seção à frente do título é decorativa;
  - 10 (Caminho B): a referência levada à mão para `docs/tema-mppa/`.
- **`copy-template.mjs`:** a mensagem final manda apagar a pasta e aponta o fim da 4.1 (conferências do
  consumidor), que antes era pulado.
- **`GUIA.html`:** o passo "Preparar" manda copiar a pasta inteira (`cp -r`), sem zip nem soma; os prompts
  mandam apagar a pasta logo depois da cópia.
- **`README.md` e `AGENTS.md`:** a entrega em pasta; o README lista o CHANGELOG e a licença no conteúdo dela.

### Ao atualizar de 1.12.0

1. Nada a mudar nas telas: a camada é a mesma. Para ter o roteiro novo em `docs/tema-mppa/`, copie a pasta
   `tema-mppa-next/` para a raiz do repositório e rode
   `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. As regras `tema-mppa-next-*.zip*` e `tema-mppa-next-v*/` do `.gitignore` podem ficar; só deixam de ser
   necessárias.
3. Troque a versão na seção "Interface" do `AGENTS.md` para 1.12.1.

## 1.12.0 — 2026-11-12

O que o Heimdall relatou ao aplicar a 1.11.0 (`REPLICAR.md`, seção 11): passos que faltavam no roteiro e no
CHANGELOG, documentação desatualizada e o título do cabeçalho espremido pelas logos em larguras intermediárias.

**Por que 1.12.0, e não 1.11.1.** Quase tudo aqui é correção, que sairia como 1.11.1. Mas o cabeçalho muda de
aparência entre 640px e 1023px: as logos saem dele e vão para baixo da marca, e a seção à frente do título passa a
depender do espaço. É mudança de aparência anunciada, com capturas antes e depois e testes do consumidor a rever,
e por isso sobe o número do meio. O zip também passa a levar as logos, que a cópia grava no sistema. E o número
novo encerra a confusão das duas compilações da 1.11.0 (nota na 1.11.0): a 1.12.0 junta o melhor das duas.

### Adicionado

- **Logos padrão no zip**, em `public/`: `mppa-logo.png` (132×76), `ciia.png` (244×244) e `ciia-sigla.svg`
  (132×76: fundo `#fff`, "CIIA" em `#1a237e`, Arial 46px, negrito, centralizado em `y=55`). Até a 1.11.0, a sigla
  só existia como data URL dentro da prévia. O `copy-template.mjs` grava as três no `public/` do consumidor
  (`--public-dir` para outro lugar) só quando faltam. Ele nunca substitui uma que já existe, nem com `--force`, e
  avisa quando a do sistema difere da do modelo.
- **Soma SHA-256 do zip:** o `npm run empacotar` grava `tema-mppa-next-v<versão>.zip.sha256` (formato do
  `sha256sum`) ao lado do zip. O zip é reprodutível (data e ordem das entradas fixas): o mesmo conteúdo dá a mesma
  soma. O script recusa empacotar de novo uma versão cuja soma já publicada difere: conteúdo diferente não sai
  mais com o mesmo número.
- **`verificar-design.mjs`:** reprova o `DESIGN.md` sem `colors.card-border`.

### Modificado

- **Cabeçalho (aparência, de 640px a 1023px):** o título tem prioridade de espaço.
  - As logos ficam no cabeçalho a partir de 1024px, ou a partir de 801px com a barra recolhida. Fora disso,
    aparecem sob a marca: na barra lateral aberta (801px a 1023px) ou no menu móvel (abaixo de 801px, antes só
    abaixo de 640px).
  - O bloco do título ocupa o que sobra e nunca fica com menos de 128px.
  - A seção à frente ("Minha Página /") aparece quando o bloco tem 288px ou mais (consulta de contêiner), e não
    mais a partir de 640px fixos; ela encolhe antes do título.

  Medido com o título "Acessos por Sistema" (142px) e a barra aberta, nos dois temas:

  | Largura | 1.11.0 (medida do Heimdall) | 1.12.0 |
  | --- | --- | --- |
  | 640px a 700px | cortado com 3 logos | inteiro (142px), logos no menu móvel |
  | 768px | inteiro | inteiro, logos no menu móvel |
  | 801px | 33px com 2 logos; 0px com 3 | inteiro, logos sob a marca |
  | 900px | 132px com 2 logos; 68px com 3 | inteiro, logos sob a marca |
  | 1024px e 1280px | inteiro | inteiro, logos no cabeçalho |

  Com a barra recolhida, de 801px em diante: inteiro, com as logos no cabeçalho. Sem rolagem horizontal nem
  sobreposição de 390px a 1280px.
- **Chave das logos:** volta a usar o índice (`${index}-${logo.src}`), no cabeçalho e sob a marca: duas logos
  podem repetir o `src` ou o `alt`.
- **Demonstração:** a sigla vem do arquivo `/ciia-sigla.svg`, com `alt=""` (decorativa). Com `alt="CIIA"` na logo
  e na sigla, o leitor de tela lia "CIIA, CIIA".
- **`DESIGN.md`:**
  - `card-border` (`#b5bac0`) entra no bloco `colors`, e o texto separa a borda da casca do contorno dos quadros;
  - o token `{typography.nav-group}` descreve o nome do grupo só para leitores de tela, com a linha em degradê na
    tela; o componente `nav-group-label` dá lugar a `nav-group-rule`;
  - entram a prioridade do título e as logos (componente `logo-chip`).
- **`REPLICAR.md`:**
  - 1.3: o nome da pasta descompactada, inclusive a que o "Extrair tudo" do Windows cria;
  - 4.1: `.gitignore` com `tema-mppa-next-v*/` e as logos gravadas em `public/`;
  - 4.5: `header.logos` com os três itens, na ordem;
  - 7: conferir a soma do zip;
  - 7.1: classes passadas na `className` que sobrepõem a camada;
  - 9: as regras novas do cabeçalho.
- **`GUIA.html`:** conferir a soma e descompactar sem a pasta extra do Windows.
- **CHANGELOG 1.11.0:** passos do "Ao atualizar de 1.10.2" completados (logos, contorno sobreposto na
  `className`, testes da borda) e nota sobre as duas compilações.

### Ao atualizar de 1.11.0

A 1.12.0 não chegou a ser entregue: vá direto para a 1.12.1, que tem a mesma camada e chega como pasta, sem zip.
Os passos abaixo valem com a pasta da 1.12.1.

1. Capture as telas antes da cópia, em 640px, 801px, 900px, 1024px e 1280px, nos dois temas, com a barra aberta e
   recolhida (`REPLICAR.md`, 7.1).
2. Copie a pasta `tema-mppa-next/` para a raiz do repositório e rode
   `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7). A cópia
   confere a pasta antes e grava em `public/` as logos que faltam. Se
   o sistema já criou a sua `public/ciia-sigla.svg` (como o Heimdall), ela fica: confira o aviso da cópia e, se
   ele disser que difere, troque-a pela do modelo.
3. **Logos:** `header.logos` passa a ter três itens, nesta ordem (`REPLICAR.md`, 4.5): MPPA
   (`/mppa-logo.png`, 132×76, `alt: "MPPA"`), CIIA (`/ciia.png`, 244×244, `alt: "CIIA"`) e a sigla CIIA
   (`/ciia-sigla.svg`, 132×76, `alt: ""`, decorativa).
4. **Cabeçalho:** capture de novo e compare. É esperado, com a barra aberta:
   - entre 640px e 1023px, as logos saem do cabeçalho: abaixo de 801px ficam no menu móvel; de 801px a 1023px,
     sob a marca, na barra lateral;
   - o título não é mais cortado;
   - a seção à frente do título aparece conforme o espaço, e não a partir de 640px fixos.

   Com a barra recolhida, as logos ficam no cabeçalho desde 801px. Qualquer outra diferença é defeito.
5. **Testes afetados:**
   - teste que procure as logos no cabeçalho abaixo de 1024px (barra aberta) passa a procurá-las na barra
     lateral (`aside`), e teste que as espere no menu móvel só abaixo de 640px passa a esperá-las abaixo de 801px;
   - as logos estão no HTML duas vezes (cabeçalho e barra) e o CSS esconde uma: conte só as visíveis;
   - teste que conte imagens com `alt="CIIA"` passa a esperar uma (a sigla tem `alt` vazio);
   - teste que espere a seção à frente do título a partir de 640px exatos passa a medi-la pelo espaço do título;
   - teste que meça o título no cabeçalho passa a esperar ao menos 128px no bloco, em toda largura.
6. Refaça o `DESIGN.md` do sistema a partir do novo (`card-border` no `colors`, `nav-group-rule`, texto do grupo
   e do cabeçalho) e confira com o `verificar-design.mjs`, que agora reprova sem `colors.card-border`.
7. Se ao aplicar a 1.11.0 ficou alguma `className` que sobrepõe a borda do cartão, ou algum painel que imita o
   cartão com a borda antiga, faça os passos 3 e 4 revistos da 1.11.0.
8. Troque a versão na seção "Interface" do `AGENTS.md` para 1.12.0 (ou direto para a 1.12.1).

## 1.11.0 — 2026-11-12

Pedidos do autor em 12 nov. 2026: quadros que não somem no escuro, barra lateral mais larga e nomes novos
na demonstração.

> **Duas compilações com este número.** Saíram dois zips 1.11.0 diferentes. Um tem a chave das logos com o
> índice e o comentário curto do `--card-border`. O outro tem a chave `${logo.src}-${logo.alt}`, o comentário
> longo, a sigla com `alt` vazio e o desenho do `REPLICAR.md` (seção 9) já sem "Plataforma", ⌃K e ⌃B. Os dois
> funcionam. A 1.12.0 junta o melhor das duas e publica a soma SHA-256 do zip; quem tem qualquer uma atualiza
> para ela.

### Adicionado

- **`--card-border`** (`border-card-border`): contorno dos quadros e das linhas de dentro deles. Claro
  `#b5bac0` (a `--border` escurecida 20%); escuro `#3f6396`, um azul que destaca o cartão do fundo em
  monitores onde os quadros sumiam. Vale para `Card`, `PanelCard`, `LinkCard`, `InfoField`, a caixa do
  `PageGreeting` e as linhas do `DataTable`. As outras bordas (`--border`) não mudam.

### Modificado

- **Barra lateral:** 268px → 304px (recolhida continua com 76px), para os nomes das abas caberem inteiros,
  inclusive "Administração" em negrito na aba ativa.
- **Rótulo do grupo do menu:** o texto em maiúsculas abaixo das abas ("PLATAFORMA") dá lugar a uma linha de
  1px em degradê do vermelho institucional ao azul. O nome continua num `h2` só para leitores de tela.
- **Logos do cabeçalho (padrão dos sistemas, não só demonstração):** três, nesta ordem: a do MPPA (a mesma da
  página de referência do Heimdall, `public/mppa-logo.png`, 132×76) no lugar da "ÓRGÃO", a do CIIA
  (`public/ciia.png`, 244×244) e a sigla "CIIA" num terceiro espaço do mesmo tamanho da primeira (132×76; arquivo
  `public/ciia-sigla.svg` desde a 1.12.0).
- **Demonstração:** a aba "Plataforma" passa a "Minha Página" e o item "Dashboard" a "Meus acessos".

### Ao atualizar de 1.10.2

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
   A pasta `tema-mppa-next/` fica na raiz do repositório (`REPLICAR.md`, 1.3).
2. Refaça o `DESIGN.md` do sistema a partir do novo e confira com o `verificar-design.mjs`.
3. Testes:
   - teste que meça 268px na barra lateral passa a 304px;
   - teste que procure o rótulo do grupo como texto visível passa a procurá-lo pelo papel (`heading`), que
     continua acessível;
   - teste que compare a borda do cartão (ou de `PanelCard`, `LinkCard`, `InfoField`, da caixa do
     `PageGreeting` e das linhas do `DataTable`) com `--border` passa a compará-la com `--card-border`.
4. **Contorno:**
   - quadro próprio do sistema que imite o cartão da camada usa `border-card-border` no lugar de `border`;
     painéis vizinhos que imitam o cartão (raio 16px, fundo de cartão, sombra), mesmo sem usar o componente,
     entram neste passo, para não ficarem dois contornos diferentes lado a lado no escuro;
   - uma tela pode sobrepor a cor da borda na `className` passada ao cartão (no Heimdall, `border-border/70` e
     `border-border/60` no cartão do login), e segue com o contorno antigo mesmo depois da cópia. Procure
     `border-border` nas `className` passadas a `Card`, `PanelCard`, `LinkCard`, `InfoField` e `DataTable`
     (`grep -rn "border-border" <pasta das telas>`) e tire a sobreposição.
5. **Logos:** `header.logos` passa a ter três itens, nesta ordem (`REPLICAR.md`, 4.5): MPPA (132×76), CIIA
   (244×244) e a sigla CIIA (132×76, `alt=""`). Os arquivos vêm na pasta do modelo a partir da 1.12.0.
6. Os outros nomes da demonstração ("Minha Página", "Meus acessos") são só exemplo: o sistema mantém o seu
   `platformLabel` e os seus itens.
7. Troque a versão na seção "Interface" do `AGENTS.md` para 1.11.0.

## 1.10.2 — 2026-11-12

Pedido do autor em 12 nov. 2026: a interface não mostra mais etiquetas de atalho.

### Removido

- **Etiquetas de atalho:** saem o `Ctrl K` da busca e o `Ctrl B` do "Recolher". Os atalhos `Ctrl+K` (busca) e
  `Ctrl+B` (recolher a barra) continuam funcionando e seguem anunciados por `aria-keyshortcuts`.
- **`DESIGN.md`:** sai o token `typography.kbd`.

### Ao atualizar de 1.10.1

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Teste ou captura que procure o texto `Ctrl K` ou `Ctrl B`, ou um `<kbd>` na barra lateral, precisa sair.
3. Troque a versão na seção "Interface" do `AGENTS.md` para 1.10.2.

## 1.10.1 — 2026-11-12

Roteiro e cópia, a partir do que o Heimdall relatou ao atualizar para a 1.9.0 e a 1.10.0 (`REPLICAR.md`, seção
11). A camada não muda: componentes e tokens iguais aos da 1.10.0.

### Modificado

- **`copy-template.mjs`:** o backup do `--force` vai para a pasta temporária do sistema, fora do consumidor
  (dentro dele, lint, testes e conferências de todo arquivo achavam a camada antiga); numa atualização, a
  mensagem final aponta a seção 7, e não mais a 4.2.
- **`REPLICAR.md`, seção 7:** capturas antes e depois; uma cópia só ao saltar várias versões; o `DESIGN.md` do
  sistema refeito a partir do novo; a soma de conferência do zip, que o modelo não publica; e a 7.1, com os
  pontos que costumam quebrar (classes internas da camada em testes, `bg-background` em componentes shadcn,
  degradê translúcido, medidor de contraste com o brilho do fundo, fonte mono, regras locais de cor).
- **Contraste:** o texto de destaque colorido (marca, links, status) entra na regra, com 4,5:1, no `AGENTS.md`
  e no bloco "Interface" do `REPLICAR.md`.

### Ao atualizar de 1.10.0

1. Nada a mudar nas telas: a camada é a mesma. Para ter o roteiro novo em `docs/tema-mppa/`, rode
   `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Se o consumidor fixou no `.gitignore` ou em testes o backup dentro da raiz (`.tema-mppa-backup-*`), a regra
   pode ficar; ela só deixa de ser necessária.
3. Troque a versão na seção "Interface" do `AGENTS.md` para 1.10.1 e acrescente à regra de contraste o texto de
   destaque colorido (marca, links, status) com 4,5:1.

## 1.10.0 — 2026-11-12

Estética nova, com a mesma estrutura e a mesma API. Pedido do autor em 12 nov. 2026: a camada passa a seguir a
página de referência do Heimdall (`heimdall_acesso_a_sistemas.html`), inclusive o que a 1.9.0 deixou de fora por
contraste. Decisão do autor: o texto secundário volta a ser cinza, com 4,5:1 (WCAG AA) em toda superfície
neutra. Nada muda de lugar: a busca continua na barra lateral e o título continua só no cabeçalho.

### Adicionado

- **Peças de painel** (`dashboard.tsx`), da página de referência: `PageGreeting` (saudação com barra em
  degradê), `StatusBadge`, `Tag`, `InfoPill`, `SectionTitle`, `PanelCard` (cartão com cabeçalho, ícone e borda
  de cima colorida), `InfoField` (campo com ícone), `PanelGrid`, `LinkCard` (cartão clicável com seta e
  rodapé), `LinkCardMedia` e `MetricLine`. Tabela de propriedades no `REPLICAR.md`, 5.2.
- **`NavigationItem.badge`:** selo curto à direita do rótulo no menu ("Ativa"), no tom do item.
- **Demonstração:** a página inicial reproduz a página de referência do Heimdall (saudação, resumo da conta,
  acessos a sistemas e ações rápidas), com dados fictícios; as outras rotas mantêm métricas, gráficos e tabela.

### Modificado

- **Contraste:** texto principal com 7:1 ou mais nos dois temas; secundário cinza com 4,5:1 ou mais. No claro,
  `--muted-foreground` passa de `#0f172a` a `#5f6f86` (o `#64748b` da referência escurecido para chegar a 4,5:1
  no muted: 4,67:1; 4,76:1 no fundo; 5,12:1 no cartão). No escuro, `#94a3b8` (6,21:1 no muted).
- **Escuro marinho:** deixa o Zinc. Fundo `#070b12`, barra `#0c121e`, cartão e popover `#111827`, muted,
  secondary, accent e sidebar-accent `#182235`, texto `#f8fafc`, texto da barra `#cbd5e1`, borda branca a 8%.
  Tons dos ícones a 18% da cor sobre a barra, com os traços da referência (de 5,93:1 a 9,59:1).
- **Item selecionado do menu:** azul sólido, sem degradê, nos dois temas: `#bfdbfe` no claro, com texto e ícone
  azul-marinho `#0a2a66` (9,62:1) e barra em azul forte; `#2547a8` no escuro, com texto e ícone brancos (8,25:1)
  e barra azul-clara; brilho azul (`--highlight-shadow`); utilitário `tm-nav-active`. `--highlight` passa a
  `#bfdbfe` (escuro `#2547a8`) e `--highlight-foreground` a `#0a2a66` (escuro `#ffffff`). Sob o ponteiro, o item fica num azul sutil (`--sidebar-hover`). As abas
  deixam o realce: a ativa fica em `bg-card` com sombra, e os ícones das abas aparecem sempre (Plataforma no
  vermelho institucional, Administração na primária).
- **Ícones de seção:** caixa de 32px no menu e 28px no título (eram 28 e 24), raio 8px, tom com brilho em degradê
  e borda de 1px na cor do traço (utilitário `tm-tone`), miolo a 20%.
- **Medidas:** faixas (`--shell-bar`) de 62px (eram 56px); barra lateral de 268px, 76px recolhida (eram 260 e
  64); conteúdo com padding 40px × 36px (24px no tablet, 16px no celular) e largura máxima de 1380px (eram 38px e
  1500px); `PageFrame` com 32px até o conteúdo e 16px entre blocos; `CardGrid` com 16px.
- **Cartões:** raio 16px, padding 24px, sombra em camadas (`shadow-card`; `shadow-card-hover` para cartões
  clicáveis do sistema). Cabeçalho da `DataTable` em maiúsculas, 11px.
- **Botões:** raio 12px e ícone de 36px. Variante nova `chrome` (borda, fundo do cartão e sombra leve), usada no
  botão de tema e no de menu móvel.
- **Cabeçalho e rodapé:** translúcidos com desfoque (`--header`); fundo da página com brilho vermelho e azul nos
  cantos de cima (`--canvas-glow`). Título com a seção à frente ("Plataforma / Dashboard", a seção a partir de
  640px; o `<h1>` continua só com o rótulo). Logos em caixas com borda e sombra. Avatar em degradê do vermelho
  ao azul com ponto verde de conectado; nome em negrito. Sair com realce destrutivo. Sol âmbar e lua azul no
  botão de tema (`--theme-icon`).
- **Item do menu sob o ponteiro:** fundo azul (`--sidebar-hover`: `#ecf4fe` no claro, texto com 16,10:1;
  `#142645` no escuro, 14,41:1), no lugar do cinza neutro.
- **Barra lateral:** marca com nome em negrito e versão num selo vermelho em fonte mono; `tagline` em 11px.
  Rótulo do grupo em maiúsculas, 11px, cinza. Itens com raio 12px e 13,5px. "Recolher" com `Ctrl B` em `kbd` e
  ícone de painel. Busca com raio 12px, sombra e `kbd` mono.
- **Rodapé:** "Ministério Público do Estado do Pará" em negrito e o nome do sistema no vermelho institucional;
  o texto continua o de `footerText`.
- **Tokens novos:** `--institutional`, `--institutional-foreground`, `--header`, `--canvas-glow`,
  `--avatar-from`, `--avatar-to`, `--avatar-foreground`, `--online`, `--theme-icon`, `--tone-sheen`,
  `--highlight-bar`, `--highlight-shadow`, `--card-shadow` e `--card-shadow-hover`.
- **Documentos e verificador:** `AGENTS.md`, `DESIGN.md`, `REPLICAR.md`, `GUIA.html`, `README.md` e
  `verify-template.mjs` com os valores e as regras novas. Prévia e comparações regeradas.

### Ao atualizar de 1.9.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Rode o `verificar-design.mjs` e leve ao `DESIGN.md` do sistema os valores novos (secundário, escuro marinho,
   realce, logo surface, violeta e as medidas).
3. Regras, specs e testes locais que exigem o secundário igual ao principal ou 12:1 em todo texto passam a
   exigir 7:1 no texto principal e 4,5:1 no secundário; reescreva-os (a regra é da camada).
4. Testes que leem o fundo do item ativo (`background-color`) passam a esperar o azul de `--highlight`; testes que exigem o texto principal sobre `--highlight` passam a exigir
   `--highlight-foreground`; os que medem 56px, 260px, 64px, 34px ou o realce da aba ativa precisam dos valores novos.
5. Telas do sistema que imitavam a estética nova com classes locais (`rounded-xl`/`rounded-2xl`, `shadow-xs`,
   borda superior colorida em `Card`, cinza fixo no texto secundário) podem voltar ao primitivo: o `Card` já tem
   raio 16px, padding 24px e sombra em camadas. Mantenha só o que for do sistema.
6. Opcional: `brand.tagline` aparece sob o nome; `sidebarShortcutLabel: "Recolher menu"` deixa o rótulo igual
   ao da referência. Painéis montados à mão (saudação, cartões de atalho, campos com ícone) podem passar às
   peças de painel (`PageGreeting`, `PanelCard`, `InfoField`, `SectionTitle`, `LinkCard`).
7. Troque a versão na seção "Interface" do `AGENTS.md` para 1.10.0.

## 1.9.0 — 2026-11-11

Superfícies em ardósia no claro, sombra com brilho interno, ícones de seção duotone, busca na barra lateral e
realce mais claro. Pedido do autor em 11 nov. 2026, aplicado dentro das regras de contraste (7:1 no claro, secundário igual ao texto, ícones com
4,5:1). A API não muda; mudam a aparência e o lugar da busca. O escuro continua em Zinc.

### Modificado

- **Claro em ardósia:** fundo `#ffffff` → `#f4f7fb`; cartão e popover `#fafafa` → `#ffffff`; barra `#fcfcfc` →
  `#ffffff`; muted, secondary, accent e sidebar-accent `#f4f4f5` → `#f1f5f9`; borda e input `#d4d4d8` →
  `#e2e8f0`; texto e secundário `#18181b` → `#0f172a` (16,61:1 no fundo); texto da barra `#334155` (10,35:1);
  logo surface `#f8fafc`. A primária fica `#0842a1` (8,48:1 sobre o fundo). O pedido trazia secundário `#64748b` (4,4:1), item ativo escuro e tons a 12% (3,3:1), que
  ficaram de fora por contraste.
- **Busca na barra lateral:** a caixa "Abrir busca" sai do cabeçalho e fica fixa na barra lateral, logo acima
  do "Recolher", na largura da barra, com lupa, texto e `Ctrl K`; com a barra recolhida, só a lupa; no celular,
  no menu móvel (antes, só a lupa no cabeçalho). O texto padrão de `header.searchPlaceholder` passa de
  "Buscar ou executar…" a "Buscar na página". O diálogo (o do modelo e o de `renderSearch`) vai para o `<body>`
  por portal, porque a barra tem `transform`. Escolher um resultado fecha também o menu móvel. `headerActions`
  fica à esquerda do tema.
- **Realce do item e da aba ativos mais claro:** `--highlight` passa de `#dbeafe` a `#ecf4fe` no claro (texto com
  16,10:1; 10 pontos de luz dariam branco, então sobe 3,5) e de `#12264a` a `#1c3b73` no escuro (10 pontos a mais
  de luz; texto com 10,47:1).
- **Sombra (`--shadow`):** deixa a do protótipo e passa a camadas com brilho interno de 1px no topo:
  `0 1px 3px rgba(9,9,11,.06), 0 4px 12px -2px rgba(9,9,11,.05), inset 0 1px 0 0 rgba(255,255,255,.8)` no
  claro e `0 4px 16px -2px rgba(0,0,0,.5), 0 1px 3px rgba(0,0,0,.35), inset 0 1px 0 0 rgba(255,255,255,.07)` no
  escuro. `--drawer-shadow` a 22%.
- **Tons do escuro:** deixam de repetir os pastéis do claro. Fundo translúcido (18 a 20% da cor sobre a barra
  `#18181b`), gravado em hex, com traço pastel de 9,69:1 a 10,44:1 (azul `#1f2d47` + `#bfdbfe`, verde `#17352d` +
  `#a7f3d0`, e os demais na tabela do `REPLICAR.md`, seção 8).
- **`SectionIcon` duotone:** o miolo do ícone recebe 15% da cor do traço (`[&_svg]:fill-current/15`); anel
  interno de 1px a 15%; cresce 5% sob o mouse no menu (os links ganham `group`), sem movimento com
  `prefers-reduced-motion`.
- **Abas Plataforma/Administração:** a ativa ganha anel de 1px na borda a 50% e transição de cor e sombra.
- **`Card`:** transição de 200ms, título com `tracking-tight` e descrição com 2px acima.
- **`text-primary` sobre `bg-primary/15`:** o aviso continua, agora pelo fundo (6,59:1) e pelo muted (6,45:1);
  `bg-primary/10` passa (7,18:1, 7,68:1 e 7,04:1).
- **Demonstração:** a segunda logo do cabeçalho passa a ser a do CIIA (`public/ciia.png`, a mesma do Heimdall);
  a primeira continua a de exemplo. A prévia offline embute as imagens de `public/`, uma vez só.
- **Documentos e verificador:** `AGENTS.md` (exceção ao protótipo), `DESIGN.md`, `REPLICAR.md` (seção 8),
  `GUIA.html` e `verify-template.mjs` com os valores novos. Prévia e comparações regeradas.

### Ao atualizar de 1.8.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Rode o `verificar-design.mjs`: fundos, texto, borda, sombra e os tons do escuro mudaram; leve os valores ao
   `DESIGN.md` do sistema.
3. Telas do sistema que pintavam algo com `bg-background` para parecer cartão passam a ardósia: use `bg-card`.
4. A busca saiu do cabeçalho: testes e seletores que a procuravam no `<header>` passam a procurá-la na barra
   lateral (`aria-label="Abrir busca"` não mudou). Um `renderSearch` que dependia de ficar dentro do cabeçalho
   agora é renderizado no `<body>`.
5. Testes, capturas e comparações visuais que fixam o fundo branco, o realce `#dbeafe`/`#12264a`, a borda `#d4d4d8` ou a sombra antiga
   precisam ser atualizados.
6. Troque a versão na seção "Interface" do `AGENTS.md` para 1.9.0.

## 1.8.0 — 2026-11-11

Primária azul e equilíbrio de cores. Decisão do autor em 11 nov. 2026: todos os sistemas do MPPA passam a usar
azul como cor de ação, para equilibrar com o vermelho da identidade institucional, sem nenhuma diferença de
cor, fonte, tamanho ou estrutura entre eles. Os azuis são os que o Heimdall já usava: `#0842a1` no claro
(texto `#ffffff`) e `#61a6fa` no escuro (texto `#080c16`). A API não muda; muda a aparência.

### Modificado

- **Ação em azul:** `--primary`, `--ring`, `--sidebar-primary` e `--sidebar-ring` passam de vermelho
  (`#9f0712` no claro, `#ef4444` no escuro) a `#0842a1` (9,11:1 com branco e sobre o fundo) no claro e a `#61a6fa`
  (7,04:1 sobre o cartão, 7,90:1 sobre o fundo; texto escuro com 7,76:1) no escuro. O botão primário, o foco e
  os links de ação seguem.
- **Item ativo da barra:** `--highlight` passa a azul-claro, `#dbeafe` no claro (texto preto com 14,52:1) e
  `#12264a` no escuro (texto claro com 14,35:1). O ícone do item é azul.
- **Ícone padrão de seção:** `SectionIcon` sem `tone` e o ícone do título do cabeçalho passam de `"red"` a
  `"blue"`; a demonstração usa `"blue"` nos dois primeiros itens de cada aba. `"red"` continua aceito, mas
  fica reservado ao que tem significado institucional.
- **Gráficos:** as barras do `BarChart` e `--chart-1..5` passam a azul: forte `#0842a1 → #3b82f6`, suave
  `#6f9be6 → #94b6f1` (no nível do vermelho suave de antes). No escuro, o azul do claro some no cartão (1,7:1);
  os gráficos têm valores próprios: forte `#3b82f6 → #61a6fa` (4,82:1 a 7,04:1 sobre o cartão) e suave
  `#4f78b8 → #7aa2dd` (3,97:1 a 6,78:1).
- **Vermelho só com significado:** `--destructive` (erro e ação destrutiva) e o símbolo padrão `tm-brand-mark`
  (identidade institucional) continuam vermelhos, como as logos e qualquer faixa institucional vermelho-azul.
  Os demais tons de seção continuam variados.
- **`text-primary` sobre `bg-primary/10`:** com o azul, o par passa a ter 7,68:1 sobre o fundo, 7,40:1 sobre o
  cartão e 7,01:1 sobre o muted no claro, e 6,05:1 sobre o cartão no escuro. O aviso do `REPLICAR.md` (seção 8)
  passa a valer só de `bg-primary/15` em diante (6,74:1 sobre o cartão).
- **Protótipo:** `docs/prototipo/index.html` mudou primeiro (botão primário, realce, ícone e barras em azul), e
  o `tema-mppa.css` o segue. Prévia e comparações regeradas.
- **Documentos:** `DESIGN.md` (tokens, "Overview", "Colors", tabela do escuro, "Do's and Don'ts"), `REPLICAR.md`
  (tabela de tokens, `tone`, equilíbrio de cores, aviso de `bg-primary/10`), `DIAGNOSTICO.md` (onde o sistema usa
  vermelho como ação) e `GUIA.html` (as cores do próprio guia).
- **`verify-template`:** confere o azul de ação nos quatro tokens e no texto sobre eles, o destrutivo e o símbolo
  ainda vermelhos, o tom padrão azul, os contrastes dos gráficos e dos seis tons de seção.

### Ao atualizar de 1.7.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
2. Rode o `verificar-design.mjs`: `primary`, `ring`, `highlight` e os `chart-*` mudaram; leve os valores ao
   `DESIGN.md` do sistema.
3. Confira o que ficou vermelho por ser a antiga cor de ação no código do sistema (não na camada): botão, link,
   realce, ícone, gráfico, ilustração de estado vazio. Passe a `bg-primary`, `text-primary`, `ring` ou ao tom
   `"blue"`. O vermelho fica para erro, ação destrutiva e identidade institucional.
4. Um consumidor que pintava algo de azul com token próprio, como o `--accent-blue` da tela de entrada do
   Heimdall, pode passar a usar a primária: o valor é o mesmo.
5. Testes, capturas e comparações visuais que fixam a cor vermelha da primária, do item ativo ou do gráfico
   precisam ser atualizados.
6. Itens de menu sem `tone` (ou com `"red"` só por ser o padrão) passam a azul: reveze os tons como na seção 4.5.
7. Troque a versão na seção "Interface" do `AGENTS.md` para 1.8.0.

## 1.7.0 — 2026-11-10

Pedidos do HubIA (o segundo consumidor antigo, Fase 1), P1 a P5 do plano dele, e dois ajustes que a adoção
mostrou. A cópia do HubIA, única que existia, partia da 1.6.0; esta entrada foi recuperada dela e leva junto as
correções da 1.6.1 (tema com o `sessionStorage` bloqueado). A API só ganha propriedades opcionais; nada sai.
O que muda na aparência: o texto secundário e o de status passam a 12:1 sobre superfície neutra nos dois temas.

- **P1. Mais tons de seção:** `NavigationTone` ganha `"blue"`, `"teal"`, `"pink"` e `"amber"` (tokens
  `--tone-*` e `--tone-*-foreground`, de 4,86:1 a 6,37:1 sobre o próprio fundo), para sistemas com mais de
  quatro itens que pedem uma cor por item.
- **P2. Barra recolhida sem piscar em layout estático:** o script de boot (`<ThemeScript>`) passa a marcar
  `data-tm-sidebar="collapsed"` no `<html>` a partir do `localStorage`, e a barra se desenha pela variante
  `tm-collapsed` do `tema-mppa.css`, não pelo estado do React. Antes, numa casca hidratada, a barra recolhida
  nascia expandida e fechava depois. O pedido era um cookie opcional; o atributo resolve o mesmo sem obrigar
  o layout a ler cookie (que o tornaria dinâmico). `SIDEBAR_STORAGE_KEY` passa a vir de `theme-script.tsx`.
- **P3. Busca do sistema (`renderSearch`):** o `AppShell` aceita `renderSearch({ open, setOpen })`, que troca
  a paleta do modelo pelo diálogo do sistema (por exemplo, uma busca no servidor). O botão "Abrir busca" e o
  `Ctrl+K` continuam do modelo.
- **P4. Ações do sistema no cabeçalho (`headerActions`):** nó renderizado à esquerda da busca, para um botão
  que depende de estado do sistema (por exemplo, "Voltar ao Heimdall" só para quem veio de lá). O
  `header.backLink` fixo continua.
- **P5. Contraste de 12:1 em superfície neutra:** `--muted-foreground` escuro vai de `#a1a1aa` (5,81:1 no
  muted) a `#f4f4f5` (13,55:1); `--success`/`--warning` vão a `#08351f`/`#432506` no claro (12,41:1 e
  12,69:1 no muted) e a `#bbf7d0`/`#fef08a` no escuro (12,29:1 e 12,80:1). Texto sobre preenchimento
  colorido continua em 4,5:1.
- **Sessão a caminho (`session={null}`):** a casca aparece sem esperar a sessão (sem salto de layout), sem
  dado de usuário nem administração, com o espaço do avatar reservado e o botão de sair disponível.
- **Título vindo do conteúdo (`title`):** numa rota de detalhe, o nome do registro substitui o rótulo do item
  no cabeçalho e sai sem ícone de seção; o item continua marcado na barra.
- **Rota sob `<Suspense>`:** a barra lateral e o título do cabeçalho leem `usePathname()` dentro de
  `<Suspense>`. Com Cache Components (Next 16), ler a rota fora dele reprovava o `next build` nas rotas
  dinâmicas ("URL data `usePathname()` in a Client Component outside of `<Suspense>`"). Enquanto a rota não
  chega, a barra mostra os itens de plataforma sem item marcado, e o título fica vazio. Os itens leem a barra
  recolhida pela loja externa (`useCollapsedAttribute`), não pelo contexto: a fronteira hidrata depois do resto,
  e o `title` do item em modo ícone divergiria do HTML servido e ficaria ausente.
- **Iniciais próprias (`session.initials`):** opcional; sem ele, a regra da camada continua.
- **`REPLICAR.md`:** 4.4 (o script também marca a barra), 4.5 (tons novos), 4.6 (tabela das propriedades
  novas), 4.8 (atributo `data-tm-sidebar`), seção 8 (tons novos e contraste de 12:1) e seção 11.
- **`DESIGN.md`:** tons novos, status e secundário do escuro com os valores novos, e a regra de 12:1.

### Ao atualizar de 1.6.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (seção 7).
2. Rode o `verificar-design.mjs`: `success`, `warning` e os tons novos mudaram; leve os valores ao `DESIGN.md`
   do sistema.
3. Testes que leem o estado da barra recolhida passam a ler `data-tm-sidebar` no `<html>` (ou o
   `aria-expanded` do botão "Recolher menu lateral").
4. Opcional: troque a busca, o botão de volta e o título de detalhe locais por `renderSearch`, `headerActions`
   e `title`.
5. Troque a versão na seção "Interface" do `AGENTS.md`.

## 1.6.1 — 2026-11-10

Duas correções do tema com o `sessionStorage` bloqueado, achadas na revisão de código do Heimdall. A
aparência e a API da camada não mudam.

- **`setTheme` com o armazenamento bloqueado:** o `ThemeProvider` lia o tema só do `sessionStorage`; bloqueado
  (navegação privada, política do navegador) ou cheio, a leitura devolvia sempre "light" e o alternador não
  trocava o tema. O comentário "mantém a interface operacional" não era verdade. Agora, quando a gravação
  falha, o tema fica numa variável do módulo e vale para a aba até recarregar a página, que volta ao claro,
  como o script de tema. Quando a gravação volta a funcionar, o `sessionStorage` retoma o papel.
- **Script de tema com o armazenamento bloqueado:** o `catch` do `THEME_BOOT_SCRIPT` acrescentava `light` sem
  tirar `dark`; uma página servida com `class="dark"` ficava com as duas classes. Agora tira `dark` antes.
- **`verify-template`:** executa os dois casos: transpila `theme-script.tsx` e `theme-provider.tsx` com o
  TypeScript do projeto e roda o script de tema e o provedor no `vm` do Node, com o `sessionStorage` bloqueado
  e cheio (só a gravação falha). Os testes reprovam a 1.6.0.

### Ao atualizar de 1.6.0

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (`REPLICAR.md`, seção 7).
   Mudam só `theme-provider.tsx` e `theme-script.tsx`; o `camada.json` volta com os novos SHA-256 e a versão
   1.6.1. Se o `copy-template` avisar que um deles estava editado, refaça a edição local sobre o arquivo novo.
2. O HTML do script de tema muda (o `catch` agora tira `dark`). Teste do consumidor que compara o
   `THEME_BOOT_SCRIPT` com um texto fixo, ou um hash de CSP calculado sobre ele, precisa ser atualizado; com o
   `nonce` do `<ThemeScript nonce={nonce} />`, nada muda.
3. Se o consumidor tem teste que espera o tema preso no claro com o `sessionStorage` bloqueado, ele passa a
   falhar: o alternador agora troca o tema na aba.
4. Troque a versão na seção "Interface" do `AGENTS.md` para 1.6.1.

## 1.6.0 — 2026-11-10

Correções do que a adoção pelo Heimdall (o primeiro consumidor antigo, Fase 1) mostrou no zip, no roteiro e
na camada. A aparência não muda. A API ganha o `<ThemeScript>`; nada sai.

- **Zip sem `package.json`:** o `copy-template.mjs` lia a versão do `package.json` do modelo, que o zip não leva,
  e falhava com ENOENT sem gravar nada. Agora lê a versão do primeiro título do `CHANGELOG.md`, que vai no zip.
- **Script de tema (`<ThemeScript nonce />`):** `THEME_STORAGE_KEY`, `THEME_BOOT_SCRIPT` e o novo `ThemeScript`
  passam para `theme-script.tsx`, módulo sem `"use client"`. Vindo do `theme-provider.tsx` (`"use client"`), o
  `THEME_BOOT_SCRIPT` importado no layout raiz era, no servidor, uma referência de cliente: uma função que
  lança "Attempted to call THEME_BOOT_SCRIPT() from the server". O HTML só saía certo porque o React
  resolvia a referência ao renderizar; qualquer outro uso no servidor (concatenar, testar o tipo) quebrava.
  O exemplo da seção 4.4 do `REPLICAR.md` e a demonstração usam `<ThemeScript nonce={nonce} />`.
- **Tema escuro sem transição na montagem:** na hidratação, o `ThemeProvider` aplicava por um instante o tema do
  servidor (claro) e voltava ao escuro no mesmo quadro. Uma casca montada nesse instante (no consumidor que
  espera a sessão chegar no navegador) nascia com as cores do claro e fazia a transição de cor até as do
  escuro, em cerca de 150ms: item e aba ativos piscavam em rosa. Achado no teste cego da 1.6.0. Agora o
  provedor aplica o tema guardado, e não o da renderização.
- **Modo dos arquivos:** o zip trazia a camada com 0777, que vira `100755` sem shebang num repositório que confere
  o modo pelo índice do git. O `empacotar` fixa 644, e 755 só para script com shebang, seja qual for o modo
  na pasta; o `copy-template` grava os mesmos modos no consumidor; e o próprio modelo corrigiu os modos no git.
- **Sem versão escrita na camada:** comentários com versões (`1.5.0`, `1.0.0`, `v2.0.0`…) acionavam a
  conferência de "versão fora dos pontos de versão" do consumidor. A versão da camada fica só no `camada.json`
  e no CHANGELOG.
- **Contrato observável (`REPLICAR.md`, 4.8):** tabela do que a camada muda e os testes do consumidor costumam
  ler: chaves de armazenamento, alternador de tema e o ciclo claro → escuro → sistema, `aside` "Navegação
  principal", título num `h1` dentro do `header`, links administrativos fora do DOM na aba Plataforma, menu
  móvel fechado por translação (o Playwright o vê "visível"), busca, sair e leitura dos tokens em hex.
- **`DESIGN.md`:** novo `DESIGN.md` da camada, no formato aberto do Google Labs (`alpha`; linter oficial com
  0 erros e 0 avisos), copiado para `docs/tema-mppa/DESIGN.md`. A Fase 1 passa a criar o `DESIGN.md` do
  sistema na raiz do frontend (`REPLICAR.md`, 4.9; a verificação da Fase 1 vira 4.10). O novo
  `verificar-design.mjs`, copiado com a camada, reprova cor diferente da do CSS, cor da camada ausente,
  referência inexistente e seção fora de ordem, sem rede e sem Vitest.
- **Guia do desenvolvedor (`GUIA.html`):** página que vai no zip e abre direto no navegador. O
  desenvolvedor responde duas perguntas (situação do sistema: do zero, já existe sem o tema ou já tem o
  tema; e se o repositório usa OpenSpec) e o guia monta os passos daquele caso, cada um com o prompt pronto
  e o que conferir depois. No sistema do zero, nome, versão, ano e telas iniciais entram por campos e vão
  para o prompt. O `copy-template` grava o guia em `docs/tema-mppa/`, onde ele fica depois que a pasta
  descompactada sai. O zip passa a ser o único arquivo entregue: o `empacotar` não grava mais o `.sha256`.
- **Sistema do zero (`REPLICAR.md`, 2.1):** num repositório sem frontend, o agente cria o app com o
  `create-next-app` nas versões exatas do modelo, monta a casca com os dados do pedido, uma sessão
  provisória (sem autenticação, que o modelo não implementa) e uma página por tela inicial.
- **OpenSpec em três passos (`REPLICAR.md`, 1.2):** cada fase é uma change: propor (o agente para e o
  desenvolvedor revisa), aplicar e arquivar, cada passo num pedido. Sem OpenSpec, cada fase é uma branch e um
  commit.
- **Fase 0 (`DIAGNOSTICO.md`):** pergunta pelas regras de lint desligadas no projeto inteiro e por
  `--max-warnings 0`; pelas regras visuais próprias e pelos pares de cor antigos, com o contraste recalculado;
  pelas conferências que leem todo arquivo rastreado (versão, modo, links em `.md`, cor fixa); e por um
  `DESIGN.md` existente.
- **`REPLICAR.md`:**
  - 4.1: bloco de lint só para a pasta da camada (`reportUnusedDisableDirectives: "off"`) e exclusão de
    `docs/tema-mppa/` das conferências de todo arquivo;
  - 4.10: confere o script de tema no HTML servido;
  - seção 8: "não faça" `text-primary` sobre `bg-primary/10` (abaixo de 7:1 com a primária `#9f0712`) e
    texto colorido onde o consumidor exige texto preto.
- **`verify-template`:**
  - gera o zip numa pasta temporária, confere o modo de cada entrada e que ele não leva o `package.json`;
  - descompacta o zip e roda o `copy-template` **de lá** num consumidor descartável;
  - compila esse consumidor com os exemplos da 4.4 e da 4.5 tais como estão, e confere no HTML servido o
    script de tema (sem "Attempted to call"), o contrato observável e, numa sonda, que o script é texto no
    servidor;
  - confere o contrato da 4.8 contra o código da camada, a ausência de versão escrita na camada, o
    `DESIGN.md` do modelo contra o CSS e o `verificar-design.mjs` num `DESIGN.md` de consumidor (aprovado,
    cor trocada e cor ausente reprovadas).

### Ao atualizar de 1.5.x

1. Rode `node tema-mppa-next/scripts/copy-template.mjs <raiz do consumidor> --force` (seção 7). Os arquivos da
   camada voltam com modo 644; se o git do consumidor os tinha como `100755`, o commit registra a troca de
   modo.
2. Troque o script de tema do layout raiz por `<ThemeScript nonce={nonce} />` (importado de
   `components/tema-mppa`) e apague o contorno local, se houver (por exemplo, um Client Component que
   renderizava o `THEME_BOOT_SCRIPT`). Testes que importam `THEME_BOOT_SCRIPT` ou `THEME_STORAGE_KEY`
   continuam funcionando: os nomes não mudaram.
3. Se o consumidor desliga `@next/next/no-img-element` no projeto inteiro e ignorou a pasta da camada no lint,
   pode trocar pelo bloco da 4.1 (`reportUnusedDisableDirectives: "off"` só na pasta), que volta a compilar a
   camada no lint.
4. Crie o `DESIGN.md` do sistema (4.9) e ligue o `verificar-design.mjs` aos testes. Se ele já existe, rode o
   verificador: ele exige as cores da camada com os mesmos valores.
5. Confira na tabela da 4.8 os testes do consumidor e, na seção 4.1, as conferências que leem todo arquivo
   rastreado; troque a versão na seção "Interface" do `AGENTS.md`.

## 1.5.0 — 2026-11-10

Procedimento padrão para levar o modelo a codebases antigos, com o que o planejamento do Heimdall (o
primeiro consumidor antigo) mostrou. A aparência e a API da camada não mudam.

- **Fases:** o `REPLICAR.md` passa a trabalhar em fases, cada uma uma entrega: 0. Diagnóstico (só lê e para
  para o desenvolvedor decidir), 1. Casca, 2. Telas (aos poucos), 3. Limpeza, e a atualização para uma
  versão nova. Num consumidor novo, as fases 1 e 2 podem ir juntas.
- **Diagnóstico:** novo formulário `DIAGNOSTICO.md`, que o agente preenche sem mudar nada: stack, estrutura,
  processo do projeto, casca, menus, sessão, marca, tema, rodapé, tokens, testes afetados, conflitos com o
  padrão e o plano por fase.
- **Processo do consumidor:** o agente segue as regras dele (OpenSpec, padrão de branch e de commit,
  testes); a branch `feat/interface-tema-mppa` vale só para quem não tem padrão. Conflitos com o padrão
  visual vão ao desenvolvedor.
- **Monorepo:** a raiz do consumidor é a pasta do `package.json` do frontend; o roteiro e o script dizem isso.
- **Lista de conferência da camada:** o `copy-template.mjs` grava `docs/tema-mppa/camada.json` (versão e
  SHA-256 de cada arquivo) e copia o `verificar-camada.mjs`, que reprova arquivo editado, ausente ou a mais.
  Na atualização com `--force`, o script avisa quais arquivos estavam editados.
- **CSP:** o exemplo do layout raiz passa o `nonce` ao script de tema.
- **Tokens próprios do consumidor:** tabela para mapear cada um (apontar para o token da camada, manter
  com valor completo e contraste conferido, ou remover).
- **Testes do layout antigo:** seção própria na Fase 1, com o mínimo a cobrir.
- **Rodapé fora da casca:** páginas públicas com rodapé usam `footerText` com a mesma marca.
- **Retorno ao modelo:** ao fim de cada fase, o agente lista o que o roteiro não previu.
- **`verify-template`:** confere o `REPLICAR.md` na versão, o zip com o diagnóstico e o verificador, e faz uma
  cópia de verdade num consumidor descartável (camada intacta aprovada, editada reprovada).

### Ao atualizar de 1.4.x

Nada muda na camada. Rode o `copy-template.mjs --force` para ganhar a lista de conferência e o verificador,
e troque a versão na seção "Interface" do `AGENTS.md`.

## 1.4.2 — 2026-11-10

Correções da terceira revisão de código. A aparência não muda.

- **Node mínimo volta a 22.0** (`engines`): o `verify-template` transpila `utils.ts` com o TypeScript do
  projeto em vez de depender do TypeScript nativo do Node 22.18.
- **`verify-template`:**
  - procura a propriedade `footer` pela árvore do TypeScript, no componente e na declaração inteira de
    `AppShellProps`: comentários, textos com `//` e tipos aninhados não escondem mais nada;
  - confere que `--shell-bar: 3.5rem` está definido em `:root`, não só que as classes o usam;
  - confere que o título da prévia traz a versão do pacote.
- **Prévia:** `gerar-preview.mjs` lê a versão do `package.json`; o título deixa de dizer v1.1.0.

## 1.4.1 — 2026-11-10

Correções da segunda revisão de código do rodapé. A aparência não muda.

- **Texto institucional nunca cortado:** sai o limite de 3 linhas (`line-clamp`) e a dica no `title`. Até 3
  linhas cabem em 56px; com um nome muito longo, o rodapé cresce em vez de esconder texto.
- **Uma altura para as faixas:** token `--shell-bar` (56px), usado pelo cabeçalho, pela marca, pelo
  "Recolher" e pelo rodapé (`h-(--shell-bar)`), no lugar de quatro `h-14` soltos.
- **Uma borda para as faixas:** `--sidebar-border` passa a ser `var(--border)` nos dois temas, e o rodapé
  usa a mesma borda do "Recolher". O valor não muda.
- **Nome ausente:** `footerText` aguenta `brand.name` vazio ou ausente (sistemas em JavaScript ou com
  configuração lida em tempo de execução) sem derrubar o shell; a parte vazia sai do texto.
- **`verify-template`:**
  - falha, em vez de só avisar, quando não consegue executar `footerText`;
  - procura qualquer menção à propriedade `footer` no tipo e no componente;
  - proíbe cortar o texto do rodapé;
  - confere o token de altura nas faixas e a versão do `package-lock.json`;
  - testa cinco casos.
- **Node mínimo 22.18** (`engines`), a primeira versão 22 que executa TypeScript sem configuração.
- **`package-lock.json`** volta a ter a versão do `package.json`.

## 1.4.0 — 2026-11-10

Correções do rodapé da 1.3.0, apontadas na revisão de código. A aparência do resto da interface não muda.

- **Sempre alinhado ao "Recolher":** a partir de 801px, o rodapé fica fixo no pé da tela (`sticky`), na
  mesma linha do "Recolher" também em páginas longas. Antes, só se alinhava quando o conteúdo era curto.
- **Altura fixa de 56px no desktop** (`h-14`), com o texto limitado a 3 linhas; o texto completo aparece
  ao passar o mouse. No celular, onde não há "Recolher", o rodapé fica no fim da página com a altura do
  texto.
- **Sem substituição:** a propriedade `footer` do `AppShell` foi removida. Ela permitia trocar ou apagar
  o texto institucional. Mudança que quebra quem a passava: apague a propriedade.
- **`footerText(brand)` e `FOOTER_CREDIT`:** passam para `utils.ts`, módulo sem `"use client"`, e são
  exportados pelo `index.ts`.
- **Versão no rodapé:** só um "v" seguido de número é removido ("v2.0.0" vira "V 2.0.0"; "vNext-1"
  fica). Versão ou ano vazios saem do texto.
- **Borda do rodapé:** usa o token do conteúdo (`border`) no lugar do da barra lateral; o valor é o mesmo
  nos dois temas.
- **`verify-template`:** passa a conferir:
  - o texto montado com `footerText(config.brand)`;
  - `sticky`, `h-14`, o limite de 3 linhas e a borda;
  - a ausência da propriedade `footer`.

  Ele também executa `footerText` com quatro casos de teste.
- **`AGENTS.md`:** registra que o rodapé, ausente no protótipo, segue a página de exemplo.

## 1.3.0 — 2026-11-10

Rodapé padrão dos sistemas, no lado direito, embaixo do conteúdo. O "Recolher" da barra lateral e o resto
da interface sem mudança.

- **Sempre presente:** 56px de altura, alinhado ao "Recolher"; borda superior; texto `text-xs`, centralizado,
  na cor secundária.
- **Texto montado da configuração:** *"Desenvolvido pelo Ministério Público do Estado do Pará - Escritório
  de Inteligência Artificial - {brand.name} - V {brand.version} - {brand.versionYears}"*. A versão e o ano
  saem do texto quando não informados. A função `footerText(brand)` monta esse texto.
- **Configuração nova:** `brand.versionYears`, o ano (ou os anos, como `"2025-2026"`) da versão.
- **`footer` do `AppShell`:** agora substitui o texto padrão; os sistemas não devem usá-lo.

## 1.2.0 — 2026-11-10

Cabeçalho no padrão que os sistemas vão usar, igual ao do Heimdall 2.0.0. Estrutura, cores e tokens sem
mudança.

- **Marca no topo da barra lateral:** símbolo de 32px; nome (semibold) e versão (`text-xs`, cor secundária)
  na mesma linha; subtítulo, se houver, abaixo. `tm-brand-mark` passa de 34px para 32px.
- **Título:** ícone de seção de 24px (`SectionIcon size="sm"`) e título em `text-sm`, peso 500, 10px depois do
  ícone.
- **Busca:** caixa de 224px × 32px, com lupa, texto (`header.searchPlaceholder`) e `Ctrl K`, a partir de 640px;
  abaixo, só a lupa.
- **Lado direito:** tema; divisória; logos institucionais; divisória; identidade.
- **Identidade:**
  - avatar redondo de 32px;
  - nome e perfil visíveis a partir de 1280px;
  - e-mail ao passar o mouse;
  - botão de sair visível (`onSignOut`).

  O painel que o avatar abria (Base UI Popover) saiu.
- Espaçamentos do cabeçalho: padding de 16px (12px no celular) e 4px entre os controles da direita.
- Demonstração com duas logos genéricas de exemplo e sem subtítulo; prévia e comparações regeradas.
- `REPLICAR.md` e `AGENTS.md` descrevem o cabeçalho padrão, que prevalece sobre o do protótipo.

## 1.1.1 — 2026-11-10

O modelo passa a servir para ser entregue a um agente: basta colocar o zip no codebase consumidor e pedir
que ele replique a interface. Sem mudança visual nem de API na camada.

- `REPLICAR.md` na raiz: roteiro para o agente do consumidor, com:
  - escopo (o que replicar e o que não tocar);
  - escolha entre copiar e portar, conforme a stack;
  - dependências, CSS global, layout raiz, configuração do shell, sessão e telas;
  - tabela do código de cores, estrutura com medidas;
  - verificação, limpeza e o trecho para o `AGENTS.md` do consumidor.
- `scripts/copy-template.mjs`:
  - detecta se o consumidor usa `src/` (grava em `components/` e `styles/` quando não usa);
  - aceita `--components-dir` e `--styles-dir`;
  - copia para `docs/tema-mppa/` do consumidor o guia, a configuração, o CHANGELOG, o protótipo, a prévia
    e as comparações;
  - recusa o próprio modelo como destino.
- README e `AGENTS.md` do modelo apontam o agente do consumidor para o `REPLICAR.md`.
- Repositório enxuto:
  - saem o backup antigo `.backup-alinhamento-*`, o `postcss.config.mjs.backup-*`, o `tsconfig.tsbuildinfo`
    (agora ignorado) e o `.env.example`;
  - saem `docs/INSTALACAO`, `INTEGRACAO`, `ATUALIZACAO`, `CONFIGURACAO`, `VALIDACAO` e
    `docs/comparacao/README`, cujo conteúdo foi para o `REPLICAR.md` e o README;
  - as ferramentas de prévia e captura vão para `scripts/`.
- `npm run empacotar` (`scripts/empacotar.mjs`) gera o zip só com o que o agente do consumidor usa:
  - `REPLICAR.md`, CHANGELOG e licença;
  - camada visual, `tema-mppa.css` e script de cópia;
  - protótipo, prévia e comparações.

  A demonstração Next.js fica fora do zip.
- `tema-mppa.css` passa a trazer a base do `html`/`body` (fundo, cor do texto, fonte Outfit, suavização e
  movimento reduzido): o CSS global do consumidor precisa só do `@import` e do `@custom-variant`. O
  `globals.css` da demonstração ficou reduzido a isso.
- `PageFrame`: `children` opcional, para páginas só com descrição e ações.
- `class-variance-authority` `0.7.1` e `clsx` `2.1.1` também com versão exata.
- Testado às cegas: um agente sem contexto, só com a frase do README, integrou o modelo num consumidor
  Next.js sem `src/` (typecheck, lint e build aprovados, tela igual à do modelo). Os pontos em que ele
  precisou adivinhar foram respondidos no `REPLICAR.md`:
  - route group para páginas públicas;
  - campos opcionais da marca e da sessão;
  - referência dos primitivos;
  - ordem do conteúdo;
  - o que fazer sem navegador;
  - `.gitignore`;
  - criação do `AGENTS.md`.

## 1.1.0 — 2026-11-10

Correção visual: a 1.0.0 não reproduzia o protótipo aprovado (`docs/prototipo/index.html`, "Template
Visual HubIA v1.0") nem o guia oficial ("Raio de 8 px, bordas suaves, sombras discretas e gráficos com
degradê"; "Título exibido uma única vez, no cabeçalho"). O protótipo manda em todo elemento gráfico.
Comparação lado a lado, nos dois temas, em 1280px e 390px: `docs/comparacao/`.

### Tokens (`src/styles/tema-mppa.css`), claro e escuro

- Raio de 8px (`--radius: 0.5rem`); abas internas e ícones de seção a 6px (`rounded-md`); avatar redondo.
- Escala de raio inteira (`xs` a `4xl`) presa a `--radius`: `xs` 2px, `sm` 4px, `md` 6px, `lg` 8px, `xl` 12px,
  `2xl` 16px, `3xl` 24px, `4xl` 32px.
- Sombra do protótipo como token `--shadow` (claro `0 2px 6px …/.08, 0 1px 2px …/.05`; escuro
  `0 2px 8px …/.3, 0 1px 2px …/.2`), utilitário `shadow-surface`, aplicada a cartão, aba ativa e item ativo.
  Também `--bar-shadow` (barras) e `--drawer-shadow` (menu móvel).
- Fundos: página `#fff` e cartão `#fafafa` (escuro `#09090b` e `#18181b`); barra lateral `#fcfcfc` (escuro
  `#18181b`); muted `#f4f4f5` (escuro `#27272a`).
- Borda `#d4d4d8` (escuro `rgba(255,255,255,.12)`).
- Realce do ativo em token novo, `--highlight`: `#fee2e2` (escuro `#351518`).
- Tokens novos: `--overlay` (sobreposições, `bg-overlay/40` e `/60`), `--logo-surface` (fundo das logos),
  `--success` e `--warning`, tons de ícone (`--tone-red|green|violet|orange` e `-foreground`), degradês dos
  gráficos (`--chart-strong-*`, `--chart-soft-*`) e do símbolo (`--brand-mark-*`).
- Valores em hex, como no protótipo, no lugar de OKLCH.
- `--font-mono` passa a `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`, sem Geist Mono; o layout de
  demonstração deixa de carregar a Geist.
- Variante `desk:` (a partir de 801px), o ponto de quebra do protótipo.
- Regra de base com a cor da borda no token, para a camada funcionar sem o `globals.css` do modelo.
- Utilitários `tm-bar`, `tm-bar-strong`, `tm-bar-soft` e `tm-brand-mark`.

### Contraste

Regra fixa dos consumidores: no claro, todo texto com 7:1 sobre o próprio fundo e texto secundário igual
ao principal; no escuro, 4,5:1 e texto escuro sobre a primária. O verificador estrutural recalcula cada
par a partir do CSS.

| Elemento | Protótipo | 1.1.0 |
| --- | --- | --- |
| Primária (claro) | `#b91c1c`, 6,47:1 com branco | `#9f0712`, 8,36:1 |
| Texto vermelho sobre `#fee2e2` | `#b91c1c`, 5,30:1 | `#970611`, 7,32:1 |
| Texto secundário (claro) | `#71717a`, 4,83:1 | `#18181b`, o preto do texto |
| Ícone verde sobre `#d1fae5` | `#059669`, 3,32:1 | `#047857`, 4,84:1 |
| Ícone violeta sobre `#ede9fe` | `#7c3aed`, 4,80:1 | sem mudança |
| Ícone laranja sobre `#ffedd5` | `#d97706`, 2,78:1 | `#a85005`, 4,80:1 |
| Primária (escuro) | `#b91c1c` com branco | `#ef4444` com `#09090b`, 5,29:1 |
| Destrutiva | — | `#991b1b` com branco, 8,31:1; escuro `#f87171` com `#09090b`, 7,19:1 |
| Sucesso / alerta (claro) | — | `#15603a` / `#7a4510` com branco, acima de 7:1 |

No escuro, os ícones de seção continuam pastéis, como no protótipo.

### Componentes iguais ao protótipo

- Abas em trilho `muted` com raio 8px e padding 3px; abas de 32px a 6px; aba ativa com realce e sombra.
- Item de menu com raio 8px, ícone e texto a 10px, 5px entre itens; ativo com realce e sombra.
- Ícone de seção de 28px, raio 6px, com `tone` por item: `"red" | "green" | "violet" | "orange"`. Classes
  soltas, como na 1.0.0, continuam aceitas.
- Barra lateral de 260px; marca com nome, versão e subtítulo; rodapé "Recolher" com botão de 34px.
- Cabeçalho de 56px com fundo sólido, sem transparência nem desfoque; busca com borda, fundo do cartão e
  raio 8px (quadrado de 34px abaixo de 801px); avatar redondo de 30px.
- O avatar abre um painel (Base UI Popover) com nome, e-mail, perfil e "Sair": o cabeçalho mostra só o
  avatar, como no protótipo.
- Botões com raio 8px e peso 700: primário cheio, secundário com borda sobre o cartão; `outline` vira
  sinônimo de `secondary`; nova variante `destructive`; botão de ícone de 34px.
- Cartão com borda, raio, sombra e padding 20px; métrica de 32px peso 800.
- Tabela com cabeçalho em texto secundário e linhas com borda; rola dentro do cartão.
- Barras de gráfico com degradê, topo arredondado (6px), até 90px de largura e 18px de altura mínima.
- Conteúdo com padding 38px (22px/14px no celular), largura máxima de 1500px, 38px entre a descrição e o
  conteúdo e 20px entre cartões; altura de linha `normal`, como no protótipo.
- Título só no cabeçalho, uma vez, como `<h1>`: `PageFrame` não aceita mais `title`, `icon` nem `tone`
  (mudança que quebra quem os usava; o título vem do item de navegação, inclusive dos `hidden`). O cabeçalho
  deixa de repetir "Administração ›" antes do item.

### Primitivos exportados

`PageFrame`, `Card`, `CardGrid`, `MetricCard`, `DataTable`, `BarChart`, `Button` e `SectionIcon`, para os
consumidores pintarem as próprias telas só com eles. Também `ThemeToggle`, `THEME_STORAGE_KEY`,
`SIDEBAR_STORAGE_KEY`, `cn`, `currentNavigationItem`, `canSeeAdministration`, `isNavigationActive` e os tipos
`NavigationTone`, `NavigationSection`, `CurrentNavigation`, `DataTableColumn`, `BarChartDatum`, `ButtonProps`
e `Theme`. A demonstração usa só esses primitivos.

### Ajustes que os consumidores fizeram na 1.0.0

- `AppShell` aceita `footer`, exibido abaixo do conteúdo.
- Topo da barra lateral, cabeçalho e rodapé da barra com a mesma altura (56px).
- `NavigationItem` ganha `description` (mostrada e filtrada pela busca), `matches` (rotas que marcam o item)
  e `hidden` (fora do menu e da busca, mas dá o título e a aba). Um só item fica marcado: o de rota mais
  longa, o mesmo do título e da aba aberta (`currentNavigationItem`).
- Sobreposição do menu móvel e da busca em `bg-overlay`; fundo das logos em `bg-logo-surface`, no lugar do
  preto e do branco fixos.
- Barra recolhida no `localStorage` (`tema-mppa-sidebar-collapsed`); sem armazenamento, só na memória da
  página.
- `Esc` fecha o menu móvel; o menu móvel abre sempre expandido, mesmo com a barra recolhida.
- Abas só com `is_admin === true` e algum item administrativo visível; a busca e o título seguem a mesma
  regra (`canSeeAdministration`).
- Abaixo de 640px, as logos do cabeçalho aparecem no menu móvel, abaixo da marca.
- `ImageSlot` compila com `strict` sem asserção não nula.
- `<kbd>` da busca em `font-sans`.

### Dependências

Versões exatas da matriz do ecossistema: React e React DOM `19.2.3`, Lucide React `1.46.0`, TanStack Query
`5.102.8`, tailwind-merge `3.6.0` e `@base-ui/react` `1.9.0`. Next.js `16.3.5`, TypeScript `5.9.3` e Tailwind
CSS `4.3.3` sem mudança.

### Modelo e documentação

- Protótipo aprovado incluído em `docs/prototipo/index.html`, para o zip bastar como fonte.
- Comparações lado a lado em `docs/comparacao/`.
- Prévia offline e autocontida em `docs/preview/index.html`, no papel do `index.html` da 1.0, capturada do
  build de produção (`docs/preview/gerar-preview.mjs`).
- `verify-template` confere os pinos, os tokens do protótipo, os contrastes, a ausência de cor fixa e de
  canto reto nos componentes, o título único e os primitivos exportados.
- README e `docs/` atualizados.

## 1.0.0 — 2026-11-09

- template migrado para Next.js 16 App Router e React 19;
- shell visual configurável com sidebar recolhível;
- abas Plataforma/Administração condicionadas a `is_admin=true`;
- cabeçalho, breadcrumb, busca, tema e identidade do usuário;
- paleta Marvel Red/Zinc, Outfit e cantos retos;
- imagens opcionais sem ícone quebrado;
- integração por propriedades, sem autenticação, BFF, API ou regra de negócio;
- script de cópia/atualização com backup;
- documentação de instalação, configuração, integração e atualização.
