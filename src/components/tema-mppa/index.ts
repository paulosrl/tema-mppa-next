/**
 * Camada visual comum do ecossistema, modelo `tema-mppa-next`. A versão copiada está em
 * `docs/tema-mppa/camada.json` no consumidor; aqui não se escreve versão, para não acionar as
 * conferências de versão do consumidor.
 * Copie esta pasta e `styles/tema-mppa.css` sem editar; o que é de cada sistema entra por
 * configuração e propriedades. A referência visual é o protótipo aprovado ("Template Visual HubIA
 * v1.0"): `docs/prototipo/index.html` no modelo, `docs/tema-mppa/prototipo/index.html` no consumidor.
 *
 * Mudanças em relação ao primeiro zip (detalhes no CHANGELOG):
 * 1. Tokens iguais ao protótipo: raio 8px (abas internas e ícones a 6px, avatar redondo), sombra
 *    `--shadow` em cartão, aba ativa e item ativo, fundos, borda e realce do ativo (`highlight`).
 * 2. Contraste: texto principal com 7:1 e secundário cinza com 4,5:1 nos dois temas; texto escuro sobre
 *    a primária no escuro. Tokens de status (`success`, `warning`).
 * 3. Componentes iguais ao protótipo e primitivos de página exportados: `PageFrame`, `Card`,
 *    `CardGrid`, `MetricCard`, `DataTable`, `BarChart`, `Button`, `SectionIcon`.
 * 4. Título só no cabeçalho, uma vez: `PageFrame` não aceita mais `title`, `icon` e `tone`.
 * 5. Rodapé padrão dos sistemas (`footerText`), sem substituição: a propriedade `footer` saiu.
 * 6. O topo da barra lateral, o cabeçalho e o rodapé da barra têm a mesma altura (`--shell-bar`, 62px).
 * 7. `NavigationItem` ganha `description` (mostrada e filtrada pela busca), `matches` (rotas que
 *    marcam o item) e `hidden` (fora do menu e da busca, mas dá o título e a aba). Um só item fica
 *    marcado: o de rota mais longa, o mesmo do título e da aba aberta (`currentNavigationItem`).
 * 8. `tone` aceita `"blue"` (padrão, sem valor), `"green"`, `"violet"`, `"orange"`, `"teal"`, `"pink"`, `"amber"`
 *    e `"red"` (reservado ao que tem significado institucional); classes soltas continuam aceitas.
 * 9. Sobreposição em `bg-overlay` e fundo das logos em `bg-logo-surface`, por token.
 * 10. A barra recolhida fica no `localStorage`; sem armazenamento, só na memória da página.
 * 11. `Esc` fecha o menu móvel; o menu móvel abre sempre expandido, mesmo com a barra recolhida.
 * 12. Abas só com `is_admin === true` e algum item administrativo visível; a busca segue a regra.
 * 13. Abaixo de 640px, as logos do cabeçalho aparecem no menu móvel, abaixo da marca.
 * 14. `--font-mono` sem Geist; nenhuma etiqueta de atalho (`<kbd>`) na interface.
 * 15. `ImageSlot` compila com `strict` sem asserção não nula.
 * 16. Escala de raio `xs` a `4xl` presa a `--radius`.
 * 17. Ponto de quebra do protótipo (801px) na variante `desk:`.
 * 18. `<ThemeScript nonce />` (de `theme-script.tsx`, sem `"use client"`) põe o script de tema no layout
 *     raiz; `THEME_BOOT_SCRIPT` e `THEME_STORAGE_KEY` vêm do mesmo módulo e chegam ao servidor como texto.
 * 19. Mais quatro tons de seção (`blue`, `teal`, `pink`, `amber`), para uma cor por item em menus maiores.
 * 20. A barra recolhida se desenha pela variante `tm-collapsed` (atributo `data-tm-sidebar` no <html>, posto
 *     pelo script de boot): nasce recolhida no HTML, sem piscar, mesmo em layout estático.
 * 21. `AppShell` aceita `session={null}` (sessão a caminho), `title` (título vindo do conteúdo, sem ícone),
 *     `headerActions` (ações do sistema à esquerda da busca) e `renderSearch` (busca própria do sistema).
 * 22. (Substituído na estética de 12 nov. 2026: principal 7:1, secundário 4,5:1.)
 * 24. Peças de painel (`dashboard.tsx`) e `NavigationItem.badge`, da estética de 12 nov. 2026.
 * 23. Azul como cor de ação (primária, foco, item ativo da barra, ícone padrão e gráficos); vermelho só
 *     para destrutivo/erro e identidade institucional.
 */
export { AppShell } from "./app-shell";
export { BarChart, type BarChartDatum } from "./bar-chart";
export { Button, buttonVariants, type ButtonProps } from "./button";
export { Card, CardGrid, MetricCard } from "./card";
export {
  InfoField,
  InfoPill,
  LinkCard,
  LinkCardMedia,
  MetricLine,
  PageGreeting,
  PanelCard,
  PanelGrid,
  SectionTitle,
  StatusBadge,
  Tag,
  type Accent,
} from "./dashboard";
export { DataTable, type DataTableColumn } from "./data-table";
export { ImageSlot } from "./image-slot";
export {
  DayStrip,
  GoalRow,
  InsetTile,
  MacroTile,
  MediaCard,
  ProgressBar,
  ProgressRing,
  RoundButton,
  StatCard,
  StatusPill,
  StatValue,
  WorkoutRow,
  type BarTone,
  type Day,
} from "./metas";
export { PageFrame } from "./page-frame";
export { TemaMppaProvider } from "./providers";
export { SectionIcon } from "./section-icon";
export { ThemeProvider, useTheme, type Theme } from "./theme-provider";
export { SIDEBAR_STORAGE_KEY, THEME_BOOT_SCRIPT, THEME_STORAGE_KEY, ThemeScript } from "./theme-script";
export { ThemeToggle } from "./theme-toggle";
export { canSeeAdministration, cn, currentNavigationItem, FOOTER_CREDIT, footerText, isNavigationActive } from "./utils";
export type {
  AppShellProps,
  BrandConfig,
  CurrentNavigation,
  HeaderConfig,
  ImageAsset,
  NavigationItem,
  NavigationSection,
  NavigationTone,
  SearchControls,
  SearchItem,
  ShellConfig,
  ShellSession,
} from "./types";
