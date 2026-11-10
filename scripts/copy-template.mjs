#!/usr/bin/env node

import { cp, mkdir, rename, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const targetArg = process.argv[2];
const force = process.argv.includes("--force");

if (!targetArg) {
  console.error("Uso: node scripts/copy-template.mjs /caminho/do/consumidor [--force]");
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

const sources = [
  {
    from: path.join(root, "src/components/tema-mppa"),
    to: path.join(target, "src/components/tema-mppa"),
  },
  {
    from: path.join(root, "src/styles/tema-mppa.css"),
    to: path.join(target, "src/styles/tema-mppa.css"),
  },
];

const existing = sources.filter(({ to }) => existsSync(to));
if (existing.length && !force) {
  console.error("O destino já contém arquivos do template. Revise o diff ou execute novamente com --force:");
  for (const item of existing) console.error(`- ${item.to}`);
  process.exit(2);
}

let backupRoot;
if (existing.length && force) {
  backupRoot = path.join(target, `.tema-mppa-backup-${new Date().toISOString().replace(/[:.]/g, "-")}`);
  await mkdir(backupRoot, { recursive: true });
  for (const { to } of existing) {
    const relative = path.relative(target, to);
    const backup = path.join(backupRoot, relative);
    await mkdir(path.dirname(backup), { recursive: true });
    await rename(to, backup);
  }
}

for (const { from, to } of sources) {
  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to, { recursive: true });
}

console.log("Camada visual copiada com sucesso.");
if (backupRoot) console.log(`Backup: ${backupRoot}`);
console.log("Próximos passos:");
console.log("1. Importe src/styles/tema-mppa.css no globals.css.");
console.log("2. Fixe as dependências: react/react-dom 19.2.3, @base-ui/react 1.9.0, @tanstack/react-query 5.102.8, lucide-react 1.46.0, tailwind-merge 3.6.0, class-variance-authority e clsx.");
console.log("3. Configure ShellConfig e passe a sessão existente ao AppShell.");
console.log("4. Execute typecheck, lint e build do consumidor.");
console.log("Nenhum arquivo de autenticação, BFF, API, rota ou regra de negócio foi alterado.");
