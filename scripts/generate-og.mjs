#!/usr/bin/env node
/**
 * Regenerates public/og.png (the social-share card) by rendering an HTML
 * template in headless Chromium. Run after changing name/role/branding:
 *   node scripts/generate-og.mjs
 * Requires a Chromium binary; set CHROMIUM_PATH if it isn't auto-detected.
 */
import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Geist Variable';src:url('/node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2') format('woff2-variations');font-weight:100 900}
@font-face{font-family:'Geist Mono Variable';src:url('/node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2') format('woff2-variations');font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#fafafa;font-family:'Geist Variable',sans-serif;
  display:flex;flex-direction:column;justify-content:space-between;padding:88px 96px;position:relative;overflow:hidden}
.rule{width:72px;height:2px;background:#2e5678;margin-bottom:40px}
h1{font-size:88px;font-weight:640;letter-spacing:-0.035em;color:#18181b;line-height:1.02}
.role{margin-top:26px;font-size:32px;color:#52525b;font-weight:480}
.bottom{display:flex;justify-content:space-between;align-items:baseline;
  font-family:'Geist Mono Variable',monospace;font-size:20px;letter-spacing:.12em;color:#71717a;text-transform:uppercase}
.cards{position:absolute;right:96px;top:88px;display:flex;flex-direction:column;gap:14px;opacity:.85}
.mini{width:230px;height:64px;border:1.5px solid #e4e4e7;border-radius:12px;background:#fff;display:flex;align-items:center;gap:12px;padding:0 18px}
.mini .dot{width:34px;height:24px;border-radius:5px;background:#f2f5f8;border:1px solid #e2e8ee}
.mini .lines{flex:1;display:flex;flex-direction:column;gap:6px}
.mini .l1{height:7px;border-radius:4px;background:#e4e4e7;width:75%}
.mini .l2{height:7px;border-radius:4px;background:#eef2f6;width:50%}
.mini:nth-child(2){opacity:.6}.mini:nth-child(3){opacity:.35}
</style></head><body>
<div>
  <div class="rule"></div>
  <h1>Hosni Berker</h1>
  <p class="role">Senior Software Engineer — New York, NY</p>
</div>
<div class="cards">
  <div class="mini"><div class="dot"></div><div class="lines"><div class="l1"></div><div class="l2"></div></div></div>
  <div class="mini"><div class="dot"></div><div class="lines"><div class="l1"></div><div class="l2"></div></div></div>
  <div class="mini"><div class="dot"></div><div class="lines"><div class="l1"></div><div class="l2"></div></div></div>
</div>
<div class="bottom"><span>hberker.github.io</span><span>Systems · AI · Film</span></div>
</body></html>`;

// tiny static server so Chromium can load the woff2 files
const server = createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(html);
  }
  try {
    const data = await readFile(join(ROOT, decodeURIComponent(req.url.split('?')[0])));
    res.writeHead(200, {
      'Content-Type': extname(req.url) === '.woff2' ? 'font/woff2' : 'application/octet-stream',
    });
    res.end(data);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, r));
const { port } = server.address();

const executablePath =
  process.env.CHROMIUM_PATH ??
  (await import('node:fs').then((fs) =>
    fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined
  ));

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.screenshot({ path: join(ROOT, 'public/og.png') });
await browser.close();
server.close();
console.log('public/og.png regenerated');
