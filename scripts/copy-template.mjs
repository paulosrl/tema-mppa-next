#!/usr/bin/env node

import { chmod, cp, mkdir, open, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import os from "node:os";
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

const valued = new Set(["--components-dir", "--styles-dir", "--public-dir"]);
const targetArg = args.find((arg, index) => !arg.startsWith("--") && !valued.has(args[index - 1]));

if (!targetArg) {
  console.error("Uso: node scripts/copy-template.mjs /caminho/do/consumidor [--force] [--components-dir dir] [--styles-dir dir] [--public-dir dir]");
  console.error("O consumidor é a pasta do package.json do frontend (num monorepo, a subpasta do frontend).");
  console.error("Sem --components-dir/--styles-dir, usa src/components e src/styles se o consumidor tiver src/; senão, components e styles.");
  console.error("As logos padrão do cabeçalho vão para public/ (ou --public-dir), sem substituir arquivo que já exista.");
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
// O public/ do Next fica na raiz do consumidor, com ou sem src/.
const publicDir = path.resolve(target, option("--public-dir") ?? "public");
// Logos padrão do cabeçalho, na ordem de `header.logos` (REPLICAR, 4.5).
const logoFiles = ["mppa-logo.png", "ciia.png", "ciia-sigla.svg"];

// Pastas do modelo que sobraram perto do consumidor (a raiz do repositório e as duas acima dela): outra
// `tema-mppa-next/` (de uma versão antiga) ou a pasta de fora, `tema-mppa-next-v<versão>/`. Só avisa; o roteiro manda apagá-las
// depois da cópia, porque o tsconfig e o lint do consumidor compilariam uma segunda cópia da camada.
const staleFolders = [];
for (const directory of new Set([target, path.dirname(target), path.dirname(path.dirname(target))])) {
  if (!existsSync(directory)) continue;
  for (const name of await readdir(directory)) {
    if (!/^tema-mppa-next(-v[\w.-]+)?$/.test(name)) continue;
    const folder = path.join(directory, name);
    if (path.resolve(folder) === root || !(await stat(folder)).isDirectory()) continue;
    let found = "versão desconhecida";
    for (const candidate of [path.join(folder, "CHANGELOG.md"), path.join(folder, "tema-mppa-next/CHANGELOG.md")]) {
      if (existsSync(candidate)) found = `versão ${(await readFile(candidate, "utf8")).match(/^## (\d+\.\d+\.\d+) /m)?.[1] ?? "desconhecida"}`;
    }
    staleFolders.push(`${folder} (${found})`);
  }
}

const manifestPath = path.join(referenceDir, "camada.json");
const sha256 = async (file) => createHash("sha256").update(await readFile(file)).digest("hex");
const toPosix = (file) => file.split(path.sep).join("/");
// A versão vem do primeiro título do CHANGELOG ("## 1.6.0 — data"), que vai na pasta entregue; o
// package.json do modelo não vai.
const version = (await readFile(path.join(root, "CHANGELOG.md"), "utf8")).match(/^## (\d+\.\d+\.\d+) /m)?.[1];
if (!version) {
  console.error(`Sem versão no CHANGELOG.md do modelo (${path.join(root, "CHANGELOG.md")}).`);
  process.exit(1);
}

// A pasta entregue traz SHA256SUMS (gerado pelo empacotar): antes de copiar, cada arquivo listado tem de existir
// e ter a mesma soma. Pasta incompleta ou editada no caminho para; rodando do próprio modelo, sem SHA256SUMS,
// não há o que conferir.
const sumsPath = path.join(root, "SHA256SUMS");
if (existsSync(sumsPath)) {
  const wrong = [];
  for (const line of (await readFile(sumsPath, "utf8")).split("\n").filter(Boolean)) {
    const [expected, relative] = [line.slice(0, 64), line.slice(66)];
    const file = path.join(root, relative);
    if (!existsSync(file)) wrong.push(`${relative}: ausente`);
    else if ((await sha256(file)) !== expected) wrong.push(`${relative}: difere do entregue`);
  }
  if (wrong.length) {
    console.error(`A pasta ${root} não confere com o SHA256SUMS dela (versão ${version}); nada foi copiado:`);
    for (const item of wrong) console.error(`- ${item}`);
    console.error("Copie de novo a pasta tema-mppa-next/ inteira, sem editar, e rode outra vez.");
    process.exit(3);
  }
}

const comparisons = (await readdir(path.join(root, "docs/comparacao"))).filter((name) => name.endsWith(".png"));

const sources = [
  { from: path.join(root, "src/components/tema-mppa"), to: path.join(componentsDir, "tema-mppa") },
  { from: path.join(root, "src/styles/tema-mppa.css"), to: path.join(stylesDir, "tema-mppa.css") },
  { from: path.join(root, "GUIA.html"), to: path.join(referenceDir, "GUIA.html") },
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

// As comparações vão como pasta inteira: na atualização, a pasta antiga sai junto (para o backup), e uma imagem que o
// modelo removeu não fica de resto no consumidor (na 2.0.3, `menu-movel-390-claro.png`).
const comparisonsDir = path.join(referenceDir, "comparacao");
const existing = [
  ...(existsSync(comparisonsDir) ? [{ to: comparisonsDir }] : []),
  ...sources.filter(({ to }) => existsSync(to)),
];
if (existing.length && !force) {
  console.error("O destino já contém arquivos do modelo. Revise o diff ou execute novamente com --force (faz backup):");
  for (const item of existing) console.error(`- ${path.relative(target, item.to)}`);
  process.exit(2);
}

// Atualização: diz quais arquivos da camada o consumidor tinha editado, antes de substituí-los.
let editedFiles = [];
let previousManifest;
if (existing.length && force && existsSync(manifestPath)) {
  const previous = JSON.parse(await readFile(manifestPath, "utf8"));
  previousManifest = previous;
  const edited = [];
  for (const [relative, expected] of Object.entries(previous.arquivos ?? {})) {
    const file = path.join(target, relative);
    if (existsSync(file) && (await sha256(file)) !== expected) edited.push(relative);
  }
  if (edited.length) {
    // Alterações locais registradas (REPLICAR.md, 7.1), para marcar cada arquivo.
    const registryPath = path.join(referenceDir, "alteracoes-locais.json");
    let registered = new Set();
    try {
      registered = new Set((JSON.parse(await readFile(registryPath, "utf8")).alteracoes ?? []).map((item) => item?.arquivo));
    } catch {
      // Sem registro, ou registro ilegível: nada a marcar.
    }
    console.warn(`Atenção: estes arquivos da camada ${previous.versao} tinham sido editados no consumidor e vão para o backup:`);
    for (const relative of edited) console.warn(`- ${relative}${registered.has(relative) ? " (alteração local registrada)" : ""}`);
  }
  editedFiles = edited;
}

// O backup fica fora da raiz do consumidor (pasta temporária do sistema): dentro dela, lint, testes e
// conferências que leem todo arquivo achariam a camada antiga. Copia e apaga, porque a pasta temporária pode
// estar em outro disco, onde `rename` falha.
let backupRoot;
if (existing.length && force) {
  backupRoot = path.join(os.tmpdir(), `tema-mppa-backup-${new Date().toISOString().replace(/[:.]/g, "-")}`);
  await mkdir(backupRoot, { recursive: true });
  for (const { to } of existing) {
    // Uma imagem de comparação já saiu com a pasta dela.
    if (!existsSync(to)) continue;
    const backup = path.join(backupRoot, path.relative(target, to));
    await mkdir(path.dirname(backup), { recursive: true });
    await cp(to, backup, { recursive: true });
    await rm(to, { recursive: true, force: true });
  }
}
const updating = Boolean(backupRoot);

// Modo fixo, sem herdar o da origem (uma pasta copiada do Windows chega com 0777): 644, e 755 só para script
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

// Logos: são arquivos do sistema, não da camada. Entram só se faltam; um arquivo com o mesmo nome fica como
// está (sem backup nem --force), com aviso se difere do modelo.
const logoReport = [];
await mkdir(publicDir, { recursive: true });
for (const name of logoFiles) {
  const from = path.join(root, "public", name);
  const to = path.join(publicDir, name);
  if (!existsSync(from)) {
    logoReport.push(`${name}: ausente do modelo (pasta incompleta?)`);
  } else if (!existsSync(to)) {
    await cp(from, to);
    await chmod(to, 0o644);
    logoReport.push(`${name}: copiada`);
  } else if ((await sha256(to)) === (await sha256(from))) {
    logoReport.push(`${name}: já existia, igual à do modelo`);
  } else {
    logoReport.push(`${name}: já existia e difere da do modelo; mantida a do sistema (confira se é a logo certa)`);
  }
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

// Atualização: compara a camada nova com a lista da versão anterior do modelo (não com os arquivos do consumidor),
// para dizer se a camada visual mudou ou só os textos e scripts da referência.
let layerReport;
if (previousManifest?.arquivos) {
  const before = previousManifest.arquivos;
  const changed = Object.keys(files).filter((relative) => before[relative] !== files[relative]);
  const removed = Object.keys(before).filter((relative) => !(relative in files));
  layerReport = changed.length || removed.length
    ? `Camada visual: mudou desde a ${previousManifest.versao} (${changed.length} arquivo(s) novo(s) ou alterado(s), ${removed.length} removido(s)): ${[...changed, ...removed].join(", ")}`
    : `Camada visual: igual à da ${previousManifest.versao} (${Object.keys(files).length} arquivos com a mesma soma); mudaram só a referência e os scripts.`;
}

// O que está em docs/tema-mppa/ e esta versão do modelo não traz: resto de versão anterior (por exemplo,
// `preview-v2/`, que saiu na 2.0.0). Os arquivos do sistema que o roteiro põe ali (o diagnóstico e o registro de
// alterações locais) não entram no aviso. Só avisa.
const delivered = new Set([...sources.map(({ to }) => path.relative(referenceDir, to).split(path.sep)[0]), "camada.json", "alteracoes-locais.json", "diagnostico.md"]);
const extras = (await readdir(referenceDir)).filter((name) => !delivered.has(name)).sort();

const rel = (to) => path.relative(target, to) || ".";
console.log("Camada visual copiada:");
console.log(`- componentes: ${rel(path.join(componentsDir, "tema-mppa"))}/`);
console.log(`- cores e tokens: ${rel(path.join(stylesDir, "tema-mppa.css"))}`);
console.log(`- referência e guia do agente: ${rel(referenceDir)}/ (GUIA.html, REPLICAR.md, DESIGN.md, protótipo, prévias, comparações)`);
console.log(`- logos do cabeçalho em ${rel(publicDir)}/ (header.logos, REPLICAR.md 4.5):`);
for (const line of logoReport) console.log(`  - ${line}`);
if (backupRoot) {
  console.log(`Backup (fora do consumidor, numa pasta temporária que o sistema pode apagar): ${backupRoot}`);
  if (editedFiles.length) {
    console.warn("Até o registro de alterações locais citar a versão nova, o verificar-camada.mjs reprova: é o esperado logo depois da cópia. Os arquivos editados acima estão no backup. Para cada alteração registrada: se o arquivo é igual nas duas versões do modelo, volte-o do git (git checkout <branch> -- <arquivo>); se mudou, reaplique a alteração. Alteração que não está no git: copie-a do backup agora para um lugar que fique. Depois atualize o registro, inclusive a versão do modelo que ele cita (REPLICAR.md, 7.1).");
  }
}
console.log(`- lista de conferência: ${rel(manifestPath)} (versão ${version}); confira com: node ${rel(path.join(referenceDir, "verificar-camada.mjs"))}`);
console.log(`- conferência do DESIGN.md do sistema: node ${rel(path.join(referenceDir, "verificar-design.mjs"))} --css <CSS com os tokens próprios>`);
console.log(
  updating
    ? "Depois da cópia (atualização): apague a pasta tema-mppa-next/ e siga o REPLICAR.md, seção 7, a partir do fim do passo 3 (o que cita a versão da camada) e depois o 4 (CHANGELOG, DESIGN.md, verificação de 4.10)."
    : "Depois da cópia: apague a pasta tema-mppa-next/ e siga o REPLICAR.md, Fase 1, a partir do fim da 4.1 (conferências do consumidor que a cópia aciona) e depois 4.2. Depois da Fase 1, a Fase 2 (telas) e a Fase 3 (limpeza).",
);
if (layerReport) console.log(layerReport);
if (extras.length) {
  console.warn(`Atenção: ${rel(referenceDir)}/ tem itens que a versão ${version} do modelo não traz. Apague os que são resto de versão anterior (por exemplo, preview-v2/); mantenha o que for do sistema:`);
  for (const name of extras) console.warn(`- ${name}`);
}
if (staleFolders.length) {
  console.warn("Atenção: há outra pasta do modelo perto do consumidor. Apague estas (sem commit); depois desta cópia, apague também a pasta tema-mppa-next/ de onde você rodou o script:");
  for (const item of staleFolders) console.warn(`- ${item}`);
}
console.log("Nenhum arquivo de autenticação, BFF, API, rota ou regra de negócio foi alterado.");
