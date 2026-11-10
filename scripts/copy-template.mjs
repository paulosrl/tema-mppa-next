#!/usr/bin/env node

import { chmod, cp, mkdir, open, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const force = args.includes("--force");

function option(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

const valued = new Set(["--components-dir", "--styles-dir"]);
const targetArg = args.find((arg, index) => !arg.startsWith("--") && !valued.has(args[index - 1]));

if (!targetArg) {
  console.error("Uso: node scripts/copy-template.mjs /caminho/do/consumidor [--force] [--components-dir dir] [--styles-dir dir]");
  console.error("O consumidor é a pasta do package.json do frontend (num monorepo, a subpasta do frontend).");
  console.error("Sem --components-dir/--styles-dir, usa src/components e src/styles se o consumidor tiver src/; senão, components e styles.");
  process.exit(1);
}

const target = path.resolve(targetArg);
const packageJson = path.join(target, "package.json");

try {
  await stat(packageJson);
} catch {
  console.error(`Destino inválido: ${packageJson} não foi encontrado.`);
  process.exit(1);
}

if (path.resolve(target) === root) {
  console.error("O destino é o próprio modelo. Informe a raiz do codebase consumidor.");
  process.exit(1);
}

// Estrutura do consumidor: com src/ ou sem src/.
const base = existsSync(path.join(target, "src")) ? "src" : "";
const componentsDir = path.resolve(target, option("--components-dir") ?? path.join(base, "components"));
const stylesDir = path.resolve(target, option("--styles-dir") ?? path.join(base, "styles"));
const referenceDir = path.join(target, "docs/tema-mppa");

const manifestPath = path.join(referenceDir, "camada.json");
const sha256 = async (file) => createHash("sha256").update(await readFile(file)).digest("hex");
const toPosix = (file) => file.split(path.sep).join("/");
// A versão vem do primeiro título do CHANGELOG ("## 1.6.0 — data"), que vai no zip; o package.json do
// modelo não vai.
const version = (await readFile(path.join(root, "CHANGELOG.md"), "utf8")).match(/^## (\d+\.\d+\.\d+) /m)?.[1];
if (!version) {
  console.error(`Sem versão no CHANGELOG.md do modelo (${path.join(root, "CHANGELOG.md")}).`);
  process.exit(1);
}

const comparisons = (await readdir(path.join(root, "docs/comparacao"))).filter((name) => name.endsWith(".png"));

const sources = [
  { from: path.join(root, "src/components/tema-mppa"), to: path.join(componentsDir, "tema-mppa") },
  { from: path.join(root, "src/styles/tema-mppa.css"), to: path.join(stylesDir, "tema-mppa.css") },
  { from: path.join(root, "REPLICAR.md"), to: path.join(referenceDir, "REPLICAR.md") },
  { from: path.join(root, "scripts/verificar-camada.mjs"), to: path.join(referenceDir, "verificar-camada.mjs") },
  { from: path.join(root, "scripts/verificar-design.mjs"), to: path.join(referenceDir, "verificar-design.mjs") },
  { from: path.join(root, "DESIGN.md"), to: path.join(referenceDir, "DESIGN.md") },
  { from: path.join(root, "CHANGELOG.md"), to: path.join(referenceDir, "CHANGELOG.md") },
  { from: path.join(root, "docs/prototipo/index.html"), to: path.join(referenceDir, "prototipo/index.html") },
  { from: path.join(root, "docs/preview/index.html"), to: path.join(referenceDir, "preview/index.html") },
  ...comparisons.map((name) => ({
    from: path.join(root, "docs/comparacao", name),
    to: path.join(referenceDir, "comparacao", name),
  })),
];

const existing = sources.filter(({ to }) => existsSync(to));
if (existing.length && !force) {
  console.error("O destino já contém arquivos do modelo. Revise o diff ou execute novamente com --force (faz backup):");
  for (const item of existing) console.error(`- ${path.relative(target, item.to)}`);
  process.exit(2);
}

// Atualização: diz quais arquivos da camada o consumidor tinha editado, antes de substituí-los.
if (existing.length && force && existsSync(manifestPath)) {
  const previous = JSON.parse(await readFile(manifestPath, "utf8"));
  const edited = [];
  for (const [relative, expected] of Object.entries(previous.arquivos ?? {})) {
    const file = path.join(target, relative);
    if (existsSync(file) && (await sha256(file)) !== expected) edited.push(relative);
  }
  if (edited.length) {
    console.warn(`Atenção: estes arquivos da camada ${previous.versao} tinham sido editados no consumidor e vão para o backup:`);
    for (const relative of edited) console.warn(`- ${relative}`);
  }
}

let backupRoot;
if (existing.length && force) {
  backupRoot = path.join(target, `.tema-mppa-backup-${new Date().toISOString().replace(/[:.]/g, "-")}`);
  await mkdir(backupRoot, { recursive: true });
  for (const { to } of existing) {
    const backup = path.join(backupRoot, path.relative(target, to));
    await mkdir(path.dirname(backup), { recursive: true });
    await rename(to, backup);
  }
}

// Modo fixo, sem herdar o da origem (um zip feito no Windows chega com 0777): 644, e 755 só para script
// com shebang. Num repositório que confere o modo pelo índice do git, nada vira executável por engano.
async function startsWithShebang(file) {
  const handle = await open(file, "r");
  try {
    const { buffer, bytesRead } = await handle.read(Buffer.alloc(2), 0, 2, 0);
    return bytesRead === 2 && buffer.toString("utf8") === "#!";
  } finally {
    await handle.close();
  }
}
async function normalizeModes(target) {
  if ((await stat(target)).isDirectory()) {
    await chmod(target, 0o755);
    for (const name of await readdir(target)) await normalizeModes(path.join(target, name));
  } else {
    await chmod(target, (await startsWithShebang(target)) ? 0o755 : 0o644);
  }
}

for (const { from, to } of sources) {
  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to, { recursive: true });
  await normalizeModes(to);
}

// Lista de conferência: versão e SHA-256 de cada arquivo da camada, lida pelo verificar-camada.mjs.
const layerFiles = [
  ...(await readdir(path.join(componentsDir, "tema-mppa"))).sort().map((name) => path.join(componentsDir, "tema-mppa", name)),
  path.join(stylesDir, "tema-mppa.css"),
];
const files = {};
for (const file of layerFiles) files[toPosix(path.relative(target, file))] = await sha256(file);
const manifest = {
  modelo: "tema-mppa-next",
  versao: version,
  raiz: toPosix(path.relative(referenceDir, target)),
  componentes: toPosix(path.relative(target, path.join(componentsDir, "tema-mppa"))),
  arquivos: files,
};
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o644 });
await chmod(manifestPath, 0o644);

const rel = (to) => path.relative(target, to) || ".";
console.log("Camada visual copiada:");
console.log(`- componentes: ${rel(path.join(componentsDir, "tema-mppa"))}/`);
console.log(`- cores e tokens: ${rel(path.join(stylesDir, "tema-mppa.css"))}`);
console.log(`- referência e guia do agente: ${rel(referenceDir)}/ (REPLICAR.md, DESIGN.md, protótipo, prévia, comparações)`);
if (backupRoot) console.log(`Backup: ${rel(backupRoot)}`);
console.log(`- lista de conferência: ${rel(manifestPath)} (versão ${version}); confira com: node ${rel(path.join(referenceDir, "verificar-camada.mjs"))}`);
console.log(`- conferência do DESIGN.md do sistema: node ${rel(path.join(referenceDir, "verificar-design.mjs"))} --css <CSS com os tokens próprios>`);
console.log("Próximos passos: REPLICAR.md, Fase 1 (seção 4), a partir de 4.2. Depois da Fase 1, a Fase 2 (telas) e a Fase 3 (limpeza).");
console.log("Nenhum arquivo de autenticação, BFF, API, rota ou regra de negócio foi alterado.");
