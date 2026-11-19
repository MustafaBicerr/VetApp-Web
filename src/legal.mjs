// VetApp hukuk metinleri için TEK YÖNETİM YERİ.
// Gizlilik politikası (/gizlilik), kullanım şartları (/kullanim-sartlari) ve hesap silme (/hesap-silme) sayfaları,
// SSS'deki ilgili cevaplar bu dosyadaki değerlerden beslenir. Metinlerin kendisi: src/legal-pages.mjs.
//
// SAHİBİN DOLDURACAĞI DEĞERLER:
//  1) Aşağıdaki '{{...}}' dizelerini gerçek değerle değiştirin (çift süslü parantezli yer tutucu kalmamalı).
//  2) kosul bayraklarını, gerçekten o iş bitince `true` yapın (bayrak açıklamaları aşağıda).
//  3) Yayın gününde guncellemeIso tarihini (ve gerekirse surum) güncelleyin.
// `{{` içeren bir değer çıktıya (HTML) sızarsa `npm run build` / `npm run deploy` HATA verir (scripts/check-placeholders.mjs).
// Yer tutuculu önizleme için: `npm run build:draft` (yalnız yerel önizleme; asla yayınlanmaz, README'ye bakın).
//
// Bu metinler hukuk tavsiyesi değildir; avukat görüşü olmadan hazır şablon ve kod taramasıyla hazırlanmış TASLAKTIR
// (karar masası Soru 1 c, Soru 2 a). Avukat gözden geçirmesi gelince `surum` yükseltilir.

/** Yurt dışı aktarım güvence cümlesi: LEGAL.yurtDisiGuvence değerini bunlardan biri yapın. */
export const YURT_DISI_GUVENCE = {
  // Yalnız iş GERÇEKTEN bittiyse (imzalandı ve Kuruma bildirildi):
  A: 'Bu aktarımlar için ilgili hizmet sağlayıcılarla Kurul’un yayımladığı standart sözleşme imzalanmış ve Kuruma bildirilmiştir.',
  // İş sürüyorsa (şu anki gerçek durum):
  B: 'Bu aktarımlar için standart sözleşme imza ve bildirim süreçlerimiz devam etmektedir; tamamlandığında bu metin güncellenecektir.',
};

export const LEGAL = {
  // ───────── sürüm ─────────
  surum: '2.0.1',
  guncellemeIso: '2026-11-19', // "Son güncelleme" tarihi: yayın günü güncelleyin (sitemap lastmod da buradan gelir)

  // ───────── VetApp kimliği (karar 3 a: mevcut işletmenin unvanı, adresi, vergi numarası) · SAHİP VERECEK ─────────
  unvan: '{{UNVAN}}',                       // Tam unvan (öneri: alt bilgideki "MBiCER Yazılım ve Mühendislik"; vergi levhasıyla doğrulayın)
  adres: '{{ADRES}}',                       // Tebligat adresi (KVKK başvurusunun posta adresi olur)
  vergiDairesi: '{{VERGI_DAIRESI}}',
  vknVeyaTckn: '{{VKN_VEYA_TCKN}}',         // Şirketse vergi kimlik no, şahıs işletmesiyse T.C. kimlik no
  kvkkBasvuruEposta: '{{KVKK_BASVURU_EPOSTA}}', // KVKK başvurularını gerçekten okuyan TEK adres
  kepAdresi: '{{KEP_ADRESI}}',              // KEP adresi yoksa `null` yapın: KEP seçeneği metinden çıkar
  yetkiliMahkeme: '{{YETKILI_MAHKEME}}',    // Örn. "İstanbul" (kullanım şartları md. 14)

  // ───────── sahibin vereceği karar / doğrulamalar ─────────
  // Yurt dışı aktarım güvencesi: YURT_DISI_GUVENCE.A (yalnız iş bittiyse) ya da YURT_DISI_GUVENCE.B
  yurtDisiGuvence: '{{YURT_DISI_GUVENCE_DURUMU}}',
  faturaNotu: '{{FATURA_NOTU}}',            // Fatura/e-belge düzenleme notu (şartlar 3.3); söylenecek bir şey yoksa '' (boş) yapın
  // Aşağıdakiler yalnız ilgili koşul bayrağı `true` olunca metne girer (bayrak kapalıyken doldurmak gerekmez):
  r2Konumu: '{{R2_KONUMU}}',                // kosul.r2: Cloudflare R2 kova konumu (panelden doğrulayın; garanti verilmeyen "konum ipucu" ise öyle yazın)
  sentryBolgesi: '{{SENTRY_BOLGESI}}',      // kosul.sentry: Sentry hesabının bölgesi (öneri: AB)
  etiketliYedekSuresi: '{{ETIKETLI_YEDEK_SURESI}}', // kosul.etiketliYedekSilmeTaahhudu: örn. "56 gün"

  // ───────── koşul bayrakları ([KOŞUL-…] paragrafları) ─────────
  // Varsayılan = hukuk belgelerindeki (docs/hukuk, 17-19 Kasım 2026) GÜNCEL GERÇEK: hiçbiri canlıda/yürürlükte değil.
  kosul: {
    // [KOŞUL-R2] Sunucu dışı şifreli yedek (Cloudflare R2) sunucuda GERÇEKTEN çalışıyor
    // (/var/lib/vetapp/backup.status → "offsite":"ok"). Kapalıyken R2 satırları/cümleleri metinde yok.
    r2: false,
    // [KOŞUL-SENTRY] Sentry hata izleme bağlı (SENTRY_DSN API, panel ve mobilde girilmiş). Kapalıyken Sentry satırı yok.
    sentry: false,
    // [KOŞUL-KISISEL-HESAP-SILME] Yeni hesap silme akışı CANLIDA: backend dağıtıldı (kişisel hesap silme) ve
    // panel/mobildeki "Hesabı sil" yeni uçlara bağlı. Kapalıyken diğer roller için "destek'ten talep" yazar.
    // /hesap-silme sayfası bu bayraktan bağımsız yazılmıştır: o sayfa için yayın sırası: önce backend dağıtımı (README).
    kisiselHesapSilmeCanli: false,
    // Apple jeton iptali sunucuda çalışıyor (APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY girilmiş, kişisel silme canlıda).
    appleJetonIptali: false,
    // [KOŞUL-KIMLIK-HAVUZU] Kimlik havuzu düzeltmesi (hukuk Bulgu 1: ortak tabloya yalnız bayrak açık + klinik rızalıyken yazılır)
    // CANLIYA DAĞITILDI. Dağıtılmadıysa (false) gizlilik 9a'nın ESKİ (şu anda canlıdaki) davranışı anlatılır.
    kimlikHavuzuDuzeltmeCanli: false,
    // Düzeltmeden ÖNCE yazılmış person_identities satırları temizlendi (docs/hukuk/dogrulama-raporu.md bölüm 10). Temizlenmediyse
    // (false) 9a'ya "eski kayıtlar tabloda kalabilir" cümlesi eklenir. Yalnız kimlikHavuzuDuzeltmeCanli=true iken anlamlıdır.
    kimlikEskiSatirlarTemizlendi: false,
    // [KOŞUL-ILETISIM-SILME] İletişim kayıtlarını (en çok 2 yıl) elle/otomatik silme taahhüdü verilebiliyor.
    // Kapalıyken metinde "2 yıl" ifadesi yok (kodda otomatik silme işi YOK).
    iletisimSilmeTaahhudu: false,
    // [KOŞUL-ETIKETLI-YEDEK] Elle etiketlenen `vetapp-pre-*` yedekleri etiketliYedekSuresi içinde silme taahhüdü verilebiliyor.
    etiketliYedekSilmeTaahhudu: false,
  },
};

/** build.mjs ve check-placeholders çıktısında gösterilen, koşul bayraklarının açıklamaları. */
export const KOSUL_ACIKLAMA = {
  r2: 'Cloudflare R2 sunucu dışı yedek çalışıyor mu',
  sentry: 'Sentry hata izleme bağlı mı',
  kisiselHesapSilmeCanli: 'Kişisel hesap silme + yeni "Hesabı sil" akışı canlıda mı (backend dağıtımı sonrası)',
  appleJetonIptali: 'Apple jeton iptali sunucuda çalışıyor mu',
  kimlikHavuzuDuzeltmeCanli: 'Kimlik havuzu düzeltmesi (Bulgu 1) canlıya dağıtıldı mı',
  kimlikEskiSatirlarTemizlendi: 'Eski person_identities satırları temizlendi mi',
  iletisimSilmeTaahhudu: 'İletişim kayıtlarını en çok 2 yılda silme taahhüdü var mı',
  etiketliYedekSilmeTaahhudu: 'Elle etiketli yedekleri silme taahhüdü var mı',
};

/** Bayrak durumlarını okunur satırlara çevirir. */
export const kosulDurumu = (L = LEGAL) => Object.entries(KOSUL_ACIKLAMA).map(([k, a]) => `${L.kosul[k] ? 'AÇIK  ' : 'kapalı'}  ${k}: ${a}`);
