// Hukuk sayfalarının metinleri: gizlilik politikası, kullanım şartları, hesap silme.
// Kaynak: backend deposu docs/hukuk/{gizlilik-politikasi,kullanim-sartlari}.md (sürüm 2.0.1 taslak) ve docs/HESAP-SILME.md.
// Değerler ve koşul bayrakları TEK YERDE: src/legal.mjs. Bu dosyada yer tutucu/bayrak değeri yazılmaz.
// Her fonksiyon site.mjs'deki legal() yardımcısının beklediği biçimde [başlık, html, kimlik?] satırları döner.
import { LEGAL } from './legal.mjs';
import { trDate } from './markdown.mjs';

const e = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Tipografi: etiket dışındaki düz kesme işaretlerini sitenin kullandığı ’ ile değiştirir (Türkçe ek: KVKK’ya)
const typo = (html) => html.replace(/(<[^>]*>)|'/g, (m, tag) => tag || '’');
const p = (s) => `<p>${s}</p>`;
const ul = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul>`;
const ol = (items) => `<ol>${items.map((x) => `<li>${x}</li>`).join('')}</ol>`;
const table = (head, rows) => `<div class="table-wrap"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const kv = (rows) => `<div class="table-wrap"><table><tbody>${rows.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</tbody></table></div>`;
const mail = (a) => `<a href="mailto:${e(a)}">${e(a)}</a>`;
const SUPPORT = 'destek@vetapp.com.tr';
const has = (v) => v !== null && v !== undefined && String(v).trim() !== '';
const section = (h, html, id) => [h, typo(html), id];

// ───────────────────────── Gizlilik politikası ve KVKK aydınlatma metni ─────────────────────────
export function gizlilikSections(L = LEGAL) {
  const k = L.kosul;
  const kvkk = mail(L.kvkkBasvuruEposta);
  const kep = has(L.kepAdresi);

  // 9a: kimlik tutarlılığı kaydı. Düzeltme canlıda değilse ŞU ANDA canlıdaki davranış anlatılır (docs/hukuk Bulgu 1, [KOŞUL-KIMLIK-HAVUZU]).
  const kimlik9a = k.kimlikHavuzuDuzeltmeCanli
    ? p('<strong>a) Kimlik tutarlılığı kaydı.</strong> Kimlik tutarlılığı kaydı (müşterinin T.C. kimlik numarası ve cep telefonu; ad, klinik, ürün, borç veya sağlık bilgisi olmadan) yalnızca ortak borç uyarısına açık rıza veren kliniklerin müşteri kayıtları için ve ortak borç uyarısı özelliği açıkken ayrı bir tabloda tutulur. Açık rıza vermeyen kliniklerin müşteri kayıtları bu tabloya yazılmaz. Bir klinik, bu tablodaki başka bir kliniğe ait bilgiyi (telefon, T.C. kimlik numarası veya böyle bir kaydın varlığını) görmez; müşteri kaydı oluştururken veya güncellerken başka kliniğin kaydı nedeniyle engellenmez. Özellik şu an kapalı olduğundan bu kayıt şu an hiçbir klinik için tutulmaz.' +
      (k.kimlikEskiSatirlarTemizlendi ? '' : ' Bu düzeltmeden önce oluşturulmuş kayıtlar, silme işlemi tamamlanana kadar tabloda kalabilir.'))
    : p('<strong>a) Kimlik tutarlılığı kaydı.</strong> Müşteri kaydında geçerli bir T.C. kimlik numarası ve cep telefonu bulunduğunda, bu ikili (ad, klinik, ürün, borç veya sağlık bilgisi olmadan) müşteri kimliğinin tutarlı kalmasını sağlamak amacıyla ayrı, ortak bir tabloda tutulur. Bu kayıt, kliniğin ortak borç uyarısına açık rıza vermiş olup olmadığından ve ortak borç uyarısı özelliğinin açık olup olmadığından bağımsız olarak yazılmaktadır. Aynı T.C. kimlik numarası farklı bir telefonla (veya aynı telefon farklı bir T.C. kimlik numarasıyla) kaydedilmek istendiğinde müşteri kaydı engellenebilir. Bu kaydın yalnızca açık rıza veren kliniklerle sınırlandırılmasına yönelik düzeltme yayına alındığında bu paragraf güncellenecektir.');

  const kisaca = ul([
    'Klinik verinizi (müşteri, hasta, satış, stok, borç) kliniğiniz adına saklarız; başka kliniklere göstermeyiz, satmayız, reklam için paylaşmayız.',
    'Verileriniz Finlandiya’daki sunucuda tutulur; e-posta gönderimi için ABD’deki bir hizmet kullanırız. Bunlar KVKK’ya göre yurt dışı aktarımdır (Bölüm 6).',
    'Kart bilgisi almayız. Ödeme şu an yalnızca havale/EFT ile ve onay sonrası kaydedilir.',
    'Hesabınızı silerseniz kişisel veriler 30 gün bekleme sonrası silinir ya da anonimleşir; mali kayıt tutarları kişisel bilgiden arındırılarak yasal süre (10 yıl) saklanır; silinen veri yedeklerde yaklaşık 56 gün kalabilir (bakım öncesi elle etiketlenen yedekler hariç; Bölüm 11). Adım adım anlatım: <a href="/hesap-silme">Hesap silme</a>.',
    `Haklarınız için: ${kvkk}.`,
  ]);

  const s1 = kv([
      ['Unvan', `${e(L.unvan)} (ürün adı: VetApp)`],
      ...(has(L.adres) ? [['Adres', e(L.adres)]] : []),
      ...(has(L.vknVeyaTckn) ? [['Vergi dairesi / vergi no veya T.C. kimlik no', [L.vergiDairesi, L.vknVeyaTckn].filter(has).map(e).join(' / ')]] : []),
      ['KVKK başvuru e-postası', kvkk],
      ...(kep ? [['KEP adresi', e(L.kepAdresi)]] : []),
      ['Destek', mail(SUPPORT)],
    ]) +
    p('VetApp iki ayrı rolde hareket eder:') +
    ol([
      '<strong>Veri sorumlusu:</strong> hesabınız, klinik kaydınız, aboneliğiniz, güvenlik ve destek kayıtlarınız, bu sitenin ve uygulamanın kullanımı bakımından. Bu Bölümler (2-5, 7-15) bu rolü anlatır.',
      '<strong>Veri işleyen:</strong> kliniğinizin VetApp’e girdiği müşteri (hayvan sahibi), hasta (hayvan), satış, borç, stok, tedarikçi ve klinik kayıtları bakımından. Bu verilerin <strong>veri sorumlusu kliniğinizdir</strong>; biz yalnız kliniğin talimatıyla ve hizmeti sunmak için işleriz (Bölüm 4). Hayvan sahibiyseniz ve klinik verinizle ilgili bir talebiniz varsa önce kliniğe başvurun.',
    ]);

  const apple2 = k.appleJetonIptali
    ? '; Apple ile girişte, hesabınızı silerken Apple’daki yetkiyi iptal edebilmek için Apple’ın verdiği yenileme anahtarı (uygulama düzeyinde şifreli saklanır)'
    : '';
  const s2 = table(['Kategori', 'Örnekler', 'Nasıl toplanır'], [
    ['Hesap ve kimlik', `Ad soyad, e-posta, telefon, parola (yalnız bcrypt özeti olarak; düz metin saklanmaz), rol, kayıt yöntemi, şartları onay tarihi${apple2}`, 'Kayıt formu; Google/Apple ile girişte sağlayıcının gönderdiği kimlik numarası ve e-posta'],
    ['Klinik bilgisi', 'Klinik adı, il/ilçe/mahalle, adres, iletişim telefonu, (varsa) referans kodu; VetApp’in destek ve yönetim amacıyla klinik hakkında tuttuğu iç not (varsa)', 'Kayıt sihirbazı ve Ayarlar; iç not VetApp tarafından'],
    ['Abonelik ve ödeme', 'Plan, dönem, tutar, ödeme durumu, havale referans kodu; havale/EFT açıklamasına yazdığınız telefon numarası ve VetApp’in banka hesap hareketlerinde görünen gönderen adı/IBAN bilgisi. <strong>Kart bilgisi alınmaz.</strong>', 'Abonelik başlatma, banka havalesinin onaylanması'],
    ['Kullanım ve güvenlik', 'IP adresi, tarayıcı/cihaz bilgisi, oturum kayıtları, işlem (denetim) kayıtları, uygulama hata ve erişim günlükleri (parola, jeton, T.C. kimlik no, telefon ve e-posta alanları günlükte maskelenir)', 'Uygulama kullanımı sırasında otomatik'],
    ['İletişim ve destek', 'Web sitesi formu ve uygulama içi geri bildirim: ad, e-posta, telefon, kurum, mesaj, gönderildiği sayfa, IP ve tarayıcı bilgisi', 'Sizin gönderdiğiniz form'],
    ['İş ortağı (depo)', 'Yetkili kişi adı, e-posta, telefon, komisyon bilgisi', 'Başvuru formu ve görüşme'],
    ['Ürün iyileştirme', 'Kliniğinizin ürün–barkod eşleştirmeleri (Bölüm 8)', 'Barkodu ürüne bağladığınızda otomatik'],
    ['Hizmet e-postaları', 'Doğrulama ve şifre sıfırlama kodları, hesap silme bildirimleri, günlük özet (Ayarlar’dan kapatılabilir). Günlük özette kliniğinizin randevu ve aşı listesindeki hasta (hayvan) ve hasta sahibi adları ile randevu saatleri yer alır; telefon ve T.C. kimlik numarası yer almaz. Özet yalnızca kliniğin yönetici kullanıcısına gönderilir', 'Sizin işleminize bağlı otomatik'],
  ]) + p('Özel nitelikli kişisel veri (sağlık, biyometrik vb.) toplamayı amaçlamayız. Hayvan sağlık kayıtları (aşı, muayene) kişisel veri değildir; ancak klinik notlarına bir kişiye ait bilgi yazılırsa o kısım klinik verisidir (Bölüm 4). Lütfen hayvan sahibine ait sağlık bilgisi yazmayın.');

  const s3 = table(['Amaç', 'Hukuki sebep'], [
    ['Hesabı açmak, kimliği doğrulamak, hizmeti sunmak', 'Sözleşmenin kurulması veya ifası (md. 5/2-c)'],
    ['Abonelik, havale eşleştirme, depo komisyonu', 'Sözleşmenin ifası (5/2-c); hukuki yükümlülük (5/2-ç)'],
    ['Mali ve vergisel kayıtları yasal süre saklamak', 'Hukuki yükümlülük (5/2-ç): TTK md. 82, VUK md. 253'],
    ['Güvenlik, kötüye kullanımın önlenmesi, denetim izi, hata ayıklama, yedekleme', 'Meşru menfaat (5/2-f)'],
    ['Destek taleplerini ve KVKK başvurularını yanıtlamak', 'Sözleşmenin ifası (5/2-c); meşru menfaat (5/2-f); hukuki yükümlülük (5/2-ç)'],
    ['Hizmet bildirimleri (doğrulama kodu, şifre sıfırlama, silme bildirimi, günlük özet)', 'Sözleşmenin ifası (5/2-c)'],
    ['Hakkın tesisi, kullanılması veya korunması, yasal taleplere yanıt', 'Md. 5/2-e; md. 5/2-a/ç'],
    ['Ortak ilaç kataloğunun iyileştirilmesi (barkod katkısı)', 'Meşru menfaat (5/2-f)'],
    ['İş ortağı (depo) programının yürütülmesi', 'Sözleşmenin ifası (5/2-c); meşru menfaat (5/2-f)'],
  ]) + p('Pazarlama amaçlı ticari elektronik ileti gönderimi 6563 sayılı Kanun ve ilgili yönetmeliğe tabidir; ret hakkınız saklıdır. Açık rızanıza dayanan işleme olursa ayrıca ve açıkça sorarız.');

  const s4 = p('Kliniğin sisteme girdiği veriler (hayvan sahibinin adı, telefonu, e-postası, adresi, veresiye için T.C. kimlik numarası; hastanın adı, türü, çip numarası; randevu, aşı, muayene notları ve ekleri; satış, borç, tahsilat; tedarikçi bilgileri) bakımından:') +
    ul([
      'Hangi verinin toplanacağına ve neden toplanacağına <strong>klinik</strong> karar verir; hayvan sahiplerini aydınlatmak ve gerekirse rıza almak kliniğin görevidir. Kliniklere talep üzerine örnek aydınlatma metni sunarız.',
      'VetApp bu veriyi yalnızca hizmeti sağlamak için, kliniğin talimatıyla işler; kendi amaçları için kullanmaz, başka kliniğe göstermez. Her kliniğin verisi mantıksal olarak ayrılır (her kayıt klinik kimliğiyle işaretlidir, sorgular klinikle sınırlıdır); kullanıcılar rollerine göre (yönetici, veteriner, kasiyer, asistan) yetkilendirilir.',
      'Kliniğin yöneticisine her sabah giden <strong>günlük özet e-postası</strong> hayvan sahibi adlarını da içerebilir; bu e-posta, e-posta hizmet sağlayıcımız üzerinden (Bölüm 5, yurt dışı) gönderilir. Özeti Ayarlar’dan kapatabilirsiniz; hayvan sahiplerini aydınlatırken bunu da dikkate almanız önerilir.',
      'Kliniğiniz hesabını silerse veriler Bölüm 12’deki gibi silinir/anonimleşir.',
    ]);

  const appleAlici = k.appleJetonIptali
    ? 'Sağlayıcının verdiği kimlik numarası ve e-posta; Apple ile girişte Apple’dan yetki jetonu alınır ve hesap silinirken Apple’a iptal çağrısı gönderilir'
    : 'Sağlayıcının verdiği kimlik numarası ve e-posta';
  const s5 = p('Kişisel verileri satmaz ve reklam amacıyla paylaşmayız. Paylaşım şunlarla sınırlıdır:') + table(['Alıcı', 'Amaç', 'Veri', 'Ülke'], [
    ['Barındırma: Hetzner (Hetzner Online GmbH)', 'Uygulama, veritabanı, dosyalar ve yerel yedeklerin barındırılması', 'Tüm hesap ve klinik verisi', 'Finlandiya (şirket merkezi Almanya)'],
    ['E-posta gönderimi: Resend', 'Doğrulama kodu, şifre sıfırlama, bildirim ve günlük özet e-postaları', 'Alıcı e-posta adresi, ad, e-posta içeriği (günlük özette kliniğin hasta ve hasta sahibi adları dahil)', 'ABD'],
    ...(k.r2 ? [['Sunucu dışı yedek: Cloudflare R2', 'Felaket kurtarma; yedekler şifrelenerek gönderilir', 'Şifreli veritabanı dökümü, yüklenen dosyalar ve sunucu yapılandırma kopyası', `${e(L.r2Konumu)} (Cloudflare, Inc., ABD merkezli)`]] : []),
    ...(k.sentry ? [['Hata izleme: Sentry', 'Uygulama hatalarının tespiti', 'Hata ayrıntısı, cihaz/tarayıcı türü, kullanıcı ve klinik kimliği (e-posta/ad gönderilmez), IP adresi', e(L.sentryBolgesi)]] : []),
    ['Cloudflare (DNS, tanıtım sitesi, Web Analytics)', 'Siteyi sunma, güvenlik, çerezsiz toplu ziyaret istatistiği', 'IP ve tarayıcı bilgisi (ağ düzeyinde)', 'Küresel (ABD merkezli)'],
    ['Google / Apple ile giriş (isteğe bağlı)', 'Kimlik doğrulama', appleAlici, 'ABD / küresel'],
    ['Destek e-posta kutusu: Google', 'Destek yazışmaları ve başvurular', 'Yazışma içeriği', 'Küresel'],
    ['Depo ortakları', 'Referans kodu programı', 'Yalnızca kodla katılan kliniğin adı, kayıt tarihi ve komisyon durumu (Bölüm 7)', 'Türkiye'],
    ['Yetkili kamu kurum ve kuruluşları, mahkemeler', 'Yasal talep', 'Talebin kapsadığı veri', 'Türkiye'],
    ['Profesyonel danışmanlar (hukuk, mali müşavirlik)', 'Danışmanlık', 'Gerektiği kadar; gizlilik yükümlülüğüyle', 'Türkiye'],
  ]);

  const yurtDisiHizmetler = ['Hetzner’in Finlandiya’daki sunucularında barındırma', 'Resend ile e-posta gönderimi'];
  const ekHizmet = [k.r2 && 'Cloudflare R2 ile sunucu dışı yedekleme', k.sentry && 'Sentry ile hata izleme'].filter(Boolean);
  const s6 = p(`${yurtDisiHizmetler.concat(ekHizmet).join(', ').replace(/, ([^,]*)$/, ' ve $1')}, kişisel verilerin Türkiye dışında işlenmesi anlamına gelir. 6698 sayılı Kanun’un 9. maddesi (7499 sayılı Kanunla değişik, 1 Haziran 2024) uyarınca bu aktarımlar, <strong>yeterlilik kararı</strong> bulunmadığı sürece <strong>uygun güvencelerden</strong> biriyle (Kurul’un yayımladığı <strong>standart sözleşme</strong> gibi) yapılır; standart sözleşme, imzadan itibaren beş iş günü içinde Kişisel Verileri Koruma Kurumu’na bildirilir.`) +
    p(e(L.yurtDisiGuvence)) +
    p('Google/Apple ile girişte kimlik bilgisini doğrudan siz ilgili sağlayıcıya verirsiniz; sağlayıcıların kendi gizlilik politikaları geçerlidir.');

  const s7 = p('Referans kodu programında depo ortağına <strong>yalnızca</strong> o kodla kaydolan kliniğin adı, kayıt tarihi ve komisyon durumu raporlanır. Kliniğinizin müşteri, hasta, satış, stok, borç veya mali verisi depo ortağına <strong>gitmez</strong>; depo bu verileri göremez.');

  const s8 = p('Kliniğinizin ürün–barkod eşleştirmeleri anonim olarak ortak ilaç kataloğunu iyileştirmek için kullanılabilir. Bir barkodu ortak katalogdaki bir ilaca bağladığınızda bu eşleşme, hangi kliniğin bildirdiği bilgisiyle ayrı bir gölge kayıt olarak tutulur; yeterince çok bağımsız klinik aynı barkodu bildirirse barkod ortak kataloğa yazılabilir. Oylamada yalnızca VetApp’in oy hakkı verdiği (onaylı) kliniklerin beyanları sayılır; diğer kliniklerin beyanı kaydedilir ama oylamaya katılmaz. Ortak kataloğa yazılan yalnızca ürün–barkod eşleşmesidir (kişisel veri değildir) ve katalog kaydında hangi klinikten geldiği bilgisi bulunmaz. Klinik hesabı silinen/anonimleşen kliniğin beyanları oylamada sayılmaz.');

  const s9 = kimlik9a +
    p('<strong>b) Ortak borç uyarısı (kara liste).</strong> Klinikler arası vadesi geçmiş borç uyarısı özelliği şu an <strong>kapalıdır</strong>; hiçbir klinikte çalışmaz ve hiçbir kliniğin borç bilgisi başka klinikle paylaşılmaz. Açılacak olursa yalnız açık rıza veren kliniklerle, ayrı bir bilgilendirme metniyle ve bu politika güncellenerek açılır.');

  const iletisimSure = k.iletisimSilmeTaahhudu
    ? 'Başvurunun sonuçlanmasından sonra en fazla 2 yıl'
    : 'Başvurunun sonuçlanmasından sonra, başvurunun takibi ve olası uyuşmazlıklar için gerekli olduğu süre kadar; silinmesini talep edebilirsiniz (Bölüm 15)';
  const s10 = table(['Veri', 'Süre'], [
    ['Hesap, kullanıcı ve klinik bilgileri', 'Hesap açık olduğu sürece; silmede 30 gün bekleme sonrası silinir/anonimleşir (Bölüm 12)'],
    ['Klinik veri alanı (müşteri, hasta, stok, satış, borç, notlar, dosyalar)', 'Klinik hesabı açık olduğu sürece; silmede kişisel alanlar silinir/anonimleşir'],
    ['Mali kayıt tutarları (satış, borç/tahsilat, fatura, ödeme, komisyon)', 'Kişisel bilgiden arındırılmış olarak <strong>10 yıl</strong> (TTK md. 82; VUK md. 253)'],
    ['VetApp abonelik ve ödeme kayıtları', '10 yıl; silmede kişisel bilgiden arındırılır'],
    ['Oturum kayıtları (jeton özeti, IP, cihaz)', 'Yenileme anahtarı 7 gün geçerlidir; kayıt, süre bitiminden 7 gün sonra silinir; çıkışta iptal edilenler oluşturulmalarından 30 gün sonra silinir'],
    ['E-posta doğrulama ve şifre sıfırlama kodları, giriş biletleri', 'Süre bitiminden (kodlar 15 dakika geçerlidir) en geç 1 gün sonra silinir. Doğrulaması tamamlanmamış kayıt başvurusunun geçici verileri (ad, telefon, e-posta, adres, parola özeti) de bu kayıtla birlikte silinir'],
    ['Çift gönderim koruma kayıtları (işlem yanıtının geçici kopyası dahil)', '2 gün'],
    ['Günlük özet gönderim kaydı', '7 gün'],
    ['Denetim (işlem) kayıtları', 'Hesap açıkken; klinik silmede IP ve içerik silinir, işlem türü kalır'],
    ['İletişim formu ve destek mesajları', iletisimSure],
    ['Uygulama ve sunucu günlükleri', 'Boyut sınırıyla dönüşümlü tutulur; kalıcı arşivlenmez'],
    ['Yedekler', 'Aşağıda (Bölüm 11)'],
    ['Ziyaret istatistiği', 'Cloudflare’ın toplu, kimliksiz istatistikleri'],
  ]);

  const r2Yedek = k.r2 ? '; sunucu dışı kopya (Cloudflare R2, şifreli) <strong>30 gün</strong> tutulur' : '';
  const etiketli = k.etiketliYedekSilmeTaahhudu
    ? `Nadiren, bakım öncesinde elle etiketlenen yedekler bu sürelerden uzun tutulabilir; bunları da en geç ${e(L.etiketliYedekSuresi)} içinde sileriz.`
    : 'Nadiren, bakım öncesinde elle etiketlenen yedekler bu sürelerden uzun tutulabilir.';
  const s11 = p(`Felaket durumunda hizmeti geri getirebilmek için her gece veritabanı ve yüklenen dosyaların yedeği alınır. Günlük yedekler yaklaşık <strong>14 gün</strong>, haftalık yedekler (pazar günü) yaklaşık <strong>56 gün (8 hafta)</strong> tutulur${r2Yedek}. ${etiketli} Yedekler yalnız VetApp’in süreklilik amacıyla kullanılır; tek tek veri geri getirme hizmeti değildir.`);

  const kisiselSil = k.kisiselHesapSilmeCanli
    ? '<strong>Kişisel hesap silme (diğer kullanıcılar):</strong> yönetici dışındaki kullanıcılar (ve klinikte başka etkin yönetici varsa yöneticiler) Ayarlar › Hesabı sil ekranından yalnız kendi kullanıcı kaydını silebilir; parolanız (veya yalnız Google/Apple ile girdiyseniz onay ifadesi) istenir ve işlem hemen uygulanır. Kişisel verileriniz (ad, e-posta, telefon) anonimleşir, oturumları ve Google/Apple bağlantıları kaldırılır' + (k.appleJetonIptali ? ', Apple ile girişte Apple’a jeton iptali gönderilir' : '') + '; klinik kayıtları kalır. Bu yolda, önceki işlemlerinize ait denetim (işlem) kayıtları ve bu kayıtlardaki IP adresi ile uygulama içinden gönderdiğiniz geri bildirim mesajları, klinik hesabı açık olduğu sürece anonimleşmiş kullanıcı kaydına bağlı olarak kalır; silinmesini ayrıca talep edebilirsiniz. Kliniğin son yöneticisi kliniği sahipsiz bırakamaz; önce klinik silme talebi veya yeni yönetici gerekir.'
    : `<strong>Diğer kullanıcılar:</strong> yönetici dışındaki kullanıcılar kendi kullanıcı kaydının silinmesini ${mail(SUPPORT)} adresinden talep edebilir; klinik kayıtları klinikte kalır. Kliniğin son yöneticisi kliniği sahipsiz bırakamaz; önce klinik silme talebi veya yeni yönetici gerekir.`;
  const s12 = ul([
    '<strong>Klinik silme (yönetici):</strong> Ayarlar › Gizlilik ve veriler (veya Hesabı sil) ekranından klinik adını yazarak talep edersiniz. <strong>30 gün</strong> beklenir; bu süre içinde talebi iptal edebilirsiniz, hesabınız çalışmaya devam eder, e-postayla bilgilendirilirsiniz. Süre dolunca müşteri, hasta, tedarikçi ve kullanıcı iletişim bilgileri, klinik notları ve dosyalar silinir veya anonimleştirilir; kullanıcı hesapları kapanır; kliniğe bağlı uygulama içi geri bildirim mesajları silinir (web sitesi iletişim formundan gelen, kliniğe bağlı olmayan mesajlar için ayrıca talepte bulunabilirsiniz); denetim kayıtlarından IP ve içerik silinir. Silme işlemi günlük bakım işiyle yapıldığından fiilen 30. günü izleyen ilk bakım çalışmasında gerçekleşir. <strong>Mali kayıt tutarları</strong> (satış, borç/tahsilat, fatura, ödeme, komisyon) kişisel bilgiden arındırılarak 10 yıl saklanır.',
    kisiselSil,
    '<strong>Yedeklerdeki veri:</strong> silinen veri yedeklerde yaklaşık <strong>56 gün</strong> kalabilir (Bölüm 11’deki istisna hariç) ve süre dolunca yedeklerle birlikte kaybolur (Bölüm 11).',
    'Anonimleştirmeden sonra klinik kayıtlarına erişilemez. Mevzuattan doğan kendi saklama yükümlülükleriniz için gerekli kayıtları silme talebinden önce almanız önerilir.',
    'Demo hesap silinemez.',
  ]) + p('Uygulamaya erişemiyorsanız ya da adım adım anlatım için: <a href="/hesap-silme">VetApp hesap silme sayfası</a>.');

  const s13 = p(`Bağlantılar HTTPS ile şifrelenir. Her kliniğin verisi mantıksal olarak ayrılır (klinik kimliğiyle işaretlenir ve sorgular klinikle sınırlıdır) ve kullanıcılar rol bazlı yetkilendirilir. Parolalar bcrypt ile özetlenerek saklanır; oturum anahtarı kısa ömürlüdür (15 dakika), yenileme anahtarı 7 gün geçerlidir ve cihazın güvenli depolamasında tutulur. İşlem (denetim) kaydı tutulur; istek sınırlama ve günlüklerde hassas alanların maskelenmesi uygulanır. Yedekler doğrulanır ve haftalık geri yükleme testinden geçer${k.r2 ? '; sunucu dışı yedekler şifreli gönderilir' : ''}. Hiçbir sistem mutlak güvenli değildir; bir veri ihlali olursa mevzuattaki sürelere uygun olarak ilgili kişi ve Kurum bilgilendirilir.`);

  const s14 = ul([
    '<strong>Tanıtım sitesi (vetapp.com.tr):</strong> çerez kullanmaz. Ziyaret sayısını ölçmek için Cloudflare Web Analytics kullanır; bu hizmet çerezsiz çalışır ve ziyaretçiyi tanımlamaz.',
    '<strong>Panel ve mobil uygulama:</strong> çerez kullanmaz. Oturumu sürdürmek için erişim ve yenileme anahtarını cihazınızın güvenli depolama alanında (mobilde Keychain/Keystore; web’de tarayıcının yerel depolaması) tutar; yalnız oturumu sürdürmek içindir (yenileme anahtarı en çok 7 gün), çıkış yapınca silinir, izleme veya reklam amacıyla kullanılmaz.',
    'Uygulama kamera iznini yalnızca barkod okutmak için kullanır; görüntü sunucuya gönderilmez, yalnız okunan barkod numarası kullanılır.',
    'Ürün görseli eklerken galerinizden seçtiğiniz fotoğraf sunucuya yüklenir (cihazınıza göre fotoğraf kitaplığı izni istenebilir); kamerayla fotoğraf çekme özelliği yoktur.',
    'Uygulama yazı tiplerini ve bileşenlerini kendi paketinden yükler; panel web sürümü yazı tipi veya betik için Google gibi üçüncü taraf sunuculara bağlanmaz.',
  ]);

  const kanallar = [
    `${kvkk} adresine, <strong>VetApp’te kayıtlı e-posta adresinizden</strong> göndererek`,
    ...(kep ? [`${e(L.kepAdresi)} KEP adresine veya güvenli/mobil elektronik imzayla`] : []),
    ...(has(L.adres) ? [`${e(L.adres)} adresine yazılı ve imzalı olarak`] : []),
  ];
  const kanalMetni = kanallar.length === 1 ? kanallar[0] : kanallar.length === 2 ? `(1) ${kanallar[0]}, ya da (2) ${kanallar[1]}` : `(1) ${kanallar[0]}, (2) ${kanallar[1]}, ya da (3) ${kanallar[2]}`;
  const s15 = p('Veri sorumlusu olarak bize başvurarak şunları talep edebilirsiniz: (a) kişisel verinizin işlenip işlenmediğini öğrenme; (b) işlenmişse buna ilişkin bilgi talep etme; (c) işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme; (ç) yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme; (d) eksik veya yanlış işlenmişse düzeltilmesini isteme; (e) KVKK md. 7 çerçevesinde silinmesini veya yok edilmesini isteme; (f) (d) ve (e) kapsamındaki işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme; (g) işlenen verinin münhasıran otomatik sistemlerle analiziyle aleyhinize bir sonuç çıkmasına itiraz etme; (ğ) kanuna aykırı işlenmesi nedeniyle zarara uğrarsanız zararın giderilmesini talep etme.') +
    p(`<strong>Nasıl başvurulur:</strong> Başvurunuzu Türkçe olarak, adınız soyadınız ve talebinizle birlikte ${kanalMetni} yapabilirsiniz. Talebinizi en geç <strong>30 gün içinde</strong> ücretsiz sonuçlandırırız; işlem ayrıca maliyet gerektiriyorsa Kurul’un belirlediği tarifeye göre ücret istenebilir. Yanıtı yetersiz bulursanız ya da yanıt alamazsanız, öğrenmenizden itibaren 30, her hâlükârda başvurunuzdan itibaren 60 gün içinde Kişisel Verileri Koruma Kurulu’na şikâyet edebilirsiniz.`) +
    p('Klinik verisiyle ilgili (hayvan sahibi olarak) taleplerinizi ilgili kliniğe yapın; kliniğe yardımcı oluruz.');

  const s16 = p('Hizmet veteriner klinikleri ve iş ortaklarına yöneliktir; 18 yaş altı kişilere yönelik değildir. Bu politika değiştiğinde yeni sürüm ve tarih ile yayımlanır; önemli değişiklikleri uygulama içinden veya e-postayla bildiririz. Kullanım şartları için bkz. <a href="/kullanim-sartlari">Kullanım Şartları</a>.') +
    p(`<strong>Sürüm geçmişi:</strong> ${e(L.surum)} (${e(trDate(L.guncellemeIso))}): kodla çapraz doğrulama düzeltmeleri; 2.0 (17 Kasım 2026): gerçek veri akışlarına göre baştan yazıldı; 1.0 (Kasım 2026): ilk metin.`);

  return [
    section('Kısaca', kisaca),
    section('1. Veri sorumlusu', s1, 'veri-sorumlusu'),
    section('2. Hangi kişisel verileri işliyoruz?', s2),
    section('3. Amaçlar ve hukuki sebepler (KVKK md. 5/2)', s3),
    section('4. Klinik verileri: kliniğiniz veri sorumlusu, VetApp veri işleyen', s4),
    section('5. Kimlerle paylaşırız?', s5),
    section('6. Yurt dışına aktarım', s6),
    section('7. Depo ortakları ile paylaşım', s7),
    section('8. Ortak ilaç kataloğu ve barkod katkısı', s8),
    section('9. Müşteri kimlik kaydı ve ortak borç uyarısı (“kara liste”)', s9),
    section('10. Saklama süreleri', s10, 'saklama'),
    section('11. Yedekler', s11, 'yedekler'),
    section('12. Hesap silme', s12, 'hesap-silme'),
    section('13. Güvenlik tedbirleri', s13),
    section('14. Çerezler ve yerel depolama', s14),
    section('15. KVKK md. 11 kapsamındaki haklarınız ve başvuru', s15, 'basvuru'),
    section('16. Diğer', s16),
  ];
}

// ───────────────────────── Kullanım şartları ─────────────────────────
export function sartlarSections(L = LEGAL) {
  const k = L.kosul;
  const kvkk = mail(L.kvkkBasvuruEposta);
  const fatura = L.faturaNotu ? ` ${e(L.faturaNotu)}` : '';
  const yedekSure = `günlük yedekler yaklaşık 14 gün, haftalık yedekler yaklaşık 56 gün${k.r2 ? ', sunucu dışı kopya 30 gün' : ''} tutulur (bakım öncesi elle etiketlenen yedekler hariç; Gizlilik Politikası Bölüm 11)`;
  const silmeSiz = k.kisiselHesapSilmeCanli
    ? 'Diğer roller yalnız kendi kullanıcı kaydını silebilir (Ayarlar › Hesabı sil).'
    : `Yönetici dışındaki kullanıcılar kendi kullanıcı kaydının silinmesini ${mail(SUPPORT)} adresinden talep edebilir.`;

  return [
    section('1. Taraflar ve kapsam', p(`Bu Kullanım Şartları, ${e(L.unvan)} (${[has(L.adres) ? e(L.adres) : '', has(L.vknVeyaTckn) ? `vergi no/T.C. kimlik no: ${e(L.vknVeyaTckn)}` : '', '“VetApp”, “biz”'].filter(Boolean).join('; ')}) ile VetApp’e bir işletme (veteriner kliniği veya benzeri) adına kaydolan kişi ve işletme (“Müşteri”, “siz”) arasındadır. VetApp; web paneli (panel.vetapp.com.tr), Android ve iOS uygulamaları ve tanıtım sitesinden oluşan bulut tabanlı bir klinik yönetim yazılımıdır (“Hizmet”). Hizmet işletmelere yöneliktir; tüketici olarak kayıt yapılmaz. Hizmeti kullanarak veya kaydı tamamlayarak bu şartları ve <a href="/gizlilik">Gizlilik Politikası</a>’nı kabul etmiş olursunuz. Kayıt sırasında onayınızın zamanı kaydedilir.`)),
    section('2. Hesap', ul([
      'Kayıt sırasında verdiğiniz bilgilerin doğru ve güncel olması gerekir; işletmeyi bağlama yetkiniz olmalıdır.',
      `Hesabın güvenliğinden (parola, Google/Apple hesabı, cihazlar) ve hesabınızda yapılan işlemlerden siz sorumlusunuz. Kullanıcı eklerken her kişiye rolüne uygun yetki verin; yetkisiz erişim şüphesini hemen ${mail(SUPPORT)} adresine bildirin.`,
      'Bir kişi birden fazla klinik adına tek hesap paylaşmamalı; bir hesap birden fazla kişi tarafından ortak kullanılmamalıdır.',
      '“Canlı demo” hesabı herkese açıktır: demo hesaba <strong>gerçek müşteri veya kişisel veri girmeyin</strong>; demo verisi istediğimiz zaman sıfırlanabilir.',
    ])),
    section('3. Kampanya, abonelik ve ödeme',
      p('<strong>3.1 Kampanya.</strong> Kampanya süresince VetApp’in tüm özellikleri ücretsizdir: <strong>31 Ocak 2027’ye kadar bütün kliniklere</strong>; ilk 500 kliniğe ek olarak <strong>31 Mart 2027’ye kadar</strong> (bitiş tarihleri İstanbul saatiyle günün sonudur). “İlk 500” sayımı kayıt sırasına göre yapılır; demo, pasif veya silinmiş hesaplar ile test amaçlı açılmış hesaplar sayıma dahil değildir. Bu sürede ödeme ve kart bilgisi istenmez; kampanya bitince hesabınızdan otomatik ücret çekilmez, devam etmek için siz abonelik başlatırsınız.') +
      p('<strong>3.2 Abonelik ve fiyat.</strong> Kampanya sonrasında aylık ve yıllık abonelik uygulanır. Fiyatlar ve KDV durumu (dahil/hariç) <strong>en geç 31 Aralık 2026’da</strong> sitede ve uygulamada duyurulur. Fiyat değişiklikleri yürürlüğe girmeden <strong>en az 30 gün önce</strong> sitede, uygulama içinde ve/veya e-postayla bildirilir.') +
      p(`<strong>3.3 Ödeme.</strong> Abonelik şu an yalnızca <strong>web panelinden</strong> başlatılır ve <strong>banka havalesi/EFT</strong> ile ödenir: panel, ödeme referans kodunu ve hesap bilgisini gösterir; ödeme açıklamasına VetApp’e kayıt olurken girdiğiniz telefon numarasını yazmanız istenir (ödeme bu numarayla eşleştirilir) ve ödeme VetApp tarafından kontrol edilip onaylandığında abonelik dönemi uzar. Kart bilgisi alınmaz. Mobil uygulamalarda satın alma yoktur; mobil uygulama yalnız abonelik durumunu gösterir. Fatura/belge yasal düzenlemelere uygun olarak düzenlenir.${fatura}`) +
      p('<strong>3.4 Süre sonu.</strong> Abonelik dönemi veya kampanya biterse hesabınızın erişimi sınırlanabilir (ör. yalnız okuma). Bu durumda verileriniz silinmez; silme yalnız Bölüm 10’daki hâllerde yapılır.'), 'kampanya'),
    section('4. Hizmetin sunumu ve süreklilik', p('Hizmeti özenle ve kesintisiz çalıştırmak için gerekli önlemleri alırız; ancak bakım, güncelleme, altyapı veya üçüncü taraf kaynaklı kısa süreli kesintiler olabilir ve bunlar için önceden bildirim yapmaya çalışırız. Belirli bir kesintisizlik oranı (SLA) taahhüt etmeyiz. Hizmet internet bağlantısı gerektirir. Özellikler zaman içinde değişebilir.')),
    section('5. Veriler ve kişisel veriler', ul([
      '<strong>Verileriniz size aittir.</strong> Sisteme girdiğiniz hasta, müşteri, satış, stok ve diğer kayıtların sahibi sizsiniz; VetApp bu verileri yalnızca hizmeti sunmak ve bu şartlarda yazılı amaçlarla işler.',
      '<strong>Roller.</strong> Klinik verisindeki kişisel veriler (hayvan sahipleri, tedarikçiler, personel) bakımından veri sorumlusu <strong>siz</strong>, veri işleyen <strong>VetApp</strong>’tir (KVKK md. 12). Hesabınız, aboneliğiniz ve güvenlik kayıtlarınız bakımından VetApp veri sorumlusudur (<a href="/gizlilik">Gizlilik Politikası</a>).',
      '<strong>Sizin yükümlülükleriniz.</strong> Hayvan sahiplerini ve diğer kişileri KVKK’ya uygun aydınlatmak, gerektiğinde rıza almak, verileri hukuka uygun toplamak; T.C. kimlik numarasını yalnız gerçekten gerektiğinde (ör. veresiye kaydı) girmek; özel nitelikli kişisel veri (insan sağlığı bilgisi vb.) girmemek; yetkili personel dışında erişim vermemek. VetApp kliniklere talep üzerine örnek aydınlatma metni sunar; kullanımı ve uygunluğu sizin sorumluluğunuzdadır.',
      '<strong>Barındırma ve yurt dışı.</strong> Veriler Finlandiya’daki sunucuda tutulur; e-posta gönderimi ve diğer yardımcı hizmetler için yurt dışındaki hizmet sağlayıcılar kullanılır (Gizlilik Politikası Bölüm 5-6).',
    ])),
    section('6. Yedekleme ve veri geri getirme', p(`VetApp, felaket durumunda hizmeti geri getirebilmek için her gece veritabanı ve yüklenen dosyaların yedeğini alır; ${yedekSure}. Bu yedekler <strong>VetApp’in kendi hizmet sürekliliği içindir</strong>; kliniğe özel, tek tek veri geri getirme hizmeti veya belirli bir geri getirme süresi taahhüdü değildir (makul çabayla yardım ederiz). Kendi yasal saklama ve muhasebe yükümlülükleriniz (ör. defter ve belgeler) için gerekli kayıtları ayrıca saklamanız ve silme talebinden önce almanız sizin sorumluluğunuzdadır.`)),
    section('7. Kullanım kuralları', p('Aşağıdakiler yasaktır: yasa dışı amaçla kullanım; hizmeti, sunucuları veya başka kliniklerin verilerini hedef alan yetkisiz erişim, tarama, otomatik toplu sorgu veya güvenlik testi; hesap, parola veya yetki paylaşımı; başkasına ait kişisel verileri hukuka aykırı girmek; kimlik/borç bilgisini haksız veya yanlış girmek; hizmeti tersine mühendislikle çözmeye çalışmak; rate limit veya demo korumalarını aşmak; spam veya zararlı içerik yüklemek (yükleme sınırı dosya başına 10 MB ve izinli türlerdir).')),
    section('8. Ortak ilaç kataloğu ve barkod katkısı', p('Katalog ve barkod eşleşmeleri bilgilendirme ve kolaylık içindir; tıbbi, mesleki veya ticari tavsiye değildir. İlaç adı, doz, barkod ve prospektüs bilgilerini kullanmadan önce doğrulamak sizin sorumluluğunuzdadır (“doğrulanmadı” ibaresi taşıyan kayıtlar özellikle). Kliniğinizin ürün–barkod eşleştirmeleri anonim olarak ortak ilaç kataloğunu iyileştirmek için kullanılabilir; oylamada yalnızca VetApp’in oy hakkı verdiği (onaylı) kliniklerin beyanları sayılır, ortak kataloğa yazılan yalnızca ürün–barkod eşleşmesidir ve katalog kaydında hangi klinikten geldiği bilgisi tutulmaz. Bilerek yanlış barkod bildirmemeyi kabul edersiniz.')),
    section('9. Depo (iş ortağı) programı', p('Kayıt sırasında bir depo referans kodu girerseniz, depo ortağına yalnız kliniğinizin adı, kayıt tarihi ve komisyon durumu raporlanır; müşteri, hasta, satış, stok, borç veya mali verileriniz depo ortağına gitmez. Depoyla ilişkiniz bu şartlardan bağımsızdır.')),
    section('10. Hesap silme ve fesih', ul([
      `<strong>Siz:</strong> Hesabınızı istediğiniz zaman kapatabilirsiniz. Yönetici, Ayarlar › Gizlilik ve veriler’den klinik silme talebi oluşturur: <strong>30 gün</strong> beklenir (talep iptal edilebilir), sonra kişisel veriler silinir/anonimleşir, mali kayıt tutarları kişisel bilgiden arındırılarak yasal süre (10 yıl) saklanır; silinen veri yedeklerde yaklaşık 56 gün kalabilir. ${silmeSiz} Ayrıntı: <a href="/hesap-silme">Hesap silme</a> ve Gizlilik Politikası Bölüm 12.`,
      `<strong>VetApp:</strong> Bu şartlara, mevzuata veya güvenliğe aykırı kullanımı tespit edersek hesabı, mümkünse önce bildirerek ve gerekçesini belirterek, askıya alabilir veya feshedebiliriz; acil güvenlik durumlarında bildirim sonradan yapılabilir. Hesabınızın askıya alınması hâlinde itirazınızı ${mail(SUPPORT)} adresine iletebilirsiniz.`,
      'Fesih sonrası verileriniz Gizlilik Politikası’ndaki saklama kurallarına tabidir; ödenmiş bir abonelik bedelinin iadesi, fesih sebebine ve ödeme koşullarına göre değerlendirilir.',
    ]), 'fesih'),
    section('11. Fikri mülkiyet', p('Yazılım, marka, tasarım ve ortak ilaç kataloğunun derlemesi VetApp’e (veya lisans verenlerine) aittir. Size, abonelik/kampanya süresince Hizmeti kendi işletmeniz için kullanmak üzere münhasır olmayan, devredilemez bir kullanım hakkı verilir. Verileriniz bu hükümden etkilenmez.')),
    section('12. Sorumluluğun sınırı', p('Hizmet “olduğu gibi” ve makul özenle sunulur. Kanunen sınırlanamayan sorumluluk (kasıt ve ağır kusur dahil) saklıdır. Bunun dışında, dolaylı zararlardan (kâr kaybı, itibar kaybı, iş durması, üçüncü kişilere ödenen tazminatlar vb.) sorumlu değiliz; doğrudan zararlar için sorumluluğumuz, olayın gerçekleştiği tarihten önceki 12 ayda VetApp’e ödediğiniz abonelik bedeliyle sınırlıdır. Veri girişinin, stok/finans hesaplarının ve mevzuata uygun belge düzeninin doğruluğu, klinik kararları ve ilaç/doz seçimleri sizin sorumluluğunuzdadır; Hizmet hukuki, mali veya tıbbi danışmanlık yerine geçmez. Üçüncü taraf hizmetlerdeki (barındırma, e-posta, Google/Apple, mağazalar) kesintilerden kaynaklanan zararlarda sorumluluğumuz bu Bölüm’deki sınırlarla sınırlıdır.')),
    section('13. Değişiklikler', p('Şartları değiştirebiliriz. Yeni sürüm ve tarih ile yayımlanır; önemli değişiklikleri uygulama içinden veya e-postayla önceden bildiririz. Değişiklikten sonra Hizmeti kullanmaya devam etmeniz yeni şartları kabul ettiğiniz anlamına gelir; kabul etmezseniz hesabınızı kapatabilirsiniz.')),
    section('14. Uygulanacak hukuk ve uyuşmazlık', p(`Bu şartlara Türkiye Cumhuriyeti hukuku uygulanır. Uyuşmazlıklarda ${has(L.yetkiliMahkeme) ? e(L.yetkiliMahkeme) : 'Türkiye Cumhuriyeti'} mahkemeleri ve icra daireleri yetkilidir.`)),
    section('15. İletişim', p(`Şartlar hakkında: ${mail(SUPPORT)} · Kişisel veri başvuruları: ${kvkk}`) +
      p(`<strong>Sürüm geçmişi:</strong> ${e(L.surum)} (${e(trDate(L.guncellemeIso))}): kodla çapraz doğrulama düzeltmeleri; 2.0 (17 Kasım 2026): yedekleme sorumluluğu çelişkisi düzeltildi; kampanya, abonelik/ödeme, hesap silme, barkod katkısı, kullanım kuralları, sorumluluk sınırı (kasıt/ağır kusur hariç) ve uyuşmazlık maddeleri eklendi; 1.0 (Ocak 2025): ilk metin.`)),
  ];
}

// ───────────────────────── Hesap silme (Google Play “hesap silme web adresi”) ─────────────────────────
// Yer tutucu GEREKTİRMEZ (yalnız “VetApp” markası). Doğruluk koşulu: backend'deki yeni hesap silme akışı canlıda olmalı
// (docs/HESAP-SILME.md). Yayın sırası: önce backend dağıtımı, sonra bu sayfa (README).
export function hesapSilmeSections(L = LEGAL) {
  const apple = L.kosul.appleJetonIptali
    ? ' Hesabınız silindiğinde, Apple ile giriş yaptıysanız VetApp Apple’a yetki iptali de gönderir.'
    : '';
  return [
    section('', `<div class="callout">${p('<strong>En hızlı yol:</strong> VetApp uygulamasında (veya web panelinde) <strong>Ayarlar › Hesabı sil</strong>. Uygulamaya giremiyorsanız <strong>' + mail(SUPPORT) + '</strong> adresine yazın; hangi bilgilerin istendiği aşağıda (Bölüm 5).')}</div>` +
      p('Bu sayfa, VetApp Mobil (Android ve iOS) ve VetApp web paneli (panel.vetapp.com.tr) hesaplarının nasıl silineceğini, silme sonrasında hangi verinin silindiğini, hangisinin neden saklandığını ve yedeklerdeki durumu anlatır.')),
    section('1. Uygulamadan hesap silme', p('Giriş yapın, <strong>Ayarlar › Hesabı sil</strong> bölümüne gidin. Ekranda ne göreceğiniz hesabınızın rolüne bağlıdır:') + table(['Rol', 'Ne olur'], [
      ['<strong>Yönetici</strong> (klinik sahibi)', '<strong>Klinik silme talebi</strong> oluşturursunuz: klinik adını yazarak onaylarsınız. <strong>30 gün</strong> beklenir; bu sürede hesap çalışmaya devam eder, e-postayla bilgilendirilirsiniz ve Ayarlar’dan <strong>Silme talebini iptal et</strong> ile vazgeçebilirsiniz. Süre dolunca klinik verileri silinir/anonimleşir (Bölüm 2). Süre dolduktan sonra geri alınamaz. Silme işlemi günlük bakım işiyle yapıldığından fiilen 30. günü izleyen ilk bakım çalışmasında gerçekleşir.'],
      ['<strong>Diğer roller</strong> (veteriner, kasiyer, asistan)', '<strong>Kişisel hesap silme:</strong> yalnız kendi kullanıcı kaydınız silinir, işlem hemen uygulanır. Kimliğinizi parolanızla doğrularsınız. Klinik kayıtları (müşteri, hasta, satış vb.) klinikte kalır.'],
      ['<strong>Yönetici</strong>, klinikte başka etkin yönetici varsa', 'Aynı ekrandaki ikinci bağlantıyla yalnız kendi kullanıcınızı silebilirsiniz; klinik silinmez.'],
      ['Kliniğin <strong>son yöneticisi</strong>', 'Klinik sahipsiz kalmasın diye kişisel silme reddedilir; önce klinik silme talebi başlatın ya da başka bir kişiyi yönetici yapın.'],
    ]) + p('Demo hesap silinemez.')),
    section('2. Neler silinir veya anonimleşir?', p('<strong>Klinik silme talebi (yönetici), süre dolunca:</strong>') + ul([
      'Müşteri (hayvan sahibi), hasta ve tedarikçi iletişim bilgileri: ad, telefon, e-posta, T.C. kimlik no, adres',
      'Klinik notları ve yüklenen dosyalar',
      'Kullanıcıların ad, e-posta ve telefonu; kullanıcı hesapları kapanır, oturumlar sonlanır',
      'Kliniğe bağlı uygulama içi geri bildirim mesajları',
      'İşlem (denetim) kayıtlarındaki IP adresi ve içerik (işlemin türü kalır)',
      'Google ve Apple ile giriş bağlantıları' + (L.kosul.appleJetonIptali ? '; Apple yetkisi iptal edilir' : ''),
    ]) + p('<strong>Kişisel hesap silme (diğer roller), hemen:</strong>') + ul([
      'E-posta, ad ve telefon anonimleştirilir (e-posta <code>silinmis-…@anonymized.invalid</code>, ad “Silinmiş kullanıcı”); hesap pasif olur, parola geçersiz kılınır',
      'Tüm oturumlar, parola sıfırlama ve e-posta doğrulama kodları silinir',
      'Google ve Apple bağlantıları kaldırılır',
    ])),
    section('3. Neler saklanır, neden?', ul([
      '<strong>Mali kayıt tutarları</strong> (satış, borç/tahsilat, fatura, ödeme, komisyon): kişisel bilgiden arındırılarak, yasal saklama yükümlülüğü gereği <strong>10 yıl</strong> saklanır.',
      'Kişisel hesap silmede, önceki işlemlerinize ait işlem (denetim) kayıtları ve bu kayıtlardaki IP adresi ile uygulama içinden gönderdiğiniz geri bildirim mesajları, klinik hesabı açık olduğu sürece anonimleşmiş kullanıcı kaydına bağlı olarak kalır; bunların da silinmesini ayrıca talep edebilirsiniz (Bölüm 5).',
      'Web sitesindeki iletişim formundan gönderdiğiniz mesajlar kliniğe bağlı olmadığı için hesap silmeyle otomatik silinmez; silinmesini talep edebilirsiniz (Bölüm 5).',
    ]) + p('Ayrıntılı saklama süreleri: <a href="/gizlilik#saklama">Gizlilik Politikası, Bölüm 10</a>.')),
    section('4. Yedeklerdeki veri', p('Silinen veri, felaket kurtarma amacıyla alınan yedeklerde <strong>en çok yaklaşık 56 güne kadar</strong> kalabilir (günlük yedekler yaklaşık 14 gün, haftalık yedekler yaklaşık 56 gün) ve süre dolunca yedeklerle birlikte kaybolur. Nadiren, bakım öncesinde elle etiketlenen yedekler bu sürelerden uzun tutulabilir; ayrıntı için <a href="/gizlilik#yedekler">Gizlilik Politikası, Bölüm 11</a>. Yedekler yalnız VetApp’in süreklilik amacıyla kullanılır; tek tek veri geri getirme hizmeti değildir.'), 'yedekler'),
    section('5. Uygulamaya erişemiyorsanız: e-postayla talep', p(`Şifrenizi unuttuysanız, uygulamaya giremiyorsanız ya da uygulamayı kaldırdıysanız hesabınızın silinmesini ${mail(SUPPORT)} adresinden isteyebilirsiniz.`) + ol([
      `Kayıtlı e-posta adresinizden <strong>${e(SUPPORT)}</strong> adresine, konuya “Hesap silme talebi” yazarak e-posta gönderin.`,
      '<strong>Kimlik doğrulama için isteyeceğimiz bilgiler:</strong> VetApp’te kayıtlı e-posta adresiniz (talebi bu adresten göndermeniz yeterlidir) ve klinik adınız. Parolanızı, T.C. kimlik numaranızı veya başka gizli bilgi göndermeyin; bunları istemeyiz. Kayıtlı adresten gelmeyen taleplerde kimliğinizi doğrulamak için ek bilgi isteyebiliriz.',
      'Klinik silme talebini yalnızca kliniğin yöneticisi yapabilir; diğer roller yalnız kendi kullanıcı kaydı için talepte bulunur. Klinik silme taleplerinde uygulamadaki 30 günlük bekleme süresi uygulanır; bu süre içinde vazgeçebilirsiniz.',
      'Talebinizi kimliğiniz doğrulandıktan sonra işleme alır, en geç <strong>30 gün içinde</strong> yanıtlarız.',
    ]) + p('Hesap silmeden bağımsız olarak KVKK kapsamındaki haklarınızı (erişim, düzeltme, silme vb.) kullanmak için <a href="/gizlilik#basvuru">Gizlilik Politikası, Bölüm 15</a>’teki başvuru yöntemine bakın.')),
    section('6. Google veya Apple ile giriş yapanlar', ul([
      'Google veya Apple ile giriş yaptıysanız VetApp’te parolanız yoktur: kişisel hesap silmede parola yerine ekrandaki onay ifadesini (“HESABIMI SİL”) yazarsınız.',
      'Hesap silindiğinde Google/Apple ile giriş bağlantınız VetApp’ten kaldırılır.' + apple,
      'Ayrıca Apple Kimliği ve Google Hesabı ayarlarınızdan VetApp’e verdiğiniz erişimi istediğiniz zaman kendiniz de kaldırabilirsiniz.',
    ])),
  ];
}
