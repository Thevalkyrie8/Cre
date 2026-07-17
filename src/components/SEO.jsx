import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildArticleStructuredData, buildStructuredData, DEFAULT_OG_IMAGE, getCanonicalUrl, getSeoForPath, SITE_NAME } from '../seo/seoConfig';

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
};

const updateSchema = (data) => {
  let schema = document.head.querySelector('#seo-static-schema');
  if (!schema) {
    schema = document.createElement('script');
    schema.id = 'seo-static-schema';
    schema.type = 'application/ld+json';
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify(data);
};

const SEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getSeoForPath(pathname);
    const canonical = getCanonicalUrl(pathname);
    document.title = page.title;

    ensureMeta('meta[name="description"]', { name: 'description', content: page.description });
    ensureMeta('meta[name="robots"]', {
      name: 'robots',
      content: page.noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_OG_IMAGE });
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    ensureMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'vi_VN' });
    ensureMeta('meta[property="og:locale:alternate"]', { property: 'og:locale:alternate', content: 'en_US' });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_OG_IMAGE });

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    document.head.querySelectorAll('meta[property^="article:"]').forEach((element) => element.remove());
    updateSchema(buildStructuredData(pathname));
  }, [pathname]);

  useEffect(() => {
    const applyArticleSeo = (event) => {
      const article = event.detail;
      if (!article?.title || !article?.path) return;

      const canonical = getCanonicalUrl(article.path);
      const description = article.description || '';
      const image = article.image || DEFAULT_OG_IMAGE;
      document.title = `${article.title} | ${SITE_NAME}`;
      ensureMeta('meta[name="description"]', { name: 'description', content: description });
      ensureMeta('meta[property="og:title"]', { property: 'og:title', content: article.title });
      ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description });
      ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
      ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
      ensureMeta('meta[property="og:image"]', { property: 'og:image', content: image });
      ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: article.title });
      ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
      ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
      if (article.datePublished) ensureMeta('meta[property="article:published_time"]', { property: 'article:published_time', content: article.datePublished });
      if (article.dateModified) ensureMeta('meta[property="article:modified_time"]', { property: 'article:modified_time', content: article.dateModified });
      if (article.author) ensureMeta('meta[property="article:author"]', { property: 'article:author', content: article.author });

      const canonicalLink = document.head.querySelector('link[rel="canonical"]');
      if (canonicalLink) canonicalLink.href = canonical;
      updateSchema(buildArticleStructuredData(article));
    };

    window.addEventListener('seo:article', applyArticleSeo);
    return () => window.removeEventListener('seo:article', applyArticleSeo);
  }, []);

  return null;
};

export default SEO;
