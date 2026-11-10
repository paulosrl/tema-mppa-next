#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
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

const palette = await read("src/components/tema-mppa/command-palette.tsx");
if (!palette.includes("canSeeAdministration(")) errors.push("busca não segue a regra das abas (canSeeAdministration)");

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
if (!/:root\s*\{[^}]*--shell-bar:\s*3\.5rem;/.test(themeCss)) errors.push("tema-mppa.css: falta --shell-bar: 3.5rem em :root (altura das faixas)");
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

// A prévia entregue mostra a versão do pacote.
const preview = await read("docs/preview/index.html");
if (!preview.includes(`<title>Template Visual MPPA v${packageJson.version}</title>`)) {
  errors.push(`docs/preview/index.html: título fora da versão ${packageJson.version} (regere a prévia)`);
}

const header = await read("src/components/tema-mppa/app-header.tsx");
const identity = await read("src/components/tema-mppa/user-identity.tsx");
if (!header.includes("<UserIdentity") || !header.includes("bg-logo-surface")) errors.push("cabeçalho sem identidade ou logos");
if (!identity.includes("onSignOut ?") || !identity.includes("xl:flex")) errors.push("cabeçalho padrão: nome/perfil (xl) e botão de sair visíveis");
if (/popover/i.test(identity)) errors.push("cabeçalho padrão não usa painel no avatar");

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
  light: { radius: "0.5rem", background: "#ffffff", card: "#fafafa", sidebar: "#fcfcfc", muted: "#f4f4f5", border: "#d4d4d8", highlight: "#fee2e2" },
  dark: { background: "#09090b", card: "#18181b", sidebar: "#18181b", muted: "#27272a", border: "rgba(255, 255, 255, 0.12)", highlight: "#351518" },
};
for (const [theme, tokens] of [["claro", light], ["escuro", dark]]) {
  for (const [name, value] of Object.entries(theme === "claro" ? prototype.light : prototype.dark)) {
    if (tokens[name]?.toLowerCase() !== value) errors.push(`token --${name} (${theme}): esperado ${value}, encontrado ${tokens[name] ?? "ausente"}`);
  }
}
if (!light.shadow?.startsWith("0 2px 6px")) errors.push("token --shadow (claro) diferente do protótipo");
if (!dark.shadow?.startsWith("0 2px 8px")) errors.push("token --shadow (escuro) diferente do protótipo");

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
for (const surface of textOn) {
  requireContrast("claro", light, "foreground", surface, 7);
  requireContrast("claro", light, "muted-foreground", surface, 7);
  requireContrast("escuro", dark, "foreground", surface, 4.5);
  requireContrast("escuro", dark, "muted-foreground", surface, 4.5);
}
if (light["muted-foreground"] !== light.foreground) errors.push("claro: o texto secundário deve ser igual ao principal");
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
for (const tone of ["green", "violet", "orange"]) {
  requireContrast("claro", light, `tone-${tone}-foreground`, `tone-${tone}`, 4.5);
  requireContrast("escuro", dark, `tone-${tone}-foreground`, `tone-${tone}`, 4.5);
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
console.log("- tokens iguais ao protótipo (raio, sombra, fundos, borda, realce), claro e escuro");
console.log("- contraste: 7:1 no claro, 4,5:1 no escuro, ícones de tom com 4,5:1");
console.log("- componentes sem cor fixa nem canto reto; título só no cabeçalho");
console.log("- rodapé padrão: texto de brand (5 casos executados), fixo na faixa do Recolher (--shell-bar), sem corte e sem substituição");
console.log("- package-lock.json na mesma versão do package.json");
