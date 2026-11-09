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
- Dağıtım: `git push` → `ssh vetapp-prod 'bash /root/vetapp_production/backend/scripts/deploy-server.sh web'`.
- SEO: her sayfada canonical, OG/Twitter, JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList); sitemap `build.mjs` ile üretilir.
- Blog yazısı ekleme: `content/blog/README.md`. SEO yol haritası ve deploy sonrası yapılacaklar: `docs/SEO-PLAN.md`.
