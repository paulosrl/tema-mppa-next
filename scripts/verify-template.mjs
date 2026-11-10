#!/usr/bin/env node

import { execFileSync, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { appendFile, mkdir, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import os from "node:os";
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

// Roteiro do consumidor: versão em dia, fases, diagnóstico e verificadores no zip.
const replicar = await read("REPLICAR.md");
const diagnostico = await read("DIAGNOSTICO.md");
for (const needle of [`tema-mppa-next-v${packageJson.version}.zip`, `## Interface (tema-mppa ${packageJson.version})`, "## 3. Fase 0: Diagnóstico", "verificar-camada.mjs", "verificar-design.mjs"]) {
  if (!replicar.includes(needle)) errors.push(`REPLICAR.md sem "${needle}"`);
}
// Guia do desenvolvedor: na versão do modelo (nenhuma outra versão escrita) e com o prompt de cada fase.
const guia = await read("GUIA.html");
for (const found of guia.replace(/placeholder="[^"]*"/g, "").match(/(?<![\w.#-])\d+\.\d+\.\d+(?![\w.])/g) ?? []) {
  if (found !== packageJson.version) errors.push(`GUIA.html cita a versão ${found}, esperado ${packageJson.version}`);
}
for (const needle of [`var VERSAO = "${packageJson.version}";`, `tema-mppa-next-v${packageJson.version}.zip`, 'value="zero"', 'value="existente"', 'value="atualizar"', 'value="openspec"', "Fase 0", "Fase 1", "Fase 2", "Fase 3", "seção 7", "seção 2.1", "Propor", "docs/tema-mppa/GUIA.html"]) {
  if (!guia.includes(needle)) errors.push(`GUIA.html sem "${needle}"`);
}
for (const heading of ["### 1.2 ", "### 2.1 ", "## 3. Fase 0: Diagnóstico", "### 4.9 ", "### 4.10 ", "## 7. Atualizar", "## 11. Registro"]) {
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
const zipFiles = ["GUIA.html", "DIAGNOSTICO.md", "DESIGN.md", "CHANGELOG.md", "scripts/verificar-camada.mjs", "scripts/verificar-design.mjs", "scripts/copy-template.mjs"];
for (const file of zipFiles) {
  if (!empacotar.includes(`"${file}"`)) errors.push(`empacotar.mjs não leva ${file} ao zip`);
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

// A versão que o copy-template grava vem do primeiro título do CHANGELOG (o zip não leva o package.json).
const firstRelease = changelog.match(/^## (\d+\.\d+\.\d+) /m)?.[1];
if (firstRelease !== packageJson.version) errors.push(`CHANGELOG: o primeiro título é ${firstRelease ?? "ausente"}, esperado ${packageJson.version} (o copy-template lê a versão dali)`);
if (!changelog.includes(`### Ao atualizar de `)) errors.push("CHANGELOG sem a seção \"Ao atualizar de\"");

// Script de tema: num módulo sem "use client", para chegar ao layout raiz (Server Component) como texto.
const themeScript = await read("src/components/tema-mppa/theme-script.tsx");
if (/^\s*["']use client["']/m.test(themeScript)) errors.push('theme-script.tsx não pode ter "use client" (o script chegaria ao servidor como referência de cliente)');
for (const name of ["THEME_STORAGE_KEY", "THEME_BOOT_SCRIPT", "ThemeScript"]) {
  if (!new RegExp(`export (const|function) ${name}\\b`).test(themeScript)) errors.push(`theme-script.tsx não exporta ${name}`);
}
if (!/export \{ THEME_BOOT_SCRIPT, THEME_STORAGE_KEY, ThemeScript \} from "\.\/theme-script";/.test(index)) errors.push("index.ts deve exportar THEME_BOOT_SCRIPT, THEME_STORAGE_KEY e ThemeScript de ./theme-script");
const themeProvider = await read("src/components/tema-mppa/theme-provider.tsx");
// Na hidratação, o tema da renderização ainda é o do servidor: o efeito aplica o guardado.
const themeEffect = themeProvider.match(/useEffect\(\(\) => \{([\s\S]*?)\}, \[resolvedTheme\]\);/)?.[1] ?? "";
if (!themeEffect.includes("readStoredTheme()") || /classList\.add\(resolvedTheme\)/.test(themeEffect)) {
  errors.push("theme-provider.tsx: o efeito deve aplicar o tema guardado (readStoredTheme), não o resolvedTheme da hidratação");
}
if (/THEME_BOOT_SCRIPT\s*=/.test(themeProvider)) errors.push("theme-provider.tsx (\"use client\") não pode definir THEME_BOOT_SCRIPT");
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
  ["`tema-mppa-sidebar-collapsed`", "sidebar-context.tsx", 'SIDEBAR_STORAGE_KEY = "tema-mppa-sidebar-collapsed"'],
  ['"Tema: Claro. Alterar para Escuro"', "theme-toggle.tsx", "aria-label={`Tema: ${labels[theme]}. Alterar para ${labels[next]}`}"],
  ["claro → escuro → sistema", "theme-toggle.tsx", 'const sequence: Theme[] = ["light", "dark", "system"];'],
  ["claro → escuro → sistema", "theme-toggle.tsx", '{ light: "Claro", dark: "Escuro", system: "Sistema" }'],
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
if (!section(replicar, "## 8. ").includes("`text-primary` sobre `bg-primary/10`")) errors.push("REPLICAR seção 8 sem o \"não faça\" de text-primary sobre bg-primary/10");
// O aviso só vale enquanto o par ficar abaixo de 7:1 com os tokens atuais (mistura de 10% da primária).
const mix = (fg, bg, alpha) => `#${[0, 2, 4].map((offset) => {
  const channel = (hex) => parseInt(hex.replace("#", "").slice(offset, offset + 2), 16);
  return Math.round(alpha * channel(fg) + (1 - alpha) * channel(bg)).toString(16).padStart(2, "0");
}).join("")}`;
for (const surface of ["background", "card"]) {
  const ratio = contrast(light.primary, mix(light.primary, light[surface], 0.1));
  if (ratio >= 7) errors.push(`o "não faça" de bg-primary/10 ficou obsoleto: ${ratio.toFixed(2)}:1 sobre --${surface}`);
}

// DESIGN.md do modelo preso ao CSS, e DESIGN.md exigido na Fase 1.
for (const needle of ["DESIGN.md", "verificar-design.mjs"]) {
  if (!section(replicar, "### 4.9 ").includes(needle)) errors.push(`REPLICAR 4.9 sem "${needle}"`);
}
try {
  execFileSync(process.execPath, [path.join(root, "scripts/verificar-design.mjs"), path.join(root, "DESIGN.md"), "--css", path.join(root, "src/styles/tema-mppa.css")], { stdio: "pipe" });
} catch (error) {
  errors.push(`DESIGN.md do modelo difere do CSS:\n${error.stderr?.toString().trim()}`);
}

// O zip de verdade: gerado numa pasta temporária, descompactado e copiado DE LÁ para um consumidor
// descartável, que é compilado e servido.
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
  const zipDir = path.join(work, "zip");
  await mkdir(zipDir);
  execFileSync(process.execPath, [path.join(root, "scripts/empacotar.mjs"), zipDir], { stdio: "pipe" });
  const zipPath = path.join(zipDir, `tema-mppa-next-v${packageJson.version}.zip`);
  const zipOutput = await readdir(zipDir);
  if (zipOutput.join() !== path.basename(zipPath)) errors.push(`empacotar deve gerar só o zip; gerou: ${zipOutput.join(", ")}`);

  // Modo de cada entrada: 644, e 755 só para script com shebang.
  const listing = execFileSync("unzip", ["-Z", zipPath], { encoding: "utf8" }).split("\n").filter((line) => /^[-d]r/.test(line));
  const entries = new Map(listing.map((line) => [line.split(/\s+/).at(-1), line.split(/\s+/)[0]]));
  for (const file of zipFiles) if (!entries.has(`tema-mppa-next/${file}`)) errors.push(`zip sem ${file}`);
  if (entries.has("tema-mppa-next/package.json")) errors.push("zip não deve levar o package.json do modelo");
  for (const [entry, mode] of entries) {
    if (entry.endsWith("/")) continue;
    const expectedMode = (await hasShebang(path.join(root, entry.replace(/^tema-mppa-next\//, "")))) ? "-rwxr-xr-x" : "-rw-r--r--";
    if (mode !== expectedMode) errors.push(`zip: ${entry} com modo ${mode}, esperado ${expectedMode}`);
  }

  const unzipped = path.join(work, "descompactado");
  execFileSync("unzip", ["-q", zipPath, "-d", unzipped]);
  const consumer = path.join(work, "consumidor");
  await mkdir(consumer);
  await writeFile(path.join(consumer, "package.json"), '{ "name": "consumidor", "private": true }\n');
  const copy = run(path.join(unzipped, "tema-mppa-next/scripts/copy-template.mjs"), [consumer]);
  if (copy.status !== 0) throw new Error(`copy-template a partir do zip falhou: ${copy.output}`);

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
  await writeFile(path.join(consumer, "DESIGN.md"), consumerDesign.replace('primary: "#9f0712"', 'primary: "#9f0713"'));
  if (run(designVerifier, ["--css", ownCss], { cwd: consumer }).status === 0) errors.push("verificar-design aprova cor diferente da camada");
  await writeFile(path.join(consumer, "DESIGN.md"), consumerDesign.replace(/^ {2}primary: "#9f0712"\n/m, ""));
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
} catch (error) {
  errors.push(`consumidor de teste a partir do zip: ${error.message}`);
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
console.log("- tokens iguais ao protótipo (raio, sombra, fundos, borda, realce), claro e escuro");
console.log("- contraste: 7:1 no claro, 4,5:1 no escuro, ícones de tom com 4,5:1");
console.log("- componentes sem cor fixa nem canto reto; título só no cabeçalho");
console.log("- rodapé padrão: texto de brand (5 casos executados), fixo na faixa do Recolher (--shell-bar), sem corte e sem substituição");
console.log("- package-lock.json na mesma versão do package.json");
console.log("- REPLICAR.md na versão, com fases, diagnóstico, contrato observável (4.8) e DESIGN.md (4.9)");
console.log("- DIAGNOSTICO.md com lint, regras visuais, pares de cor antigos e conferências de todo arquivo rastreado");
console.log("- camada sem versão escrita; script de tema em módulo sem \"use client\"; DESIGN.md do modelo igual ao CSS");
console.log("- GUIA.html na versão: do zero, existente e atualização, com e sem OpenSpec; zip sozinho, sem .sha256");
console.log("- REPLICAR 2.1 (sistema do zero) nas versões do modelo; OpenSpec em propor, aplicar e arquivar (1.2)");
console.log("- zip gerado, descompactado e copiado DE LÁ: sem package.json, modos 644/755, versão lida do CHANGELOG");
console.log("- consumidor de teste compilado com os exemplos da 4.4 e da 4.5: script de tema no HTML servido, texto no servidor, contrato no HTML");
console.log("- verificar-design: DESIGN.md do sistema aprovado, cor trocada ou ausente reprovada");
console.log("- verificar-camada: camada intacta aprovada, editada reprovada");
