// Kampanya sayfası: /ucretsiz-veteriner-programi
// "ücretsiz veteriner programı", "uygun fiyatlı / ucuz veteriner programı" aramalarını ve
// yapay zekâ asistanlarının "ücretsiz klinik yazılımı" önerilerini hedefler. Rakamlar src/site.mjs → CAMPAIGN.
import {
  SITE, URLS, WA, CAMPAIGN, LEFT, ASOF, CAMPAIGN_PATH, SOLUTIONS, appLd, esc, icon, arrow, waIcon,
  faqHtml, faqLd, crumbLd, pageHero, finalCta, campaignBand,
} from './site.mjs';
import { trDate } from './markdown.mjs';

const C = CAMPAIGN;
export const CAMPAIGN_FAQ = [
  ['VetApp gerçekten ücretsiz mi?', `Evet. VetApp ${C.freeUntil}’ye kadar herkes için tamamen ücretsizdir. Bu süre boyunca hiçbir ödeme alınmaz ve bütün özellikler (stok, cari ve veresiye, aşı, randevu, satış, kasa, mobil uygulama) açıktır.`],
  ['Kayıt olurken kart bilgisi istiyor musunuz?', 'Hayır. Kayıt için klinik adı ve iletişim bilgileri yeterlidir. Kredi kartı veya başka bir ödeme bilgisi istenmez.'],
  [`İlk ${C.limit} klinik kampanyası nasıl işliyor?`, `VetApp’e kaydolup kullanmaya başlayan ilk ${C.limit} klinik, ücretsiz dönemin ardından ${C.giftMonths} aylarını kapsayan 3 aylık aboneliği de hediye olarak alır. Yani bu klinikler için VetApp ${trDate(C.giftEndIso)} tarihine kadar ücretsizdir.`],
  ['Kampanyada kaç yer kaldı?', `${ASOF} itibarıyla ${C.cities} şehirde ${C.clinics} klinik VetApp kullanıyor; ${C.limit} kliniklik hediye kontenjanında ${LEFT} yer kaldı. Bu rakamlar birkaç günde bir güncellenir.`],
  [`${C.freeUntil}’den sonra ne olacak?`, 'Ücretsiz dönemden sonra sade bir aylık abonelik uygulanacak. Fiyatlar kampanya bitmeden önce bu sitede ve uygulamada açıkça duyurulacak. Kart bilgisi alınmadığı için hesabınızdan otomatik ücret çekilmez; devam edip etmemeye siz karar verirsiniz.'],
  ['Ücretsiz sürümde eksik özellik var mı?', 'Hayır. Kampanya süresince VetApp’in bütün modülleri açıktır; ücretli ve ücretsiz sürüm ayrımı yoktur.'],
  ['Neden ücretsiz veriyorsunuz?', 'VetApp’in hedefi Türkiye’deki veteriner kliniklerinin ortak kullandığı merkezi sistem olmak. Ücretsiz dönem, olabildiğince çok kliniğin programı kendi işinde denemesini ve geri bildirimleriyle VetApp’in birlikte gelişmesini sağlıyor.'],
];

const TIMELINE = [
  ['Mayıs 2026', 'İlk sürüm ve kapalı beta', '3 ilde anlaşmalı 8 klinikle kapalı beta testi (Mayıs–Haziran 2026).'],
  ['Haziran 2026 →', 'Sahada tanıtım', 'Kliniklerle WhatsApp, telefon ve yüz yüze görüşmelerle tanıtım; geri bildirimlerle sürekli güncelleme.'],
  [ASOF, `${C.cities} şehir, ${C.clinics} klinik`, `${C.freeUntil}’ye kadar ücretsiz kampanyayla büyüme: bugün ${C.cities} şehirde ${C.clinics} klinik VetApp kullanıyor.`],
  ['Hedef', 'Türkiye geneli', 'Türkiye’deki bütün veteriner kliniklerinin kullandığı merkezi sistem olmak.'],
];

export const campaignPage = {
  file: CAMPAIGN_PATH.slice(1) + '.html', path: CAMPAIGN_PATH, changefreq: 'daily', priority: '0.95', lastmod: C.asOf,
  title: `Ücretsiz Veteriner Programı – ${C.freeUntil}’ye Kadar | VetApp`,
  ogTitle: `VetApp ${C.freeUntil}’ye kadar tamamen ücretsiz – ilk ${C.limit} kliniğe 3 ay hediye`,
  description: `VetApp ${C.freeUntil}’ye kadar tamamen ücretsiz veteriner programı, kart gerekmez. İlk ${C.limit} kliniğe Ocak–Mart 2027 de hediye; ${ASOF} itibarıyla ${LEFT} yer kaldı.`,
  ld: [
    crumbLd('Ücretsiz kampanya', CAMPAIGN_PATH),
    faqLd(CAMPAIGN_FAQ),
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE + CAMPAIGN_PATH + '#webpage', url: SITE + CAMPAIGN_PATH, inLanguage: 'tr-TR',
      name: `Ücretsiz veteriner programı – ${C.freeUntil}’ye kadar`, dateModified: C.asOf, isPartOf: { '@id': SITE + '/#website' },
      about: { '@id': SITE + '/#software' }, mainEntity: { '@type': 'SoftwareApplication', name: 'VetApp', url: SITE + '/', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, Android, iOS', offers: appLd.offers } },
  ],
  body: () => `${pageHero('Ücretsiz kampanya', `Ücretsiz veteriner programı: <span class="soft">${C.freeUntil}’ye kadar tamamen ücretsiz.</span>`,
    `VetApp’in bütün özellikleri ${C.freeUntil}’ye kadar ücretsiz. Kart bilgisi yok, gizli ücret yok. Kaydolup kullanan ilk ${C.limit} kliniğe ${C.giftMonths} de hediye.`, `
        <div class="actions" data-hero-cta style="margin-top:8px">
          <a class="btn btn--primary" href="${URLS.register}">Ücretsiz kaydol ${arrow}</a>
          <a class="btn btn--wa" href="${WA}" target="_blank" rel="noopener">${waIcon} WhatsApp’tan sorun</a>
        </div>
        <p class="post-meta">${ASOF} itibarıyla güncel bilgilerdir.</p>`)}
${campaignBand({ heading: false })}
    <section class="sec light" aria-labelledby="how-h">
      <div class="container">
        <div class="sec-head reveal"><span class="tag">Nasıl yararlanırım?</span><h2 id="how-h">Üç adımda kampanyaya katılın.</h2></div>
        <ol class="how">
          <li class="reveal"><span class="n">${icon('userplus')}</span><span class="t">1 · 2 DAKİKA</span><h3>Ücretsiz kaydolun</h3><p><a href="${URLS.register}" style="text-decoration:underline">panel.vetapp.com.tr</a> üzerinden klinik adınız ve e-postanızla. Kart bilgisi istenmez.</p></li>
          <li class="reveal d1"><span class="n">${icon('barcode')}</span><span class="t">2 · İLK GÜN</span><h3>Kullanmaya başlayın</h3><p>Ürünlerinizi barkodla okutun, müşterilerinizi ve ilk randevunuzu girin.</p></li>
          <li class="reveal d2"><span class="n">${icon('gift')}</span><span class="t">3 · OTOMATİK</span><h3>Ücretsiz dönemin tadını çıkarın</h3><p>${C.freeUntil}’ye kadar ücretsiz; ilk ${C.limit} klinikteyseniz ${C.giftMonths} de hediye.</p></li>
        </ol>
      </div>
    </section>
    <section class="sec white">
      <div class="container"><div class="prose">
        <h2 id="kampanya-kapsami">Kampanyaya neler dahil?</h2>
        <p>Ücretli ve ücretsiz sürüm ayrımı yok. Kampanya süresince VetApp’in bütün modülleri açık:</p>
        <ul>
          ${SOLUTIONS.map((x) => `<li><a href="${x.path}">${esc(x.label)}</a>: ${esc(x.short)}</li>`).join('\n          ')}
          <li>Web paneli, iPhone ve Android uygulaması aynı hesapla</li>
          <li>Birden fazla kullanıcı, Türkçe WhatsApp destek</li>
        </ul>
        <h2 id="takvim">Kampanya takvimi</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Dönem</th><th>Herkes</th><th>İlk ${C.limit} klinik</th></tr></thead>
          <tbody>
            <tr><td>Bugünden ${C.freeUntil}’ye kadar</td><td>Tamamen ücretsiz</td><td>Tamamen ücretsiz</td></tr>
            <tr><td>${C.giftMonths}</td><td>Aylık abonelik (fiyat önceden duyurulacak)</td><td>Hediye: ücretsiz</td></tr>
          </tbody>
        </table></div>
        <h2 id="uygun-fiyatli-veteriner-programi">Uygun fiyatlı veteriner programı arayanlar için</h2>
        <p>Bir veteriner programına geçmenin en büyük riski, kliniğinize uymayan bir yazılım için baştan ödeme yapmaktır. VetApp’te bu risk yok: ${C.freeUntil}’ye kadar kendi stok, veresiye, aşı ve kasa işlerinizi girip programı gerçek işinizde görürsünüz. Ücretsiz dönemden sonra devam etmeye siz karar verirsiniz; kart bilgisi alınmadığı için otomatik ücret çekilmez.</p>
        <p>Program seçerken nelere dikkat etmeniz gerektiğini <a href="/blog/veteriner-programi-secerken-dikkat-edilmesi-gerekenler">veteriner programı seçme rehberimizde</a> anlattık.</p>
        <h2 id="vetapp-hikayesi">VetApp’in hikâyesi</h2>
      </div>
      <ol class="timeline">
        ${TIMELINE.map(([d, h, p], i) => `<li class="reveal${i ? ` d${Math.min(i, 3)}` : ''}"><span class="when">${esc(d)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('\n        ')}
      </ol>
      </div>
    </section>
    <section class="sec light" aria-labelledby="cfaq-h">
      <div class="container" style="max-width:860px">
        <div class="sec-head reveal"><span class="tag">Sık sorulanlar</span><h2 id="cfaq-h">Kampanya hakkında.</h2></div>
        <div class="reveal">${faqHtml(CAMPAIGN_FAQ)}</div>
      </div>
    </section>
${finalCta(LEFT > 0 ? `Kalan ${LEFT} yerden birini alın.` : undefined)}`,
};
