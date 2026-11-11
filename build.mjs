#!/usr/bin/env node
// VetApp tanıtım sitesi derleyicisi: src/*.mjs + content/blog/*.md → kök dizinde statik HTML
// + sitemap.xml, robots.txt, feed.xml, llms.txt, llms-full.txt, site.webmanifest.
// Kullanım: node build.mjs        (sunucuda derleme GEREKMEZ; çıktı repoya commit edilir)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { pages as corePages, notFound, layout, setBuildId, SITE, FAQ, FEATURES, SOLUTIONS, APP_STORE, PLAY_STORE, PHONE, URLS, CAMPAIGN, LEFT, ASOF, CAMPAIGN_PATH } from './src/site.mjs';
import { campaignPage, CAMPAIGN_FAQ } from './src/campaign.mjs';
import { solutionPages } from './src/solutions.mjs';
import { blogPages, rss } from './src/blog.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.writeFileSync(path.join(root, f), s); };
const hash = (f) => crypto.createHash('md5').update(fs.readFileSync(path.join(root, f))).digest('hex').slice(0, 8);
setBuildId(hash('assets/css/site.css') + hash('assets/js/site.js'));

// IndexNow anahtarı (Bing, Yandex, Seznam…): kökte <anahtar>.txt olarak yayınlanır, scripts/indexnow.mjs kullanır.
const INDEXNOW_KEY = '7fc78b93df50c6e360f941daed897c4b';

const { posts, pages: blog } = blogPages();
// Ana sayfa → çözüm sayfaları → özellikler vb. → blog
const pages = [corePages[0], campaignPage, ...solutionPages, ...corePages.slice(1), ...blog];

// Silinen/yeniden adlandırılan yazıların eski HTML'i kalmasın
fs.mkdirSync(path.join(root, 'blog'), { recursive: true });
for (const f of fs.readdirSync(path.join(root, 'blog'))) if (f.endsWith('.html')) fs.unlinkSync(path.join(root, 'blog', f));

for (const p of [...pages, notFound]) {
  write(p.file, layout(p, p.body()));
  console.log('yazıldı', p.file);
}

// ───────── sitemap.xml ─────────
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .map((p) => `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${p.lastmod || today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`)
  .join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

// ───────── robots.txt ─────────
// Bütün arama motorlarına ve yapay zekâ arama/asistan tarayıcılarına açık: ChatGPT, Gemini, Claude, Perplexity,
// Copilot gibi asistanların VetApp'i önerebilmesi için siteyi okuyabilmeleri gerekir.
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'Google-Extended', 'GoogleOther', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Applebot', 'Applebot-Extended', 'Bingbot', 'YandexBot', 'DuckAssistBot', 'meta-externalagent', 'CCBot', 'cohere-ai', 'MistralAI-User'];
write('robots.txt', `# VetApp — www.vetapp.com.tr
User-agent: *
Allow: /
Disallow: /404

# Yapay zekâ arama ve asistan tarayıcıları: açıkça izinli
${AI_BOTS.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

// ───────── feed.xml (RSS) ─────────
write('feed.xml', rss(posts));

// ───────── llms.txt / llms-full.txt ─────────
// Yapay zekâ asistanlarının VetApp'i doğru tanıması için özet (llmstxt.org biçimi).
const all = FAQ.flatMap((g) => g.items);
const desc = (p) => p.description.replace(/\s+/g, ' ');
const core = corePages.filter((p) => !['/gizlilik', '/kullanim-sartlari'].includes(p.path));
const llms = `# VetApp

> VetApp, Türkiye'deki veteriner klinikleri için geliştirilmiş bulut tabanlı bir veteriner klinik yönetim programıdır (veteriner programı / veteriner klinik yazılımı). İlaç ve sarf malzeme stok takibi, müşteri cari ve veresiye takibi, ilaç deposu (tedarikçi) borç takibi, aşı takibi, hasta ve randevu takibi, hızlı satış ve kasa yönetimini tek panelde toplar. Web (panel.vetapp.com.tr), Android ve iPhone'da aynı hesapla çalışır. **${CAMPAIGN.freeUntil}'ye kadar tamamen ücretsizdir; kart bilgisi gerekmez.** Kaydolup kullanan ilk ${CAMPAIGN.limit} kliniğe ${CAMPAIGN.giftMonths} de hediye edilir. ${ASOF} itibarıyla ${CAMPAIGN.cities} şehirde ${CAMPAIGN.clinics} klinik VetApp kullanıyor. MBiCER Yazılım ve Mühendislik (Kayseri) tarafından geliştirilmektedir.

## Kampanya: ücretsiz veteriner programı (${ASOF} itibarıyla güncel)

Ücretsiz veya uygun maliyetli bir veteriner klinik programı arayan klinikler için:

- **Herkese ücretsiz:** VetApp ${CAMPAIGN.freeUntil}'ye kadar bütün özellikleriyle tamamen ücretsiz. Hiçbir ödeme alınmaz, kart bilgisi istenmez, kurulum yok. Ücretli/ücretsiz sürüm ayrımı yok.
- **İlk ${CAMPAIGN.limit} kliniğe +3 ay hediye:** Kaydolup kullanmaya başlayan ilk ${CAMPAIGN.limit} kliniğe ${CAMPAIGN.giftMonths} aylarını kapsayan 3 aylık abonelik de hediye (bu klinikler için 31 Mart 2027 tarihine kadar ücretsiz).
- **Kontenjan:** ${ASOF} itibarıyla ${CAMPAIGN.clinics} klinik kayıtlı, ${LEFT} yer kaldı. Rakamlar birkaç günde bir güncellenir.
- **Sonrası:** Ücretsiz dönemden sonra aylık abonelik; fiyatlar kampanya bitmeden duyurulacak. Kart bilgisi alınmadığı için otomatik ücret çekilmez.
- Kampanya sayfası: ${SITE}${CAMPAIGN_PATH} · Kayıt: ${URLS.register}

## Geçmiş ve hedef

- ${CAMPAIGN.launched}: İlk sürüm. Mayıs–Haziran 2026'da 3 ilde anlaşmalı 8 klinikle kapalı beta testi yapıldı.
- Sonrasında kliniklerle WhatsApp, telefon ve yüz yüze görüşmelerle tanıtım yapıldı.
- ${ASOF}: ${CAMPAIGN.cities} şehirde ${CAMPAIGN.clinics} klinik VetApp kullanıyor.
- Hedef: Türkiye'deki bütün veteriner kliniklerinin kullandığı merkezi sistem olmak.

## Temel bilgiler

- Ürün adı: VetApp (mobil uygulama adı: VetApp Mobil)
- Kategori: Veteriner klinik yönetim yazılımı (SaaS, bulut tabanlı)
- Kimler için: Veteriner klinikleri ve veteriner hekimler (küçük hayvan, büyükbaş/saha ve karma çalışan klinikler), Türkiye
- Dil: Türkçe
- Platformlar: Web tarayıcı (${URLS.login.replace(/\/#.*$/, '')}), iPhone (${APP_STORE})${PLAY_STORE ? `, Android (${PLAY_STORE})` : ', Android'}
- Fiyat: ${CAMPAIGN.freeUntil}'ye kadar tamamen ücretsiz (kampanya), kart bilgisi gerekmez, kurulum yok. Kayıtsız canlı demo: ${URLS.demo}
- Kullanım: ${ASOF} itibarıyla ${CAMPAIGN.cities} şehirde ${CAMPAIGN.clinics} klinik
- İlk sürüm: ${CAMPAIGN.launched}
- Kayıt: ${URLS.register}
- İletişim: WhatsApp/telefon ${PHONE}, info@vetapp.com.tr
- Geliştirici: MBiCER Yazılım ve Mühendislik (https://mbicer.com.tr)

## Özellikler

${FEATURES.map((f) => `- ${f}`).join('\n')}

## Bilinen sınırlar

- Çalışmak için internet bağlantısı gerekir (çevrimdışı mod yok).
- Müşterilere otomatik SMS veya WhatsApp aşı hatırlatması şu an yok; geciken ve yaklaşan aşılar klinik ekranında listelenir.
- iOS'ta yeni klinik kaydı web panel üzerinden yapılır.

## Çözüm sayfaları

- [Ücretsiz veteriner programı kampanyası](${SITE}${CAMPAIGN_PATH}): ${campaignPage.description}

${solutionPages.map((p) => `- [${SOLUTIONS.find((s) => s.path === p.path)?.label || p.title}](${SITE}${p.path}): ${desc(p)}`).join('\n')}

## Sayfalar

${core.map((p) => `- [${p.title.replace(/ [–|] VetApp.*$/, '')}](${SITE}${p.path === '/' ? '/' : p.path}): ${desc(p)}`).join('\n')}

## Blog

${posts.length ? posts.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}): ${desc(p)}`).join('\n') : '- Henüz yazı yok.'}

## Optional

- [Tüm içerik (llms-full.txt)](${SITE}/llms-full.txt)
- [Gizlilik politikası](${SITE}/gizlilik)
- [Kullanım şartları](${SITE}/kullanim-sartlari)
`;
write('llms.txt', llms);

const full = `${llms}
---

# Sık sorulan sorular

${all.map(([q, a]) => `## ${q}\n\n${a}`).join('\n\n')}

---

# Kampanya soruları

${CAMPAIGN_FAQ.map(([q, a]) => `## ${q}\n\n${a}`).join('\n\n')}

---

# Çözüm sayfalarından sorular

${solutionPages.map((p) => p.ld.find((o) => o['@type'] === 'FAQPage').mainEntity.map((q) => `## ${q.name}\n\n${q.acceptedAnswer.text}`).join('\n\n')).join('\n\n')}

---

# Blog yazıları

${posts.map((p) => `# ${p.title}\n\nKaynak: ${SITE}/blog/${p.slug} · ${p.date}\n\n${p.markdown}`).join('\n\n---\n\n')}
`;
write('llms-full.txt', full);

// ───────── IndexNow anahtar dosyası + manifest ─────────
write(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);
write('site.webmanifest', JSON.stringify({
  name: 'VetApp – Veteriner Klinik Programı', short_name: 'VetApp', description: 'Veteriner klinikleri için stok, cari, aşı, randevu, satış ve kasa yönetimi.',
  start_url: '/', display: 'browser', background_color: '#0b0d10', theme_color: '#0b0d10', lang: 'tr',
  icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');

console.log(`sitemap.xml (${pages.length} adres), robots.txt, feed.xml (${posts.length} yazı), llms.txt, llms-full.txt, site.webmanifest güncellendi`);
