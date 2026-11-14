#!/usr/bin/env node
/*
 * Confere, no codebase consumidor, se a camada visual tema-mppa está igual à versão copiada do modelo.
 * O copy-template.mjs grava este script e o camada.json (versão e SHA-256 de cada arquivo) em
 * docs/tema-mppa/. Reprova arquivo editado, ausente ou a mais na pasta da camada.
 *
 * Alteração local registrada: se existir docs/tema-mppa/alteracoes-locais.json, um arquivo editado que está lá
 * não reprova (REPLICAR.md, 7.1). Formato (outros campos são livres):
 *   { "versaoDoModelo": "<versão do camada.json>", "alteracoes": [{ "arquivo": "components/tema-mppa/app-sidebar.tsx", "motivo": "…" }] }
 * `arquivo` é relativo à raiz do consumidor, como no camada.json; com `sha256`, o arquivo tem de ter essa soma.
 * Reprova o registro que cita outra versão do modelo, ou um arquivo que não está editado.
 *
 * Uso, da raiz do consumidor (a pasta do package.json do frontend):
 *   node docs/tema-mppa/verificar-camada.mjs
 * Saída 0: camada íntegra (ou só com alterações registradas). Saída 1: diferenças, uma por linha.
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

// Registro das alterações locais, se houver.
const registryPath = path.join(here, "alteracoes-locais.json");
const registered = new Map();
const problems = [];
if (existsSync(registryPath)) {
  let registry;
  try {
    registry = JSON.parse(readFileSync(registryPath, "utf8"));
  } catch (error) {
    problems.push(`alteracoes-locais.json: não é JSON válido (${error.message})`);
  }
  if (registry) {
    if (registry.versaoDoModelo !== manifest.versao) {
      problems.push(`alteracoes-locais.json: cita a versão ${registry.versaoDoModelo ?? "(nenhuma)"} do modelo, e a camada é a ${manifest.versao}; confira cada alteração e atualize "versaoDoModelo" (REPLICAR.md, 7.1)`);
    }
    for (const item of registry.alteracoes ?? []) {
      if (typeof item?.arquivo === "string") registered.set(item.arquivo.split(path.sep).join("/"), item);
    }
  }
}

const notes = [];
for (const [relative, expected] of Object.entries(manifest.arquivos)) {
  const absolute = path.join(root, relative);
  const item = registered.get(relative);
  registered.delete(relative);
  if (!existsSync(absolute)) {
    problems.push(`${relative}: ausente`);
    continue;
  }
  const actual = sha256(absolute);
  if (actual === expected) {
    if (item) problems.push(`${relative}: registrado em alteracoes-locais.json, mas igual ao modelo; tire o registro ou reaplique a alteração`);
  } else if (!item) {
    problems.push(`${relative}: editado (difere da versão ${manifest.versao} do modelo)`);
  } else if (item.sha256 && item.sha256 !== actual) {
    problems.push(`${relative}: editado, e difere da alteração registrada (sha256 em alteracoes-locais.json)`);
  } else {
    notes.push(`${relative}: alteração local registrada`);
  }
}
for (const relative of registered.keys()) problems.push(`${relative}: registrado em alteracoes-locais.json, mas não é arquivo da camada`);
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
  console.error("A camada não se edita: o que é do sistema entra por configuração. Desfaça a edição, registre-a em docs/tema-mppa/alteracoes-locais.json (REPLICAR.md, 7.1) ou leve a necessidade ao modelo.");
  process.exit(1);
}
console.log(`Camada tema-mppa ${manifest.versao} íntegra (${Object.keys(manifest.arquivos).length} arquivos${notes.length ? `; ${notes.length} com alteração local registrada` : ""}).`);
for (const note of notes) console.log(`- ${note}`);
