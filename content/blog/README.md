# Blog yazısı nasıl eklenir?

1. Bu klasöre `kucuk-harf-tireli-baslik.md` adıyla bir dosya açın. **Dosya adı = adres:** `veteriner-asi-takvimi.md` → `www.vetapp.com.tr/blog/veteriner-asi-takvimi`
2. En üste ön bilgiyi (frontmatter) yazın, altına yazıyı Markdown ile yazın.
3. `node build.mjs` çalıştırın → `git add -A && git commit -m "Blog: ..." && git push` → deploy.
4. Canlıya çıktıktan sonra: `node scripts/indexnow.mjs /blog/veteriner-asi-takvimi` (Bing/Yandex'e anında bildirir) ve Google Search Console → URL denetimi → "Dizine eklenmeyi iste".

Ana sayfadaki "Blog" bölümü, /blog listesi, ilgili çözüm sayfalarındaki "Konuyla ilgili yazılar", sitemap.xml, feed.xml (RSS) ve llms.txt **otomatik** güncellenir.

## Ön bilgi şablonu

```
---
title: Veteriner Kliniğinde Aşı Takibi Nasıl Yapılır?
seoTitle: Veteriner Kliniğinde Aşı Takibi Nasıl Yapılır? | VetApp
description: 150–160 karakterlik özet. Arama sonucunda görünen metin budur; ana anahtar kelimeyi başa yakın yazın.
date: 2026-11-12
updated: 2026-12-01
category: Aşı takibi
keywords: [veteriner aşı takibi, aşı takip programı, kedi aşı takvimi]
related: [/veteriner-asi-takip-programi, /veteriner-programi]
author: Mustafa Biçer
---
```

| Alan | Zorunlu | Açıklama |
| --- | --- | --- |
| `title` | Evet | Sayfadaki H1 başlık |
| `seoTitle` | Hayır | Google'da görünen başlık (≤ 60 karakter). Yoksa `title | VetApp Blog` |
| `description` | Evet | Arama sonucu açıklaması (≤ 160 karakter) |
| `date` | Evet | Yayın tarihi `YYYY-AA-GG`. **Gelecek tarihli yazı o güne kadar yayınlanmaz** → yazıları önceden hazırlayıp tarih verebilirsiniz (o gün `node build.mjs` + push gerekir) |
| `updated` | Hayır | Yazıyı güncellediğinizde tarihini yazın (Google tazeliği sever) |
| `category` | Hayır | Kısa kategori adı |
| `keywords` | Hayır | Hedef anahtar kelimeler |
| `related` | Hayır | İlgili çözüm sayfaları. Yazı o sayfalarda "Konuyla ilgili yazılar" altında listelenir |
| `author` | Hayır | Yazar adı. Gerçek bir hekim/uzman adı Google'ın E-E-A-T değerlendirmesinde artı puandır |
| `draft` | Hayır | `draft: true` → yayınlanmaz |

Dosya adı `_` ile başlarsa (`_taslak.md`) derlemeye hiç girmez.

## Desteklenen Markdown

```
## Ana başlık (H2 — içindekiler tablosuna girer)
### Alt başlık (H3)

Paragraf. **kalın**, *italik*, `kod`, [iç bağlantı](/veteriner-stok-takip-programi), [dış bağlantı](https://ornek.com)

- madde
- madde

1. numaralı
2. numaralı

- [x] tamamlanmış kontrol maddesi
- [ ] boş kontrol maddesi

> **İpucu:** Mavi bilgi kutusu.

| Sütun | Sütun |
| --- | --- |
| hücre | hücre |

---  (yatay çizgi)
```

H1 kullanmayın (`#`): başlık zaten `title`'dan gelir.

## İyi bir SEO yazısının kontrol listesi

- [ ] Tek bir ana anahtar kelime seçildi (ör. "veteriner aşı takibi"); `title`, `description`, ilk paragraf ve en az bir `##` başlıkta geçiyor
- [ ] İlk paragraf soruyu **doğrudan** cevaplıyor (Google'ın öne çıkan snippet'i ve yapay zekâ asistanları ilk cevabı alıntılar)
- [ ] En az 800 kelime, gerçek bilgi, kendi deneyiminiz/sahadan örnek
- [ ] En az 2 iç bağlantı: bir çözüm sayfasına + başka bir blog yazısına
- [ ] Bir tablo ya da adım adım liste (yapay zekâ asistanları yapılandırılmış içeriği daha çok alıntılar)
- [ ] Uydurma istatistik/rakam yok; kaynak verilebilecek bilgi ya da kendi verinizi kullanın
- [ ] Sonda VetApp'e doğal bir yönlendirme (zorlama değil)
