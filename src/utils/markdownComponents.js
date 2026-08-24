import { resolveAssetUrl } from '../api/client';

// Article pages already render their own <h1> (the article title) above the
// markdown body. CMS content sometimes repeats the title as a leading `#`
// heading, which would otherwise emit a second <h1> on the page — bad for
// on-page SEO (one H1 per page) and it also has no matching CSS rule.
// Demoting it to <h2> reuses the existing `.article-editorial-body h2` style.
export const articleMarkdownComponents = {
  h1: 'h2',
  // The API returns API-relative image paths like "/api/media/file/:id" in
  // markdown content — resolve them against the API origin, not this site's.
  img: ({ src, alt, ...props }) => <img src={resolveAssetUrl(src, src)} alt={alt || ''} {...props} />,
};
