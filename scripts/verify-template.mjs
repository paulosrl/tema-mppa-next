#!/usr/bin/env node

import { execFileSync, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { appendFile, mkdir, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const read = (relative) => readFile(path.join(root, relative), "utf8");
const packageJson = JSON.parse(await read("package.json"));
const components = JSON.parse(await read("components.json"));

// Versões exatas da matriz do ecossistema.
const expected = {
  next: "16.3.5",
  react: "19.2.3",
  "react-dom": "19.2.3",
  "@base-ui/react": "1.9.0",
  "@tanstack/react-query": "5.102.8",
  "lucide-react": "1.46.0",
  "tailwind-merge": "3.6.0",
  "class-variance-authority": "0.7.1",
  clsx: "2.1.1",
  typescript: "5.9.3",
  tailwindcss: "4.3.3",
};

for (const [name, version] of Object.entries(expected)) {
  const actual = packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name];
  if (actual !== version) errors.push(`${name}: esperado ${version}, encontrado ${actual ?? "ausente"}`);
}

const lock = JSON.parse(await read("package-lock.json"));
if (lock.version !== packageJson.version || lock.packages?.[""]?.version !== packageJson.version) {
  errors.push(`package-lock.json na versão ${lock.version}; package.json na ${packageJson.version} (rode npm install --package-lock-only)`);
}

const changelog = await read("CHANGELOG.md");
if (!changelog.includes(`## ${packageJson.version} `)) errors.push(`CHANGELOG sem a versão ${packageJson.version}`);

if (components.style !== "base-nova") errors.push("components.json deve usar style=base-nova");
if (components.iconLibrary !== "lucide") errors.push("components.json deve usar Lucide");
if (Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies }).some((name) => name.startsWith("@radix-ui/"))) {
  errors.push("dependência @radix-ui/* não é permitida");
}

const utils = await read("src/components/tema-mppa/utils.ts");
if (!utils.includes("session.is_admin === true")) errors.push("utils não usa a verificação estrita session.is_admin === true");

const sidebar = await read("src/components/tema-mppa/app-sidebar.tsx");
if (!sidebar.includes("@base-ui/react/tabs")) errors.push("abas não usam Base UI");
if (!sidebar.includes("canSeeAdministration(")) errors.push("barra lateral não usa canSeeAdministration");
if (!sidebar.includes("router.push(first.href)") || !/onClick=\{\(\) => openTab\("platform"\)\}/.test(sidebar) || !/onClick=\{\(\) => openTab\("administration"\)\}/.test(sidebar)) {
  errors.push("clicar numa aba deve abrir a página do primeiro item visível dela (openTab)");
}

const palette = await read("src/components/tema-mppa/command-palette.tsx");
// A busca monta os itens por shellSearchItems (utils.ts), que segue a regra das abas; o caso de administrador é executado abaixo.
if (!palette.includes("shellSearchItems(") || !/export function shellSearchItems[\s\S]*?canSeeAdministration\(config, session\)/.test(await read("src/components/tema-mppa/utils.ts"))) errors.push("busca não segue a regra das abas (shellSearchItems com canSeeAdministration)");

const imageSlot = await read("src/components/tema-mppa/image-slot.tsx");
if (!imageSlot.includes("if (!src || failedSrc === src) return null")) errors.push("ImageSlot não elimina imagem ausente/com falha");
if (/asset!/.test(imageSlot)) errors.push("ImageSlot usa asserção não nula");

const shell = await read("src/components/tema-mppa/app-shell.tsx");
if (/fetch\(|\/api\//.test(shell)) errors.push("AppShell não pode chamar API");
// Rodapé padrão dos sistemas: estrutura no AppShell, sem substituição, e texto montado de brand.
if (!shell.includes("footerText(config.brand)")) errors.push("rodapé: AppShell deve montar o texto com footerText(config.brand)");
for (const cls of ["desk:sticky", "desk:bottom-0", "min-h-(--shell-bar)", "border-t", "border-sidebar-border"]) {
  if (!shell.includes(cls)) errors.push(`rodapé: falta ${cls} (fixo no pé da tela, na faixa do "Recolher")`);
}
if (/line-clamp|truncate|text-ellipsis/.test(shell)) errors.push("rodapé: o texto institucional não pode ser cortado");
// Qualquer identificador footer no componente (fora da tag <footer>) ou na declaração de AppShellProps.
// Lido pela árvore do TypeScript: comentários e textos não contam, e tipos aninhados não escondem nada.
const parse = (file, source) => ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
function hasFooter(node) {
  if (ts.isIdentifier(node) && node.text === "footer") {
    const parent = node.parent;
    const isTag = (ts.isJsxOpeningElement(parent) || ts.isJsxClosingElement(parent) || ts.isJsxSelfClosingElement(parent)) && parent.tagName === node;
    if (!isTag) return true;
  }
  return ts.forEachChild(node, hasFooter) ?? false;
}
const typesSource = await read("src/components/tema-mppa/types.ts");
let shellProps;
parse("types.ts", typesSource).forEachChild((node) => {
  if ((ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) && node.name.text === "AppShellProps") shellProps = node;
});
if (!shellProps) errors.push("types.ts: AppShellProps não encontrado");
if (hasFooter(parse("app-shell.tsx", shell)) || (shellProps && hasFooter(shellProps))) {
  errors.push("rodapé: a propriedade footer não pode existir (o texto padrão não tem substituição)");
}
// Faixas alinhadas por um único token de altura, definido no CSS.
const themeCss = await read("src/styles/tema-mppa.css");
if (!/:root\s*\{[^}]*--shell-bar:\s*3\.875rem;/.test(themeCss)) errors.push("tema-mppa.css: falta --shell-bar: 3.875rem em :root (altura das faixas)");
// Tema único (2.0.0): sem variantes, sem `data-tema`, sem seletor de variante no CSS, no layout ou nos providers.
if (/data-tema|--tema-variante|--font-tema|--card-radius|--card-top-width/.test(themeCss)) errors.push("tema-mppa.css: o tema é único, sem data-tema, --tema-variante, --font-tema, --card-radius nem --card-top-width");
if (/--font-outfit|Outfit/.test(themeCss)) errors.push("tema-mppa.css: a fonte é só a Inter (--font-inter)");
if (!/--font-sans:\s*var\(--font-inter\)/.test(themeCss) || !/--radius-card:\s*1\.5rem;/.test(themeCss)) errors.push("tema-mppa.css: --font-sans deve ser var(--font-inter) e --radius-card deve ser 1.5rem (quadros de 24px)");
const rootLayout = await read("src/app/layout.tsx");
if (/data-tema|NEXT_PUBLIC_TEMA|Outfit|TemaVariant/.test(rootLayout) || !/Inter\(\{ variable: "--font-inter"/.test(rootLayout) || !/className=\{inter\.variable\}/.test(rootLayout)) {
  errors.push("layout.tsx: o layout raiz usa só a Inter (--font-inter) no <html>, sem variante nem data-tema");
}
for (const file of ["src/components/tema-mppa/index.ts", "src/components/tema-mppa/providers.tsx", "src/components/tema-mppa/types.ts"]) {
  if (/useTemaVariante|TemaVariant|TemaVarianteContext/.test(await read(file))) errors.push(`${file}: a variante do tema não existe mais (useTemaVariante, TemaVariant)`);
}
if (existsSync(path.join(root, "src/components/tema-mppa/tema-variante.tsx"))) errors.push("tema-variante.tsx não deve existir: o tema é único");
if (existsSync(path.join(root, "docs/preview-v2"))) errors.push("docs/preview-v2 não deve existir: há uma só prévia (docs/preview)");
for (const [file, count] of [["app-header.tsx", 1], ["app-sidebar.tsx", 2]]) {
  const source = await read(`src/components/tema-mppa/${file}`);
  if ((source.match(/(?<![\w-])h-\(--shell-bar\)/g) ?? []).length < count) errors.push(`${file}: faixas devem usar h-(--shell-bar)`);
  if (/\bh-14\b/.test(source)) errors.push(`${file}: altura fixa h-14; use h-(--shell-bar)`);
}
// footerText executado de verdade: transpilado pelo TypeScript do projeto (funciona em qualquer Node 22)
// e gravado dentro de node_modules para resolver clsx e tailwind-merge.
try {
  const { outputText } = ts.transpileModule(await read("src/components/tema-mppa/utils.ts"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  const cacheDir = path.join(root, "node_modules/.cache/verify-template");
  await mkdir(cacheDir, { recursive: true });
  const compiled = path.join(cacheDir, "utils.mjs");
  await writeFile(compiled, outputText);
  const { footerText } = await import(`${pathToFileURL(compiled).href}?t=${Date.now()}`);
  const credit = "Desenvolvido pelo Ministério Público do Estado do Pará - Escritório de Inteligência Artificial";
  const cases = [
    [{ name: "Heimdall", version: "2.0.0", versionYears: "2026" }, `${credit} - Heimdall - V 2.0.0 - 2026`],
    [{ name: "Heimdall", version: "v2.0.0", versionYears: "2025-2026" }, `${credit} - Heimdall - V 2.0.0 - 2025-2026`],
    [{ name: "X", version: "vNext-1", versionYears: " " }, `${credit} - X - V vNext-1`],
    [{ name: "X", version: "", versionYears: null }, `${credit} - X`],
    [{ name: undefined, version: "1.0.0", versionYears: "2026" }, `${credit} - V 1.0.0 - 2026`],
  ];
  for (const [brand, expected] of cases) {
    const actual = footerText({ homeHref: "/", ...brand });
    if (actual !== expected) errors.push(`rodapé: footerText(${JSON.stringify(brand)}) = "${actual}", esperado "${expected}"`);
  }
} catch (error) {
  errors.push(`rodapé: footerText não pôde ser executado: ${error.message}`);
}
// Grupo "Apoio" executado de verdade (2.2.1): itens, item marcado, repetidos e configuração sem `support`.
try {
  const utils = await import(`${pathToFileURL(path.join(root, "node_modules/.cache/verify-template/utils.mjs")).href}?t=${Date.now()}`);
  const fail = (message) => errors.push(`grupo "Apoio": ${message}`);
  const home = { id: "inicio", label: "Início", href: "/" };
  const base = { brand: { name: "X", homeHref: "/" }, platformNavigation: [home], support: { manualHref: "/manual", tutorialHref: "/tutorial" } };
  const labels = utils.supportNavigation(base).map((item) => `${item.label} ${item.href}`).join(", ");
  if (labels !== "Manual /manual, Tutorial /tutorial") fail(`supportNavigation deu "${labels}", esperado "Manual /manual, Tutorial /tutorial"`);
  for (const [pathname, id] of [["/manual", "tm-apoio-manual"], ["/tutorial/passo-1", "tm-apoio-tutorial"], ["/", "inicio"]]) {
    const current = utils.currentNavigationItem(pathname, base, null);
    if (current?.item.id !== id || current?.section !== "platform") fail(`em ${pathname}, o item marcado deveria ser ${id} (platform), e foi ${current?.item.id ?? "nenhum"} (${current?.section ?? "-"})`);
  }
  const repeated = { ...base, platformNavigation: [home, { id: "meu-manual", label: "Manual", href: "/manual" }], searchItems: [{ id: "busca-manual", label: "Manual", href: "/manual" }] };
  if (utils.shellNavigation(repeated).platform.some((item) => item.href === "/manual")) fail("item do sistema com o endereço do manual deveria sair do menu");
  if (utils.currentNavigationItem("/manual", repeated, null)?.item.id !== "tm-apoio-manual") fail("com item repetido, o marcado em /manual deveria ser o do grupo");
  const manualHits = utils.shellSearchItems(repeated, null).filter((item) => item.href === "/manual").length;
  if (manualHits !== 1) fail(`a busca deveria ter 1 item com /manual, e teve ${manualHits}`);
  const withoutSupport = { brand: base.brand, platformNavigation: [home] };
  if (utils.supportNavigation(withoutSupport).length !== 0 || utils.currentNavigationItem("/", withoutSupport, null)?.item.id !== "inicio") fail("sem support, o grupo deveria sumir e a casca seguir");
  const admin = { ...base, administrationNavigation: [{ id: "usuarios", label: "Usuários", href: "/admin/usuarios" }] };
  const adminHits = (session) => utils.shellSearchItems(admin, session).filter((item) => item.href === "/admin/usuarios").length;
  if (adminHits({ email: "a@b", is_admin: true }) !== 1 || adminHits({ email: "a@b", is_admin: false }) !== 0 || adminHits(null) !== 0) fail("a busca deveria mostrar itens administrativos só com is_admin === true");
  const onlyManual = { ...base, support: { manualHref: "/manual", tutorialHref: "" } };
  if (utils.supportNavigation(onlyManual).map((item) => item.label).join() !== "Manual") fail("com tutorialHref vazio, só o Manual deveria aparecer");
} catch (error) {
  errors.push(`grupo "Apoio": as funções não puderam ser executadas: ${error.message}`);
}

// A prévia recolhe a barra pelo atributo do <html>, como a camada (variante tm-collapsed).
if (!(await read("docs/preview/index.html")).includes('root.setAttribute("data-tm-sidebar", state.collapsed ? "collapsed" : "expanded")')) {
  errors.push("docs/preview/index.html: o Recolher não marca data-tm-sidebar no <html> (regere a prévia)");
}
// A prévia entregue mostra a versão do pacote.
const preview = await read("docs/preview/index.html");
if (!preview.includes(`<title>Template Visual MPPA v${packageJson.version}</title>`)) {
  errors.push(`docs/preview/index.html: título fora da versão ${packageJson.version} (regere a prévia)`);
}
// Manual e Tutorial (grupo "Apoio") são páginas da prévia, e as logos da barra não são desviadas para dentro dela.
for (const route of ["/manual", "/tutorial"]) {
  if (!preview.includes(`"${route}":"`)) errors.push(`docs/preview/index.html: sem a página ${route} do grupo "Apoio" (regere a prévia)`);
}
if (!preview.includes(`target.matches('aside a[href^="/"]')`)) errors.push("docs/preview/index.html: só os links internos da barra navegam dentro da prévia (regere a prévia)");
if (!preview.includes('go(target.getAttribute("href"))') || preview.includes("go(new URL(target.href).pathname)")) errors.push('docs/preview/index.html: a navegação usa o href escrito (getAttribute("href")), que funciona aberto de uma unidade do Windows (regere a prévia)');

// A prévia é uma só: na versão do pacote, sem aviso nem seletor de variante.
if (!preview.includes('root.setAttribute("data-tm-sidebar", state.collapsed ? "collapsed" : "expanded")')) errors.push("docs/preview/index.html: o Recolher não marca data-tm-sidebar no <html> (regere a prévia)");
if (/data-tema|data-preview-variante/.test(preview)) errors.push("docs/preview/index.html: a prévia não tem variante (regere a prévia)");
// Foco ao fechar: o menu móvel e a busca devolvem o foco ao botão que os abriu (REPLICAR.md, 4.8).
{
  const sidebarContext = await read("src/components/tema-mppa/sidebar-context.tsx");
  const palette = await read("src/components/tema-mppa/command-palette.tsx");
  if (!sidebarContext.includes("export function useRestoreFocus") || !/useRestoreFocus\(mobileOpen/.test(sidebarContext)) errors.push("sidebar-context.tsx: o menu móvel não devolve o foco ao botão que o abriu (useRestoreFocus)");
  if (!/useRestoreFocus\(open/.test(palette)) errors.push("command-palette.tsx: a busca não devolve o foco ao botão que a abriu (useRestoreFocus)");
}
// O copy-template avisa de pasta do modelo sobrando perto do consumidor.
if (!(await read("scripts/copy-template.mjs")).includes("staleFolders")) errors.push("copy-template.mjs: falta o aviso de pasta do modelo sobrando (staleFolders)");
// GUIA, REPLICAR e DIAGNOSTICO não conhecem variante: o tema é único.
{
  const guia = await read("GUIA.html");
  if (guia.includes('name="variante"') || guia.includes("{{VARIANTE}}") || guia.includes('name="troca"')) errors.push("GUIA.html: não há variante nem troca de variante (o tema é único)");
  const replicarDoc = await read("REPLICAR.md");
  if (/data-tema|\bTemaVariant\b|NEXT_PUBLIC_TEMA|### 8\.1 Variante/.test(replicarDoc)) errors.push("REPLICAR.md: não há variante (data-tema, TemaVariant, NEXT_PUBLIC_TEMA, seção 8.1 Variante)");
  if ((await read("DIAGNOSTICO.md")).includes("**Variante do tema:**")) errors.push("DIAGNOSTICO.md: não há variante do tema");
}

const header = await read("src/components/tema-mppa/app-header.tsx");
const identity = await read("src/components/tema-mppa/user-identity.tsx");
if (!header.includes("<UserIdentity") || !header.includes("bg-logo-surface")) errors.push("cabeçalho sem identidade ou logos");
if (!identity.includes("onSignOut ?") || !identity.includes("xl:flex")) errors.push("cabeçalho padrão: nome/perfil (xl) e botão de sair visíveis");
if (/popover/i.test(identity)) errors.push("cabeçalho padrão não usa painel no avatar");
// Cabeçalho que não aperta o título (1.12.0): logos no cabeçalho a partir de 1024px ou com a barra recolhida
// (desde 801px); fora disso, sob a marca. Título com no mínimo 128px; a seção só com 288px no bloco.
{
  const sidebar = await read("src/components/tema-mppa/app-sidebar.tsx");
  const breadcrumbs = await read("src/components/tema-mppa/breadcrumbs.tsx");
  if (!header.includes('"hidden items-center gap-2 lg:flex desk:tm-collapsed:flex"')) errors.push("cabeçalho: logos só a partir de 1024px (lg:flex) ou com a barra recolhida (desk:tm-collapsed:flex)");
  if (/\bsm:(flex|block)\b/.test(header.slice(header.indexOf("logos.length ?"), header.indexOf(") : null}", header.indexOf("logos.length ?"))))) errors.push("cabeçalho: logos e divisória não podem voltar a aparecer a partir de 640px (sm:)");
  if (!sidebar.includes("lg:hidden desk:tm-collapsed:hidden")) errors.push("barra lateral: logos sob a marca até 1023px com a barra aberta (lg:hidden desk:tm-collapsed:hidden)");
  for (const [file, source] of [["app-header.tsx", header], ["app-sidebar.tsx", sidebar]]) {
    if (!source.includes("key={`${index}-${logo.src}`}")) errors.push(`${file}: chave das logos com o índice (duas logos podem repetir src ou alt)`);
  }
  if (!breadcrumbs.includes("@container flex min-w-32 flex-1") || !breadcrumbs.includes("@[18rem]:flex")) errors.push("título: bloco com @container, min-w-32 e flex-1; seção só com @[18rem]");
}
// Logos padrão (REPLICAR 4.5): os três arquivos, a sigla com o desenho combinado e alt vazio na demonstração.
{
  const sigla = await read("public/ciia-sigla.svg");
  for (const needle of ['width="132" height="76"', 'fill="#fff"', 'fill="#1a237e"', 'font-family="Arial"', 'font-size="46"', 'font-weight="700"', 'y="55"', 'text-anchor="middle"', ">CIIA<"]) {
    if (!sigla.includes(needle)) errors.push(`public/ciia-sigla.svg sem ${needle}`);
  }
  const demo = await read("src/app/demo-config.tsx");
  const logoLines = [
    '{ src: "/mppa-logo.png", alt: "MPPA", width: 132, height: 76, href: "https://www.mppa.mp.br/" }',
    '{ src: "/ciia.png", alt: "CIIA", width: 244, height: 244, href: "https://ciia.mppa.mp.br/" }',
    '{ src: "/ciia-sigla.svg", alt: "", width: 132, height: 76, href: "https://ciia.mppa.mp.br/" }',
  ];
  const at = logoLines.map((line) => demo.indexOf(line));
  if (at.some((index) => index < 0) || at[0] > at[1] || at[1] > at[2]) errors.push("demonstração: header.logos deve ter MPPA, CIIA e a sigla (alt vazio), nesta ordem, com os sites do MPPA e do CIIA");
  // Logos com link (2.3.0): nova aba sem acesso à janela de origem; a decorativa fora da tabulação e do leitor de
  // tela; nenhum link vazio quando a imagem falha; cabeçalho e barra lateral usam a mesma peça.
  const slot = await read("src/components/tema-mppa/image-slot.tsx");
  for (const needle of ["export function LogoSlot", 'target="_blank"', 'rel="noopener noreferrer"', "tabIndex={decorativa ? -1 : undefined}", "aria-hidden={decorativa ? true : undefined}", "if (!src || failedSrc === src) return null;", "(abre em nova aba)", "focus-visible:ring-2"]) {
    if (!slot.includes(needle)) errors.push(`image-slot.tsx: LogoSlot sem ${needle}`);
  }
  for (const [file, source] of [["app-header.tsx", header], ["app-sidebar.tsx", await read("src/components/tema-mppa/app-sidebar.tsx")]]) {
    if (!source.includes("<LogoSlot key={`${index}-${logo.src}`} logo={logo}")) errors.push(`${file}: logos pelo LogoSlot (link opcional)`);
  }
}

const pageFrame = await read("src/components/tema-mppa/page-frame.tsx");
if (/<h1/.test(pageFrame)) errors.push("PageFrame não pode repetir o título (ele fica só no cabeçalho)");

const index = await read("src/components/tema-mppa/index.ts");
for (const name of ["PageFrame", "Card", "MetricCard", "DataTable", "Button", "BarChart"]) {
  if (!new RegExp(`\\b${name}\\b`).test(index)) errors.push(`index.ts não exporta ${name}`);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    else files.push(absolute);
  }
  return files;
}

const files = await walk(path.join(root, "src/components/tema-mppa"));
for (const file of files) {
  const name = path.basename(file);
  if (name.includes(":Zone.Identifier")) errors.push(`arquivo residual do Windows: ${file}`);
  if (!/\.(tsx?|css)$/.test(name)) continue;
  const source = await readFile(file, "utf8");
  const relative = path.relative(root, file);
  if (/#[0-9a-fA-F]{3,8}\b|rgba?\(|oklch\(|\b(bg|text|border)-(black|white)\b|\b(bg|text|border)-(red|zinc|emerald|amber|violet|sky)-\d/.test(source)) {
    errors.push(`${relative}: cor fixa; use os tokens de src/styles/tema-mppa.css`);
  }
  if (/rounded-none/.test(source)) errors.push(`${relative}: canto reto (rounded-none) contraria o protótipo`);
}

// Tokens e contraste, lidos do próprio CSS.
const css = await read("src/styles/tema-mppa.css");
if (/geist/i.test(css) || /geist/i.test(await read("src/app/layout.tsx"))) errors.push("--font-mono/layout ainda usam Geist");

function block(selector) {
  const start = css.indexOf(`${selector} {`);
  const end = css.indexOf("\n}", start);
  const tokens = {};
  for (const match of css.slice(start, end).matchAll(/--([\w-]+):\s*([^;]+);/g)) tokens[match[1]] = match[2].trim();
  return tokens;
}
const light = block(":root");
const dark = { ...light, ...block(".dark") };

const prototype = {
  light: { radius: "0.5rem", "shell-bar": "3.875rem", background: "#e7e5e4", card: "#ffffff", sidebar: "#ffffff", muted: "#fafaf9", border: "#e7e5e4", highlight: "#bfdbfe", "muted-foreground": "#5f5a56" },
  dark: { background: "#0c0a09", card: "#1c1917", sidebar: "#12100f", muted: "#292524", border: "rgba(255, 255, 255, 0.08)", highlight: "#2547a8", "muted-foreground": "#a8a29e" },
};
for (const [theme, tokens] of [["claro", light], ["escuro", dark]]) {
  for (const [name, value] of Object.entries(theme === "claro" ? prototype.light : prototype.dark)) {
    if (tokens[name]?.toLowerCase() !== value) errors.push(`token --${name} (${theme}): esperado ${value}, encontrado ${tokens[name] ?? "ausente"}`);
  }
}
// Sombras em camadas (Moveflux): contorno de 1px e camadas a 6%; no escuro, com brilho interno.
if (!light.shadow?.startsWith("0 0 0 1px rgba(0, 0, 0, 0.06)")) errors.push("token --shadow (claro) diferente do modelo");
if (!light["card-shadow"]?.startsWith("0 0 0 1px rgba(0, 0, 0, 0.06)") || (light["card-shadow"].match(/rgba\(0, 0, 0, 0\.06\)/g) ?? []).length < 6) errors.push("token --card-shadow (claro): contorno de 1px e cinco camadas a 6%");
if (!dark.shadow?.includes("inset 0 1px 0") || !dark["card-shadow"]?.includes("inset 0 1px 0")) errors.push("sombras do escuro sem o brilho interno de 1px");
// Contorno dos quadros e largura da barra lateral (1.11.0).
if (light["card-border"]?.toLowerCase() !== "#e7e5e4") errors.push(`token --card-border (claro): esperado #e7e5e4, encontrado ${light["card-border"] ?? "ausente"}`);
if (dark["card-border"]?.toLowerCase() !== "#44403c") errors.push(`token --card-border (escuro): esperado #44403c, encontrado ${dark["card-border"] ?? "ausente"}`);
{
  const sidebarSource = await readFile(path.join(root, "src/components/tema-mppa/app-sidebar.tsx"), "utf8");
  if (!sidebarSource.includes("w-[304px]") || !sidebarSource.includes("desk:tm-collapsed:w-[76px]")) errors.push("barra lateral: largura deve ser 304px (76px recolhida)");
  for (const file of ["card.tsx", "dashboard.tsx", "data-table.tsx"]) {
    if (!(await readFile(path.join(root, "src/components/tema-mppa", file), "utf8")).includes("border-card-border")) errors.push(`${file}: quadros sem border-card-border`);
  }
}
for (const name of ["highlight-bar", "header", "canvas-glow", "institutional", "institutional-foreground", "card-shadow-hover", "tone-sheen"]) {
  if (!light[name] || !dark[name]) errors.push(`token --${name} ausente em um dos temas`);
}

function luminance(hex) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
function requireContrast(theme, tokens, foreground, background, minimum) {
  const fg = tokens[foreground];
  const bg = tokens[background];
  if (!/^#[0-9a-f]{6}$/i.test(fg ?? "") || !/^#[0-9a-f]{6}$/i.test(bg ?? "")) {
    errors.push(`contraste (${theme}): --${foreground}/--${background} precisam ser hex de 6 dígitos`);
    return;
  }
  const ratio = contrast(fg, bg);
  if (ratio < minimum) errors.push(`contraste (${theme}): --${foreground} sobre --${background} = ${ratio.toFixed(2)}:1, mínimo ${minimum}:1`);
}

const textOn = ["background", "card", "muted", "sidebar", "highlight", "popover"];
// Texto principal com 7:1 nos dois temas; secundário cinza com 4,5:1 (WCAG AA) em toda superfície neutra.
for (const surface of textOn) {
  if (surface === "highlight") continue; // no item selecionado só há o rótulo, em --highlight-foreground
  requireContrast("claro", light, "foreground", surface, 7);
  requireContrast("escuro", dark, "foreground", surface, 7);
  requireContrast("claro", light, "muted-foreground", surface, 4.5);
  requireContrast("escuro", dark, "muted-foreground", surface, 4.5);
}
requireContrast("claro", light, "highlight-foreground", "highlight", 7);
requireContrast("escuro", dark, "highlight-foreground", "highlight", 7);
requireContrast("claro", light, "sidebar-foreground", "sidebar", 7);
requireContrast("claro", light, "foreground", "sidebar-hover", 7);
requireContrast("escuro", dark, "foreground", "sidebar-hover", 7);
requireContrast("escuro", dark, "sidebar-foreground", "sidebar", 7);
for (const tone of ["red", "green", "violet", "orange", "blue", "teal", "pink", "amber"]) {
  requireContrast("claro", light, `tone-${tone}-foreground`, `tone-${tone}`, 4.5);
  requireContrast("escuro", dark, `tone-${tone}-foreground`, `tone-${tone}`, 4.5);
}
for (const pair of ["primary", "destructive", "success", "warning"]) {
  requireContrast("claro", light, `${pair}-foreground`, pair, 7);
  requireContrast("escuro", dark, `${pair}-foreground`, pair, 4.5);
}
for (const surface of ["background", "card"]) {
  requireContrast("claro", light, "primary", surface, 7);
  requireContrast("escuro", dark, "primary", surface, 4.5);
}
if (luminance(dark["primary-foreground"]) > luminance(dark.primary)) errors.push("escuro: o texto sobre a primária deve ser escuro");
requireContrast("claro", light, "tone-red-foreground", "tone-red", 7);
// Peças de metas e forma do tema: os mesmos contrastes, sobre os tokens do tema único.
{
  for (const [theme, tokens, accent] of [["claro", light, 7], ["escuro", dark, 4.5]]) {
    for (const surface of ["background", "card", "muted", "sidebar", "popover"]) {
      requireContrast(theme, tokens, "foreground", surface, 7);
      requireContrast(theme, tokens, "muted-foreground", surface, 4.5);
    }
    requireContrast(theme, tokens, "highlight-bar", "highlight", 3);
    requireContrast(theme, tokens, "primary-foreground", "primary", accent);
    requireContrast(theme, tokens, "avatar-foreground", "avatar-from", 4.5);
    requireContrast(theme, tokens, "avatar-foreground", "avatar-to", 4.5);
    // Contraste do texto de status sobre a superfície neutra mais clara/escura em que ele aparece.
    for (const status of ["success", "warning"]) requireContrast(theme, tokens, status, "muted", 7);
  }
  // Peças de metas: tokens nos dois temas e texto legível sobre a trilha da barra e sobre a capa.
  for (const name of ["bar-track", "media", "media-foreground", "media-muted", "media-shadow", "bar-amber-from", "bar-amber-to", "bar-rose-from", "bar-rose-to", "bar-blue-from", "bar-blue-to", "bar-emerald-from", "bar-emerald-to", "bar-violet-from", "bar-violet-to", "bar-yellow-from", "bar-yellow-to"]) {
    if (!light[name] || !dark[name]) errors.push(`token --${name} (peças de metas) ausente em um dos temas`);
  }
  for (const [theme, tokens] of [["claro", light], ["escuro", dark]]) {
    requireContrast(theme, tokens, "foreground", "bar-track", 7);
    requireContrast(theme, tokens, "media-foreground", "media", 7);
    requireContrast(theme, tokens, "media-muted", "media", 7);
  }
  const metasSource = await read("src/components/tema-mppa/metas.tsx");
  for (const name of ["MediaCard", "RoundButton", "StatCard", "StatValue", "ProgressBar", "ProgressRing", "GoalRow", "WorkoutRow", "DayStrip", "InsetTile", "MacroTile", "StatusPill"]) {
    if (!new RegExp(`export function ${name}\\b`).test(metasSource)) errors.push(`metas.tsx não exporta ${name}`);
    if (!new RegExp(`\\b${name}\\b`).test(await read("src/components/tema-mppa/index.ts"))) errors.push(`index.ts não exporta ${name}`);
  }
  if (/#[0-9a-f]{3,8}\b/i.test(metasSource)) errors.push("metas.tsx: cor fixa; use os tokens");
  if (/color-mix\(/.test(metasSource)) errors.push("metas.tsx: color-mix na classe (consumidores recusam); use o modificador de opacidade, como bg-(--meter)/22");
  // Classes tm-* que dão a forma do tema: cada uma usada nas peças tem a regra no CSS.
  const shapeSources = (await read("src/components/tema-mppa/card.tsx")) + (await read("src/components/tema-mppa/dashboard.tsx")) + (await read("src/components/tema-mppa/data-table.tsx"));
  for (const name of ["tm-tone", "tm-tile", "tm-panel-head", "tm-card-title", "tm-metric-label", "tm-label", "tm-section-title", "tm-section-dot", "tm-tag", "tm-status"]) {
    if (name !== "tm-tone" && !shapeSources.includes(name)) errors.push(`as peças não usam ${name}, que o CSS define`);
    if (!new RegExp(`^\\.${name} \\{`, "m").test(themeCss)) errors.push(`tema-mppa.css: falta a regra de .${name}`);
  }
  if (!/@utility tm-card-top \{\s*border-top-width: 1px;\s*border-top-color: var\(--card-border\) !important;/.test(themeCss)) errors.push("tema-mppa.css: o topo dos quadros deve ser um fio de 1px na cor do contorno (tm-card-top)");
  // Demonstração: a página das peças de metas.
  const demoConsumerSource = await read("src/app/demo-consumer.tsx");
  if (!demoConsumerSource.includes('pathname === "/metas"') || !(await read("src/app/demo-config.tsx")).includes('href: "/metas"')) errors.push('demonstração: falta a página "/metas" (Painel de metas) e o item de menu dela');
  // Quadros em destaque (2.4.0, vindos da change 81 do Xavier): fundo, abertura, quadro com botões e retângulo.
  const featuredSource = await read("src/components/tema-mppa/featured.tsx");
  const indexSource = await read("src/components/tema-mppa/index.ts");
  for (const name of ["CardBackdrop", "OpeningCard", "FeaturedCard", "FeaturedNote"]) {
    if (!new RegExp(`export function ${name}\\b`).test(featuredSource)) errors.push(`featured.tsx não exporta ${name}`);
    if (!new RegExp(`\\b${name}\\b`).test(indexSource)) errors.push(`index.ts não exporta ${name}`);
  }
  if (!/\bOpeningShortcut\b/.test(indexSource)) errors.push("index.ts não exporta o tipo OpeningShortcut");
  if (/^"use client"/m.test(featuredSource)) errors.push('featured.tsx: sem "use client", para os ícones chegarem de componentes de servidor');
  if (/#[0-9a-f]{3,8}\b/i.test(featuredSource)) errors.push("featured.tsx: cor fixa; use os tokens");
  if (/color-mix\(/.test(featuredSource)) errors.push("featured.tsx: color-mix na classe (consumidores recusam); use o modificador de opacidade");
  if (/\bdark:/.test(featuredSource)) errors.push("featured.tsx: variante dark: (o consumidor pode não ter); o escuro vai nos utilitários tm-* do CSS");
  if (!featuredSource.includes("tm-card-backdrop") || !/@utility tm-card-backdrop \{[\s\S]*?:where\(\.dark\) &/.test(themeCss)) errors.push("tema-mppa.css: o fundo do quadro (tm-card-backdrop) precisa da regra do claro e do escuro");
  if (!(await read("src/components/tema-mppa/image-slot.tsx")).includes("tm-watermark") || !/@utility tm-watermark \{[\s\S]*?:where\(\.dark\) &/.test(themeCss)) errors.push("tema-mppa.css: a marca d'água (tm-watermark) precisa da regra do claro e do escuro");
  for (const [theme, tokens] of [["claro", light], ["escuro", dark]]) {
    requireContrast(theme, tokens, "foreground", "tone-blue", 7);
    requireContrast(theme, tokens, "tone-blue-foreground", "card", 4.5);
  }
  for (const route of ["/perfil", "/sessoes", "/administracao/usuarios"]) {
    if (!demoConsumerSource.includes(`pathname === "${route}"`)) errors.push(`demonstração: falta a tela dos quadros em destaque em "${route}"`);
  }
  for (const name of ["OpeningCard", "FeaturedCard", "FeaturedNote"]) {
    if (!new RegExp(`<${name}\\b`).test(demoConsumerSource)) errors.push(`demonstração: não usa ${name}`);
  }
  // Todo item visível do menu tem a sua página de exemplo (23 nov. 2026): nenhum cai na página genérica de dados.
  {
    const demoConfigSource = await read("src/app/demo-config.tsx");
    for (const [, line, href] of demoConfigSource.matchAll(/^(.*\bhref: "(\/[^"]*)".*)$/gm)) {
      if (/hidden: true/.test(line)) continue;
      if (!demoConsumerSource.includes(`pathname === "${href}"`)) errors.push(`demonstração: o item de menu ${href} não tem página de exemplo própria`);
    }
    for (const href of ["/manual", "/tutorial"]) {
      if (!demoConsumerSource.includes(`pathname === "${href}"`)) errors.push(`demonstração: ${href} (grupo "Apoio") sem página`);
    }
  }
  // O quadro de abertura só no primeiro item de cada aba (23 nov. 2026): com a saudação em "Meus acessos" (DemoDashboard)
  // e sem ela em "Usuários & Papéis" (DemoUsuarios). Saudação em nenhuma outra tela.
  const demoBody = (name) => demoConsumerSource.slice(demoConsumerSource.indexOf(`function ${name}(`), demoConsumerSource.indexOf("\nfunction ", demoConsumerSource.indexOf(`function ${name}(`) + 1));
  if ((demoConsumerSource.match(/<OpeningCard\b/g) ?? []).length !== 2) errors.push("demonstração: o quadro de abertura aparece só em Meus acessos e em Usuários & Papéis");
  if ((demoConsumerSource.match(/\bgreeting=/g) ?? []).length !== 1 || !/\bgreeting=/.test(demoBody("DemoDashboard"))) errors.push('demonstração: a saudação ("Olá, ...") só em Meus acessos');
  if (!/<OpeningCard\b/.test(demoBody("DemoUsuarios"))) errors.push("demonstração: o quadro de abertura da Administração fica em Usuários & Papéis, o primeiro item");
  if ((demoConsumerSource.match(/Conteúdo em elaboração/g) ?? []).length !== 1 || !/Conteúdo em elaboração/.test(demoBody("DemoApoio"))) errors.push('demonstração: Manual e Tutorial dizem "Conteúdo em elaboração"');
  // Grupo "Apoio" (17 nov. 2026, 2.2.0): da camada, em "Minha Página" de todos os sistemas; o sistema só dá os endereços.
  const utilsSource = await read("src/components/tema-mppa/utils.ts");
  const sidebarSource = await read("src/components/tema-mppa/app-sidebar.tsx");
  if (!/^export const SUPPORT_LABEL = "Apoio";/m.test(utilsSource)) errors.push('utils.ts: o rótulo do grupo deve ser "Apoio"');
  if (!/activeTab === "platform" \? <SupportGroup/.test(sidebarSource)) errors.push('app-sidebar.tsx: o grupo "Apoio" deve aparecer em "Minha Página" (aba de plataforma)');
  const fallbackBody = sidebarSource.slice(sidebarSource.indexOf("function SidebarBodyFallback"), sidebarSource.indexOf("export function AppSidebar"));
  if (!fallbackBody.includes("<SupportGroup")) errors.push('app-sidebar.tsx: o SidebarBodyFallback (rota ainda a caminho) deve mostrar o grupo "Apoio"');
  for (const [file, source] of [["app-sidebar.tsx", sidebarSource], ["command-palette.tsx", await read("src/components/tema-mppa/command-palette.tsx")]]) {
    if (/config\.platformNavigation/.test(source)) errors.push(`${file}: leia os itens de "Minha Página" por shellNavigation(config).platform, que tira os repetidos do grupo "Apoio"`);
  }
  if (!/^\s*support: SupportConfig;/m.test(await read("src/components/tema-mppa/types.ts"))) errors.push("types.ts: ShellConfig.support deve ser obrigatório");
  if (!demoConsumerSource.includes('pathname === "/manual"') || !demoConsumerSource.includes('pathname === "/tutorial"')) errors.push('demonstração: faltam as páginas "/manual" e "/tutorial" do grupo "Apoio"');
}
// Azul de ação: o mesmo do Heimdall, nos dois temas, em todos os tokens de ação (decisão de 11 nov. 2026).
const actionBlue = { light: ["#0842a1", "#ffffff"], dark: ["#61a6fa", "#080c16"] };
for (const [theme, tokens, [blue, onBlue]] of [["claro", light, actionBlue.light], ["escuro", dark, actionBlue.dark]]) {
  for (const name of ["primary", "ring", "sidebar-primary", "sidebar-ring"]) {
    if (tokens[name]?.toLowerCase() !== blue) errors.push(`azul de ação (${theme}): --${name} deve ser ${blue}, encontrado ${tokens[name] ?? "ausente"}`);
  }
  for (const name of ["primary-foreground", "sidebar-primary-foreground"]) {
    if (tokens[name]?.toLowerCase() !== onBlue) errors.push(`azul de ação (${theme}): --${name} deve ser ${onBlue}, encontrado ${tokens[name] ?? "ausente"}`);
  }
  requireContrast(theme, tokens, "ring", "background", 3);
  requireContrast(theme, tokens, "chart-strong-from", "card", 3);
  requireContrast(theme, tokens, "chart-strong-to", "card", 3);
  requireContrast(theme, tokens, "chart-soft-from", "card", theme === "claro" ? 2.5 : 3);
}
// Vermelho só com significado: o destrutivo continua vermelho e a marca institucional também.
for (const [theme, tokens] of [["claro", light], ["escuro", dark]]) {
  const hex = tokens.destructive;
  const [r, g, b] = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
  if (!(r > g * 1.5 && r > b * 1.5)) errors.push(`destrutivo (${theme}): --destructive (${hex}) deve continuar vermelho`);
}
if (!/--brand-mark-from:\s*#ef3340/i.test(await read("src/styles/tema-mppa.css"))) errors.push("o símbolo padrão (--brand-mark-from) deve continuar vermelho: é identidade institucional");
const sectionIconSource = await read("src/components/tema-mppa/section-icon.tsx");
if (/tones\.red/.test(sectionIconSource) || !sectionIconSource.includes("if (!tone) return tones.blue;")) errors.push("section-icon.tsx: o tom padrão do ícone de seção deve ser azul (tones.blue), não vermelho");
for (const tone of ["blue", "green", "violet", "orange", "teal", "pink", "amber"]) {
  requireContrast("claro", light, `tone-${tone}-foreground`, `tone-${tone}`, 4.5);
  requireContrast("escuro", dark, `tone-${tone}-foreground`, `tone-${tone}`, 4.5);
}

// Roteiro do consumidor: versão em dia, fases, diagnóstico e verificadores na pasta entregue.
const replicar = await read("REPLICAR.md");
const diagnostico = await read("DIAGNOSTICO.md");
for (const needle of ["SHA256SUMS", `## Interface (tema-mppa ${packageJson.version})`, "## 3. Fase 0: Diagnóstico", "verificar-camada.mjs", "verificar-design.mjs"]) {
  if (!replicar.includes(needle)) errors.push(`REPLICAR.md sem "${needle}"`);
}
// Guia do desenvolvedor: na versão do modelo (nenhuma outra versão escrita) e com o prompt de cada fase.
const guia = await read("GUIA.html");
for (const found of guia.replace(/placeholder="[^"]*"/g, "").match(/(?<![\w.#-])\d+\.\d+\.\d+(?![\w.])/g) ?? []) {
  if (found !== packageJson.version) errors.push(`GUIA.html cita a versão ${found}, esperado ${packageJson.version}`);
}
for (const needle of [`var VERSAO = "${packageJson.version}";`, "cp -r", 'value="zero"', 'value="existente"', 'value="atualizar"', 'value="openspec"', "Fase 0", "Fase 1", "Fase 2", "Fase 3", "seção 7", "seção 2.1", "Propor", "docs/tema-mppa/GUIA.html",
  // 1.14.2: o agente não sugere comando nem /clear. 2.0.0: a atualização cobre a troca visual (fonte, contraste, testes, capturas).
  "Não sugira comandos", "change que você acabou de propor", "REPLICAR.md, 4.4"]) {
  if (!guia.includes(needle)) errors.push(`GUIA.html sem "${needle}"`);
}
for (const heading of ["### 1.2 ", "### 2.1 ", "## 3. Fase 0: Diagnóstico", "### 4.4 ", "### 4.9 ", "### 4.10 ", "## 7. Atualizar", "### 7.2 ", "## 11. Registro"]) {
  if (!replicar.includes(heading)) errors.push(`GUIA.html cita a seção "${heading.trim()}", ausente do REPLICAR.md`);
}
// Sistema do zero (2.1): o app nasce nas versões do modelo; OpenSpec em três passos (1.2).
const doZero = section(replicar, "### 2.1 ");
const pins = { ...packageJson.dependencies, ...packageJson.devDependencies };
for (const needle of [`create-next-app@${pins.next}`, `next@${pins.next}`, `react@${pins.react}`, `react-dom@${pins["react-dom"]}`, `tailwindcss@${pins.tailwindcss}`, `@tailwindcss/postcss@${pins["@tailwindcss/postcss"]}`, `typescript@${pins.typescript}`, `eslint-config-next@${pins["eslint-config-next"]}`, "openspec init"]) {
  if (!doZero.includes(needle)) errors.push(`REPLICAR 2.1 sem "${needle}" (versões do package.json do modelo)`);
}
for (const needle of ["**Propor:**", "**Aplicar:**", "**Arquivar:**"]) {
  if (!section(replicar, "### 1.2 ").includes(needle)) errors.push(`REPLICAR 1.2 sem o passo ${needle}`);
}
const empacotar = await read("scripts/empacotar.mjs");
const packageFiles = ["GUIA.html", "DIAGNOSTICO.md", "DESIGN.md", "CHANGELOG.md", "scripts/verificar-camada.mjs", "scripts/verificar-design.mjs", "scripts/copy-template.mjs", "public/mppa-logo.png", "public/ciia.png", "public/ciia-sigla.svg"];
for (const file of packageFiles) {
  if (!empacotar.includes(`"${file}"`)) errors.push(`empacotar.mjs não leva ${file} à pasta entregue`);
}

/** Trecho de um .md da linha do título até o próximo título de mesmo nível ou acima. */
function section(markdown, heading) {
  const start = markdown.indexOf(`\n${heading}`);
  if (start < 0) return "";
  const level = heading.match(/^#+/)[0].length;
  const rest = markdown.slice(start + 1);
  const next = rest.slice(heading.length).search(new RegExp(`\\n#{1,${level}} `));
  return next < 0 ? rest : rest.slice(0, heading.length + next);
}
/** Primeiro bloco ```tsx de um trecho. */
const tsxBlock = (text) => text.match(/```tsx\n([\s\S]*?)\n```/)?.[1] ?? "";

// A versão que o copy-template grava vem do primeiro título do CHANGELOG (a pasta entregue não leva o package.json).
const firstRelease = changelog.match(/^## (\d+\.\d+\.\d+) /m)?.[1];
if (firstRelease !== packageJson.version) errors.push(`CHANGELOG: o primeiro título é ${firstRelease ?? "ausente"}, esperado ${packageJson.version} (o copy-template lê a versão dali)`);
if (!changelog.includes(`### Ao atualizar de `)) errors.push("CHANGELOG sem a seção \"Ao atualizar de\"");

// Script de tema: num módulo sem "use client", para chegar ao layout raiz (Server Component) como texto.
const themeScript = await read("src/components/tema-mppa/theme-script.tsx");
if (/^\s*["']use client["']/m.test(themeScript)) errors.push('theme-script.tsx não pode ter "use client" (o script chegaria ao servidor como referência de cliente)');
for (const name of ["THEME_STORAGE_KEY", "THEME_BOOT_SCRIPT", "ThemeScript"]) {
  if (!new RegExp(`export (const|function) ${name}\\b`).test(themeScript)) errors.push(`theme-script.tsx não exporta ${name}`);
}
if (!/export \{ SIDEBAR_STORAGE_KEY, THEME_BOOT_SCRIPT, THEME_STORAGE_KEY, ThemeScript \} from "\.\/theme-script";/.test(index)) errors.push("index.ts deve exportar SIDEBAR_STORAGE_KEY, THEME_BOOT_SCRIPT, THEME_STORAGE_KEY e ThemeScript de ./theme-script");
const themeProvider = await read("src/components/tema-mppa/theme-provider.tsx");
// Só claro e escuro (23 nov. 2026): nada de modo sistema nem de prefers-color-scheme no tema.
for (const file of ["theme-provider.tsx", "theme-toggle.tsx", "theme-script.tsx"]) {
  const source = await read(`src/components/tema-mppa/${file}`);
  if (/"system"|'system'|prefers-color-scheme|\bMonitor\b/.test(source)) errors.push(`${file}: o tema tem só claro e escuro; tire o modo sistema`);
}
// Na hidratação, o tema da renderização ainda é o do servidor: o efeito aplica o guardado.
const themeEffect = themeProvider.match(/useEffect\(\(\) => \{([\s\S]*?)\}, \[theme\]\);/)?.[1] ?? "";
if (!themeEffect.includes("readStoredTheme()") || /classList\.add\((resolvedTheme|theme)\)/.test(themeEffect)) {
  errors.push("theme-provider.tsx: o efeito deve aplicar o tema guardado (readStoredTheme), não o tema da hidratação");
}
if (/THEME_BOOT_SCRIPT\s*=/.test(themeProvider)) errors.push("theme-provider.tsx (\"use client\") não pode definir THEME_BOOT_SCRIPT");

// Tema com o sessionStorage bloqueado ou cheio, executado de verdade: os dois módulos transpilados pelo TypeScript do
// projeto e rodados num contexto do vm com um sessionStorage que lança, um document falso e o React trocado
// por um substituto que só chama as funções do provedor.
{
  const compile = (source) => ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const classList = (initial) => {
    const set = new Set(initial);
    return { set, add: (...names) => names.forEach((name) => set.add(name)), remove: (...names) => names.forEach((name) => set.delete(name)) };
  };
  const blocked = () => {
    throw new Error("SecurityError: armazenamento bloqueado");
  };
  const blockedStorage = { getItem: blocked, setItem: blocked, removeItem: blocked };
  const media = { matches: false, addEventListener() {}, removeEventListener() {} };
  const load = (source, globals, requires = {}) => {
    const loaded = { exports: {} };
    vm.runInNewContext(compile(source), { ...globals, module: loaded, exports: loaded.exports, require: (name) => requires[name] ?? {} });
    return loaded.exports;
  };
  try {
    const scriptModule = load(themeScript, {});
    // Boot com o armazenamento bloqueado e a página vinda com "dark": fica só "light".
    const html = classList(["dark"]);
    vm.runInNewContext(scriptModule.THEME_BOOT_SCRIPT, {
      sessionStorage: blockedStorage,
      window: { matchMedia: () => media },
      document: { documentElement: { classList: html } },
    });
    const bootClasses = [...html.set].join(" ");
    if (bootClasses !== "light") errors.push(`theme-script.tsx: com o sessionStorage bloqueado e "dark" no html, o THEME_BOOT_SCRIPT deixa "${bootClasses}", esperado "light"`);

    // Provedor com o armazenamento bloqueado: setTheme troca o tema da aba.
    const reactStub = {
      createContext: () => ({ Provider: "Provider" }),
      useContext: () => null,
      useEffect: () => {},
      useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot(),
    };
    const jsxStub = { jsx: (type, props) => ({ type, props }) };
    const storages = [
      ["bloqueado", blockedStorage],
      ["cheio (só a gravação falha)", { getItem: () => null, setItem: blocked, removeItem() {} }],
    ];
    for (const [label, storage] of storages) {
      const provider = load(themeProvider, {
        sessionStorage: storage,
        window: { matchMedia: () => media },
        document: { documentElement: { classList: classList(["light"]) } },
      }, { react: reactStub, "react/jsx-runtime": jsxStub, "./theme-script": scriptModule });
      const render = () => provider.ThemeProvider({ children: null }).props.value;
      for (const next of ["dark", "light"]) {
        render().setTheme(next);
        const { theme } = render();
        if (theme !== next) errors.push(`theme-provider.tsx: com o sessionStorage ${label}, setTheme("${next}") deixa o tema em "${theme}"`);
      }
    }
  } catch (error) {
    errors.push(`tema com o sessionStorage bloqueado: não pôde ser executado: ${error.message}`);
  }
}
const rootLayoutExample = tsxBlock(section(replicar, "### 4.4 "));
if (!rootLayoutExample.includes("<ThemeScript nonce={nonce} />") || rootLayoutExample.includes("THEME_BOOT_SCRIPT")) {
  errors.push("REPLICAR 4.4: o exemplo do layout raiz deve usar <ThemeScript nonce={nonce} /> e não o THEME_BOOT_SCRIPT");
}

// Nenhuma versão escrita nos arquivos da camada: o consumidor costuma reprovar versão fora dos pontos de versão.
for (const file of [...files.filter((file) => /\.(tsx?|css)$/.test(file)), path.join(root, "src/styles/tema-mppa.css")]) {
  const found = (await readFile(file, "utf8")).match(/(?<![\w.])[vV]?\d+\.\d+\.\d+(?![\w.])/);
  if (found) errors.push(`${path.relative(root, file)}: versão escrita ("${found[0]}"); a versão da camada fica só no camada.json e no CHANGELOG`);
}

// Contrato observável (REPLICAR 4.8): cada item está no roteiro e no código da camada.
const contractSection = section(replicar, "### 4.8 ");
const layerSource = async (file) => read(`src/components/tema-mppa/${file}`);
const contract = [
  ["`tema-mppa-theme`", "theme-script.tsx", 'THEME_STORAGE_KEY = "tema-mppa-theme"'],
  ["`tema-mppa-sidebar-collapsed`", "theme-script.tsx", 'SIDEBAR_STORAGE_KEY = "tema-mppa-sidebar-collapsed"'],
  ['"Tema: Claro. Alterar para Escuro"', "theme-toggle.tsx", "aria-label={`Tema: ${labels[theme]}. Alterar para ${labels[next]}`}"],
  ["claro ↔ escuro", "theme-toggle.tsx", 'const next: Theme = theme === "dark" ? "light" : "dark";'],
  ["claro ↔ escuro", "theme-toggle.tsx", '{ light: "Claro", dark: "Escuro" }'],
  ['"Navegação principal"', "app-sidebar.tsx", 'aria-label="Navegação principal"'],
  ["`-translate-x-full`", "app-sidebar.tsx", '"-translate-x-full"'],
  ['"Abrir menu lateral"', "app-header.tsx", 'aria-label="Abrir menu lateral"'],
  ["`h1`", "breadcrumbs.tsx", "<h1"],
  ["`header`", "app-header.tsx", "<header"],
  ['"Seções do menu"', "app-sidebar.tsx", 'aria-label="Seções do menu"'],
  ['"Abrir busca"', "command-palette.tsx", 'aria-label="Abrir busca"'],
  ['"Busca e navegação"', "command-palette.tsx", 'aria-label="Busca e navegação"'],
  ["`signOutLabel`", "user-identity.tsx", "aria-label={signOutLabel}"],
  ["`el.style.color = 'var(--x)'`", null, null],
];
for (const [doc, file, needle] of contract) {
  if (!contractSection.includes(doc)) errors.push(`REPLICAR 4.8 (contrato observável) sem ${doc}`);
  if (file && !(await layerSource(file)).includes(needle)) errors.push(`contrato: ${file} mudou (${needle}); atualize a lista da 4.8 e o CHANGELOG`);
}

// Fase 0 e regras do consumidor que a cópia aciona.
for (const needle of ["@next/next/no-img-element", "--max-warnings", "reportUnusedDisableDirectives", "todo arquivo rastreado", "bg-primary/10"]) {
  if (!diagnostico.includes(needle) && !replicar.includes(needle)) errors.push(`DIAGNOSTICO/REPLICAR sem "${needle}"`);
}
for (const needle of ["@next/next/no-img-element", "todo arquivo rastreado", "bg-primary/10"]) {
  if (!diagnostico.includes(needle)) errors.push(`DIAGNOSTICO.md sem a pergunta sobre "${needle}"`);
}
if (!section(replicar, "## 8. ").includes("`text-primary` sobre `bg-primary/15`")) errors.push("REPLICAR seção 8 sem o \"não faça\" de text-primary sobre bg-primary/15 ou mais e sobre o fundo da página");
// O aviso só vale enquanto o par ficar abaixo de 7:1 com os tokens atuais (mistura de 10% da primária).
const mix = (fg, bg, alpha) => `#${[0, 2, 4].map((offset) => {
  const channel = (hex) => parseInt(hex.replace("#", "").slice(offset, offset + 2), 16);
  return Math.round(alpha * channel(fg) + (1 - alpha) * channel(bg)).toString(16).padStart(2, "0");
}).join("")}`;
// Com a primária azul e a pedra quente, /10 passa de 7:1 (claro) sobre o cartão, o muted e a barra, mas não sobre o fundo da página (6,18:1);
// /15 ou mais cai abaixo no fundo e no muted; no escuro, /10 passa de 4,5:1. É isso que o aviso diz.
for (const surface of ["card", "muted", "sidebar"]) {
  const ratio = contrast(light.primary, mix(light.primary, light[surface], 0.1));
  if (ratio < 7) errors.push(`REPLICAR diz que text-primary sobre bg-primary/10 passa de 7:1, mas dá ${ratio.toFixed(2)}:1 sobre --${surface}`);
}
for (const surface of ["background", "card", "muted"]) {
  const ratio = contrast(dark.primary, mix(dark.primary, dark[surface], 0.1));
  if (ratio < 4.5) errors.push(`escuro: text-primary sobre bg-primary/10 dá ${ratio.toFixed(2)}:1 sobre --${surface}, mínimo 4,5:1`);
}
if (contrast(light.primary, mix(light.primary, light.background, 0.1)) >= 7) errors.push('o aviso sobre o fundo da página ficou obsoleto: bg-primary/10 chega a 7:1 sobre o --background');
if (["background", "muted"].every((surface) => contrast(light.primary, mix(light.primary, light[surface], 0.15)) >= 7)) errors.push('o "não faça" de bg-primary/15 ficou obsoleto: o par chega a 7:1 sobre o fundo e o muted');

// DESIGN.md do modelo preso ao CSS, e DESIGN.md exigido na Fase 1.
for (const needle of ["DESIGN.md", "verificar-design.mjs"]) {
  if (!section(replicar, "### 4.9 ").includes(needle)) errors.push(`REPLICAR 4.9 sem "${needle}"`);
}
try {
  execFileSync(process.execPath, [path.join(root, "scripts/verificar-design.mjs"), path.join(root, "DESIGN.md"), "--css", path.join(root, "src/styles/tema-mppa.css")], { stdio: "pipe" });
} catch (error) {
  errors.push(`DESIGN.md do modelo difere do CSS:\n${error.stderr?.toString().trim()}`);
}
// card-border é obrigatório no DESIGN.md (1.11.0): sem ele, o verificar-design reprova.
{
  const scratch = await mkdtemp(path.join(os.tmpdir(), "tema-mppa-design-"));
  try {
    const withoutCardBorder = (await read("DESIGN.md")).replace(/^ {2}card-border: "#e7e5e4"\n/m, "");
    await writeFile(path.join(scratch, "DESIGN.md"), withoutCardBorder);
    execFileSync(process.execPath, [path.join(root, "scripts/verificar-design.mjs"), path.join(scratch, "DESIGN.md"), "--css", path.join(root, "src/styles/tema-mppa.css")], { stdio: "pipe" });
    errors.push("verificar-design aprova DESIGN.md sem colors.card-border");
  } catch {
    // reprovado, como deve
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
}

// A pasta entregue de verdade: gerada numa pasta temporária e copiada DE LÁ para um consumidor descartável,
// que é compilado e servido.
const work = await mkdtemp(path.join(os.tmpdir(), "tema-mppa-verify-"));
const run = (file, args, options = {}) => {
  try {
    execFileSync(process.execPath, [file, ...args], { stdio: "pipe", ...options });
    return { status: 0 };
  } catch (error) {
    return { status: error.status ?? 1, output: `${error.stdout ?? ""}${error.stderr ?? ""}`.trim() };
  }
};
const modeOf = async (file) => (await stat(file)).mode & 0o777;
const hasShebang = async (file) => (await readFile(file)).subarray(0, 2).toString("utf8") === "#!";
let server;
try {
  const outDir = path.join(work, "saida");
  await mkdir(outDir);
  const pack = run(path.join(root, "scripts/empacotar.mjs"), [outDir]);
  if (pack.status !== 0) throw new Error(`empacotar falhou: ${pack.output}`);
  const releaseName = `tema-mppa-next-v${packageJson.version}`;
  const delivered = path.join(outDir, releaseName, "tema-mppa-next");
  if ((await readdir(outDir)).join() !== releaseName || (await readdir(path.join(outDir, releaseName))).join() !== "tema-mppa-next") {
    errors.push(`empacotar deve gerar só ${releaseName}/tema-mppa-next/`);
  }
  // Conteúdo e modos: os arquivos do pacote, sem package.json, 644 e 755 só para script com shebang.
  for (const file of packageFiles) if (!existsSync(path.join(delivered, file))) errors.push(`pasta entregue sem ${file}`);
  if (existsSync(path.join(delivered, "package.json"))) errors.push("a pasta entregue não deve levar o package.json do modelo");
  for (const file of await walk(delivered)) {
    const expectedMode = (await hasShebang(file)) ? 0o755 : 0o644;
    if ((await modeOf(file)) !== expectedMode) errors.push(`pasta entregue: ${path.relative(delivered, file)} com modo ${(await modeOf(file)).toString(8)}, esperado ${expectedMode.toString(8)}`);
  }
  // SHA256SUMS confere com cada arquivo e cobre todos.
  const { createHash } = await import("node:crypto");
  const sumsText = await readFile(path.join(delivered, "SHA256SUMS"), "utf8");
  const listed = new Set();
  for (const line of sumsText.split("\n").filter(Boolean)) {
    const [sum, file] = [line.slice(0, 64), line.slice(66)];
    listed.add(file);
    if (createHash("sha256").update(await readFile(path.join(delivered, file))).digest("hex") !== sum) errors.push(`SHA256SUMS: soma errada de ${file}`);
  }
  for (const file of await walk(delivered)) {
    const relative = path.relative(delivered, file).split(path.sep).join("/");
    if (relative !== "SHA256SUMS" && !listed.has(relative)) errors.push(`SHA256SUMS sem ${relative}`);
  }
  // Mesma versão: mesmo conteúdo passa; outro conteúdo é recusado; --substituir regrava.
  if (run(path.join(root, "scripts/empacotar.mjs"), [outDir]).status !== 0) errors.push("empacotar recusa gerar de novo a mesma versão com o mesmo conteúdo");
  await writeFile(path.join(delivered, "SHA256SUMS"), sumsText.replace(/^[0-9a-f]{64}/, "0".repeat(64)));
  if (run(path.join(root, "scripts/empacotar.mjs"), [outDir]).status === 0) errors.push("empacotar aceita a mesma versão com outro conteúdo");
  if (run(path.join(root, "scripts/empacotar.mjs"), [outDir, "--substituir"]).status !== 0 || (await readFile(path.join(delivered, "SHA256SUMS"), "utf8")) !== sumsText) errors.push("empacotar --substituir não regravou a pasta");

  const consumer = path.join(work, "consumidor");
  await mkdir(consumer);
  await writeFile(path.join(consumer, "package.json"), '{ "name": "consumidor", "private": true }\n');
  // Pasta editada no caminho: o copy-template para sem copiar nada.
  const guide = path.join(delivered, "GUIA.html");
  const guideText = await readFile(guide, "utf8");
  await appendFile(guide, "<!-- editado -->\n");
  if (run(path.join(delivered, "scripts/copy-template.mjs"), [consumer]).status === 0 || existsSync(path.join(consumer, "docs"))) errors.push("copy-template copia de uma pasta que não confere com o SHA256SUMS");
  await writeFile(guide, guideText);
  // Uma logo do sistema com o nome de uma das padrão: o copy-template não pode substituí-la.
  await mkdir(path.join(consumer, "public"));
  await writeFile(path.join(consumer, "public/ciia.png"), "logo do sistema");
  const copy = run(path.join(delivered, "scripts/copy-template.mjs"), [consumer]);
  if (copy.status !== 0) throw new Error(`copy-template a partir da pasta entregue falhou: ${copy.output}`);
  if ((await readFile(path.join(consumer, "public/ciia.png"), "utf8")) !== "logo do sistema") errors.push("copy-template substituiu uma logo que o consumidor já tinha em public/");
  for (const name of ["mppa-logo.png", "ciia-sigla.svg"]) {
    const copied = path.join(consumer, "public", name);
    if (!existsSync(copied) || !(await readFile(copied)).equals(await readFile(path.join(root, "public", name)))) errors.push(`copy-template não gravou public/${name} no consumidor`);
  }

  const reference = path.join(consumer, "docs/tema-mppa");
  const manifest = JSON.parse(await readFile(path.join(reference, "camada.json"), "utf8"));
  if (manifest.versao !== packageJson.version) errors.push(`camada.json na versão ${manifest.versao}, esperado ${packageJson.version}`);
  for (const file of [...(await walk(consumer))]) {
    const expectedMode = (await hasShebang(file)) ? 0o755 : 0o644;
    if ((await modeOf(file)) !== expectedMode) errors.push(`consumidor: ${path.relative(consumer, file)} com modo ${(await modeOf(file)).toString(8)}, esperado ${expectedMode.toString(8)}`);
  }
  for (const file of ["GUIA.html", "DESIGN.md", "verificar-design.mjs", "verificar-camada.mjs", "REPLICAR.md"]) {
    if (!existsSync(path.join(reference, file))) errors.push(`consumidor sem docs/tema-mppa/${file}`);
  }

  // DESIGN.md do sistema: parte do da camada e acrescenta os tokens próprios (REPLICAR 4.9).
  const ownCss = path.join(consumer, "app/globals.css");
  await mkdir(path.dirname(ownCss), { recursive: true });
  await writeFile(ownCss, '@import "tailwindcss";\n@import "../styles/tema-mppa.css";\n@custom-variant dark (&:is(.dark *));\n\n:root {\n  --accent-blue: #0842a1;\n}\n');
  const consumerDesign = (await readFile(path.join(reference, "DESIGN.md"), "utf8")).replace(/^colors:\n/m, 'colors:\n  accent-blue: "#0842a1"\n');
  await writeFile(path.join(consumer, "DESIGN.md"), consumerDesign);
  const designVerifier = path.join(reference, "verificar-design.mjs");
  const designOk = run(designVerifier, ["--css", ownCss], { cwd: consumer });
  if (designOk.status !== 0) errors.push(`verificar-design reprova o DESIGN.md do sistema conforme: ${designOk.output}`);
  await writeFile(path.join(consumer, "DESIGN.md"), consumerDesign.replace('primary: "#0842a1"', 'primary: "#0842a2"'));
  if (run(designVerifier, ["--css", ownCss], { cwd: consumer }).status === 0) errors.push("verificar-design aprova cor diferente da camada");
  await writeFile(path.join(consumer, "DESIGN.md"), consumerDesign.replace(/^ {2}primary: "#0842a1"\n/m, ""));
  if (run(designVerifier, ["--css", ownCss], { cwd: consumer }).status === 0) errors.push("verificar-design aprova DESIGN.md sem uma cor da camada");

  // Build do consumidor com os exemplos do roteiro tais como estão: layout raiz (4.4) e configuração (4.5).
  await symlink(path.join(root, "node_modules"), path.join(consumer, "node_modules"), "junction");
  await writeFile(path.join(consumer, "tsconfig.json"), JSON.stringify({
    compilerOptions: {
      target: "ES2017", lib: ["dom", "dom.iterable", "esnext"], strict: true, noEmit: true, esModuleInterop: true, skipLibCheck: true,
      module: "esnext", moduleResolution: "bundler", resolveJsonModule: true, isolatedModules: true, jsx: "react-jsx",
      plugins: [{ name: "next" }], paths: { "@/*": ["./*"] },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  }, null, 2));
  // O node_modules é um link para o do modelo: a raiz do Turbopack precisa abranger os dois.
  await writeFile(path.join(consumer, "next.config.mjs"), `export default { turbopack: { root: ${JSON.stringify(path.parse(consumer).root)} } };\n`);
  await writeFile(path.join(consumer, "postcss.config.mjs"), 'export default { plugins: { "@tailwindcss/postcss": {} } };\n');
  await writeFile(path.join(consumer, "app/layout.tsx"), `import "./globals.css";\n${rootLayoutExample}\n`);
  await mkdir(path.join(consumer, "config"));
  await writeFile(path.join(consumer, "config/shell.tsx"), `${tsxBlock(section(replicar, "### 4.5 "))}\n`);
  await writeFile(path.join(consumer, "app/casca.tsx"), [
    '"use client";',
    'import { AppShell } from "@/components/tema-mppa";',
    'import { shellConfig } from "@/config/shell";',
    "export function Casca({ children }: { children: React.ReactNode }) {",
    '  return <AppShell config={shellConfig} session={{ user_id: "1", name: "Pessoa Teste", email: "p@t.br", is_admin: true }} onSignOut={() => {}}>{children}</AppShell>;',
    "}",
    "",
  ].join("\n"));
  await writeFile(path.join(consumer, "app/page.tsx"), 'import { Casca } from "./casca";\nexport default function Inicio() {\n  return <Casca><p>Conteúdo</p></Casca>;\n}\n');
  // Sonda: no servidor, o script de tema tem de ser texto, não referência de cliente.
  await mkdir(path.join(consumer, "app/sonda"));
  await writeFile(path.join(consumer, "app/sonda/page.tsx"), 'import { THEME_BOOT_SCRIPT } from "@/components/tema-mppa";\nexport default function Sonda() {\n  return <p id="sonda">{typeof THEME_BOOT_SCRIPT}</p>;\n}\n');

  const next = path.join(root, "node_modules/next/dist/bin/next");
  const env = { ...process.env, NEXT_TELEMETRY_DISABLED: "1" };
  const build = run(next, ["build"], { cwd: consumer, env, timeout: 300_000 });
  if (build.status !== 0) throw new Error(`build do consumidor falhou (exemplos da 4.4/4.5 ou camada):\n${build.output.split("\n").slice(-25).join("\n")}`);

  const port = await new Promise((resolve, reject) => {
    const listener = createServer().listen(0, "127.0.0.1", () => {
      const { port: free } = listener.address();
      listener.close(() => resolve(free));
    }).on("error", reject);
  });
  server = spawn(process.execPath, [next, "start", "-p", String(port), "-H", "127.0.0.1"], { cwd: consumer, env, stdio: "ignore" });
  const fetchPage = async (route) => {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      try {
        const response = await fetch(`http://127.0.0.1:${port}${route}`);
        return await response.text();
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    throw new Error(`o consumidor não respondeu em ${route}`);
  };
  const home = await fetchPage("/");
  if (!home.includes("sessionStorage.getItem('tema-mppa-theme')")) errors.push("HTML servido sem o script de tema (sessionStorage.getItem('tema-mppa-theme'))");
  if (home.includes("Attempted to call")) errors.push('HTML servido com "Attempted to call": o script de tema chegou como referência de cliente');
  for (const label of ['aria-label="Navegação principal"', 'aria-label="Abrir busca"', 'aria-label="Tema: Claro. Alterar para Escuro"', 'aria-label="Sair"', "<h1"]) {
    if (!home.includes(label)) errors.push(`contrato: o HTML servido não tem ${label}`);
  }
  const probe = await fetchPage("/sonda");
  if (!probe.includes('<p id="sonda">string</p>')) errors.push(`no servidor, THEME_BOOT_SCRIPT não é texto (sonda: ${probe.match(/<p id="sonda">([^<]*)<\/p>/)?.[1] ?? "ausente"})`);
  server.kill();
  server = undefined;

  // Lista de conferência: camada intacta aprovada, editada reprovada.
  const verifier = path.join(reference, "verificar-camada.mjs");
  if (run(verifier, []).status !== 0) errors.push("verificar-camada reprova a camada recém-copiada");
  await appendFile(path.join(consumer, "components/tema-mppa/utils.ts"), "// editado\n");
  if (run(verifier, []).status === 0) errors.push("verificar-camada aprova a camada editada");
  // Alteração local registrada: aprovada na versão certa do registro; reprovada com o registro de outra versão.
  const registry = path.join(reference, "alteracoes-locais.json");
  const register = (versaoDoModelo) => writeFile(registry, JSON.stringify({ versaoDoModelo, alteracoes: [{ arquivo: "components/tema-mppa/utils.ts", motivo: "teste" }] }));
  await register(packageJson.version);
  if (run(verifier, []).status !== 0) errors.push("verificar-camada reprova a alteração local registrada");
  await register("0.0.0");
  if (run(verifier, []).status === 0) errors.push("verificar-camada aprova o registro de alterações locais de outra versão do modelo");
} catch (error) {
  errors.push(`consumidor de teste a partir da pasta entregue: ${error.message}`);
} finally {
  server?.kill();
  await rm(work, { recursive: true, force: true });
}

if (errors.length) {
  console.error("Falhas na validação estrutural:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Validação estrutural concluída:");
console.log("- versões exatas da matriz do ecossistema");
console.log("- shadcn/ui base-nova + Base UI + Lucide, sem @radix-ui");
console.log("- Administração condicionada a is_admin === true e a item administrativo visível, também na busca");
console.log("- imagens opcionais desaparecem sem ícone quebrado");
console.log("- shell sem chamadas de API/BFF/autenticação");
console.log("- tokens do tema único (raio, sombra, fundos, borda, realce), claro e escuro; sem variante nem data-tema");
console.log("- contraste: 7:1 no claro, 4,5:1 no escuro, ícones de tom com 4,5:1");
console.log("- componentes sem cor fixa nem canto reto; título só no cabeçalho");
console.log("- rodapé padrão: texto de brand (5 casos executados), fixo na faixa do Recolher (--shell-bar), sem corte e sem substituição");
console.log("- package-lock.json na mesma versão do package.json");
console.log("- REPLICAR.md na versão, com fases, diagnóstico, contrato observável (4.8) e DESIGN.md (4.9)");
console.log("- DIAGNOSTICO.md com lint, regras visuais, pares de cor antigos e conferências de todo arquivo rastreado");
console.log("- camada sem versão escrita; script de tema em módulo sem \"use client\"; DESIGN.md do modelo igual ao CSS");
console.log("- tema com o sessionStorage bloqueado ou cheio (executado): setTheme troca o tema; o script de tema deixa só \"light\"");
console.log("- GUIA.html na versão: do zero, existente e atualização, com e sem OpenSpec");
console.log("- empacotar: pasta tema-mppa-next/ com SHA256SUMS; recusa a mesma versão com outro conteúdo");
console.log("- cabeçalho: logos a partir de 1024px (ou com a barra recolhida), título com prioridade, sigla CIIA decorativa");
console.log("- copy-template: logos padrão gravadas em public/ sem substituir as do consumidor");
console.log("- REPLICAR 2.1 (sistema do zero) nas versões do modelo; OpenSpec em propor, aplicar e arquivar (1.2)");
console.log("- pasta gerada e copiada DE LÁ: sem package.json, modos 644/755, versão lida do CHANGELOG; pasta editada recusada");
console.log("- consumidor de teste compilado com os exemplos da 4.4 e da 4.5: script de tema no HTML servido, texto no servidor, contrato no HTML");
console.log("- verificar-design: DESIGN.md do sistema aprovado, cor trocada ou ausente reprovada");
console.log("- verificar-camada: camada intacta aprovada, editada reprovada, alteração registrada aprovada, registro de outra versão reprovado");
