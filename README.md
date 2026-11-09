# VetApp tanıtım sitesi (www.vetapp.com.tr)

Statik site: içerik `src/site.mjs` (ana sayfalar), `src/solutions.mjs` (anahtar kelime sayfaları), `content/blog/*.md` (blog), derleyici `build.mjs`. **Çıktı (HTML, sitemap, robots) repoya commit edilir**; sunucuda derleme gerekmez.

```bash
node build.mjs          # kökte *.html, blog/*.html, sitemap.xml, robots.txt, feed.xml, llms.txt, llms-full.txt üretir
node scripts/indexnow.mjs   # (deploy sonrası) sayfaları Bing/Yandex'e bildirir
node ../.../serve       # (yerel önizleme için herhangi bir statik sunucu; temiz URL için nginx kuralları deploy/nginx-vetapp.conf'ta)
```

- Tasarım: `assets/css/site.css` (Geist + Instrument Serif, kendi barındırılan yazı tipleri `assets/fonts/`).
- Görseller: `assets/img/` — ürün ekran görüntüleri WebP; logo/ikon seti marka paketinden (`VetApp-Logos`).
- İletişim/başvuru formları `POST https://api.vetapp.com.tr/api/public/contact` ucuna gider (tablo: `contact_messages`).
- Dağıtım (Cloudflare, Worker `vetapp-web`, yalnız statik varlıklar): `npm install && npm run deploy` (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` ortam değişkenleriyle ya da `npx wrangler login` sonrası). `npm run deploy` önce `node build.mjs`, sonra `scripts/stage.mjs` ile `dist/` hazırlar.
- DNS Cloudflare'de: `www` proxy'li (Worker rotası `www.vetapp.com.tr/*`); `@`, `panel`, `api`, `mail`, `ftp` DNS-only olarak sunucuda (46.62.248.74). Kök alan adı nginx'te www'ye 301 yönlenir.
- Geri dönüş: Cloudflare → Workers Routes → `www.vetapp.com.tr/*` rotası silinirse www istekleri yeniden sunucuya gider (eski dağıtım: `ssh vetapp-prod 'bash /root/vetapp_production/backend/scripts/deploy-server.sh web'`).
- SEO: her sayfada canonical, OG/Twitter, JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList); sitemap `build.mjs` ile üretilir.
- Blog yazısı ekleme: `content/blog/README.md`. SEO yol haritası ve deploy sonrası yapılacaklar: `docs/SEO-PLAN.md`.
- **Kampanya rakamlarını güncelleme** (birkaç günde bir): `src/site.mjs` → `CAMPAIGN` içinde `asOf` (tarih), `clinics`, `cities` değerlerini admin panelindeki güncel sayılarla değiştirin → `node build.mjs` → commit + push → deploy. Kalan yer (500 − klinik), duyuru çubuğu, ana sayfa bandı, kampanya sayfası (`/ucretsiz-veteriner-programi`), SSS, şema ve llms.txt kendiliğinden güncellenir. Kontenjan dolunca metinler "kontenjan doldu" olarak değişir.
