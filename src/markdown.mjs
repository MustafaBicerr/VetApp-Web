// Blog içeriği: content/blog/*.md dosyalarını okur, ön bilgiyi (frontmatter) ayrıştırır ve
// bağımlılıksız, küçük bir Markdown → HTML dönüştürücüsüyle sayfa gövdesini üretir.
// Desteklenen sözdizimi content/blog/README.md içinde anlatılır.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const BLOG_DIR = path.join(root, 'content', 'blog');

const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Türkçe karakterleri sadeleştirip URL/kimlik dostu hâle getirir: "Stok Takibi Nasıl?" → "stok-takibi-nasil"
export const slugify = (s) => String(s)
  .replace(/İ/g, 'i').replace(/I/g, 'ı').toLocaleLowerCase('tr-TR')
  .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u')
  .replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Satır içi biçimler: `kod`, **kalın**, *italik*, [bağlantı](url)
function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(escHtml(c)) - 1}\u0000`);
  s = escHtml(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
    const ext = /^https?:\/\//.test(u) && !u.startsWith('https://www.vetapp.com.tr') && !u.startsWith('https://panel.vetapp.com.tr');
    return `<a href="${u}"${ext ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[i]}</code>`);
}

// Blok düzeyi: başlıklar (##, ###), paragraflar, - ve 1. listeleri, > alıntı/bilgi kutusu, | tablolar, --- ayırıcı
export function markdown(src) {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  const toc = [];
  let i = 0;
  const isBlockStart = (l) => /^(#{2,4}\s|[-*]\s|\d+\.\s|>|\||---\s*$)/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = line.match(/^(#{2,4})\s+(.*)$/))) {
      const level = m[1].length;
      const text = m[2].trim();
      const id = slugify(text);
      if (level === 2) toc.push({ id, text: text.replace(/\*\*/g, '') });
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i++;
    } else if (/^---\s*$/.test(line)) {
      out.push('<hr>'); i++;
    } else if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) { items.push(lines[i].replace(/^[-*]\s+/, '')); i++; }
      const checks = items.every((t) => /^\[[ xX]\]\s/.test(t));
      out.push(checks
        ? `<ul class="checklist">${items.map((t) => `<li${/^\[[xX]\]/.test(t) ? ' class="done"' : ''}>${inline(t.replace(/^\[[ xX]\]\s+/, ''))}</li>`).join('')}</ul>`
        : `<ul>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</ul>`);
    } else if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s+/, '')); i++; }
      out.push(`<ol>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</ol>`);
    } else if (/^>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      const paras = buf.join('\n').split(/\n\s*\n/).map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean);
      out.push(`<aside class="callout">${paras.map((p) => `<p>${inline(p)}</p>`).join('')}</aside>`);
    } else if (/^\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(/^\|\s*:?-+/.test(rows[1] || '') ? 2 : 1).map(cells);
      out.push(`<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
    } else {
      const buf = [];
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) { buf.push(lines[i].trim()); i++; }
      out.push(`<p>${inline(buf.join(' '))}</p>`);
    }
  }
  return { html: out.join('\n'), toc };
}

// "anahtar: değer" biçimli basit ön bilgi; listeler köşeli parantezle: keywords: [a, b]
function frontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const l of m[1].split('\n')) {
    const kv = l.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((x) => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    else v = v.replace(/^["']|["']$/g, '');
    data[kv[1]] = v;
  }
  return { data, body: raw.slice(m[0].length) };
}

const wordCount = (s) => s.replace(/[#>*|`\-[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;

// Yayındaki yazılar, yeniden eskiye. `draft: true` olanlar ve tarihi gelecekte olanlar atlanır.
export function loadPosts({ includeDrafts = false } = {}) {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const today = new Date().toISOString().slice(0, 10);
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md')
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const { data, body } = frontmatter(raw);
      const slug = data.slug || f.replace(/\.md$/, '');
      for (const k of ['title', 'description', 'date']) if (!data[k]) throw new Error(`content/blog/${f}: "${k}" alanı zorunlu`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`content/blog/${f}: date YYYY-AA-GG biçiminde olmalı`);
      const words = wordCount(body);
      const { html, toc } = markdown(body);
      return {
        slug, file: f, ...data,
        updated: data.updated || data.date,
        keywords: Array.isArray(data.keywords) ? data.keywords : data.keywords ? [data.keywords] : [],
        related: Array.isArray(data.related) ? data.related : data.related ? [data.related] : [],
        draft: data.draft === 'true',
        words, minutes: Math.max(2, Math.round(words / 200)),
        html, toc, markdown: body.trim(),
      };
    })
    .filter((p) => includeDrafts || (!p.draft && p.date <= today))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title, 'tr')));
}

const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
export const trDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${AYLAR[m - 1]} ${y}`; };
