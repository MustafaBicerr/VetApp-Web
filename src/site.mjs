// VetApp tanıtım sitesi — içerik ve şablonlar. `node build.mjs` ile statik HTML üretilir.
// Tasarım dili MB Yazılım (mbicer.com.tr) ile ortaktır: IBM Plex, koyu zemin + açık bölümler, mavi vurgu.
import { loadPosts, trDate } from './markdown.mjs';
export const SITE = 'https://www.vetapp.com.tr';
export const PANEL = 'https://panel.vetapp.com.tr';
export const API = 'https://api.vetapp.com.tr/api';
export const URLS = {
  register: `${PANEL}/#/register`,
  login: `${PANEL}/#/login`,
  demo: `${PANEL}/#/demo`,
};
export const MAKER = 'https://www.mbicer.com.tr';
export const PHONE = '+90 535 226 54 08';
export const WA = 'https://wa.me/905352265408?text=' + encodeURIComponent('Merhaba, VetApp hakkında bilgi almak istiyorum.');
// ───────── KAMPANYA ─────────
// Rakamlar VetApp admin panelinden alınır. Birkaç günde bir: asOf, clinics, cities güncelle → node build.mjs → push → deploy.
// Bütün site (ana sayfa bandı, duyuru çubuğu, kampanya sayfası, SSS, şema, llms.txt) bu tek yerden beslenir.
export const CAMPAIGN = {
  asOf: '2026-11-10',          // rakamların güncel olduğu gün (sitede "… itibarıyla" olarak yazılır)
  clinics: 432,                // VetApp'i kullanan klinik sayısı
  cities: 55,                  // bu kliniklerin bulunduğu şehir sayısı
  limit: 500,                  // 3 ay hediye abonelik kontenjanı (ilk N klinik)
  freeUntil: 'Ocak 2027',      // herkes için tamamen ücretsiz kullanım: bu aya kadar
  freeEndIso: '2026-12-31',    // ücretsiz dönemin son günü (şema için)
  giftMonths: 'Ocak, Şubat ve Mart 2027',
  giftEndIso: '2027-03-31',    // hediye aboneliğin son günü
  launched: 'Mayıs 2026',
};
export const STATS = { clinics: CAMPAIGN.clinics, cities: CAMPAIGN.cities, drugs: 1694 };
export const LEFT = Math.max(0, CAMPAIGN.limit - CAMPAIGN.clinics);
export const ASOF = trDate(CAMPAIGN.asOf);
export const CAMPAIGN_PATH = '/ucretsiz-veteriner-programi';
export const FREE_LINE = `${CAMPAIGN.freeUntil}’ye kadar tamamen ücretsiz`;
export const GIFT_LINE = LEFT > 0
  ? `İlk ${CAMPAIGN.limit} kliniğe ${CAMPAIGN.giftMonths} de hediye`
  : `${CAMPAIGN.limit} kliniklik hediye kontenjanı doldu`;
// Mağaza bağlantıları. Play Store adresi bilindiğinde PLAY_STORE'a yazın; boşsa hiçbir yerde gösterilmez.
export const APP_STORE = 'https://apps.apple.com/tr/app/vetapp-mobil/id6761138905';
export const PLAY_STORE = '';
// Anahtar kelime odaklı çözüm sayfaları (src/solutions.mjs). Menü, alt bilgi ve ana sayfa bu listeden beslenir.
export const SOLUTIONS = [
  { path: '/veteriner-programi', label: 'Veteriner programı', short: 'Klinik yönetimi tek yazılımda', icon: 'layers' },
  { path: '/veteriner-stok-takip-programi', label: 'Stok ve ilaç takibi', short: 'Barkod, parti, SKT ve kritik stok', icon: 'box' },
  { path: '/veteriner-cari-takip-programi', label: 'Cari ve veresiye takibi', short: 'Müşteri alacağı, tedarikçi borcu', icon: 'wallet' },
  { path: '/veteriner-asi-takip-programi', label: 'Aşı takibi', short: 'Aşı takvimi ve geciken aşı listesi', icon: 'syringe' },
  { path: '/veteriner-hasta-takip-programi', label: 'Hasta ve randevu takibi', short: 'Hasta kartı, muayene, randevu', icon: 'calendar' },
  { path: '/veteriner-mobil-uygulama', label: 'Veteriner mobil uygulaması', short: 'iPhone ve Android’de tam panel', icon: 'mobile' },
  { path: '/buyukbas-veteriner-programi', label: 'Büyükbaş ve saha veterinerliği', short: 'Çiftlikte, işin bittiği yerde kayıt', icon: 'globe' },
];
export const YEAR = new Date().getFullYear();
// Cloudflare Web Analytics (çerezsiz, kişisel veri tutmaz, robotları saymaz). Panel: Cloudflare → Analytics & Logs → Web Analytics
export const CF_BEACON = '2ff9262840d24d52abc2e7150512d5e0';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ───────── ikonlar (satır içi SVG, 24px ızgara) ─────────
const P = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  syringe: '<path d="M18 2l4 4M15 5l4 4M17 7l-9.5 9.5-3 .5.5-3L14.5 4.5M10.5 9.5l2 2M8 12l2 2M2 22l3.5-3.5"/>',
  barcode: '<path d="M3 5v14M7 5v14M10 5v14M14 5v14M17 5v14M21 5v14"/>',
  box: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M3 10h18M16 15h2"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 01-.6-8.96A6 6 0 0118 9.5a4 4 0 01-1 8.5H7z"/><path d="M12 11v5M9.5 13.5L12 11l2.5 2.5"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 018 0v3"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  userplus: '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M19 8v6M16 11h6"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5.5 3.5-5.5 3.5z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
  phone: '<path d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11 11 0 006 6l1.4-2.3 4.6 1.8V18.5a2 2 0 01-2 2A16.5 16.5 0 013 5.5a2 2 0 012-2z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  mobile: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19.5h20"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8.5h14V12M12 8v12.5M12 8C10.5 5 7 4.5 7 6.5S10 8 12 8zM12 8c1.5-3 5-3.5 5-1.5S14 8 12 8z"/>',
  bell: '<path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15L6 16zM10 21h4"/>',
};
export const icon = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
export const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2z"/></svg>';
export const arrow = `<span class="arr" aria-hidden="true">${icon('arrow')}</span>`;

// ───────── görsel yardımcıları ─────────
export const shot = (name, alt, { sizes = '(min-width: 960px) 640px, 100vw', eager = false } = {}) =>
  `<img src="/assets/img/${name}-1800.webp" srcset="/assets/img/${name}-900.webp 900w, /assets/img/${name}-1800.webp 1800w" sizes="${sizes}" width="1800" height="1125" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
export const frame = (name, alt, url = 'panel.vetapp.com.tr', opts) =>
  `<div class="frame"><div class="fbar"><i></i><i></i><i></i><span>${url}</span></div>${shot(name, alt, opts)}</div>`;
const sbar = (time = '09:41') => `<div class="sbar"><span data-clock>${time}</span><span class="dots"><i></i><i></i><i></i><i></i></span></div>`;
export const phoneImg = (name, alt, { eager = false, time = '09:41' } = {}) =>
  `<div class="phone"><div class="screen">${sbar(time)}<div class="scr-area"><div class="scr on"><img src="/assets/img/${name}.webp" width="585" height="1266" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div></div></div></div>`;

// ───────── SSS verisi (ana sayfa + /sss + FAQPage şeması) ─────────
export const FAQ = [
  {
    group: 'Genel',
    items: [
      ['VetApp nedir?', 'VetApp; veteriner klinikleri için hasta kaydı, randevu, aşı takibi, hızlı satış, kasa, stok ve cari hesap yönetimini tek panelde toplayan bir klinik yönetim yazılımıdır. Web’de, Android’de ve iOS’ta aynı hesapla çalışır.'],
      ['Hangi cihazlarda çalışır?', 'Web tarayıcısından (panel.vetapp.com.tr), Android ve iOS uygulamalarından. Tüm cihazlar aynı bulut hesabını kullanır; yaptığınız değişiklik her yerde günceldir. iOS’ta yeni klinik kaydı web panel üzerinden yapılır.'],
      ['İnternet bağlantısı gerekir mi?', 'Evet. VetApp bulut tabanlıdır; bu sayede kurulum, sunucu veya yedekleme derdiniz olmaz ama çalışmak için internet bağlantısı gerekir.'],
      ['Birden fazla kullanıcı ekleyebilir miyim?', 'Evet. Klinik yöneticisi, ekibindeki kişiler için kullanıcı hesabı oluşturabilir.'],
    ],
  },
  {
    group: 'Veteriner programı seçimi',
    items: [
      ['Veteriner programı (veteriner klinik yazılımı) ne işe yarar?', 'Veteriner programı; kliniğin hasta kayıtlarını, randevularını, aşı takvimini, ilaç ve sarf malzeme stoğunu, satışlarını, kasasını ve müşteri/tedarikçi cari hesaplarını tek yerde tutan yazılımdır. Defter, Excel ve hafızaya dayalı takibin yerini alır; hangi ilacın azaldığını, kimin ne kadar borcu olduğunu ve hangi hastanın aşısının geldiğini tek ekranda gösterir.'],
      ['Ücretsiz veteriner programı var mı?', `Evet. VetApp ${CAMPAIGN.freeUntil}’ye kadar bütün özellikleriyle tamamen ücretsizdir; kart bilgisi istenmez, kurulum gerekmez. Ayrıca kaydolup kullanmaya başlayan ilk ${CAMPAIGN.limit} kliniğe ${CAMPAIGN.giftMonths} aylarını kapsayan 3 aylık abonelik hediye edilir (${ASOF} itibarıyla ${CAMPAIGN.clinics} klinik kayıtlı, ${LEFT} yer kaldı).`],
      ['VetApp büyükbaş ve saha çalışmasına uygun mu?', 'Evet. Mobil uygulama web panelindeki işlemlerin tamamını yapabildiği için çiftlikte, işin bittiği yerde satış, veresiye ve tedavi kaydı girilebilir; kliniğe dönüp bilgisayar başında tekrar yazmak gerekmez.'],
      ['Yeni açılan bir klinik için uygun mu?', 'Evet. Açılış stoğunuzu ve devreden müşteri/tedarikçi bakiyelerinizi ilk gün girersiniz; ilaç kartları 1.694 ilaçlık katalogdan barkodla dolar. Küçük ekipler için tasarlandı, eğitim gerektirmez.'],
    ],
  },
  {
    group: 'Kampanya ve fiyat',
    items: [
      [`VetApp ne zamana kadar ücretsiz?`, `VetApp ${CAMPAIGN.freeUntil}’ye kadar herkes için tamamen ücretsizdir. Bu süre boyunca hiçbir ödeme alınmaz, kart bilgisi istenmez ve bütün özellikler açıktır.`],
      [`İlk ${CAMPAIGN.limit} klinik kampanyası nedir?`, `VetApp’e kaydolup kullanmaya başlayan ilk ${CAMPAIGN.limit} kliniğe ücretsiz dönemin ardından ${CAMPAIGN.giftMonths} aylarını kapsayan 3 aylık abonelik hediye edilir. ${ASOF} itibarıyla ${CAMPAIGN.cities} şehirde ${CAMPAIGN.clinics} klinik VetApp kullanıyor; hediyeden yararlanabilecek ${LEFT} yer kaldı.`],
      ['Kart bilgisi girmem gerekiyor mu?', 'Hayır. Kayıt için yalnızca klinik adı ve iletişim bilgileri yeterlidir; kredi kartı veya ödeme bilgisi istenmez.'],
      [`${CAMPAIGN.freeUntil}’den sonra ne olacak?`, 'Ücretsiz dönemden sonra sade bir aylık abonelik uygulanacak. Fiyatlar kampanya bitmeden önce bu sitede ve uygulamada açıkça duyurulacak. Kart bilgisi alınmadığı için hesabınızdan otomatik ücret çekilmez; devam edip etmemeye siz karar verirsiniz.'],
    ],
  },
  {
    group: 'Özellikler',
    items: [
      ['Aşı hatırlatması nasıl çalışıyor?', 'VetApp her hasta için aşı kaydını ve bir sonraki aşı tarihini tutar. Klinik ekranında vadesi yaklaşan ve geciken aşılar gündem olarak listelenir. Müşterilere otomatik SMS veya WhatsApp hatırlatması şu an bulunmuyor.'],
      ['Stokta son kullanma tarihi takibi var mı?', 'Evet. Ürünler parti ve son kullanma tarihi ile takip edilir; SKT’si yaklaşan ürünler ve kritik stok eşiğinin altındakiler panelde uyarı olarak görünür.'],
      ['Barkod okutarak çalışabilir miyim?', 'Evet. Telefon kamerasıyla veya bilgisayara bağlı barkod okuyucuyla ürün ekleyebilir, satış yapabilirsiniz. 1.694 ilaçlık referans katalogda barkodu bulunan ürünler otomatik tanınır.'],
      ['Veresiye satış nasıl yönetiliyor?', 'Satış satır bazında peşin veya veresiye olarak işaretlenir. Müşteri hesabında alacak, vade ve tahsilat geçmişi görünür; kısmi tahsilat alabilir, devreden bakiye girebilirsiniz.'],
    ],
  },
  {
    group: 'Veri ve güvenlik',
    items: [
      ['Verilerim güvende mi?', 'Her klinik kendi hesabında, kendi verisiyle çalışır. Bağlantılar HTTPS ile şifrelenir ve veritabanı her gün yedeklenir. Ayrıntılar için gizlilik politikamıza bakabilirsiniz.'],
      ['Eski sistemimdeki verileri aktarabilir miyim?', 'Excel veya CSV verileriniz için bizimle iletişime geçin; aktarım konusunda yardımcı olmaya çalışırız.'],
    ],
  },
];
const HOME_FAQ = [FAQ[2].items[0], FAQ[2].items[1], FAQ[2].items[3], FAQ[1].items[0], FAQ[0].items[1], FAQ[1].items[2], FAQ[4].items[0]];
export const faqHtml = (items) => `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="a"><p>${esc(a)}</p></div></details>`).join('')}</div>`;
export const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

// ───────── düzen ─────────
const NAV = [
  ['/ozellikler', 'Özellikler'],
  ['/veteriner-programi', 'Çözümler'],
  ['/ucretsiz-veteriner-programi', 'Kampanya'],
  ['/blog', 'Blog'],
  ['/depolar', 'İlaç depoları'],
  ['/sss', 'SSS'],
  ['/iletisim', 'İletişim'],
];

export function layout(page, body) {
  const url = SITE + page.path;
  const ld = (page.ld || []).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n  ');
  const current = (href) => page.path === href || (href !== '/' && page.path.startsWith(href + '/'));
  const nav = NAV.map(([href, label]) => `<a href="${href}"${current(href) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const mnav = NAV.map(([href, label]) => `<a href="${href}">${label}</a>`).join('');
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
  <meta name="theme-color" content="#0b0d10">
  <meta name="color-scheme" content="dark light">
  <link rel="alternate" hreflang="tr" href="${url}">
  <link rel="alternate" hreflang="x-default" href="${url}">
  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:site_name" content="VetApp">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}/assets/img/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="VetApp — veteriner klinik yönetim yazılımı">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${SITE}/assets/img/og-image.png">
  <meta name="author" content="${esc(page.author || 'VetApp')}">
  <meta name="application-name" content="VetApp">
  <meta name="apple-itunes-app" content="app-id=6761138905">
  <link rel="alternate" type="application/rss+xml" title="VetApp Blog" href="${SITE}/feed.xml">${page.head ? '\n  ' + page.head : ''}
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="/assets/img/favicon-64.png">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/ibm-plex-sans-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/ibm-plex-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="/assets/css/site.css?v=${BUILD_ID}">
  ${ld}
</head>
<body>
  <a class="skip" href="#main">İçeriğe geç</a>
  ${page.path === CAMPAIGN_PATH ? '' : `<a class="announce" href="${CAMPAIGN_PATH}"><span class="gift" aria-hidden="true">${icon('gift')}</span><span><b>${FREE_LINE}.</b> <span class="announce-more">${GIFT_LINE}${LEFT > 0 ? ` · <u>${LEFT} yer kaldı</u>` : ''}</span></span>${arrow}</a>`}
  <header class="site-header" id="top">
    <div class="container">
      <a class="brand" href="/" aria-label="VetApp ana sayfa"><img src="/assets/img/logo_white.png" width="103" height="26" alt="VetApp"></a>
      <nav class="nav" aria-label="Ana menü">${nav}</nav>
      <div class="header-cta">
        <a class="login" href="${URLS.login}">Giriş yap</a>
        <a class="btn btn--primary btn--sm" href="${URLS.register}">Ücretsiz başla</a>
      </div>
      <button class="menu-btn" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobile-menu"><span></span></button>
    </div>
  </header>
  <div class="mobile-menu" id="mobile-menu">
    ${mnav}
    <a href="${URLS.login}">Giriş yap</a>
    <a class="btn btn--primary" href="${URLS.register}">Ücretsiz başla ${arrow}</a>
    <a class="btn btn--wa" href="${WA}" target="_blank" rel="noopener">${waIcon} WhatsApp’tan yazın</a>
    <p class="mm-foot">Bir MB Yazılım ürünüdür</p>
  </div>
  <main id="main">
${body}
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="foot-grid">
        <div>
          <img src="/assets/img/logo_white.png" width="103" height="26" alt="VetApp" loading="lazy">
          <p>VetApp, veteriner klinikleri için geliştirilmiş klinik yönetim programıdır: ilaç stok takibi, cari ve veresiye, aşı ve randevu takibi, hızlı satış ve kasa. Web, Android ve iOS.</p>
          <p>Bir <a href="${MAKER}" style="color:var(--ink)">MB Yazılım</a> ürünüdür. Kayseri, Türkiye.</p>
        </div>
        <div><h4>Çözümler</h4><ul>
          ${SOLUTIONS.map((s) => `<li><a href="${s.path}">${s.label}</a></li>`).join('\n          ')}
        </ul></div>
        <div><h4>Ürün</h4><ul>
          <li><a href="/ozellikler">Özellikler</a></li>
          <li><a href="${CAMPAIGN_PATH}">Ücretsiz kampanya</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="${APP_STORE}" target="_blank" rel="noopener">App Store (iPhone)</a></li>${PLAY_STORE ? `\n          <li><a href="${PLAY_STORE}" target="_blank" rel="noopener">Google Play (Android)</a></li>` : ''}
          <li><a href="${URLS.demo}">Canlı demo</a></li>
          <li><a href="${URLS.login}">Giriş yap</a></li>
          <li><a href="${URLS.register}">Ücretsiz başla</a></li>
        </ul></div>
        <div><h4>Destek</h4><ul>
          <li><a href="/sss">Sık sorulan sorular</a></li>
          <li><a href="/iletisim">İletişim</a></li>
          <li><a href="${WA}" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="/depolar">İlaç depoları için</a></li>
        </ul></div>
        <div><h4>Yasal</h4><ul>
          <li><a href="/gizlilik">Gizlilik politikası</a></li>
          <li><a href="/kullanim-sartlari">Kullanım şartları</a></li>
          <li><a href="mailto:destek@vetapp.com.tr">destek@vetapp.com.tr</a></li>
        </ul></div>
      </div>
      <div class="foot-base"><span>© ${YEAR} VetApp · MB Yazılım</span><a href="tel:${PHONE.replace(/\s/g, '')}">${PHONE}</a></div>
    </div>
  </footer>
  <div class="dock" aria-label="Hızlı işlemler">
    <a class="btn btn--primary" href="${URLS.register}">${CAMPAIGN.freeUntil}’ye kadar ücretsiz ${arrow}</a>
    <a class="btn btn--wa" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp’tan yazın">${waIcon}</a>
  </div>
  <a class="wa-float" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp’tan yazın">${waIcon}</a>
  <script src="/assets/js/site.js?v=${BUILD_ID}" defer></script>
  <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${CF_BEACON}"}'></script>
</body>
</html>
`;
}

export let BUILD_ID = '0';
export const setBuildId = (v) => { BUILD_ID = v; };

// ───────── JSON-LD ─────────
// Kuruluş ve ürün varlıkları: arama motorları ve yapay zekâ asistanları VetApp'i bu tanımlarla tanır.
const ORG_ID = SITE + '/#organization';
const APP_ID = SITE + '/#software';
const sameAs = [APP_STORE, PLAY_STORE, MAKER + '/'].filter(Boolean);
export const orgLd = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': ORG_ID, name: 'VetApp', alternateName: ['VetApp Veteriner Klinik Programı', 'VetApp Mobil'],
  url: SITE + '/', logo: { '@type': 'ImageObject', url: SITE + '/assets/img/logo.png' }, image: SITE + '/assets/img/og-image.png',
  description: 'VetApp, Türkiye’deki veteriner klinikleri için geliştirilmiş bulut tabanlı klinik yönetim programıdır: ilaç stok takibi, cari ve veresiye takibi, aşı ve randevu takibi, hızlı satış ve kasa.',
  foundingDate: '2026-05', email: 'info@vetapp.com.tr', telephone: PHONE, areaServed: { '@type': 'Country', name: 'Türkiye' },
  address: { '@type': 'PostalAddress', addressLocality: 'Kayseri', addressCountry: 'TR' },
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', telephone: PHONE, email: 'destek@vetapp.com.tr', availableLanguage: ['tr'], areaServed: 'TR' }],
  parentOrganization: { '@type': 'Organization', name: 'MB Yazılım', url: MAKER + '/' },
  knowsAbout: ['veteriner klinik yönetimi', 'veteriner ilaç stok takibi', 'veteriner cari ve veresiye takibi', 'veteriner aşı takibi', 'veteriner hasta ve randevu takibi'],
  sameAs,
};
const siteLd = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#website', name: 'VetApp', alternateName: ['VetApp Veteriner Klinik Yazılımı', 'VetApp Veteriner Programı'], url: SITE + '/', inLanguage: 'tr-TR', publisher: { '@id': ORG_ID } };
export const FEATURES = [
  'Hasta (hayvan) kartı: tür, ırk, sahip, doğum tarihi, çip numarası, kilo',
  'Randevu takvimi ve randevu durumları',
  'SOAP muayene kaydı',
  'Aşı takibi: tür bazlı aşı protokolleri, yaklaşan ve geciken aşılar',
  'Hızlı satış ekranı ve barkodla satış',
  'Nakit, kart, karma ve veresiye ödeme',
  'Kasa hareketleri, masraf girişi ve gün sonu raporu',
  'İlaç ve ürün stok takibi: parti, son kullanma tarihi (SKT), kritik stok uyarısı',
  '1.694 ilaçlık veteriner ilaç referans kataloğu',
  'Alım faturası (mal kabul): iskonto, KDV, vade, mal fazlası',
  'Müşteri cari ve veresiye takibi, kısmi tahsilat',
  'Tedarikçi (ilaç deposu) cari ve borç takibi',
  'Günlük özet paneli ve satış grafikleri',
  'Çok kullanıcılı kullanım',
  'Web, Android ve iOS’ta aynı hesap, anlık senkron',
];
export const appLd = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication', '@id': APP_ID, name: 'VetApp', alternateName: 'VetApp Veteriner Klinik Programı',
  applicationCategory: 'BusinessApplication', applicationSubCategory: 'Veteriner klinik yönetim yazılımı',
  operatingSystem: 'Web, Android, iOS', inLanguage: 'tr', url: SITE + '/', ...(APP_STORE ? { installUrl: APP_STORE } : {}),
  description: 'Veteriner klinikleri için klinik yönetim programı: ilaç stok takibi, cari ve veresiye takibi, aşı ve randevu takibi, hasta kaydı, hızlı satış ve kasa. Web, Android ve iOS’ta aynı hesapla çalışır.',
  featureList: FEATURES,
  screenshot: ['dashboard', 'pos', 'urunler', 'musteriler', 'randevular'].map((n) => SITE + `/assets/img/${n}-1800.webp`),
  audience: { '@type': 'BusinessAudience', audienceType: 'Veteriner klinikleri, veteriner hekimler, pet shop ve saha veterinerleri' },
  datePublished: '2026-05',
  offers: [
    { '@type': 'Offer', name: `${CAMPAIGN.freeUntil}’ye kadar tamamen ücretsiz kullanım`, price: '0', priceCurrency: 'TRY', priceValidUntil: CAMPAIGN.freeEndIso,
      availability: 'https://schema.org/InStock', eligibleRegion: { '@type': 'Country', name: 'TR' }, url: SITE + CAMPAIGN_PATH,
      description: `Bütün özellikler ${CAMPAIGN.freeUntil}’ye kadar ücretsiz. Kart bilgisi gerekmez, kurulum yok.` },
    { '@type': 'Offer', name: `İlk ${CAMPAIGN.limit} kliniğe 3 ay hediye abonelik (${CAMPAIGN.giftMonths})`, price: '0', priceCurrency: 'TRY', priceValidUntil: CAMPAIGN.giftEndIso,
      availability: LEFT > 0 ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/SoldOut', eligibleRegion: { '@type': 'Country', name: 'TR' }, url: SITE + CAMPAIGN_PATH,
      inventoryLevel: { '@type': 'QuantitativeValue', value: LEFT },
      description: `Kaydolup kullanan ilk ${CAMPAIGN.limit} kliniğe ${CAMPAIGN.giftMonths} ücretsiz. ${ASOF} itibarıyla ${CAMPAIGN.clinics} klinik kayıtlı, ${LEFT} yer kaldı.` },
  ],
  publisher: { '@id': ORG_ID }, provider: { '@id': ORG_ID },
};
// Kırıntı şeması: crumbLd('Özellikler', '/ozellikler') veya crumbLd([['Blog', '/blog'], ['Yazı', '/blog/yazi']])
export const crumbLd = (name, path) => {
  const trail = Array.isArray(name) ? name : [[name, path]];
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['VetApp', '/'], ...trail].map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + p })) };
};

// crumb: 'Özellikler' ya da [['Blog', '/blog'], 'Yazı başlığı'] (son öğe bağlantısız)
export const pageHero = (crumb, h1, lede, extra = '') => {
  const trail = (Array.isArray(crumb) ? crumb : [crumb]).map((c) => (Array.isArray(c) ? `<a href="${c[1]}">${esc(c[0])}</a>` : esc(c))).join(' / ');
  return `
    <section class="page-hero">
      <div class="grid-fade grid-bg" aria-hidden="true"></div>
      <div class="container">
        <nav class="crumbs" aria-label="Sayfa yolu"><a href="/">VetApp</a> / ${trail}</nav>
        <h1>${h1}</h1>
        ${lede ? `<p class="lede">${lede}</p>` : ''}${extra}
      </div>
    </section>`;
};

export const finalCta = (title = `${CAMPAIGN.freeUntil}’ye kadar tamamen ücretsiz.`, text = `Kart bilgisi yok, kurulum yok. ${LEFT > 0 ? `İlk ${CAMPAIGN.limit} kliniğe ${CAMPAIGN.giftMonths} de hediye: şu an ${LEFT} yer kaldı.` : 'Beş dakikada ilk randevunuzu açın.'}`) => `
    <section class="sec final" data-final>
      <div class="container">
        <span class="tag reveal">Hemen başlayın</span>
        <h2 class="reveal d1">${title}</h2>
        <p class="lede reveal d2">${text}</p>
        <div class="actions reveal d3">
          <a class="btn btn--primary" href="${URLS.register}">Ücretsiz başla ${arrow}</a>
          <a class="btn btn--wa" href="${WA}" target="_blank" rel="noopener">${waIcon} WhatsApp’tan sorun</a>
        </div>
        <p class="note reveal d3"><span>Kart gerekmez</span><span>Kurulum yok</span><span><a href="${CAMPAIGN_PATH}" style="text-decoration:underline">Kampanya detayları</a></span><span><a href="${URLS.demo}" style="text-decoration:underline">Demoyu kayıtsız açın</a></span></p>
        <p class="asof reveal d3">Rakamlar ${ASOF} itibarıyla güncel bilgilerdir.</p>
      </div>
    </section>`;

const contactForm = ({ kind = 'GENERAL', source, orgLabel = 'Klinik / kurum', msgLabel = 'Mesajınız', kinds = null, button = 'Mesajı gönder' }) => `
        <form class="form" data-contact data-api="${API}/public/contact" novalidate>
          <input type="hidden" name="source_page" value="${source}">
          <div class="fields">
            <div class="field"><label for="f-name">Ad soyad</label><input id="f-name" name="name" autocomplete="name" required minlength="2"></div>
            <div class="field"><label for="f-phone">Telefon <span>(isteğe bağlı)</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
            <div class="field"><label for="f-email">E-posta</label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required></div>
            <div class="field"><label for="f-org">${orgLabel}</label><input id="f-org" name="organization" autocomplete="organization"></div>
            ${kinds ? `<div class="field full"><label for="f-kind">Konu</label><select id="f-kind" name="kind">${kinds.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>` : `<input type="hidden" name="kind" value="${kind}">`}
            <div class="field full"><label for="f-msg">${msgLabel}</label><textarea id="f-msg" name="message" required minlength="10"></textarea></div>
            <div class="hp" aria-hidden="true"><label>Web sitesi <input name="website" tabindex="-1" autocomplete="off"></label></div>
            <label class="consent"><input type="checkbox" name="consent" required><span>Mesajımın yanıtlanabilmesi için bilgilerimin işlenmesini ve <a href="/gizlilik">gizlilik politikasını</a> okuduğumu onaylıyorum.</span></label>
          </div>
          <div class="form-foot"><button class="btn btn--primary" type="submit">${button}</button><span class="form-msg" role="status" aria-live="polite"></span></div>
        </form>`;

// ───────── "Klinikte bir gün" sahneleri ─────────
const STEPS = [
  { time: '09:00', h: 'Gün, randevu listesiyle başlar.', p: 'Gelen hastayı tek dokunuşla karşılayın, muayeneye geçin.' },
  { time: '11:30', h: 'Hiçbir aşı unutulmaz.', p: 'Vadesi gelen ve geciken aşılar kendiliğinden öne çıkar.' },
  { time: '15:30', h: 'Barkodu okutun, satış bitsin.', p: 'Nakit, kart ya da veresiye. Hepsi tek ekranda.' },
  { time: '17:00', h: 'Stok kendini haber verir.', p: 'Azalan ve son kullanma tarihi yaklaşan ilaçlar uyarı verir.' },
  { time: '19:00', h: 'Kasa tek bakışta kapanır.', p: 'Gün sonu raporu sizi bekliyor. Hesap tutar.' },
];
const appNav = (on) => `<div class="app-nav" aria-hidden="true">${[0, 1, 2, 3, 4].map((i) => `<i${i === on ? ' class="on"' : ''}></i>`).join('')}</div>`;
const SCREENS = [
  // 09:00 — gerçek klinik ekranı + "Geldi" rozeti
  `<div class="scr on"><img src="/assets/img/m-klinik.webp" width="585" height="1266" alt="VetApp klinik ekranı: bugünkü randevular" loading="lazy" decoding="async"><span class="fx tap" aria-hidden="true"></span><span class="fx badge-pop" aria-hidden="true">✓ Geldi</span></div>`,
  // 11:30 — aşı takvimi
  `<div class="scr" aria-hidden="true">
    <div class="app-top"><h4>Aşı takvimi</h4><p>Pamuk · Kedi · 3 yaş</p></div>
    <div class="app-body stag">
      <div class="row"><span class="av g">${icon('check')}</span><span class="tx"><b>Karma aşı</b><small>12 Mart · yapıldı</small></span><span class="pill ok">Tamam</span></div>
      <div class="row"><span class="av g">${icon('check')}</span><span class="tx"><b>Kuduz</b><small>2 Nisan · yapıldı</small></span><span class="pill ok">Tamam</span></div>
      <div class="row pulse" style="border-color:#f5c27a"><span class="av o">${icon('syringe')}</span><span class="tx"><b>Karma (rapel)</b><small>Yarın · 10:30</small></span><span class="pill warn">Yarın</span></div>
      <div class="row"><span class="av b">${icon('calendar')}</span><span class="tx"><b>İç parazit</b><small>12 gün sonra</small></span><span class="pill info">Planlı</span></div>
      <div class="row"><span class="av r">${icon('bell')}</span><span class="tx"><b>Tarçın · Kuduz</b><small>5 gün gecikti</small></span><span class="pill bad">Gecikti</span></div>
    </div>${appNav(1)}</div>`,
  // 15:30 — gerçek hızlı satış ekranı + tarama, sepet, ödendi
  `<div class="scr"><img src="/assets/img/m-pos.webp" width="585" height="1266" alt="VetApp hızlı satış ekranı" loading="lazy" decoding="async"><span class="fx scan" aria-hidden="true"></span><span class="fx cart" aria-hidden="true"><span>Sepet · 2 ürün<small>Amoksisilin, Göz damlası</small></span><span>₺293</span></span><span class="fx paid" aria-hidden="true"><span class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>Ödeme alındı</span></div>`,
  // 17:00 — stok uyarıları
  `<div class="scr" aria-hidden="true">
    <div class="app-top"><h4>Stok</h4><p>3 ürün dikkat istiyor</p></div>
    <div class="app-body stag">
      <div class="row" style="display:block"><div style="display:flex;justify-content:space-between;gap:.5em"><b style="font-size:.92em">Amoksisilin 250 mg</b><span class="pill bad">Kritik · 3</span></div><div class="bar"><i class="r" style="--v:12%"></i></div></div>
      <div class="row" style="display:block"><div style="display:flex;justify-content:space-between;gap:.5em"><b style="font-size:.92em">Göz damlası</b><span class="pill warn">SKT 12 gün</span></div><div class="bar"><i class="o" style="--v:46%"></i></div></div>
      <div class="row" style="display:block"><div style="display:flex;justify-content:space-between;gap:.5em"><b style="font-size:.92em">Karma aşı</b><span class="pill warn">Azalıyor · 6</span></div><div class="bar"><i class="o" style="--v:28%"></i></div></div>
      <div class="row" style="display:block"><div style="display:flex;justify-content:space-between;gap:.5em"><b style="font-size:.92em">Mama 2 kg</b><span class="pill ok">Yeterli · 41</span></div><div class="bar"><i style="--v:82%"></i></div></div>
      <div class="row" style="display:block"><div style="display:flex;justify-content:space-between;gap:.5em"><b style="font-size:.92em">Pire damlası</b><span class="pill ok">Yeterli · 24</span></div><div class="bar"><i style="--v:64%"></i></div></div>
    </div>${appNav(3)}</div>`,
  // 19:00 — gün sonu
  `<div class="scr" aria-hidden="true">
    <div class="app-top"><h4>Gün sonu</h4><p>Bugün · 18 işlem</p></div>
    <div class="app-body">
      <div class="row" style="display:block"><small style="color:#6b7280;font-size:.78em">Net kasa</small><div class="big-num">₺10.031</div>
        <div class="chart"><i style="--h:22%"></i><i style="--h:40%"></i><i style="--h:30%"></i><i style="--h:55%"></i><i style="--h:48%"></i><i style="--h:92%"></i><i style="--h:70%"></i><i style="--h:38%"></i></div></div>
      <div class="row stag" style="display:block"><div class="kv"><span>Nakit</span><b>₺4.120</b></div><div class="kv"><span>Kart</span><b>₺5.911</b></div><div class="kv"><span>Veresiye</span><b style="color:#b25e00">₺850</b></div><div class="kv"><span>Gider</span><b>−₺0</b></div></div>
    </div>${appNav(0)}</div>`,
];

// ───────── kampanya bileşenleri ─────────
const pct = Math.min(100, Math.round((CAMPAIGN.clinics / CAMPAIGN.limit) * 100));
export const campaignProgress = () => `<div class="camp-progress" role="img" aria-label="${CAMPAIGN.limit} kliniklik kontenjanın ${CAMPAIGN.clinics} tanesi doldu, ${LEFT} yer kaldı">
            <div class="cp-top"><span><b>${CAMPAIGN.clinics}</b> / ${CAMPAIGN.limit} klinik</span><span class="cp-left">${LEFT > 0 ? `${LEFT} yer kaldı` : 'Kontenjan doldu'}</span></div>
            <div class="cp-bar"><i style="width:${pct}%"></i></div>
            <small>${ASOF} itibarıyla güncel bilgilerdir · ${CAMPAIGN.cities} şehirde ${CAMPAIGN.clinics} klinik VetApp kullanıyor</small>
          </div>`;
// Ana sayfada hero'nun hemen altı ve kampanya sayfası
export const campaignBand = ({ heading = true } = {}) => `
    <section class="camp" aria-labelledby="camp-h">
      <div class="container">
        ${heading ? `<div class="camp-head reveal">
          <span class="tag">Kampanya · ${ASOF} itibarıyla</span>
          <h2 id="camp-h">${CAMPAIGN.freeUntil}’ye kadar <span class="hl">tamamen ücretsiz.</span></h2>
          <p class="lede">Bu kadar kısa sürede ${CAMPAIGN.cities} şehirde ${CAMPAIGN.clinics} kliniğe ulaşmamızın en büyük sebebi bu: VetApp şu an bütün özellikleriyle ücretsiz. Kart bilgisi yok, gizli ücret yok.</p>
        </div>` : ''}
        <div class="camp-grid">
          <div class="camp-card reveal">
            <span class="ic">${icon('check')}</span>
            <h3>${CAMPAIGN.freeUntil}’ye kadar herkese ücretsiz</h3>
            <p>Kaydolan her klinik ${CAMPAIGN.freeUntil}’ye kadar VetApp’in bütün özelliklerini ücretsiz kullanır. Kart bilgisi istenmez, hiçbir ödeme alınmaz.</p>
          </div>
          <div class="camp-card hot reveal d1">
            <span class="ic">${icon('gift')}</span>
            <h3>İlk ${CAMPAIGN.limit} kliniğe +3 ay hediye</h3>
            <p>Kaydolup kullanmaya başlayan ilk ${CAMPAIGN.limit} kliniğe ${CAMPAIGN.giftMonths} aylarını kapsayan 3 aylık abonelik de hediye.</p>
            ${campaignProgress()}
          </div>
        </div>
        <div class="actions camp-actions reveal d2">
          <a class="btn btn--primary" href="${URLS.register}">Ücretsiz kaydol ${arrow}</a>
          ${heading ? `<a class="btn btn--ghost" href="${CAMPAIGN_PATH}">Kampanya detayları</a>` : `<a class="btn btn--wa" href="${WA}" target="_blank" rel="noopener">${waIcon} WhatsApp’tan sorun</a>`}
        </div>
      </div>
    </section>`;
// Çözüm sayfalarında başlığın altındaki kısa kampanya şeridi
export const campaignStrip = () => `
    <a class="camp-strip" href="${CAMPAIGN_PATH}">
      <span class="container"><span class="gift" aria-hidden="true">${icon('gift')}</span><span><b>${FREE_LINE}, kart bilgisi yok.</b> ${GIFT_LINE}${LEFT > 0 ? ` (${LEFT} yer kaldı)` : ''}. <small>${ASOF} itibarıyla</small></span>${arrow}</span>
    </a>`;

// Ana sayfadaki "Blogdan" bölümü: en yeni üç yazı. Yazı yoksa bölüm hiç basılmaz.
export const postCard = (p, cls = '') => `<a class="post-card${cls}" href="/blog/${p.slug}"><span class="meta">${p.category ? `${esc(p.category)} · ` : ''}<time datetime="${p.date}">${trDate(p.date)}</time></span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><span class="more">Okuyun ${arrow}</span></a>`;
function blogTeaser() {
  const posts = loadPosts().slice(0, 3);
  if (!posts.length) return '';
  return `
    <section class="sec light alt" aria-labelledby="blog-h">
      <div class="container">
        <div class="sec-head reveal">
          <span class="tag">Blog</span>
          <h2 id="blog-h">Klinik yönetimi üzerine <span class="soft">pratik rehberler.</span></h2>
        </div>
        <div class="post-grid">${posts.map((p, i) => postCard(p, ` reveal${i ? ` d${i}` : ''}`)).join('')}</div>
        <p style="margin-top:28px"><a class="btn btn--ghost" href="/blog">Tüm yazılar ${arrow}</a></p>
      </div>
    </section>`;
}

// ───────── SAYFALAR ─────────
export const pages = [];

// — Ana sayfa —
pages.push({
  file: 'index.html', path: '/', changefreq: 'weekly', priority: '1.0',
  title: 'VetApp: Ücretsiz Veteriner Klinik Programı – Stok, Cari, Aşı',
  ogTitle: `VetApp – ${CAMPAIGN.freeUntil}’ye kadar tamamen ücretsiz veteriner klinik programı`,
  description: `${CAMPAIGN.freeUntil}’ye kadar tamamen ücretsiz veteriner klinik programı: ilaç stok, veresiye ve cari, aşı, randevu, satış ve kasa. ${CAMPAIGN.cities} şehirde ${CAMPAIGN.clinics} klinik kullanıyor.`,
  ld: [orgLd, siteLd, appLd, faqLd(HOME_FAQ)],
  body: () => `
    <section class="hero">
      <div class="grid-fade grid-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="hero-copy">
          <h1><span class="tag h1-kicker">Veteriner klinik programı</span>Kliniğinizin bütün günü, <span class="soft">tek uygulamada.</span></h1>
          <p class="lede">İlaç stoğu, veresiye ve cari, aşı, randevu, satış ve kasa. Telefonda, tablette, bilgisayarda.</p>
          <div class="actions" data-hero-cta>
            <a class="btn btn--primary" href="${URLS.register}">Ücretsiz başla ${arrow}</a>
            <a class="btn btn--ghost" href="${URLS.demo}">${icon('play')} Demoyu aç</a>
          </div>
          <p class="hero-note"><span>${icon('check')} ${CAMPAIGN.freeUntil}’ye kadar ücretsiz</span><span>${icon('check')} Kart gerekmez</span><span>${icon('check')} Kurulum yok</span><span>${icon('check')} Türkçe destek</span></p>
        </div>
        <div class="hero-visual">
          ${phoneImg('m-dashboard', 'VetApp mobil uygulaması: günlük kasa, alacak ve randevu özeti', { eager: true })}
          <div class="toasts" aria-hidden="true">
            <div class="toast t1"><span class="ic amber">${icon('syringe')}</span><span><b>Pamuk · karma aşı</b><small>Yarın 10:30</small></span></div>
            <div class="toast t2"><span class="ic green">${icon('wallet')}</span><span><b>Ödeme alındı</b><small>₺293 · Kart</small></span></div>
            <div class="toast t3"><span class="ic red">${icon('box')}</span><span><b>Amoksisilin azaldı</b><small>Stokta 3 adet</small></span></div>
          </div>
        </div>
      </div>
      <div class="proof" aria-label="Rakamlarla VetApp">
        <div class="container">
          <div class="it"><b data-count="${STATS.clinics}">${STATS.clinics}</b><span>klinik kullanıyor</span></div>
          <div class="it"><b data-count="${STATS.cities}">${STATS.cities}</b><span>şehir</span></div>
          <div class="it"><b data-count="${STATS.drugs}">${STATS.drugs.toLocaleString('tr-TR')}</b><span>ilaç kataloğu</span></div>
        </div>
      </div>
    </section>
${campaignBand()}

    <section class="story" id="bir-gun" data-story aria-labelledby="story-h">
      <div class="container story-intro">
        <div class="sec-head reveal">
          <span class="tag">Klinikte bir gün</span>
          <h2 id="story-h">İlk hastadan kasa kapanışına. <span class="soft">Kaydırın, birlikte geçirelim.</span></h2>
        </div>
      </div>
      <div class="stage-wrap">
        <div class="stage">
          <div class="container">
            <div class="stage-copy">
              <div class="progress" aria-hidden="true">${STEPS.map(() => '<i></i>').join('')}</div>
              <div class="cap-box">
                ${STEPS.map((s, i) => `<div class="step-cap${i === 0 ? ' on' : ''}" data-time="${s.time}"><span class="clock">${s.time} <i></i></span><h3>${s.h}</h3><p>${s.p}</p></div>`).join('\n                ')}
              </div>
            </div>
            <div class="stage-phone">
              <div class="phone"><div class="screen">${sbar('09:00')}<div class="scr-area">${SCREENS.join('')}</div></div></div>
            </div>
          </div>
        </div>
        <div class="steps-track" aria-hidden="true">${STEPS.map((_, i) => `<div class="trig" data-i="${i}"></div>`).join('')}</div>
      </div>
    </section>

    <section class="sec light" aria-labelledby="dev-h">
      <div class="container">
        <div class="sec-head center reveal">
          <span class="tag">Her cihazda</span>
          <h2 id="dev-h">Masada başlayın, <span class="soft">cepte devam edin.</span></h2>
        </div>
        <div class="devices reveal d1">
          <div class="laptop"><div class="lid">${shot('dashboard', 'VetApp web paneli: günlük kasa, alacaklar ve saatlik satış grafiği', { sizes: '(min-width: 960px) 900px, 100vw' })}</div><div class="base"></div></div>
          ${phoneImg('m-pos', 'VetApp mobil hızlı satış ekranı', { time: '15:30' })}
        </div>
        <div class="platforms reveal d2">
          <span>${icon('laptop')} Web paneli</span><span>${icon('mobile')} Android</span><span>${icon('mobile')} iPhone</span><span>${icon('cloud')} Tek hesap, anlık senkron</span>
        </div>
      </div>
    </section>

    <section class="sec light alt" aria-labelledby="how-h">
      <div class="container">
        <div class="sec-head reveal">
          <span class="tag">Başlamak kolay</span>
          <h2 id="how-h">Üç adımda hazırsınız.</h2>
        </div>
        <ol class="how">
          <li class="reveal"><span class="n">${icon('userplus')}</span><span class="t">1 · 2 DAKİKA</span><h3>Hesabınızı açın</h3><p>Klinik adınızı ve e-postanızı girin.</p></li>
          <li class="reveal d1"><span class="n">${icon('barcode')}</span><span class="t">2 · BARKODLA</span><h3>Ürünlerinizi okutun</h3><p>İlaç kartları ${STATS.drugs.toLocaleString('tr-TR')} ilaçlık katalogdan kendiliğinden dolar.</p></li>
          <li class="reveal d2"><span class="n">${icon('calendar')}</span><span class="t">3 · HEMEN</span><h3>İlk randevuyu açın</h3><p>Gerisi akışına bırakılır. Panel gününüzü özetler.</p></li>
        </ol>
      </div>
    </section>

    <section class="sec light" aria-labelledby="sol-h">
      <div class="container">
        <div class="sec-head reveal">
          <span class="tag">Veteriner klinikleri için</span>
          <h2 id="sol-h">Tek program, <span class="soft">kliniğin bütün işleri.</span></h2>
          <p class="lede">VetApp; veteriner kliniklerinde ilaç ve sarf malzeme stoğunu, müşteri veresiyesini, tedarikçi borcunu, aşı takvimini ve randevuları tek yerde tutan bir veteriner klinik programıdır. Hangi işiniz için aradığınızı seçin:</p>
        </div>
        <div class="sol-grid">
          ${SOLUTIONS.map((x, i) => `<a class="sol reveal${i % 3 ? ` d${i % 3}` : ''}" href="${x.path}"><span class="ic">${icon(x.icon)}</span><span><b>${x.label}</b><small>${x.short}</small></span>${arrow}</a>`).join('\n          ')}
        </div>
      </div>
    </section>
${blogTeaser()}
    <section class="sec" aria-labelledby="trust-h">
      <div class="container">
        <div class="sec-head reveal">
          <span class="tag">Güvence</span>
          <h2 id="trust-h">Verileriniz sizin. <span class="soft">Güvende ve yedekli.</span></h2>
        </div>
        <div class="trust">
          <div class="tcard reveal"><span class="ic green">${icon('cloud')}</span><h3>Her gün yedek</h3><p>Veritabanı her gece otomatik yedeklenir.</p><span class="meter" aria-hidden="true"><i></i></span></div>
          <div class="tcard reveal d1"><span class="ic blue">${icon('lock')}</span><h3>Şifreli bağlantı</h3><p>Tüm trafik HTTPS ile korunur.</p></div>
          <div class="tcard reveal d2"><span class="ic amber">${icon('layers')}</span><h3>Klinik başına ayrı alan</h3><p>Her klinik yalnızca kendi verisini görür.</p></div>
          <div class="tcard reveal d3"><span class="ic blue">${icon('shield')}</span><h3>KVKK’ya uygun</h3><p>Verileriniz Türkiye’de, sizin kontrolünüzde.</p></div>
        </div>
        <div class="maker reveal">
          <img src="/assets/img/mb-mark.png" width="40" height="36" alt="" loading="lazy">
          <p><b>MB Yazılım güvencesiyle.</b> VetApp’i geliştiren ekip, kurulumdan sonra da yanınızda.</p>
          <a href="${MAKER}" target="_blank" rel="noopener">mbicer.com.tr ${arrow}</a>
        </div>
      </div>
    </section>

    <section class="sec light" aria-labelledby="faq-h">
      <div class="container">
        <div class="sec-head reveal">
          <span class="tag">Sık sorulanlar</span>
          <h2 id="faq-h">Kısa cevaplar.</h2>
        </div>
        <div class="reveal">${faqHtml(HOME_FAQ)}</div>
        <p style="margin-top:28px"><a class="btn btn--ghost" href="/sss">Tüm sorular ${arrow}</a></p>
      </div>
    </section>
${finalCta()}`,
});

// — Özellikler —
const MODULES = [
  { id: 'klinik', more: ['/veteriner-hasta-takip-programi', 'Veteriner hasta ve randevu takibi'], more2: ['/veteriner-asi-takip-programi', 'Veteriner aşı takip programı'], mob: 'm-klinik', kicker: 'Klinik', h: 'Hasta kayıtları, randevu ve aşı.', shot: 'hastalar', alt: 'VetApp hasta listesi', url: 'panel.vetapp.com.tr/#/clinic/patients', lede: 'Klinik iş akışının omurgası: hasta, randevu, muayene ve aşı bir arada.', caps: [
    ['Hasta (hayvan) kartı', 'Tür ve ırk kataloğu, sahibi, doğum tarihi, cinsiyet, kısırlaştırma, renk, çip no ve kilo.'],
    ['Randevu takvimi', 'Gün bazlı liste; personel, oda ve süre; planlandı / geldi / tamamlandı / gelmedi / iptal durumları.'],
    ['SOAP muayene', 'Şikâyet, anamnez, klinik bulgular, tanı ve tedavi planı; kilo, ateş, nabız ve solunum.'],
    ['Aşı takibi', 'Tür bazlı aşı protokolleri; uygulama ve bir sonraki tarih; vadesi yaklaşan ve geciken aşı gündemi.'],
    ['Hasta zaman çizelgesi', 'Muayeneler, randevular ve aşılar tek kronolojik akışta.'],
    ['Muayeneden satışa', 'Yapılan işlem tek tıkla satış ekranına taşınır; satış hasta ve muayeneyle ilişkilendirilir.'],
  ] },
  { id: 'satis', more: ['/veteriner-programi', 'Veteriner klinik programı'], mob: 'm-pos', kicker: 'Satış ve kasa', h: 'Hızlı satış ve net kasa.', shot: 'kasa', alt: 'VetApp kasa ve gider yönetimi', url: 'panel.vetapp.com.tr/#/sales/cash', lede: 'Sıra bekleyen müşteriye saniyeler içinde satış; gün sonunda kasayla birebir uyum.', caps: [
    ['Hızlı satış ekranı', 'Ürün arama, barkod okutma, müşteri seçimi ve ödeme tek ekranda.'],
    ['Ödeme yöntemleri', 'Nakit, kart, karma ve veresiye; aynı sepette satır bazında peşin/veresiye.'],
    ['Kasa hareketleri', 'Satış tahsilatları, veresiye tahsilatları ve masraflar tarih ve yönteme göre listelenir.'],
    ['Masraf girişi', 'Günlük giderleri kategoriyle kaydedin; net kasa otomatik hesaplanır.'],
    ['Gün sonu', 'Nakit ve kart toplamları, günlük gider ve net kasa tek özet kartında.'],
    ['Satış geçmişi', 'Fiş detayları, indirimli ve veresiye satış filtreleri.'],
  ] },
  { id: 'stok', more: ['/veteriner-stok-takip-programi', 'Veteriner stok takip programı'], kicker: 'Stok', h: 'İlaç ve ürün stoğu, SKT’ye kadar.', shot: 'stok-giris', alt: 'VetApp alım faturası ve stok girişi ekranı', url: 'panel.vetapp.com.tr/#/stock/entry', lede: 'Referans ilaç kataloğu ve barkodla hızlı kayıt; parti ve son kullanma tarihiyle güvenli takip.', caps: [
    ['İlaç referans kataloğu', '1.694 ilaçlık kataloğu arayın; kendi ürün kartınızı tek tıkla oluşturun.'],
    ['Barkod', 'Kamerayla veya barkod okuyucuyla ürün bulun, barkodsuz ürüne barkod tanımlayın.'],
    ['Parti ve SKT', 'Her giriş parti ve son kullanma tarihiyle tutulur; satışta SKT’si yakın olan parti öne alınır.'],
    ['Uyarılar', 'Kritik stok eşiği ve SKT yaklaşan ürünler panelde görünür.'],
    ['Alım faturası (mal kabul)', 'Çoklu iskonto, KDV, vade, mal fazlası; stok ve tedarikçi borcu otomatik güncellenir.'],
    ['İlk stok girişi', 'Açılış stoğunu bir seferde kaydedin; devreden bakiyeyle başlayın.'],
  ] },
  { id: 'cari', more: ['/veteriner-cari-takip-programi', 'Veteriner cari ve veresiye takibi'], kicker: 'Cari hesap', h: 'Müşteri ve tedarikçi hesapları.', shot: 'tedarikciler', alt: 'VetApp tedarikçi cari listesi', url: 'panel.vetapp.com.tr/#/accounts/suppliers', lede: 'Kime borçlusunuz, kimden alacağınız var — vade vade, fatura fatura.', caps: [
    ['Müşteri cari', 'Borç/alacak geçmişi, açık satışlar ve tahsilat kayıtları.'],
    ['Tedarikçi cari', 'Alım faturaları, vadeler ve ödemeler; fatura bazlı veya tutar bazlı kısmi ödeme.'],
    ['Resmî depo listesi', '300’den fazla veteriner ilaç deposu listesinden tedarikçi seçerek hızlı kayıt.'],
    ['Devreden bakiye', 'Müşteri ve tedarikçi açılış bakiyelerini ayrı etiketle kaydedin.'],
    ['Enflasyon korumalı veresiye', 'Fiyat güncellemesi, açık veresiye kalemlere fark olarak yansıtılabilir.'],
    ['Veresiye güvenliği', 'Veresiye satışta müşteri kimlik doğrulaması ve borçlu müşteri uyarısı.'],
  ] },
  { id: 'panel', more: ['/veteriner-mobil-uygulama', 'Veteriner mobil uygulaması'], mob: 'm-dashboard', kicker: 'Panel ve raporlar', h: 'Güne özet kartlarıyla başlayın.', shot: 'dashboard', alt: 'VetApp genel bakış paneli', url: 'panel.vetapp.com.tr', lede: 'Kasa, alacak, borç, stok ve randevu — işletmenin nabzı tek ekranda.', caps: [
    ['Günlük özet', 'Günlük kasa, genel alacak, tedarikçi borçları, bugünkü randevular ve kritik stok.'],
    ['Saatlik satış grafiği', 'Satış hacmi, peşin kasa ve tahsilat; yoğun saatlerinizi görün.'],
    ['Ödeme akışı', 'Nakit ve kart payı, saat bazında dağılım.'],
    ['Haftalık performans', 'Son 7 günün satış, kasa ve tahsilat karşılaştırması.'],
    ['Kasa özeti', 'Bu ay ve tüm zamanlar için net nakit ve net kart.'],
    ['Detaya inme', 'Kartlara tıklayarak işlem ve fatura detaylarına geçin.'],
  ] },
];
export const ck = `<span class="ck">${icon('check')}</span>`;
pages.push({
  file: 'ozellikler.html', path: '/ozellikler', changefreq: 'monthly', priority: '0.9',
  title: 'Özellikler – VetApp Veteriner Klinik Programı',
  description: 'VetApp veteriner programının özellikleri: hasta ve randevu takibi, SOAP muayene, aşı takibi, hızlı satış, kasa, SKT’li ilaç stok takibi, alım faturası, cari ve veresiye, gün sonu paneli.',
  ld: [crumbLd('Özellikler', '/ozellikler')],
  body: () => `${pageHero('Özellikler', 'Bir kliniğin ihtiyacı olan her şey. <span class="soft">Tek uygulamada.</span>', 'Randevudan kasaya, VetApp’in bütün modülleri.')}${campaignStrip()}
    <div class="light">
      <div class="container">
${MODULES.map((m) => `      <section class="module" id="${m.id}">
        <div class="head">
          <div class="text reveal">
            <span class="tag">${m.kicker}</span>
            <h2>${m.h}</h2>
            <p class="lede">${m.lede}</p>
            ${[m.more, m.more2].filter(Boolean).map(([h, t]) => `<a class="more-link" href="${h}">${t} ${arrow}</a>`).join('')}
          </div>
          <div class="reveal d1">${m.mob ? `<div class="mod-phone only-mob">${phoneImg(m.mob, m.alt)}</div><div class="only-desk">${frame(m.shot, m.alt, m.url)}</div>` : frame(m.shot, m.alt, m.url)}</div>
        </div>
        <div class="caps">${m.caps.map(([t, d]) => `<div class="cap reveal">${ck}<div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>
      </section>`).join('\n')}
      </div>
    </div>
${finalCta()}`,
});

// — İlaç depoları —
pages.push({
  file: 'depolar.html', path: '/depolar', changefreq: 'monthly', priority: '0.8',
  title: 'İlaç Depoları İçin İş Ortaklığı – VetApp',
  description: 'Veteriner ilaç depoları için VetApp iş ortaklığı: deponuza özel referans koduyla katılan her klinik için komisyon kazanın, müşterilerinize modern bir klinik yazılımı sunun.',
  ld: [crumbLd('İlaç depoları için', '/depolar')],
  body: () => `${pageHero('İlaç depoları için', 'Kliniklerinize modern bir yazılım sunun. <span class="soft">Her kayıttan kazanın.</span>', 'Deponuza özel referans koduyla VetApp’e katılan her klinik için komisyon kazanırsınız.')}
    <section class="sec light">
      <div class="container">
        <div class="sec-head reveal"><span class="tag">Nasıl işler</span><h2>Dört adımda ortaklık.</h2></div>
        <ol class="steps4">
          <li class="reveal"><span class="n">01</span><h3>Başvurun</h3><p>Formu doldurun, sizi arayalım.</p></li>
          <li class="reveal d1"><span class="n">02</span><h3>Kodunuzu alın</h3><p>Deponuza özel 10 haneli referans kodu.</p></li>
          <li class="reveal d2"><span class="n">03</span><h3>Kliniklerinize tanıtın</h3><p>Klinik kayıtta kodu girer, sizinle eşleşir.</p></li>
          <li class="reveal d3"><span class="n">04</span><h3>Komisyon kazanın</h3><p>Kaydolan klinikleri size raporlarız.</p></li>
        </ol>
      </div>
    </section>
    <section class="sec light alt">
      <div class="container split">
        <div class="reveal" style="display:grid;gap:14px">
          <span class="tag">Neden VetApp</span>
          <h2>Müşterinize değer katın.</h2>
          <ul class="ticks">
            <li>Klinikleriniz stok ve ödemelerini düzenli tutar.</li>
            <li>${STATS.drugs.toLocaleString('tr-TR')} ilaçlık katalog hazır; barkodla saniyeler içinde kart açılır.</li>
            <li>Hangi klinik sizin aracılığınızla geldi, kayıtta bellidir.</li>
            <li>Kurulum yok; klinikler ${CAMPAIGN.freeUntil}’ye kadar tamamen ücretsiz kullanır, ilk ${CAMPAIGN.limit} kliniğe 3 ay da hediye.</li>
          </ul>
        </div>
        <div class="reveal d1">${frame('tedarikciler', 'VetApp tedarikçi cari ekranı', 'panel.vetapp.com.tr/#/accounts/suppliers')}</div>
      </div>
    </section>
    <section class="sec light">
      <div class="container split">
        <div class="reveal" style="display:grid;gap:14px">
          <span class="tag">Başvuru</span>
          <h2>İş ortağımız olun.</h2>
          <p class="lede">Komisyon oranı ve raporlama ortaklık görüşmesinde netleşir.</p>
          <div class="contact-list" style="margin-top:8px">
            <a href="${WA}" target="_blank" rel="noopener"><span class="ic green-l">${waIcon}</span><span><small>WhatsApp</small><b>${PHONE}</b></span></a>
          </div>
        </div>
        <div class="reveal d1">${contactForm({ kind: 'PARTNER', source: '/depolar', orgLabel: 'Depo / firma adı', msgLabel: 'Kısaca deponuzu anlatın (şehir, hizmet verdiğiniz klinik sayısı)', button: 'Başvuruyu gönder' })}</div>
      </div>
    </section>`,
});

// — SSS —
pages.push({
  file: 'sss.html', path: '/sss', changefreq: 'monthly', priority: '0.7',
  title: 'Sık Sorulan Sorular – VetApp Veteriner Programı',
  description: 'Veteriner programı ve VetApp hakkında sık sorulan sorular: Ocak 2027’ye kadar ücretsiz kampanya, cihaz desteği, büyükbaş kullanımı, aşı takibi, stok SKT uyarıları, veresiye yönetimi ve veri güvenliği.',
  ld: [crumbLd('Sık sorulan sorular', '/sss'), faqLd(FAQ.flatMap((g) => g.items))],
  body: () => `${pageHero('Sık sorulan sorular', 'Aklınıza takılanlar.', `Bulamadığınız bir cevap mı var? <a href="${WA}" target="_blank" rel="noopener" style="color:var(--blue2)">WhatsApp’tan sorun</a>.`)}${campaignStrip()}
    <section class="sec light">
      <div class="container" style="max-width:860px">
${FAQ.map((g) => `        <section class="faq-group reveal"><h2>${esc(g.group)}</h2>${faqHtml(g.items)}</section>`).join('\n')}
      </div>
    </section>
${finalCta()}`,
});

// — İletişim —
pages.push({
  file: 'iletisim.html', path: '/iletisim', changefreq: 'yearly', priority: '0.6',
  title: 'İletişim ve Demo Talebi – VetApp',
  description: `VetApp ile iletişime geçin: WhatsApp ${PHONE}, info@vetapp.com.tr. Demo, destek ve iş ortaklığı için bize yazın.`,
  ld: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'İletişim – VetApp', url: SITE + '/iletisim' }, crumbLd('İletişim', '/iletisim')],
  body: () => `${pageHero('İletişim', 'Size nasıl yardımcı olalım?', 'En hızlı yol WhatsApp. Form ve e-posta da açık.')}
    <section class="sec light">
      <div class="container split">
        <div class="contact-list reveal">
          <a href="${WA}" target="_blank" rel="noopener"><span class="ic green-l">${waIcon}</span><span><small>WhatsApp</small><b>${PHONE}</b></span></a>
          <a href="tel:${PHONE.replace(/\s/g, '')}"><span class="ic blue-l">${icon('phone')}</span><span><small>Telefon</small><b>${PHONE}</b></span></a>
          <a href="mailto:info@vetapp.com.tr"><span class="ic blue-l">${icon('mail')}</span><span><small>E-posta</small><b>info@vetapp.com.tr</b></span></a>
          <a href="${URLS.demo}"><span class="ic blue-l">${icon('play')}</span><span><small>Canlı demo</small><b>Kayıt olmadan deneyin</b></span></a>
        </div>
        <div class="reveal d1">${contactForm({
          source: '/iletisim',
          kinds: [['DEMO', 'Demo talebi'], ['SUPPORT', 'Teknik destek'], ['PARTNER', 'İlaç deposu iş ortaklığı'], ['GENERAL', 'Diğer']],
        })}</div>
      </div>
    </section>`,
});

// — Yasal —
const legal = (file, path, title, h1, date, sections) => ({
  file, path, changefreq: 'yearly', priority: '0.4', title: `${title} – VetApp`, description: `VetApp ${title.toLowerCase()}: hizmetin kullanımı ve kişisel verilerin işlenmesine ilişkin koşullar.`,
  ld: [crumbLd(title, path)],
  body: () => `${pageHero('Yasal', h1)}
    <section class="sec white"><div class="container"><div class="prose">
      <p style="color:var(--mute-d)">Son güncelleme: ${date}</p>
${sections.map(([h, html]) => `      ${h ? `<h2>${h}</h2>\n      ` : ''}${html}`).join('\n')}
    </div></div></section>`,
});
pages.push(legal('gizlilik.html', '/gizlilik', 'Gizlilik Politikası', 'Gizlilik politikası', 'Kasım 2026', [
  ['', '<p>VetApp (“Şirket”, “biz”, “bizim”) olarak gizliliğinize önem veriyoruz. Bu Gizlilik Politikası, VetApp uygulamasını ve web sitesini (“Hizmet”) kullanırken kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.</p>'],
  ['1. Toplanan veriler', '<p>Hizmeti kullanırken aşağıdaki bilgileri toplayabiliriz:</p><ul><li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li><li>Klinik bilgileri ve adres</li><li>Uygulama kullanım verileri ve log kayıtları</li><li>Ödeme bilgileri (güvenli ödeme sağlayıcıları aracılığıyla işlenir)</li></ul>'],
  ['2. Verilerin kullanımı', '<p>Topladığımız verileri şu amaçlarla kullanıyoruz:</p><ul><li>Hizmeti sağlamak ve iyileştirmek</li><li>Teknik destek sunmak</li><li>Hesabınızı yönetmek</li><li>Güvenlik ve dolandırıcılık önleme</li><li>Yasal yükümlülükleri yerine getirmek</li></ul>'],
  ['3. Veri güvenliği', '<p>Verilerinizi korumak için endüstri standardı güvenlik önlemleri alıyoruz:</p><ul><li>Tüm bağlantılar SSL/TLS şifrelemesi ile korunur</li><li>Her klinik için ayrı veri alanı sağlanır</li><li>Düzenli güvenlik yedeklemeleri yapılır</li><li>Erişim yetkilendirme sistemleri uygulanır</li></ul>'],
  ['4. Üçüncü taraf paylaşımı', '<p>Kişisel verilerinizi şu durumlar dışında üçüncü taraflarla paylaşmıyoruz:</p><ul><li>Açık rızanız bulunduğunda</li><li>Hizmet sağlayıcılarımızla (barındırma, ödeme işleme)</li><li>Yasal zorunluluk bulunduğunda</li></ul>'],
  ['5. Ziyaret istatistikleri', '<p>Bu web sitesi, ziyaret sayısını ve hangi sayfaların okunduğunu ölçmek için Cloudflare Web Analytics kullanır. Bu hizmet çerez kullanmaz, kişisel veri toplamaz ve ziyaretçiyi tanımlamaz; yalnızca anonim ve toplu istatistik üretir.</p>'],
  ['6. Veri saklama', '<p>Verilerinizi hesabınız aktif olduğu sürece saklarız. Hesabı silmeniz durumunda, verileriniz yasal yükümlülükler kapsamında belirli bir süre daha saklandıktan sonra silinir.</p>'],
  ['7. Haklarınız', '<p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p><ul><li>Kişisel verilerinize erişim hakkı</li><li>Verilerinizin düzeltilmesini talep etme hakkı</li><li>Verilerinizin silinmesini talep etme hakkı</li><li>Veri işlemeye itiraz etme hakkı</li></ul><p>Bu haklarınızı kullanmak için <a href="/iletisim">iletişim sayfamız</a> üzerinden bize ulaşabilirsiniz.</p>'],
  ['8. İletişim', '<p>Gizlilik politikamız hakkında sorularınız için: <a href="mailto:destek@vetapp.com.tr">destek@vetapp.com.tr</a></p>'],
]));
pages.push(legal('kullanim-sartlari.html', '/kullanim-sartlari', 'Kullanım Şartları', 'Kullanım şartları', 'Ocak 2025', [
  ['', '<p>Bu Kullanım Şartları, VetApp (“Hizmet”) kullanımını düzenleyen koşulları belirler. Hizmeti kullanarak bu şartları kabul etmiş sayılırsınız.</p>'],
  ['1. Hizmetin kullanımı', '<p>VetApp’i yalnızca yasal amaçlar için ve bu şartlara uygun şekilde kullanabilirsiniz. Hizmeti kötüye kullanmak, yetkisiz erişim sağlamak veya sistemin güvenliğini tehdit etmek kesinlikle yasaktır.</p>'],
  ['2. Hesap sorumluluğu', '<p>Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi gizli tutun ve hesabınızdaki her türlü faaliyetten sorumlu olduğunuzu kabul edin.</p>'],
  ['3. Veri sahipliği', '<p>Sisteme girdiğiniz tüm veriler (hasta kayıtları, satış verileri, stok bilgileri vb.) size aittir. VetApp bu verileri yalnızca hizmetin sunulması amacıyla kullanır.</p>'],
  ['4. Hizmet sürekliliği', '<p>VetApp, hizmetin kesintisiz çalışması için gerekli önlemleri alır. Ancak bakım, güncellemeler veya teknik sorunlar nedeniyle kısa süreli kesintiler yaşanabilir. Bu durumlarda önceden bildirim yapılmaya çalışılır.</p>'],
  ['5. Fiyatlandırma ve ödeme', '<p>Abonelik ücreti ve ödeme koşulları sözleşme esnasında belirlenir. Fiyat değişiklikleri en az 30 gün önceden bildirilir.</p>'],
  ['6. Fesih', '<p>Hesabınızı istediğiniz zaman iptal edebilirsiniz. VetApp, şartlara aykırı davranış tespit edilmesi durumunda hesabı askıya alma veya feshetme hakkını saklı tutar.</p>'],
  ['7. Sorumluluk sınırlaması', '<p>VetApp, hizmetin kullanımından kaynaklanan dolaylı zararlardan sorumlu tutulamaz. Sistemin doğru kullanımı ve veri yedeklemesi kullanıcının sorumluluğundadır.</p>'],
  ['8. Uygulanacak hukuk', '<p>Bu şartlar Türkiye Cumhuriyeti hukukuna tabidir. Anlaşmazlıklarda İstanbul mahkemeleri yetkilidir.</p>'],
  ['9. İletişim', '<p>Kullanım şartları hakkında sorularınız için: <a href="mailto:destek@vetapp.com.tr">destek@vetapp.com.tr</a></p>'],
]));

// — 404 —
export const notFound = {
  file: '404.html', path: '/404', noindex: true, skipSitemap: true,
  title: 'Sayfa bulunamadı – VetApp', description: 'Aradığınız sayfa bulunamadı.',
  body: () => `
    <section class="page-hero" style="min-height:62vh;display:flex;align-items:center;border:0">
      <div class="grid-fade grid-bg" aria-hidden="true"></div>
      <div class="container">
        <span class="tag">404</span>
        <h1>Bu sayfayı bulamadık.</h1>
        <p class="lede">Adres taşınmış ya da hiç var olmamış olabilir.</p>
        <div class="actions" style="margin-top:8px"><a class="btn btn--primary" href="/">Ana sayfa ${arrow}</a><a class="btn btn--ghost" href="/iletisim">Bize yazın</a></div>
      </div>
    </section>`,
};
