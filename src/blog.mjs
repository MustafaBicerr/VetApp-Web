// Blog: /blog (liste), /blog/<slug> (yazı), /feed.xml (RSS). Yazılar content/blog/*.md içinde.
import { SITE, URLS, SOLUTIONS, esc, icon, arrow, crumbLd, pageHero, finalCta, postCard } from './site.mjs';
import { loadPosts, trDate } from './markdown.mjs';

const ORG = { '@id': SITE + '/#organization' };

export function blogPages() {
  const posts = loadPosts();
  const index = {
    file: 'blog.html', path: '/blog', changefreq: 'weekly', priority: '0.8',
    lastmod: posts[0]?.updated,
    title: 'Blog – Veteriner Klinik Yönetimi Rehberleri | VetApp',
    description: 'Veteriner klinikleri için pratik rehberler: ilaç stok takibi, veresiye ve cari yönetimi, aşı takibi, klinik açılışı ve veteriner programı seçimi.',
    ld: [
      crumbLd('Blog', '/blog'),
      { '@context': 'https://schema.org', '@type': 'Blog', '@id': SITE + '/blog#blog', name: 'VetApp Blog', url: SITE + '/blog', inLanguage: 'tr-TR', publisher: ORG,
        blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: p.date, dateModified: p.updated })) },
    ],
    body: () => `${pageHero('Blog', 'Veteriner klinik yönetimi <span class="soft">üzerine rehberler.</span>', 'Stok, veresiye, aşı takibi ve klinik düzeni hakkında sahadan, pratik yazılar.')}
    <section class="sec light">
      <div class="container">
        ${posts.length ? `<div class="post-grid">${posts.map((p, i) => postCard(p, ` reveal${i % 3 ? ` d${i % 3}` : ''}`)).join('')}</div>` : '<p>Yakında burada ilk yazımız olacak.</p>'}
      </div>
    </section>
${finalCta()}`,
  };

  const articles = posts.map((p) => {
    const url = `${SITE}/blog/${p.slug}`;
    const others = posts.filter((x) => x.slug !== p.slug);
    const more = [...others.filter((x) => x.related.some((r) => p.related.includes(r))), ...others].filter((x, i, a) => a.indexOf(x) === i).slice(0, 3);
    const sol = SOLUTIONS.filter((s) => p.related.includes(s.path));
    return {
      file: `blog/${p.slug}.html`, path: `/blog/${p.slug}`, changefreq: 'monthly', priority: '0.7', lastmod: p.updated,
      title: p.seoTitle || `${p.title} | VetApp Blog`, ogTitle: p.title, description: p.description, ogType: 'article', author: p.author || 'VetApp Ekibi',
      head: `<meta property="article:published_time" content="${p.date}">
  <meta property="article:modified_time" content="${p.updated}">${p.category ? `\n  <meta property="article:section" content="${esc(p.category)}">` : ''}${p.keywords.map((k) => `\n  <meta property="article:tag" content="${esc(k)}">`).join('')}`,
      ld: [
        crumbLd([['Blog', '/blog'], [p.title, `/blog/${p.slug}`]]),
        { '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': url + '#article', mainEntityOfPage: url, url, headline: p.title, description: p.description,
          datePublished: p.date, dateModified: p.updated, inLanguage: 'tr-TR', wordCount: p.words, keywords: p.keywords.join(', '),
          articleSection: p.category || undefined, image: SITE + '/assets/img/og-image.png',
          author: p.author ? { '@type': 'Person', name: p.author } : { '@type': 'Organization', name: 'VetApp Ekibi', url: SITE + '/' },
          publisher: { '@type': 'Organization', '@id': SITE + '/#organization', name: 'VetApp', logo: { '@type': 'ImageObject', url: SITE + '/assets/img/logo.png' } },
          about: { '@id': SITE + '/#software' } },
      ],
      body: () => `${pageHero([['Blog', '/blog'], p.category || 'Yazı'], esc(p.title), esc(p.description), `
        <p class="post-meta">${p.author ? `${esc(p.author)} · ` : ''}<time datetime="${p.date}">${trDate(p.date)}</time>${p.updated !== p.date ? ` · Güncellendi: <time datetime="${p.updated}">${trDate(p.updated)}</time>` : ''} · ${p.minutes} dk okuma</p>`)}
    <section class="sec white">
      <div class="container article-wrap">
        ${p.toc.length > 2 ? `<nav class="toc" aria-label="İçindekiler"><b>İçindekiler</b><ol>${p.toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ol></nav>` : ''}
        <article class="prose article">
${p.html}
          <aside class="post-cta">
            <b>Bu işleri VetApp’le yapmayı deneyin.</b>
            <p>Veteriner klinikleri için stok, cari, aşı, randevu, satış ve kasa tek programda. 30 gün ücretsiz, kredi kartı gerekmez.</p>
            <div class="actions"><a class="btn btn--primary" href="${URLS.register}">Ücretsiz başla ${arrow}</a><a class="btn btn--ghost-d" href="${URLS.demo}">${icon('play')} Demoyu aç</a></div>
          </aside>
          ${sol.length ? `<p class="post-sol">İlgili: ${sol.map((s) => `<a href="${s.path}">${s.label}</a>`).join(' · ')}</p>` : ''}
        </article>
      </div>
    </section>${more.length ? `
    <section class="sec light alt">
      <div class="container">
        <div class="sec-head"><span class="tag">Okumaya devam edin</span><h2>Diğer yazılar.</h2></div>
        <div class="post-grid">${more.map((x) => postCard(x)).join('')}</div>
      </div>
    </section>` : ''}
${finalCta()}`,
    };
  });
  return { posts, pages: [index, ...articles] };
}

const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function rss(posts) {
  const items = posts.slice(0, 30).map((p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date + 'T09:00:00+03:00').toUTCString()}</pubDate>
      <description>${xml(p.description)}</description>${p.category ? `\n      <category>${xml(p.category)}</category>` : ''}
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>VetApp Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Veteriner klinik yönetimi üzerine pratik rehberler.</description>
    <language>tr-TR</language>
    ${posts[0] ? `<lastBuildDate>${new Date(posts[0].updated + 'T09:00:00+03:00').toUTCString()}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>
`;
}
