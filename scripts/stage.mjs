#!/usr/bin/env node
// Cloudflare yayını için dist/ klasörünü hazırlar: yalnız ziyaretçiye sunulacak dosyalar (src, content, docs, scripts hariç).
// Kullanım: node scripts/stage.mjs   (npm run deploy bunu kendisi çağırır)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
const PUBLIC = /\.(html|xml|txt|webmanifest)$/;
for (const f of fs.readdirSync(root)) {
  const p = path.join(root, f);
  if (fs.statSync(p).isFile() && PUBLIC.test(f) && f !== 'README.md') fs.copyFileSync(p, path.join(out, f));
}
for (const d of ['assets', 'blog']) fs.cpSync(path.join(root, d), path.join(out, d), { recursive: true });
// Güvenlik ve önbellek başlıkları (Cloudflare statik varlıklar _headers dosyasını okur)
fs.writeFileSync(path.join(out, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000

/assets/*
  Cache-Control: public, max-age=604800
`);
const count = (d) => fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(path.join(d, e.name)) : 1), 0);
console.log(`dist/ hazır: ${count(out)} dosya`);
