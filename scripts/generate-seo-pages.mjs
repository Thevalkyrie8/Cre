import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  buildStructuredData,
  DEFAULT_OG_IMAGE,
  getCanonicalUrl,
  SEO_LAST_MODIFIED,
  seoPages,
  SITE_NAME,
  SITE_URL,
} from '../src/seo/seoConfig.js';

const distDir = join(process.cwd(), 'dist');
const template = await readFile(join(distDir, 'index.html'), 'utf8');

const escapeHtml = (value = '') => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const buildSeoBlock = (path, page) => {
  const canonical = getCanonicalUrl(path);
  const schema = JSON.stringify(buildStructuredData(path)).replaceAll('<', '\\u003c');
  return `<!-- SEO:START -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
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

const buildStaticContent = (page) => {
  const bullets = page.bullets?.length
    ? `<ul>${page.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
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
    ['/contact/', 'Liên hệ tư vấn'],
  ];
  const navigation = `<nav aria-label="Dịch vụ và nội dung chính"><h2>Khám phá Unitrux</h2><ul>${primaryLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul></nav>`;
  return `<div id="root"><main class="seo-static-content"><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.summary)}</p>${bullets}${faqs}${navigation}</main></div>`;
};

for (const [path, page] of Object.entries(seoPages)) {
  const html = template
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, buildSeoBlock(path, page))
    .replace('<div id="root"></div>', buildStaticContent(page));

  const outputPath = path === '/'
    ? join(distDir, 'index.html')
    : join(distDir, path.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

const sitemapUrls = Object.keys(seoPages).map((path) => {
  const loc = getCanonicalUrl(path);
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SEO_LAST_MODIFIED}</lastmod>\n  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated ${Object.keys(seoPages).length} SEO pages and sitemap.xml for ${SITE_URL}`);
