#!/usr/bin/env node
/*
 * Confere um DESIGN.md (formato aberto do Google Labs, versão alpha) contra os tokens reais do CSS. O
 * DESIGN.md descreve a interface para agentes de IA, mas não é a fonte da verdade: este script reprova
 * - cor do grupo `colors` diferente do token de mesmo nome no `:root` dos CSS (ou ausente deles), e falta de
 *   `colors.primary` ou `colors.card-border` (contorno dos quadros, desde a 1.11.0);
 * - `rounded` fora da escala presa a `--radius`, e `spacing.shell-bar` diferente de `--shell-bar`;
 * - referência `{grupo.token}` que não existe no próprio arquivo;
 * - seção do formato fora de ordem, repetida ou ausente;
 * - no consumidor, cor da camada (a do `docs/tema-mppa/DESIGN.md`) que falta ou mudou de valor.
 * Sem rede e sem dependências. O linter oficial (`npx @google/design.md lint DESIGN.md`) roda à parte.
 *
 * Uso, da raiz do consumidor (a pasta do package.json do frontend):
 *   node docs/tema-mppa/verificar-design.mjs [DESIGN.md] [--css arquivo.css ...]
 * O `tema-mppa.css` da camada entra sempre (achado pelo camada.json); passe em `--css` os CSS com os tokens
 * próprios do sistema (por exemplo, app/globals.css). Saída 0: conforme. Saída 1: diferenças, uma por linha.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const cssArgs = [];
const positional = [];
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--css") cssArgs.push(args[++i]);
  else positional.push(args[i]);
}

// No consumidor, o camada.json diz onde fica a raiz e o tema-mppa.css copiado.
const manifestPath = path.join(here, "camada.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : null;
const consumerRoot = manifest ? path.resolve(here, manifest.raiz) : process.cwd();
const designPath = path.resolve(positional[0] ?? path.join(consumerRoot, "DESIGN.md"));
const cssFiles = cssArgs.map((file) => path.resolve(file));
if (manifest) {
  const layerCss = Object.keys(manifest.arquivos).find((file) => file.endsWith("tema-mppa.css"));
  if (layerCss) cssFiles.unshift(path.join(consumerRoot, layerCss));
}
// O DESIGN.md da camada, para conferir que o do sistema mantém as cores dela.
const layerDesignPath = path.join(here, "DESIGN.md");
const checkLayer = existsSync(layerDesignPath) && path.resolve(layerDesignPath) !== designPath;

const problems = [];
if (!existsSync(designPath)) {
  console.error(`Sem ${designPath}.`);
  process.exit(1);
}
if (!cssFiles.length) {
  console.error("Informe os CSS com os tokens: --css caminho/do/tema-mppa.css [--css outro.css]");
  process.exit(1);
}

/** Lê o bloco YAML do início (só o que o formato usa: mapas por indentação, escalares e `>-`). */
function frontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const rootMap = {};
  const stack = [{ indent: -1, value: rootMap }];
  const lines = match[1].split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const indent = line.match(/^ */)[0].length;
    const pair = line.trim().match(/^("?[^":]+"?):\s*(.*)$/);
    if (!pair) continue;
    while (stack.at(-1).indent >= indent) stack.pop();
    const key = pair[1].replace(/^"|"$/g, "");
    let value = pair[2];
    const parent = stack.at(-1).value;
    if (value === "") {
      parent[key] = {};
      stack.push({ indent, value: parent[key] });
      continue;
    }
    if (/^[>|]-?$/.test(value)) {
      const block = [];
      while (i + 1 < lines.length && (lines[i + 1].match(/^ */)[0].length > indent || !lines[i + 1].trim())) block.push(lines[++i].trim());
      value = block.join(" ").trim();
    }
    parent[key] = value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
  }
  return rootMap;
}

/** Tokens do primeiro `:root {}` de cada CSS, com `var(--x)` resolvido. */
function rootTokens(files) {
  const tokens = {};
  for (const file of files) {
    if (!existsSync(file)) {
      problems.push(`${file}: CSS não encontrado`);
      continue;
    }
    const css = readFileSync(file, "utf8");
    const start = css.search(/:root\s*\{/);
    if (start < 0) continue;
    const body = css.slice(start, css.indexOf("}", start));
    for (const [, name, value] of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) tokens[name] = value.trim();
  }
  const resolve = (value, depth = 0) => {
    const ref = value?.match(/^var\(--([\w-]+)\)$/);
    return ref && depth < 10 ? resolve(tokens[ref[1]], depth + 1) : value;
  };
  return Object.fromEntries(Object.entries(tokens).map(([name, value]) => [name, resolve(value)]));
}

const toPx = (value) => {
  const match = String(value ?? "").trim().match(/^(-?[\d.]+)(px|rem)$/);
  if (!match) return null;
  return match[2] === "rem" ? Number(match[1]) * 16 : Number(match[1]);
};

const source = readFileSync(designPath, "utf8");
const relative = path.relative(process.cwd(), designPath) || designPath;
const tokens = frontMatter(source);
if (!tokens) {
  problems.push(`${relative}: sem o bloco YAML entre --- no início`);
} else {
  if (tokens.version !== "alpha") problems.push(`${relative}: version deve ser "alpha" (encontrado ${tokens.version ?? "ausente"})`);
  if (!tokens.name) problems.push(`${relative}: falta name`);
  const css = rootTokens(cssFiles);

  const colors = tokens.colors ?? {};
  // Cores que todo DESIGN.md da camada tem de declarar, mesmo sem o da camada ao lado para comparar.
  for (const name of ["primary", "card-border"]) {
    if (!colors[name]) problems.push(`${relative}: falta colors.${name}`);
  }
  for (const [name, value] of Object.entries(colors)) {
    const real = css[name];
    if (!real) problems.push(`colors.${name}: não há --${name} no :root dos CSS`);
    else if (real.toLowerCase() !== String(value).toLowerCase()) problems.push(`colors.${name}: ${value}, mas --${name} é ${real}`);
  }

  const radius = toPx(css.radius);
  const scale = { xs: 0.25, sm: 0.5, md: 0.75, lg: 1, xl: 1.5, "2xl": 2, "3xl": 3, "4xl": 4 };
  for (const [name, value] of Object.entries(tokens.rounded ?? {})) {
    if (!(name in scale) || radius === null) continue;
    if (toPx(value) !== radius * scale[name]) problems.push(`rounded.${name}: ${value}, mas a escala de --radius dá ${radius * scale[name]}px`);
  }
  if (tokens.spacing?.["shell-bar"] && toPx(tokens.spacing["shell-bar"]) !== toPx(css["shell-bar"])) {
    problems.push(`spacing.shell-bar: ${tokens.spacing["shell-bar"]}, mas --shell-bar é ${css["shell-bar"]}`);
  }

  const defined = new Set(
    ["colors", "typography", "rounded", "spacing", "components"].flatMap((group) => Object.keys(tokens[group] ?? {}).map((key) => `${group}.${key}`)),
  );
  for (const [, ref] of source.matchAll(/\{((?:colors|typography|rounded|spacing|components)\.[\w-]+)\}/g)) {
    if (!defined.has(ref)) problems.push(`{${ref}}: referência a token que não existe`);
  }

  if (checkLayer) {
    const layerColors = frontMatter(readFileSync(layerDesignPath, "utf8"))?.colors ?? {};
    for (const [name, value] of Object.entries(layerColors)) {
      if (!(name in colors)) problems.push(`colors.${name}: cor da camada ausente (está em docs/tema-mppa/DESIGN.md)`);
      else if (String(colors[name]).toLowerCase() !== String(value).toLowerCase()) problems.push(`colors.${name}: difere da camada (${value})`);
    }
  }
}

// Seções do formato: todas presentes, na ordem, sem repetição (aceita os nomes alternativos).
const order = [
  ["Overview", "Brand & Style"],
  ["Colors"],
  ["Typography"],
  ["Layout", "Layout & Spacing"],
  ["Elevation & Depth", "Elevation"],
  ["Shapes"],
  ["Components"],
  ["Do's and Don'ts"],
];
const body = source.replace(/^---\n[\s\S]*?\n---\n/, "");
const headings = [...body.matchAll(/^## (.+)$/gm)].map(([, title]) => title.trim());
const seen = new Set();
for (const title of headings) {
  if (seen.has(title)) problems.push(`seção "${title}" repetida`);
  seen.add(title);
}
const positions = order.map((names) => headings.findIndex((title) => names.includes(title)));
order.forEach((names, index) => {
  if (positions[index] < 0) problems.push(`seção "${names[0]}" ausente`);
});
const present = positions.filter((position) => position >= 0);
if (present.some((position, index) => index > 0 && position < present[index - 1])) {
  problems.push(`seções fora da ordem do formato: ${order.map((names) => names[0]).join(", ")}`);
}

if (problems.length) {
  console.error(`${relative} difere dos tokens:`);
  for (const problem of problems) console.error(`- ${problem}`);
  console.error("Corrija o DESIGN.md: a fonte da verdade são os CSS.");
  process.exit(1);
}
console.log(`${relative} conforme: ${Object.keys(tokens.colors ?? {}).length} cores iguais às dos CSS, referências e seções em ordem.`);
