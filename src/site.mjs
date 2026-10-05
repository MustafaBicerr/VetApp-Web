// VetApp tanıtım sitesi — içerik ve şablonlar. `node build.mjs` ile statik HTML üretilir.
export const SITE = 'https://www.vetapp.com.tr';
export const PANEL = 'https://panel.vetapp.com.tr';
export const API = 'https://api.vetapp.com.tr/api';
export const URLS = {
  register: `${PANEL}/#/register`,
  login: `${PANEL}/#/login`,
  demo: `${PANEL}/#/demo`,
};
export const YEAR = new Date().getFullYear();

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ───────── yardımcılar ─────────
const shot = (name, alt, { sizes = '(min-width: 1024px) 760px, 100vw', eager = false } = {}) =>
  `<img src="/assets/img/${name}-1800.webp" srcset="/assets/img/${name}-900.webp 900w, /assets/img/${name}-1800.webp 1800w" sizes="${sizes}" width="1800" height="1125" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const frame = (name, alt, url = 'panel.vetapp.com.tr', opts) =>
  `<div class="frame"><div class="bar"><i></i><i></i><i></i><span class="url">${url}</span></div>${shot(name, alt, opts)}</div>`;
const phone = (name, alt, cls = '') =>
  `<div class="phone ${cls}"><img src="/assets/img/${name}.webp" width="585" height="1266" alt="${esc(alt)}" loading="lazy" decoding="async"></div>`;
const checks = (items) => `<ul class="checks">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
const arrow = '<span class="arr" aria-hidden="true">→</span>';

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
    group: 'Deneme ve fiyat',
    items: [
      ['Ücretsiz deneme nasıl işliyor?', 'Kayıt olduğunuz günden itibaren 30 gün boyunca tüm özellikleri ücretsiz kullanırsınız; kredi kartı istenmez. Süre dolmadan önce uygulama içinde hatırlatırız.'],
      ['Deneme sonrası ne kadar ödeyeceğim?', 'Deneme sonrasında sade bir aylık abonelik uygulanır. Fiyat bilgisi yayına alındığında bu sitede ve kayıt ekranında açıkça gösterilecektir; sürpriz ücret yoktur.'],
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
const HOME_FAQ = [FAQ[0].items[0], FAQ[1].items[0], FAQ[1].items[1], FAQ[2].items[0], FAQ[2].items[3], FAQ[3].items[0]];
const faqHtml = (items) => `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="a"><p>${esc(a)}</p></div></details>`).join('')}</div>`;
const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

// ───────── düzen ─────────
const NAV = [
  ['/ozellikler', 'Özellikler'],
  ['/depolar', 'İlaç depoları için'],
  ['/sss', 'SSS'],
  ['/iletisim', 'İletişim'],
];

export function layout(page, body) {
  const url = SITE + page.path;
  const ld = (page.ld || []).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n  ');
  const nav = NAV.map(([href, label]) => `<a href="${href}"${page.path === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const mnav = NAV.map(([href, label]) => `<a href="${href}">${label}</a>`).join('');
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
  <meta name="theme-color" content="#0A70C8">
  <link rel="alternate" hreflang="tr" href="${url}">
  <link rel="alternate" hreflang="x-default" href="${url}">
  <meta property="og:type" content="website">
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
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="/assets/img/favicon-64.png">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/Geist-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/InstrumentSerif-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="/assets/css/site.css?v=${BUILD_ID}">
  ${ld}
</head>
<body>
  <a class="skip" href="#main">İçeriğe geç</a>
  <header class="site-header" id="top">
    <div class="container">
      <a class="brand" href="/" aria-label="VetApp ana sayfa"><img src="/assets/img/logo.png" width="${Math.round(30 * 3.95)}" height="30" alt="VetApp"></a>
      <nav class="nav" aria-label="Ana menü">${nav}</nav>
      <div class="header-cta">
        <a class="login" href="${URLS.login}">Giriş yap</a>
        <a class="btn btn--primary btn--sm" href="${URLS.register}">30 gün ücretsiz başla</a>
      </div>
      <button class="menu-btn" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobile-menu"><span></span></button>
    </div>
  </header>
  <div class="mobile-menu" id="mobile-menu">
    ${mnav}
    <a class="btn btn--primary" href="${URLS.register}">30 gün ücretsiz başla</a>
    <a class="btn btn--ghost" style="color:var(--ink)" href="${URLS.demo}">Canlı demoyu aç</a>
  </div>
  <main id="main">
${body}
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="foot-grid">
        <div>
          <img src="/assets/img/logo_white.png" width="119" height="30" alt="VetApp" loading="lazy">
          <p>Veteriner klinikleri için hasta, randevu, stok, kasa ve cari hesap yönetimi. Web, Android ve iOS.</p>
        </div>
        <div><h4>Ürün</h4><ul>
          <li><a href="/ozellikler">Özellikler</a></li>
          <li><a href="${URLS.demo}">Canlı demo</a></li>
          <li><a href="${URLS.login}">Giriş yap</a></li>
          <li><a href="${URLS.register}">Ücretsiz başla</a></li>
        </ul></div>
        <div><h4>Şirket</h4><ul>
          <li><a href="/depolar">İlaç depoları için</a></li>
          <li><a href="/sss">Sık sorulan sorular</a></li>
          <li><a href="/iletisim">İletişim</a></li>
        </ul></div>
        <div><h4>Yasal</h4><ul>
          <li><a href="/gizlilik">Gizlilik politikası</a></li>
          <li><a href="/kullanim-sartlari">Kullanım şartları</a></li>
          <li><a href="mailto:destek@vetapp.com.tr">destek@vetapp.com.tr</a></li>
        </ul></div>
      </div>
      <div class="foot-base"><span>© ${YEAR} VetApp. Tüm hakları saklıdır.</span><span>info@vetapp.com.tr</span></div>
    </div>
  </footer>
  <script src="/assets/js/site.js?v=${BUILD_ID}" defer></script>
</body>
</html>
`;
}

export let BUILD_ID = '0';
export const setBuildId = (v) => { BUILD_ID = v; };

// ───────── JSON-LD ─────────
const orgLd = { '@context': 'https://schema.org', '@type': 'Organization', name: 'VetApp', url: SITE + '/', logo: SITE + '/assets/img/logo.png', email: 'info@vetapp.com.tr' };
const siteLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'VetApp', alternateName: ['VetApp Veteriner Klinik Yazılımı', 'VetApp Panel'], url: SITE + '/', inLanguage: 'tr' };
const appLd = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'VetApp', applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android, iOS', inLanguage: 'tr', url: SITE + '/',
  description: 'Veteriner klinikleri için hasta kaydı, randevu, aşı takibi, hızlı satış, kasa, stok ve cari hesap yönetimi yazılımı.',
  offers: { '@type': 'Offer', description: '30 gün ücretsiz deneme, kredi kartı gerekmez.' },
  publisher: { '@type': 'Organization', name: 'VetApp', url: SITE + '/' },
};
const crumbLd = (name, path) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'VetApp', item: SITE + '/' },
  { '@type': 'ListItem', position: 2, name, item: SITE + path },
] });

const pageHero = (crumb, h1, lede) => `
    <section class="page-hero">
      <div class="container">
        <p class="crumbs"><a href="/">VetApp</a> / ${esc(crumb)}</p>
        <h1>${h1}</h1>
        ${lede ? `<p class="lede">${lede}</p>` : ''}
      </div>
    </section>`;

const ctaBand = (title = 'Kliniğinizi 30 gün <em>ücretsiz</em> deneyin.', text = 'Kayıt olun, stok ve cari kayıtlarınızı ekleyin, ilk satışınızı yapın. Kredi kartı gerekmez.') => `
    <section class="cta">
      <div class="container reveal">
        <h2>${title}</h2>
        <p>${text}</p>
        <div class="actions">
          <a class="btn btn--light" href="${URLS.register}">Ücretsiz başlayın ${arrow}</a>
          <a class="btn btn--outline-light" href="${URLS.demo}">Canlı demoyu açın</a>
        </div>
      </div>
    </section>`;

const contactForm = ({ kind = 'GENERAL', source, orgLabel = 'Klinik / kurum', msgLabel = 'Mesajınız', kinds = null, button = 'Mesajı gönder' }) => `
        <form class="card" data-contact data-api="${API}/public/contact" novalidate>
          <input type="hidden" name="source_page" value="${source}">
          <div class="fields">
            <div class="field"><label for="f-name">Ad soyad</label><input id="f-name" name="name" autocomplete="name" required minlength="2"></div>
            <div class="field"><label for="f-email">E-posta</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
            <div class="field"><label for="f-phone">Telefon <span style="font-weight:400;color:var(--muted)">(isteğe bağlı)</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
            <div class="field"><label for="f-org">${orgLabel}</label><input id="f-org" name="organization" autocomplete="organization"></div>
            ${kinds ? `<div class="field full"><label for="f-kind">Konu</label><select id="f-kind" name="kind">${kinds.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>` : `<input type="hidden" name="kind" value="${kind}">`}
            <div class="field full"><label for="f-msg">${msgLabel}</label><textarea id="f-msg" name="message" required minlength="10"></textarea></div>
            <div class="hp" aria-hidden="true"><label>Web sitesi <input name="website" tabindex="-1" autocomplete="off"></label></div>
            <label class="consent"><input type="checkbox" name="consent" required><span>Mesajımın yanıtlanabilmesi için bilgilerimin işlenmesini ve <a href="/gizlilik" style="color:var(--brand)">gizlilik politikasını</a> okuduğumu onaylıyorum.</span></label>
          </div>
          <div class="form-foot"><button class="btn btn--primary" type="submit">${button}</button><span class="form-msg" role="status" aria-live="polite"></span></div>
        </form>`;

// ───────── SAYFALAR ─────────
export const pages = [];

// — Ana sayfa —
pages.push({
  file: 'index.html', path: '/', changefreq: 'weekly', priority: '1.0',
  title: 'VetApp – Veteriner Klinik Yönetim Yazılımı',
  description: 'Hasta kaydı, randevu, aşı takibi, hızlı satış, kasa, stok ve cari hesap — veteriner klinikleri için tek panel. Web, Android ve iOS. 30 gün ücretsiz deneyin.',
  ld: [orgLd, siteLd, appLd, faqLd(HOME_FAQ)],
  body: () => `
    <section class="hero">
      <div class="container grid">
        <div class="copy">
          <span class="eyebrow"><b>Yeni</b> Veteriner klinikleri için klinik yönetim yazılımı</span>
          <h1>Kliniğinizin tüm günü, <em>tek ekranda.</em></h1>
          <p class="lede">Hasta kaydı, randevu, aşı takibi, stok, kasa ve cari hesap — hepsi aynı panelde. Web’de, Android’de ve iOS’ta aynı hesapla çalışın.</p>
          <div class="actions">
            <a class="btn btn--primary" href="${URLS.register}">30 gün ücretsiz başlayın ${arrow}</a>
            <a class="btn btn--ghost" href="${URLS.demo}">Canlı demoyu açın</a>
          </div>
          <div class="assure"><span>Kredi kartı gerekmez</span><span>Kurulum yok</span><span>Demo kayıt gerektirmez</span></div>
        </div>
        <div class="visual">
          ${frame('dashboard', 'VetApp panel: günlük kasa, alacaklar, saatlik satış grafiği ve haftalık performans', 'panel.vetapp.com.tr', { sizes: '(min-width: 1024px) 760px, 100vw', eager: true })}
          ${phone('m-dashboard', 'VetApp mobil uygulaması genel bakış ekranı')}
        </div>
      </div>
    </section>

    <section class="facts" aria-label="Rakamlarla VetApp">
      <div class="container">
        <div class="fact"><b>1.694</b><span>hazır ilaç kaydı; barkodla ürün kartı otomatik oluşur</span></div>
        <div class="fact"><b>30 gün</b><span>ücretsiz deneme, kredi kartı istenmez</span></div>
        <div class="fact"><b>3 platform</b><span>web, Android ve iOS — tek hesap</span></div>
        <div class="fact"><b>Ayrı alan</b><span>her klinik kendi verisiyle, kendi hesabında çalışır</span></div>
      </div>
    </section>

    <section class="section" id="ozellikler">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">Neler yapabilirsiniz</span>
          <h2>Muayeneden kasa kapanışına, <em>günün her anı</em> için.</h2>
          <p class="lede">VetApp bir klinikte günün nasıl aktığına göre tasarlandı: hasta kapıdan girer, muayene olur, aşı yapılır, satış kesilir, tahsilat alınır — hepsi aynı kayıtta birleşir.</p>
        </div>

        <article class="chapter reveal">
          <div class="text">
            <span class="kicker">01 · Klinik</span>
            <h2>Hasta kartından <em>aşı karnesine.</em></h2>
            <p>Her hayvan için tür, ırk, sahip ve kilo geçmişi. Randevudan muayeneye, muayeneden aşıya tek akış.</p>
            ${checks([
              '<b>Randevu takvimi</b> — planlandı, geldi, tamamlandı, gelmedi durumlarıyla',
              '<b>SOAP muayene kaydı</b> — şikâyet, bulgular, tanı, tedavi planı; kilo, ateş, nabız',
              '<b>Aşı protokolleri</b> ve vadesi gelen/geciken aşı gündemi',
              '<b>Muayeneden satışa</b> geçiş: yapılan işlem tek tıkla kasaya taşınır',
            ])}
          </div>
          ${frame('klinik', 'VetApp klinik ekranı: bugünkü randevular ve aşı gündemi', 'panel.vetapp.com.tr/#/clinic', { sizes: '(min-width: 1024px) 700px, 100vw' })}
        </article>

        <article class="chapter rev reveal">
          <div class="text">
            <span class="kicker">02 · Satış ve kasa</span>
            <h2>Barkodu okutun, <em>tahsilatı tek ekranda</em> alın.</h2>
            <p>Dokunmatik uyumlu hızlı satış ekranı; nakit, kart, karma ve veresiye ödeme; gün sonu kasa.</p>
            ${checks([
              '<b>Satır bazlı ödeme</b> — aynı sepette peşin ve veresiye kalemler',
              '<b>Karma ödeme</b> ve parça parça tahsilat',
              '<b>Gün sonu kasa</b>, masraf girişi ve kasa hareket dökümü',
              '<b>Parti ve SKT’ye göre</b> otomatik stok düşümü',
            ])}
          </div>
          ${frame('pos', 'VetApp hızlı satış ekranı: ürün kartları, müşteri seçimi ve ödeme yöntemi', 'panel.vetapp.com.tr/#/sales/pos', { sizes: '(min-width: 1024px) 700px, 100vw' })}
        </article>

        <article class="chapter reveal">
          <div class="text">
            <span class="kicker">03 · Stok</span>
            <h2>İlaç stoğu, <em>son kullanma tarihine</em> kadar izlenir.</h2>
            <p>1.694 ilaçlık referans katalog ve barkod desteğiyle ürün kartı açmak saniyeler sürer.</p>
            ${checks([
              '<b>Barkod okutun</b>, ürün kartı kataloğdan otomatik gelsin',
              '<b>Parti ve SKT takibi</b>; yaklaşan SKT ve kritik stok uyarıları',
              '<b>Alım faturası</b>: çoklu iskonto, KDV, vade ve tedarikçi borcu',
              '<b>İlk stok girişi</b> ile açılış bakiyenizi tek seferde kaydedin',
            ])}
          </div>
          ${frame('urunler', 'VetApp ürünler ve stok listesi', 'panel.vetapp.com.tr/#/stock/products', { sizes: '(min-width: 1024px) 700px, 100vw' })}
        </article>

        <article class="chapter rev reveal">
          <div class="text">
            <span class="kicker">04 · Cari</span>
            <h2>Veresiye düzenli, <em>tahsilat net.</em></h2>
            <p>Müşteri ve tedarikçi hesapları, vadeler ve tahsilatlar tek bakışta.</p>
            ${checks([
              '<b>Müşteri ve tedarikçi cari</b> — borç/alacak geçmişi ve bakiye',
              '<b>Kısmi ve fatura bazlı</b> tahsilat ve ödeme',
              '<b>Devreden bakiye</b> girişi; vadesi gelenler için uyarılar',
              '<b>Enflasyon korumalı</b> veresiye: fiyat değişimi açık alacağa yansır',
            ])}
          </div>
          ${frame('musteriler', 'VetApp müşteri cari listesi: toplam alacak, borçlu müşteriler ve günlük tahsilat', 'panel.vetapp.com.tr/#/accounts', { sizes: '(min-width: 1024px) 700px, 100vw' })}
        </article>
      </div>
    </section>

    <section class="section section--wash" aria-labelledby="devices-h">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">Her cihazda</span>
          <h2 id="devices-h">Cebinizde de <em>aynı klinik.</em></h2>
          <p class="lede">Masaüstünde başladığınız işi telefonda sürdürün. Aynı hesap, aynı veri — Android ve iOS uygulamasıyla.</p>
        </div>
        <div class="devices reveal">
          <figure>${phone('m-dashboard', 'Mobil genel bakış')}<figcaption>Genel bakış</figcaption></figure>
          <figure>${phone('m-pos', 'Mobil hızlı satış')}<figcaption>Hızlı satış</figcaption></figure>
          <figure>${phone('m-stok', 'Mobil stok')}<figcaption>Stok</figcaption></figure>
          <figure>${phone('m-klinik', 'Mobil klinik ekranı')}<figcaption>Klinik</figcaption></figure>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="steps-h">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">Başlamak kolay</span>
          <h2 id="steps-h">Üç adımda <em>kullanıma hazır.</em></h2>
        </div>
        <div class="steps reveal">
          <div class="step"><div class="n">1</div><h3>Hesabınızı oluşturun</h3><p>Klinik bilgilerinizi girin, e-postanızı doğrulayın. Deponuzdan referans kodu aldıysanız kayıtta girin.</p></div>
          <div class="step"><div class="n">2</div><h3>Stok ve carilerinizi ekleyin</h3><p>Barkodla ürünlerinizi tanıtın, müşteri ve tedarikçilerinizi ve varsa devreden bakiyelerini kaydedin.</p></div>
          <div class="step"><div class="n">3</div><h3>Satışa ve randevuya başlayın</h3><p>İlk muayeneyi açın, ilk satışı kesin. Panel, günün özetini sizin için hazırlar.</p></div>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="container">
        <div class="text reveal">
          <span class="kicker">İlaç depoları için</span>
          <h2>Kliniklerinize <em>modern bir yazılım</em> sunun.</h2>
          <p>Veteriner ilaç depolarıyla iş ortaklığı yapıyoruz: deponuza özel referans koduyla VetApp’e katılan her klinik için komisyon kazanın, müşterilerinize değer katın.</p>
          <div class="actions"><a class="btn btn--light" href="/depolar">İş ortaklığı hakkında ${arrow}</a></div>
        </div>
        <div class="terms reveal">
          <div><b>Size özel referans kodu</b><span>Her depoya 10 haneli benzersiz bir kod tahsis edilir.</span></div>
          <div><b>Kayıtta otomatik eşleşme</b><span>Klinik kayıt sırasında kodu girer; hangi klinik hangi depo aracılığıyla geldi bilinir.</span></div>
          <div><b>Klinik başına komisyon</b><span>Koşullar ortaklık sözleşmesinde netleştirilir.</span></div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="faq-h">
      <div class="container">
        <div class="section-head reveal">
          <span class="kicker">Sık sorulanlar</span>
          <h2 id="faq-h">Aklınıza takılanlar.</h2>
        </div>
        <div class="reveal">${faqHtml(HOME_FAQ)}</div>
        <p style="margin-top:28px"><a class="btn btn--ghost" href="/sss">Tüm soruları gör ${arrow}</a></p>
      </div>
    </section>
${ctaBand()}`,
});

// — Özellikler —
const MODULES = [
  { id: 'klinik', kicker: 'Klinik', h: 'Hasta kayıtları, <em>randevu ve aşı.</em>', shot: 'hastalar', alt: 'VetApp hasta listesi', url: 'panel.vetapp.com.tr/#/clinic/patients', lede: 'Klinik iş akışının omurgası: hasta, randevu, muayene ve aşı bir arada.', caps: [
    ['Hasta (hayvan) kartı', 'Tür ve ırk kataloğu, sahibi, doğum tarihi, cinsiyet, kısırlaştırma, renk, çip no ve kilo.'],
    ['Randevu takvimi', 'Gün bazlı liste; personel, oda ve süre; planlandı / geldi / tamamlandı / gelmedi / iptal durumları.'],
    ['SOAP muayene', 'Şikâyet, anamnez, klinik bulgular, tanı ve tedavi planı; kilo, ateş, nabız ve solunum.'],
    ['Aşı takibi', 'Tür bazlı aşı protokolleri; uygulama ve bir sonraki tarih; vadesi yaklaşan ve geciken aşı gündemi.'],
    ['Hasta zaman çizelgesi', 'Muayeneler, randevular ve aşılar tek kronolojik akışta.'],
    ['Muayeneden satışa', 'Yapılan işlem tek tıkla satış ekranına taşınır; satış hasta ve muayeneyle ilişkilendirilir.'],
  ] },
  { id: 'satis', kicker: 'Satış ve kasa', h: 'Hızlı satış ve <em>net kasa.</em>', shot: 'kasa', alt: 'VetApp kasa ve gider yönetimi', url: 'panel.vetapp.com.tr/#/sales/cash', lede: 'Sıra bekleyen müşteriye saniyeler içinde satış; gün sonunda kasayla birebir uyum.', caps: [
    ['Hızlı satış ekranı', 'Ürün arama, barkod okutma, müşteri seçimi ve ödeme tek ekranda.'],
    ['Ödeme yöntemleri', 'Nakit, kart, karma ve veresiye; aynı sepette satır bazında peşin/veresiye.'],
    ['Kasa hareketleri', 'Satış tahsilatları, veresiye tahsilatları ve masraflar tarih ve yönteme göre listelenir.'],
    ['Masraf girişi', 'Günlük giderleri kategoriyle kaydedin; net kasa otomatik hesaplanır.'],
    ['Gün sonu', 'Nakit ve kart toplamları, günlük gider ve net kasa tek özet kartında.'],
    ['Satış geçmişi', 'Fiş detayları, indirimli ve veresiye satış filtreleri.'],
  ] },
  { id: 'stok', kicker: 'Stok', h: 'İlaç ve ürün stoğu, <em>SKT’ye kadar.</em>', shot: 'stok-giris', alt: 'VetApp alım faturası ve stok girişi ekranı', url: 'panel.vetapp.com.tr/#/stock/entry', lede: 'Referans ilaç kataloğu ve barkodla hızlı kayıt; parti ve son kullanma tarihiyle güvenli takip.', caps: [
    ['İlaç referans kataloğu', '1.694 ilaçlık kataloğu arayın; kendi ürün kartınızı tek tıkla oluşturun.'],
    ['Barkod', 'Kamerayla veya barkod okuyucuyla ürün bulun, barkodsuz ürüne barkod tanımlayın.'],
    ['Parti ve SKT', 'Her giriş parti ve son kullanma tarihiyle tutulur; satışta SKT’si yakın olan parti öne alınır.'],
    ['Uyarılar', 'Kritik stok eşiği ve SKT yaklaşan ürünler panelde görünür.'],
    ['Alım faturası (mal kabul)', 'Çoklu iskonto, KDV, vade, mal fazlası; stok ve tedarikçi borcu otomatik güncellenir.'],
    ['İlk stok girişi', 'Açılış stoğunu bir seferde kaydedin; devreden bakiyeyle başlayın.'],
  ] },
  { id: 'cari', kicker: 'Cari hesap', h: 'Müşteri ve tedarikçi <em>hesapları.</em>', shot: 'tedarikciler', alt: 'VetApp tedarikçi cari listesi', url: 'panel.vetapp.com.tr/#/accounts/suppliers', lede: 'Kime borçlusunuz, kimden alacağınız var — vade vade, fatura fatura.', caps: [
    ['Müşteri cari', 'Borç/alacak geçmişi, açık satışlar ve tahsilat kayıtları.'],
    ['Tedarikçi cari', 'Alım faturaları, vadeler ve ödemeler; fatura bazlı veya tutar bazlı kısmi ödeme.'],
    ['Resmî depo listesi', '300’den fazla veteriner ilaç deposu listesinden tedarikçi seçerek hızlı kayıt.'],
    ['Devreden bakiye', 'Müşteri ve tedarikçi açılış bakiyelerini ayrı etiketle kaydedin.'],
    ['Enflasyon korumalı veresiye', 'Fiyat güncellemesi, açık veresiye kalemlere fark olarak yansıtılabilir.'],
    ['Veresiye güvenliği', 'Veresiye satışta müşteri kimlik doğrulaması ve borçlu müşteri uyarısı.'],
  ] },
  { id: 'panel', kicker: 'Panel ve raporlar', h: 'Güne <em>özet kartlarıyla</em> başlayın.', shot: 'dashboard', alt: 'VetApp genel bakış paneli', url: 'panel.vetapp.com.tr', lede: 'Kasa, alacak, borç, stok ve randevu — işletmenin nabzı tek ekranda.', caps: [
    ['Günlük özet', 'Günlük kasa, genel alacak, tedarikçi borçları, bugünkü randevular ve kritik stok.'],
    ['Saatlik satış grafiği', 'Satış hacmi, peşin kasa ve tahsilat; yoğun saatlerinizi görün.'],
    ['Ödeme akışı', 'Nakit ve kart payı, saat bazında dağılım.'],
    ['Haftalık performans', 'Son 7 günün satış, kasa ve tahsilat karşılaştırması.'],
    ['Kasa özeti', 'Bu ay ve tüm zamanlar için net nakit ve net kart.'],
    ['Detaya inme', 'Kartlara tıklayarak işlem ve fatura detaylarına geçin.'],
  ] },
];
pages.push({
  file: 'ozellikler.html', path: '/ozellikler', changefreq: 'monthly', priority: '0.9',
  title: 'Özellikler – VetApp Veteriner Klinik Yazılımı',
  description: 'VetApp özellikleri: hasta ve randevu, SOAP muayene, aşı takibi, hızlı satış, kasa, parti/SKT stok takibi, alım faturası, cari hesap ve dashboard.',
  ld: [crumbLd('Özellikler', '/ozellikler')],
  body: () => `${pageHero('Özellikler', 'Bir kliniğin ihtiyaç duyduğu <em>her adım,</em> tek yazılımda.', 'VetApp’in kapsadığı modüller ve her birinde neler yapabileceğiniz.')}
    <div class="container">
${MODULES.map((m) => `      <section class="module reveal" id="${m.id}">
        <div class="head">
          <div class="text">
            <span class="kicker">${m.kicker}</span>
            <h2>${m.h}</h2>
            <p class="lede">${m.lede}</p>
          </div>
          ${frame(m.shot, m.alt, m.url, { sizes: '(min-width: 1024px) 700px, 100vw' })}
        </div>
        <div class="cap-grid">${m.caps.map(([t, d]) => `<div class="cap"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
      </section>`).join('\n')}
    </div>
${ctaBand()}`,
});

// — İlaç depoları —
pages.push({
  file: 'depolar.html', path: '/depolar', changefreq: 'monthly', priority: '0.8',
  title: 'İlaç Depoları İçin İş Ortaklığı – VetApp',
  description: 'Veteriner ilaç depoları için VetApp iş ortaklığı: deponuza özel referans koduyla katılan her klinik için komisyon kazanın, müşterilerinize modern bir klinik yazılımı sunun.',
  ld: [crumbLd('İlaç depoları için', '/depolar')],
  body: () => `${pageHero('İlaç depoları için', 'Kliniklerinize <em>modern bir yazılım</em> sunun.', 'VetApp, veteriner ilaç depolarıyla iş ortaklığı yapar. Deponuza özel referans koduyla VetApp’e katılan her klinik için komisyon kazanırsınız; müşterileriniz de stok, kasa ve cari işlerini tek panelde yönetir.')}
    <section class="section">
      <div class="container">
        <div class="section-head reveal"><span class="kicker">Nasıl işler</span><h2>Dört adımda <em>ortaklık.</em></h2></div>
        <div class="steps reveal" style="grid-template-columns:repeat(4,1fr)">
          <div class="step"><div class="n">1</div><h3>Başvurun</h3><p>Aşağıdaki formla bize ulaşın; sizi arayıp ortaklığı birlikte netleştirelim.</p></div>
          <div class="step"><div class="n">2</div><h3>Kodunuzu alın</h3><p>Deponuza özel, benzersiz 10 haneli bir referans kodu tahsis edilir.</p></div>
          <div class="step"><div class="n">3</div><h3>Kliniklerinize tanıtın</h3><p>Müşterileriniz kayıt sırasında kodu girer; klinik sizinle eşleşir.</p></div>
          <div class="step"><div class="n">4</div><h3>Komisyon kazanın</h3><p>Koşullar ortaklık sözleşmesinde belirlenir; kaydolan klinikleri size raporlarız.</p></div>
        </div>
      </div>
    </section>
    <section class="section section--wash">
      <div class="container">
        <div class="chapter" style="padding:0">
          <div class="text reveal">
            <span class="kicker">Neden VetApp</span>
            <h2>Müşterinize <em>değer katın,</em> bağınızı güçlendirin.</h2>
            ${checks([
              '<b>Stok ve cari düzeni</b> — müşterilerinizin sipariş ve ödeme takibi kolaylaşır',
              '<b>1.694 ilaçlık katalog</b> hazır; ürün kartı barkodla saniyeler içinde açılır',
              '<b>Sizin adınıza kayıt eşleşmesi</b> — hangi klinik hangi depo aracılığıyla geldi bellidir',
              '<b>Kurulum yok</b> — klinikler web ve mobilde hemen başlar, 30 gün ücretsiz dener',
            ])}
          </div>
          <div class="reveal">${frame('tedarikciler', 'VetApp tedarikçi cari ekranı', 'panel.vetapp.com.tr/#/accounts/suppliers', { sizes: '(min-width: 1024px) 640px, 100vw' })}</div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container contact-grid">
        <div class="contact-info reveal">
          <span class="kicker">Başvuru</span>
          <h2 style="font-size:clamp(2rem,3.4vw,2.9rem)">İş ortağımız <em>olun.</em></h2>
          <p class="lede">Formu doldurun; en kısa sürede dönüş yapalım. Komisyon oranı, ödeme dönemi ve raporlama ortaklık görüşmesinde netleştirilir.</p>
        </div>
        <div class="reveal">${contactForm({ kind: 'PARTNER', source: '/depolar', orgLabel: 'Depo / firma adı', msgLabel: 'Kısaca deponuzu anlatın (şehir, hizmet verdiğiniz klinik sayısı)', button: 'Başvuruyu gönder' })}</div>
      </div>
    </section>`,
});

// — SSS —
pages.push({
  file: 'sss.html', path: '/sss', changefreq: 'monthly', priority: '0.7',
  title: 'Sık Sorulan Sorular – VetApp',
  description: 'VetApp hakkında sık sorulan sorular: ücretsiz deneme, cihaz desteği, aşı takibi, stok SKT uyarıları, veresiye yönetimi ve veri güvenliği.',
  ld: [crumbLd('Sık sorulan sorular', '/sss'), faqLd(FAQ.flatMap((g) => g.items))],
  body: () => `${pageHero('Sık sorulan sorular', 'Aklınıza takılan <em>her şey.</em>', 'Bulamadığınız bir yanıt varsa <a href="/iletisim" style="color:var(--brand)">bize yazın</a>.')}
    <div class="container" style="padding-bottom:96px">
${FAQ.map((g) => `      <section class="faq-group reveal"><h2>${esc(g.group)}</h2>${faqHtml(g.items)}</section>`).join('\n')}
    </div>
${ctaBand()}`,
});

// — İletişim —
pages.push({
  file: 'iletisim.html', path: '/iletisim', changefreq: 'yearly', priority: '0.6',
  title: 'İletişim ve Demo Talebi – VetApp',
  description: 'VetApp ile iletişime geçin: demo talebi, destek ve iş ortaklığı soruları için bize yazın. info@vetapp.com.tr',
  ld: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'İletişim – VetApp', url: SITE + '/iletisim' }, crumbLd('İletişim', '/iletisim')],
  body: () => `${pageHero('İletişim', 'Size nasıl <em>yardımcı</em> olabiliriz?', 'Demo, destek veya iş ortaklığı için formu doldurun ya da doğrudan e-posta gönderin.')}
    <section class="section" style="padding-top:56px">
      <div class="container contact-grid">
        <div class="contact-info reveal">
          <dl>
            <div><dt>Genel</dt><dd><a href="mailto:info@vetapp.com.tr">info@vetapp.com.tr</a></dd></div>
            <div><dt>Destek ve gizlilik</dt><dd><a href="mailto:destek@vetapp.com.tr">destek@vetapp.com.tr</a></dd></div>
            <div><dt>Canlı demo</dt><dd><a href="${URLS.demo}">Demoyu hemen açın</a> — kayıt gerekmez</dd></div>
          </dl>
        </div>
        <div class="reveal">${contactForm({
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
    <section class="section" style="padding-top:48px"><div class="container"><div class="prose">
      <p style="color:var(--muted)">Son güncelleme: ${date}</p>
${sections.map(([h, html]) => `      <h2>${h}</h2>\n      ${html}`).join('\n')}
    </div></div></section>`,
});
pages.push(legal('gizlilik.html', '/gizlilik', 'Gizlilik Politikası', 'Gizlilik <em>politikası</em>', 'Ocak 2025', [
  ['', '<p>VetApp (“Şirket”, “biz”, “bizim”) olarak gizliliğinize önem veriyoruz. Bu Gizlilik Politikası, VetApp uygulamasını ve web sitesini (“Hizmet”) kullanırken kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.</p>'],
  ['1. Toplanan veriler', '<p>Hizmeti kullanırken aşağıdaki bilgileri toplayabiliriz:</p><ul><li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li><li>Klinik bilgileri ve adres</li><li>Uygulama kullanım verileri ve log kayıtları</li><li>Ödeme bilgileri (güvenli ödeme sağlayıcıları aracılığıyla işlenir)</li></ul>'],
  ['2. Verilerin kullanımı', '<p>Topladığımız verileri şu amaçlarla kullanıyoruz:</p><ul><li>Hizmeti sağlamak ve iyileştirmek</li><li>Teknik destek sunmak</li><li>Hesabınızı yönetmek</li><li>Güvenlik ve dolandırıcılık önleme</li><li>Yasal yükümlülükleri yerine getirmek</li></ul>'],
  ['3. Veri güvenliği', '<p>Verilerinizi korumak için endüstri standardı güvenlik önlemleri alıyoruz:</p><ul><li>Tüm bağlantılar SSL/TLS şifrelemesi ile korunur</li><li>Her klinik için ayrı veri alanı sağlanır</li><li>Düzenli güvenlik yedeklemeleri yapılır</li><li>Erişim yetkilendirme sistemleri uygulanır</li></ul>'],
  ['4. Üçüncü taraf paylaşımı', '<p>Kişisel verilerinizi şu durumlar dışında üçüncü taraflarla paylaşmıyoruz:</p><ul><li>Açık rızanız bulunduğunda</li><li>Hizmet sağlayıcılarımızla (barındırma, ödeme işleme)</li><li>Yasal zorunluluk bulunduğunda</li></ul>'],
  ['5. Veri saklama', '<p>Verilerinizi hesabınız aktif olduğu sürece saklarız. Hesabı silmeniz durumunda, verileriniz yasal yükümlülükler kapsamında belirli bir süre daha saklandıktan sonra silinir.</p>'],
  ['6. Haklarınız', '<p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p><ul><li>Kişisel verilerinize erişim hakkı</li><li>Verilerinizin düzeltilmesini talep etme hakkı</li><li>Verilerinizin silinmesini talep etme hakkı</li><li>Veri işlemeye itiraz etme hakkı</li></ul><p>Bu haklarınızı kullanmak için <a href="/iletisim">iletişim sayfamız</a> üzerinden bize ulaşabilirsiniz.</p>'],
  ['7. İletişim', '<p>Gizlilik politikamız hakkında sorularınız için: <a href="mailto:destek@vetapp.com.tr">destek@vetapp.com.tr</a></p>'],
]));
pages.push(legal('kullanim-sartlari.html', '/kullanim-sartlari', 'Kullanım Şartları', 'Kullanım <em>şartları</em>', 'Ocak 2025', [
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
    <section class="page-hero" style="min-height:60vh;display:flex;align-items:center">
      <div class="container">
        <p class="kicker">404</p>
        <h1 style="margin-top:18px">Bu sayfayı <em>bulamadık.</em></h1>
        <p class="lede" style="margin-top:22px">Aradığınız adres taşınmış ya da hiç var olmamış olabilir.</p>
        <p style="margin-top:32px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn--primary" href="/">Ana sayfaya dön ${arrow}</a><a class="btn btn--ghost" href="/iletisim">Bize yazın</a></p>
      </div>
    </section>`,
};
