#!/usr/bin/env node
/*
 * Confere, no codebase consumidor, se a camada visual tema-mppa está igual à versão copiada do modelo.
 * O copy-template.mjs grava este script e o camada.json (versão e SHA-256 de cada arquivo) em
 * docs/tema-mppa/. Reprova arquivo editado, ausente ou a mais na pasta da camada.
 *
 * Uso, da raiz do consumidor (a pasta do package.json do frontend):
 *   node docs/tema-mppa/verificar-camada.mjs
 * Saída 0: camada íntegra. Saída 1: diferenças, uma por linha.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(here, "camada.json");
if (!existsSync(manifestPath)) {
  console.error(`Sem ${manifestPath}: copie a camada com o copy-template.mjs do modelo.`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const root = path.resolve(here, manifest.raiz);
const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");

function listFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const absolute = path.join(directory, name);
    return statSync(absolute).isDirectory() ? listFiles(absolute) : [absolute];
  });
}

const problems = [];
for (const [relative, expected] of Object.entries(manifest.arquivos)) {
  const absolute = path.join(root, relative);
  if (!existsSync(absolute)) problems.push(`${relative}: ausente`);
  else if (sha256(absolute) !== expected) problems.push(`${relative}: editado (difere da versão ${manifest.versao} do modelo)`);
}
const componentsDir = path.join(root, manifest.componentes);
if (existsSync(componentsDir)) {
  for (const absolute of listFiles(componentsDir)) {
    const relative = path.relative(root, absolute).split(path.sep).join("/");
    if (!(relative in manifest.arquivos)) problems.push(`${relative}: a mais (não faz parte da camada)`);
  }
}

if (problems.length) {
  console.error(`Camada tema-mppa ${manifest.versao} com diferenças:`);
  for (const problem of problems) console.error(`- ${problem}`);
  console.error("A camada não se edita: o que é do sistema entra por configuração. Desfaça a edição ou leve a necessidade ao modelo.");
  process.exit(1);
}
console.log(`Camada tema-mppa ${manifest.versao} íntegra (${Object.keys(manifest.arquivos).length} arquivos).`);
