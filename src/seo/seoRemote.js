/**
 * Remote SEO overrides — Phase 2 of the Search Intelligence System.
 *
 * The backend (`unitrux-backend`, table `seo_metadata`) lets the Admin override
 * per-route / per-entity SEO. This module fetches those overrides and merges
 * them on top of the static config in `seoConfig.js`.
 *
 * Source of truth order (last wins):
 *   1. `seoConfig.js` (`seoPages`, CMS defaults) — always present, the fallback.
 *   2. `seo_metadata` row for locale `*`.
 *   3. `seo_metadata` row for the active locale (`vi` / `en`).
 *
 * Everything here is defensive: a missing/broken API must never break rendering,
 * so failures resolve to empty maps and `null` overrides.
 */

const API_ORIGIN = 'https://be.unitrux.site';

const resolveBaseUrl = () => {
  // Build-time (Node): allow an explicit override, else hit prod.
  const nodeEnv =
    typeof globalThis !== 'undefined' && globalThis.process && globalThis.process.env;
  if (nodeEnv && nodeEnv.SEO_API_URL) {
    return nodeEnv.SEO_API_URL.replace(/\/$/, '');
  }
  // Browser dev: Vite proxies /api -> backend.
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
    return '/api';
  }
  return `${API_ORIGIN}/api`;
};

const EMPTY_MAP = Object.freeze({});

const fetchBulk = async (entityType) => {
  try {
    const base = resolveBaseUrl();
    const query = entityType ? `?entityType=${entityType}` : '';
    const response = await fetch(`${base}/seo/metadata/bulk${query}`, {
      headers: { Accept: 'application/json' },
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout
        ? AbortSignal.timeout(8000)
        : undefined,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data && typeof data === 'object' ? data : EMPTY_MAP;
  } catch (error) {
    const message = error && error.message ? error.message : error;
    if (typeof console !== 'undefined') {
      console.warn(`[seoRemote] ${entityType} overrides unavailable: ${message}`);
    }
    return EMPTY_MAP;
  }
};

/** `{ '/web-development': { '*': {...}, vi: {...} }, ... }` keyed by route path. */
export const fetchRouteSeoMap = () => fetchBulk('route');

/** Keyed by entity UUID. */
export const fetchNewsSeoMap = () => fetchBulk('news');
export const fetchServiceSeoMap = () => fetchBulk('service');
export const fetchProductSeoMap = () => fetchBulk('product');

/**
 * Every override in one request, keyed by entityRef (route paths and entity
 * UUIDs never collide). Used by the runtime `<SEO/>` component so a page load
 * makes a single call instead of one per entity type.
 */
export const fetchAllSeoMap = () => fetchBulk('');

const NULLABLE_STRING_FIELDS = [
  'seoTitle',
  'metaDescription',
  'focusKeyword',
  'canonicalUrl',
  'ogTitle',
  'ogDescription',
  'ogImage',
  'schemaType',
];

/**
 * Collapse the `*` row and the locale row for one entity into a single override
 * object. Returns `null` when nothing is configured.
 */
export const resolveRemoteSeo = (entityMap, ref, locale = 'vi') => {
  if (!entityMap || !ref) return null;
  const byLocale = entityMap[ref];
  if (!byLocale || typeof byLocale !== 'object') return null;

  const base = byLocale['*'] || null;
  const specific = locale && locale !== '*' ? byLocale[locale] || null : null;
  if (!base && !specific) return null;

  const merged = {};
  for (const source of [base, specific]) {
    if (!source) continue;
    for (const field of NULLABLE_STRING_FIELDS) {
      const value = source[field];
      if (typeof value === 'string' && value.trim()) merged[field] = value;
    }
    if (typeof source.robotsIndex === 'boolean') merged.robotsIndex = source.robotsIndex;
    if (typeof source.robotsFollow === 'boolean') merged.robotsFollow = source.robotsFollow;
    if (source.schemaJson && typeof source.schemaJson === 'object') {
      merged.schemaJson = { ...(merged.schemaJson || {}), ...source.schemaJson };
    }
  }
  return Object.keys(merged).length ? merged : null;
};

/**
 * Apply a resolved override to a `seoConfig` page object (the shape
 * `getSeoForPath` / CMS helpers return). Pure — returns a new object.
 */
export const applyPageOverride = (page, override) => {
  if (!override) return page;
  const next = { ...page };
  if (override.seoTitle) next.title = override.seoTitle;
  if (override.metaDescription) next.description = override.metaDescription;
  if (override.ogTitle) next.ogTitle = override.ogTitle;
  if (override.ogDescription) next.ogDescription = override.ogDescription;
  if (override.ogImage) next.ogImage = override.ogImage;
  if (override.canonicalUrl) next.canonical = override.canonicalUrl;
  if (override.schemaType) next.type = override.schemaType;
  if (override.robotsIndex === false) next.noindex = true;
  if (override.robotsIndex === true) next.noindex = false;
  if (typeof override.robotsFollow === 'boolean') next.nofollow = !override.robotsFollow;
  return next;
};

/** `<meta name="robots">` content string from index/follow booleans. */
export const buildRobotsContent = (index, follow) => {
  const indexPart = index === false ? 'noindex' : 'index';
  const followPart = follow === false ? 'nofollow' : 'follow';
  if (indexPart === 'index' && followPart === 'follow') {
    return 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  }
  return `${indexPart}, ${followPart}`;
};

/**
 * Merge an override `schemaJson` object into a built structured-data graph.
 * - `{ '@graph': [...] }` → its nodes are appended.
 * - an object with `@type` → appended as one extra node.
 * - anything else → shallow-merged at the top level.
 */
export const mergeStructuredData = (structuredData, schemaJson) => {
  if (!schemaJson || typeof schemaJson !== 'object') return structuredData;
  const next = {
    ...structuredData,
    '@graph': Array.isArray(structuredData['@graph']) ? [...structuredData['@graph']] : [],
  };
  if (Array.isArray(schemaJson['@graph'])) {
    next['@graph'].push(...schemaJson['@graph']);
    return next;
  }
  if (schemaJson['@type']) {
    next['@graph'].push(schemaJson);
    return next;
  }
  return { ...next, ...schemaJson };
};
