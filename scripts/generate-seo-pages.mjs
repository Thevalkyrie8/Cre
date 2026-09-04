import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  buildArticleStructuredData,
  buildCmsServiceStructuredData,
  buildStructuredData,
  DEFAULT_OG_IMAGE,
  getCanonicalUrl,
  legacyRedirects,
  SEO_LAST_MODIFIED,
  seoPages,
  SITE_NAME,
  SITE_URL,
} from '../src/seo/seoConfig.js';
import {
  buildRobotsContent,
  fetchNewsSeoMap,
  fetchRouteSeoMap,
  fetchServiceSeoMap,
  mergeStructuredData,
  resolveRemoteSeo,
} from '../src/seo/seoRemote.js';
import { productionPortfolio } from '../src/data/productionPortfolio.js';
import { toAbsoluteUrl } from '../src/seo/schemaFactory.js';
import { getNewsSlug } from '../src/utils/newsSlug.js';
import { articleMarkdownComponents } from '../src/utils/markdownComponents.js';
import { buildToc, dedupeHeadings, injectHeadingIds, shouldShowToc } from '../src/utils/articleToc.js';
import { buildPageTitle, truncateAtWordBoundary } from '../src/utils/text.js';

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

const normalizeTags = (value) => {
  const tags = Array.isArray(value) ? value : String(value || '').split(',');
  return [...new Set(tags
    .map((tag) => String(tag).normalize('NFC').trim().replace(/^#+/, ''))
    .filter(Boolean))];
};

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

const unwrapServices = (payload) => {
  const candidates = [
    payload,
    payload?.data,
    payload?.items,
    payload?.services,
    payload?.results,
    payload?.data?.items,
    payload?.data?.services,
  ];
  return candidates.find(Array.isArray) || [];
};

const loadServices = async () => {
  try {
    const response = await fetch(process.env.SERVICES_API_URL || 'https://be.unitrux.site/api/services', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return unwrapServices(await response.json())
      .filter((service) => service?.id && service.isActive !== false);
  } catch (error) {
    console.warn(`Services API unavailable; no CMS service pages will be prerendered: ${error.message}`);
    return [];
  }
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
      const excerpt = truncateAtWordBoundary(stripMarkdown(item.excerptVi || item.excerpt || content), 160);
      const author = typeof item.author === 'object' ? item.author?.name : item.author;
      return {
        ...item,
        slug: getNewsSlug(item),
        title,
        content,
        excerpt,
        author: author || `${SITE_NAME} Team`,
        category: item.category || 'Kiến thức Digital',
        tags: normalizeTags(item.tags),
        image: resolveAssetUrl(item.image),
      };
    }).filter((item) => item.slug && item.title && item.content);
  } catch (error) {
    console.warn(`News API unavailable; no news pages will be prerendered: ${error.message}`);
    return [];
  }
};

// SEO metadata rows for news, keyed by entityRef (article id). Used only to
// read the per-article `tocEnabled` toggle; falls back to a heading-count
// heuristic when the API (or the backend migration) is not available yet.
const loadNewsSeo = async () => {
  try {
    const response = await fetch(process.env.SEO_METADATA_API_URL || 'https://be.unitrux.site/api/seo/metadata?entityType=news', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : payload?.data || [];
    const byRef = new Map();
    for (const row of rows) {
      const current = byRef.get(row.entityRef);
      // Prefer a concrete `vi` row over the `*` fallback.
      if (!current || (current.locale === '*' && row.locale === 'vi')) byRef.set(row.entityRef, row);
    }
    return byRef;
  } catch (error) {
    console.warn(`SEO metadata API unavailable; TOC falls back to heading count: ${error.message}`);
    return new Map();
  }
};

const newsArticles = await loadNewsArticles();
const cmsServices = await loadServices();
const newsSeoByRef = await loadNewsSeo();

// Admin-managed SEO overrides (backend table `seo_metadata`). Empty maps on failure.
const [routeSeoMap, newsSeoMap, serviceSeoMap] = await Promise.all([
  fetchRouteSeoMap(),
  fetchNewsSeoMap(),
  fetchServiceSeoMap(),
]);

const applyMeta = (block, override) => {
  if (!override) return block;
  let next = block;
  if (override.seoTitle) {
    next = next.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(override.seoTitle)}</title>`);
  }
  if (override.metaDescription) {
    const desc = escapeHtml(override.metaDescription);
    next = next
      .replace(/<meta name="description" content="[\s\S]*?" \/>/, `<meta name="description" content="${desc}" />`)
      .replace(/<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${desc}" />`)
      .replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/, `<meta name="twitter:description" content="${desc}" />`);
  }
  if (override.ogTitle) {
    const t = escapeHtml(override.ogTitle);
    next = next
      .replace(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${t}" />`)
      .replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${t}" />`);
  }
  if (override.ogImage) {
    const img = escapeHtml(override.ogImage);
    next = next
      .replace(/<meta property="og:image" content="[\s\S]*?" \/>/, `<meta property="og:image" content="${img}" />`)
      .replace(/<meta name="twitter:image" content="[\s\S]*?" \/>/, `<meta name="twitter:image" content="${img}" />`);
  }
  if (override.canonicalUrl) {
    const c = escapeHtml(override.canonicalUrl);
    next = next
      .replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${c}" />`)
      .replace(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${c}" />`);
  }
  if (override.robotsIndex === false || override.robotsFollow === false) {
    next = next.replace(
      /<meta name="robots" content="[\s\S]*?" \/>/,
      `<meta name="robots" content="${buildRobotsContent(override.robotsIndex, override.robotsFollow)}" />`,
    );
  }
  return next;
};

const buildSeoBlock = (path, page) => {
  const canonical = getCanonicalUrl(path);
  const socialImage = page.ogImage || DEFAULT_OG_IMAGE;
  const override = resolveRemoteSeo(routeSeoMap, path, 'vi');
  const structuredData = mergeStructuredData(buildStructuredData(path), override?.schemaJson);
  // The /news list is fetched client-side, so buildStructuredData() (a pure
  // config-time function) has no article data to work with. This script
  // already fetched newsArticles for the per-article static pages below, so
  // splice an ItemList in here — the one place both are in scope.
  if (path === '/news' && newsArticles.length && Array.isArray(structuredData['@graph'])) {
    structuredData['@graph'].push({
      '@type': 'ItemList',
      '@id': `${canonical}#itemlist`,
      itemListElement: newsArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/news/${encodeURIComponent(article.slug)}/`,
        name: article.title,
      })),
    });
  }
  const schema = JSON.stringify(structuredData).replaceAll('<', '\\u003c');
  return applyMeta(`<!-- SEO:START -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${escapeHtml(socialImage)}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(socialImage)}" />
    <script id="seo-static-schema" type="application/ld+json">${schema}</script>
    <style>#root>.seo-static-content{max-width:960px;margin:0 auto;padding:140px 24px 80px;font-family:Arial,sans-serif;line-height:1.7}#root>.seo-static-content h1{font-size:clamp(2rem,6vw,4.5rem);line-height:1.05}#root>.seo-static-content p,#root>.seo-static-content li{font-size:1.05rem}</style>
    <!-- SEO:END -->`, override);
};

const buildArticleSeoBlock = (article) => {
  const path = `/news/${article.slug}`;
  const canonical = getCanonicalUrl(path);
  const datePublished = toIsoDate(article.createdAt);
  const dateModified = toIsoDate(article.updatedAt || article.createdAt);
  const override = resolveRemoteSeo(newsSeoMap, article.id, 'vi');
  const schema = JSON.stringify(mergeStructuredData(buildArticleStructuredData({
    path,
    title: article.title,
    description: article.excerpt,
    image: article.image,
    author: article.author,
    articleSection: article.category,
    keywords: article.tags,
    content: article.content,
    datePublished,
    dateModified,
  }), override?.schemaJson)).replaceAll('<', '\\u003c');
  const dates = `${datePublished ? `<meta property="article:published_time" content="${datePublished}" />` : ''}${dateModified ? `<meta property="article:modified_time" content="${dateModified}" />` : ''}`;
  return applyMeta(`<!-- SEO:START -->
    <title>${escapeHtml(buildPageTitle(article.title, SITE_NAME))}</title>
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
    <!-- SEO:END -->`, override);
};

const buildCmsServiceSeoBlock = (service) => {
  const path = `/services/${service.id}`;
  const canonical = getCanonicalUrl(path);
  const name = service.nameVi || service.name;
  const description = service.descriptionVi || service.description || '';
  const override = resolveRemoteSeo(serviceSeoMap, String(service.id), 'vi');
  const schema = JSON.stringify(mergeStructuredData(buildCmsServiceStructuredData({
    service,
    pathname: path,
    language: 'vi',
  }), override?.schemaJson)).replaceAll('<', '\\u003c');

  return applyMeta(`<!-- SEO:START -->
    <title>${escapeHtml(name)} | ${SITE_NAME}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(name)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="vi_VN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(name)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />
    <script id="seo-static-schema" type="application/ld+json">${schema}</script>
    <style>#root>.seo-static-content{max-width:960px;margin:0 auto;padding:140px 24px 80px;font-family:Arial,sans-serif;line-height:1.7}#root>.seo-static-content h1{font-size:clamp(2rem,6vw,4.5rem);line-height:1.05}#root>.seo-static-content p,#root>.seo-static-content li{font-size:1.05rem}</style>
    <!-- SEO:END -->`, override);
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
  const portfolioVideos = path === productionPortfolio.path
    ? `<section><h2>Portfolio video quảng cáo</h2>${productionPortfolio.items.map((video) => `<figure><video controls muted playsinline preload="metadata" poster="${escapeHtml(video.thumbnail)}" width="${video.width}" height="${video.height}" aria-label="${escapeHtml(video.titleVi || video.title)}"><source src="${escapeHtml(video.src)}" type="${escapeHtml(video.mimeType)}" /></video><figcaption><strong>${escapeHtml(video.titleVi || video.title)}</strong><p>${escapeHtml(video.descriptionVi || video.description)}</p></figcaption></figure>`).join('')}</section>`
    : '';
  return `<div id="root"><main class="seo-static-content"><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.summary)}</p>${bullets}${facts}${faqs}${portfolioVideos}${newsLinks}${navigation}</main></div>`;
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

for (const [from, to] of Object.entries(legacyRedirects)) {
  const target = getCanonicalUrl(to);
  const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Đã chuyển trang | ${SITE_NAME}</title>
  <link rel="canonical" href="${target}" />
  <meta http-equiv="refresh" content="0;url=${target}" />
</head>
<body>
  <p>Trang này đã chuyển sang <a href="${target}">${target}</a></p>
</body>
</html>
`;
  const outputPath = join(distDir, from.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

for (const article of newsArticles) {
  const markdown = injectHeadingIds(
    renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm], components: articleMarkdownComponents }, article.content)),
  );
  const published = article.createdAt ? `<time datetime="${escapeHtml(article.createdAt)}">${escapeHtml(new Date(article.createdAt).toLocaleDateString('vi-VN'))}</time>` : '';
  const tags = article.tags.length
    ? `<ul aria-label="Chủ đề bài viết">${article.tags.map((tag) => `<li>#${escapeHtml(tag)}</li>`).join('')}</ul>`
    : '';
  const toc = dedupeHeadings(buildToc(article.content));
  const seoRow = newsSeoByRef.get(article.id);
  const tocEnabled = seoRow && typeof seoRow.tocEnabled === 'boolean' ? seoRow.tocEnabled : null;
  const tocNav = shouldShowToc(tocEnabled, toc) && toc.length
    ? `<nav aria-label="Mục lục"><h2>Mục lục</h2><ol>${toc.map((item) => `<li><a href="#${item.slug}">${escapeHtml(item.text)}</a></li>`).join('')}</ol></nav>`
    : '';
  const content = `<div id="root"><main class="seo-static-content"><article><header><p>${escapeHtml(article.category)}</p><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.excerpt)}</p><p>Tác giả: <a href="/content-standards/">${escapeHtml(article.author)}</a>${published ? ` · ${published}` : ''}</p>${tags}</header><img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" width="1600" height="900" />${tocNav}<div>${markdown}</div></article><p><a href="/news/">Xem tất cả bài viết</a></p></main></div>`;
  const html = template
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, buildArticleSeoBlock(article))
    .replace('<div id="root"></div>', content);
  const outputPath = join(distDir, 'news', article.slug, 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

for (const service of cmsServices) {
  const path = `/services/${service.id}`;
  const name = service.nameVi || service.name;
  const description = service.descriptionVi || service.description || '';
  const features = service.featuresVi || service.features || [];
  const featureList = Array.isArray(features) && features.length
    ? `<section><h2>Hạng mục triển khai</h2><ul>${features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}</ul></section>`
    : '';
  const content = `<div id="root"><main class="seo-static-content"><article><h1>${escapeHtml(name)}</h1><p>${escapeHtml(description)}</p>${featureList}</article><p><a href="/services/">Xem tất cả dịch vụ</a></p></main></div>`;
  const html = template
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, buildCmsServiceSeoBlock(service))
    .replace('<div id="root"></div>', content);
  const outputPath = join(distDir, 'services', String(service.id), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

const buildVideoSitemapMarkup = (path) => {
  if (path !== productionPortfolio.path) return '';
  return productionPortfolio.items.map((video) => `\n    <video:video>
      <video:thumbnail_loc>${escapeHtml(toAbsoluteUrl(video.thumbnail, SITE_URL))}</video:thumbnail_loc>
      <video:title>${escapeHtml(video.titleVi || video.title)}</video:title>
      <video:description>${escapeHtml(video.descriptionVi || video.description)}</video:description>
      <video:content_loc>${escapeHtml(toAbsoluteUrl(video.src, SITE_URL))}</video:content_loc>
      <video:duration>${Math.round(video.durationSeconds)}</video:duration>
      <video:publication_date>${escapeHtml(video.uploadDate)}</video:publication_date>
    </video:video>`).join('');
};

// A route/entity flagged noindex in the Admin must not appear in the sitemap.
const isRemoteNoindex = (map, ref) => resolveRemoteSeo(map, ref, 'vi')?.robotsIndex === false;

const staticSitemapUrls = Object.keys(seoPages)
  .filter((path) => !isRemoteNoindex(routeSeoMap, path))
  .map((path) => {
    const loc = getCanonicalUrl(path);
    const videos = buildVideoSitemapMarkup(path);
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SEO_LAST_MODIFIED}</lastmod>${videos}\n  </url>`;
  });
const articleSitemapUrls = newsArticles
  .filter((article) => !isRemoteNoindex(newsSeoMap, article.id))
  .map((article) => {
    const lastModified = article.updatedAt || article.createdAt;
    const lastmod = lastModified && !Number.isNaN(new Date(lastModified).getTime())
      ? new Date(lastModified).toISOString().slice(0, 10)
      : SEO_LAST_MODIFIED;
    return `  <url>\n    <loc>${getCanonicalUrl(`/news/${article.slug}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  });
const serviceSitemapUrls = cmsServices
  .filter((service) => !isRemoteNoindex(serviceSeoMap, String(service.id)))
  .map((service) => {
    const lastModified = service.updatedAt || service.createdAt;
    const lastmod = lastModified && !Number.isNaN(new Date(lastModified).getTime())
      ? new Date(lastModified).toISOString().slice(0, 10)
      : SEO_LAST_MODIFIED;
    return `  <url>\n    <loc>${getCanonicalUrl(`/services/${service.id}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  });
const sitemapUrls = [...staticSitemapUrls, ...articleSitemapUrls, ...serviceSitemapUrls].join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${sitemapUrls}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated ${Object.keys(seoPages).length} static pages, ${cmsServices.length} CMS service pages, ${newsArticles.length} news pages, and sitemap.xml for ${SITE_URL}`);
