// Shared, dependency-free table-of-contents helpers for article markdown.
// Imported by NewsDetailShowcase.jsx (browser) and by
// scripts/generate-seo-pages.mjs (plain Node) — keep it framework-free.
//
// The slug algorithm mirrors admin-unitrux `src/utils/contentToc.ts`
// (`slugifyHeading`) so the anchors the CMS previews line up with what the
// live site renders.

export const slugifyHeading = (text = '') =>
  String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'section';

const stripInline = (value = '') =>
  String(value)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    // Markdown backslash escapes: `1\.` → `1.`, `\(` → `(` …
    .replace(/\\([^\w\s])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Parse `##` / `###` headings (outside fenced code blocks) into a flat TOC:
 * `[{ level: 2 | 3, text, slug }]`.
 */
export const buildToc = (markdown = '') => {
  const lines = String(markdown).split(/\r?\n/);
  const items = [];
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const text = stripInline(match[2]);
    if (text) items.push({ level: match[1].length, text, slug: slugifyHeading(text) });
  }
  return items;
};

/**
 * Collapse repeated headings (same slug) to their first occurrence — keeps the
 * nav usable when CMS content was accidentally pasted twice, and guarantees
 * every nav link resolves (heading ids are the plain, non-suffixed slug).
 */
export const dedupeHeadings = (toc = []) =>
  toc.filter((item, i, arr) => arr.findIndex((other) => other.slug === item.slug) === i);

/**
 * Inject `id=""` into the `<h2>` / `<h3>` tags of a rendered-HTML string — for
 * the static prerender output where there is no DOM to walk. Same plain slug as
 * the browser; repeated headings share an id (the browser jumps to the first).
 */
const decodeEntities = (value = '') =>
  String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

export const injectHeadingIds = (html = '') =>
  String(html).replace(
    /<(h[23])((?:[^>]*))>([\s\S]*?)<\/\1>/g,
    (full, tag, attrs, inner) => {
      if (/\sid=/.test(attrs)) return full;
      const text = decodeEntities(inner.replace(/<[^>]+>/g, ' '))
        .replace(/\s+/g, ' ')
        .trim();
      if (!text) return full;
      return `<${tag}${attrs} id="${slugifyHeading(text)}">${inner}</${tag}>`;
    },
  );

/**
 * Whether to show the TOC. `tocEnabled` comes from `seo_metadata.tocEnabled`:
 *   - `true`            → admin ticked "Hiển thị mục lục" → always show
 *   - `false` / `null`  → not configured (the column default, or no SEO row) →
 *                          fall back to a smart default: show once the article
 *                          has enough headings to be worth navigating.
 *
 * `false` is intentionally *not* treated as "hide" — today nothing writes a
 * deliberate `false`, so it only ever means "left at the default".
 */
export const shouldShowToc = (tocEnabled, toc) =>
  tocEnabled === true || (toc?.length ?? 0) >= 3;
