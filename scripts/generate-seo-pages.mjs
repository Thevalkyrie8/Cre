import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  buildArticleStructuredData,
  buildStructuredData,
  DEFAULT_OG_IMAGE,
  getCanonicalUrl,
  SEO_LAST_MODIFIED,
  seoPages,
  SITE_NAME,
  SITE_URL,
} from '../src/seo/seoConfig.js';
import { getNewsSlug } from '../src/utils/newsSlug.js';

const distDir = join(process.cwd(), 'dist');
const template = await readFile(join(distDir, 'index.html'), 'utf8');

const escapeHtml = (value = '') => value
  .toString()
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const stripMarkdown = (value = '') => String(value)
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/[#*_>`~[\]()]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const toIsoDate = (value) => {
  const date = new Date(value || '');
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
};

const resolveAssetUrl = (value) => {
  const url = String(value || '').trim();
  if (!url) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/uploads/') || url.startsWith('/api/')) return `https://be.unitrux.site${url}`;
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(url)) {
    return `https://be.unitrux.site/api/media/file/${url}`;
  }
  return url.startsWith('/') ? `${SITE_URL}${url}` : `${SITE_URL}/${url}`;
};

const unwrapNews = (payload) => {
  const candidates = [payload, payload?.data, payload?.items, payload?.news, payload?.results, payload?.data?.items, payload?.data?.news];
  return candidates.find(Array.isArray) || [];
};

const loadNewsArticles = async () => {
  try {
    const response = await fetch(process.env.NEWS_API_URL || 'https://be.unitrux.site/api/news?lang=vi', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const items = unwrapNews(await response.json());
    return items.map((item) => {
      const title = item.titleVi || item.title || '';
      const content = item.contentVi || item.content || '';
      const excerpt = stripMarkdown(item.excerptVi || item.excerpt || content).slice(0, 180);
      const author = typeof item.author === 'object' ? item.author?.name : item.author;
      return {
        ...item,
        slug: getNewsSlug(item),
        title,
        content,
        excerpt,
        author: author || `${SITE_NAME} Team`,
        category: item.category || 'Kiến thức Digital',
        image: resolveAssetUrl(item.image),
      };
    }).filter((item) => item.slug && item.title && item.content);
  } catch (error) {
    console.warn(`News API unavailable; no news pages will be prerendered: ${error.message}`);
    return [];
  }
};

const newsArticles = await loadNewsArticles();

const buildSeoBlock = (path, page) => {
  const canonical = getCanonicalUrl(path);
  const schema = JSON.stringify(buildStructuredData(path)).replaceAll('<', '\\u003c');
  return `<!-- SEO:START -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />
    <script id="seo-static-schema" type="application/ld+json">${schema}</script>
    <style>#root>.seo-static-content{max-width:960px;margin:0 auto;padding:140px 24px 80px;font-family:Arial,sans-serif;line-height:1.7}#root>.seo-static-content h1{font-size:clamp(2rem,6vw,4.5rem);line-height:1.05}#root>.seo-static-content p,#root>.seo-static-content li{font-size:1.05rem}</style>
    <!-- SEO:END -->`;
};

const buildArticleSeoBlock = (article) => {
  const path = `/news/${article.slug}`;
  const canonical = getCanonicalUrl(path);
  const datePublished = toIsoDate(article.createdAt);
  const dateModified = toIsoDate(article.updatedAt || article.createdAt);
  const schema = JSON.stringify(buildArticleStructuredData({
    path,
    title: article.title,
    description: article.excerpt,
    image: article.image,
    author: article.author,
    articleSection: article.category,
    datePublished,
    dateModified,
  })).replaceAll('<', '\\u003c');
  const dates = `${datePublished ? `<meta property="article:published_time" content="${datePublished}" />` : ''}${dateModified ? `<meta property="article:modified_time" content="${dateModified}" />` : ''}`;
  return `<!-- SEO:START -->
    <title>${escapeHtml(article.title)} | ${SITE_NAME}</title>
    <meta name="description" content="${escapeHtml(article.excerpt)}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(article.title)}" />
    <meta property="og:description" content="${escapeHtml(article.excerpt)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${escapeHtml(article.image)}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="vi_VN" />
    ${dates}
    <meta property="article:author" content="${escapeHtml(article.author)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(article.title)}" />
    <meta name="twitter:description" content="${escapeHtml(article.excerpt)}" />
    <meta name="twitter:image" content="${escapeHtml(article.image)}" />
    <script id="seo-static-schema" type="application/ld+json">${schema}</script>
    <style>#root>.seo-static-content{max-width:960px;margin:0 auto;padding:140px 24px 80px;font-family:Arial,sans-serif;line-height:1.7}#root>.seo-static-content h1{font-size:clamp(2rem,6vw,4.5rem);line-height:1.05}#root>.seo-static-content img{width:100%;height:auto}#root>.seo-static-content p,#root>.seo-static-content li{font-size:1.05rem}</style>
    <!-- SEO:END -->`;
};

const buildStaticContent = (page, path) => {
  const bullets = page.bullets?.length
    ? `<ul>${page.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '';
  const facts = page.facts?.length
    ? `<section><h2>Thông tin dịch vụ</h2><dl>${page.facts.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`).join('')}</dl></section>`
    : '';
  const faqs = page.faqs?.length
    ? `<section><h2>Câu hỏi thường gặp</h2>${page.faqs.map(({ question, answer }) => `<article><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></article>`).join('')}</section>`
    : '';
  const primaryLinks = [
    ['/', 'Trang chủ'],
    ['/services/', 'Dịch vụ Digital'],
    ['/chatbox-ai/', 'Chatbot AI cho Fanpage, Zalo OA và website'],
    ['/web-development/', 'Thiết kế website chuẩn SEO'],
    ['/digital-marketing/', 'Digital Marketing'],
    ['/ecommerce/', 'Giải pháp E-commerce'],
    ['/automation/', 'Tự động hóa doanh nghiệp'],
    ['/news/', 'Kiến thức Digital'],
    ['/content-standards/', 'Tiêu chuẩn nội dung'],
    ['/contact/', 'Liên hệ tư vấn'],
  ];
  const navigation = `<nav aria-label="Dịch vụ và nội dung chính"><h2>Khám phá Unitrux</h2><ul>${primaryLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul></nav>`;
  const newsLinks = path === '/news' && newsArticles.length
    ? `<section><h2>Bài viết mới</h2><ul>${newsArticles.map((article) => `<li><a href="/news/${encodeURIComponent(article.slug)}/">${escapeHtml(article.title)}</a></li>`).join('')}</ul></section>`
    : '';
  return `<div id="root"><main class="seo-static-content"><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.summary)}</p>${bullets}${facts}${faqs}${newsLinks}${navigation}</main></div>`;
};

for (const [path, page] of Object.entries(seoPages)) {
  const html = template
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, buildSeoBlock(path, page))
    .replace('<div id="root"></div>', buildStaticContent(page, path));

  const outputPath = path === '/'
    ? join(distDir, 'index.html')
    : join(distDir, path.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

for (const article of newsArticles) {
  const markdown = renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, article.content));
  const published = article.createdAt ? `<time datetime="${escapeHtml(article.createdAt)}">${escapeHtml(new Date(article.createdAt).toLocaleDateString('vi-VN'))}</time>` : '';
  const content = `<div id="root"><main class="seo-static-content"><article><header><p>${escapeHtml(article.category)}</p><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.excerpt)}</p><p>Tác giả: <a href="/content-standards/">${escapeHtml(article.author)}</a>${published ? ` · ${published}` : ''}</p></header><img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" width="1600" height="900" /><div>${markdown}</div></article><p><a href="/news/">Xem tất cả bài viết</a></p></main></div>`;
  const html = template
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, buildArticleSeoBlock(article))
    .replace('<div id="root"></div>', content);
  const outputPath = join(distDir, 'news', article.slug, 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

const staticSitemapUrls = Object.keys(seoPages).map((path) => {
  const loc = getCanonicalUrl(path);
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SEO_LAST_MODIFIED}</lastmod>\n  </url>`;
});
const articleSitemapUrls = newsArticles.map((article) => {
  const lastModified = article.updatedAt || article.createdAt;
  const lastmod = lastModified && !Number.isNaN(new Date(lastModified).getTime())
    ? new Date(lastModified).toISOString().slice(0, 10)
    : SEO_LAST_MODIFIED;
  return `  <url>\n    <loc>${getCanonicalUrl(`/news/${article.slug}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
});
const sitemapUrls = [...staticSitemapUrls, ...articleSitemapUrls].join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated ${Object.keys(seoPages).length} static pages, ${newsArticles.length} news pages, and sitemap.xml for ${SITE_URL}`);
