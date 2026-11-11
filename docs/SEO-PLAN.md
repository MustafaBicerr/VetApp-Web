# VetApp SEO ve yapay zekâ görünürlüğü planı

## 1. Sitede yapılanlar (teknik SEO)

| Konu | Ne yapıldı |
| --- | --- |
| Anahtar kelime sayfaları | 7 yeni sayfa: `/veteriner-programi`, `/veteriner-stok-takip-programi`, `/veteriner-cari-takip-programi`, `/veteriner-asi-takip-programi`, `/veteriner-hasta-takip-programi`, `/veteriner-mobil-uygulama`, `/buyukbas-veteriner-programi`. Her biri tek bir arama niyetine yanıt veriyor; kendi SSS'si ve FAQPage şeması var |
| Ana sayfa | Başlık/açıklama "veteriner klinik programı" odağına çekildi, H1'e anahtar kelime eklendi, çözüm kartları + blog bölümü eklendi |
| Blog altyapısı | `content/blog/*.md` → `/blog/<slug>`. BlogPosting şeması, içindekiler tablosu, ilgili yazılar, RSS (`/feed.xml`). 4 başlangıç yazısı |
| İç bağlantı | Menüde Çözümler + Blog, alt bilgide 7 çözüm bağlantısı, özellikler sayfasından çözüm sayfalarına bağlantılar |
| Yapılandırılmış veri | Organization (sameAs, iletişim, bölge), WebSite, SoftwareApplication (özellik listesi, ekran görüntüleri, App Store), WebPage, BreadcrumbList, FAQPage, Blog/BlogPosting |
| Yapay zekâ (GEO) | `/llms.txt` ve `/llms-full.txt` (ürünün özeti, özellikleri, sınırları, bütün SSS ve blog metni). `robots.txt`'te GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended vb. açıkça izinli |
| Hızlı indeksleme | IndexNow anahtar dosyası + `node scripts/indexnow.mjs` |
| Kampanya | `/ucretsiz-veteriner-programi` sayfası ("ücretsiz / uygun fiyatlı veteriner programı" aramaları), sitenin tepesinde duyuru çubuğu, ana sayfada hero altı kampanya bandı, çözüm sayfalarında kampanya şeridi, Offer şeması (geçerlilik tarihleri ve kalan kontenjan), llms.txt'te kampanya bölümü. Rakamlar `src/site.mjs` → `CAMPAIGN` |
| Diğer | Twitter kartları, makale meta etiketleri, `apple-itunes-app` (Safari'de App Store bandı), sitemap'te gerçek `lastmod` |

## 2. Deploy sonrası bir kez yapılacaklar (sizde)

1. **Yayına alın** (README'deki deploy komutu), sonra şunları tarayıcıda açıp 200 döndüğünü kontrol edin:
   `/blog`, `/blog/veteriner-programi-secerken-dikkat-edilmesi-gerekenler`, `/veteriner-programi`, `/llms.txt`, `/feed.xml`, `/7fc78b93df50c6e360f941daed897c4b.txt`.
   `/blog` 404/403 verirse nginx'te `try_files $uri $uri.html $uri/ =404;` sırasının bu şekilde olduğundan emin olun (`blog.html` dosyası, `blog/` klasöründen önce denenmeli).
2. **Yönlendirmeler:** `http://` → `https://` ve `vetapp.com.tr` → `www.vetapp.com.tr` kalıcı (301) yönlendirme olmalı. `/ozellikler.html` gibi adresler de `/ozellikler`'e 301 ile gitmeli (canonical zaten var ama 301 daha temiz).
3. **Google Search Console** (doğrulama dosyası zaten sitede): Site haritaları → `https://www.vetapp.com.tr/sitemap.xml` gönderin. URL denetimi ile yeni 7 çözüm sayfası ve 4 blog yazısı için "Dizine eklenmeyi iste".
4. **Bing Webmaster Tools** (bing.com/webmasters): "Google Search Console'dan içe aktar" ile 1 dakikada ekleyin, sitemap'i gönderin. **ChatGPT arama ve Microsoft Copilot Bing dizinini kullanır**; bu adım yapay zekâda görünmek için kritik.
5. `node scripts/indexnow.mjs` çalıştırın (Bing + Yandex'e bütün sayfaları bildirir).
6. **Google İşletme Profili** (business.google.com): "VetApp – Veteriner Klinik Programı", kategori "Yazılım şirketi"; resmî adres olunca eklenir (şimdilik "hizmet bölgesi: Türkiye"). Web sitesi, telefon, logo, ekran görüntüleri. Haritalar ve marka aramalarında güven sinyali.
7. **Play Store bağlantısı:** `src/site.mjs` içindeki `PLAY_STORE` sabitine Play Store adresini yazıp `node build.mjs` çalıştırın. Bağlantı alt bilgi, mobil uygulama sayfası, şema ve llms.txt'ye otomatik eklenir.

## 3. Site dışı (otorite) — sıralamayı asıl taşıyan kısım

Yeni bir alan adının "veteriner programı" gibi rekabetli bir kelimede yükselmesi için Google'ın sitenize **başka sitelerden** güven duyması gerekir. Yapay zekâ asistanları da çoğunlukla birden çok kaynakta adı geçen ürünleri önerir.

- **mbicer.com.tr**: VetApp'i ürünler/referanslar bölümünde "veteriner klinik programı" metniyle www.vetapp.com.tr'ye bağlayın.
- **App Store / Play Store açıklaması**: İlk satırlara "veteriner programı, veteriner klinik yazılımı, stok, cari, veresiye, aşı takibi" ifadelerini doğal biçimde koyun; açıklamada web sitesi bağlantısı olsun. App Store'da "anahtar kelimeler" alanını doldurun.
- **Yazılım rehberleri / dizinler**: Capterra, GetApp, Software Advice (aynı grup), G2, SoftwareSuggest, Türkçe yazılım karşılaştırma siteleri. Ürün sayfası açın, ekran görüntüsü ekleyin.
- **Gerçek müşteri yorumları**: Memnun klinikten (izin alarak) Google İşletme Profili'ne, App Store'a ve Capterra'ya yorum isteyin. İzin verirlerse siteye referans olarak da ekleyebiliriz. **Sahte yorum yazmayın/yazdırmayın** — hem Google hem mağazalar cezalandırır.
- **Sektör kanalları**: Veteriner hekim odaları, VHD bültenleri, veteriner fakültesi mezun grupları, ilaç depolarının (depo iş ortaklığı) web siteleri ve bültenleri. Depolar sitelerinde sizi bağlantıyla anarsa çok değerli.
- **YouTube**: 2–5 dakikalık "VetApp ile veresiye satış nasıl yapılır", "barkodla stok girişi" videoları. Başlıkta anahtar kelime, açıklamada site bağlantısı. YouTube hem Google'da hem yapay zekâ cevaplarında sık alıntılanır.
- **Topluluklar**: Facebook/WhatsApp veteriner hekim grupları, Ekşi Sözlük/Reddit'te "veteriner programı önerisi" başlıkları — reklam gibi değil, gerçek soruya dürüst cevap olarak, ürünün yapımcısı olduğunuzu belirterek.
- **Basın**: Yerel/teknoloji haber sitelerine "Yerli geliştiriciden veteriner kliniklerine yerli yazılım" hikâyesi.

**Yapmayın:** Link satın alma, PBN, toplu dizin gönderimi, anahtar kelime doldurma, kopya içerik. Kısa vadede bile zarar verir.

## 4. İçerik takvimi (haftada 2–3 yazı)

Her yazıda `related` alanına uygun çözüm sayfasını yazın. Öncelik sırası: üstteki yazılar satın almaya en yakın aramaları hedefler.

### Satın alma niyeti (önce bunlar)
1. Veteriner programı fiyatları: neye göre değişir? *(veteriner programı fiyatları)*
2. Ücretsiz veteriner programı var mı? Deneme sürümleri ve dikkat edilecekler *(ücretsiz veteriner programı)*
3. Bulut tabanlı ve masaüstü veteriner programı karşılaştırması *(veteriner yazılımı, bulut)*
4. Excel'den veteriner programına geçiş rehberi *(veteriner excel stok takibi)*
5. Veteriner kliniği için mobil uygulama: telefondan klinik yönetimi *(veteriner uygulaması)*
6. Büyükbaş veteriner hekimleri için saha kayıt rehberi *(büyükbaş veteriner programı)*
7. Pet shop'lu veteriner klinikleri için stok ve satış yönetimi *(pet shop programı veteriner)*

### Nasıl yapılır (orta huni)
8. Veteriner kliniğinde gün sonu kasa kapanışı nasıl yapılır?
9. İlaç deposu alım faturası nasıl girilir? İskonto, KDV, mal fazlası
10. Son kullanma tarihi geçen veteriner ilaçları: önleme ve takip
11. Kritik stok seviyesi nasıl hesaplanır? (örnekli)
12. Veresiye müşterilere hatırlatma: doğru zamanda, doğru dille
13. Enflasyon döneminde veresiye satış nasıl yönetilir?
14. Veteriner kliniğinde sarf malzeme maliyetini düşürmenin yolları
15. SOAP muayene kaydı nedir? Veteriner hekimler için örnek
16. Klinikte randevu sistemi kurmak: gelmeyen hastayı azaltma
17. Veteriner kliniğinde personel ve yetki yönetimi

### Bilgi / geniş kitle (trafik + marka bilinirliği)
18. Kedi aşı takvimi (hekim kontrolünde yazılmış, kaynaklı)
19. Köpek aşı takvimi
20. Büyükbaşta koruyucu aşı ve parazit uygulama takvimi
21. Veteriner kliniği açmak için gerekenler (mevzuat bölümünü güncel kaynaklarla, il müdürlüğü/oda teyitli)
22. Veteriner kliniği iş planı ve maliyet kalemleri
23. Veteriner kliniğinde müşteri sadakati: aşı takibinin rolü
24. Veteriner hekimler için dijital pazarlama: Google İşletme Profili rehberi
25. Mikroçip ve hasta kimliklendirme: klinikte kayıt düzeni
26. KVKK: veteriner klinikleri müşteri verisini nasıl korumalı?
27. Veteriner ilaç depoları ile çalışma: vade ve iskonto yönetimi
28. Yeni mezun veteriner hekimler için klinik yönetimi 101
29. Veteriner kliniğinde stok sayımı nasıl yapılır? (kontrol listesi)
30. VetApp sürüm notları / yeni özellikler (her ay — tazelik sinyali)

> Tıbbi içerikte (aşı takvimi, dozlar) mutlaka bir hekimin kontrolünü ve güncel kaynakları kullanın, yazar olarak hekimin adını yazın. Yanlış tıbbi bilgi hem itibar hem SEO açısından zarar verir.

## 5. Ölçüm (ayda bir)

- **Search Console → Performans:** "veteriner programı", "veteriner klinik programı", "veteriner stok takip", "veteriner cari takip" sorgularında gösterim ve ortalama konum. İlk 4–8 haftada gösterimlerin başlaması, 3–6 ayda ilk sayfaya yaklaşması beklenir (site dışı çalışmaya bağlı).
- **Hangi sayfa hangi sorguda çıkıyor?** Bir yazı beklenmedik bir sorguda gösterim alıyorsa o konuda yeni yazı yazın.
- **Yapay zekâ testi:** ChatGPT, Gemini, Perplexity ve Copilot'a ayda bir şunu sorun: "Türkiye'de veteriner klinikleri için hangi programları önerirsin?", "veteriner stok ve veresiye takibi için uygulama". VetApp'in adı geçiyor mu, not edin.
- **Panel kayıtları:** Kayıt formunda "Bizi nereden duydunuz?" alanı varsa Google / Yapay zekâ / Tavsiye seçeneklerini ekleyin.
