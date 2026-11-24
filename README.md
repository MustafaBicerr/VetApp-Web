# VetApp tanıtım sitesi (www.vetapp.com.tr)

Statik site: içerik `src/site.mjs` (ana sayfalar), `src/solutions.mjs` (anahtar kelime sayfaları), `content/blog/*.md` (blog), derleyici `build.mjs`. **Çıktı (HTML, sitemap, robots) repoya commit edilir**; sunucuda derleme gerekmez.

```bash
node build.mjs          # kökte *.html, blog/*.html, sitemap.xml, robots.txt, feed.xml, llms.txt, llms-full.txt üretir; hukuk sayfalarında '{{...}}' kalmışsa HATA verir
node build.mjs --draft  # (= npm run build:draft) yer tutuculu TASLAK önizleme; asla yayınlanmaz (aşağıda: Hukuk metinleri)
node scripts/indexnow.mjs   # (deploy sonrası) sayfaları Bing/Yandex'e bildirir
node ../.../serve       # (yerel önizleme için herhangi bir statik sunucu; temiz URL için nginx kuralları deploy/nginx-vetapp.conf'ta)
```

- Tasarım: `assets/css/site.css` (Geist + Instrument Serif, kendi barındırılan yazı tipleri `assets/fonts/`).
- Görseller: `assets/img/` — ürün ekran görüntüleri WebP; logo/ikon seti marka paketinden (`VetApp-Logos`).
- İletişim/başvuru formları `POST https://api.vetapp.com.tr/api/public/contact` ucuna gider (tablo: `contact_messages`).
- Dağıtım (Cloudflare, Worker `vetapp-web`, yalnız statik varlıklar): `npm install && npm run deploy` (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` ortam değişkenleriyle ya da `npx wrangler login` sonrası). `npm run deploy` önce yer tutucu denetimini (`scripts/check-placeholders.mjs`), sonra `node build.mjs`, çıktı denetimini ve `scripts/stage.mjs` ile `dist/` hazırlamayı yapar; **hukuk sayfalarında doldurulmamış `{{...}}` varsa hiçbiri çalışmaz** (aşağıdaki bölüm).
- DNS Cloudflare'de (10 Kasım 2026'dan beri): `www` proxy'li (Worker rotası `www.vetapp.com.tr/*`); kök `vetapp.com.tr` proxy'li ve Cloudflare yönlendirme kuralıyla www'ye 301 (yol ve sorgu korunur). `panel`, `api`, `mail`, `ftp` DNS-only, sunucuda (46.62.248.74). E-posta: MX `smtp.google.com` (Google Workspace), SPF `include:_spf.google.com`, Resend kayıtları `send` / `resend._domainkey`.
- Ziyaretçi istatistikleri: Cloudflare Web Analytics (çerezsiz), `src/site.mjs` → `CF_BEACON`. Panel: Cloudflare → Analytics & Logs → Web Analytics → vetapp.com.tr.
- Geri dönüş: Cloudflare → Workers Routes → `www.vetapp.com.tr/*` rotası silinirse www istekleri yeniden sunucuya gider (eski dağıtım: `ssh vetapp-prod 'bash /root/vetapp_production/backend/scripts/deploy-server.sh web'`).
- SEO: her sayfada canonical, OG/Twitter, JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList); sitemap `build.mjs` ile üretilir.
- Blog yazısı ekleme: `content/blog/README.md`. SEO yol haritası ve deploy sonrası yapılacaklar: `docs/SEO-PLAN.md`.
- **Kampanya rakamlarını güncelleme** (birkaç günde bir): `src/site.mjs` → `CAMPAIGN` içinde `asOf` (tarih), `clinics`, `cities` değerlerini admin panelindeki güncel sayılarla değiştirin → `node build.mjs` → commit + push → deploy. Kalan yer (500 − klinik), duyuru çubuğu, ana sayfa bandı, kampanya sayfası (`/ucretsiz-veteriner-programi`), SSS, şema ve llms.txt kendiliğinden güncellenir. Kontenjan dolunca metinler "kontenjan doldu" olarak değişir.

## Hukuk metinleri ve yer tutucular (`src/legal.mjs`)

Gizlilik politikası (`/gizlilik`), kullanım şartları (`/kullanim-sartlari`) ve hesap silme (`/hesap-silme`) sayfaları: metinler `src/legal-pages.mjs`, **sahibin dolduracağı değerler ve koşul bayrakları tek yerde: `src/legal.mjs` (`LEGAL`)**. Kaynak belgeler backend deposunda `docs/hukuk/` (hazır şablon ve kod taramasıyla hazırlanmış TASLAK; hukuk tavsiyesi değildir, avukat görüşü gelince `surum` yükseltilir) ve `docs/HESAP-SILME.md`. Sürüm ve "Son güncelleme" tarihi de buradan gelir (`surum`, `guncellemeIso`; sitemap `lastmod` dahil).

**Yer tutucu güvenlik ağı.** `src/legal.mjs`'de değeri `'{{...}}'` olan alan çıktıya sızarsa `npm run build` ve `npm run deploy` HATA verip durur (`scripts/check-placeholders.mjs`: build'den önce kaynağı, build'den sonra çıktıyı tarar; `scripts/stage.mjs` de aynı denetimi yapar, `dist/` yer tutuculu hiçbir şey almaz). Yani yer tutucular dolana kadar **hiçbir yayın çıkmaz** (kampanya rakamı güncellemesi dahil); canlı site eski metinlerle sürer. Bu kasıtlıdır; baypas yoktur.

**Sahip değerlerini `src/legal.mjs`'ye yazınca:**
1. Kimlik alanlarını doldurun: `unvan`, `adres`, `vergiDairesi`, `vknVeyaTckn`, `kvkkBasvuruEposta` (tek adres), `yetkiliMahkeme`; KEP yoksa `kepAdresi: null`; `faturaNotu` için söylenecek bir şey yoksa `''`.
2. `yurtDisiGuvence`: `YURT_DISI_GUVENCE.B` (süreç sürüyor, şu anki gerçek durum) ya da `YURT_DISI_GUVENCE.A` (yalnız standart sözleşme gerçekten imzalanıp Kuruma bildirildiyse).
3. `kosul` bayraklarını gerçeğe göre `true` yapın (varsayılan: hepsi `false`, belgelerdeki 17-19 Kasım 2026 durumu): `r2` (sunucu dışı yedek çalışıyor; açınca `r2Konumu`), `sentry` (DSN bağlı; açınca `sentryBolgesi`), `kisiselHesapSilmeCanli`, `appleJetonIptali`, `kimlikHavuzuDuzeltmeCanli` (+ `kimlikEskiSatirlarTemizlendi`), `iletisimSilmeTaahhudu`, `etiketliYedekSilmeTaahhudu` (açınca `etiketliYedekSuresi`). Her bayrağın anlamı `src/legal.mjs` içinde yazılıdır; kapalı bayrağın paragrafı ya hiç basılmaz ya da bugünkü gerçeği anlatan metinle basılır. Her derlemede bayrak durumları listelenir.
4. Yayın gününde `guncellemeIso` tarihini güncelleyin.
5. `npm run build` (denetim geçmeli) → üretilen HTML'leri commit edin → main → `npm run deploy`.

**Taslak önizleme (`npm run build:draft`).** Yer tutuculu çıktıyı yalnız yerel gözden geçirme için üretir (`dist/` hazırlamaz; herhangi bir statik sunucuyla bakılır). `deploy` hiçbir zaman taslakla çalışmaz. `claude/pensive-ramanujan-xx0c6k` dalında commit'lenmiş `gizlilik.html`, `kullanim-sartlari.html` ve bununla birlikte yeniden üretilmiş diğer HTML'ler **TASLAK çıktıdır (içinde `{{...}}` var) ve main'e gitmemelidir**: main'e birleştirmeden önce `src/legal.mjs` doldurulup `node build.mjs` (taslaksız) yeniden çalıştırılmalı, çıktı commit'lenmelidir. Elle kontrol: `npm run check` (çıktıyı tarar), `node scripts/check-placeholders.mjs --source` (kaynağı tarar).

**Yayın sırası (hesap silme).** `/hesap-silme` sayfası backend'deki yeni hesap silme akışının (`docs/HESAP-SILME.md`: yönetici için klinik silme talebi, diğer roller için kişisel hesap silme, Apple jeton iptali) canlıda olduğunu varsayar. Sıra: **önce backend dağıtımı** (ve panel/mobilde "Hesabı sil"in yeni uçlara bağlanması), **sonra bu site**; aynı gün `kosul.kisiselHesapSilmeCanli` (Apple anahtarları sunucuda girildiyse `appleJetonIptali`) `true` yapılır. Google Play "hesap silme bağlantısı" adresi: `https://www.vetapp.com.tr/hesap-silme`. Yayından sonra mağaza formlarındaki (Play Data safety, App Store gizlilik) tarih ve bağlantıları güncelleyin.
