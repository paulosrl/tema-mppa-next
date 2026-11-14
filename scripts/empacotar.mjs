#!/usr/bin/env node
/*
 * Gera a pasta entregue aos codebases consumidores, só com o que o desenvolvedor e o agente de lá usam:
 * o guia do desenvolvedor (GUIA.html), o roteiro do agente (REPLICAR.md), o formulário do diagnóstico, o
 * DESIGN.md da camada, a camada visual, as cores, as logos padrão, os scripts de cópia e de conferência (da
 * camada e do DESIGN.md) e a referência visual.
 * Cada arquivo sai com modo fixo: 644, e 755 só para script com shebang, seja qual for o modo no modelo.
 * A demonstração Next.js e as ferramentas de manutenção ficam fora.
 *
 * Uso: npm run empacotar [-- pasta-de-saida] [-- --substituir]   (padrão: a pasta acima do modelo)
 * Gera <saída>/tema-mppa-next-v<versão>/tema-mppa-next/, a pasta que o desenvolvedor copia para a raiz do
 * repositório. Dentro dela, SHA256SUMS (formato do `sha256sum`) lista a soma de cada arquivo; o
 * copy-template.mjs confere a pasta contra ela antes de copiar.
 *
 * Uma versão não sai duas vezes com conteúdo diferente: se a saída já tem a pasta desta versão e as somas
 * diferem, o script para; suba a versão, ou passe --substituir se aquela pasta nunca saiu desta máquina.
 */
import { createHash } from "node:crypto";
import { chmodSync, copyFileSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const args = process.argv.slice(2);
const replace = args.includes("--substituir");
const outputDir = path.resolve(args.find((arg) => !arg.startsWith("--")) ?? path.dirname(root));
const releaseDir = path.join(outputDir, `tema-mppa-next-v${version}`);
const packageDir = path.join(releaseDir, "tema-mppa-next");

const changelog = readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
if (changelog.match(/^## (\d+\.\d+\.\d+) /m)?.[1] !== version) {
  throw new Error(`O primeiro título do CHANGELOG deve ser "## ${version} — AAAA-MM-DD" (o copy-template lê a versão dali).`);
}

const files = [
  "GUIA.html",
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
  "docs/preview-v2/index.html",
  // Logos padrão do cabeçalho (REPLICAR, 4.5); o copy-template as leva ao public/ do consumidor.
  "public/mppa-logo.png",
  "public/ciia.png",
  "public/ciia-sigla.svg",
  ...readdirSync(path.join(root, "src/components/tema-mppa")).sort().map((file) => `src/components/tema-mppa/${file}`),
  ...readdirSync(path.join(root, "docs/comparacao"))
    .filter((file) => file.endsWith(".png"))
    .sort()
    .map((file) => `docs/comparacao/${file}`),
];

for (const file of files) {
  if (!existsSync(path.join(root, file))) throw new Error(`Arquivo ausente: ${file}`);
}

const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const sums = `${files.map((file) => `${sha256(path.join(root, file))}  ${file}`).join("\n")}\n`;

// Mesma versão já gerada: só segue se o conteúdo for o mesmo (ou com --substituir).
const previousSums = path.join(packageDir, "SHA256SUMS");
if (existsSync(releaseDir) && !replace) {
  if (!existsSync(previousSums) || readFileSync(previousSums, "utf8") !== sums) {
    throw new Error(
      `${releaseDir} já existe com outro conteúdo: a versão ${version} já foi gerada diferente. ` +
        "Suba a versão (package.json, CHANGELOG e documentos) ou, se aquela pasta nunca saiu desta máquina, rode de novo com --substituir.",
    );
  }
}

// Monta numa pasta temporária, com o modo de cada arquivo fixado, e só então troca a da saída.
const staging = mkdtempSync(path.join(os.tmpdir(), "tema-mppa-pasta-"));
try {
  const draft = path.join(staging, "tema-mppa-next");
  for (const file of files) {
    const to = path.join(draft, file);
    mkdirSync(path.dirname(to), { recursive: true });
    copyFileSync(path.join(root, file), to);
    chmodSync(to, readFileSync(to).subarray(0, 2).toString("utf8") === "#!" ? 0o755 : 0o644);
  }
  writeFileSync(path.join(draft, "SHA256SUMS"), sums, { mode: 0o644 });
  rmSync(releaseDir, { recursive: true, force: true });
  mkdirSync(releaseDir, { recursive: true });
  cpSync(draft, packageDir, { recursive: true });
} finally {
  rmSync(staging, { recursive: true, force: true });
}

console.log(`${packageDir}/ (${files.length} arquivos e SHA256SUMS)`);
console.log("Copie a pasta tema-mppa-next/ para a raiz do repositório consumidor.");
