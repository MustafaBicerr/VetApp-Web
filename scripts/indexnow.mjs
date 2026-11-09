#!/usr/bin/env node
// Yeni/güncellenen sayfaları IndexNow ile Bing, Yandex ve diğer katılımcı arama motorlarına bildirir.
// (ChatGPT arama ve Copilot, Bing dizinini kullanır; bu yüzden hızlı indekslenmek önemlidir.)
//
// Kullanım — site CANLIYA ALINDIKTAN SONRA çalıştırın:
//   node scripts/indexnow.mjs                 → sitemap.xml'deki bütün adresler
//   node scripts/indexnow.mjs /blog/yeni-yazi → yalnızca verilen yollar
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'www.vetapp.com.tr';
const keyFile = fs.readdirSync(root).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) { console.error('IndexNow anahtar dosyası bulunamadı. Önce `node build.mjs` çalıştırın.'); process.exit(1); }
const key = keyFile.replace('.txt', '');

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? '' : '/'}${p}`))
  : [...fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} adres gönderildi`);
if (res.status >= 300) { console.log(await res.text()); process.exit(1); }
