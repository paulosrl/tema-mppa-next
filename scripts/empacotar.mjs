#!/usr/bin/env node
/*
 * Gera o zip entregue aos codebases consumidores, só com o que o agente de lá usa:
 * o guia (REPLICAR.md), o formulário do diagnóstico, a camada visual, as cores, os scripts de cópia e de
 * conferência da camada e a referência visual.
 * A demonstração Next.js e as ferramentas de manutenção ficam fora.
 *
 * Uso: npm run empacotar [-- pasta-de-saida]   (padrão: a pasta acima do modelo)
 * Gera tema-mppa-next-v<versão>.zip e o .sha256 ao lado. Requer o comando `zip`.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const name = path.basename(root);
const { version } = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const outputDir = path.resolve(process.argv[2] ?? path.dirname(root));
const zipName = `tema-mppa-next-v${version}.zip`;
const zipPath = path.join(outputDir, zipName);

const files = [
  "REPLICAR.md",
  "DIAGNOSTICO.md",
  "CHANGELOG.md",
  "LICENSE",
  "scripts/copy-template.mjs",
  "scripts/verificar-camada.mjs",
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

rmSync(zipPath, { force: true });
execFileSync("zip", ["-q", "-X", zipPath, ...files.map((file) => path.join(name, file))], { cwd: path.dirname(root) });

const hash = createHash("sha256").update(readFileSync(zipPath)).digest("hex");
writeFileSync(`${zipPath}.sha256`, `${hash}  ${zipName}\n`);

console.log(`${zipPath} (${files.length} arquivos)`);
console.log(`${hash}  ${zipName}`);
