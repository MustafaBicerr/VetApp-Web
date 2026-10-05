#!/usr/bin/env node
// VetApp tanıtım sitesi derleyicisi: src/site.mjs → kök dizinde statik HTML + sitemap.xml + robots.txt.
// Kullanım: node build.mjs        (sunucuda derleme GEREKMEZ; çıktı repoya commit edilir)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { pages, notFound, layout, setBuildId, SITE } from './src/site.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const hash = (f) => crypto.createHash('md5').update(fs.readFileSync(path.join(root, f))).digest('hex').slice(0, 8);
setBuildId(hash('assets/css/site.css') + hash('assets/js/site.js'));

const all = [...pages, notFound];
for (const p of all) {
  fs.writeFileSync(path.join(root, p.file), layout(p, p.body()));
  console.log('yazıldı', p.file);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .map((p) => `  <url>\n    <loc>${SITE}${p.path === '/' ? '/' : p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`)
  .join('\n');
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(root, 'site.webmanifest'), JSON.stringify({
  name: 'VetApp', short_name: 'VetApp', start_url: '/', display: 'browser', background_color: '#ffffff', theme_color: '#0A70C8', lang: 'tr',
  icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');
console.log('sitemap.xml, robots.txt, site.webmanifest güncellendi');
