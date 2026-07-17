import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildStructuredData, DEFAULT_OG_IMAGE, getCanonicalUrl, getSeoForPath, SITE_NAME } from '../seo/seoConfig';

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
};

const SEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getSeoForPath(pathname);
    const canonical = getCanonicalUrl(pathname);
    document.title = page.title;

    ensureMeta('meta[name="description"]', { name: 'description', content: page.description });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_OG_IMAGE });
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
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

    let schema = document.head.querySelector('#seo-static-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'seo-static-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(buildStructuredData(pathname));
  }, [pathname]);

  return null;
};

export default SEO;
