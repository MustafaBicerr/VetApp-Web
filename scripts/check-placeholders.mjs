#!/usr/bin/env node
// Yayın güvenliği: hukuk sayfalarında (gizlilik, kullanım şartları, hesap silme) doldurulmamış `{{YER_TUTUCU}}` kalırsa HATA verir.
// Değerler src/legal.mjs'de tutulur; sahip doldurana kadar `npm run build` ve `npm run deploy` bilerek DURUR.
//
// Kullanım:
//   node scripts/check-placeholders.mjs            üretilmiş çıktıyı (kökteki *.html, blog/*.html, *.txt, *.xml) tarar; build sonrası çalışır
//   node scripts/check-placeholders.mjs --source   build'den ÖNCE: hukuk sayfalarını kaynaktan (src/) bellekte üretip tarar
// Çıkış kodu: yer tutucu yoksa 0, varsa 1. npm run build ve npm run deploy zincirinde çağrılır (package.json);
// scripts/stage.mjs de aynı denetimi yapar (dist/ yer tutuculu hiçbir şey almaz). `build:draft` yalnız yerel önizleme içindir.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN = /\{\{[^{}]*\}\}/g;
const SCAN = /\.(html|txt|xml|webmanifest)$/;

/** Üretilmiş çıktıdaki yer tutucuları döner: [{ file, tokens: [...] }] */
export function findPlaceholders(dir = root) {
  const files = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isFile() && SCAN.test(f)) files.push(f);
  }
  const blog = path.join(dir, 'blog');
  if (fs.existsSync(blog)) for (const f of fs.readdirSync(blog)) if (SCAN.test(f)) files.push(`blog/${f}`);
  const out = [];
  for (const f of files) {
    const hits = fs.readFileSync(path.join(dir, f), 'utf8').match(TOKEN);
    if (hits) out.push({ file: f, tokens: [...new Set(hits)] });
  }
  return out;
}

/** build'den önce: hukuk sayfalarını kaynaktan üretip tarar. */
export async function findPlaceholdersInSource() {
  const { pages } = await import('../src/site.mjs');
  const out = [];
  for (const p of pages.filter((x) => ['/gizlilik', '/kullanim-sartlari', '/hesap-silme'].includes(x.path))) {
    const hits = `${p.title}\n${p.description}\n${p.body()}`.match(TOKEN);
    if (hits) out.push({ file: p.file, tokens: [...new Set(hits)] });
  }
  return out;
}

export function report(found) {
  console.error('\nHATA: hukuk sayfalarında doldurulmamış yer tutucu var; yayın/derleme DURDURULDU.');
  for (const { file, tokens } of found) console.error(`  ${file}: ${tokens.join(', ')}`);
  console.error('\nÇözüm: src/legal.mjs içindeki değerleri gerçek bilgiyle doldurun (README: "Hukuk metinleri ve yer tutucular").');
  console.error('Yalnız yerel önizleme için: npm run build:draft (çıktı YAYINLANMAZ, main\'e gitmez).\n');
}

// Doğrudan çalıştırıldıysa
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const source = process.argv.includes('--source');
  const { LEGAL, kosulDurumu } = await import('../src/legal.mjs');
  const found = source ? await findPlaceholdersInSource() : findPlaceholders();
  console.log(`Koşul bayrakları (src/legal.mjs), sürüm ${LEGAL.surum} · ${LEGAL.guncellemeIso}:`);
  for (const l of kosulDurumu(LEGAL)) console.log('  ' + l);
  if (found.length) { report(found); process.exit(1); }
  console.log(`Yer tutucu kontrolü tamam (${source ? 'kaynak' : 'çıktı'}): '{{' kalmadı.`);
}
