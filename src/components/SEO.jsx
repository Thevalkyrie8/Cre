import { useEffect, useState, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, normalizePath } from '../seo/seoConfig.js';
import { fetchAllSeoMap } from '../seo/seoRemote.js';
import { getEntitySeo, subscribeEntitySeo } from '../seo/entitySeoStore.js';
import { resolvePageSeo } from '../seo/resolvePageSeo.js';

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

let remoteMapPromise = null;
const loadRemoteMap = () => {
  if (!remoteMapPromise) remoteMapPromise = fetchAllSeoMap();
  return remoteMapPromise;
};
const serverEntity = () => null;

const SEO = () => {
  const { pathname } = useLocation();
  const [remoteMap, setRemoteMap] = useState(null);
  const entity = useSyncExternalStore(subscribeEntitySeo, getEntitySeo, serverEntity);
  useEffect(() => {
    let active = true;
    loadRemoteMap().then((map) => { if (active) setRemoteMap(map); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const path = normalizePath(pathname);
    // Keep prerendered entity metadata while the CMS content is loading.
    if (/^\/(news|services)\/[^/]+$/.test(path) && entity?.path !== path) {
      const canonical = document.head.querySelector('link[rel="canonical"]')?.href;
      if (canonical && normalizePath(new URL(canonical).pathname) === path) return;
    }
    const page = resolvePageSeo(path, remoteMap, entity);
    document.title = page.title;
    document.documentElement.lang = page.language;
    const tags = {
      'description': page.description, 'robots': page.robots,
      'og:title': page.ogTitle, 'og:description': page.ogDescription,
      'og:type': page.type, 'og:url': page.canonical, 'og:image': page.ogImage,
      'og:site_name': SITE_NAME, 'og:locale': page.language.startsWith('en') ? 'en_US' : 'vi_VN',
      'og:locale:alternate': page.language.startsWith('en') ? 'vi_VN' : 'en_US',
      'twitter:card': 'summary_large_image', 'twitter:title': page.ogTitle,
      'twitter:description': page.ogDescription, 'twitter:image': page.ogImage,
    };
    Object.entries(tags).forEach(([key, content]) => {
      const attribute = key.startsWith('og:') ? 'property' : 'name';
      ensureMeta(`meta[${attribute}="${key}"]`, { [attribute]: key, content });
    });
    document.head.querySelectorAll('meta[property^="article:"]').forEach((element) => element.remove());
    for (const [key, content] of Object.entries({ author: page.author, published_time: page.published, modified_time: page.modified })) {
      if (content) ensureMeta(`meta[property="article:${key}"]`, { property: `article:${key}`, content });
    }
    setCanonical(page.canonical);
    updateSchema(page.schema);
  }, [pathname, remoteMap, entity]);
  return null;
};

export default SEO;
