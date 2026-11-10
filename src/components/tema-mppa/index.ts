/**
 * Camada visual comum do ecossistema, modelo `tema-mppa-next` 1.4.0 (2026-11-10).
 * Copie esta pasta e `styles/tema-mppa.css` sem editar; o que é de cada sistema entra por
 * configuração e propriedades. A referência visual é o protótipo aprovado ("Template Visual HubIA
 * v1.0"): `docs/prototipo/index.html` no modelo, `docs/tema-mppa/prototipo/index.html` no consumidor.
 *
 * Mudanças em relação ao zip 1.0.0 (detalhes no CHANGELOG):
 * 1. Tokens iguais ao protótipo: raio 8px (abas internas e ícones a 6px, avatar redondo), sombra
 *    `--shadow` em cartão, aba ativa e item ativo, fundos, borda e realce do ativo (`highlight`).
 * 2. Contraste: no claro, texto com 7:1 e secundário igual ao principal; no escuro, 4,5:1 e texto
 *    escuro sobre a primária. Tokens de status (`success`, `warning`).
 * 3. Componentes iguais ao protótipo e primitivos de página exportados: `PageFrame`, `Card`,
 *    `CardGrid`, `MetricCard`, `DataTable`, `BarChart`, `Button`, `SectionIcon`.
 * 4. Título só no cabeçalho, uma vez: `PageFrame` não aceita mais `title`, `icon` e `tone`.
 * 5. Rodapé padrão dos sistemas (`footerText`), sem substituição: a propriedade `footer` saiu na 1.4.0.
 * 6. O topo da barra lateral, o cabeçalho e o rodapé da barra têm a mesma altura (56px).
 * 7. `NavigationItem` ganha `description` (mostrada e filtrada pela busca), `matches` (rotas que
 *    marcam o item) e `hidden` (fora do menu e da busca, mas dá o título e a aba). Um só item fica
 *    marcado: o de rota mais longa, o mesmo do título e da aba aberta (`currentNavigationItem`).
 * 8. `tone` aceita `"red" | "green" | "violet" | "orange"`; classes soltas continuam aceitas.
 * 9. Sobreposição em `bg-overlay` e fundo das logos em `bg-logo-surface`, por token.
 * 10. A barra recolhida fica no `localStorage`; sem armazenamento, só na memória da página.
 * 11. `Esc` fecha o menu móvel; o menu móvel abre sempre expandido, mesmo com a barra recolhida.
 * 12. Abas só com `is_admin === true` e algum item administrativo visível; a busca segue a regra.
 * 13. Abaixo de 640px, as logos do cabeçalho aparecem no menu móvel, abaixo da marca.
 * 14. `--font-mono` sem Geist; o `<kbd>` da busca usa `font-sans`.
 * 15. `ImageSlot` compila com `strict` sem asserção não nula.
 * 16. Escala de raio `xs` a `4xl` presa a `--radius`.
 * 17. Ponto de quebra do protótipo (801px) na variante `desk:`.
 */
export { AppShell } from "./app-shell";
export { BarChart, type BarChartDatum } from "./bar-chart";
export { Button, buttonVariants, type ButtonProps } from "./button";
export { Card, CardGrid, MetricCard } from "./card";
export { DataTable, type DataTableColumn } from "./data-table";
export { ImageSlot } from "./image-slot";
export { PageFrame } from "./page-frame";
export { TemaMppaProvider } from "./providers";
export { SectionIcon } from "./section-icon";
export { SIDEBAR_STORAGE_KEY } from "./sidebar-context";
export { THEME_BOOT_SCRIPT, THEME_STORAGE_KEY, ThemeProvider, useTheme, type Theme } from "./theme-provider";
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
  SearchItem,
  ShellConfig,
  ShellSession,
} from "./types";
