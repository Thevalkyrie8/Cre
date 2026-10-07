import { buildRobotsContent } from './seoRemote.js';

const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export const applyStaticMeta = (block, override) => {
  if (!override) return block;
  let next = block;
  const meta = (attribute, name, value) => {
    if (!value) return;
    const pattern = new RegExp(`<meta ${attribute}="${name}" content="[^"]*" \\/>`);
    next = next.replace(pattern, () => `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`);
  };
  if (override.seoTitle) next = next.replace(/<title>[\s\S]*?<\/title>/,
    () => `<title>${escapeHtml(override.seoTitle)}</title>`);
  meta('name', 'description', override.metaDescription);
  for (const [key, value] of Object.entries({
    title: override.ogTitle || override.seoTitle,
    description: override.ogDescription || override.metaDescription,
    image: override.ogImage,
  })) {
    meta('property', `og:${key}`, value);
    meta('name', `twitter:${key}`, value);
  }
  if (override.canonicalUrl) {
    next = next.replace(/<link rel="canonical" href="[^"]*" \/>/,
      () => `<link rel="canonical" href="${escapeHtml(override.canonicalUrl)}" />`);
    meta('property', 'og:url', override.canonicalUrl);
  }
  if (typeof override.robotsIndex === 'boolean' || typeof override.robotsFollow === 'boolean') {
    const current = next.match(/<meta name="robots" content="([^"]*)"/i)?.[1] || '';
    meta('name', 'robots', buildRobotsContent(override.robotsIndex ?? !/\bnoindex\b|\bnone\b/i.test(current),
      override.robotsFollow ?? !/\bnofollow\b|\bnone\b/i.test(current)));
  }
  return next;
};

/** Only canonical, indexable pages belong in a sitemap. */
export const isSitemapIndexable = (canonical, override, noindex = false) => {
  if (override?.robotsIndex === false || (noindex && override?.robotsIndex !== true)) return false;
  if (!override?.canonicalUrl) return true;
  try {
    const normalize = (value) => {
      const url = new URL(value);
      url.hash = '';
      url.pathname = url.pathname.replace(/\/+$/, '') || '/';
      return url.href;
    };
    return normalize(override.canonicalUrl) === normalize(canonical);
  } catch { return false; }
};
