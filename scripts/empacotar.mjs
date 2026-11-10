#!/usr/bin/env node
/*
 * Gera o zip entregue aos codebases consumidores, só com o que o agente de lá usa:
 * o guia (REPLICAR.md), o formulário do diagnóstico, o DESIGN.md da camada, a camada visual, as cores, os
 * scripts de cópia e de conferência (da camada e do DESIGN.md) e a referência visual.
 * Cada entrada sai com modo fixo: 644, e 755 só para script com shebang, seja qual for o modo na pasta.
 * A demonstração Next.js e as ferramentas de manutenção ficam fora.
 *
 * Uso: npm run empacotar [-- pasta-de-saida]   (padrão: a pasta acima do modelo)
 * Gera tema-mppa-next-v<versão>.zip e o .sha256 ao lado. Requer o comando `zip`.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const outputDir = path.resolve(process.argv[2] ?? path.dirname(root));
const zipName = `tema-mppa-next-v${version}.zip`;
const zipPath = path.join(outputDir, zipName);

const files = [
  "REPLICAR.md",
  "DIAGNOSTICO.md",
  "CHANGELOG.md",
  "LICENSE",
  "DESIGN.md",
  "scripts/copy-template.mjs",
  "scripts/verificar-camada.mjs",
  "scripts/verificar-design.mjs",
  "src/styles/tema-mppa.css",
  "docs/prototipo/index.html",
  "docs/preview/index.html",
  ...readdirSync(path.join(root, "src/components/tema-mppa")).map((file) => `src/components/tema-mppa/${file}`),
  ...readdirSync(path.join(root, "docs/comparacao"))
    .filter((file) => file.endsWith(".png"))
    .map((file) => `docs/comparacao/${file}`),
];

for (const file of files) {
  if (!existsSync(path.join(root, file))) throw new Error(`Arquivo ausente: ${file}`);
}

// Preparo numa pasta temporária com a pasta raiz "tema-mppa-next/" e o modo de cada arquivo fixado.
const staging = mkdtempSync(path.join(os.tmpdir(), "tema-mppa-zip-"));
try {
  for (const file of files) {
    const to = path.join(staging, "tema-mppa-next", file);
    mkdirSync(path.dirname(to), { recursive: true });
    copyFileSync(path.join(root, file), to);
    chmodSync(to, readFileSync(to).subarray(0, 2).toString("utf8") === "#!" ? 0o755 : 0o644);
  }
  rmSync(zipPath, { force: true });
  execFileSync("zip", ["-q", "-X", "-D", zipPath, ...files.map((file) => path.join("tema-mppa-next", file))], { cwd: staging });
} finally {
  rmSync(staging, { recursive: true, force: true });
}

const hash = createHash("sha256").update(readFileSync(zipPath)).digest("hex");
writeFileSync(`${zipPath}.sha256`, `${hash}  ${zipName}\n`);

console.log(`${zipPath} (${files.length} arquivos)`);
console.log(`${hash}  ${zipName}`);
