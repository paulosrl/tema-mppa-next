#!/usr/bin/env node
/*
 * Gera docs/preview/index.html: a demonstração como página única, offline e autocontida, no
 * papel que o index.html do protótipo tinha na 1.0. É capturada do build de produção, então o HTML
 * e o CSS são os dos componentes reais; o JavaScript do Next é trocado por um script pequeno que
 * alterna os estados capturados (rota, barra recolhida, tema e menu móvel).
 *
 * Uso, com a demonstração rodando (npm run build && npx next start -p 3123) e o playwright-core
 * instalado fora do projeto:
 *   PLAYWRIGHT_CORE=/caminho/node_modules/playwright-core/index.mjs node scripts/gerar-preview.mjs [saida.html]
 * Variáveis: BASE_URL (padrão http://localhost:3123) e CHROMIUM (executável do Chromium).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// playwright-core não é dependência do modelo: instale-o fora e aponte PLAYWRIGHT_CORE para ele.
const { chromium } = await import(process.env.PLAYWRIGHT_CORE ?? "playwright-core");

const here = path.dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(readFileSync(path.join(here, "../package.json"), "utf8"));
const output = process.argv[2] ?? path.join(here, "../docs/preview/index.html");
const base = process.env.BASE_URL ?? "http://localhost:3123";
const exe =
  process.env.CHROMIUM ??
  `${process.env.HOME}/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`;

const routes = {
  platform: ["/", "/itens", "/compartilhados", "/automacoes"],
  administration: ["/administracao/curadoria", "/administracao/usuarios"],
};

const browser = await chromium.launch({ executablePath: exe });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

async function open(route, { collapsed = false, theme = "light" } = {}) {
  const page = await context.newPage();
  await page.addInitScript(
    ([c, t]) => {
      localStorage.setItem("tema-mppa-sidebar-collapsed", c ? "1" : "0");
      sessionStorage.setItem("tema-mppa-theme", t);
    },
    [collapsed, theme],
  );
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

// Estados da barra lateral e do cabeçalho, por rota e por barra recolhida.
const states = {};
for (const route of [...routes.platform, ...routes.administration]) {
  for (const collapsed of [false, true]) {
    const page = await open(route, { collapsed });
    states[`${route}|${collapsed ? 1 : 0}`] = await page.evaluate(() => ({
      aside: document.querySelector("aside").outerHTML,
      title: document.querySelector("header h1").parentElement.outerHTML,
    }));
    await page.close();
  }
}

const icons = {};
for (const theme of ["light", "dark"]) {
  const page = await open("/", { theme });
  icons[theme] = await page.evaluate(() => {
    const button = document.querySelector('header button[aria-label^="Tema"]');
    return { html: button.innerHTML, label: button.getAttribute("aria-label"), title: button.getAttribute("title") };
  });
  await page.close();
}

// Documento base: HTML renderizado, CSS e fontes embutidos, sem os scripts do Next.
const page = await open("/");
const cssUrls = await page.evaluate(() => [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => link.href));
let css = "";
for (const url of cssUrls) {
  let text = await (await page.request.get(url)).text();
  for (const [match, relative] of [...text.matchAll(/url\(([^)]+\.woff2)\)/g)]) {
    const fontUrl = new URL(relative.replace(/["']/g, ""), url).href;
    const font = await (await page.request.get(fontUrl)).body();
    text = text.replaceAll(match, `url(data:font/woff2;base64,${font.toString("base64")})`);
  }
  css += text;
}
const html = await page.evaluate(() => {
  const root = document.documentElement.cloneNode(true);
  root.querySelectorAll("script, link, next-route-announcer, nextjs-portal, template").forEach((node) => node.remove());
  root.querySelectorAll("[hidden]").forEach((node) => {
    if (!node.closest("aside, main, header")) node.remove();
  });
  root.className = root.className.replace(/\b(dark|light)\b/g, "").trim() + " light";
  return root.outerHTML;
});
await page.close();
await browser.close();

const runtime = `
(() => {
  const STATES = ${JSON.stringify(states)};
  const ICONS = ${JSON.stringify(icons)};
  const ROUTES = ${JSON.stringify(routes)};
  const store = {
    get(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} },
  };
  const state = {
    route: "/",
    collapsed: store.get("tema-mppa-sidebar-collapsed", "0") === "1",
    theme: store.get("tema-mppa-preview-theme", "light"),
    mobileOpen: false,
    last: { platform: "/", administration: "/administracao/curadoria" },
  };
  const OVERLAY = '<button type="button" class="fixed inset-0 z-40 bg-overlay/40 desk:hidden" aria-label="Fechar menu lateral" data-preview-overlay></button>';

  function render() {
    const snapshot = STATES[state.route + "|" + (state.collapsed ? 1 : 0)];
    const aside = document.querySelector("aside");
    aside.outerHTML = snapshot.aside;
    document.querySelector("header h1").parentElement.outerHTML = snapshot.title;
    document.querySelector("[data-preview-overlay]")?.remove();
    const fresh = document.querySelector("aside");
    if (state.mobileOpen) {
      fresh.classList.replace("-translate-x-full", "translate-x-0");
      fresh.insertAdjacentHTML("beforebegin", OVERLAY);
    }
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(state.theme);
    root.style.colorScheme = state.theme;
    const toggle = document.querySelector('header button[aria-label^="Tema"]');
    toggle.innerHTML = ICONS[state.theme].html;
    toggle.setAttribute("aria-label", state.theme === "light" ? "Tema: Claro. Alterar para Escuro" : "Tema: Escuro. Alterar para Claro");
    toggle.title = ICONS[state.theme].title;
  }

  function sectionOf(route) {
    return ROUTES.administration.includes(route) ? "administration" : "platform";
  }

  function go(route) {
    if (!STATES[route + "|0"]) route = "/";
    state.route = route;
    state.last[sectionOf(route)] = route;
    state.mobileOpen = false;
    render();
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("a, button");
    if (!target) return;
    const label = target.getAttribute("aria-label") ?? "";
    if (target.matches("aside a[href]")) {
      event.preventDefault();
      go(new URL(target.href).pathname);
    } else if (target.matches('[role="tab"]')) {
      const section = target.closest('[role="tablist"]').firstElementChild === target ? "platform" : "administration";
      go(state.last[section]);
    } else if (label === "Recolher menu lateral" || label === "Expandir menu lateral") {
      state.collapsed = !state.collapsed;
      store.set("tema-mppa-sidebar-collapsed", state.collapsed ? "1" : "0");
      render();
    } else if (label === "Abrir menu lateral") {
      state.mobileOpen = true;
      render();
    } else if (label === "Fechar menu lateral") {
      state.mobileOpen = false;
      render();
    } else if (label.startsWith("Tema")) {
      state.theme = state.theme === "light" ? "dark" : "light";
      store.set("tema-mppa-preview-theme", state.theme);
      render();
    } else if (label === "Abrir busca" || label.endsWith("Abrir opções da conta")) {
      target.title = "Disponível na aplicação Next.js; nesta prévia estática, só a aparência.";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.mobileOpen) {
      state.mobileOpen = false;
      render();
    }
    if (event.key.toLowerCase() === "b" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      state.collapsed = !state.collapsed;
      store.set("tema-mppa-sidebar-collapsed", state.collapsed ? "1" : "0");
      render();
    }
  });

  render();
})();
`;

const finalHtml = html
  .replace(/<title>[^<]*<\/title>/, `<title>Template Visual MPPA v${version}</title>`)
  .replace("</head>", `<style>${css}</style></head>`)
  .replace("</body>", `<script>${runtime}</script></body>`);

writeFileSync(output, `<!doctype html>\n${finalHtml}\n`);
console.log(`Prévia gravada em ${output} (${Math.round(finalHtml.length / 1024)} KB)`);
