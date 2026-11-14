// playwright-core não é dependência do modelo: instale-o fora e aponte PLAYWRIGHT_CORE para ele.
const { chromium } = await import(process.env.PLAYWRIGHT_CORE ?? "playwright-core");
import { existsSync, readFileSync, readdirSync } from "node:fs";
// Chromium: CHROMIUM, ou o headless shell mais novo que o Playwright instalou em ~/.cache/ms-playwright.
function newestHeadlessShell() {
  const cache = `${process.env.HOME}/.cache/ms-playwright`;
  const revision = (name) => Number(name.split("-").at(-1));
  const latest = (existsSync(cache) ? readdirSync(cache) : []).filter((name) => /^chromium_headless_shell-\d+$/.test(name)).sort((a, b) => revision(b) - revision(a))[0];
  if (!latest) throw new Error("Sem Chromium do Playwright: rode `npx playwright install chromium` ou aponte CHROMIUM para um executável.");
  return `${cache}/${latest}/chrome-headless-shell-linux64/chrome-headless-shell`;
}
const exe = process.env.CHROMIUM ?? newestHeadlessShell();
const browser = await chromium.launch({ executablePath: exe });
const [dir, outDir] = process.argv.slice(2);
const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
for (const width of [1280, 390]) for (const theme of ["light", "dark"]) {
  const img = (n) => "data:image/png;base64," + readFileSync(`${dir}/${n}-${width}-${theme}.png`).toString("base64");
  const bg = theme === "dark" ? "#000" : "#e4e4e7", fg = theme === "dark" ? "#fafafa" : "#18181b";
  const html = `<body style="margin:0;background:${bg};color:${fg};font:600 15px system-ui;display:flex;gap:16px;padding:16px;align-items:flex-start;width:max-content">
  <figure style="margin:0"><figcaption style="padding:0 0 8px">Protótipo (index.html), só a estrutura · ${width}px · ${theme === "dark" ? "escuro" : "claro"}</figcaption><img src="${img("prototipo")}" style="display:block;outline:1px solid #888"></figure>
  <figure style="margin:0"><figcaption style="padding:0 0 8px">Template ${version} · ${width}px · ${theme === "dark" ? "escuro" : "claro"}</figcaption><img src="${img("template")}" style="display:block;outline:1px solid #888"></figure></body>`;
  const page = await browser.newPage({ viewport: { width: 100, height: 100 } });
  await page.setContent(html);
  await page.screenshot({ path: `${outDir}/comparacao-${width}-${theme === "dark" ? "escuro" : "claro"}.png`, fullPage: true });
  await page.close();
}
await browser.close();
