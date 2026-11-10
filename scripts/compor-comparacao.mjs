// playwright-core não é dependência do modelo: instale-o fora e aponte PLAYWRIGHT_CORE para ele.
const { chromium } = await import(process.env.PLAYWRIGHT_CORE ?? "playwright-core");
import { readFileSync } from "node:fs";
const exe = process.env.CHROMIUM ?? process.env.HOME + "/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: exe });
const [dir, outDir] = process.argv.slice(2);
for (const width of [1280, 390]) for (const theme of ["light", "dark"]) {
  const img = (n) => "data:image/png;base64," + readFileSync(`${dir}/${n}-${width}-${theme}.png`).toString("base64");
  const bg = theme === "dark" ? "#000" : "#e4e4e7", fg = theme === "dark" ? "#fafafa" : "#18181b";
  const html = `<body style="margin:0;background:${bg};color:${fg};font:600 15px system-ui;display:flex;gap:16px;padding:16px;align-items:flex-start;width:max-content">
  <figure style="margin:0"><figcaption style="padding:0 0 8px">Protótipo (index.html) · ${width}px · ${theme === "dark" ? "escuro" : "claro"}</figcaption><img src="${img("prototipo")}" style="display:block;outline:1px solid #888"></figure>
  <figure style="margin:0"><figcaption style="padding:0 0 8px">Template 1.1.0 · ${width}px · ${theme === "dark" ? "escuro" : "claro"}</figcaption><img src="${img("template")}" style="display:block;outline:1px solid #888"></figure></body>`;
  const page = await browser.newPage({ viewport: { width: 100, height: 100 } });
  await page.setContent(html);
  await page.screenshot({ path: `${outDir}/comparacao-${width}-${theme === "dark" ? "escuro" : "claro"}.png`, fullPage: true });
  await page.close();
}
await browser.close();
