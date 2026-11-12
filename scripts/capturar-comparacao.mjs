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
const base = process.env.BASE_URL ?? "http://localhost:3123";
const font = process.argv[2]; // url da Outfit servida pelo Next
const out = process.argv[3] ?? ".";
const prototype = process.env.PROTOTIPO ?? "docs/prototipo/index.html";
const route = process.argv[4] ?? "/";
for (const width of [1280, 390]) for (const theme of ["light", "dark"]) {
  const viewport = { width, height: width === 390 ? 844 : 900 };
  // Protótipo, com a Outfit disponível (como numa máquina que a tem instalada).
  let page = await browser.newPage({ viewport });
  await page.route("**/prototipo.html", (r) => r.fulfill({ contentType: "text/html", body: readFileSync(prototype, "utf8").replace("<style>", `<style>@font-face{font-family:Outfit;src:url(${base}${font}) format("woff2");font-weight:100 900}`) }));
  await page.goto(base + "/prototipo.html");
  if (theme === "dark") await page.evaluate(() => (document.documentElement.dataset.theme = "dark"));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/prototipo-${width}-${theme}.png`, fullPage: true });
  await page.close();
  // Template.
  page = await browser.newPage({ viewport });
  await page.addInitScript((t) => sessionStorage.setItem("tema-mppa-theme", t), theme);
  await page.goto(base + route);
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(width, theme, "rolagem horizontal da página:", overflow);
  await page.screenshot({ path: `${out}/template-${width}-${theme}.png`, fullPage: true });
  await page.close();
}
await browser.close();
