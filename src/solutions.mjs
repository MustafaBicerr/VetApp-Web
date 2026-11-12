// Anahtar kelime odaklı çözüm sayfaları. Her sayfa bir arama niyetini karşılar
// ("veteriner programı", "veteriner stok takip programı" …) ve FAQPage + BreadcrumbList şeması taşır.
// Yeni sayfa eklerken src/site.mjs içindeki SOLUTIONS listesine de ekleyin.
import {
  SITE, URLS, WA, STATS, APP_STORE, PLAY_STORE, SOLUTIONS, esc, icon, arrow, ck,
  frame, phoneImg, faqHtml, faqLd, crumbLd, pageHero, finalCta, postCard, campaignStrip, storeBadges, CAMPAIGN, LEFT, ASOF, FREE_LINE,
} from './site.mjs';
import { loadPosts } from './markdown.mjs';

const N = STATS.drugs.toLocaleString('tr-TR');

const storeLinks = () => `${storeBadges()}
        <p style="margin-top:14px"><a class="more-link" href="${URLS.login}">Bilgisayardan: panel.vetapp.com.tr ${arrow}</a></p>`;

function solution(d) {
  const related = SOLUTIONS.filter((s) => s.path !== d.path);
  return {
    file: d.path.slice(1) + '.html', path: d.path, changefreq: 'monthly', priority: d.priority || '0.9',
    title: d.title, ogTitle: d.ogTitle, description: d.description,
    ld: [crumbLd(d.crumb, d.path), faqLd(d.faq), {
      '@context': 'https://schema.org', '@type': 'WebPage', '@id': SITE + d.path + '#webpage', url: SITE + d.path, name: d.title, description: d.description,
      inLanguage: 'tr-TR', isPartOf: { '@id': SITE + '/#website' }, about: { '@id': SITE + '/#software' },
      primaryImageOfPage: SITE + `/assets/img/${d.shot[0]}-1800.webp`,
    }],
    body: () => {
      const posts = loadPosts().filter((p) => p.related.includes(d.path)).slice(0, 3);
      return `${pageHero(d.crumb, d.h1, d.lede, `
        <div class="actions" data-hero-cta style="margin-top:8px">
          <a class="btn btn--primary" href="${URLS.register}">Ücretsiz başla ${arrow}</a>
          <a class="btn btn--ghost" href="${URLS.demo}">${icon('play')} Demoyu aç</a>
        </div>`)}${campaignStrip()}
    <section class="sec light">
      <div class="container split">
        <div class="prose reveal">
          ${d.intro}
        </div>
        <div class="reveal d1">${d.mob ? `<div class="mod-phone only-mob">${phoneImg(d.mob, d.shot[1])}</div><div class="only-desk">${frame(d.shot[0], d.shot[1], d.shot[2])}</div>` : frame(d.shot[0], d.shot[1], d.shot[2])}</div>
      </div>
    </section>
    <section class="sec light alt" aria-labelledby="caps-h">
      <div class="container">
        <div class="sec-head reveal"><span class="tag">${esc(d.capsTag || 'Neler yapabilirsiniz')}</span><h2 id="caps-h">${d.capsH}</h2></div>
        <div class="caps">${d.caps.map(([t, x]) => `<div class="cap reveal">${ck}<div><h3>${t}</h3><p>${x}</p></div></div>`).join('')}</div>
      </div>
    </section>
    <section class="sec white">
      <div class="container"><div class="prose">
${d.sections.map(([h, html]) => `        <h2 id="${h.id}">${h.t}</h2>\n        ${html}`).join('\n')}
      </div></div>
    </section>${d.stores ? `
    <section class="sec light">
      <div class="container">
        <div class="sec-head reveal"><span class="tag">İndirin</span><h2>Telefonda, tablette, bilgisayarda.</h2><p class="lede">Aynı hesapla giriş yapın; veriler her cihazda aynı anda güncellenir.</p></div>
        ${storeLinks()}
      </div>
    </section>` : ''}
    <section class="sec light" aria-labelledby="sfaq-h">
      <div class="container" style="max-width:860px">
        <div class="sec-head reveal"><span class="tag">Sık sorulanlar</span><h2 id="sfaq-h">${d.faqH || 'Merak edilenler.'}</h2></div>
        <div class="reveal">${faqHtml(d.faq)}</div>
      </div>
    </section>
    <section class="sec light alt" aria-labelledby="rel-h">
      <div class="container">
        <div class="sec-head reveal"><span class="tag">VetApp ile</span><h2 id="rel-h">Kliniğin diğer işleri de <span class="soft">aynı programda.</span></h2></div>
        <div class="sol-grid">
          ${related.map((x, i) => `<a class="sol reveal${i % 3 ? ` d${i % 3}` : ''}" href="${x.path}"><span class="ic">${icon(x.icon)}</span><span><b>${x.label}</b><small>${x.short}</small></span>${arrow}</a>`).join('\n          ')}
          <a class="sol reveal" href="/ozellikler"><span class="ic">${icon('check')}</span><span><b>Tüm özellikler</b><small>Modül modül VetApp</small></span>${arrow}</a>
        </div>${posts.length ? `
        <h3 class="rel-posts-h">Konuyla ilgili yazılar</h3>
        <div class="post-grid">${posts.map((p) => postCard(p)).join('')}</div>` : ''}
      </div>
    </section>
${finalCta(d.ctaTitle, d.ctaText)}`;
    },
  };
}
const H = (t) => ({ t, id: t.toLocaleLowerCase('tr-TR').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') });

export const solutionPages = [
  // ───────── 1. Ana çözüm sayfası: "veteriner programı" ─────────
  solution({
    path: '/veteriner-programi', crumb: 'Veteriner programı', priority: '0.95',
    title: 'Veteriner Programı – Veteriner Klinik Yazılımı | VetApp',
    ogTitle: 'Veteriner programı: VetApp ile klinik yönetimi tek yazılımda',
    description: 'Veteriner klinikleri için program: hasta ve randevu, aşı takibi, ilaç stok takibi, veresiye ve cari, hızlı satış ve kasa. Web, Android, iPhone. Ocak 2027’ye kadar ücretsiz.',
    h1: 'Veteriner programı: <span class="soft">kliniğin bütün işleri tek yazılımda.</span>',
    lede: 'VetApp; veteriner klinikleri için geliştirilmiş, bulut tabanlı bir klinik yönetim programıdır. Kurulum gerektirmez, telefonda ve bilgisayarda aynı hesapla çalışır.',
    shot: ['dashboard', 'VetApp veteriner programı genel bakış paneli: günlük kasa, alacak ve randevular', 'panel.vetapp.com.tr'], mob: 'm-dashboard',
    intro: `<h2>Veteriner programı nedir?</h2>
          <p><strong>Veteriner programı</strong> (veteriner klinik yazılımı ya da veteriner otomasyon programı olarak da bilinir); bir kliniğin hasta kayıtlarını, randevularını, aşı takvimini, ilaç ve sarf malzeme stoğunu, satışlarını, kasasını ve cari hesaplarını tek yerde tutan yazılımdır.</p>
          <p>Klinik büyüdükçe defter, Excel ve hafızayla yürüyen takip zorlaşır: hangi ilacın azaldığı, hangi müşterinin ne kadar veresiyesi olduğu, hangi hastanın aşısının geldiği gözden kaçar. VetApp bu bilgileri tek panelde toplar ve gününüzü özetler.</p>
          <p>VetApp’i web tarayıcısından (<a href="${URLS.login}">panel.vetapp.com.tr</a>), <a href="${APP_STORE}" target="_blank" rel="noopener">iPhone</a> ve <a href="${PLAY_STORE}" target="_blank" rel="noopener">Android</a> uygulamalarından kullanabilirsiniz.</p>`,
    capsH: 'Bir veteriner kliniğinin ihtiyaç duyduğu <span class="soft">bütün modüller.</span>',
    caps: [
      ['Hasta ve randevu takibi', 'Hayvan kartı, sahip bilgisi, randevu takvimi, SOAP muayene ve hasta zaman çizelgesi.'],
      ['Aşı takibi', 'Tür bazlı aşı protokolleri; vadesi yaklaşan ve geciken aşılar otomatik listelenir.'],
      ['İlaç ve stok takibi', `${N} ilaçlık referans katalog, barkod, parti ve son kullanma tarihi, kritik stok uyarısı.`],
      ['Hızlı satış ve kasa', 'Barkodla satış; nakit, kart, karma ve veresiye ödeme; masraf girişi ve gün sonu.'],
      ['Cari ve veresiye', 'Müşteri alacakları, kısmi tahsilat, tedarikçi (ilaç deposu) borçları ve vadeler.'],
      ['Panel ve raporlar', 'Günlük kasa, alacak, borç, stok ve randevu özeti; saatlik ve haftalık satış grafikleri.'],
    ],
    sections: [
      [H('Veteriner programı seçerken nelere dikkat etmelisiniz?'), `<p>Türkiye’de veteriner klinikleri için birçok program var. Doğru seçimi yapmak için şu sorulara cevap arayın:</p>
        <ol>
          <li><strong>Kurulum gerekiyor mu?</strong> Bilgisayara kurulan programlar yedekleme ve sunucu derdi getirir. Bulut tabanlı bir program her yerden, kurulumsuz açılır.</li>
          <li><strong>Telefonda tam çalışıyor mu?</strong> Saha ziyaretinde veya muayene sırasında işlemi anında girebilmek, gün sonunda hatırlamaya çalışmaktan iyidir. VetApp’in mobil uygulaması web panelinin bütün işlemlerini yapar.</li>
          <li><strong>İlaç stoğunu SKT ile tutuyor mu?</strong> Veteriner ilaçlarında parti ve son kullanma tarihi takibi şarttır. Sadece adet tutan bir stok modülü yetmez.</li>
          <li><strong>Veresiyeyi gerçekten yönetebiliyor mu?</strong> Türkiye’de kliniklerin büyük kısmı veresiye çalışır. Satır bazında veresiye, kısmi tahsilat ve devreden bakiye olmalı.</li>
          <li><strong>Tedarikçi borcunu da tutuyor mu?</strong> İlaç deposuna olan borç ve vadeler, alım faturasıyla birlikte otomatik güncellenmeli.</li>
          <li><strong>Öğrenmesi kolay mı?</strong> Küçük ekiplerin eğitime ayıracak vakti yoktur. VetApp Ocak 2027’ye kadar tamamen ücretsiz olduğu için ekibinizle gerçek işlerinizi girerek risksiz test edebilirsiniz.</li>
        </ol>
        <p>Daha ayrıntılı bir kontrol listesi için <a href="/blog/veteriner-programi-secerken-dikkat-edilmesi-gerekenler">veteriner programı seçme rehberimizi</a> okuyabilirsiniz.</p>`],
      [H('VetApp kimler için uygun?'), `<ul>
          <li><strong>Küçük hayvan klinikleri:</strong> kedi ve köpek hastalarında randevu, aşı takvimi, mama ve aksesuar satışı.</li>
          <li><strong>Büyükbaş ve karma çalışan klinikler:</strong> sahada mobilden kayıt, uzun vadeli veresiye takibi. Ayrıntılar: <a href="/buyukbas-veteriner-programi">büyükbaş veteriner programı</a>.</li>
          <li><strong>Yeni açılan klinikler:</strong> açılış stoğu ve devreden bakiyelerle ilk günden düzenli başlangıç.</li>
          <li><strong>Pet shop bölümü olan klinikler:</strong> barkodla hızlı satış ve stok takibi.</li>
        </ul>`],
      [H('Neden VetApp?'), `<p>VetApp, Türkiye’deki veteriner kliniklerinin günlük işleyişi düşünülerek geliştirildi: Türkçe arayüz, Türk lirası ve KDV’li alım faturası, veteriner ilaç depolarından oluşan tedarikçi listesi, veresiye ağırlıklı çalışma düzeni ve ${N} ilaçlık veteriner ilaç kataloğu hazır gelir.</p>
        <p>Program yeni ve aktif olarak geliştiriliyor; kullanan kliniklerin geri bildirimleri doğrudan yeni sürümlere yansıyor. Bir öneriniz varsa <a href="${WA}" target="_blank" rel="noopener">WhatsApp’tan yazmanız</a> yeterli.</p>`],
    ],
    faq: [
      ['En iyi veteriner programı hangisi?', 'Her kliniğin ihtiyacı farklıdır; en iyi program, sizin iş akışınıza uyan ve ekibinizin gerçekten kullandığı programdır. Bulut tabanlı olması, mobilde tam çalışması, ilaç stoğunu SKT ile tutması ve veresiyeyi yönetebilmesi temel ölçütlerdir. VetApp Ocak 2027’ye kadar tamamen ücretsiz olduğu için kendi işlerinizle risksiz karşılaştırabilirsiniz.'],
      ['Ücretsiz veteriner programı var mı?', `Evet. VetApp ${CAMPAIGN.freeUntil}’ye kadar bütün özellikleriyle tamamen ücretsizdir; kart bilgisi istenmez. Kaydolup kullanan ilk ${CAMPAIGN.limit} kliniğe ${CAMPAIGN.giftMonths} de hediye edilir (${ASOF} itibarıyla ${LEFT} yer kaldı). Ayrıntılar: kampanya sayfası.`],
      ['Veteriner programını kurmak gerekiyor mu?', 'Hayır. VetApp bulut tabanlıdır; tarayıcıdan panel.vetapp.com.tr adresine girmeniz veya mobil uygulamayı indirmeniz yeterlidir. Yedekleme ve güncellemeler otomatik yapılır.'],
      ['Birden fazla çalışan aynı anda kullanabilir mi?', 'Evet. Klinik yöneticisi ekibindeki kişiler için kullanıcı hesabı açabilir; herkes aynı klinik verisi üzerinde çalışır.'],
      ['Mevcut Excel kayıtlarımı aktarabilir miyim?', 'Excel veya CSV verileriniz için bizimle iletişime geçin; aktarım konusunda yardımcı oluyoruz. Açılış stoğu ve devreden bakiyeler program içinden de kolayca girilebilir.'],
    ],
  }),

  // ───────── 2. Stok ─────────
  solution({
    path: '/veteriner-stok-takip-programi', crumb: 'Veteriner stok takip programı',
    title: 'Veteriner Stok Takip Programı – İlaç, SKT, Barkod | VetApp',
    description: 'Veteriner kliniği için ilaç ve sarf malzeme stok takip programı: barkod, parti ve son kullanma tarihi (SKT), kritik stok uyarısı, alım faturası. Ocak 2027’ye kadar ücretsiz.',
    h1: 'Veteriner stok takip programı: <span class="soft">ilaç stoğu, SKT’ye kadar.</span>',
    lede: `İlaç ve sarf malzemelerinizi barkodla kaydedin, parti ve son kullanma tarihiyle izleyin. Azalan ve SKT’si yaklaşan ürünler kendiliğinden uyarı verir.`,
    shot: ['stok-giris', 'VetApp veteriner stok takip ekranı: alım faturası ve stok girişi', 'panel.vetapp.com.tr/#/stock/entry'], mob: 'm-stok',
    intro: `<h2>Klinikte ilaç stoğu neden kaçar?</h2>
          <p>Veteriner kliniklerinde stok, iki yerden sessizce eksilir: muayenede kullanılan ilaç ve sarf malzemesi kayda geçmez, son kullanma tarihi geçen ürünler fark edilmeden rafta bekler. Müşteri ve veresiye arttıkça defterle bu takibi sürdürmek zorlaşır.</p>
          <p>VetApp’te ürün satışa ya da tedaviye aktarıldığında stoktan düşer; her giriş parti ve <strong>son kullanma tarihi (SKT)</strong> ile tutulur. Kritik eşiğin altına inen ve SKT’si yaklaşan ürünler panelde uyarı olarak görünür.</p>`,
    capsH: 'Veteriner ilaç stok takibi için <span class="soft">gereken her şey.</span>',
    caps: [
      ['İlaç referans kataloğu', `Resmî satışı olan veteriner ilaçlarından oluşan ${N} ilaçlık katalogdan arayın; ürün kartınızı tek tıkla oluşturun.`],
      ['Barkodla kayıt ve satış', 'Telefon kamerasıyla veya barkod okuyucuyla ürün bulun; barkodsuz ürüne barkod tanımlayın.'],
      ['Parti ve SKT takibi', 'Her stok girişi parti ve son kullanma tarihiyle tutulur; satışta SKT’si yakın olan parti öne alınır.'],
      ['Kritik stok uyarısı', 'Her ürün için eşik belirleyin; azalan ürünler panelde listelenir, sipariş zamanını kaçırmazsınız.'],
      ['Alım faturası (mal kabul)', 'Çoklu iskonto, KDV, vade ve mal fazlası; stok ve ilaç deposu borcu aynı anda güncellenir.'],
      ['Açılış stoğu', 'Mevcut stoğunuzu bir seferde girin; programa geçiş günü sayımla başlayın.'],
    ],
    sections: [
      [H('Veteriner kliniğinde stok takibi nasıl yapılır?'), `<ol>
          <li><strong>Açılış sayımı yapın.</strong> Raftaki ilaç ve sarf malzemeyi barkodla okutarak ilk stok girişini yapın; SKT’leri de girin.</li>
          <li><strong>Her alımı faturayla girin.</strong> İlaç deposundan gelen ürünleri alım faturası ekranından kaydedin; stok, maliyet ve depo borcu birlikte güncellenir.</li>
          <li><strong>Kullanımı kayda geçirin.</strong> Muayenede kullanılan ilacı satışa aktardığınızda stoktan düşer; “aslında kaç tane kalmıştı?” sorusu ortadan kalkar.</li>
          <li><strong>Eşik belirleyin.</strong> Sık kullandığınız ürünlere kritik stok eşiği tanımlayın; azaldığında panel uyarır.</li>
          <li><strong>SKT listesini haftalık kontrol edin.</strong> Tarihi yaklaşan ürünleri öne alın ya da depoyla iade/değişim konuşun.</li>
        </ol>
        <p>Adım adım uygulama için <a href="/blog/veteriner-klinigi-ilac-stok-takibi-nasil-yapilir">veteriner kliniğinde ilaç stok takibi rehberini</a> okuyun.</p>`],
      [H('Excel ile stok takibinden farkı'), `<div class="table-wrap"><table>
          <thead><tr><th></th><th>Excel / defter</th><th>VetApp</th></tr></thead>
          <tbody>
            <tr><td>Satışta stok düşümü</td><td>Elle, sonradan</td><td>Otomatik, anında</td></tr>
            <tr><td>Son kullanma tarihi</td><td>Ayrı sütun, kontrol edilmezse unutulur</td><td>Parti bazında, uyarılı</td></tr>
            <tr><td>Barkod</td><td>Yok</td><td>Kamera veya okuyucu</td></tr>
            <tr><td>İlaç deposu borcu</td><td>Ayrı tablo</td><td>Alım faturasıyla otomatik</td></tr>
            <tr><td>Telefondan erişim</td><td>Zor</td><td>iPhone ve Android uygulaması</td></tr>
          </tbody>
        </table></div>`],
    ],
    faq: [
      ['Veteriner ilaçları için hazır ürün listesi var mı?', `Evet. VetApp’te ${N} ilaçlık bir veteriner ilaç referans kataloğu bulunur. İlacı arayıp kendi ürün kartınızı tek tıkla oluşturursunuz; barkodu bulunan ürünler okutulduğunda otomatik tanınır.`],
      ['Son kullanma tarihi yaklaşan ilaçları nasıl görürüm?', 'Her stok girişi parti ve son kullanma tarihiyle kaydedilir. SKT’si yaklaşan ürünler panelde uyarı olarak listelenir; satışta tarihi yakın olan parti önce kullanılır.'],
      ['Sarf malzemeleri de takip edebilir miyim?', 'Evet. Enjektör, eldiven, serum seti gibi sarf malzemeleri de ürün olarak tanımlanır ve aynı şekilde stokta izlenir.'],
      ['Barkod okuyucu almam gerekiyor mu?', 'Gerekmez. Telefonun kamerası barkod okuyucu olarak çalışır. Masada hızlı çalışmak isterseniz bilgisayara bağlı standart bir USB barkod okuyucu da kullanılabilir.'],
    ],
    ctaTitle: 'İlaç stoğunuzu VetApp’te ücretsiz tutun.',
  }),

  // ───────── 3. Cari / veresiye ─────────
  solution({
    path: '/veteriner-cari-takip-programi', crumb: 'Veteriner cari takip programı',
    title: 'Veteriner Cari ve Veresiye Takip Programı | VetApp',
    description: 'Veteriner klinikleri için cari takip programı: müşteri veresiyesi, kısmi tahsilat, vade, ilaç deposu (tedarikçi) borcu ve devreden bakiye. Web ve mobil. Ocak 2027’ye kadar ücretsiz.',
    h1: 'Veteriner cari takip programı: <span class="soft">kimin ne borcu var, tek bakışta.</span>',
    lede: 'Müşteri veresiyesini, tahsilatları ve ilaç deposuna olan borçlarınızı fatura fatura, vade vade takip edin.',
    shot: ['musteriler', 'VetApp veteriner cari takip: müşteri hesapları listesi', 'panel.vetapp.com.tr/#/accounts/customers'], mob: 'm-cari',
    intro: `<h2>Veresiye büyüdükçe defter yetmez</h2>
          <p>Türkiye’de veteriner kliniklerinin önemli bir kısmı veresiye çalışır; özellikle büyükbaş tarafında ödemeler süt parası ya da hasat dönemine kalır. Müşteri sayısı arttıkça kimin ne zaman, ne kadar borçlandığını ve ne kadar ödediğini defterle izlemek hem zaman alır hem de alacak kaybına yol açar.</p>
          <p>VetApp’te satış satır bazında <strong>peşin</strong> ya da <strong>veresiye</strong> işaretlenir. Müşteri hesabında açık satışlar, vadeler ve tahsilat geçmişi görünür; kısmi tahsilat alabilir, eski defterinizdeki bakiyeyi devreden bakiye olarak girebilirsiniz.</p>`,
    capsH: 'Müşteri ve tedarikçi cari hesapları, <span class="soft">aynı yerde.</span>',
    caps: [
      ['Müşteri cari', 'Borç/alacak geçmişi, açık satışlar ve tahsilat kayıtları müşteri kartında.'],
      ['Satır bazında veresiye', 'Aynı sepette bir kalemi peşin, diğerini veresiye satabilirsiniz.'],
      ['Kısmi tahsilat', 'Borcun bir kısmını tahsil edin; kalan bakiye otomatik güncellenir.'],
      ['Tedarikçi cari', 'İlaç deposu alım faturaları, vadeler ve ödemeler; fatura bazlı veya tutar bazlı kısmi ödeme.'],
      ['Enflasyona karşı veresiye', 'Fiyat güncellemesi, açık veresiye kalemlere fark olarak yansıtılabilir.'],
      ['Veresiye güvenliği', 'Veresiye satışta müşteri doğrulaması ve borçlu müşteri uyarısı.'],
    ],
    sections: [
      [H('Veteriner kliniğinde cari takip nasıl yapılır?'), `<ol>
          <li><strong>Devreden bakiyeleri girin.</strong> Defterdeki mevcut alacakları müşteri kartlarına “devreden bakiye” olarak bir kez kaydedin.</li>
          <li><strong>Her satışı müşteriye bağlayın.</strong> Veresiye satış yalnızca müşteri seçilerek yapılabilir; böylece “kime yazmıştık?” sorusu kalmaz.</li>
          <li><strong>Tahsilatı anında girin.</strong> Ödeme geldiği anda telefondan tahsilat kaydı girin; kasa ve müşteri bakiyesi birlikte güncellenir.</li>
          <li><strong>Alacak listesini düzenli kontrol edin.</strong> Panel, toplam alacağınızı ve borçlu müşterileri gösterir.</li>
          <li><strong>Tedarikçi tarafını unutmayın.</strong> Alım faturalarını girdiğinizde ilaç deposuna olan borç ve vadeler otomatik oluşur.</li>
        </ol>
        <p>Daha fazlası için: <a href="/blog/veteriner-klinigi-veresiye-ve-cari-takibi">veteriner kliniklerinde veresiye ve cari takibi rehberi</a>.</p>`],
      [H('İlaç deposu (tedarikçi) borç takibi'), `<p>Alım faturasını VetApp’e girdiğinizde ürünler stoğa eklenir ve tedarikçi hesabınıza borç yazılır. Ödemeyi fatura bazında ya da toplam tutar üzerinden kısmi olarak kaydedebilirsiniz. 300’den fazla veteriner ilaç deposundan oluşan listeden tedarikçinizi seçerek hızlıca kayıt açabilirsiniz.</p>`],
    ],
    faq: [
      ['Veresiye satış nasıl yapılır?', 'Satış ekranında müşteri seçilir ve ilgili satırlar veresiye olarak işaretlenir. Tutar müşterinin cari hesabına borç olarak yazılır; ödeme geldiğinde tahsilat kaydıyla kapatılır.'],
      ['Müşteri borcunun bir kısmını ödeyebilir mi?', 'Evet. Kısmi tahsilat alabilirsiniz; kalan borç müşteri hesabında açık kalır ve geçmiş hareketler listelenir.'],
      ['Eski defterimdeki borçları nasıl aktarırım?', 'Her müşteri ve tedarikçi için açılış bakiyesini “devreden bakiye” olarak girebilirsiniz. Bu kayıtlar ayrı etiketle tutulur, yeni satışlarla karışmaz.'],
      ['Telefondan tahsilat girebilir miyim?', 'Evet. iPhone ve Android uygulaması web panelindeki cari işlemlerin tamamını yapabilir; tahsilatı müşterinin yanında girersiniz.'],
    ],
    ctaTitle: 'Veresiye defterini ücretsiz VetApp’e taşıyın.',
  }),

  // ───────── 4. Aşı ─────────
  solution({
    path: '/veteriner-asi-takip-programi', crumb: 'Veteriner aşı takip programı',
    title: 'Veteriner Aşı Takip Programı – Aşı Takvimi | VetApp',
    description: 'Veteriner klinikleri için aşı takip programı: tür bazlı aşı protokolleri, aşı takvimi, yaklaşan ve geciken aşı listesi, hasta geçmişi. Web ve mobil. Ocak 2027’ye kadar ücretsiz.',
    h1: 'Veteriner aşı takip programı: <span class="soft">hiçbir aşı unutulmasın.</span>',
    lede: 'Her hastanın aşı geçmişi ve bir sonraki aşı tarihi kayıtlı; vadesi gelen ve geciken aşılar her sabah önünüzde.',
    shot: ['randevular', 'VetApp randevu ve aşı takip ekranı', 'panel.vetapp.com.tr/#/clinic/appointments'], mob: 'm-klinik',
    intro: `<h2>Aşı takibi neden önemli?</h2>
          <p>Aşı takvimini kaçıran hasta hem sağlık riski taşır hem de klinik için kaybedilmiş bir ziyarettir. Kâğıt aşı karnesi müşteride kalır; kliniğin elinde “bu ay kimin aşısı var?” sorusunun cevabı yoksa hatırlatma yapılamaz.</p>
          <p>VetApp her hasta için yapılan aşıları ve bir sonraki aşı tarihini tutar. Klinik ekranında <strong>vadesi yaklaşan</strong> ve <strong>geciken</strong> aşılar gündem olarak listelenir; müşterinizi arayıp randevu verebilirsiniz.</p>`,
    capsH: 'Aşı takvimi, <span class="soft">otomatik gündem.</span>',
    caps: [
      ['Tür bazlı aşı protokolleri', 'Kedi, köpek ve diğer türler için türe göre aşı protokolleri.'],
      ['Sonraki aşı tarihi', 'Aşı uygulandığında bir sonraki tarih kaydedilir.'],
      ['Yaklaşan ve geciken aşılar', 'Klinik ekranında vadesi gelen ve geciken aşılar ayrı ayrı listelenir.'],
      ['Hasta zaman çizelgesi', 'Muayeneler, randevular ve aşılar tek kronolojik akışta.'],
      ['Randevuya dönüştürme', 'Aşısı gelen hasta için randevu açın; gün listesine düşsün.'],
      ['Aşı stoğu', 'Uygulanan aşıyı satış ekranından ekleyin; aşı stoğunuz da güncel kalsın.'],
    ],
    sections: [
      [H('Aşı takibi VetApp’te nasıl işler?'), `<ol>
          <li>Hasta kartını açın: tür, ırk, doğum tarihi ve sahibi.</li>
          <li>Aşıyı uygulayıp kaydedin; bir sonraki aşı tarihi belirlenir.</li>
          <li>Tarih yaklaştığında hasta, klinik ekranındaki aşı gündemine düşer.</li>
          <li>Müşteriyi arayıp randevu verin; geldiğinde aşıyı uygulayıp satışa aktarın.</li>
        </ol>
        <p><strong>Not:</strong> Müşterilere otomatik SMS veya WhatsApp hatırlatması şu an bulunmuyor; gündem listesi klinik ekibinin arama yapması için hazırlanır.</p>`],
    ],
    faq: [
      ['Aşı hatırlatması nasıl çalışıyor?', 'VetApp her hasta için aşı kaydını ve bir sonraki aşı tarihini tutar. Klinik ekranında vadesi yaklaşan ve geciken aşılar gündem olarak listelenir. Müşterilere otomatik SMS veya WhatsApp hatırlatması şu an bulunmuyor.'],
      ['Farklı türler için farklı aşı takvimi tanımlanabilir mi?', 'Evet. Aşı protokolleri tür bazında tanımlanır; kedi ve köpek gibi türler için ayrı takvimler kullanılır.'],
      ['Hastanın geçmiş aşılarını görebilir miyim?', 'Evet. Hasta zaman çizelgesinde yapılan bütün aşılar, muayeneler ve randevular tarih sırasıyla görünür.'],
    ],
    ctaTitle: 'Aşı takviminizi VetApp’te ücretsiz tutun.',
  }),

  // ───────── 5. Hasta / randevu ─────────
  solution({
    path: '/veteriner-hasta-takip-programi', crumb: 'Veteriner hasta takip programı',
    title: 'Veteriner Hasta ve Randevu Takip Programı | VetApp',
    description: 'Veteriner hasta takip programı: hayvan kartı, sahip bilgisi, çip no, randevu takvimi, SOAP muayene kaydı ve hasta zaman çizelgesi. Web, Android, iPhone. Ocak 2027’ye kadar ücretsiz.',
    h1: 'Veteriner hasta ve randevu takibi: <span class="soft">her hastanın hikâyesi tek kartta.</span>',
    lede: 'Hayvan kartı, randevu takvimi, muayene notları ve aşılar; hepsi aynı hasta geçmişinde.',
    shot: ['hastalar', 'VetApp veteriner hasta takip programı: hasta listesi', 'panel.vetapp.com.tr/#/clinic/patients'], mob: 'm-klinik',
    intro: `<h2>Hasta kaydı, randevu ve muayene bir arada</h2>
          <p>Bir hastanın kilosu, aşıları, geçmiş şikâyetleri ve aldığı tedaviler farklı defterlere dağıldığında doğru karar vermek zorlaşır. VetApp’te her hayvanın kartı; sahibi, randevuları, muayeneleri, aşıları ve satışlarıyla birlikte tek zaman çizelgesinde durur.</p>
          <p>Gün, randevu listesiyle başlar: gelen hastayı tek dokunuşla “geldi” olarak işaretleyin, muayeneye geçin, işlemi satışa aktarın.</p>`,
    capsH: 'Muayeneden satışa <span class="soft">kesintisiz akış.</span>',
    caps: [
      ['Hayvan kartı', 'Tür ve ırk kataloğu, sahibi, doğum tarihi, cinsiyet, kısırlaştırma, renk, çip no ve kilo.'],
      ['Randevu takvimi', 'Gün bazlı liste; personel, oda ve süre; planlandı, geldi, tamamlandı, gelmedi, iptal.'],
      ['SOAP muayene', 'Şikâyet, anamnez, klinik bulgular, tanı ve tedavi planı; kilo, ateş, nabız, solunum.'],
      ['Hasta zaman çizelgesi', 'Muayeneler, randevular ve aşılar tek kronolojik akışta.'],
      ['Muayeneden satışa', 'Yapılan işlem tek tıkla satış ekranına taşınır, hasta ve muayeneyle ilişkilendirilir.'],
      ['Sahip ve cari bağlantısı', 'Hasta sahibi aynı zamanda cari müşterinizdir; borç ve tahsilatlar aynı kartta.'],
    ],
    sections: [
      [H('SOAP muayene kaydı nedir?'), `<p>SOAP; <strong>S</strong>ubjektif (sahibin anlattığı şikâyet ve anamnez), <strong>O</strong>bjektif (klinik bulgular, kilo, ateş, nabız, solunum), <strong>A</strong>ssessment (değerlendirme/tanı) ve <strong>P</strong>lan (tedavi planı) başlıklarından oluşan, hekimlikte yaygın kullanılan bir muayene kayıt düzenidir. VetApp’in muayene ekranı bu düzeni izler; böylece bir sonraki ziyarette hastanın geçmişi hızla okunur.</p>`],
    ],
    faq: [
      ['Hasta kartında hangi bilgiler tutulur?', 'Tür, ırk, sahibi, doğum tarihi, cinsiyet, kısırlaştırma durumu, renk, mikroçip numarası ve kilo. Muayene, aşı, randevu ve satış geçmişi de aynı kartta görünür.'],
      ['Randevuları birden fazla hekim arasında bölebilir miyim?', 'Evet. Randevuda personel, oda ve süre seçilir; gün listesi buna göre düzenlenir.'],
      ['Gelmeyen randevuları takip edebilir miyim?', 'Evet. Randevu durumları planlandı, geldi, tamamlandı, gelmedi ve iptal olarak tutulur.'],
    ],
  }),

  // ───────── 6. Mobil ─────────
  solution({
    path: '/veteriner-mobil-uygulama', crumb: 'Veteriner mobil uygulaması', stores: true,
    title: 'Veteriner Uygulaması – iPhone ve Android | VetApp Mobil',
    description: 'VetApp Mobil: veteriner klinikleri için iPhone ve Android uygulaması. Satış, veresiye, stok, aşı ve randevu işlemlerinin tamamı telefonda. Web paneliyle aynı hesap.',
    h1: 'Veteriner uygulaması: <span class="soft">bütün klinik cebinizde.</span>',
    lede: 'VetApp Mobil, web panelindeki işlemlerin tamamını telefonda yapar. Muayene masasında, çiftlikte ya da yolda; işi bittiği anda kaydedin.',
    shot: ['pos', 'VetApp veteriner mobil uygulaması hızlı satış ekranı', 'panel.vetapp.com.tr/#/sales/pos'], mob: 'm-pos',
    intro: `<h2>Bilgisayar başına dönmeden kayıt</h2>
          <p>Klinikte işler masa başında olmaz: muayene sırasında, telefonda müşteriyle konuşurken ya da sahada. İşlemi o an giremediğinizde gün sonunda hatırlamaya çalışırsınız ve bir kısmı kaybolur.</p>
          <p><strong>VetApp Mobil</strong>, <a href="${APP_STORE}" target="_blank" rel="noopener">App Store’da</a> ve <a href="${PLAY_STORE}" target="_blank" rel="noopener">Google Play’de</a> yayında. Web panelindeki satış, veresiye, tahsilat, stok, hasta, aşı ve randevu işlemlerinin tamamı uygulamada var. Telefon kamerası barkod okuyucu olarak çalışır.</p>`,
    capsH: 'Telefondan yapabildikleriniz, <span class="soft">kısaltılmış sürüm değil.</span>',
    caps: [
      ['Hızlı satış', 'Kamerayla barkod okutun, ödemeyi alın; nakit, kart veya veresiye.'],
      ['Veresiye ve tahsilat', 'Müşterinin yanında borcu yazın ya da tahsilatı girin.'],
      ['Stok', 'Ürün arayın, stok girin, kritik ve SKT uyarılarını görün.'],
      ['Hasta ve aşı', 'Hasta kartı, aşı geçmişi ve sıradaki aşılar.'],
      ['Randevu', 'Günün randevuları; geldi/tamamlandı işaretleme.'],
      ['Günlük özet', 'Kasa, alacak, borç ve randevu özeti ana ekranda.'],
    ],
    sections: [
      [H('Web ve mobil aynı hesapla çalışır'), `<p>VetApp bulut tabanlıdır: telefonda girdiğiniz satış, aynı anda bilgisayardaki panelde görünür. Kurulum, eşitleme ya da yedekleme yapmanız gerekmez. Ekibinizdeki her kişi kendi kullanıcısıyla telefondan veya bilgisayardan giriş yapar.</p>
        <p><strong>Not:</strong> iOS’ta yeni klinik kaydı web panel üzerinden yapılır; kayıttan sonra iPhone uygulamasına aynı bilgilerle giriş yaparsınız. Uygulama çalışmak için internet bağlantısı gerektirir.</p>`],
    ],
    faq: [
      ['VetApp Mobil hangi cihazlarda çalışır?', 'iPhone (App Store) ve Android telefonlarda çalışır. Bilgisayardan ise tarayıcıyla panel.vetapp.com.tr adresinden kullanılır. Hepsi aynı hesabı kullanır.'],
      ['Mobil uygulamada web panelindeki her şey var mı?', 'Evet. Satış, veresiye, tahsilat, stok, hasta, aşı ve randevu işlemleri mobil uygulamada da yapılabilir.'],
      ['İnternet olmadan çalışır mı?', 'Hayır. VetApp bulut tabanlıdır ve çalışmak için internet bağlantısı gerekir. Bu sayede veriler her cihazda anında güncel olur.'],
      ['iPhone’dan kayıt olabilir miyim?', 'iOS’ta yeni klinik kaydı web panel (panel.vetapp.com.tr) üzerinden yapılır. Kayıttan sonra iPhone uygulamasına aynı bilgilerle giriş yapabilirsiniz.'],
    ],
  }),

  // ───────── 7. Büyükbaş ─────────
  solution({
    path: '/buyukbas-veteriner-programi', crumb: 'Büyükbaş veteriner programı',
    title: 'Büyükbaş Veteriner Programı – Saha ve Çiftlik | VetApp',
    description: 'Büyükbaş ağırlıklı çalışan veteriner klinikleri için program: çiftlikte mobilden kayıt, uzun vadeli veresiye, ilaç ve sarf malzeme stok takibi. Ocak 2027’ye kadar ücretsiz.',
    h1: 'Büyükbaş veteriner programı: <span class="soft">kayıt, işin bittiği yerde.</span>',
    lede: 'Çiftlikte yaptığınız tedaviyi, kullandığınız ilacı ve yazdığınız veresiyeyi kliniğe dönmeden telefondan girin.',
    shot: ['musteriler', 'VetApp müşteri cari listesi: büyükbaş yetiştiricilerinin veresiye hesapları', 'panel.vetapp.com.tr/#/accounts/customers'], mob: 'm-cari',
    intro: `<h2>Saha çalışmasında kayıt neden kaybolur?</h2>
          <p>Büyükbaş ağırlıklı çalışan veteriner hekimlerin günü çoğunlukla sahada geçer. Çiftlikte yapılan uygulama, kullanılan ilaç ve sarf malzeme, yazılan veresiye; hepsi “akşam kliniğe dönünce yazarım” notuyla birikir. Gün sonunda bilgisayar başında hatırlamaya çalışmak hem yorucu hem eksik kalır.</p>
          <p>VetApp’in mobil uygulaması web panelinin bütün işlemlerini yapabildiği için <strong>işi bittiği yerde</strong> kaydı girersiniz: ilaç stoktan düşer, tutar yetiştiricinin hesabına yazılır.</p>`,
    capsTag: 'Sahada VetApp', capsH: 'Çiftlikten kliniğe, <span class="soft">tek kayıt.</span>',
    caps: [
      ['Mobilden satış ve tedavi kaydı', 'Uygulanan ilaç ve malzemeyi telefondan satışa girin; stoktan anında düşsün.'],
      ['Uzun vadeli veresiye', 'Süt parası veya hasat dönemine kalan alacakları müşteri bazında izleyin.'],
      ['Kısmi tahsilat', 'Yetiştirici borcunun bir kısmını ödediğinde kalan bakiye otomatik güncellenir.'],
      ['Enflasyona karşı veresiye', 'Fiyat güncellemesi açık veresiye kalemlere fark olarak yansıtılabilir.'],
      ['Sahada da stok takibi', 'Sahada kullandığınız ilaç ve sarf malzeme satışla birlikte stoktan düşer; azalan ürün uyarı verir.'],
      ['Klinik ve saha aynı hesapta', 'Telefonda girilen her kayıt klinikteki bilgisayarda anında görünür.'],
    ],
    sections: [
      [H('Büyükbaş kliniklerinde veresiye yönetimi'), `<p>Büyükbaş tarafında ödemeler çoğu zaman aylık süt ödemesine ya da sezona bağlıdır; aynı yetiştiriciye aylar boyunca birçok kalem yazılır. VetApp’te her kalem tarihiyle müşteri hesabına işlenir, kısmi ödemeler düşülür ve toplam alacağınız panelde görünür. Eski defterinizdeki bakiyeleri “devreden bakiye” olarak bir kez girerek başlayabilirsiniz.</p>
        <p>Ayrıntılı bilgi: <a href="/veteriner-cari-takip-programi">veteriner cari ve veresiye takibi</a>.</p>`],
      [H('Küçük hayvan ve büyükbaş birlikte'), `<p>Karma çalışan klinikler için aynı program yeterlidir: kedi-köpek hastalarında randevu ve aşı takibi, büyükbaş tarafında saha kaydı ve veresiye. Bütün işlemler aynı stok ve aynı kasa üzerinde birleşir.</p>`],
    ],
    faq: [
      ['Büyükbaş veteriner hekimleri VetApp’i nasıl kullanıyor?', 'Sahada yapılan tedavi ve kullanılan ilaçlar mobil uygulamadan satış olarak girilir; tutar peşin ya da veresiye olarak yetiştiricinin hesabına yazılır. İlaç stoktan otomatik düşer, kliniğe dönünce tekrar kayıt yapmak gerekmez.'],
      ['İnternetin zayıf olduğu çiftliklerde çalışır mı?', 'VetApp çalışmak için internet bağlantısı gerektirir; mobil veri yeterlidir. Bağlantının hiç olmadığı yerlerde kaydı bağlantı geldiğinde girmeniz gerekir.'],
      ['Yetiştirici bazında borç takibi yapılabilir mi?', 'Evet. Her yetiştirici bir müşteri hesabıdır; yazılan veresiye, kısmi tahsilatlar ve kalan bakiye bu hesapta tutulur.'],
    ],
    ctaTitle: 'Saha kayıtlarınızı ücretsiz VetApp’e taşıyın.',
  }),
];
