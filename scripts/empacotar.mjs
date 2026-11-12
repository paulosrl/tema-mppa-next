#!/usr/bin/env node
/*
 * Gera o zip entregue aos codebases consumidores, só com o que o desenvolvedor e o agente de lá usam:
 * o guia do desenvolvedor (GUIA.html), o roteiro do agente (REPLICAR.md), o formulário do diagnóstico, o
 * DESIGN.md da camada, a camada visual, as cores, os scripts de cópia e de conferência (da camada e do
 * DESIGN.md) e a referência visual.
 * Cada entrada sai com modo fixo: 644, e 755 só para script com shebang, seja qual for o modo na pasta.
 * A demonstração Next.js e as ferramentas de manutenção ficam fora.
 *
 * Uso: npm run empacotar [-- pasta-de-saida] [-- --substituir]   (padrão: a pasta acima do modelo)
 * Gera tema-mppa-next-v<versão>.zip e, ao lado, a soma tema-mppa-next-v<versão>.zip.sha256 (formato do
 * `sha256sum`). Requer o comando `zip`.
 *
 * O zip é reprodutível: mesmo conteúdo, mesma soma (data fixa em cada entrada, a do título da versão no
 * CHANGELOG, e ordem fixa). Uma versão não sai duas vezes com conteúdo diferente: se a pasta de saída já tem a
 * soma desta versão e o zip novo difere, o script para; suba a versão, ou passe --substituir se aquele zip
 * nunca saiu desta máquina.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const args = process.argv.slice(2);
const replace = args.includes("--substituir");
const outputDir = path.resolve(args.find((arg) => !arg.startsWith("--")) ?? path.dirname(root));
const zipName = `tema-mppa-next-v${version}.zip`;
const zipPath = path.join(outputDir, zipName);
const sumPath = `${zipPath}.sha256`;

// Data de cada entrada: meio-dia (UTC) do dia da versão, tirado do primeiro título do CHANGELOG.
const changelog = readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
const release = changelog.match(/^## (\d+\.\d+\.\d+) — (\d{4}-\d{2}-\d{2})/m);
if (release?.[1] !== version) throw new Error(`O primeiro título do CHANGELOG deve ser "## ${version} — AAAA-MM-DD".`);
const entryDate = new Date(`${release[2]}T12:00:00Z`);

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

// Preparo numa pasta temporária com a pasta raiz "tema-mppa-next/", o modo e a data de cada arquivo fixados.
// O zip nasce na pasta temporária e só vai para a saída depois de conferido contra a soma já publicada.
const staging = mkdtempSync(path.join(os.tmpdir(), "tema-mppa-zip-"));
let sum;
try {
  for (const file of files) {
    const to = path.join(staging, "tema-mppa-next", file);
    mkdirSync(path.dirname(to), { recursive: true });
    copyFileSync(path.join(root, file), to);
    chmodSync(to, readFileSync(to).subarray(0, 2).toString("utf8") === "#!" ? 0o755 : 0o644);
    utimesSync(to, entryDate, entryDate);
  }
  const draft = path.join(staging, zipName);
  execFileSync("zip", ["-q", "-X", "-D", draft, ...files.map((file) => path.join("tema-mppa-next", file))], {
    cwd: staging,
    env: { ...process.env, TZ: "UTC" },
  });
  sum = createHash("sha256").update(readFileSync(draft)).digest("hex");
  const published = existsSync(sumPath) ? readFileSync(sumPath, "utf8").split(/\s+/)[0] : null;
  if (published && published !== sum && !replace) {
    throw new Error(
      `${path.basename(sumPath)} já existe com outra soma (${published}): a versão ${version} já foi empacotada com outro conteúdo. ` +
        "Suba a versão (package.json, CHANGELOG e documentos) ou, se aquele zip nunca saiu desta máquina, rode de novo com --substituir.",
    );
  }
  mkdirSync(outputDir, { recursive: true });
  rmSync(zipPath, { force: true });
  copyFileSync(draft, `${zipPath}.tmp`);
  renameSync(`${zipPath}.tmp`, zipPath);
  writeFileSync(sumPath, `${sum}  ${zipName}\n`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}

console.log(`${zipPath} (${files.length} arquivos)`);
console.log(`SHA-256 ${sum} (em ${path.basename(sumPath)})`);
