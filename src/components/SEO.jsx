import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  buildArticleStructuredData,
  buildCmsServiceStructuredData,
  buildStructuredData,
  DEFAULT_OG_IMAGE,
  getCanonicalUrl,
  getSeoForPath,
  normalizePath,
  SITE_NAME,
} from '../seo/seoConfig';
import { buildPageTitle } from '../utils/text';
import {
  applyPageOverride,
  buildRobotsContent,
  fetchAllSeoMap,
  mergeStructuredData,
  resolveRemoteSeo,
} from '../seo/seoRemote';

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

const setCanonical = (href) => {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
};

// Admin-managed SEO overrides (table `seo_metadata`). Fetched once per page load
// in a single request, shared across every <SEO/> render. Keyed by entityRef —
// route paths and entity UUIDs never collide. Any failure resolves to `{}`.
let remoteMapPromise = null;
const loadRemoteMap = () => {
  if (!remoteMapPromise) remoteMapPromise = fetchAllSeoMap();
  return remoteMapPromise;
};

const ROBOTS_INDEXABLE = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

const SEO = () => {
  const { pathname } = useLocation();
  const [remoteMap, setRemoteMap] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadRemoteMap().then((map) => {
      if (!cancelled) setRemoteMap(map);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const override = resolveRemoteSeo(remoteMap, normalizePath(pathname), 'vi');
    const page = applyPageOverride(getSeoForPath(pathname), override);
    const canonical = page.canonical || getCanonicalUrl(pathname);
    const socialImage = page.ogImage || DEFAULT_OG_IMAGE;
    document.title = page.title;

    ensureMeta('meta[name="description"]', { name: 'description', content: page.description });
    ensureMeta('meta[name="robots"]', {
      name: 'robots',
      content: page.noindex
        ? buildRobotsContent(false, !page.nofollow)
        : buildRobotsContent(true, !page.nofollow),
    });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: page.ogTitle || page.title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: page.ogDescription || page.description });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: socialImage });
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    ensureMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'vi_VN' });
    ensureMeta('meta[property="og:locale:alternate"]', { property: 'og:locale:alternate', content: 'en_US' });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.ogTitle || page.title });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.ogDescription || page.description });
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: socialImage });

    setCanonical(canonical);

    document.head.querySelectorAll('meta[property^="article:"]').forEach((element) => element.remove());
    updateSchema(mergeStructuredData(buildStructuredData(pathname), override?.schemaJson));
  }, [pathname, remoteMap]);

  useEffect(() => {
    const applyServiceSeo = (event) => {
      const { service, pathname: servicePath, language } = event.detail || {};
      if (!service || !servicePath) return;

      const schema = buildCmsServiceStructuredData({
        service,
        pathname: servicePath,
        language,
      });
      const canonical = getCanonicalUrl(servicePath);
      const webpage = schema['@graph']?.find((item) => item['@id'] === `${canonical}#webpage`);
      if (!webpage) return;

      const override = resolveRemoteSeo(remoteMap, service.id, language || 'vi');
      const title = override?.seoTitle || webpage.name;
      const description = override?.metaDescription || webpage.description || '';
      const indexable = service.isActive !== false && override?.robotsIndex !== false;

      document.title = title;
      ensureMeta('meta[name="description"]', { name: 'description', content: description });
      ensureMeta('meta[name="robots"]', {
        name: 'robots',
        content: indexable
          ? buildRobotsContent(true, override?.robotsFollow)
          : buildRobotsContent(false, override?.robotsFollow),
      });
      ensureMeta('meta[property="og:title"]', { property: 'og:title', content: override?.ogTitle || title });
      ensureMeta('meta[property="og:description"]', { property: 'og:description', content: override?.ogDescription || description });
      ensureMeta('meta[property="og:url"]', { property: 'og:url', content: override?.canonicalUrl || canonical });
      ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: override?.ogTitle || title });
      ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: override?.ogDescription || description });
      if (override?.ogImage) {
        ensureMeta('meta[property="og:image"]', { property: 'og:image', content: override.ogImage });
        ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: override.ogImage });
      }

      setCanonical(override?.canonicalUrl || canonical);
      updateSchema(mergeStructuredData(schema, override?.schemaJson));
    };

    window.addEventListener('seo:service', applyServiceSeo);
    return () => window.removeEventListener('seo:service', applyServiceSeo);
  }, [remoteMap]);

  useEffect(() => {
    const applyArticleSeo = (event) => {
      const article = event.detail;
      if (!article?.title || !article?.path) return;

      const override = resolveRemoteSeo(remoteMap, article.id, 'vi');
      const canonical = override?.canonicalUrl || getCanonicalUrl(article.path);
      const title = override?.seoTitle || article.title;
      const description = override?.metaDescription || article.description || '';
      const image = override?.ogImage || article.image || DEFAULT_OG_IMAGE;

      document.title = buildPageTitle(title, SITE_NAME);
      ensureMeta('meta[name="description"]', { name: 'description', content: description });
      ensureMeta('meta[name="robots"]', {
        name: 'robots',
        content: override?.robotsIndex === false
          ? buildRobotsContent(false, override?.robotsFollow)
          : ROBOTS_INDEXABLE,
      });
      ensureMeta('meta[property="og:title"]', { property: 'og:title', content: override?.ogTitle || title });
      ensureMeta('meta[property="og:description"]', { property: 'og:description', content: override?.ogDescription || description });
      ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
      ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
      ensureMeta('meta[property="og:image"]', { property: 'og:image', content: image });
      ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: override?.ogTitle || title });
      ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: override?.ogDescription || description });
      ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
      if (article.datePublished) ensureMeta('meta[property="article:published_time"]', { property: 'article:published_time', content: article.datePublished });
      if (article.dateModified) ensureMeta('meta[property="article:modified_time"]', { property: 'article:modified_time', content: article.dateModified });
      if (article.author) ensureMeta('meta[property="article:author"]', { property: 'article:author', content: article.author });

      setCanonical(canonical);
      updateSchema(mergeStructuredData(buildArticleStructuredData(article), override?.schemaJson));
    };

    window.addEventListener('seo:article', applyArticleSeo);
    return () => window.removeEventListener('seo:article', applyArticleSeo);
  }, [remoteMap]);

  return null;
};

export default SEO;
