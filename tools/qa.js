// usage: node qa.js <siteDir> <outDir>
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const [site, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  let f = path.join(site, p); if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
  if (!fs.existsSync(f)) { res.writeHead(404, { 'content-type': types['.html'] }); return res.end(fs.readFileSync(path.join(site, '404.html'))); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); res.end(fs.readFileSync(f));
}).listen(0);
const base = `http://127.0.0.1:${srv.address().port}`;
const axe = fs.readFileSync(path.join(__dirname, 'node_modules/axe-core/axe.min.js'), 'utf8');
const pages = fs.readdirSync(site).filter(f => f.endsWith('.html'));
(async () => {
  const b = await chromium.launch(); let fail = 0; const broken = new Set();
  for (const w of [390, 1280]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    for (const f of pages) {
      const url = f === '404.html' ? base + '/no/such/page' : base + '/' + f;
      const r = await pg.goto(url, { waitUntil: 'load' });
      const m = await pg.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
        links: [...document.querySelectorAll('a[href]')].map(a => a.href), imgsNoAlt: [...document.querySelectorAll('img:not([alt])')].length,
        h1: document.querySelectorAll('h1').length, lang: document.documentElement.lang }));
      await pg.addScriptTag({ content: axe });
      const ax = await pg.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] })).violations.map(v => `${v.id}(${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0,2).map(n=>n.target.join(' ')).join(' | ')}`));
      const overflow = m.sw > m.cw;
      if (overflow || ax.length || m.imgsNoAlt || m.h1 !== 1 || !m.lang) fail++;
      console.log(`${w}px ${f} status=${r.status()} overflow=${overflow}(${m.sw}/${m.cw}) h1=${m.h1} lang=${m.lang} noAlt=${m.imgsNoAlt} axe=${ax.length ? '\n   ' + ax.join('\n   ') : 'clean'}`);
      if (f !== '404.html') m.links.filter(l => l.startsWith(base)).forEach(l => broken.add(l.split('#')[0]));
      await pg.screenshot({ path: path.join(out, `${f.replace('.html', '')}-${w}.png`), fullPage: w === 390 ? false : false });
      await pg.screenshot({ path: path.join(out, `${f.replace('.html', '')}-${w}-full.png`), fullPage: true });
    }
    await ctx.close();
  }
  // internal link + fragment check
  for (const l of broken) { const r = await fetch(l); if (r.status !== 200) { fail++; console.log('BROKEN LINK', l, r.status); } }
  const ctx = await b.newContext(); const pg = await ctx.newPage();
  for (const f of pages) { await pg.goto(base + '/' + f);
    const bad = await pg.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1)))));
    if (bad.length) { fail++; console.log('BROKEN ANCHORS', f, bad); } }
  console.log(fail ? `FAIL ${fail}` : 'ALL PASS'); await b.close(); srv.close();
})();
