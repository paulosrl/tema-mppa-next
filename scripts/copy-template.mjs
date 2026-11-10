#!/usr/bin/env node

import { cp, mkdir, readdir, rename, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
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

const comparisons = (await readdir(path.join(root, "docs/comparacao"))).filter((name) => name.endsWith(".png"));

const sources = [
  { from: path.join(root, "src/components/tema-mppa"), to: path.join(componentsDir, "tema-mppa") },
  { from: path.join(root, "src/styles/tema-mppa.css"), to: path.join(stylesDir, "tema-mppa.css") },
  { from: path.join(root, "REPLICAR.md"), to: path.join(referenceDir, "REPLICAR.md") },
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

for (const { from, to } of sources) {
  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to, { recursive: true });
}

const rel = (to) => path.relative(target, to) || ".";
console.log("Camada visual copiada:");
console.log(`- componentes: ${rel(path.join(componentsDir, "tema-mppa"))}/`);
console.log(`- cores e tokens: ${rel(path.join(stylesDir, "tema-mppa.css"))}`);
console.log(`- referência e guia do agente: ${rel(referenceDir)}/ (REPLICAR.md, protótipo, prévia, comparações)`);
if (backupRoot) console.log(`Backup: ${rel(backupRoot)}`);
console.log("Próximos passos (detalhes em docs/tema-mppa/REPLICAR.md, seções 2.2 a 7):");
console.log("1. Fixe as dependências: react/react-dom 19.2.3, @base-ui/react 1.9.0, @tanstack/react-query 5.102.8, lucide-react 1.46.0, tailwind-merge 3.6.0, class-variance-authority 0.7.1 e clsx 2.1.1.");
console.log(`2. Importe ${rel(path.join(stylesDir, "tema-mppa.css"))} no CSS global, depois de @import "tailwindcss".`);
console.log("3. Carregue a Outfit, o THEME_BOOT_SCRIPT e o TemaMppaProvider no layout raiz.");
console.log("4. Configure ShellConfig e passe a sessão existente ao AppShell; repinte as telas com os primitivos.");
console.log("5. Execute typecheck, lint e build do consumidor e compare com docs/tema-mppa/comparacao/.");
console.log("Nenhum arquivo de autenticação, BFF, API, rota ou regra de negócio foi alterado.");
